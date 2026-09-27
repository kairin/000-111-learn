---
target: ../segments/fortran_technical_deconstruction.html
derived_from: ../segments/Fortran Video Breakdown.md
segments: ../segments/fortran-technical-deconstruction/
video: https://www.youtube.com/watch?v=NMWzgy8FsKs
pass: 1
date: 2026-09-27
---

# Adversarial review: "Fortran Technical Deconstruction and Interactive Analysis" (HTML)

This page is an interactive version of report 07. Thus **every content finding in review 07 applies here too**. This review covers what the page adds or changes: the chart, the "virtual compiler" (a simulator), the aliasing demo, drift from the report, and delivery. Line numbers are lines of the HTML file, including the JavaScript. "Report L" means a line of report 07.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (code behavior, internal contradiction, missing data) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must check it against the cited source or a primary source |
| **[VIDEO]** | Checked against the video transcript (the spoken words, with timestamps) |

## 1. Goals and objectives

1. Show report 07 as six tabs that a reader can explore.
2. Let the reader test the `implicit none` error of the video in a simulated compiler.
3. Show history, punch cards, aliasing and column-major order with charts and small demos.
4. Give a critique of the video as a teaching tool.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Interactive summary | **Partly** | The tabs follow the report. But the page drops all citations and changes some facts (M2, M8). |
| 2. Compiler simulator | **Partly** | The error case is close to real gfortran output. The "implicit typing" case prints wrong output and hides the bug that the page teaches (C2). |
| 3. Charts and demos | **No** | The only chart uses invented numbers (C1). The aliasing demo states a false guarantee (C3). Its Fortran code breaks the rule that the page teaches (M3). |
| 4. Critique of the video | **Mostly** | It repeats the fair critique of the report. It has the same gaps (review 07, C3). |

**Overall confidence in the document:** Low. The page looks precise, but its numbers and simulated outputs are not real data.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L168-174, L536-549 | A bar chart of "Developer Effort / Time (Hours)" (100, 15, 12, 5) and "Execution Overhead" (0, 400, 10, 2 percent) | The numbers are invented. No source is given, and report 07 has no such numbers. The chart puts hours and percent on one axis. The title says "1950s", but one bar is "Modern Fortran / C (-O3)". "Hand Assembly 0%" suggests that hand code is perfect. A learner can take these numbers as measured data. | [DOC] |
| C2 | L657-669 | Without `implicit none` and declarations, the program prints `2 4 6 8 10`. | This output is wrong. Under implicit typing, `doubled` starts with "d", so it is REAL. gfortran prints real numbers such as `2.00000000`. Report L45 says this correctly. The warning text "REAL/INTEGER" avoids the answer. gfortran does not give these warnings by default. The simulator hides the exact lesson of the page. | [DOC], [KNOW] |
| C3 | L94, L379, L386, L396, L781 | "0% Aliasing Overhead". Dummy arguments are "guaranteed disjoint by specification". "Compiler GUARANTEES 'a' and 'b' do not overlap!" | This is wrong (see review 07, C2). The programmer promises that the arguments do not overlap. The compiler does not check it. `call add(x, x, n)` compiles and breaks the rule without an error. The "0%" figure has no source. | [KNOW] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L290, L614-684 | A button "Execute Compiler (gfortran -O2)" | No compiler runs. The code selects one of three fixed texts from two checkboxes. The page does not say that the output is simulated. The error text is close to real gfortran text, but the line "Fatal Error: Termination due to compilation errors." is not normal gfortran output for this case. | [DOC], [VERIFY] |
| M2 | L254, L264, L626 | The simulator shows "Fireship's snippet". | The page code uses `do n = 1, 5` and the file name `myApp.f90`. Report L39 gives `do n = 1, 10`, and report L28 says that the video uses `.f95`. The page changes the code of the video but still calls it the code of the video. | [DOC] |
| M3 | L778-784 | The Fortran example of good practice | The subroutine has no `implicit none` and never declares `n`. It works only because `n` starts with a letter in the I to N range. Thus the page uses the implicit typing that it criticizes in section 3. | [DOC], [KNOW] |
| M4 | L765-773 | In C, the compiler "cannot hold values in hardware registers" and must do "repeated L1/L2 cache re-loads". | For `a[i] += b[i]`, each element is loaded one time in any case. GCC and Clang vectorize this loop. They add a run-time check for overlap. Aliasing has a real cost, but in other loop shapes, and the cost is smaller than the page shows. | [KNOW], [VERIFY] |
| M5 | L405, L427 | "Decades of hardware cache optimizations align specifically with this layout". "BLAS and LAPACK (Optimized Fortran Libraries)". | Hardware does not prefer column-major order. The fast BLAS libraries (OpenBLAS, MKL, BLIS) have core loops in C and assembly. See review 07, M3. | [KNOW], [VERIFY] |
| M6 | L696-698, L719-723 | The evolution table: "mandatory implicit none", and coarrays as the modern parallel model | The same errors as review 07, M1 and M2. Also, the row "Typing Discipline" has the domain "memory", so the filter "Memory and Arrays" shows it, and "Syntax" shows only one row. | [DOC], [KNOW] |
| M7 | L234 | The IBM 026 and 029 "lacked lowercase character sets and shift keys entirely". | This is stronger than the report. The keypunches had a numeric shift. See review 07, M4. | [VERIFY] |
| M8 | L506, whole page | "Based on technical report" | The page has no citations and no link to the video or to report 07. A reader cannot trace any claim to a source. | [DOC] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L8 | Tailwind from `cdn.tailwindcss.com` | This is the Tailwind Play CDN, for development only. The page needs a network connection and does not work offline. | [KNOW] |
| m2 | L10 | Chart.js from `cdn.jsdelivr.net/npm/chart.js` | The version is not pinned. A future major release can break the chart. | [KNOW] |
| m3 | L108-125, L136, L171 | Tabs, emoji icons and the chart canvas | The tab buttons have no `role="tab"` or `aria-selected`. The emoji icons have no `aria-hidden`. The chart canvas has no text alternative. A screen reader user gets little help. | [DOC] |
| m4 | L565-568 | The x-axis labels | The code cuts labels longer than 16 characters. "1957 Fortran I Compiler" shows as "1957 Fortran I..". | [DOC] |
| m5 | L593 | "'C' or '*'" in column 1 marks a comment | This is correct for FORTRAN 77 and better than report L15. `*` was not valid in FORTRAN 66. | [KNOW] |
| m6 | L597 | Column 6 "signaled to the IBM card reader" | The compiler reads column 6, not the card reader. The card reader only reads holes. | [KNOW] |
| m7 | L605 | Card sorting machines "assign line numbers to decks" | A sorter reads the sequence numbers. It does not assign them. People or keypunch programs punched them. | [KNOW] |
| m8 | L240, L601, L692 | Free form permits up to 132 characters per line. | Fortran 2023 increased the limit to 10,000 characters. See review 07, m2. | [VERIFY] |
| m9 | L366, L449 | A "70-year-old language" that is "dominant" in supercomputing | The report says "six decades" (report L84). "Dominant" goes too far. C++ is now common in new HPC code. Fortran still has a large share. | [DOC], [VERIFY] |

## 4. Source-quality audit

- The page has no citations. It also has no link to the video.
- The chart numbers (L540, L547) and the "0%" figure (L94) have no source in the page or in report 07.
- The simulator outputs (L645-682) look like real gfortran output, but the page wrote them by hand. The page must label them as simulated.
- All weak sources of report 07 stay behind the page, but the reader cannot see them (see review 07, section 4).

## 5. Omissions a skeptic would raise

1. **A real compiler.** A link to Compiler Explorer or an online gfortran lets the learner run the real code and see the real output and the assembly.
2. **A declared example.** The page never shows a correct and complete program with `implicit none`, declared `integer` variables and `real(kind=...)`.
3. **What happens when the aliasing rule breaks.** A short demo of `call add(x, x, n)` gives a better lesson than a false guarantee.
4. **Modern array syntax.** The page mentions whole-array operations but shows only `a = a + b`. It does not show array slices such as `a(2:n)`.

## 6. Use for the learning journey

- Keep: the punch-card tab as an aid to read old fixed-form code (columns 1 to 5, 6, 7 to 72, 73 to 80). The layout is correct.
- Keep: the error case of the simulator. It shows the kind of message gfortran gives for an undeclared variable under `implicit none`.
- Ignore: the benchmark chart and the "0%" figure. They are not data.
- Ignore: the output of the simulator for implicit typing. Real Fortran prints `doubled` as a real number.
- Do: type the program into real gfortran and try each checkbox case yourself. Compare the real output with the page.

## 7. Pass-2 verification list

- [ ] Compile the three simulator cases with a real gfortran. Record the real messages and output (C2, M1).
- [ ] Compile the `add` subroutine and call it with the same array two times. Record the result with `-O2` (C3, M3).
- [ ] Compile the C `add` loop with GCC `-O3` in Compiler Explorer. Check for vectorization and the run-time overlap check (M4).
- [ ] Check the shift keys of the IBM 026 and 029 (M7).
- [ ] Check the line-length limit in Fortran 2023 (m8).
- [ ] Look for any source for the chart numbers. If there is none, mark C1 as confirmed.
