# Decision log

**Status values:** Decided · Adopted (the recommendation, open to change) · Replaced (a later decision took its place) · Open (waits for the owner). All dates are 2026-09-27.

## Open decisions

| ID | Decision | Options | Recommendation | Why it matters |
|---|---|---|---|---|
| **O7** | How the two languages share the game | A: all in DOS (FORTRAN 77 and 8086). B: all in the browser (Fortran as Wasm, WebAssembly text). C: split roles. | **C.** The game is 8086 Assembly in js-dos. Modern Fortran is the laboratory: tables, checks, a physics page. | It sets the first toolchain test and the real words that you learn on each side. |
| **O8** | The game concept and its limits | A lander game, a falling-sand game, or a small space trader. Also the processor, the graphics mode and the size limits. | A lander game. An 8086 or 386 PC with VGA Mode 13h, then Mode X. 70 or 35 frames each second. | It sets the size of the 12-week course. |

## Decided

| ID | Decision | Status | Notes |
|---|---|---|---|
| D1 | Split each AI-written document into parts, at each heading or HTML section | Decided | 56 document parts |
| D2 | Review each part with evidence tags (DOC, KNOW, VERIFY) and three levels (Critical, Major, Minor) | Decided | The first pass read no sources. Its results are temporary. |
| D3 | Keep the findings as data: `review/findings/pass*.json`, with changes in `status.json` | Decided | 61 findings |
| D4 | Keep the four source documents in `review/segments/` | Decided by the owner | |
| D5 | The site build goes to `serve/` | Decided by the owner | GitHub Actions makes it. It is not in the repository. |
| D6 | A custom Python site builder | Replaced by D12 | |
| D7 | A public GitHub repository, made with `gh` | Done | No new `gh` permission was necessary. |
| D8 | Publish with GitHub Actions (first form) | Replaced by D9 | |
| D9 | Build on this computer with git hooks, publish from a `gh-pages` branch | Replaced by D10 | The hooks and the branch are gone. |
| D10 | GitHub Actions builds and publishes the site | Done | Free for a public repository |
| D11 | The goal: learn **both** languages for fun and usefulness, with a small retro game that runs in the browser | Decided by the owner | |
| D12 | The site tool: Astro with Starlight | Decided by the owner, done | |
| D13 | Put the site on GitHub Actions first, then add the programs | Decided by the owner, done | |
| D14 | Record finding status with an "Edit on GitHub" link to `status.json` | Adopted | Tell us if you want GitHub Issues instead. |
| D15 | Run code from the two sides in the browser with WebAssembly and a PC copy (js-dos) | Decided as a plan | See [PLAN.md](PLAN.md), phase 4. |
| **D16** | **The lens:** treat Assembly and Fortran as real languages, with parts of speech. The site has an A side (Assembly) and a B side (Fortran). Seven segments are common to the two sides. | Decided by the owner, done | Assembly is the first language of the machine. Fortran speaks maths. Each segment page shows strengths and words. |
| **D17** | **The writing standard:** write all documents in ASD-STE100 Simplified Technical English, for a reader who is not a developer | Decided by the owner, done | The source is `/home/kkk/Apps/ASD-STE100`. A global skill, a global rule and a global hook apply it in every Claude Code session. |
| **D18** | **The review is background research.** The four AI-written guides only helped start the idea. The review shows areas that are easy to miss. | Decided by the owner, done | The review pages are in the "Background research" part of the menu. Relevant findings show as "Watch out" notes on the segment pages. |

## Why some decisions changed

- **D6 to D12:** the custom builder worked. Astro with Starlight gives menus, search and themes without custom code.
- **D8 to D9 to D10:** first, the owner asked for no build on GitHub, so D9 built the site on this computer. Then the owner saw that GitHub Actions is free for a public repository. D10 removed the hooks and the extra branch.
- **D16 and D18:** the owner said that the AI-written guides and the review are not the main objective. The learning of the two languages is the main objective. The site changed to match.
