---
target: ../segments/prime_sieve_benchmark_interactive_explorer.html
derived_from: ../segments/YouTube Video Content Analysis.md
segments: ../segments/prime-sieve-benchmark-interactive-explorer/
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
pass: 1
date: 2026-09-27
---

# Adversarial review: "Comparative Analysis: Prime Sieve Benchmark Dynamics" (HTML)

This page is an interactive version of report 11. Thus **the content findings of review 11 apply here too**. This review covers what the page adds or changes: the chart data, the two simulators, the priority selector, and delivery. The data, the simulators and the JavaScript are claims too. Line numbers are HTML file lines.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (a contradiction, arithmetic, code behavior) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the video captions, with a timestamp |

## 1. Goals and objectives

1. Summarize E01 at a glance: the test, the focus languages and the key numbers.
2. Show measured speed for many languages in a bar chart (a "throughput" chart, where throughput means passes per second).
3. Show the cost of safety checks with a toggle simulator.
4. Show the memory and cache trade-off between a bit array and a byte array with a calculator.
5. Help a reader pick a language for a priority (speed, safety, developer speed, desktop user interfaces).

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Summary | **Partly** | Correct: the focus languages Ada, Pascal and Delphi (L98) [08:14], the limit of one million, 78,498 primes, and about 5 seconds (L108) [19:51]. The footprint 61.04 KiB (L103) is correct arithmetic. Wrong: it does not give the race result, and it calls the rules stricter than they are (M4). |
| 2. Speed chart | **No** | All 15 numbers are invented (C1). The chart puts Ada above Pascal, the opposite of the video (C2). It scores Delphi, which the video does not score (C3). |
| 3. Safety simulator | **No** | The toggle only changes text. The penalty numbers are invented and the "-O3 suppression" mechanism is wrong (C4). |
| 4. Cache calculator | **Partly** | The footprint arithmetic is correct. But the cache sizes are fixed and dated, L3 and main memory are merged, and the page text contradicts its own calculator (M1, M2, M3). |
| 5. Priority selector | **Partly** | The advice is generic and mostly reasonable. It does not come from the video, and the safety advice is wrong (M5). |

**Overall confidence in the document:** Low. The page looks precise, but its central chart shows invented data as "empirical" results.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L186, L492-508, L539 | "Empirical performance throughput": C / C++ 2550, Rust 2520, Zig 2480, C# 1480, Python 20, Bash 0.5 passes per second. | The video gives no per-language table. It gives only the extremes of that day: 7301 passes per second [20:38] and "one pass every 294 seconds" [20:47]. The top value is not the page top value (2550), and the slowest entry is about 150 times slower than Bash on the page. The ratios in the data are consistent with each other (2240 divided by 2550 is 0.88), so the numbers are made to look calculated. No source is given. | [VIDEO], [DOC] |
| C2 | L496-497, L499 | "Ada (GNAT -O3)" 2350 is faster than "Pascal (Free Pascal)" 2240. "Ada (Default Safety)" is 890. | In E01 Pascal beat Ada: "that's gotta hurt for the Ada guys" [20:03]. The video has no "default safety" Ada run. The chart reverses the only real result of the video. The exact counts are on screen only. | [VIDEO], [VERIFY] numbers on screen |
| C3 | L498, L305-313 | Delphi scores 2180 passes per second (0.85x). | Dave says the Delphi score "cannot be counted" [16:48] because it uses ByteBool bytes [16:36]. He also names the commercial license [16:56]. The page invents a score for a language that the video did not race. | [VIDEO] |
| C4 | L239-271, L616-636 | Safety simulator: checks on give "-60% to -65% vs Unrestricted C". Checks off give "Parity with C/C++" and "Zero Overhead (Vectorized)". | The toggle changes only four text labels. It computes nothing and does not change the chart. The penalty numbers have no source. -O3 does not turn checks off (L269, L633). In Ada you use pragma Suppress or -gnatp. {$R+} {$Q+} are not the Free Pascal default (L263, L627), so "Default Defensive" is wrong for Pascal. A strided sieve loop (a loop with a fixed step larger than one) seldom vectorizes. | [DOC], [KNOW] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L324 vs L679-701 | The bit array fits "inside high-speed L1/L2 CPU cache". | The page calculator itself shows 61.04 KiB against an L1 limit of 32 KiB, so "1.9x Limit" (L688). The text and the calculator do not agree. | [DOC] |
| M2 | L44, L678-701 | L1 is 32 KiB, L2 is 512 KiB. Above L2 the badge says "L3 / DRAM Spillover". | The sizes are fixed. Many current CPUs have 32 to 48 KiB L1 data cache and 1 to 2 MiB L2. Apple M-series performance cores have 128 KiB L1. The comment at L44 promises an L3 check, but the code has none. L3 cache and DRAM (main memory) are different levels with very different speed. L697 says "Zero DRAM latency stalls" as a fact. | [KNOW], [DOC] |
| M3 | L366, L668, L671 | A bit write costs "4 Ops (SHR, AND, OR, Mask Write)". A byte write costs "1 Op". | To clear a bit you use AND with an inverted mask. To set a bit you use OR. One write does not need the two. A bit update is a read, a change and a write. The byte case also needs address work. The counts are not measured and do not predict speed. | [KNOW] |
| M4 | L143 | "Wheel factorizations are strictly prohibited." | The repository rules (CONTRIBUTING.md of PlummersSoftwareLLC/Primes, read on the web in pass 1) permit wheel solutions with the tag algorithm=wheel. The run-time buffer rule (L130) is correct. The 5-second rule (L169) is correct: at least 5 seconds. | [VERIFY] (web check done, confirm in pass 2) |
| M5 | L722 | "When compiled with -O3 optimization directives, safety checks are verified statically without sacrificing loop execution speed." | -O3 is an optimization level. It does not prove programs safe. The compiler removes only the checks that it can prove safe. Static proof of Ada needs SPARK (a checked subset of Ada) and its tools. | [KNOW] |
| M6 | L572-575, L507 | A linear bar chart shows all 15 values. | Python (20), Ruby (15), PHP (64) and Bash (0.5) are almost invisible next to 2550. A log scale or a table is necessary for a range this wide. The chart hides the largest effect in the data. | [DOC] |
| M7 | L85, L94, L143, L147, L156, L333, L408 | Math such as $N = 1,000,000$ and $\sqrt{N}$ and \frac. | The page loads no math library. The reader sees raw dollar signs and backslashes. L169 shows raw ** marks and L324 shows raw backticks, because the page is HTML, not Markdown. | [DOC] |
| M8 | L8, L10 | Tailwind and Chart.js come from CDNs (content delivery networks, remote servers). | cdn.tailwindcss.com is the Tailwind "Play CDN". Tailwind says it is for development, not for production. The Chart.js link has no version, so a future major version can break the page. Without a network, the page has no layout and no chart. | [KNOW] |
| M9 | L59, L200-202, L249, L578-583 | Accessibility. | The chart canvas has no text alternative and no data table. The detail card opens only with a mouse click on a bar, not with a keyboard. The navigation is hidden on small screens (hidden md:flex) and has no replacement. The toggle buttons have no aria-pressed state. Category shows only by color. Much text is 10 to 11 pixels. | [DOC] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L85 | "Microsoft systems engineer Dave Plummer". | He is a retired Microsoft engineer. He speaks of the MS-DOS and Windows 95 days [00:41]. Report 11 says "former" correctly. | [VIDEO], [VERIFY] |
| m2 | L156 | "Invalid passes are discarded." | The video shows one ValidateResults call against a table of known counts [13:04 to 13:21]. It does not show a check on every pass or discarded passes. The value 78,498 is correct. | [VIDEO], [VERIFY] |
| m3 | L85, L43, L493 | "45+ programming languages". | The chart has 15 bars and merges C and C++ in one bar. The video says "some 45" [01:24]. | [DOC], [VIDEO] |
| m4 | L718 | Raw speed: "C, C++, Rust, Zig, Fortran". | Fortran is not in the chart and not raced in E01. The recommendation has no data on the page. | [DOC], [VIDEO] |
| m5 | L437, L445 | Safe builds "match unrestricted C/C++". Managed runtimes are "economically preferable". | These cards repeat the overclaims of report 11 (C2 and L56 there). E01 does not show them. | [VIDEO] |
| m6 | L674, L682-692 | The cache code compares kib with numbers. | kib is a text string from toFixed. JavaScript converts it, so the result is correct, but the code is fragile. L568 uses substr, which is deprecated. | [DOC] |
| m7 | L366 vs L668, L380, L399-404 | Start values in the HTML. | The HTML says "Write", the script says "Mask Write". The start badge is green "L2 Cache Resident" and the script makes it amber. The script replaces them at load, so a reader sees a flash of different text. | [DOC] |
| m8 | L232 | "Systems Systems Deep Dive". | The word is doubled. | [DOC] |
| m9 | L31-50, L485 | Comments about the palette and "NO SVG". | These are leftover instructions from the page generator. They do not help the reader. | [DOC] |

## 4. Source-quality audit

- The page has **no citations and no links** to the video, the repository or any source. The footer (L484) says "Based on empirical data from Dave's Garage". No number on the page comes from the video.
- The chart data (L492-508) and the penalty text (L268, L634) have no source at all.
- The page drops the 12 sources of report 11. Those sources were weak (see review 11, section 4), but now the reader cannot check even them.
- Correct content on the page: the focus languages (L98), N = 1,000,000 and 78,498 primes (L94, L156), about 5 seconds (L108), the run-time buffer rule (L130), O(N log log N) (L147), and the footprint formula N / 16 bytes for odd-only bits (L408).

## 5. Omissions a skeptic would raise

1. **The real result.** Pascal beat Ada [20:03]. The page does not say it, and the chart shows the opposite.
2. **The range of the leaderboard.** 7301 passes per second at the top and one pass per 294 seconds at the bottom [20:38 to 20:47]. That spread is the most striking number in the video.
3. **One machine, one day.** Scores depend on the hardware and the code of that day [19:31 to 19:40]. The page shows fixed numbers without a machine or a date.
4. **How to run it yourself.** The video says that one make command builds and runs all languages in Docker containers [08:33 to 08:49]. The page does not link the repository.
5. **Bit array cost in practice.** The page never shows a measured bit against byte result. The reader can do this test on their own machine.

## 6. Use for the learning journey

- **Relevance is low.** The page is about Ada, Pascal and Delphi, and its numbers are invented. It does not teach Assembly or Fortran.
- **Keep: the footprint formula** (L408). For odd numbers to N, bits need N / 16 bytes and bytes need N / 2 bytes. You can check it by hand. It is good arithmetic practice for memory sizes in Assembly and in Fortran.
- **Keep, with a change: the cache idea.** Find the real L1 and L2 sizes of your own CPU (on Linux, the command lscpu shows them). Then compare them with your sieve buffer size.
- **Ignore:** the chart numbers, the safety simulator and the priority selector.
- **Better source:** the PrimeAssembly and PrimeFortran folders in the PlummersSoftwareLLC/Primes repository. They give real code that you can run and measure.

## 7. Pass-2 verification list

- [ ] Watch 19:51 to 20:20 and write down the Ada and Pascal pass counts on screen. Compare them with L496-497 (C2).
- [ ] Watch 20:38 to 20:50 and confirm the top and bottom scores (C1).
- [ ] Open the page in a browser without a network and confirm that the layout and chart fail (M8).
- [ ] Confirm that the math renders as raw text in a browser (M7).
- [ ] Test the page with the keyboard only and with a screen reader (M9).
- [ ] Confirm the Free Pascal defaults for {$R} and {$Q}, and the GNAT switch -gnatp (C4).
- [ ] Read CONTRIBUTING.md of PlummersSoftwareLLC/Primes again for the wheel rule and the validation rule (M4, m2).
