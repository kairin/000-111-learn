---
target: ../segments/software_drag_race_breakdown.html
derived_from: ../segments/YouTube Video Breakdown.md
segments: ../segments/software-drag-race-breakdown/
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
pass: 1
date: 2026-09-27
---

# Adversarial review: "Software Drag Race: C++ vs Fortran vs COBOL" (HTML)

This page is an interactive summary of report 09. Thus **every content finding in review 09 applies here too**. This review covers what the page adds or changes: the charts, the "cache simulator", the language tabs, the rules panel, the code and the delivery.

The reviewer read the full auto-caption transcript of the source video. The reviewer also fetched the Primes CONTRIBUTING rules and the fortran-lang Discourse thread [7] of report 09 to check high-stakes facts.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (internal contradiction, arithmetic, missing data, code) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the transcript of the source video, with a timestamp |

## 1. Goals and objectives

1. Show the results of the Episode 04 race at a glance (key numbers and two bar charts).
2. Teach why bit storage and byte storage differ in speed, with an interactive "cache simulator".
3. Compare C++, Fortran and COBOL in three tabs.
4. State the benchmark rules and the limits of a microbenchmark (a small test of one task).

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Results at a glance | **No** | The key numbers contradict the video. The C++ value of 13,500 P/s is not in the video or in report 09. The COBOL gap of about 50 times is false (C1, C2). |
| 2. Cache simulator | **Partly** | The size arithmetic is correct. But the page does not simulate anything. All values and the penalty are fixed text (M1). |
| 3. Language tabs | **Partly** | The tabs copy report 09, with the same overstated claims about Fortran aliasing and COBOL (M4, M6). |
| 4. Rules and limits | **Partly** | The limits panel is fair. But the rules panel hides that the COBOL program in the video breaks the rules (C4). |

**Overall confidence in the document:** Low. The page looks like a data dashboard, but it has no sources, and its headline numbers are invented or come from another test.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L84-86, L229, L353 | "Peak Throughput 13,500 P/s", C++ range 10,000 to 13,500 | The video gives 1936 passes for the C++ program of Dave (14:03). Report 09 gives "about 10,000". The value 13,500 is in neither source. The page invents its headline number. | [VIDEO], [DOC] |
| C2 | L89-91, L114, L267, L353 | COBOL at 252 P/s, "~50x" slower, lags "by ~98%" | At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. Dave says that they are about the same speed. The bar chart shows the opposite of the video result. | [VIDEO] |
| C3 | L119-129, L334-343, L350-353 | Fortran compiler chart (gfortran 7 to 11, ifort, ifx, flang) as part of Episode 04 | The video names no compiler and no flag. The data comes from a 2022 forum post on an AMD Ryzen 7 3700X (checked by WebFetch). The video uses a Threadripper (00:19). The first chart also puts this gfortran-11 value next to the invented C++ value (C1). The two bars come from different tests, so the comparison has no meaning. | [VIDEO], [VERIFY] |
| C4 | L279, L292 | The rules "prevent ... static array caching or precomputed prime tables" for "all submissions" | At 05:30, Dave says that the COBOL program keeps a preset copy of the array and "isn't technically faithful to the original". So one of the three programs breaks the rule that the page states. The page hides this. | [VIDEO] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L140-196, L440-503 | "Simulate CPU cache saturation" | The function updateSimulator only swaps fixed text. It calculates nothing. The size values are correct: 61 KB is 190% of 32 KB, 12% of 512 KB. 488 KB is 1525% of 32 KB and 95% of 512 KB. But the "~50% Throughput Penalty" and "0% (Optimal)" are fixed claims with no model. The model ignores the access order of the sieve and hardware prefetch (the CPU loads data before a request). The label "100% Residency (12%)" is confusing. | [DOC], [KNOW] |
| M2 | L195, L478 | Fetching bytes from "lower cache tiers or RAM costs up to 100x more cycles" | The page itself says that the 488 KB byte array fits in L2 (95%, L490). L2 latency is about 12 to 15 cycles, not 100 times the cost of a bit operation. The RAM case does not apply to this data size. | [DOC], [KNOW] |
| M3 | L140 | 1-bit storage "drastically" outperforms an 8-bit byte array | The video does not test this. In the Primes project, some fast solutions use bytes. The result depends on the CPU, the compiler and the code. | [VIDEO], [VERIFY] |
| M4 | L238 | "Standard Fortran guarantees array arguments do not overlap" | The standard puts this rule on the programmer, and compilers do not check it. POINTER and TARGET arguments can overlap. The sieve uses one array, so this rule does not explain this race. | [KNOW] |
| M5 | L240, L246 | Bit storage gives "~50% gains over byte arrays". Object-oriented Fortran costs "30%-50%" | No source on the page. The fetched forum thread says the 50% gain is over the best "bitfield" results, not over byte arrays. The 30% to 50% range does not appear in the thread. | [VERIFY] |
| M6 | L264-266 | COBOL has "No Native Bitwise Operations". PERFORM VARYING "bounds checking resists loop-unrolling" | At 05:17, the video shows a COBOL array of one-bit values. The COBOL 2002 standard has bit data, but support varies. The loop claim is a guess with no source. | [VIDEO], [KNOW], [VERIFY] |
| M7 | L80-81, L302 | "Executes for exactly 5.0 non-extendable seconds" | The Primes CONTRIBUTING file says "at least 5 seconds", then stop as soon as possible (checked by WebFetch). At 10:25, the Fortran program checks the time after each full pass. | [VIDEO], [VERIFY] |
| M8 | L63-328 | Footer: "Based on Dave's Garage Episode 04" | The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. | [DOC] |
| M9 | L101 | Fortran output "changes radically based on compiler versions and optimization flags" | All five gfortran rows use the same flags. The data cannot separate the effect of flags from the effect of the compiler. | [DOC] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L7-8 | Scripts from cdn.tailwindcss.com and cdn.jsdelivr.net/npm/chart.js | The Tailwind Play CDN is for development only. The Chart.js link has no version, so a future major release can break the charts. The page does not work offline. | [KNOW] |
| m2 | L74, L140, L297, L302 | "$N$", "$N = 1,000,000$", "$P/s$" | The page loads no math library. The reader sees raw dollar signs. | [DOC] |
| m3 | L195, L220, L257, L264-266, L478 | Code in backticks | Backticks are Markdown, not HTML. The page shows them as literal characters. | [DOC] |
| m4 | L502 | Byte storage "expands the working memory set by 800%" | Eight times the size is an increase of 700%, or a size of 800%. | [DOC] |
| m5 | L51, L112, L127, L209-212 | Navigation, charts and tabs | The canvas charts have no text alternative. The navigation bar is hidden on small screens, with no menu. The tab buttons have no role or selected state for screen readers. Status uses color only. | [KNOW] |
| m6 | L258, L319 | Decimal math has "no rounding error". Binary rounding errors "are illegal" | Decimal arithmetic still rounds, for example in division. Financial rules require correct decimal results, but "illegal" is too strong. | [KNOW] |
| m7 | L239 | Fortran has "Unrivaled performance" in matrix work | This is marketing language. Tuned C, C++ and vendor libraries give the same speed. | [KNOW] |
| m8 | L68, L76 | Dave Plummer is a retired Microsoft engineer. N is 1,000,000 with 78,498 primes | These are correct. The video confirms Dave (00:58) and the one-million limit (13:03). 78,498 is the correct count of primes below one million. | [VIDEO], [KNOW] |

## 4. Source-quality audit

- The page has no sources, no citations and no link to the video or to the Primes repository.
- All numbers come from report 09 or from nowhere. Report 09 takes most of them from one forum post (see review 09, section 4).
- The page adds new numbers that report 09 does not have: 13,500 P/s, "~50x", "~98%", "~50% Throughput Penalty" and "up to 100x more cycles".
- The HTML comments at L31-39 show the design plan of the generator. They say what the chart must show ("Clear visual delta between C++/Fortran vs COBOL") before any data. This suggests that the story came first and the numbers came second.

## 5. Omissions a skeptic would raise

1. **The real result.** The page never shows 1163, 1118 and 1936 from the video (13:51 to 14:03).
2. **The race leader.** At 14:15, Dave says that the leader is not C, C++ or Assembly, at more than 4,000 passes per second. The page calls C++ the "Peak Throughput".
3. **The code tour.** The page omits all the Fortran and COBOL code features that the video explains, for example IMPLICIT NONE, BTEST and IBCLR.
4. **Test conditions.** One run on one machine, with programs by different community authors. The page gives no error range.

## 6. Use for the learning journey

- **Ignore** every chart and every number on this page. None of them match the video.
- **B side (Fortran): keep** only the general idea that you can store one true or false value per bit, with the Fortran functions BTEST and IBCLR (video 11:33). The page mentions bit storage but not the functions.
- **B side (Fortran):** the aliasing rule is real, but it is your duty as the programmer. The compiler does not check it. Do not trust the word "guarantees" at L238.
- **About benchmarks:** a sieve race shows how fast one program runs on one machine. It does not show how fast Fortran is for matrix or physics work, and it does not tell you which language to learn.
- **A side (Assembly):** the cache sizes (L1 32 KB, L2 512 KB) and the idea that memory access costs more than arithmetic are useful background for Assembly. Check them for your own CPU, for example with the lscpu command on Linux.

## 7. Pass-2 verification list

- [ ] Search for any source of 13,500 P/s for C++ and 252 P/s for COBOL (C1, C2).
- [ ] Confirm the Episode 04 numbers on screen and their unit (C2).
- [ ] Record the date, machine and variant of each compiler value in the forum thread (C3, M5).
- [ ] Check the Primes CONTRIBUTING history for the rules on the date of Episode 04 (C4, M7).
- [ ] Open the page in a browser without network access and with a screen reader (m1, m5).
- [ ] Measure a bit sieve and a byte sieve on one real machine, to test the cache claim (M1, M3).
