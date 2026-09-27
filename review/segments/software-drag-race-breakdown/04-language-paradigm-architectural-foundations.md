---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: architecture
lines: 200-272, 506-517
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-C1, D10-C2, D10-M4, D10-M5, D10-M6, D10-M8, D10-m3, D10-m5, D10-m6, D10-m7]
---

# Language Paradigm & Architectural Foundations

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 04:32](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=272s). The COBOL and Fortran code tour starts here.

#### Language Paradigm & Architectural Foundations

Select a language tab below to explore its historical focus, memory abstraction capabilities, hardware instruction mapping, and key bottlenecks during prime sieve computations.

C++ Architecture

Fortran Architecture

COBOL Architecture

##### Core Paradigms & Strengths

- ✓Zero-Overhead Abstraction: Language constructs map directly to physical machine instructions without mandatory runtime checks.
- ✓Native Bit Primitives: Full support for single-cycle bitwise operators (`&`, `|`, `~`, `^`, `<<`, `>>`).
- ✓Inlined Memory Allocation: Minimal class encapsulation overhead with direct heap/stack pointer control.

##### Execution Mechanics in Sieve Benchmark

- ℹPointer Aliasing Risk: Requires careful compiler flags or explicit restrict keywords to match Fortran's vectorization assumptions.
- ℹCache Residency: Packed bitfield fits 100% inside CPU L2 cache, preventing pipeline stalls.
- ℹThroughput Range: 10,000 – 13,500 Passes/sec.

##### Core Paradigms & Strengths

- ✓Strict Non-Aliasing Arrays: Standard Fortran guarantees array arguments do not overlap, enabling aggressive compiler vectorization and loop reordering.
- ✓Numerical Math Pipeline: Unrivaled performance in contiguous matrix operations and numerical tensors.
- ✓Bit Manipulation: Modern Fortran can store primality in 64-bit integer bitfields yielding ~50% gains over byte arrays.

##### Execution Bottlenecks in Benchmark

- ⚠️Object Encapsulation Penalty: Wrapping memory allocations inside OO types introduces a 30%–50% throughput penalty vs raw procedural Fortran.
- ⚠️Dynamic Allocation Latency: Fortran runtime libraries are optimized for startup dynamic tensors, not cycling heap allocations thousands of times per second.
- ℹThroughput Range: 6,000 – 12,417 Passes/sec (highly backend dependent).

##### Core Paradigms & Strengths

- ✓Commercial Business Domain: Standardized for record-oriented accounting, banking transactions, and fixed-point decimal arithmetic (`COMP-3`).
- ✓Packed Decimal Hardware Integration: Direct mapping to mainframe hardware instruction sets for BCD financial calculations without rounding error.

##### Execution Bottlenecks in Benchmark

- ❌No Native Bitwise Operations: Lacks bitwise AND/OR/SHIFT instructions; bit tracking requires complex modulo division arithmetic.
- ❌Table Index Offset Overhead: `OCCURS` record table traversal forces runtime scaled multiplications and additions on every array read/write.
- ❌Control Flow Overhead: `PERFORM ... VARYING` bounds checking resists loop-unrolling and register reuse.
- ℹThroughput Range: ~250 Passes/sec (~50x slower).

## Linked script: `switchLangTab` (lines 506-517)

The recommendation logic / numbers below are claims too; review them.

```js
        function switchLangTab(lang) {
            document.getElementById('tab-cpp').className = 'pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition ' + (lang === 'cpp' ? 'tab-active' : '');
            document.getElementById('tab-fortran').className = 'pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition ' + (lang === 'fortran' ? 'tab-active' : '');
            document.getElementById('tab-cobol').className = 'pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition ' + (lang === 'cobol' ? 'tab-active' : '');

            document.getElementById('content-cpp').classList.add('hidden');
            document.getElementById('content-fortran').classList.add('hidden');
            document.getElementById('content-cobol').classList.add('hidden');

            document.getElementById('content-' + lang).classList.remove('hidden');
        }
```

<details><summary>Raw HTML (lines 200-272)</summary>

```html
        <section id="architecture" class="space-y-6">
            <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div class="max-w-3xl mb-6">
                    <h3 class="text-xl font-bold text-slate-900">Language Paradigm & Architectural Foundations</h3>
                    <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                        Select a language tab below to explore its historical focus, memory abstraction capabilities, hardware instruction mapping, and key bottlenecks during prime sieve computations.
                    </p>
                </div>

                <div class="flex border-b border-stone-200 space-x-8 mb-6">
                    <button onclick="switchLangTab('cpp')" id="tab-cpp" class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition tab-active">C++ Architecture</button>
                    <button onclick="switchLangTab('fortran')" id="tab-fortran" class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition">Fortran Architecture</button>
                    <button onclick="switchLangTab('cobol')" id="tab-cobol" class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition">COBOL Architecture</button>
                </div>

                <div id="content-cpp" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Core Paradigms & Strengths</h4>
                        <ul class="text-xs text-slate-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Zero-Overhead Abstraction:</strong> Language constructs map directly to physical machine instructions without mandatory runtime checks.</span></li>
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Native Bit Primitives:</strong> Full support for single-cycle bitwise operators (`&`, `|`, `~`, `^`, `<<`, `>>`).</span></li>
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Inlined Memory Allocation:</strong> Minimal class encapsulation overhead with direct heap/stack pointer control.</span></li>
                        </ul>
                    </div>
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Execution Mechanics in Sieve Benchmark</h4>
                        <ul class="text-xs text-slate-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">ℹ</span><span><strong>Pointer Aliasing Risk:</strong> Requires careful compiler flags or explicit restrict keywords to match Fortran's vectorization assumptions.</span></li>
                            <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">ℹ</span><span><strong>Cache Residency:</strong> Packed bitfield fits 100% inside CPU L2 cache, preventing pipeline stalls.</span></li>
                            <li class="flex items-start"><span class="text-blue-500 font-bold mr-2">ℹ</span><span><strong>Throughput Range:</strong> 10,000 – 13,500 Passes/sec.</span></li>
                        </ul>
                    </div>
                </div>

                <div id="content-fortran" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Core Paradigms & Strengths</h4>
                        <ul class="text-xs text-slate-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Strict Non-Aliasing Arrays:</strong> Standard Fortran guarantees array arguments do not overlap, enabling aggressive compiler vectorization and loop reordering.</span></li>
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Numerical Math Pipeline:</strong> Unrivaled performance in contiguous matrix operations and numerical tensors.</span></li>
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Bit Manipulation:</strong> Modern Fortran can store primality in 64-bit integer bitfields yielding ~50% gains over byte arrays.</span></li>
                        </ul>
                    </div>
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Execution Bottlenecks in Benchmark</h4>
                        <ul class="text-xs text-amber-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-amber-500 font-bold mr-2">⚠️</span><span><strong>Object Encapsulation Penalty:</strong> Wrapping memory allocations inside OO types introduces a 30%–50% throughput penalty vs raw procedural Fortran.</span></li>
                            <li class="flex items-start"><span class="text-amber-500 font-bold mr-2">⚠️</span><span><strong>Dynamic Allocation Latency:</strong> Fortran runtime libraries are optimized for startup dynamic tensors, not cycling heap allocations thousands of times per second.</span></li>
                            <li class="flex items-start"><span class="text-slate-600 font-bold mr-2">ℹ</span><span><strong>Throughput Range:</strong> 6,000 – 12,417 Passes/sec (highly backend dependent).</span></li>
                        </ul>
                    </div>
                </div>

                <div id="content-cobol" class="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Core Paradigms & Strengths</h4>
                        <ul class="text-xs text-slate-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Commercial Business Domain:</strong> Standardized for record-oriented accounting, banking transactions, and fixed-point decimal arithmetic (`COMP-3`).</span></li>
                            <li class="flex items-start"><span class="text-emerald-500 font-bold mr-2">✓</span><span><strong>Packed Decimal Hardware Integration:</strong> Direct mapping to mainframe hardware instruction sets for BCD financial calculations without rounding error.</span></li>
                        </ul>
                    </div>
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <h4 class="font-bold text-slate-900 text-sm mb-3">Execution Bottlenecks in Benchmark</h4>
                        <ul class="text-xs text-rose-600 space-y-2.5">
                            <li class="flex items-start"><span class="text-rose-500 font-bold mr-2">❌</span><span><strong>No Native Bitwise Operations:</strong> Lacks bitwise AND/OR/SHIFT instructions; bit tracking requires complex modulo division arithmetic.</span></li>
                            <li class="flex items-start"><span class="text-rose-500 font-bold mr-2">❌</span><span><strong>Table Index Offset Overhead:</strong> `OCCURS` record table traversal forces runtime scaled multiplications and additions on every array read/write.</span></li>
                            <li class="flex items-start"><span class="text-rose-500 font-bold mr-2">❌</span><span><strong>Control Flow Overhead:</strong> `PERFORM ... VARYING` bounds checking resists loop-unrolling and register reuse.</span></li>
                            <li class="flex items-start"><span class="text-slate-600 font-bold mr-2">ℹ</span><span><strong>Throughput Range:</strong> ~250 Passes/sec (~50x slower).</span></li>
                        </ul>
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
| D10-C1 | critical | VIDEO DOC | open | L84-86, L229, L353 | _Claim:_ "Peak Throughput 13,500 P/s", C++ range 10,000 to 13,500. _Problem:_ The video gives 1936 passes for the C++ program of Dave (14:03). Report 09 gives "about 10,000". The value 13,500 is in neither source. The page invents its headline number. |
| D10-C2 | critical | VIDEO | open | L89-91, L114, L267, L353 | _Claim:_ COBOL at 252 P/s, "~50x" slower, lags "by ~98%". _Problem:_ At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. Dave says that they are about the same speed. The bar chart shows the opposite of the video result. |
| D10-M4 | major | KNOW | open | L238 | _Claim:_ "Standard Fortran guarantees array arguments do not overlap". _Problem:_ The standard puts this rule on the programmer, and compilers do not check it. POINTER and TARGET arguments can overlap. The sieve uses one array, so this rule does not explain this race. |
| D10-M5 | major | VERIFY | verify | L240, L246 | _Claim:_ Bit storage gives "~50% gains over byte arrays". Object-oriented Fortran costs "30%-50%". _Problem:_ No source on the page. The fetched forum thread says the 50% gain is over the best "bitfield" results, not over byte arrays. The 30% to 50% range does not appear in the thread. |
| D10-M6 | major | VIDEO KNOW VERIFY | verify | L264-266 | _Claim:_ COBOL has "No Native Bitwise Operations". PERFORM VARYING "bounds checking resists loop-unrolling". _Problem:_ At 05:17, the video shows a COBOL array of one-bit values. The COBOL 2002 standard has bit data, but support varies. The loop claim is a guess with no source. |
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-m3 | minor | DOC | open | L195, L220, L257, L264-266, L478 | _Claim:_ Code in backticks. _Problem:_ Backticks are Markdown, not HTML. The page shows them as literal characters. |
| D10-m5 | minor | KNOW | open | L51, L112, L127, L209-212 | _Claim:_ Navigation, charts and tabs. _Problem:_ The canvas charts have no text alternative. The navigation bar is hidden on small screens, with no menu. The tab buttons have no role or selected state for screen readers. Status uses color only. |
| D10-m6 | minor | KNOW | open | L258, L319 | _Claim:_ Decimal math has "no rounding error". Binary rounding errors "are illegal". _Problem:_ Decimal arithmetic still rounds, for example in division. Financial rules require correct decimal results, but "illegal" is too strong. |
| D10-m7 | minor | KNOW | open | L239 | _Claim:_ Fortran has "Unrivaled performance" in matrix work. _Problem:_ This is marketing language. Tuned C, C++ and vendor libraries give the same speed. |

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
