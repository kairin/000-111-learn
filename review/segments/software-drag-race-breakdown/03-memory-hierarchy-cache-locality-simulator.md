---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: cache-simulator
lines: 135-198, 440-505
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-M1, D10-M2, D10-M3, D10-M8, D10-m2, D10-m3, D10-m4]
---

# Memory Hierarchy & Cache Locality Simulator

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17). The video does not cover this idea.

Interactive Mechanics

#### Memory Hierarchy & Cache Locality Simulator

Why does a 1-bit storage representation drastically outperform an 8-bit byte array despite requiring CPU instructions for bit-shifting and masking? Toggle between the two storage modes below to simulate CPU cache saturation and footprint dynamics for $N = 1,000,000$.

Select Storage Strategy:

1-Bit Packed Field

8-Bit Byte Array

Calculated Data Footprint 61.0 KB

L1 Data Cache (32 KB) Partial Fit (190%)

Primary working set spills out of L1 cache.

L2 Data Cache (512 KB) 100% Residency (12%)

Entire dataset fits comfortably within high-speed L2 cache.

Execution Penalty 0% (Optimal)

Bitfield math is executed in single-cycle ALU operations.

Architectural Takeaway: Modern CPUs possess hyper-fast ALUs that can perform bit-shifting (`>>`), masking (`&`), and bitwise OR (`|`) operations in 1 clock cycle. The memory stall latency of fetching byte arrays from lower cache tiers or RAM costs up to 100x more cycles than doing the extra bitwise math.

## Linked script: `updateSimulator` (lines 440-505)

The recommendation logic / numbers below are claims too; review them.

```js
        function updateSimulator(mode) {
            const btn1 = document.getElementById('sim-btn-1bit');
            const btn8 = document.getElementById('sim-btn-8bit');
            const footprint = document.getElementById('sim-footprint');
            const l1Status = document.getElementById('l1-status');
            const l1Bar = document.getElementById('l1-bar');
            const l1Desc = document.getElementById('l1-desc');
            const l2Status = document.getElementById('l2-status');
            const l2Bar = document.getElementById('l2-bar');
            const l2Desc = document.getElementById('l2-desc');
            const penaltyStatus = document.getElementById('penalty-status');
            const penaltyBar = document.getElementById('penalty-bar');
            const penaltyDesc = document.getElementById('penalty-desc');
            const explanation = document.getElementById('sim-explanation');

            if (mode === '1bit') {
                btn1.className = 'px-4 py-2 text-xs font-bold rounded-md bg-white text-blue-700 shadow-sm transition';
                btn8.className = 'px-4 py-2 text-xs font-bold rounded-md text-slate-600 hover:text-slate-900 transition';
                
                footprint.innerText = '61.0 KB';
                l1Status.innerText = 'Partial Fit (190%)';
                l1Status.className = 'text-amber-600 font-bold';
                l1Bar.style.width = '100%';
                l1Bar.className = 'bg-amber-500 h-full transition-all duration-500';
                l1Desc.innerText = 'Primary working set spills out of L1 data cache.';

                l2Status.innerText = '100% Residency (12%)';
                l2Status.className = 'text-emerald-600 font-bold';
                l2Bar.style.width = '12%';
                l2Bar.className = 'bg-emerald-500 h-full transition-all duration-500';
                l2Desc.innerText = 'Entire dataset fits comfortably inside fast L2 cache.';

                penaltyStatus.innerText = '0% (Optimal)';
                penaltyStatus.className = 'text-blue-600 font-bold';
                penaltyBar.style.width = '5%';
                penaltyBar.className = 'bg-blue-600 h-full transition-all duration-500';
                penaltyDesc.innerText = 'Bitfield math is executed in single-cycle ALU operations.';

                explanation.innerHTML = '<strong>Architectural Takeaway:</strong> Modern CPUs possess hyper-fast ALUs that perform bit-shifting (`>>`), masking (`&`), and bitwise OR (`|`) operations in 1 clock cycle. The memory stall latency of fetching byte arrays from lower cache tiers or RAM costs up to 100x more cycles than doing the extra bitwise math.';
            } else {
                btn8.className = 'px-4 py-2 text-xs font-bold rounded-md bg-white text-blue-700 shadow-sm transition';
                btn1.className = 'px-4 py-2 text-xs font-bold rounded-md text-slate-600 hover:text-slate-900 transition';

                footprint.innerText = '488.3 KB';
                l1Status.innerText = 'Overflow (1525%)';
                l1Status.className = 'text-rose-600 font-bold';
                l1Bar.style.width = '100%';
                l1Bar.className = 'bg-rose-500 h-full transition-all duration-500';
                l1Desc.innerText = 'Severe L1 cache line thrashing and evictions.';

                l2Status.innerText = 'Near Capacity (95%)';
                l2Status.className = 'text-amber-600 font-bold';
                l2Bar.style.width = '95%';
                l2Bar.className = 'bg-amber-500 h-full transition-all duration-500';
                l2Desc.innerText = 'Ejects other data structures, forcing L3 cache fetches.';

                penaltyStatus.innerText = '~50% Throughput Penalty';
                penaltyStatus.className = 'text-rose-600 font-bold';
                penaltyBar.style.width = '85%';
                penaltyBar.className = 'bg-rose-500 h-full transition-all duration-500';
                penaltyDesc.innerText = 'Frequent cache line misses stall CPU execution pipeline.';

                explanation.innerHTML = '<strong>Architectural Takeaway:</strong> Storing flags in 8-bit bytes eliminates bitwise arithmetic, but expands the working memory set by 800%. The resulting cache thrashing and higher-tier cache latency severely degrade execution speed.';
            }
        }
```

<details><summary>Raw HTML (lines 135-198)</summary>

```html
        <section id="cache-simulator" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
            <div class="max-w-3xl mb-6">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">Interactive Mechanics</span>
                <h3 class="text-xl font-bold text-slate-900 mt-2">Memory Hierarchy & Cache Locality Simulator</h3>
                <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                    Why does a 1-bit storage representation drastically outperform an 8-bit byte array despite requiring CPU instructions for bit-shifting and masking? Toggle between the two storage modes below to simulate CPU cache saturation and footprint dynamics for $N = 1,000,000$.
                </p>
            </div>

            <div class="bg-stone-50 rounded-xl p-6 border border-stone-200">
                <div class="flex flex-col md:flex-row justify-between items-center mb-6 pb-6 border-b border-stone-200 gap-4">
                    <div class="flex items-center space-x-4">
                        <span class="text-sm font-semibold text-slate-700">Select Storage Strategy:</span>
                        <div class="inline-flex rounded-lg p-1 bg-stone-200">
                            <button id="sim-btn-1bit" onclick="updateSimulator('1bit')" class="px-4 py-2 text-xs font-bold rounded-md bg-white text-blue-700 shadow-sm transition">1-Bit Packed Field</button>
                            <button id="sim-btn-8bit" onclick="updateSimulator('8bit')" class="px-4 py-2 text-xs font-bold rounded-md text-slate-600 hover:text-slate-900 transition">8-Bit Byte Array</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-slate-500 block">Calculated Data Footprint</span>
                        <span id="sim-footprint" class="text-2xl font-black text-slate-900">61.0 KB</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between text-xs font-medium">
                            <span class="text-slate-600">L1 Data Cache (32 KB)</span>
                            <span id="l1-status" class="text-amber-600 font-bold">Partial Fit (190%)</span>
                        </div>
                        <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                            <div id="l1-bar" class="bg-amber-500 h-full transition-all duration-500" style="width: 100%"></div>
                        </div>
                        <p class="text-xs text-slate-500" id="l1-desc">Primary working set spills out of L1 cache.</p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between text-xs font-medium">
                            <span class="text-slate-600">L2 Data Cache (512 KB)</span>
                            <span id="l2-status" class="text-emerald-600 font-bold">100% Residency (12%)</span>
                        </div>
                        <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                            <div id="l2-bar" class="bg-emerald-500 h-full transition-all duration-500" style="width: 11.9%"></div>
                        </div>
                        <p class="text-xs text-slate-500" id="l2-desc">Entire dataset fits comfortably within high-speed L2 cache.</p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between text-xs font-medium">
                            <span class="text-slate-600">Execution Penalty</span>
                            <span id="penalty-status" class="text-blue-600 font-bold">0% (Optimal)</span>
                        </div>
                        <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                            <div id="penalty-bar" class="bg-blue-600 h-full transition-all duration-500" style="width: 5%"></div>
                        </div>
                        <p class="text-xs text-slate-500" id="penalty-desc">Bitfield math is executed in single-cycle ALU operations.</p>
                    </div>
                </div>

                <div id="sim-explanation" class="mt-6 p-4 bg-white rounded-lg border border-stone-200 text-xs text-slate-700 leading-relaxed">
                    <strong>Architectural Takeaway:</strong> Modern CPUs possess hyper-fast ALUs that can perform bit-shifting (`>>`), masking (`&`), and bitwise OR (`|`) operations in 1 clock cycle. The memory stall latency of fetching byte arrays from lower cache tiers or RAM costs up to 100x more cycles than doing the extra bitwise math.
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
| D10-M1 | major | DOC KNOW | open | L140-196, L440-503 | _Claim:_ "Simulate CPU cache saturation". _Problem:_ The function updateSimulator only swaps fixed text. It calculates nothing. The size values are correct: 61 KB is 190% of 32 KB, 12% of 512 KB. 488 KB is 1525% of 32 KB and 95% of 512 KB. But the "~50% Throughput Penalty" and "0% (Optimal)" are fixed claims with no model. The model ignores the access order of the sieve and hardware prefetch (the CPU loads data before a request). The label "100% Residency (12%)" is confusing. |
| D10-M2 | major | DOC KNOW | open | L195, L478 | _Claim:_ Fetching bytes from "lower cache tiers or RAM costs up to 100x more cycles". _Problem:_ The page itself says that the 488 KB byte array fits in L2 (95%, L490). L2 latency is about 12 to 15 cycles, not 100 times the cost of a bit operation. The RAM case does not apply to this data size. |
| D10-M3 | major | VIDEO VERIFY | verify | L140 | _Claim:_ 1-bit storage "drastically" outperforms an 8-bit byte array. _Problem:_ The video does not test this. In the Primes project, some fast solutions use bytes. The result depends on the CPU, the compiler and the code. |
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-m2 | minor | DOC | open | L74, L140, L297, L302 | _Claim:_ "$N$", "$N = 1,000,000$", "$P/s$". _Problem:_ The page loads no math library. The reader sees raw dollar signs. |
| D10-m3 | minor | DOC | open | L195, L220, L257, L264-266, L478 | _Claim:_ Code in backticks. _Problem:_ Backticks are Markdown, not HTML. The page shows them as literal characters. |
| D10-m4 | minor | DOC | open | L502 | _Claim:_ Byte storage "expands the working memory set by 800%". _Problem:_ Eight times the size is an increase of 700%, or a size of 800%. |

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
