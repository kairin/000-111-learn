#!/usr/bin/env python3
"""Split the source documents in this folder into reviewable segments.

Markdown: one segment per H1 preamble, H2 lead-in, H3 subsection, and works cited.
HTML: one segment per <section>, with extracted readable text, the raw markup,
and the JavaScript (quiz logic, roadmap data, chart data) that the section relies on.

Findings from ../findings/pass*.json are mapped onto segments by source line range
and written into each segment's worksheet. A finding whose lines fall in a linked
script range is attached to the section that uses that script.

Outputs (all regenerated; do not hand-edit):
  <doc-slug>/NN-*.md   segment files
  README.md            segment index with finding counts
  manifest.json        segment -> line ranges -> finding ids (used by the site builder)
  ../findings/segment-map.md   comparison of segments against the review findings
"""
import json
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE  # source documents live next to this script
FINDINGS_DIR = HERE.parent / "findings"
SEVERITY_ORDER = {"critical": 0, "major": 1, "minor": 2}

REVIEW_TEMPLATE = """
---

## Review worksheet

### 1. Goal / objective of this segment
_What is this segment trying to establish or help the reader decide?_

### 2. Key claims to test
| # | Claim | Evidence given (citation / data) | Verifiable? |
|---|-------|----------------------------------|-------------|
| 1 |       |                                  |             |

### 3. Adversarial review
- **Strongest counter-argument:**
- **Unsupported, overstated, or outdated claims:**
- **Source quality (primary vs. blog/forum/marketing):**
- **Omissions / what a skeptic would ask:**
- **Internal consistency with other segments:**

### 4. Evaluation
- **Does the segment achieve its goal?** (Yes / Partly / No)
- **Confidence:** (High / Medium / Low)
- **Required fixes:**
"""


def slugify(text, limit=60):
    text = re.sub(r"[*`\\]", "", text).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:limit].rstrip("-") or "segment"


def clean_heading(line):
    return re.sub(r"[*\\]", "", line.lstrip("#")).strip()


# ---------------------------------------------------------------- Markdown
def split_markdown(path):
    lines = path.read_text(encoding="utf-8").splitlines()
    doc_title = clean_heading(lines[0])
    heads = [i for i, l in enumerate(lines) if re.match(r"#{1,4} ", l)]
    segs = []
    h2 = None
    for n, start in enumerate(heads):
        end = heads[n + 1] if n + 1 < len(heads) else len(lines)
        level = len(lines[start]) - len(lines[start].lstrip("#"))
        title = clean_heading(lines[start])
        if level == 1:
            kind, seg_title = "preamble", "Introduction and framing"
        elif level == 2:
            h2 = title
            kind, seg_title = "section-lead", title
        elif level == 3:
            kind, seg_title = "subsection", title
        else:
            kind, seg_title = "references", title
        body = "\n".join(lines[start + 1:end])
        if level == 3 and h2:
            body = f"> Parent section: **{h2}**\n\n{body}"
        if level == 4:
            body += "\n\n> Inline numbers in other segments (e.g. `...conventions2.`) refer to this list."
        if not body.strip():
            continue
        segs.append({
            "title": seg_title, "kind": kind, "body": body,
            "ranges": [[start + 1, end]],
            "meta": {
                "source": f"../{path.name}",
                "document": f'"{doc_title}"',
                "kind": kind,
                "parent": f'"{h2}"' if level == 3 else '""',
                "lines": f"{start + 1}-{end}",
            },
        })
    return doc_title, segs


# ---------------------------------------------------------------- HTML
BLOCK = {"p", "div", "section", "ul", "ol", "table", "tr", "br", "header", "footer", "button"}


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out, self.skip = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "canvas", "svg"):
            self.skip += 1
            if tag == "canvas":
                cid = dict(attrs).get("id", "")
                self.out.append(f"\n[chart: {cid} — data in the Linked script section below]\n")
        elif m := re.fullmatch(r"h([1-6])", tag):
            self.out.append("\n\n" + "#" * (int(m.group(1)) + 1) + " ")
        elif tag == "li":
            self.out.append("\n- ")
        elif tag in ("td", "th"):
            self.out.append(" | ")
        elif tag in BLOCK:
            self.out.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "canvas", "svg"):
            self.skip = max(0, self.skip - 1)
        elif re.fullmatch(r"h[1-6]", tag) or tag in BLOCK:
            self.out.append("\n")

    def handle_data(self, data):
        if not self.skip:
            self.out.append(re.sub(r"\s+", " ", data))

    def text(self):
        t = "".join(self.out)
        t = "\n".join(l.strip() for l in t.splitlines())
        return re.sub(r"\n{3,}", "\n\n", t).strip()


def html_text(fragment):
    p = TextExtractor()
    p.feed(fragment)
    return p.text()


def find_line(lines, pattern, start=0):
    for i in range(start, len(lines)):
        if re.search(pattern, lines[i]):
            return i
    return None


def script_blocks(lines):
    """Return named JS ranges from the main (last) script block."""
    s = max(i for i, l in enumerate(lines) if "<script>" in l)
    e = find_line(lines, r"</script>", s)
    quiz = find_line(lines, r"// Quiz State", s)
    road = find_line(lines, r"// Roadmap Data", s)
    init = find_line(lines, r"// Initialize Default", s)
    charts = find_line(lines, r"// Initialize Chart\.js", s)
    return {
        "quiz": (quiz, road),
        "roadmap": (road, init),
        "charts": (charts, e),
    }


def split_html(path):
    src = path.read_text(encoding="utf-8")
    lines = src.splitlines()
    doc_title = re.search(r"<title>(.*?)</title>", src, re.S).group(1).strip()
    js = script_blocks(lines)
    segs = []
    i = 0
    while (start := find_line(lines, r"<section\b", i)) is not None:
        end = find_line(lines, r"</section>", start)
        frag = "\n".join(lines[start:end + 1])
        sid = (re.search(r'<section id="([^"]+)"', lines[start]) or [None, ""])[1]
        h = re.search(r"<h[23][^>]*>(.*?)</h[23]>", frag, re.S)
        title = re.sub(r"<[^>]+>|\s+", " ", h.group(1)).strip() if h else sid
        title = re.sub(r"^[^\w]+", "", title) or f"section-{len(segs) + 1}"
        if not sid:
            sid = "summary" if not segs else "call-to-action"
        linked = []
        if re.search(r"setAnswer|quiz-result", frag):
            linked.append(("Quiz scoring logic", js["quiz"]))
        if re.search(r"switchPhase", frag):
            linked.append(("Roadmap phase data", js["roadmap"]))
        if "<canvas" in frag:
            linked.append(("Chart data", js["charts"]))
        body = html_text(frag)
        ranges = [[start + 1, end + 1]]
        for label, (a, b) in linked:
            ranges.append([a + 1, b])
            body += (f"\n\n## Linked script: {label} (lines {a + 1}-{b})\n\n"
                     "The recommendation logic / numbers below are claims too; review them.\n\n"
                     "```js\n" + "\n".join(lines[a:b]).rstrip() + "\n```")
        body += (f"\n\n<details><summary>Raw HTML (lines {start + 1}-{end + 1})</summary>\n\n"
                 "```html\n" + frag + "\n```\n</details>")
        segs.append({
            "title": title, "kind": f"html-section#{sid}", "body": body, "ranges": ranges,
            "meta": {
                "source": f"../{path.name}",
                "document": f'"{doc_title}"',
                "kind": "html-section",
                "section_id": sid,
                "lines": ", ".join(f"{a}-{b}" for a, b in ranges),
            },
        })
        i = end + 1
    return doc_title, segs


# ---------------------------------------------------------------- findings
def load_findings():
    findings = []
    for p in sorted(FINDINGS_DIR.glob("pass*.json")):
        findings += json.loads(p.read_text(encoding="utf-8"))
    return findings


def overlaps(ranges_a, ranges_b):
    return any(a1 <= b2 and b1 <= a2 for a1, a2 in ranges_a for b1, b2 in ranges_b)


def findings_block(found, rel_findings):
    if not found:
        return ("\n---\n\n## Review findings mapped to this segment\n\n"
                "_No findings in pass 1. That means **not yet challenged**, not verified correct._\n")
    rows = ["| ID | Severity | Evidence | Status | Location | Problem |",
            "|---|---|---|---|---|---|"]
    for f in sorted(found, key=lambda f: (SEVERITY_ORDER[f["severity"]], f["id"])):
        problem = f["problem"].replace("\n", " ")
        if f["claim"]:
            problem = f"_Claim:_ {f['claim']} — {problem}"
        rows.append(f"| {f['id']} | {f['severity']} | {' '.join(f['tags']) or '—'} | "
                    f"{f['status']} | {f['location']} | {problem} |")
    return ("\n---\n\n## Review findings mapped to this segment\n\n"
            f"Source of truth: `{rel_findings}` (pass {', '.join(sorted({str(f['pass']) for f in found}))}). "
            "Mapped by source line range.\n\n" + "\n".join(rows) + "\n")


def write_segment(out_dir, idx, seg, found):
    name = f"{idx:02d}-{slugify(seg['title'])}.md"
    fm = "\n".join(f"{k}: {v}" for k, v in seg["meta"].items())
    fm += "\nfindings: [" + ", ".join(f["id"] for f in found) + "]"
    (out_dir / name).write_text(
        f"---\n{fm}\n---\n\n# {seg['title']}\n\n{seg['body'].strip()}\n"
        f"{findings_block(found, '../../findings/')}{REVIEW_TEMPLATE}",
        encoding="utf-8",
    )
    return name


def main():
    findings = load_findings()
    docs = [p for p in sorted(SRC.iterdir()) if p.suffix in (".md", ".html") and p.name != "README.md"]
    by_source = {}
    for f in findings:
        by_source.setdefault(f["source"], []).append(f)

    manifest = {"documents": []}
    index = ["# Document segments for adversarial review", "",
             "Generated by `split_documents.py`; do not hand-edit (re-running overwrites). "
             "Each segment has a front-matter header (source file + line range), the review "
             "findings mapped to it, and a review worksheet.", ""]
    total = 0
    for path in docs:
        out_dir = HERE / slugify(path.stem)
        shutil.rmtree(out_dir, ignore_errors=True)
        out_dir.mkdir()
        doc_title, segs = (split_markdown if path.suffix == ".md" else split_html)(path)
        doc_findings = by_source.get(path.name, [])
        doc_level = [f for f in doc_findings if not f["lines"]]
        entries = []
        for idx, seg in enumerate(segs, 1):
            found = [f for f in doc_findings if f["lines"] and overlaps(f["lines"], seg["ranges"])]
            name = write_segment(out_dir, idx, seg, found)
            entries.append({
                "file": f"{out_dir.name}/{name}", "title": seg["title"], "kind": seg["kind"],
                "ranges": seg["ranges"], "findings": [f["id"] for f in found],
            })
        mapped = {fid for e in entries for fid in e["findings"]}
        unmapped = [f["id"] for f in doc_findings if f["lines"] and f["id"] not in mapped]
        manifest["documents"].append({
            "source": path.name, "slug": out_dir.name, "title": doc_title, "segments": entries,
            "document_findings": [f["id"] for f in doc_level], "unmapped_findings": unmapped,
        })
        total += len(entries)

        index += [f"## `{path.name}`", "", f"_{doc_title}_ — {len(entries)} segments", ""]
        if doc_level:
            index += ["Document-level findings (no single segment): " +
                      ", ".join(f"`{f['id']}`" for f in doc_level), ""]
        index += ["| Segment | Title | Kind | Source lines | Findings | Goal met? |",
                  "|---|---|---|---|---|---|"]
        index += [f"| [{e['file'].split('/')[1][:2]}]({e['file']}) | {e['title']} | {e['kind']} | "
                  f"{', '.join(f'{a}-{b}' for a, b in e['ranges'])} | {len(e['findings']) or '—'} | |"
                  for e in entries]
        index.append("")
    (HERE / "README.md").write_text("\n".join(index), encoding="utf-8")
    (HERE / "manifest.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    if findings:
        write_segment_map(manifest, {f["id"]: f for f in findings})
    print(f"{total} segments written, {len(findings)} findings mapped")


def write_segment_map(manifest, fmap):
    """Comparison of the segmentation against the review findings."""
    out = ["# Segments vs. review findings", "",
           "Generated by `segments/split_documents.py`. It shows how the review findings "
           "fall across the segments: where they cluster, which findings span several "
           "segments, and which segments have not been challenged yet.", ""]
    for d in manifest["documents"]:
        segs = d["segments"]
        hit = [s for s in segs if s["findings"]]
        crit = lambda s: sum(fmap[i]["severity"] == "critical" for i in s["findings"])
        multi = {}
        for s in segs:
            for fid in s["findings"]:
                multi.setdefault(fid, []).append(s["file"].split("/")[1][:2])
        multi = {k: v for k, v in multi.items() if len(v) > 1}
        out += [f"## `{d['source']}`", "",
                f"- Segments: **{len(segs)}**. With findings: **{len(hit)}**. "
                f"Not yet challenged: **{len(segs) - len(hit)}**.",
                f"- Document-level findings: {', '.join(d['document_findings']) or 'none'}",
                f"- Findings spanning several segments: " +
                (", ".join(f"{k} → segs {'+'.join(v)}" for k, v in multi.items()) or "none"),
                f"- Findings that match no segment (boundary problem): {', '.join(d['unmapped_findings']) or 'none'}",
                "", "| Seg | Title | Critical | Total | IDs |", "|---|---|---|---|---|"]
        for s in segs:
            out.append(f"| {s['file'].split('/')[1][:2]} | {s['title']} | {crit(s) or ''} | "
                       f"{len(s['findings']) or ''} | {', '.join(s['findings'])} |")
        out.append("")
    (FINDINGS_DIR / "segment-map.md").write_text("\n".join(out), encoding="utf-8")


if __name__ == "__main__":
    main()
