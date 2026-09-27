# Review workspace: Assembly vs. Fortran documents

This folder holds four AI-generated (Google Gemini) documents that compare learning **Assembly** and **Fortran** within a 90-day window (the rest of 2026). It also holds the material for reviewing them adversarially: checking whether each document achieves its goals and whether its claims hold up.

## Documents under review

The four documents live in `segments/`.

| # | File | Format | Question it answers | Derived from |
|---|---|---|---|---|
| 01 | `Assembly-Fortran-Comparison.md` | Report | Which language to learn in 90 days for **career and skills**? | none |
| 02 | `Assembly-Versus-Fortran-Comparison.md` | Report | Which language to learn in 90 days to **build an 80s/90s-constrained game**? | none |
| 03 | `assembly_vs_fortran_learning_advisor.html` | Interactive page | Same as 01, as a quiz, roadmap and charts | 01 |
| 04 | `retro_game_dev_language_advisor.html` | Interactive page | Same as 02, as a quiz, roadmap and charts | 02 |

**Do not edit the source documents.** Every review finding points to line numbers in these files.

## Folder layout

```
000-111-learn/
├── review/                          ← everything you edit lives here
│   ├── README.md                    ← this file: process, status, how to continue
│   ├── segments/
│   │   ├── <the 4 source documents>
│   │   ├── split_documents.py       ← splits the documents + maps findings onto segments
│   │   ├── README.md                ← (generated) index of all 56 segments with finding counts
│   │   ├── manifest.json            ← (generated) segment → line ranges → finding IDs
│   │   └── <doc-slug>/NN-*.md       ← (generated) 22 + 20 + 7 + 7 segment files
│   ├── findings/
│   │   ├── pass1.json               ← SOURCE OF TRUTH: the 61 pass-1 findings
│   │   ├── status.json              ← (optional) status/notes exported from the website
│   │   ├── documents.json           ← per-document verdicts per pass
│   │   └── segment-map.md           ← (generated) segments vs. findings comparison
│   └── adversarial-review-pass1/    ← the pass-1 write-ups (narrative)
│       ├── 00-SUMMARY.md
│       └── 01-…review.md … 04-…review.md
├── site/                            ← website generator (build.py + assets/)
├── serve/                           ← (generated) static website; copied to the gh-pages branch on push
└── .githooks/                       ← pre-commit: regenerate + stage; pre-push: publish gh-pages
```

Files marked **(generated)** are overwritten on every run, so don't hand-edit them.

## Step 1: Segmentation (`segments/`)

`segments/split_documents.py` splits each source document into the smallest units that each make a claim or serve a goal of their own.

- **Markdown reports** are split at every heading:
  - the title and opening paragraph,
  - each `##` section's introductory text before its first subsection,
  - each `###` subsection,
  - the "Works cited" list.
- **HTML pages** are split per `<section>`. Each segment holds:
  - the readable text,
  - the page code the section depends on (quiz scoring, roadmap data, chart numbers),
  - the original HTML, in a collapsed block.

Every segment file has:
- a front-matter header: `source`, `kind`, `lines`, and `findings` (the IDs mapped to it),
- a **"Review findings mapped to this segment"** table,
- a blank review worksheet (goal, key claims, adversarial review, evaluation).

The Markdown splits cover every source line exactly once.

**Regenerate:** `python3 review/segments/split_documents.py`. This overwrites the segment files. Record review judgements in `findings/*.json`, not in the segment worksheets, or copy a filled worksheet somewhere else first.

## Step 2: Adversarial review, pass 1 (`adversarial-review-pass1/`)

**Method.** Each document was read in full, including the salary figures embedded as images in report 01 (decoded) and the page code in both HTML files. Then:
1. Goals and objectives were written down and each judged **Met / Partly / No**.
2. Claims were attacked on four fronts: internal consistency, arithmetic, technical and historical accuracy, and whether the cited source supports them.
3. Findings were ranked **Critical / Major / Minor**, with a source line location and an evidence tag.

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (contradiction, arithmetic, missing data, code behaviour) |
| **[KNOW]** | Reviewer domain knowledge, high confidence, not yet checked against a primary source |
| **[VERIFY]** | Plausible problem; must be confirmed against a source in pass 2 |

**Not done in pass 1:** no cited source was fetched. The [KNOW] and [VERIFY] findings are provisional.

| Document | Goal met? | Critical | Major | Headline |
|---|---|---|---|---|
| 01 Career report | Partly | 3 | 9 | Broken salary data; LANL claim cited to a Freelancer page; milestones not like-for-like |
| 02 Retro game report | No | 5 | 10 | Its Fortran advantages don't exist on its 80s/90s target; history contradicts its genre mapping |
| 03 Career advisor page | No / Partly | 4 | 4 | Quiz only restates answers and gives a verdict after one click; salary chart changes its source's numbers |
| 04 Retro advisor page | No | 5 | 5 | FORTRAN 77 fixed-/free-form contradiction; impossible "locked 60 fps"; invented charts |

## Step 3: Findings as data, mapped onto segments

The 61 findings in the pass-1 write-ups were extracted into `findings/pass1.json`, one record each:
- `id`: e.g. `D02-C3` = document 02, Critical #3,
- severity, evidence tags, location, source line ranges, claim, problem,
- `status`: `open`, `verify`, `confirmed`, `disputed`, `fixed`, or `wont-fix`.

**From now on this JSON is the source of truth for findings.** The pass-1 Markdown write-ups stay as the narrative record.

`split_documents.py` maps each finding onto every segment whose line range it overlaps. For HTML segments, this includes the linked script lines. The comparison is written to `findings/segment-map.md`. Pass-1 results:

| Document | Segments | With findings | Not yet challenged | Document-level | Outside every segment |
|---|---|---|---|---|---|
| 01 | 22 | 15 | 7 (01, 09, 12, 18, 19, 20, 22) | — | — |
| 02 | 20 | 16 | 4 (01, 09, 13, 20) | D02-M10 | — |
| 03 | 7 | 4 | 3 (01, 04, 07) | D03-M4 | D03-m1, D03-m2 (`<head>` scripts) |
| 04 | 7 | 6 | 1 (07) | D04-M5 | — |

What the comparison shows:
- The segmentation holds up: **no finding falls across a boundary badly**. The only findings outside every segment are the two about `<head>` script tags, which are page scaffolding rather than content.
- **Findings cluster** on:
  - the Fortran-technical segment of doc 01 (seg 07: 5 findings),
  - the labour-market segments of doc 01 (segs 15–17),
  - the verdict segments of doc 02 (segs 16–18),
  - the chart and quiz segments of the HTML pages.
- **Spanning findings**: several findings attack a claim repeated across segments. The largest is D02-C4 ("locked 60/70 fps"), which spans 4 segments. That reflects how often the documents repeat the claim, not a segmentation problem.
- **"Not yet challenged" is not "verified correct".** Those segments (mostly introductions, decision tables and works-cited lists) are the targets for pass 2.

## Step 4: Review-tracker website (`site/` → `serve/`)

`site/build.py` turns `review/` into a static website in `serve/`. It needs no framework: it uses Python plus the `markdown` package, which `uv` fetches automatically. The output is plain HTML, CSS and JavaScript that runs with no server code, so GitHub Pages can host it for free.

**Build:** from `000-111-learn/` run `uv run site/build.py`. **Preview:** `python3 -m http.server -d serve 8000`, then open `http://localhost:8000`.

What the site has:
- **Dashboard** (`index.html`):
  - progress cards and a resolved-findings bar,
  - the document scorecard,
  - a clickable **segment heatmap** (colour = worst finding, dashed = not yet challenged),
  - this README's status checklist and log.
- **Findings** (`findings/index.html`):
  - filter by document, severity, evidence and status, plus free-text search,
  - sortable columns,
  - shareable filter URLs (e.g. `#doc=02&severity=critical`),
  - links to the affected segments,
  - an **editable status and note on each finding**.
- **Segments**: every segment as a page, with metadata, mapped findings, worksheet, and previous/next navigation.
- **Reviews** and **Process**: the pass-1 write-ups and this README, rendered.
- **Original documents**: the reports rendered, and the two HTML advisors copied unchanged, so their quizzes and charts still work.
- Site-wide search (press `/`) and a light/dark toggle.

**How tracking works on a static site.** GitHub Pages can't save anything, so status changes follow a commit loop:
1. On the Findings page, change statuses and notes. They are saved in your browser only.
2. Click **Export status.json** and save it as `review/findings/status.json`.
3. `git add review/findings/status.json && git commit && git push`. The hooks rebuild and publish the site, and git history becomes the audit trail.

## Publishing to GitHub Pages (local build, no Actions)

- **Repository (public):** https://github.com/kairin/000-111-learn
- **Live site:** https://kairin.github.io/000-111-learn/

Nothing is built on GitHub, and the repository has no Actions workflow. Two local git hooks in `.githooks/` do the work:

| Hook | Runs on | What it does |
|---|---|---|
| `pre-commit` | every `git commit` | Runs `site/regenerate.sh`, which takes a snapshot of the **staged** files, re-splits the segments, re-maps the findings, rebuilds `serve/`, and **stages the regenerated files into the same commit**. If the build fails, the commit is aborted. |
| `pre-push` | `git push` of `main` | Copies the pushed commit's `serve/` folder into a new commit on the **`gh-pages`** branch and pushes `gh-pages` too. It skips this if the site is unchanged. |

GitHub Pages is set to **Deploy from a branch: `gh-pages` / (root)**. GitHub still runs its own built-in publish step after `gh-pages` changes; every Pages site gets this, and it can't be disabled. That step only copies the files, because `.nojekyll` switches off Jekyll processing.

**Daily use:** edit `review/…`, then `git add … && git commit && git push`. That's all.

**Rules:**
- **New clone:** hooks aren't cloned. Enable them once with `git config core.hooksPath .githooks`. You also need `uv`, `python3` and `rsync`.
- **Don't edit generated files by hand** (`serve/`, segment files, `manifest.json`, `segment-map.md`). Each commit overwrites them.
- The build is **deterministic**: there are no timestamps and `markdown` is pinned. Commits that don't touch `review/` or `site/` therefore produce no site changes.
- `git commit --no-verify` skips regeneration, and the site can then lag behind. Run `site/regenerate.sh` and commit to catch up.
- **Never commit to `gh-pages` by hand.** The pre-push hook owns it.

## Status and next steps

- [x] Split the documents into segments (56)
- [x] Adversarial review, pass 1 (desk review)
- [x] Extract findings to JSON and map them onto segments (61 findings)
- [x] Build the review-tracker website into `serve/`
- [x] Create the public GitHub repository and enable Pages
- [x] Replace the Actions deployment with local hooks and a `gh-pages` branch
- [ ] **Decide the primary goal: career skill or retro game.** This decides which document is worth revising.
- [ ] Pass 2: fetch and check the high-stakes citations (the checklist is at the end of each pass-1 review):
  - the LANL Fortran report,
  - OpenCoarrays' dependency on MPI,
  - LFortran's release status,
  - the Microsoft FORTRAN 5.x graphics library,
  - the implementation language of Elite, Frontier: Elite II and M.U.L.E.
- [ ] Pass 2: challenge the 15 "not yet challenged" segments
- [ ] Revise the surviving document(s) against the chosen goal

## Log

| Date | Step | Output |
|---|---|---|
| 2026-09-27 | Segmented 4 documents into 56 units with review worksheets | `segments/` |
| 2026-09-27 | Moved documents and segments into `review/`, then documents into `review/segments/` (by user) | — |
| 2026-09-27 | Adversarial review, pass 1 (no sources fetched) | `adversarial-review-pass1/` |
| 2026-09-27 | Documented process and status | `README.md` |
| 2026-09-27 | Extracted 61 findings to JSON; mapped onto segments; comparison report | `findings/` |
| 2026-09-27 | Built the review-tracker static site and GitHub Pages workflow | `site/`, `serve/`, `.github/` |
| 2026-09-27 | Published public repo and enabled GitHub Pages (Actions) | https://kairin.github.io/000-111-learn/ |
| 2026-09-27 | Removed the Actions workflow; the site is now built locally by git hooks and served from `gh-pages` | `.githooks/`, `site/regenerate.sh` |
