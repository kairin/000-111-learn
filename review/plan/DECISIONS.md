# Decision log

**Status values:** Decided · Adopted (the recommendation, open to change) · Replaced (a later decision took its place) · Open (waits for the owner). The dates are 2026-09-27 for D1 to D24, and 2026-10-05 for D25 and D26.

## Open decisions

| ID | Question | Recommendation |
|---|---|---|
| O9 | Which PC speed does the lander target: a 4.77 MHz 8086, or a 386? One frame at 70 Hz gives the 8086 about 68,000 clock cycles, and a full-screen copy costs about 544,000. | Decide with the game design (see [PLAN.md](PLAN.md), phase 5). Until then, the tests keep `cpu 8086` and the 70 Hz refresh. |

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

| **D19** | **The game uses split roles** (was O7). The game is 8086 Assembly in js-dos. Modern Fortran is the laboratory: it makes tables, checks the A-side answers, and later runs a physics page. | Decided by the owner | The first test works: the two sides agree on 256 of 256 values. See `game/README.md`. |
| **D20** | **The game is a small lander game** (was O8). An 8086 or 386 PC, VGA Mode 13h, then Mode X. 70 or 35 frames each second. | Decided by the owner | The rules of the game come in phase 5. |

| **D21** | **Review the eight video guides** in the same way as the first four. Each document part shows its source video, and the moment of its idea when the video covers it. The new evidence tag [VIDEO] marks a claim that the reviewer checked against the captions. | Decided by the owner, done | The captions stay on the computer of the owner. The reviews quote no more than 10 words from a video. See `adversarial-review-pass1/00-SUMMARY-video-guides.md`. |

| **D22** | **The second test puts the dot in 3D.** The same sine movement. The curve starts at the back and ends at the front, and its middle point is the center of the 3D space. The A side does a perspective division. The B side makes no new table. It checks the screen positions. | Decided by the owner, done | The two sides agree on 256 of 256 points. See `game/README.md` and the page `/game/test2a/`. |
| **D23** | **Show a wrong program next to the right one (test 2b).** One wrong word (`SHR`, not `SAR`) makes half of the values wrong. The build requires the check to fail on it, so the check itself is tested. Each test has its own page under `/game/`. | Decided by the owner, done | 128 of 256 points wrong. See the page `/game/test2b/`. |

| **D24** | **Test 3 turns the wave around the center.** The wave goes from the back to the front and turns like a record on a turntable. Test 3b uses one wrong value (90, a quarter turn in degrees, not 64, a quarter turn in 256 steps). | Decided by the owner, done | 4096 of 4096 points agree in test 3a. The check finds 3759 wrong points in test 3b. |

| **D25** | **Review the three SNES video guides** (documents 13 to 15, one video by Inkbox) in the same way as the eight video guides (D21). The captions stay on the computer of the owner. The reviews quote no more than 10 words from the video at one time, with a timestamp. | Decided by the owner, done | 41 document parts, 80 findings (14 critical, 34 major, 32 minor). See `adversarial-review-pass1/00-SUMMARY-snes-video-guides.md`. |
| **D26** | **The SNES lessons live on the existing segment pages, not on a new page.** The video is a source of ideas, not of words. The 65C816 and the SPC700 are other dialects, and the VGA has no sprites, no HDMA and no color math. Eight learning units become strengths, limits and "Watch out" notes on the seven segments. Three new laboratory tests go into the plan (Phase 4d), not into the code. | Adopted | The table of units and pages is in [PLAN.md](PLAN.md). The dictionaries got the words that the laboratory code already used. |
| **D27** | **Test 4 is the decimal counter of Phase 4d, built.** The A side counts 0000 to 9999 in two packed decimal bytes with `ADD`, `DAA`, `ADC` and `DAA`, and shows the digits with `XLAT`. The B side checks all 10,000 values with `MOD` and `ISHFT`, and the step after 9999. Test 4b removes `DAA` (the switch `-dWRONG_DECIMAL`), and the build requires its check to fail. The pages show the path from the video and the review to the test. | Decided by the owner, done | 10,000 of 10,000 values agree in test 4a. The check finds 9,990 wrong values in test 4b. See `game/README.md` and the pages `/game/test4a/` and `/game/test4b/`. |

## Why some decisions changed

- **D6 to D12:** the custom builder worked. Astro with Starlight gives menus, search and themes without custom code.
- **D8 to D9 to D10:** first, the owner asked for no build on GitHub, so D9 built the site on this computer. Then the owner saw that GitHub Actions is free for a public repository. D10 removed the hooks and the extra branch.
- **D16 and D18:** the owner said that the AI-written guides and the review are not the main objective. The learning of the two languages is the main objective. The site changed to match.
