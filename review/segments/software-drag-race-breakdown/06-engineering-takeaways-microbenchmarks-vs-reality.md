---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: call-to-action
lines: 307-322
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-M8, D10-m6]
---

# Engineering Takeaways: Microbenchmarks vs Reality

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 00:19](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=19s). The video asks if COBOL for business or Fortran for science is faster.

#### Engineering Takeaways: Microbenchmarks vs Reality

While microbenchmarks like the Sieve of Eratosthenes offer deep insight into integer ALU arithmetic, cache locality, and register allocation, they do not reflect complete language domain utility:

##### Scientific & Tensor Computing (Fortran)

In high-performance computational fluid dynamics or matrix algebra, Fortran's non-aliasing memory contracts allow vector compilers to achieve instruction pipelining and SIMD throughput that frequently surpasses C++.

##### Enterprise Transaction Processing (COBOL)

COBOL was designed to process streams of fixed-point financial records where IEEE floating-point binary rounding errors are illegal. Its syntax maps directly to hardware decimal arithmetic on modern enterprise mainframes.

<details><summary>Raw HTML (lines 307-322)</summary>

```html
        <section class="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            <h3 class="text-xl font-bold text-amber-400">Engineering Takeaways: Microbenchmarks vs Reality</h3>
            <p class="text-slate-300 text-sm mt-3 leading-relaxed">
                While microbenchmarks like the Sieve of Eratosthenes offer deep insight into integer ALU arithmetic, cache locality, and register allocation, they do not reflect complete language domain utility:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-xs text-slate-300">
                <div class="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                    <h4 class="font-bold text-white mb-2">Scientific & Tensor Computing (Fortran)</h4>
                    <p class="leading-relaxed">In high-performance computational fluid dynamics or matrix algebra, Fortran's non-aliasing memory contracts allow vector compilers to achieve instruction pipelining and SIMD throughput that frequently surpasses C++.</p>
                </div>
                <div class="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                    <h4 class="font-bold text-white mb-2">Enterprise Transaction Processing (COBOL)</h4>
                    <p class="leading-relaxed">COBOL was designed to process streams of fixed-point financial records where IEEE floating-point binary rounding errors are illegal. Its syntax maps directly to hardware decimal arithmetic on modern enterprise mainframes.</p>
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
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-m6 | minor | KNOW | open | L258, L319 | _Claim:_ Decimal math has "no rounding error". Binary rounding errors "are illegal". _Problem:_ Decimal arithmetic still rounds, for example in division. Financial rules require correct decimal results, but "illegal" is too strong. |

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
