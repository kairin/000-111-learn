---
source: ../retro_game_dev_language_advisor.html
document: "Retro Game Dev Advisor: Assembly vs. Fortran (1980s-1990s Constraints)"
kind: html-section
section_id: analytics
lines: 379-408, 621-731
findings: [D04-C4, D04-C5]
---

# Retro Game Engine & Genre Suitability Analytics

####   Retro Game Engine & Genre Suitability Analytics

Quantitative comparison of technical capabilities under 1980s–1990s execution constraints.

##### Genre Suitability Index

Matching technical capabilities with retro game genres

[chart: genreRadarChart — data in the Linked script section below]

##### CPU Cycle Overhead Allocation (80s Hardware)

Estimated frame budget distribution across tasks

[chart: cycleBarChart — data in the Linked script section below]

## Linked script: Chart data (lines 621-731)

The recommendation logic / numbers below are claims too; review them.

```js
        // Initialize Chart.js Data Visualizations
        function initCharts() {
            // Genre Suitability Radar Chart
            const ctxRadar = document.getElementById('genreRadarChart').getContext('2d');
            new Chart(ctxRadar, {
                type: 'radar',
                data: {
                    labels: [
                        '2D Fast Arcade',
                        'Pseudo-3D Raycaster',
                        'Orbital Flight Sim',
                        'Tactical Wargame',
                        'Procedural Universe',
                        'Cellular Automata Sim'
                    ],
                    datasets: [
                        {
                            label: 'Assembly Engine',
                            data: [95, 90, 40, 50, 45, 55],
                            fill: true,
                            backgroundColor: 'rgba(99, 102, 241, 0.25)',
                            borderColor: 'rgb(99, 102, 241)',
                            pointBackgroundColor: 'rgb(99, 102, 241)'
                        },
                        {
                            label: 'Fortran Engine',
                            data: [20, 30, 95, 90, 95, 90],
                            fill: true,
                            backgroundColor: 'rgba(6, 182, 212, 0.25)',
                            borderColor: 'rgb(6, 182, 212)',
                            pointBackgroundColor: 'rgb(6, 182, 212)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } } }
                    },
                    scales: {
                        r: {
                            angleLines: { color: '#334155' },
                            grid: { color: '#1e293b' },
                            ticks: { display: false },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });

            // CPU Cycle Overhead Distribution (Stacked Bar Chart)
            const ctxBar = document.getElementById('cycleBarChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: ['Assembly Action Loop', 'Fortran Simulation Loop'],
                    datasets: [
                        {
                            label: 'Rendering & Framebuffer',
                            data: [50, 20],
                            backgroundColor: '#6366f1'
                        },
                        {
                            label: 'Input & Hardware IRQs',
                            data: [15, 5],
                            backgroundColor: '#f59e0b'
                        },
                        {
                            label: 'Physics & Simulation Math',
                            data: [20, 65],
                            backgroundColor: '#06b6d4'
                        },
                        {
                            label: 'Memory & Overhead',
                            data: [15, 10],
                            backgroundColor: '#64748b'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}% CPU Cycles`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            max: 100,
                            ticks: { color: '#64748b', callback: function(v) { return v + '%'; } },
                            grid: { color: '#1e293b' }
                        },
                        y: {
                            stacked: true,
                            ticks: { color: '#cbd5e1', font: { family: 'JetBrains Mono', size: 10 } },
                            grid: { color: '#1e293b' }
                        }
                    }
                }
            });
        }
```

<details><summary>Raw HTML (lines 379-408)</summary>

```html
        <section id="analytics" class="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-8">
            <div>
                <h3 class="text-xl font-bold font-mono text-white flex items-center gap-2">
                    <span class="w-3 h-3 bg-amber-500 inline-block rounded-sm"></span>
                    Retro Game Engine & Genre Suitability Analytics
                </h3>
                <p class="text-slate-400 text-sm mt-1">Quantitative comparison of technical capabilities under 1980s–1990s execution constraints.</p>
            </div>

            <!-- Charts Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Radar Chart -->
                <div class="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                    <h4 class="text-xs font-mono font-bold text-slate-200 mb-1 text-center">Genre Suitability Index</h4>
                    <p class="text-[11px] text-slate-400 text-center mb-4">Matching technical capabilities with retro game genres</p>
                    <div class="chart-container">
                        <canvas id="genreRadarChart"></canvas>
                    </div>
                </div>

                <!-- Bar Chart -->
                <div class="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
                    <h4 class="text-xs font-mono font-bold text-slate-200 mb-1 text-center">CPU Cycle Overhead Allocation (80s Hardware)</h4>
                    <p class="text-[11px] text-slate-400 text-center mb-4">Estimated frame budget distribution across tasks</p>
                    <div class="chart-container">
                        <canvas id="cycleBarChart"></canvas>
                    </div>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D04-C4 | critical | KNOW VERIFY | verify | Genre radar L630–656 | Invented scores (Assembly: Orbital Flight Sim **40**, Procedural Universe **45**; Fortran: **95/95**). History says otherwise: *Elite* and *Frontier: Elite II*, the landmark procedural universe and orbital flight sims, were assembly. Fortran is given 20–30 for arcade and raycaster, yet the same page's tie-break suggests Fortran plus assembly rendering, which would score higher. |
| D04-C5 | critical | DOC | open | CPU cycle chart L676–715 | Labelled "**Estimated** frame budget". These are invented percentages with no measurement. The chart also mixes up **genre workload with language**: an "Assembly action loop" and a "Fortran simulation loop" are different *games*, so the chart can't compare the languages. |

---

## Review worksheet

### 1. Goal / objective of this segment
_What is this segment trying to establish or help the reader decide?_

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
