# /// script
# requires-python = ">=3.11"
# dependencies = ["markdown>=3.5"]
# ///
"""Build the review-tracking static site from ../review into ../serve.

Run:  uv run site/build.py        (from the 000-111-learn folder)

Everything under serve/ is regenerated on each run (a CNAME file is kept).
Inputs, all under review/:
  README.md                         process + status -> process.html, dashboard progress
  adversarial-review-pass*/*.md     review write-ups
  segments/*.md, segments/*.html    source documents (HTML advisors are copied verbatim)
  segments/<doc>/*.md               segment files (from segments/split_documents.py)
  segments/manifest.json            segment -> line ranges -> finding ids
  findings/pass*.json               findings (source of truth)
  findings/status.json              optional status/note overrides exported from the site
  findings/documents.json           per-document verdicts per pass
"""
import html
import json
import os
import re
import shutil
from datetime import datetime
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
REVIEW = ROOT / "review"
OUT = ROOT / "serve"
ASSETS = Path(__file__).resolve().parent / "assets"
SITE_TITLE = "Assembly vs. Fortran — Adversarial Review"
SEVERITIES = ["critical", "major", "minor"]
STATUSES = ["open", "verify", "confirmed", "disputed", "fixed", "wont-fix"]

MD_EXT = ["tables", "fenced_code", "toc", "sane_lists", "attr_list", "md_in_html"]


# ------------------------------------------------------------------ data
def load_json(path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def load_findings():
    findings = []
    for p in sorted((REVIEW / "findings").glob("pass*.json")):
        findings += load_json(p, [])
    overrides = load_json(REVIEW / "findings" / "status.json", {})
    for f in findings:
        o = overrides.get(f["id"], {})
        f["status"] = o.get("status", f["status"])
        f["note"] = o.get("note", f.get("note", ""))
        f["updated"] = o.get("updated", "")
    return findings


# ------------------------------------------------------------------ paths
def build_route_map():
    """source path (absolute) -> output path (relative to OUT)."""
    routes = {}
    for src in REVIEW.rglob("*"):
        if not src.is_file():
            continue
        rel = src.relative_to(REVIEW)
        if src.suffix == ".md":
            if rel == Path("README.md"):
                out = Path("process.html")
            elif src.name == "README.md":
                out = rel.parent / "index.html"
            else:
                out = rel.with_suffix(".html")
            routes[src] = out
        elif src.suffix in (".html", ".json"):
            routes[src] = rel
    # directories of segment files -> segment index with anchor
    for d in (REVIEW / "segments").iterdir():
        if d.is_dir():
            routes[d] = Path("segments/index.html")
    return routes


def rel_url(from_out, to_out):
    return os.path.relpath(to_out, from_out.parent).replace(os.sep, "/")


def rewrite_links(html_text, src, out, routes):
    def fix(m):
        attr, url = m.group(1), m.group(2)
        if re.match(r"^(https?:|mailto:|data:|#|/)", url):
            return m.group(0)
        path, _, frag = url.partition("#")
        target = (src.parent / path).resolve()
        if target in routes:
            new = rel_url(out, routes[target]) + (f"#{frag}" if frag else "")
            return f'{attr}="{new}"'
        return m.group(0)
    return re.sub(r'(href|src)="([^"]+)"', fix, html_text)


# ------------------------------------------------------------------ markdown
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)
RAW_DETAILS = re.compile(r"<details><summary>(.*?)</summary>\n\n```(\w*)\n(.*?)\n```\n</details>", re.S)


def split_front_matter(text):
    m = FRONT.match(text)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip().strip('"')
    return meta, text[m.end():]


def render_md(text):
    # Raw-HTML dumps inside <details> must be shown escaped, never rendered live.
    text = RAW_DETAILS.sub(
        lambda m: f"<details><summary>{html.escape(m.group(1))}</summary>"
                  f"<pre><code class=\"language-{m.group(2)}\">{html.escape(m.group(3))}</code></pre></details>",
        text)
    md = markdown.Markdown(extensions=MD_EXT, extension_configs={"toc": {"permalink": False}})
    body = md.convert(text)
    # wrap tables for horizontal scroll on phones
    body = re.sub(r"<table>", '<div class="table-wrap"><table>', body)
    body = body.replace("</table>", "</table></div>")
    return body


def meta_table(meta, src, out, routes):
    if not meta:
        return ""
    rows = []
    for k, v in meta.items():
        cell = html.escape(v)
        path_m = re.match(r"^(\.\./[^\s]+?\.(?:md|html))(.*)$", v)
        if path_m:
            target = (src.parent / path_m.group(1)).resolve()
            if target in routes:
                cell = (f'<a href="{rel_url(out, routes[target])}">{html.escape(path_m.group(1))}</a>'
                        f"{html.escape(path_m.group(2))}")
        if k == "findings" and v.strip("[] "):
            ids = [i.strip() for i in v.strip("[]").split(",") if i.strip()]
            cell = " ".join(f'<a class="fid" href="{rel_url(out, Path("findings/index.html"))}#q={i}">{i}</a>'
                            for i in ids)
        rows.append(f"<tr><th>{html.escape(k)}</th><td>{cell}</td></tr>")
    return f'<details class="meta" open><summary>Metadata</summary><table>{"".join(rows)}</table></details>'


# ------------------------------------------------------------------ layout
NAV = [("index.html", "Dashboard"), ("findings/index.html", "Findings"),
       ("segments/index.html", "Segments"), ("adversarial-review-pass1/00-SUMMARY.html", "Reviews"),
       ("process.html", "Process")]


def page(out, title, body, *, crumbs=None, wide=False):
    root = rel_url(out, Path("index.html")).rsplit("index.html", 1)[0] or "./"
    nav = "".join(
        f'<a href="{rel_url(out, Path(href))}"{" aria-current=page" if Path(href) == out else ""}>{label}</a>'
        for href, label in NAV)
    crumb_html = ""
    if crumbs:
        crumb_html = '<nav class="crumbs">' + " / ".join(
            f'<a href="{rel_url(out, Path(h))}">{html.escape(t)}</a>' if h else html.escape(t)
            for t, h in crumbs) + "</nav>"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} · Review tracker</title>
<link rel="stylesheet" href="{root}assets/style.css">
<script>try{{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}}catch(e){{}}</script>
</head>
<body data-root="{root}">
<header class="site">
  <a class="brand" href="{root}index.html">Review tracker</a>
  <nav class="main">{nav}</nav>
  <div class="tools">
    <input id="search" type="search" placeholder="Search…" aria-label="Search the site" autocomplete="off">
    <div id="search-results" hidden></div>
    <button id="theme" type="button" aria-label="Toggle dark mode">◐</button>
  </div>
</header>
<main class="{"wide" if wide else ""}">
{crumb_html}
{body}
</main>
<footer class="site">Built {datetime.now().strftime("%Y-%m-%d %H:%M")} from <code>review/</code> by <code>site/build.py</code>.</footer>
<script src="{root}assets/search-index.js"></script>
<script src="{root}assets/app.js"></script>
</body>
</html>
"""


def write(out, content):
    dest = OUT / out
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")


def plain_text(html_text):
    t = re.sub(r"<(script|style|pre)[^>]*>.*?</\1>", " ", html_text, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


# ------------------------------------------------------------------ builders
def build_markdown_pages(routes, manifest, fmap, search):
    seg_nav = {}
    for d in manifest["documents"]:
        segs = d["segments"]
        for i, s in enumerate(segs):
            seg_nav[(REVIEW / "segments" / s["file"]).resolve()] = (
                d, s, segs[i - 1] if i else None, segs[i + 1] if i + 1 < len(segs) else None)

    for src, out in routes.items():
        if src.suffix != ".md" or not src.is_file():
            continue
        text = src.read_text(encoding="utf-8")
        meta, body_md = split_front_matter(text)
        body = rewrite_links(render_md(body_md), src, out, routes)
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S)
        title = plain_text(h1.group(1)) if h1 else src.stem
        crumbs, extra_top, extra_bottom = None, "", ""

        if src.resolve() in seg_nav:
            d, s, prev, nxt = seg_nav[src.resolve()]
            worst = min((SEVERITIES.index(fmap[i]["severity"]) for i in s["findings"]), default=None)
            badge = (f'<span class="sev sev-{SEVERITIES[worst]}">{len(s["findings"])} finding'
                     f'{"s" if len(s["findings"]) != 1 else ""}</span>' if worst is not None
                     else '<span class="sev sev-none">not yet challenged</span>')
            doc_out = routes[(REVIEW / "segments" / d["source"]).resolve()]
            crumbs = [("Segments", "segments/index.html"), (d["source"], str(doc_out)), (s["title"], None)]
            extra_top = f'<p class="seg-status">{badge} · <span class="muted">{html.escape(s["kind"])}</span></p>'
            links = []
            for label, t in (("← Previous", prev), ("Next →", nxt)):
                if t:
                    links.append(f'<a href="{rel_url(out, routes[(REVIEW / "segments" / t["file"]).resolve()])}">'
                                 f'{label}: {html.escape(t["title"])}</a>')
            extra_bottom = f'<nav class="pager">{"".join(links)}</nav>'
        elif out.parts[0] == "adversarial-review-pass1":
            crumbs = [("Reviews", "adversarial-review-pass1/00-SUMMARY.html"), (title, None)]

        html_page = page(out, title, extra_top + meta_table(meta, src, out, routes) +
                         f'<article class="md">{body}</article>' + extra_bottom, crumbs=crumbs)
        write(out, html_page)
        search.append({"t": title, "u": str(out), "x": plain_text(body)[:4000]})


def build_dashboard(findings, manifest, documents, routes, search):
    out = Path("index.html")
    fmap = {f["id"]: f for f in findings}
    n_seg = sum(len(d["segments"]) for d in manifest["documents"])
    n_hit = sum(1 for d in manifest["documents"] for s in d["segments"] if s["findings"])
    by_sev = {s: sum(f["severity"] == s for f in findings) for s in SEVERITIES}
    by_status = {s: sum(f["status"] == s for f in findings) for s in STATUSES}
    resolved = sum(by_status[s] for s in ("confirmed", "disputed", "fixed", "wont-fix"))

    cards = [
        ("Documents", len(documents), ""),
        ("Segments", n_seg, f"{n_seg - n_hit} not yet challenged"),
        ("Findings", len(findings), f'{by_sev["critical"]} critical · {by_sev["major"]} major · {by_sev["minor"]} minor'),
        ("Awaiting source check", by_status["verify"], "tagged [VERIFY]"),
        ("Resolved", resolved, f"of {len(findings)} findings"),
    ]
    cards_html = "".join(f'<div class="card"><div class="k">{k}</div><div class="v">{v}</div>'
                         f'<div class="s">{html.escape(s)}</div></div>' for k, v, s in cards)
    pct = round(100 * resolved / len(findings)) if findings else 0
    progress = (f'<div class="progress" role="img" aria-label="{pct}% of findings resolved">'
                f'<div style="width:{pct}%"></div></div><p class="muted">{pct}% of findings resolved '
                f'(confirmed, disputed, fixed or won\'t fix). Update statuses on the '
                f'<a href="findings/index.html">Findings</a> page.</p>')

    rows = []
    for d in documents:
        last = d["passes"][-1]
        src_out = routes[(REVIEW / "segments" / d["source"]).resolve()]
        rev_out = routes[(REVIEW / d["review"]).resolve()]
        mine = [f for f in findings if f["doc"] == d["doc"]]
        crit = sum(f["severity"] == "critical" for f in mine)
        rows.append(
            f'<tr><td>{d["doc"]}</td><td><a href="{src_out}">{html.escape(d["short"])}</a>'
            f'<div class="muted small">{html.escape(d["question"])}</div></td>'
            f'<td><span class="verdict v-{slug(last["goal_met"])}">{html.escape(last["goal_met"])}</span></td>'
            f'<td>{html.escape(last["confidence"])}</td>'
            f'<td><a href="findings/index.html#doc={d["doc"]}">{len(mine)}</a> ({crit} critical)</td>'
            f'<td>{html.escape(last["headline"])}</td>'
            f'<td><a href="{rev_out}">Pass {last["pass"]}</a></td></tr>')
    scorecard = ('<div class="table-wrap"><table class="score"><thead><tr><th>#</th><th>Document</th>'
                 '<th>Goal met?</th><th>Confidence</th><th>Findings</th><th>Headline</th><th>Review</th>'
                 f'</tr></thead><tbody>{"".join(rows)}</tbody></table></div>')

    heat = []
    for d in manifest["documents"]:
        tiles = []
        for s in d["segments"]:
            sev = min((SEVERITIES.index(fmap[i]["severity"]) for i in s["findings"]), default=None)
            cls = SEVERITIES[sev] if sev is not None else "none"
            seg_out = routes[(REVIEW / "segments" / s["file"]).resolve()]
            n = s["file"].split("/")[1][:2]
            tip = f'{n} {s["title"]} — {len(s["findings"])} finding(s)'
            tiles.append(f'<a class="tile t-{cls}" href="{seg_out}" title="{html.escape(tip)}">'
                         f'<b>{n}</b><span>{len(s["findings"]) or ""}</span></a>')
        doc_level = f' · document-level: {", ".join(d["document_findings"])}' if d["document_findings"] else ""
        heat.append(f'<div class="heat-row"><h3><a href="{routes[(REVIEW / "segments" / d["source"]).resolve()]}">'
                    f'{html.escape(d["source"])}</a> <span class="muted small">{len(d["segments"])} segments'
                    f'{doc_level}</span></h3><div class="tiles">{"".join(tiles)}</div></div>')
    legend = ('<p class="legend"><span class="tile t-critical"></span>critical <span class="tile t-major"></span>major '
              '<span class="tile t-minor"></span>minor <span class="tile t-none"></span>not yet challenged '
              '<span class="muted">(colour = worst finding; number = finding count)</span></p>')

    readme = (REVIEW / "README.md").read_text(encoding="utf-8")
    status_md = section(readme, "Status and next steps") + "\n\n### Log\n\n" + section(readme, "Log")
    status_html = rewrite_links(render_md(status_md), REVIEW / "README.md", out, routes)
    status_html = status_html.replace("<li>[x]", '<li class="task done">').replace("<li>[ ]", '<li class="task">')

    body = f"""
<h1>{SITE_TITLE}</h1>
<p class="lead">This tracks the adversarial review of four Gemini-generated documents that compare learning Assembly and Fortran within 90 days. The documents are split into segments; each finding is mapped to the segment it attacks.</p>
<div class="cards">{cards_html}</div>
{progress}
<h2>Document scorecard</h2>
{scorecard}
<h2>Segment heatmap</h2>
{legend}
{"".join(heat)}
<h2>Status and log</h2>
<div class="md">{status_html}</div>
"""
    write(out, page(out, "Dashboard", body, wide=True))
    search.append({"t": "Dashboard", "u": "index.html", "x": plain_text(body)[:2000]})


def build_findings_page(findings, manifest, routes, search):
    out = Path("findings/index.html")
    seg_of = {}
    for d in manifest["documents"]:
        for s in d["segments"]:
            for fid in s["findings"]:
                seg_of.setdefault(fid, []).append({
                    "n": s["file"].split("/")[1][:2], "t": s["title"],
                    "u": rel_url(out, routes[(REVIEW / "segments" / s["file"]).resolve()])})
    data = [{**f, "segments": seg_of.get(f["id"], [])} for f in findings]
    docs = sorted({f["doc"] for f in findings})
    body = f"""
<h1>Findings</h1>
<p class="lead">All {len(findings)} findings. Filter, search, and set a status or note as you check each one. Your edits are saved in this browser only. To make them permanent, click <b>Export status.json</b>, save the file as <code>review/findings/status.json</code>, run <code>uv run site/build.py</code> and commit.</p>
<div class="filters" id="filters">
  <label>Document <select data-f="doc"><option value="">All</option>{"".join(f'<option>{d}</option>' for d in docs)}</select></label>
  <label>Severity <select data-f="severity"><option value="">All</option>{"".join(f'<option>{s}</option>' for s in SEVERITIES)}</select></label>
  <label>Evidence <select data-f="tag"><option value="">All</option><option>DOC</option><option>KNOW</option><option>VERIFY</option></select></label>
  <label>Status <select data-f="status"><option value="">All</option>{"".join(f'<option>{s}</option>' for s in STATUSES)}</select></label>
  <label class="grow">Search <input type="search" data-f="q" placeholder="ID, text, location…"></label>
</div>
<div class="bar"><span id="count"></span>
  <span class="spacer"></span>
  <span id="dirty" hidden></span>
  <button type="button" id="export">Export status.json</button>
  <button type="button" id="reset" class="ghost">Discard local edits</button>
</div>
<div class="table-wrap"><table class="findings" id="ftable">
<thead><tr><th data-sort="id">ID</th><th data-sort="severity">Severity</th><th>Evidence</th><th data-sort="status">Status</th><th>Location / segments</th><th>Problem</th><th>Note</th></tr></thead>
<tbody></tbody></table></div>
<script>window.FINDINGS={json.dumps(data, ensure_ascii=False)};window.STATUSES={json.dumps(STATUSES)};</script>
"""
    write(out, page(out, "Findings", body, wide=True))
    search.append({"t": "Findings", "u": str(out), "x": "findings filter status export"})


def section(md_text, heading):
    m = re.search(rf"^## {re.escape(heading)}\n(.*?)(?=^## |\Z)", md_text, re.S | re.M)
    return m.group(1).strip() if m else ""


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


# ------------------------------------------------------------------ main
def main():
    if OUT.exists():
        for child in OUT.iterdir():
            if child.name in ("CNAME",):
                continue
            shutil.rmtree(child) if child.is_dir() else child.unlink()
    OUT.mkdir(exist_ok=True)

    findings = load_findings()
    fmap = {f["id"]: f for f in findings}
    manifest = load_json(REVIEW / "segments" / "manifest.json", {"documents": []})
    documents = load_json(REVIEW / "findings" / "documents.json", [])
    routes = build_route_map()
    search = []

    # verbatim copies: interactive HTML advisors and data files
    for src, out in routes.items():
        if src.is_file() and src.suffix in (".html", ".json"):
            (OUT / out).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, OUT / out)
    # merged findings (with status overrides applied) for download
    write(Path("findings/findings.json"), json.dumps(findings, indent=1, ensure_ascii=False))

    build_markdown_pages(routes, manifest, fmap, search)
    build_dashboard(findings, manifest, documents, routes, search)
    build_findings_page(findings, manifest, routes, search)
    for d in documents:
        src = REVIEW / "segments" / d["source"]
        if src.suffix == ".html":
            search.append({"t": f'{d["short"]} (original page)', "u": d["source"] and str(routes[src.resolve()]),
                           "x": d["question"]})

    shutil.copytree(ASSETS, OUT / "assets", dirs_exist_ok=True)
    (OUT / "assets" / "search-index.js").write_text(
        "window.SEARCH_INDEX=" + json.dumps(search, ensure_ascii=False) + ";", encoding="utf-8")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")
    n = sum(1 for _ in OUT.rglob("*.html"))
    print(f"Built {n} HTML pages into {OUT}")


if __name__ == "__main__":
    main()
