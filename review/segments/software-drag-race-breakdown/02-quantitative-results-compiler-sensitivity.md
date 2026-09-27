---
source: ../software_drag_race_breakdown.html
document: "C++ vs Fortran vs COBOL: Performance & Architecture Breakdown"
kind: html-section
section_id: results
lines: 96-133, 331-331, 332-333, 334-344, 345-385, 386-432, 433-439
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D10-C1, D10-C2, D10-C3, D10-M8, D10-M9, D10-m5]
---

# Quantitative Results & Compiler Sensitivity

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 13:51](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=831s). The video gives Fortran 1163, COBOL 1118 and C++ 1936 passes, not the numbers on the page.

#### Quantitative Results & Compiler Sensitivity

The benchmark splits contenders into two performance tiers: systems-oriented languages operating near hardware limits (C++ and Fortran) and record-oriented domain languages (COBOL). Explore overall throughput and notice how Fortran's output changes radically based on compiler versions and optimization flags.

##### Overall Throughput Comparison (Passes/sec)
Higher is Better

[chart: languageThroughputChart — data in the Linked script section below]

C++ and Fortran deliver comparable peak execution speeds, whereas COBOL lags by ~98% due to runtime indexing overhead.

##### Fortran Toolchain Sensitivity Breakdown

All

GCC

Intel/LLVM

[chart: fortranCompilerChart — data in the Linked script section below]

GCC evolution yielded a +39.4% throughput boost from gfortran-7 to 11 on unchanged source code.

## Linked script: `throughputChartInstance` (lines 331-331)

The recommendation logic / numbers below are claims too; review them.

```js
        let throughputChartInstance = null;
```

## Linked script: `fortranChartInstance` (lines 332-333)

The recommendation logic / numbers below are claims too; review them.

```js
        let fortranChartInstance = null;
```

## Linked script: `fortranData` (lines 334-344)

The recommendation logic / numbers below are claims too; review them.

```js
        const fortranData = [
            { compiler: 'gfortran-7', throughput: 8905, type: 'gcc' },
            { compiler: 'gfortran-8', throughput: 11210, type: 'gcc' },
            { compiler: 'gfortran-9', throughput: 11211, type: 'gcc' },
            { compiler: 'gfortran-10', throughput: 11323, type: 'gcc' },
            { compiler: 'gfortran-11', throughput: 12417, type: 'gcc' },
            { compiler: 'ifort 2021.4', throughput: 6097, type: 'vendor' },
            { compiler: 'ifx 2021.4', throughput: 7283, type: 'vendor' },
            { compiler: 'flang-12', throughput: 6659, type: 'vendor' }
        ];
```

## Linked script: `initCharts` (lines 345-385)

The recommendation logic / numbers below are claims too; review them.

```js
        function initCharts() {
            const ctx1 = document.getElementById('languageThroughputChart').getContext('2d');
            throughputChartInstance = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['C++ (Inlined Bitwise)', 'Fortran (gfortran-11)', 'COBOL (Record Byte)'],
                    datasets: [{
                        label: 'Passes / Second (P/s)',
                        data: [13500, 12417, 252],
                        backgroundColor: ['#2563eb', '#059669', '#d97706'],
                        borderRadius: 6
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
                                    return context.raw.toLocaleString() + ' Passes/sec';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: '#e2e8f0' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });

            renderFortranChart('all');
        }
```

## Linked script: `renderFortranChart` (lines 386-432)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderFortranChart(filter) {
            const filtered = fortranData.filter(item => {
                if (filter === 'gcc') return item.type === 'gcc';
                if (filter === 'vendor') return item.type === 'vendor';
                return true;
            });

            const labels = filtered.map(d => d.compiler);
            const values = filtered.map(d => d.throughput);
            const colors = filtered.map(d => d.type === 'gcc' ? '#059669' : '#d97706');

            if (fortranChartInstance) {
                fortranChartInstance.destroy();
            }

            const ctx2 = document.getElementById('fortranCompilerChart').getContext('2d');
            fortranChartInstance = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Throughput (P/s)',
                        data: values,
                        backgroundColor: colors,
                        borderRadius: 4
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: { color: '#e2e8f0' }
                        },
                        y: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }
```

## Linked script: `filterFortranChart` (lines 433-439)

The recommendation logic / numbers below are claims too; review them.

```js
        function filterFortranChart(type) {
            document.getElementById('btn-all').className = type === 'all' ? 'text-xs px-2.5 py-1 rounded bg-blue-600 text-white font-medium' : 'text-xs px-2.5 py-1 rounded bg-white text-slate-600 border border-stone-300';
            document.getElementById('btn-gcc').className = type === 'gcc' ? 'text-xs px-2.5 py-1 rounded bg-blue-600 text-white font-medium' : 'text-xs px-2.5 py-1 rounded bg-white text-slate-600 border border-stone-300';
            document.getElementById('btn-vendor').className = type === 'vendor' ? 'text-xs px-2.5 py-1 rounded bg-blue-600 text-white font-medium' : 'text-xs px-2.5 py-1 rounded bg-white text-slate-600 border border-stone-300';
            renderFortranChart(type);
        }
```

<details><summary>Raw HTML (lines 96-133)</summary>

```html
        <section id="results" class="space-y-6">
            <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div class="max-w-3xl mb-6">
                    <h3 class="text-xl font-bold text-slate-900">Quantitative Results & Compiler Sensitivity</h3>
                    <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                        The benchmark splits contenders into two performance tiers: systems-oriented languages operating near hardware limits (C++ and Fortran) and record-oriented domain languages (COBOL). Explore overall throughput and notice how Fortran's output changes radically based on compiler versions and optimization flags.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200 flex flex-col">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-bold text-slate-800 text-sm">Overall Throughput Comparison (Passes/sec)</h4>
                            <span class="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded">Higher is Better</span>
                        </div>
                        <div class="chart-container">
                            <canvas id="languageThroughputChart"></canvas>
                        </div>
                        <p class="text-xs text-slate-500 mt-3 text-center">C++ and Fortran deliver comparable peak execution speeds, whereas COBOL lags by ~98% due to runtime indexing overhead.</p>
                    </div>

                    <div class="bg-stone-50 p-5 rounded-xl border border-stone-200 flex flex-col">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="font-bold text-slate-800 text-sm">Fortran Toolchain Sensitivity Breakdown</h4>
                            <div class="space-x-1">
                                <button onclick="filterFortranChart('all')" id="btn-all" class="text-xs px-2.5 py-1 rounded bg-blue-600 text-white font-medium">All</button>
                                <button onclick="filterFortranChart('gcc')" id="btn-gcc" class="text-xs px-2.5 py-1 rounded bg-white text-slate-600 border border-stone-300">GCC</button>
                                <button onclick="filterFortranChart('vendor')" id="btn-vendor" class="text-xs px-2.5 py-1 rounded bg-white text-slate-600 border border-stone-300">Intel/LLVM</button>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="fortranCompilerChart"></canvas>
                        </div>
                        <p class="text-xs text-slate-500 mt-3 text-center">GCC evolution yielded a +39.4% throughput boost from gfortran-7 to 11 on unchanged source code.</p>
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
| D10-C3 | critical | VIDEO VERIFY | verify | L119-129, L334-343, L350-353 | _Claim:_ Fortran compiler chart (gfortran 7 to 11, ifort, ifx, flang) as part of Episode 04. _Problem:_ The video names no compiler and no flag. The data comes from a 2022 forum post on an AMD Ryzen 7 3700X (checked by WebFetch). The video uses a Threadripper (00:19). The first chart also puts this gfortran-11 value next to the invented C++ value (C1). The two bars come from different tests, so the comparison has no meaning. |
| D10-M8 | major | DOC | open | L63-328 | _Claim:_ Footer: "Based on Dave's Garage Episode 04". _Problem:_ The page has no citation and no link to the video. A reader cannot trace any number. Almost no content comes from the episode itself. |
| D10-M9 | major | DOC | open | L101 | _Claim:_ Fortran output "changes radically based on compiler versions and optimization flags". _Problem:_ All five gfortran rows use the same flags. The data cannot separate the effect of flags from the effect of the compiler. |
| D10-m5 | minor | KNOW | open | L51, L112, L127, L209-212 | _Claim:_ Navigation, charts and tabs. _Problem:_ The canvas charts have no text alternative. The navigation bar is hidden on small screens, with no menu. The tab buttons have no role or selected state for screen readers. Status uses color only. |

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
