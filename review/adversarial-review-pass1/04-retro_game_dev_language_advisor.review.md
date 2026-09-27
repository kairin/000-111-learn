---
target: ../segments/retro_game_dev_language_advisor.html
derived_from: ../segments/Assembly-Versus-Fortran-Comparison.md (see review 02)
segments: ../segments/retro-game-dev-language-advisor/
pass: 1 (adversarial, desk review)
date: 2026-09-27
---

# Adversarial review: "Retro Game Dev Advisor: Assembly vs. Fortran" (HTML)

This page is a summary of report 02. Thus **all of review 02 applies**. Review 02 covers these items. FORTRAN 77 has no array syntax or SIMD. Review 02 also covers the Mode 13h 60 fps and tearing claims. Developers wrote Elite/Frontier/M.U.L.E. in assembly. The page does not mention C. This review covers only what the page adds or changes.

## 1. Goals and objectives

1. Recommend a language from the *game concept* of the user through a 4-question diagnostic.
2. Give a 12-week roadmap and a 90-day deliverable per track.
3. Show how each language meets modern player expectations, genre fit, and CPU budget.
4. Point to a working retro toolchain.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Concept diagnostic | **Partly** | It is better than the quiz on page 03. The reason is that it asks about the *game*, not the language. But it keeps the A=Assembly/B=Fortran bias and the one-click verdict (C1). Its "Assembly is mandatory" wording is absolute. |
| 2. Roadmap | **No** | The Fortran track contradicts itself on dialect (C2). The Assembly deliverable promises an impossible 60 fps V-Sync lock (C3). |
| 3. UX / genre / CPU analytics | **No** | The charts use invented numbers, and history contradicts them (C4, C5). |
| 4. Toolchain | **Partly** | Most tools are correct, but some labels are wrong (M2, M3). |

## 3. Findings

### Critical

| # | Location | Problem | Tag |
|---|---|---|---|
| C1 | Quiz logic L499–541 | The quiz has the same defects as page 03. The code does not use `answeredCount`, thus one click gives a 100% verdict. Option A is always Assembly. The Assembly result says "**Assembly is mandatory** for your retro action/arcade title" (L530). This is false. Developers wrote plenty of retro action games in C with small amounts of assembly. | [DOC] + [KNOW] |
| C2 | L552 vs track title | The heading of the Fortran track is **"OpenWatcom FORTRAN 77"**. But week 1 teaches "**FORTRAN 77 / Modern Fortran free-form syntax**". FORTRAN 77 is **fixed-form**. Free-form syntax started in Fortran 90. Week 3 teaches "array non-aliasing execution" and loop-unrolling optimization. These do not matter on DOS targets without SIMD. | [KNOW] |
| C3 | L353, L577, summary card | The page says "Locked **60/70 FPS**", "guaranteeing locked 60 or 70 FPS without tearing", and "smooth **60 FPS** DOS executable". VGA Mode 13h refreshes at 70 Hz. Thus V-Sync locking gives 70 or 35 fps. On a 70 Hz display, 60 fps judders. Mode 13h has no page flipping. Thus the "guaranteed" tear-free claim is wrong (review 02, C4). | [KNOW] |
| C4 | Genre radar L630–656 | The page invents the scores. Assembly gets Orbital Flight Sim **40** and Procedural Universe **45**. Fortran gets **95/95**. History says otherwise. Developers wrote *Elite* and *Frontier: Elite II* in assembly. These games are the landmark procedural universe and orbital flight sims. Fortran gets 20 to 30 for arcade and raycaster. But the tie-break on the same page suggests Fortran plus assembly rendering. That combination would score higher. | [KNOW], [VERIFY] per-title language |
| C5 | CPU cycle chart L676–715 | The chart label is "**Estimated** frame budget". The page invents these percentages and gives no measurement. The chart also confuses **genre workload with language**. An "Assembly action loop" and a "Fortran simulation loop" are different *games*. Thus the chart cannot compare the languages. | [DOC] |

### Major

| # | Location | Problem | Tag |
|---|---|---|---|
| M1 | L125 | The page says "4.77–33 MHz CPUs … direct VGA framebuffer (0xA000)". VGA and Mode 13h on a 4.77 MHz 8088 was a rare combination. The upper bound also excludes most of the 1990s. | [KNOW] |
| M2 | L432 | The table row says "**NASM / WASM** — Netwide Assembler…". NASM and WASM (the Watcom assembler) are different tools. The description covers only NASM. | [KNOW] |
| M3 | L445 | The page says "DOSBox-X / 86Box — **Cycle-exact**". This is not true for either tool in the strict sense. DOSBox-X is clearly approximate. | [KNOW] |
| M4 | UX cards | The page shows "Fortran: OS/Library Dependent" for V-Sync as a weakness. But polling port 0x3DA needs only one I/O routine. This routine is trivial to link. The page overstates how hard hybrid development is. But its own tie-break recommends a hybrid. | [DOC] |
| M5 | whole page | The page has no citations. It also does not mention **C**, the historically dominant choice (review 02, §5). | [DOC] |

### Minor / technical

The problems with the Tailwind Play CDN and the unpinned Chart.js also apply here. The same is true for the implicit-`event` usage (L493). See review 03, m1 to m3.

## 4. Suggested fixes

1. Fix the Fortran dialect story. Use FORTRAN 77, fixed-form, with no array syntax. Or use Modern Fortran on a modern host. Do not use both.
2. Correct the frame-rate language: "70 Hz Mode 13h; tear-free needs Mode X page flipping".
3. Replace the invented charts with a sourced table of real retro games and their implementation languages.
4. Add a third quiz outcome, "**C with assembly inner loops**". This is the historically correct answer for many concepts.
