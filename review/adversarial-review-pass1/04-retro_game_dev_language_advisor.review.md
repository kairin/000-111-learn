---
target: ../segments/retro_game_dev_language_advisor.html
derived_from: ../segments/Assembly-Versus-Fortran-Comparison.md (see review 02)
segments: ../segments/retro-game-dev-language-advisor/
pass: 1 (adversarial, desk review)
date: 2026-09-27
---

# Adversarial review — "Retro Game Dev Advisor: Assembly vs. Fortran" (HTML)

This page summarises report 02, so **all of review 02 applies** (FORTRAN 77 has no array syntax or SIMD; the Mode 13h 60 fps and tearing claims; Elite/Frontier/M.U.L.E. written in assembly; missing C). This review covers only what the page adds or changes.

## 1. Goals and objectives

1. Recommend a language from the user's *game concept* through a 4-question diagnostic.
2. Give a 12-week roadmap and a 90-day deliverable per track.
3. Show how each language meets modern player expectations, genre fit, and CPU budget.
4. Point to a working retro toolchain.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Concept diagnostic | **Partly** | Better than page 03's quiz, because it asks about the *game*, not the language. But it keeps the A=Assembly/B=Fortran bias and the one-click verdict (C1). Its "Assembly is mandatory" wording is absolute. |
| 2. Roadmap | **No** | The Fortran track contradicts itself on dialect (C2). The Assembly deliverable promises an impossible 60 fps V-Sync lock (C3). |
| 3. UX / genre / CPU analytics | **No** | The charts use invented numbers, and history contradicts them (C4, C5). |
| 4. Toolchain | **Partly** | Mostly the right tools, with some mislabels (M2, M3). |

## 3. Findings

### Critical

| # | Location | Problem | Tag |
|---|---|---|---|
| C1 | Quiz logic L499–541 | It has the same defects as page 03: `answeredCount` is unused, so one click gives a 100% verdict, and option A is always Assembly. The Assembly result says "**Assembly is mandatory** for your retro action/arcade title" (L530), which is false: plenty of retro action games were written in C with small amounts of assembly. | [DOC] + [KNOW] |
| C2 | L552 vs track title | The Fortran track is headed **"OpenWatcom FORTRAN 77"**, but week 1 teaches "**FORTRAN 77 / Modern Fortran free-form syntax**". FORTRAN 77 is **fixed-form**; free-form arrived in Fortran 90. Week 3's "array non-aliasing execution" and loop-unrolling optimisation don't matter on SIMD-less DOS targets. | [KNOW] |
| C3 | L353, L577, summary card | "Locked **60/70 FPS**", "guaranteeing locked 60 or 70 FPS without tearing", "smooth **60 FPS** DOS executable". VGA Mode 13h refreshes at 70 Hz, so V-Sync locking gives 70 or 35 fps, and 60 fps on a 70 Hz display judders. Mode 13h has no page flipping, so "guaranteed" tear-free is wrong (review 02, C4). | [KNOW] |
| C4 | Genre radar L630–656 | Invented scores (Assembly: Orbital Flight Sim **40**, Procedural Universe **45**; Fortran: **95/95**). History says otherwise: *Elite* and *Frontier: Elite II*, the landmark procedural universe and orbital flight sims, were assembly. Fortran is given 20–30 for arcade and raycaster, yet the same page's tie-break suggests Fortran plus assembly rendering, which would score higher. | [KNOW], [VERIFY] per-title language |
| C5 | CPU cycle chart L676–715 | Labelled "**Estimated** frame budget". These are invented percentages with no measurement. The chart also mixes up **genre workload with language**: an "Assembly action loop" and a "Fortran simulation loop" are different *games*, so the chart can't compare the languages. | [DOC] |

### Major

| # | Location | Problem | Tag |
|---|---|---|---|
| M1 | L125 | "4.77–33 MHz CPUs … direct VGA framebuffer (0xA000)": VGA and Mode 13h on a 4.77 MHz 8088 was a rare combination, and the upper bound leaves out most of the 1990s. | [KNOW] |
| M2 | L432 | Table row "**NASM / WASM** — Netwide Assembler…": NASM and WASM (the Watcom assembler) are different tools, and the description covers only NASM. | [KNOW] |
| M3 | L445 | "DOSBox-X / 86Box — **Cycle-exact**": true for neither in the strict sense, and DOSBox-X is clearly approximate. | [KNOW] |
| M4 | UX cards | "Fortran: OS/Library Dependent" for V-Sync is presented as a weakness. But polling port 0x3DA needs only one I/O routine, which is trivial to link. The page overstates how hard hybrid development is, even though its own tie-break recommends a hybrid. | [DOC] |
| M5 | whole page | No citations, and no mention of **C**, the historically dominant choice (review 02, §5). | [DOC] |

### Minor / technical

The Tailwind Play CDN and the unpinned Chart.js problems apply here too, as does the implicit-`event` usage (L493). See review 03, m1–m3.

## 4. Suggested fixes

1. Fix the Fortran dialect story: either FORTRAN 77, fixed-form, with no array syntax, or Modern Fortran on a modern host, not both.
2. Correct the frame-rate language: "70 Hz Mode 13h; tear-free needs Mode X page flipping".
3. Replace the invented charts with a sourced table of real retro games and their implementation languages.
4. Add a third quiz outcome, "**C with assembly inner loops**", which is the historically correct answer for many concepts.
