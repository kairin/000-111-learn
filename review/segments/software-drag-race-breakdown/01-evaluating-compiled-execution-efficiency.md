---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: overview
lines: 63-94
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-C1, D10-C2, D10-M7, D10-M8, D10-m2, D10-m8]
---

# Evaluating Compiled Execution Efficiency

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 13:03](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=783s). The video names the one-million limit for the race here.

Executive Summary

### Evaluating Compiled Execution Efficiency

This interactive breakdown analyzes retired Microsoft systems engineer Dave Plummer's single-threaded Sieve of Eratosthenes benchmark. The test evaluates how compiler optimization backends, memory abstraction layers, and instruction set primitives impact raw computational throughput across three foundational compiled languages.

Prime Limit ($N$) 1,000,000 78,498 Expected Primes

Test Window 5.0 Seconds Fixed Non-Extendable

Peak Throughput 13,500 P/s C++ Bitwise Engine

Performance Delta ~50x C++ / Fortran vs COBOL

<details><summary>Raw HTML (lines 63-94)</summary>

```html
        <section id="overview" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
            <div class="max-w-3xl mb-6">
                <span class="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">Executive Summary</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Evaluating Compiled Execution Efficiency</h2>
                <p class="text-slate-600 mt-3 leading-relaxed">
                    This interactive breakdown analyzes retired Microsoft systems engineer Dave Plummer's single-threaded Sieve of Eratosthenes benchmark. The test evaluates how compiler optimization backends, memory abstraction layers, and instruction set primitives impact raw computational throughput across three foundational compiled languages.
                </p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span class="text-xs font-medium text-slate-500 uppercase block">Prime Limit ($N$)</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">1,000,000</span>
                    <span class="text-xs text-slate-500">78,498 Expected Primes</span>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span class="text-xs font-medium text-slate-500 uppercase block">Test Window</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">5.0 Seconds</span>
                    <span class="text-xs text-slate-500">Fixed Non-Extendable</span>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span class="text-xs font-medium text-slate-500 uppercase block">Peak Throughput</span>
                    <span class="text-2xl font-bold text-blue-600 mt-1 block">13,500 <span class="text-xs font-normal">P/s</span></span>
                    <span class="text-xs text-slate-500">C++ Bitwise Engine</span>
                </div>
                <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span class="text-xs font-medium text-slate-500 uppercase block">Performance Delta</span>
                    <span class="text-2xl font-bold text-amber-600 mt-1 block">~50x</span>
                    <span class="text-xs text-slate-500">C++ / Fortran vs COBOL</span>
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
| D10-C1 | critical | VIDEO DOC | open | L84-86, L229, L353 | _Claim:_ "Peak Throughput 13,500 P/s", C++ range 10,000 to 13,500. _Problem:_ The video gives 1936 passes for the C++ program of Dave (14:03). Report 09 gives "about 10,000". The value 13,500 is in neither source. The page invents its headline number. |
| D10-C2 | critical | VIDEO | open | L89-91, L114, L267, L353 | _Claim:_ COBOL at 252 P/s, "~50x" slower, lags "by ~98%". _Problem:_ At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. Dave says that they are about the same speed. The bar chart shows the opposite of the video result. |
| D10-M7 | major | VIDEO VERIFY | verify | L80-81, L302 | _Claim:_ "Executes for exactly 5.0 non-extendable seconds". _Problem:_ The Primes CONTRIBUTING file says "at least 5 seconds", then stop as soon as possible (checked by WebFetch). At 10:25, the Fortran program checks the time after each full pass. |
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-m2 | minor | DOC | open | L74, L140, L297, L302 | _Claim:_ "$N$", "$N = 1,000,000$", "$P/s$". _Problem:_ The page loads no math library. The reader sees raw dollar signs. |
| D10-m8 | minor | VIDEO KNOW | open | L68, L76 | _Claim:_ Dave Plummer is a retired Microsoft engineer. N is 1,000,000 with 78,498 primes. _Problem:_ These are correct. The video confirms Dave (00:58) and the one-million limit (13:03). 78,498 is the correct count of primes below one million. |

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
