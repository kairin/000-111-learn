#!/usr/bin/env python3
"""Extract the findings tables of review files into a findings data file.

Usage:
  python3 review/findings/extract_findings.py --docs 05-12 --out pass1-video-guides.json

The script reads review/adversarial-review-pass1/NN-*.review.md for each document
number NN in the range. It reads the source file name from the "target:" line of
the front matter. It parses the rows of the "### Critical", "### Major" and
"### Minor" tables: | ID | Location | (Claim |) Problem | Tag |.

If the output file exists, the script keeps the status, note and lines of each
finding that it finds there again (by ID). Thus, a new run does not lose work.
"""
import argparse
import json
import re
from pathlib import Path

REVIEW = Path(__file__).resolve().parent.parent
TAGS = r"\[(DOC|KNOW|VERIFY|VIDEO)\]"
SEV = {"Critical": "critical", "Major": "major", "Minor": "minor", "Minor / technical": "minor"}


def parse(review_file, num):
    text = review_file.read_text(encoding="utf-8")
    m = re.search(r"^target:\s*\.\./segments/(.+?)\s*$", text, re.M)
    if not m:
        raise SystemExit(f"{review_file.name}: no 'target: ../segments/<file>' line in the front matter")
    source = m.group(1)
    out, sev = [], None
    for line in text.splitlines():
        if line.startswith("### "):
            sev = SEV.get(line[4:].strip())
            continue
        row = re.match(r"\|\s*([CMm]\d+)\s*\|(.*)\|\s*$", line)
        if not (row and sev):
            continue
        cells = [c.strip() for c in row.group(2).split("|")]
        loc = cells[0]
        tag = cells[-1] if re.search(TAGS, cells[-1]) else ""
        body = cells[1:-1] if tag else cells[1:]
        own = re.sub(r"report L\d+", "", loc)  # "report L144" points to a different document
        ranges = [[int(a), int(b or a)] for a, b in re.findall(r"L(\d+)(?:[–-](\d+))?", own)]
        tags = re.findall(TAGS, tag)
        out.append({
            "id": f"D{num}-{row.group(1)}", "doc": num, "source": source, "severity": sev,
            "location": loc, "lines": ranges,
            "claim": body[0] if len(body) > 1 else "", "problem": body[-1],
            "tags": tags, "status": "verify" if "VERIFY" in tags else "open", "pass": 1,
            "scope": "lines" if ranges else "document",
        })
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs", required=True, help="a range of document numbers, for example 05-12")
    ap.add_argument("--out", required=True, help="the output file name in review/findings/")
    args = ap.parse_args()
    lo, hi = (int(x) for x in args.docs.split("-"))
    out_path = REVIEW / "findings" / args.out
    old = {f["id"]: f for f in json.loads(out_path.read_text())} if out_path.exists() else {}
    findings = []
    for num in range(lo, hi + 1):
        files = sorted((REVIEW / "adversarial-review-pass1").glob(f"{num:02d}-*.review.md"))
        if not files:
            print(f"warning: no review file for document {num:02d}")
            continue
        for f in parse(files[0], f"{num:02d}"):
            if f["id"] in old:  # keep the work that the owner recorded
                for k in ("status", "note", "lines", "scope"):
                    if k in old[f["id"]]:
                        f[k] = old[f["id"]][k]
            findings.append(f)
    out_path.write_text(json.dumps(findings, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(findings)} findings -> {out_path}")
    for f in findings:
        if not f["lines"]:
            print(f"  no line numbers: {f['id']} ({f['location']})")


if __name__ == "__main__":
    main()
