# Plan: learning Assembly or Fortran in the rest of 2026, with a public review tracker

**Last updated:** 2026-09-27 · **Decisions:** [DECISIONS.md](DECISIONS.md) · **Session record:** [sessions/2026-09-27.md](sessions/2026-09-27.md)

## Goal

Pick **one** language, Assembly or Fortran, and learn it in the roughly 90 days left in 2026 (October to December). Four Gemini-generated guides frame the choice. They are being reviewed adversarially before anyone relies on them. This repository holds:
- the review,
- the evidence for it (including code that runs in the browser),
- the learning work itself,

all published as a static website on GitHub Pages.

- Repository: https://github.com/kairin/000-111-learn
- Live site: https://kairin.github.io/000-111-learn/

## Phases

| Phase | What | Status |
|---|---|---|
| 0 | Segment the 4 documents, adversarial review pass 1, tracker site, public repo and Pages | **Done** |
| 1 | Decide the primary learning goal (career or retro game) | **Open** (decision O1) |
| 2 | Review pass 2: check the sources, and challenge the untested segments | Not started |
| 3 | Move the site to GitHub Actions with the chosen tool | Actions decided; tool **open** (O2) |
| 4 | Interactive evidence: Assembly and Fortran running in the browser | Planned; order **open** (O3) |
| 5 | The 90-day learning track itself, publishing a runnable artifact per milestone | Depends on O1 |

## Phase 0: done (2026-09-27)

- 4 source documents split into 56 segments (22 + 20 + 7 + 7). See `review/segments/`.
- Adversarial review pass 1: 61 findings (17 critical, 28 major, 16 minor). See `review/adversarial-review-pass1/`.
- Findings stored as data (`review/findings/pass1.json`) and mapped onto segments (`review/findings/segment-map.md`).
- Tracker site built by `site/build.py` into `serve/`, published from the public repo.
- Currently the site is **built locally by git hooks** and served from the `gh-pages` branch. This is being replaced by GitHub Actions (Phase 3).

## Phase 1: decide the learning goal

The two reports answer different questions and point to different languages:
- **Report 01, career and skills:** leans toward **Fortran**, to ship numerical software.
- **Report 02, 80s/90s retro game:** ends on **Assembly**, and overrides its own decision tree to do so.

The pass-1 review found report 02 much weaker. Neither report considers **C**. This decision determines:
- which report is worth revising,
- which browser demos matter most (Phase 4),
- what the 90-day track looks like (Phase 5).

## Phase 2: review pass 2

- [ ] Check the high-stakes sources (the checklists are at the end of each pass-1 review):
  - the LANL Fortran report,
  - whether OpenCoarrays depends on MPI,
  - LFortran's release status,
  - the Microsoft FORTRAN 5.x graphics library,
  - the implementation language of *Elite*, *Frontier: Elite II* and *M.U.L.E.*
- [ ] Challenge the 15 segments no finding has touched yet:
  - doc 01, segments 01, 09, 12, 18, 19, 20, 22,
  - doc 02, segments 01, 09, 13, 20,
  - doc 03, segments 01, 04, 07,
  - doc 04, segment 07.
- [ ] Update statuses in the findings data: `verify` becomes `confirmed` or `disputed`.

## Phase 3: move the site to GitHub Actions

Decided: the repository is public, so GitHub Actions is free and does the build. Consequences:
- remove the local git hooks (`.githooks/`) and the `gh-pages` branch,
- `serve/` stops being committed and becomes build output,
- Pages source switches back to "GitHub Actions".

The **site tool is still open** (O2). Candidates, all of which produce static pages that show data and are interactive in the browser:

| Tool | Best at | Main cost |
|---|---|---|
| **Astro + Starlight** (recommended) | Many document pages (sidebar, full-text search, dark mode) plus interactive components ("islands") for the dashboard, heatmap and findings table. Checks the findings JSON against a schema at build time. | Node packages; the interactive components still have to be written |
| Observable Framework | Data dashboards: reactive Markdown, charts, filter and table inputs, SQL in the browser | Less suited to 56 document pages; check how actively it is maintained |
| Quarto | Report-style pages with interactive figures; Python-friendly | Less flexible navigation and custom interactivity |
| Keep `site/build.py`, run it in Actions | No migration; all current features stay | About 450 lines of custom site code to maintain |

**Status tracking on a static site** (O4): the recommendation is an **"Edit on GitHub"** link on each finding. It opens `review/findings/status.json` in GitHub's web editor; you commit in the browser and Actions rebuilds the site. The alternatives are one GitHub Issue per finding, or keeping the current export-a-file step.

## Phase 4: Assembly and Fortran running in the browser

A static page can run compiled code in the visitor's browser through **WebAssembly (Wasm)**. The code is compiled during the GitHub Actions build. The page loads the result, and a small JavaScript file connects it to sliders, buttons and charts. No server is involved.

### Fortran: compile to WebAssembly

| Route | How it works | Maturity |
|---|---|---|
| **LFortran** (`--backend=wasm`) | Compiles Fortran straight to Wasm. LFortran's own compiler also runs in the browser, so visitors could type and run Fortran. | Beta, supports a subset of Fortran. Test early. |
| **LLVM Flang + Emscripten** | The LLVM Fortran compiler produces Wasm; Emscripten supplies the runtime. The Pyodide project uses this route for scientific Fortran libraries such as LAPACK. | Works; more setup. Best for serious numerical code. |
| **f2c + Emscripten** | Converts FORTRAN 77 to C, then compiles the C to Wasm. | Old but reliable; FORTRAN 77 only. |

### Assembly: depends on the target

| Route | How it works | Fit |
|---|---|---|
| **Emulate the original machine** | NASM builds a DOS `.COM`/`.EXE` at build time; **js-dos** (DOSBox compiled to Wasm) runs it inside the page. For a full PC, **v86** emulates x86. There are 6502 and RISC-V emulators in JavaScript too. | **Best fit for report 02.** A real Mode 13h demo lets readers see the "70 Hz" and "tearing" claims for themselves. |
| **Write WebAssembly text directly** | WebAssembly's own assembly-like text format (`.wat`) runs natively, with no emulator. | Teaches assembly concepts (stack machine, locals, linear memory), but it isn't x86 or ARM. |
| **Assembler and emulator in the page** | The assembler and CPU emulator ship as Wasm or JavaScript, so readers edit and run assembly live (e.g. a RISC-V simulator, or small 6502 environments). | Good for interactive lessons; larger download. |

### How it fits the build

1. **Build (GitHub Actions):** install NASM, LFortran or Emscripten; compile `.f90` and `.asm` sources to `.wasm` or `.com`; copy them into the site with a loader script.
2. **Browser:** the static page loads and runs them.
3. **With Astro:** each demo is one interactive component, placed next to the review finding it proves or disproves. It loads only on that page.

### Limits

- **Threads:** multithreaded Wasm (Emscripten pthreads, parallel Fortran) needs server settings GitHub Pages can't set. The workaround is the small `coi-serviceworker` script. Single-threaded code needs nothing extra.
- **Size:** js-dos, v86 and in-browser compilers add a few MB. Load them only on demo pages.

### First two demos (proofs of concept)

1. **Fortran:** a small numerical kernel (e.g. a 1-D heat equation) compiled to Wasm, with a slider for the grid size and a live chart. It also tests LFortran against report 01's claims about modern Fortran tooling.
2. **Assembly:** a NASM Mode 13h program running in js-dos. It tests report 02's frame-rate and tearing claims directly.

If both work, they become **interactive evidence** in the review, not just text.

## Phase 5: the 90-day learning track (October to December 2026)

This phase is shaped by O1. Whichever language is chosen:
- Each milestone produces a **small program that runs in the browser**, using the Phase 4 routes, and is published on the site next to the milestone notes.
- The track's goals are taken from the reviewed report, **after** pass-2 corrections. Overclaims flagged in pass 1 are not treated as targets, e.g. "production-ready PDE solver" or "locked 60/70 fps raycaster".
- Progress is tracked the same way as the review findings: data in the repository, rendered on the site, updated by commits.
