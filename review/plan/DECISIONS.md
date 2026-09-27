# Decision log

**Status values:** **Decided** · **Adopted as recommended** (open to change) · **Superseded** (replaced by a later decision) · **Open** (waiting on the user). Dates are 2026-09-27 unless stated.

## Open decisions: what is left

| ID | Decision | Options | Recommendation | Why it matters |
|---|---|---|---|---|
| **O7** | **How the two languages share the game** | A: authentic DOS, FORTRAN 77 and x86 in one program · B: all-browser, modern Fortran to Wasm plus WebAssembly text · **C: split roles**: the game in x86 assembly (js-dos), with modern Fortran as the engineering lab (table generation, a reference model for checking the assembly, a Wasm physics lab page) | **C** | Decides the toolchain spike (Phase 4) and what you actually learn in each language. Details in [PLAN.md](PLAN.md). |
| **O8** | Game concept and constraint spec | Orbital lander/docking · falling-sand sandbox · tiny *Elite*-style trader; plus target CPU, video mode, memory and size limits | Orbital lander; a 386 with VGA Mode 13h, then Mode X; an honest 70 or 35 Hz | Sets the scope of the 12-week track |

## Decided

| ID | Decision | Status | Notes |
|---|---|---|---|
| D1 | Split documents at every heading (Markdown) and per `<section>` (HTML), and attach the JavaScript each section uses | Decided | 56 segments |
| D2 | Adversarial review with evidence tags [DOC] / [KNOW] / [VERIFY] and severities Critical / Major / Minor | Decided | Pass 1 fetched no sources, so its findings are provisional |
| D3 | Findings are data: `review/findings/pass*.json` is the source of truth, and `status.json` holds status overrides | Decided | Mapped onto segments by line range |
| D4 | Source documents live in `review/segments/` | Decided (by user) | |
| D5 | Build output goes to `serve/` | Decided (by user) | Now uncommitted build output (was O6) |
| D6 | Custom Python site builder (`site/build.py`) | **Superseded by D12** | Replaced by Astro + Starlight |
| D7 | Public GitHub repo `kairin/000-111-learn`, created with `gh` | Decided, done | No extra `gh` permissions were needed |
| D8 | Deploy with a GitHub Actions workflow (first version) | **Superseded by D9** | |
| D9 | Build locally in git hooks; publish `serve/` to the `gh-pages` branch | **Superseded by D10** | Hooks and `gh-pages` removed |
| D10 | The repository is public, so **GitHub Actions** builds and deploys the site | **Decided, done** | Pages source: GitHub Actions |
| D11 | **Learning goal: learn both Assembly and Fortran**, for usefulness and fun, through a small constrained game **playable on the GitHub Pages site** (was O1) | **Decided (by user)** | Report 01's career framing and report 02's retro framing both become input, not the goal |
| D12 | **Site tool: Astro + Starlight** (was O2) | **Decided (by user), done** | `site/`; content synced from `review/` |
| D13 | **Order: move the site to GitHub Actions first**, then add demos into it (was O3) | **Decided (by user), done** | |
| D14 | Status tracking: an "Edit on GitHub" link to `review/findings/status.json`, plus browser drafts with "Copy status.json" (was O4) | **Adopted as recommended** | Say so if you'd prefer GitHub Issues instead |
| D15 | Run Assembly and Fortran in the browser with WebAssembly and emulators (js-dos, Wasm), compiled in GitHub Actions | Decided (as plan) | The routes and limits are in [PLAN.md](PLAN.md) |
| — | Demo toolchains (was O5) | Folded into **O7** | The toolchain follows from the chosen architecture |

## Why decisions were reversed

- **D6 → D12:** the custom builder worked, but Astro + Starlight provides navigation, search and themes out of the box, plus a clean way to add interactive components and game pages. That leaves less custom code to maintain.
- **D8 → D9 → D10:**
  - You first asked not to rely on remote Actions, so D9 built the site locally.
  - You then pointed out the repository is public, and GitHub's own Actions runners are currently free for public repositories.
  - Building on GitHub removes the local hooks, the `gh-pages` branch and the committed build output. It also allows in-browser status edits and compiling the game in CI.
