# Review workspace: Assembly vs. Fortran documents

## What this folder is

This folder is **background research**. The learning content is not here.

Four guides that an AI (Google Gemini) wrote helped to start the idea. The four guides compare two programming languages, **Assembly** and **Fortran**. Each guide asks which language to learn in 90 days (the rest of 2026). The review in this folder examines each guide. It asks two questions: does the guide do what it says, and are its claims true? The review also shows areas that the owner did not think about.

The learning content is in [`../learn/`](../learn/). It has two sides: the **A side** (Assembly) and the **B side** (Fortran). This learning content is the center of the website.

## Documents under review

The four documents are in `segments/`.

| # | File | Format | Question it answers | Made from |
|---|---|---|---|---|
| 01 | `Assembly-Fortran-Comparison.md` | Report | Which language to learn in 90 days for **career and skills**? | none |
| 02 | `Assembly-Versus-Fortran-Comparison.md` | Report | Which language to learn in 90 days to **build an 80s/90s-constrained game**? | none |
| 03 | `assembly_vs_fortran_learning_advisor.html` | Interactive page | Same as 01, as a quiz, roadmap and charts | 01 |
| 04 | `retro_game_dev_language_advisor.html` | Interactive page | Same as 02, as a quiz, roadmap and charts | 02 |

**Do not edit the source documents.** Each review finding points to line numbers in these files. A **finding** is one problem that the review found in a document.

## Words used in this README

- A **document part** is one small unit of a source document. Each part makes one claim or has one goal. The website also uses the name "document parts".
- The folder `segments/` and the script `split_documents.py` use the older word "segment". This README keeps those names because the scripts use them.
- On the website, the word **segment** has a different meaning. It is one of seven learning segments. A learning segment is a job that a language must be able to say, for example "Doing arithmetic".

## Folder layout

```
000-111-learn/
├── learn/                           ← the learning content: A side, B side, segments, dictionaries
├── review/                          ← the background research (this folder)
│   ├── README.md                    ← this file: process, status, how to continue
│   ├── segments/
│   │   ├── <the 4 source documents>
│   │   ├── split_documents.py       ← divides the documents into parts + maps findings onto parts
│   │   ├── README.md                ← (generated) index of all 56 document parts with finding counts
│   │   ├── manifest.json            ← (generated) document part → line ranges → finding IDs
│   │   └── <doc-slug>/NN-*.md       ← (generated) 22 + 20 + 7 + 7 document-part files
│   ├── findings/
│   │   ├── pass1.json               ← SOURCE OF TRUTH: the 61 pass-1 findings
│   │   ├── status.json              ← status/note changes per finding (edit on GitHub)
│   │   ├── documents.json           ← result for each document in each pass
│   │   └── segment-map.md           ← (generated) document parts vs. findings comparison
│   └── adversarial-review-pass1/    ← the pass-1 write-ups (narrative)
│       ├── 00-SUMMARY.md
│       └── 01-…review.md … 04-…review.md
├── site/                            ← Astro + Starlight website (reads learn/ and review/)
├── serve/                           ← (generated, not committed) build output
└── .github/workflows/pages.yml      ← GitHub Actions: build site/ → serve/ → GitHub Pages
```

A script writes the files marked **(generated)** again on each run. Thus, do not edit them by hand.

## Step 1: Divide the documents into parts (`segments/`)

The script `segments/split_documents.py` divides each source document into document parts. Each part is the smallest unit that makes a claim or has a goal of its own.

- The script divides **Markdown reports** at each heading:
  - the title and opening paragraph,
  - the introduction text of each `##` section, before its first subsection,
  - each `###` subsection,
  - the "Works cited" list.
- The script divides **HTML pages** at each `<section>`. Each document part holds:
  - the readable text,
  - the page code that the section uses (quiz scores, roadmap data, chart numbers),
  - the original HTML, in a collapsed block.

Each document-part file has:
- a front-matter header: `source`, `kind`, `lines`, and `findings` (the IDs mapped to it),
- a **"Review findings for this part"** table,
- a blank review worksheet (goal, key claims, adversarial review, evaluation).

The Markdown parts include each source line exactly one time.

**Make the parts again:** `python3 review/segments/split_documents.py`. This command writes over the document-part files. Record review decisions in `findings/*.json`, not in the worksheets. If you filled in a worksheet, copy it to a different location first.

## Step 2: Adversarial review, pass 1 (`adversarial-review-pass1/`)

An **adversarial review** tries to prove each claim wrong.

**Method.** The reviewer read each document in full. This included the salary figures that report 01 shows as images (decoded) and the page code in the two HTML files. Then the reviewer did these steps:
1. Wrote down the goals of each document and gave each goal a result: **Met / Partly / No**.
2. Examined each claim in four areas: internal consistency, arithmetic, technical and historical accuracy, and support from the cited source.
3. Gave each finding a level (**Critical / Major / Minor**), a source line location and an evidence tag.

| Tag | Meaning |
|---|---|
| **[DOC]** | The document itself proves it (contradiction, arithmetic, missing data, code behavior) |
| **[KNOW]** | Knowledge of the reviewer, high confidence, not yet compared with a primary source |
| **[VERIFY]** | A possible problem. Pass 2 must compare it with a source |

**Not done in pass 1:** the reviewer did not get any cited source. Thus, the [KNOW] and [VERIFY] findings are provisional.

| Document | Goal met? | Critical | Major | Headline |
|---|---|---|---|---|
| 01 Career report | Partly | 3 | 9 | Broken salary data. LANL claim cited to a Freelancer page. Milestones not like-for-like |
| 02 Retro game report | No | 5 | 10 | Its Fortran advantages do not exist on its 80s/90s target. History contradicts its genre mapping |
| 03 Career advisor page | No / Partly | 4 | 4 | The quiz only repeats answers and gives a verdict after one click. The salary chart changes the numbers of its source |
| 04 Retro advisor page | No | 5 | 5 | FORTRAN 77 fixed-/free-form contradiction. Impossible "locked 60 fps". Invented charts |

## Step 3: Findings as data, mapped onto document parts

The pass-1 write-ups contain 61 findings. Each finding is one record in `findings/pass1.json`:
- `id`: for example, `D02-C3` = document 02, Critical #3,
- severity, evidence tags, location, source line ranges, claim, problem,
- `status`: `open`, `verify`, `confirmed`, `disputed`, `fixed`, or `wont-fix`.

**This JSON file is the source of truth for findings.** The pass-1 Markdown write-ups stay as the narrative record.

`split_documents.py` maps each finding onto each document part whose line range it overlaps. For HTML parts, this includes the linked script lines. The script writes the comparison to `findings/segment-map.md`. Pass-1 results:

| Document | Document parts | With findings | Not yet challenged | Document-level | Outside all parts |
|---|---|---|---|---|---|
| 01 | 22 | 15 | 7 (01, 09, 12, 18, 19, 20, 22) | none | none |
| 02 | 20 | 16 | 4 (01, 09, 13, 20) | D02-M10 | none |
| 03 | 7 | 4 | 3 (01, 04, 07) | D03-M4 | D03-m1, D03-m2 (`<head>` scripts) |
| 04 | 7 | 6 | 1 (07) | D04-M5 | none |

What the comparison shows:
- The division into parts is correct: **no finding crosses a boundary badly**. Only two findings are outside all parts. They are about `<head>` script tags, which are page structure, not content.
- **Findings collect** on:
  - the Fortran-technical part of doc 01 (part 07: 5 findings),
  - the labor-market parts of doc 01 (parts 15 to 17),
  - the verdict parts of doc 02 (parts 16 to 18),
  - the chart and quiz parts of the HTML pages.
- **Findings across parts**: some findings attack a claim that occurs in more than one part. The largest is D02-C4 ("locked 60/70 fps"), in 4 parts. This shows how often the documents repeat the claim. It is not a problem with the division.
- **"Not yet challenged" does not mean "correct".** These parts are mostly introductions, decision tables and works-cited lists. Pass 2 must examine them.

## Step 4: The website (`site/`, Astro + Starlight)

`site/` is an [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) project. Astro and Starlight are tools that make a website from text files. The site is static (fixed files), so GitHub Pages can host it at no cost.

The script `site/scripts/sync-content.mjs` runs automatically before each build. It reads `learn/` and `review/`. It does these jobs:
- It makes a Starlight page from each `review/**.md` file and changes the links between them.
- It copies the two original Gemini HTML pages with no changes. Their quizzes and charts still work.
- It writes the data for the website pages. This data comes from `learn/`, `findings/*.json`, `segments/manifest.json`, and the status list and log of this README.

Git ignores the generated folders (`site/src/content/docs`, `site/src/data`, `site/public/sources`).

**Build on your computer** (optional): `cd site && npm ci && npm run build` writes to `serve/`. Then `npx astro preview` shows the site at `http://localhost:4321/000-111-learn/`. To see changes while you edit, use `npm run dev`. You must have Node 22.12 or later.

What the site has:
- **Home page** (`/`): the two sides (A side and B side) and the parts-of-speech lens.
- **Learning segment pages**: each learning segment has an A page and a B page. Each page shows:
  - strengths and limits,
  - one example sentence,
  - the words, in groups by part of speech,
  - "Watch out" notes from the review.
- **Dictionary page**: all words, with filters and search.
- **Compare page**: the A side and the B side together.
- **Review dashboard** (`/review/`): progress cards, the resolved-findings bar, the document scorecard, a clickable **heatmap of document parts**, and the status checklist and log of this README.
- **Findings explorer** (`/findings/`):
  - filters by document, severity, evidence and status, and a text search,
  - columns that you can sort, and filter URLs that you can share (for example, `#doc=02&severity=critical`),
  - links to the related document parts,
  - status and note drafts that your browser keeps.
- **Each page from `review/`**: plan, decisions, session records, reviews, sources and all 56 document parts, in a sidebar. Each page has an "Edit page" link. It opens the source file in `review/` on GitHub.
- Full-text search (Pagefind), light, dark and auto themes, and a layout for phones.
- **Link previews** (Facebook, LinkedIn, X, chat apps): each page has Open Graph tags. The script `site/scripts/og-image.mjs` makes the 1200×630 preview image (numbers and heatmap) again on each build. On each deploy:
  - The image link changes (`og-image.png?v=<commit>`). Thus, Facebook gets the new image and does not use an old copy.
  - The `refresh-link-previews` job of the workflow asks Facebook to read the homepage, findings and plan pages again. This job needs the repository secret `FACEBOOK_APP_TOKEN`. If the secret is not there, the job stops and shows a notice.
  - **Setup (one time only):**
    1. Make a Facebook app at [developers.facebook.com](https://developers.facebook.com/apps/). Use the type "Business" or "None". Facebook does not need to review the app for this job.
    2. Copy its **App ID** and **App Secret**.
    3. In this repository, run `gh secret set FACEBOOK_APP_TOKEN`. When the command asks, paste `<app-id>|<app-secret>`. The value does not show in the command or in the logs.
  - **Manual method:** paste the URL into the Facebook [Sharing Debugger](https://developers.facebook.com/tools/debug/). Then click **Scrape Again**.

**How to record finding statuses on a static site:**
1. **Permanent:** on the findings page, click **edit `review/findings/status.json` on GitHub**. Add or change an entry, for example:
   ```json
   "D02-C3": {"status": "confirmed", "note": "…", "updated": "2026-10-01"}
   ```
   Commit the change in the browser. GitHub Actions then builds the site again in about one minute.
2. **Drafts:** change the statuses in the table. Then click **Copy status.json** to get the full file. You can paste it into the GitHub editor.

## Publishing to GitHub Pages (GitHub Actions)

- **Repository (public):** https://github.com/kairin/000-111-learn
- **Live site:** https://kairin.github.io/000-111-learn/

Each push to `main` starts `.github/workflows/pages.yml` on GitHub. This workflow does these steps:
1. It divides the documents into parts again (`review/segments/split_documents.py`).
2. It builds the site (`site/`, `npm ci && npm run build`).
3. It puts `serve/` on GitHub Pages (Settings → Pages → Source: **GitHub Actions**).

GitHub Actions is free for public repositories. **Daily use:** edit files in `learn/` or `review/` (on your computer or in the GitHub web editor). Then commit and push. You do not need to build anything on your computer.

**Note:** the workflow makes the document-part files again for the site only. It does not commit them back. If you change `findings/*.json` on your computer, run `python3 review/segments/split_documents.py` before you commit. Then the document-part files in the repository agree with the findings.

(Before this, on 2026-09-27, local git hooks built the site, and a `gh-pages` branch served it. The current setup replaced that method. See [plan/DECISIONS.md](plan/DECISIONS.md), D9 and D10.)

## Plan and decisions

- **[plan/PLAN.md](plan/PLAN.md):** the roadmap. It includes Assembly and Fortran that run in the browser (WebAssembly and emulators) and the 90-day learning track.
- **[plan/DECISIONS.md](plan/DECISIONS.md):** decisions that are made, replaced or **open**.
- **[plan/sessions/2026-09-27.md](plan/sessions/2026-09-27.md):** the record of the first work session.

## Status and next steps

- [x] Divide the documents into document parts (56)
- [x] Adversarial review, pass 1 (desk review)
- [x] Put the findings into JSON and map them onto document parts (61 findings)
- [x] Build the review-tracker website into `serve/`
- [x] Make the public GitHub repository and start Pages
- [x] Replace the Actions deployment with local hooks and a `gh-pages` branch
- [x] Decide the primary goal: **learn both**, for use and for fun, through a constrained game that you can play on this site (D11)
- [ ] **Choose how the two languages share the game** (decision O7), then the game concept and limits (O8)
- [x] Move the site to Astro + Starlight, built and deployed by GitHub Actions (D10, D12)
- [x] Make the language lens the center of the site (D16)
- [x] Write all documents in ASD-STE100 (D17)
- [x] Make the first test of the game: the two sides agree on 256 of 256 values (D19, D20)
- [ ] Browser-run Assembly and Fortran demos (PLAN.md, Phase 4)
- [ ] Pass 2: get and examine the high-risk citations (the checklist is at the end of each pass-1 review):
  - the LANL Fortran report,
  - the dependency of OpenCoarrays on MPI,
  - the release status of LFortran,
  - the Microsoft FORTRAN 5.x graphics library,
  - the programming language of Elite, Frontier: Elite II and M.U.L.E.
- [ ] Pass 2: challenge the 15 "not yet challenged" document parts
- [ ] Change the remaining document(s) to agree with the chosen goal

## Log

| Date | Step | Output |
|---|---|---|
| 2026-09-27 | Divided 4 documents into 56 units with review worksheets | `segments/` |
| 2026-09-27 | Moved documents and document parts into `review/`, then documents into `review/segments/` (by user) | none |
| 2026-09-27 | Adversarial review, pass 1 (no sources fetched) | `adversarial-review-pass1/` |
| 2026-09-27 | Wrote the process and status | `README.md` |
| 2026-09-27 | Put 61 findings into JSON. Mapped them onto document parts. Wrote a comparison report | `findings/` |
| 2026-09-27 | Built the review-tracker static site and GitHub Pages workflow | `site/`, `serve/`, `.github/` |
| 2026-09-27 | Published public repo and started GitHub Pages (Actions) | https://kairin.github.io/000-111-learn/ |
| 2026-09-27 | Removed the Actions workflow. Local git hooks built the site, and `gh-pages` served it | `.githooks/`, `site/regenerate.sh` |
| 2026-09-27 | Wrote the plan (with in-browser Assembly/Fortran), the decision log, and the session record | `plan/` |
| 2026-09-27 | Goal decided: learn both through a constrained game that you can play in the browser. Site moved to Astro + Starlight on GitHub Actions. Hooks and `gh-pages` removed | `site/`, `.github/`, `plan/` |
| 2026-09-27 | Language lens (A side, B side), dictionaries, STE writing standard. Review moved to background research | `learn/`, `site/` |
| 2026-09-27 | Decisions D19 and D20. First test of the game: Fortran table, 8086 program in js-dos, check in DOSBox | `game/`, `site/` |
