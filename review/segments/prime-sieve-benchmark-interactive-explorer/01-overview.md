---
source: ../prime_sieve_benchmark_interactive_explorer.html
document: "Comparative Analysis: Prime Sieve Benchmark Dynamics"
kind: html-section
section_id: overview
lines: 76-112
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
findings: [D12-M7, D12-m1, D12-m3]
---

# overview

> **Source video:** [E01: What is the FASTEST Computer Language? 45 Languages Tested!](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage, 22:26) · [at 01:24](https://www.youtube.com/watch?v=tQtFdsEcK_s&t=84s). Dave says that people wrote the sieve in about 45 languages.

Empirical Computer Language Drag Race Analysis

##  Comparative Empirical Analysis of Programming Language Runtime Dynamics

This interactive analysis examines empirical runtime performance across 45+ programming languages, based on the foundational benchmark created by Microsoft systems engineer Dave Plummer (Dave's Garage). By isolating single-threaded execution on the Sieve of Eratosthenes algorithm ($N = 1,000,000$), we evaluate how compiler code generation, runtime safety checks, and memory representations dictate raw CPU execution speed.

Algorithmic Workload

Sieve of Eratosthenes

Limit $N = 1,000,000$

Primary Focus Languages

Ada, Pascal, Delphi

Vs. Native AOT & Dynamic Runtimes

Packed Bitwise Footprint

61.04 KiB

Fits within CPU L2 Cache

Execution Harness Calibration

~5.0 Seconds

Normalized Passes / Second

<details><summary>Raw HTML (lines 76-112)</summary>

```html
        <section id="overview" class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-stone-200">
            <div class="max-w-3xl">
                <div class="inline-block bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md mb-4">
                    Empirical Computer Language Drag Race Analysis
                </div>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
                    Comparative Empirical Analysis of Programming Language Runtime Dynamics
                </h1>
                <p class="text-stone-600 text-base sm:text-lg leading-relaxed mb-6">
                    This interactive analysis examines empirical runtime performance across 45+ programming languages, based on the foundational benchmark created by Microsoft systems engineer Dave Plummer (<em>Dave's Garage</em>). By isolating single-threaded execution on the Sieve of Eratosthenes algorithm ($N = 1,000,000$), we evaluate how compiler code generation, runtime safety checks, and memory representations dictate raw CPU execution speed.
                </p>
            </div>

            <!-- Key Metric Cards Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    <div class="text-xs text-stone-500 font-medium">Algorithmic Workload</div>
                    <div class="text-xl font-bold text-stone-800 mt-1">Sieve of Eratosthenes</div>
                    <div class="text-xs text-stone-600 mt-0.5">Limit $N = 1,000,000$</div>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    <div class="text-xs text-stone-500 font-medium">Primary Focus Languages</div>
                    <div class="text-xl font-bold text-amber-700 mt-1">Ada, Pascal, Delphi</div>
                    <div class="text-xs text-stone-600 mt-0.5">Vs. Native AOT & Dynamic Runtimes</div>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    <div class="text-xs text-stone-500 font-medium">Packed Bitwise Footprint</div>
                    <div class="text-xl font-bold text-emerald-700 mt-1">61.04 KiB</div>
                    <div class="text-xs text-stone-600 mt-0.5">Fits within CPU L2 Cache</div>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    <div class="text-xs text-stone-500 font-medium">Execution Harness Calibration</div>
                    <div class="text-xl font-bold text-stone-800 mt-1">~5.0 Seconds</div>
                    <div class="text-xs text-stone-600 mt-0.5">Normalized Passes / Second</div>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D12-M7 | major | DOC | open | L85, L94, L143, L147, L156, L333, L408 | _Claim:_ Math such as $N = 1,000,000$ and $\sqrt{N}$ and \frac.. _Problem:_ The page loads no math library. The reader sees raw dollar signs and backslashes. L169 shows raw ** marks and L324 shows raw backticks, because the page is HTML, not Markdown. |
| D12-m1 | minor | VIDEO VERIFY | verify | L85 | _Claim:_ "Microsoft systems engineer Dave Plummer".. _Problem:_ He is a retired Microsoft engineer. He speaks of the MS-DOS and Windows 95 days [00:41]. Report 11 says "former" correctly. |
| D12-m3 | minor | DOC VIDEO | open | L85, L43, L493 | _Claim:_ "45+ programming languages".. _Problem:_ The chart has 15 bars and merges C and C++ in one bar. The video says "some 45" [01:24]. |

---

## Review worksheet

### 1. Goal of this part
_What does this part try to show, or help the reader decide?_

### 2. Key claims to test
| # | Claim | Evidence given (citation / data) | Verifiable? |
|---|-------|----------------------------------|-------------|
| 1 |       |                                  |             |

### 3. Adversarial review
- **Strongest counter-argument:**
- **Unsupported, overstated, or outdated claims:**
- **Source quality (primary vs. blog/forum/marketing):**
- **Omissions / what a skeptic would ask:**
- **Internal consistency with other segments:**

### 4. Evaluation
- **Does the segment achieve its goal?** (Yes / Partly / No)
- **Confidence:** (High / Medium / Low)
- **Required fixes:**
