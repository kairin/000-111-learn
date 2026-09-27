---
source: ../prime_sieve_benchmark_interactive_explorer.html
document: "Comparative Analysis: Prime Sieve Benchmark Dynamics"
kind: html-section
section_id: paradigm-chart
lines: 180-227, 491-509, 510-510, 511-511, 514-587, 588-603, 604-614
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
findings: [D12-C1, D12-C2, D12-C3, D12-M6, D12-M9, D12-m3]
---

# 2. Cross-Paradigm Performance Spectrum

> **Source video:** [E01: What is the FASTEST Computer Language? 45 Languages Tested!](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage, 22:26) · [at 20:38](https://www.youtube.com/watch?v=tQtFdsEcK_s&t=1238s). The video gives only the top and bottom scores, not the numbers in the chart.

### 2. Cross-Paradigm Performance Spectrum

This section presents empirical performance throughput across execution paradigms. Use the filter controls below to isolate Ahead-of-Time (AOT) compiled systems languages, Just-In-Time (JIT) managed runtimes, and dynamic bytecode interpreters. Select any language bar to inspect memory models and execution bottlenecks.

All Categories

Native AOT

Managed JIT

Dynamic Bytecode

[chart: paradigmCanvas — data in the Linked script section below]

Category

#### Language Name

Relative Throughput

1.0x Baseline

Memory Abstraction Model:
Detailed description of how memory is allocated and managed.

Primary Execution Bottleneck / Vector:
Specific hardware or runtime factor governing execution speed.

## Linked script: `benchmarkData` (lines 491-509)

The recommendation logic / numbers below are claims too; review them.

```js
        // Global Data Store
        const benchmarkData = [
            { name: "C / C++", passes: 2550, ratio: "1.00x", category: "aot", memory: "Explicit unboxed bitwise arrays with direct memory pointer arithmetic.", bottleneck: "CPU execution pipeline & L1/L2 data cache latency." },
            { name: "Rust", passes: 2520, ratio: "0.98x", category: "aot", memory: "Strict memory ownership models with zero-cost abstractions.", bottleneck: "LLVM compiler optimization pass capabilities." },
            { name: "Zig", passes: 2480, ratio: "0.97x", category: "aot", memory: "Manual unboxed memory allocation without hidden control flow.", bottleneck: "Direct register allocation efficiency." },
            { name: "Ada (GNAT -O3)", passes: 2350, ratio: "0.92x", category: "aot", memory: "Dynamic array allocation with optimized invariant check suppression.", bottleneck: "GCC backend scalar evolution & loop unrolling." },
            { name: "Pascal (Free Pascal)", passes: 2240, ratio: "0.88x", category: "aot", memory: "Contiguous byte/bit arrays with {$R-} check suppression.", bottleneck: "Register variable allocation & loop invariant hoisting." },
            { name: "Delphi", passes: 2180, ratio: "0.85x", category: "aot", memory: "Heap-allocated dynamic buffer wrappers with native pointers.", bottleneck: "Fastcall register passing convention efficiency." },
            { name: "Ada (Default Safety)", passes: 890, ratio: "0.35x", category: "aot", memory: "Pervasive runtime assertions on every array index write.", bottleneck: "Branch prediction miss penalties from safety bounds checking." },
            { name: "C# (.NET JIT)", passes: 1480, ratio: "0.58x", category: "jit", memory: "Garbage-collected managed heap with JIT boundary checks.", bottleneck: "JIT compilation overhead & persistent array index bounds checks." },
            { name: "Java (HotSpot JIT)", passes: 1320, ratio: "0.52x", category: "jit", memory: "Managed JVM object heap with automatic garbage collection.", bottleneck: "Array object header metadata & bounds verification." },
            { name: "Dart (JIT/AOT)", passes: 1070, ratio: "0.42x", category: "jit", memory: "Managed memory heap with static type annotations.", bottleneck: "Virtual machine runtime abstraction layer." },
            { name: "Scala", passes: 960, ratio: "0.38x", category: "jit", memory: "JVM object allocations with functional collections overhead.", bottleneck: "JVM bytecode loop transformation." },
            { name: "Python 3", passes: 20, ratio: "0.008x", category: "dynamic", memory: "Fully boxed PyObject structures with dynamic type metadata.", bottleneck: "Interpretive evaluation loop & dynamic type resolution." },
            { name: "PHP 8 (Standard)", passes: 64, ratio: "0.025x", category: "dynamic", memory: "Dynamic hash tables (Zend Values) with reference counting.", bottleneck: "Bytecode opcode dispatch overhead." },
            { name: "Ruby", passes: 15, ratio: "0.006x", category: "dynamic", memory: "Boxed object heap with dynamic dispatch wrappers.", bottleneck: "YARV bytecode interpretation loop." },
            { name: "Bash Scripting", passes: 0.5, ratio: "0.0002x", category: "dynamic", memory: "String-based subshell execution and environment pipes.", bottleneck: "Process fork execution and string evaluation." }
        ];
```

## Linked script: `activeChart` (lines 510-510)

The recommendation logic / numbers below are claims too; review them.

```js
        let activeChart = null;
```

## Linked script: `activeCategory` (lines 511-511)

The recommendation logic / numbers below are claims too; review them.

```js
        let activeCategory = 'all';
```

## Linked script: `initChart` (lines 514-587)

The recommendation logic / numbers below are claims too; review them.

```js
        // Initialize Chart.js Bar Graph
        function initChart() {
            const ctx = document.getElementById('paradigmCanvas').getContext('2d');
            
            const filteredData = activeCategory === 'all' 
                ? benchmarkData 
                : benchmarkData.filter(d => d.category === activeCategory);

            const labels = filteredData.map(d => d.name);
            const values = filteredData.map(d => d.passes);
            const backgroundColors = filteredData.map(d => {
                if (d.category === 'aot') return '#1e293b'; // Slate-800
                if (d.category === 'jit') return '#d97706'; // Amber-600
                return '#059669'; // Emerald-600
            });

            if (activeChart) {
                activeChart.destroy();
            }

            activeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Passes / Second (5s Normalized)',
                        data: values,
                        backgroundColor: backgroundColors,
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const item = filteredData[context.dataIndex];
                                    return ` Passes/sec: ${item.passes.toLocaleString()} (${item.ratio})`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                font: { size: 11 },
                                color: '#44403c',
                                callback: function(val, index) {
                                    let label = this.getLabelForValue(val);
                                    return label.length > 14 ? label.substr(0, 14) + '…' : label;
                                }
                            }
                        },
                        y: {
                            grid: { color: '#e7e5e4' },
                            ticks: { font: { size: 11 }, color: '#78716c' },
                            title: { display: true, text: 'Passes per Second', color: '#44403c', font: { size: 12, weight: 'bold' } }
                        }
                    },
                    onClick: (e, activeEls) => {
                        if (activeEls.length > 0) {
                            const index = activeEls[0].index;
                            showLanguageDetail(filteredData[index]);
                        }
                    }
                }
            });
        }
```

## Linked script: `filterParadigm` (lines 588-603)

The recommendation logic / numbers below are claims too; review them.

```js
        function filterParadigm(category) {
            activeCategory = category;
            
            // Reset button states
            ['all', 'aot', 'jit', 'dynamic'].forEach(cat => {
                const btn = document.getElementById(`btn-${cat}`);
                if (cat === category) {
                    btn.className = "px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 text-white shadow-sm transition";
                } else {
                    btn.className = "px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition";
                }
            });

            initChart();
        }
```

## Linked script: `showLanguageDetail` (lines 604-614)

The recommendation logic / numbers below are claims too; review them.

```js
        function showLanguageDetail(item) {
            const card = document.getElementById('language-detail-card');
            card.classList.remove('hidden');

            document.getElementById('detail-title').innerText = item.name;
            document.getElementById('detail-throughput').innerText = `${item.passes.toLocaleString()} Passes/sec (${item.ratio})`;
            document.getElementById('detail-category').innerText = item.category.toUpperCase();
            document.getElementById('detail-memory').innerText = item.memory;
            document.getElementById('detail-bottleneck').innerText = item.bottleneck;
        }
```

<details><summary>Raw HTML (lines 180-227)</summary>

```html
        <section id="paradigm-chart" class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
            <div class="mb-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-stone-900 mb-2">2. Cross-Paradigm Performance Spectrum</h2>
                        <p class="text-stone-600 text-sm md:text-base leading-relaxed">
                            This section presents empirical performance throughput across execution paradigms. Use the filter controls below to isolate Ahead-of-Time (AOT) compiled systems languages, Just-In-Time (JIT) managed runtimes, and dynamic bytecode interpreters. Select any language bar to inspect memory models and execution bottlenecks.
                        </p>
                    </div>
                    <!-- Chart Filter Buttons -->
                    <div class="flex flex-wrap gap-2 self-start md:self-center">
                        <button onclick="filterParadigm('all')" id="btn-all" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 text-white shadow-sm transition">All Categories</button>
                        <button onclick="filterParadigm('aot')" id="btn-aot" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition">Native AOT</button>
                        <button onclick="filterParadigm('jit')" id="btn-jit" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition">Managed JIT</button>
                        <button onclick="filterParadigm('dynamic')" id="btn-dynamic" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 transition">Dynamic Bytecode</button>
                    </div>
                </div>
            </div>

            <!-- Chart Container -->
            <div class="chart-container">
                <canvas id="paradigmCanvas"></canvas>
            </div>

            <!-- Interactive Language Insight Modal / Card -->
            <div id="language-detail-card" class="mt-6 p-5 bg-stone-50 rounded-xl border border-stone-200 hidden transition-all">
                <div class="flex items-start justify-between">
                    <div>
                        <span id="detail-category" class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-700">Category</span>
                        <h3 id="detail-title" class="text-xl font-bold text-stone-900 mt-1">Language Name</h3>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-stone-500">Relative Throughput</div>
                        <div id="detail-throughput" class="text-lg font-bold text-amber-700">1.0x Baseline</div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-stone-200/80 text-xs text-stone-600">
                    <div>
                        <span class="font-semibold text-stone-800">Memory Abstraction Model:</span>
                        <p id="detail-memory" class="mt-0.5 leading-relaxed">Detailed description of how memory is allocated and managed.</p>
                    </div>
                    <div>
                        <span class="font-semibold text-stone-800">Primary Execution Bottleneck / Vector:</span>
                        <p id="detail-bottleneck" class="mt-0.5 leading-relaxed">Specific hardware or runtime factor governing execution speed.</p>
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
| D12-C1 | critical | VIDEO DOC | open | L186, L492-508, L539 | _Claim:_ "Empirical performance throughput": C / C++ 2550, Rust 2520, Zig 2480, C# 1480, Python 20, Bash 0.5 passes per second.. _Problem:_ The video gives no per-language table. It gives only the extremes of that day: 7301 passes per second [20:38] and "one pass every 294 seconds" [20:47]. The top value is not the page top value (2550), and the slowest entry is about 150 times slower than Bash on the page. The ratios in the data are consistent with each other (2240 divided by 2550 is 0.88), so the numbers are made to look calculated. No source is given. |
| D12-C2 | critical | VIDEO VERIFY | verify | L496-497, L499 | _Claim:_ "Ada (GNAT -O3)" 2350 is faster than "Pascal (Free Pascal)" 2240. "Ada (Default Safety)" is 890.. _Problem:_ In E01 Pascal beat Ada: "that's gotta hurt for the Ada guys" [20:03]. The video has no "default safety" Ada run. The chart reverses the only real result of the video. The exact counts are on screen only. |
| D12-C3 | critical | VIDEO | open | L498, L305-313 | _Claim:_ Delphi scores 2180 passes per second (0.85x).. _Problem:_ Dave says the Delphi score "cannot be counted" [16:48] because it uses ByteBool bytes [16:36]. He also names the commercial license [16:56]. The page invents a score for a language that the video did not race. |
| D12-M6 | major | DOC | open | L572-575, L507 | _Claim:_ A linear bar chart shows all 15 values.. _Problem:_ Python (20), Ruby (15), PHP (64) and Bash (0.5) are almost invisible next to 2550. A log scale or a table is necessary for a range this wide. The chart hides the largest effect in the data. |
| D12-M9 | major | DOC | open | L59, L200-202, L249, L578-583 | _Claim:_ Accessibility.. _Problem:_ The chart canvas has no text alternative and no data table. The detail card opens only with a mouse click on a bar, not with a keyboard. The navigation is hidden on small screens (hidden md:flex) and has no replacement. The toggle buttons have no aria-pressed state. Category shows only by color. Much text is 10 to 11 pixels. |
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
