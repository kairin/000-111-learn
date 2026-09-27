---
source: ../prime_sieve_benchmark_interactive_explorer.html
document: "Comparative Analysis: Prime Sieve Benchmark Dynamics"
kind: html-section
section_id: call-to-action
lines: 115-177
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
findings: [D12-M4, D12-M7, D12-m2]
---

# 1. Algorithmic Framework & Benchmark Harness

> **Source video:** [E01: What is the FASTEST Computer Language? 45 Languages Tested!](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage, 22:26) · [at 04:52](https://www.youtube.com/watch?v=tQtFdsEcK_s&t=292s). Dave explains the sieve to one million and the score in passes per second.

### 1. Algorithmic Framework & Benchmark Harness

To maintain scientific integrity across radically disparate language paradigms—from bare-metal compiled code to dynamic bytecode interpreters—the benchmark harness imposes strict execution constraints. The section below details how the prime sieve is computed and validated to isolate micro-architectural CPU performance.

1

#### Dynamic Buffer Allocation

Candidate memory buffer must be dynamically allocated at runtime. Prevents compilers from precomputing prime tables or hardcoding static global offset addresses.

Rule: Dynamic Heap / Stack Buffer

2

#### Strict Sieve Execution

Sequential elimination of composite numbers for all odd factors up to $\sqrt{N}$. Mathematical bypasses or wheel factorizations are strictly prohibited.

Complexity: O(N log log N)

3

#### Mathematical Validation

Upon completing a pass, the engine verifies total primes against mathematical ground truth ($78,498$ primes below $1,000,000$). Invalid passes are discarded.

Check: 78,498 Primes Found

4

#### Time Normalization

The pipeline loops continuously over a 5-second window. Performance is measured as normalized **Passes per Second**, establishing high resolution.

Metric: Passes / Second

<details><summary>Raw HTML (lines 115-177)</summary>

```html
        <section class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-stone-900 mb-2">1. Algorithmic Framework & Benchmark Harness</h2>
                <p class="text-stone-600 text-sm md:text-base leading-relaxed">
                    To maintain scientific integrity across radically disparate language paradigms—from bare-metal compiled code to dynamic bytecode interpreters—the benchmark harness imposes strict execution constraints. The section below details how the prime sieve is computed and validated to isolate micro-architectural CPU performance.
                </p>
            </div>

            <!-- Interactive Step-by-Step Harness Workflow -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                        <div class="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-sm mb-3">1</div>
                        <h3 class="font-semibold text-stone-800 text-base mb-1">Dynamic Buffer Allocation</h3>
                        <p class="text-xs text-stone-600 leading-relaxed">
                            Candidate memory buffer must be dynamically allocated at runtime. Prevents compilers from precomputing prime tables or hardcoding static global offset addresses.
                        </p>
                    </div>
                    <div class="mt-4 text-[11px] font-mono text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/50">
                        Rule: Dynamic Heap / Stack Buffer
                    </div>
                </div>

                <div class="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                        <div class="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-sm mb-3">2</div>
                        <h3 class="font-semibold text-stone-800 text-base mb-1">Strict Sieve Execution</h3>
                        <p class="text-xs text-stone-600 leading-relaxed">
                            Sequential elimination of composite numbers for all odd factors up to $\sqrt{N}$. Mathematical bypasses or wheel factorizations are strictly prohibited.
                        </p>
                    </div>
                    <div class="mt-4 text-[11px] font-mono text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/50">
                        Complexity: O(N log log N)
                    </div>
                </div>

                <div class="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                        <div class="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-sm mb-3">3</div>
                        <h3 class="font-semibold text-stone-800 text-base mb-1">Mathematical Validation</h3>
                        <p class="text-xs text-stone-600 leading-relaxed">
                            Upon completing a pass, the engine verifies total primes against mathematical ground truth ($78,498$ primes below $1,000,000$). Invalid passes are discarded.
                        </p>
                    </div>
                    <div class="mt-4 text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200/50">
                        Check: 78,498 Primes Found
                    </div>
                </div>

                <div class="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                    <div>
                        <div class="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-sm mb-3">4</div>
                        <h3 class="font-semibold text-stone-800 text-base mb-1">Time Normalization</h3>
                        <p class="text-xs text-stone-600 leading-relaxed">
                            The pipeline loops continuously over a 5-second window. Performance is measured as normalized **Passes per Second**, establishing high resolution.
                        </p>
                    </div>
                    <div class="mt-4 text-[11px] font-mono text-stone-700 bg-stone-200/60 p-2 rounded">
                        Metric: Passes / Second
                    </div>
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
| D12-M4 | major | VERIFY | verify | L143 | _Claim:_ "Wheel factorizations are strictly prohibited.". _Problem:_ The repository rules (CONTRIBUTING.md of PlummersSoftwareLLC/Primes, read on the web in pass 1) permit wheel solutions with the tag algorithm=wheel. The run-time buffer rule (L130) is correct. The 5-second rule (L169) is correct: at least 5 seconds. |
| D12-M7 | major | DOC | open | L85, L94, L143, L147, L156, L333, L408 | _Claim:_ Math such as $N = 1,000,000$ and $\sqrt{N}$ and \frac.. _Problem:_ The page loads no math library. The reader sees raw dollar signs and backslashes. L169 shows raw ** marks and L324 shows raw backticks, because the page is HTML, not Markdown. |
| D12-m2 | minor | VIDEO VERIFY | verify | L156 | _Claim:_ "Invalid passes are discarded.". _Problem:_ The video shows one ValidateResults call against a table of known counts [13:04 to 13:21]. It does not show a check on every pass or discarded passes. The value 78,498 is correct. |

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
