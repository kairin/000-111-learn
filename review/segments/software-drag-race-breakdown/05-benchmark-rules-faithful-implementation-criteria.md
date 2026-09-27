---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: integrity
lines: 274-305
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-C4, D10-M7, D10-M8, D10-m2]
---

# Benchmark Rules & Faithful Implementation Criteria

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 05:30](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=330s). The video says that the COBOL program is not faithful to the rules.

Methodology

#### Benchmark Rules & Faithful Implementation Criteria

To maintain strict parity and prevent compiler optimization shortcuts (such as static array caching or precomputed prime tables), all submissions in the Dave's Garage Software Drag Race must adhere to standard rules.

01

##### Encapsulation Boundary

Algorithm must be encapsulated within a class, module, or object structure, preventing global scope pollution.

02

##### Dynamic Allocation

Working memory buffer must be re-allocated or re-initialized on every single pass rather than reusing static memory.

03

##### Truth Validation

Pass count and results must be verified against reference truth table (78,498 primes for $N=10^6$) upon completion.

04

##### Fixed Time Constraint

Executes for exactly 5.0 non-extendable seconds. Metric is total validated Passes per Second ($P/s$).

<details><summary>Raw HTML (lines 274-305)</summary>

```html
        <section id="integrity" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
            <div class="max-w-3xl mb-6">
                <span class="px-3 py-1 bg-stone-100 text-slate-700 text-xs font-semibold rounded-full uppercase tracking-wider">Methodology</span>
                <h3 class="text-xl font-bold text-slate-900 mt-2">Benchmark Rules & Faithful Implementation Criteria</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                    To maintain strict parity and prevent compiler optimization shortcuts (such as static array caching or precomputed prime tables), all submissions in the Dave's Garage Software Drag Race must adhere to standard rules.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="p-4 border border-stone-200 rounded-xl bg-stone-50">
                    <div class="text-blue-600 font-bold text-lg mb-1">01</div>
                    <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wide">Encapsulation Boundary</h4>
                    <p class="text-xs text-slate-600 mt-1">Algorithm must be encapsulated within a class, module, or object structure, preventing global scope pollution.</p>
                </div>
                <div class="p-4 border border-stone-200 rounded-xl bg-stone-50">
                    <div class="text-blue-600 font-bold text-lg mb-1">02</div>
                    <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wide">Dynamic Allocation</h4>
                    <p class="text-xs text-slate-600 mt-1">Working memory buffer must be re-allocated or re-initialized on every single pass rather than reusing static memory.</p>
                </div>
                <div class="p-4 border border-stone-200 rounded-xl bg-stone-50">
                    <div class="text-blue-600 font-bold text-lg mb-1">03</div>
                    <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wide">Truth Validation</h4>
                    <p class="text-xs text-slate-600 mt-1">Pass count and results must be verified against reference truth table (78,498 primes for $N=10^6$) upon completion.</p>
                </div>
                <div class="p-4 border border-stone-200 rounded-xl bg-stone-50">
                    <div class="text-blue-600 font-bold text-lg mb-1">04</div>
                    <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wide">Fixed Time Constraint</h4>
                    <p class="text-xs text-slate-600 mt-1">Executes for exactly 5.0 non-extendable seconds. Metric is total validated Passes per Second ($P/s$).</p>
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
| D10-C4 | critical | VIDEO | open | L279, L292 | _Claim:_ The rules "prevent ... static array caching or precomputed prime tables" for "all submissions". _Problem:_ At 05:30, Dave says that the COBOL program keeps a preset copy of the array and "isn't technically faithful to the original". So one of the three programs breaks the rule that the page states. The page hides this. |
| D10-M7 | major | VIDEO VERIFY | verify | L80-81, L302 | _Claim:_ "Executes for exactly 5.0 non-extendable seconds". _Problem:_ The Primes CONTRIBUTING file says "at least 5 seconds", then stop as soon as possible (checked by WebFetch). At 10:25, the Fortran program checks the time after each full pass. |
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-m2 | minor | DOC | open | L74, L140, L297, L302 | _Claim:_ "$N$", "$N = 1,000,000$", "$P/s$". _Problem:_ The page loads no math library. The reader sees raw dollar signs. |

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
