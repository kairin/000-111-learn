# Decision log

**Status values:** **Decided** · **Decided, not yet implemented** · **Superseded** (replaced by a later decision) · **Open** (waiting on the user). Dates are 2026-09-27 unless stated.

## Open decisions: what is left

| ID | Decision | Options | Recommendation | Why it matters |
|---|---|---|---|---|
| **O1** | **Primary learning goal** | Career and skills (report 01, leans Fortran) · retro 80s/90s game (report 02, leans Assembly) | Your call. It's about what you want by December, not a technical question. | Decides which report to revise, which browser demos matter most, and the whole 90-day track. **The most important open decision.** |
| **O2** | Site tool for the GitHub Actions build | Astro + Starlight · Observable Framework · Quarto · keep `site/build.py` | **Astro + Starlight** | Decides how Phase 3 and the Phase 4 demos get built |
| **O3** | Order of work | Build the two browser demos first · or migrate the site first and add the demos into it | Demos first if O2 is uncertain, because they don't depend on the tool | Reduces the risk of committing to a tool before knowing the demos work |
| **O4** | Status tracking on the static site | "Edit on GitHub" link to `status.json` · one GitHub Issue per finding · keep export-a-file | **Edit on GitHub** | How review progress is recorded once Actions does the build |
| **O5** | Demo toolchains | Fortran: LFortran or Flang + Emscripten · Assembly: DOS x86 in js-dos, WebAssembly text, or RISC-V/6502 emulators | LFortran first (fall back to Flang if unsupported); DOS x86 in js-dos | Mostly follows from O1 |
| **O6** | Output folder once Actions builds the site | Keep `serve/` as uncommitted build output · rename it | Keep `serve/`: you chose it, and Actions can upload any folder | Minor; confirm it when implementing Phase 3 |

## Decided

| ID | Decision | Status | Notes |
|---|---|---|---|
| D1 | Split documents at every heading (Markdown) and per `<section>` (HTML), and attach the JavaScript each section uses | Decided | 56 segments. Every Markdown source line is covered exactly once. |
| D2 | Adversarial review with evidence tags [DOC] / [KNOW] / [VERIFY] and severities Critical / Major / Minor | Decided | Pass 1 fetched no sources, so [KNOW] and [VERIFY] are provisional |
| D3 | Findings are data: `review/findings/pass*.json` is the source of truth, and the Markdown reviews are the narrative | Decided | Findings are mapped onto segments by source line range |
| D4 | Source documents live in `review/segments/` | Decided (by user) | The user moved them there during the session |
| D5 | Generated site goes to `serve/` | Decided (by user) | |
| D6 | Custom Python site builder (`site/build.py`, `markdown` via `uv`) | Decided; may be replaced (O2) | Has the findings explorer, heatmap, search and status export. Output is identical for identical input. |
| D7 | Public GitHub repo `kairin/000-111-learn`, created with `gh` | Decided, done | No new `gh` permissions were needed (`repo` and `workflow` were already granted). A secret scan before publishing found nothing. |
| D8 | Publish with a GitHub Actions workflow uploading `serve/` | **Superseded by D9** | Worked; replaced when you asked not to rely on remote Actions |
| D9 | Build locally in a pre-commit hook; a pre-push hook publishes `serve/` to the `gh-pages` branch | **Superseded by D10** | Implemented and live now (commit `0020352`) |
| D10 | Repository is public, so **use GitHub Actions** to build and deploy | **Decided, not yet implemented** | Waiting on O2 (tool). Implementing it removes the hooks and `gh-pages`, and stops committing `serve/`. |
| D11 | Put Assembly and Fortran code that runs in the browser (WebAssembly, emulators) into the learning plan | Decided (as plan) | See PLAN.md, Phase 4 |

## Why D9 was replaced by D10

- D9 answered "don't rely on Actions on remote GitHub". It works, but it needs two local hooks and a separate `gh-pages` branch.
- You then pointed out that the repository is public, and that the setup concerns I had listed are just the normal cost of building locally. You were right: GitHub's own Actions runners are currently free for public repositories.
- Building on GitHub removes the hooks, the `gh-pages` branch, and the rule of committing `serve/`. It also enables in-browser status edits (O4) and compiling Wasm demos in the build (Phase 4).
