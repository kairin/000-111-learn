---
source: ../assembly_vs_fortran_learning_advisor.html
document: "Assembly vs. Modern Fortran: Strategic Learning Advisor"
kind: html-section
section_id: market
lines: 390-451, 676-771
findings: [D03-C3, D03-C4, D03-m5]
---

# Labor Market Realities & Toolchain Ecosystem

#### Labor Market Realities & Toolchain Ecosystem

Quantitative analysis of compensation, modern tooling friction, and industry roles.

##### US Annual Salary Range Comparison ($ USD)

Based on defense, cybersecurity, and national lab benchmarks

[chart: salaryChart — data in the Linked script section below]

##### Developer Experience & Toolchain Friction Score

Higher score indicates lower developer friction / better ergonomics

[chart: ergonomicsChart — data in the Linked script section below]

| Metric  | Assembly Ecosystem  | Modern Fortran Ecosystem

| Primary Compilers  | GNU Assembler (as), NASM, Yasm, LLVM-MC  | GFortran, Intel Fortran (ifx), LLVM Flang, LFortran

| Build System  | Raw Makefiles, CMake linker integration  | fpm (Fortran Package Manager), CMake, Meson

| IDE & Tooling  | Ghidra, Compiler Explorer, GDB/LLDB debuggers  | VS Code + fortls LSP, Jupyter Notebooks (LFortran)

| Target Industry Roles  | Reverse Engineer, Malware Analyst, Firmware Engineer  | HPC Application Specialist, Climate Scientist, Computational Physicist

## Linked script: Chart data (lines 676-771)

The recommendation logic / numbers below are claims too; review them.

```js
        // Initialize Chart.js Data Visualizations
        function initCharts() {
            // Salary Range Chart
            const ctxSalary = document.getElementById('salaryChart').getContext('2d');
            new Chart(ctxSalary, {
                type: 'bar',
                data: {
                    labels: ['Assembly (Security/Kernel)', 'Modern Fortran (HPC/Labs)'],
                    datasets: [
                        {
                            label: 'Min US Base ($)',
                            data: [112000, 105000],
                            backgroundColor: 'rgba(37, 99, 235, 0.6)',
                            borderColor: 'rgba(37, 99, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Max US Base ($)',
                            data: [180000, 245000],
                            backgroundColor: 'rgba(13, 148, 136, 0.6)',
                            borderColor: 'rgba(13, 148, 136, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { size: 11 } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) { return '$' + value / 1000 + 'k'; }
                            }
                        }
                    }
                }
            });

            // Developer Ergonomics Radar Chart
            const ctxErgo = document.getElementById('ergonomicsChart').getContext('2d');
            new Chart(ctxErgo, {
                type: 'radar',
                data: {
                    labels: [
                        'Build Ergonomics',
                        'IDE/LSP Support',
                        'Diagnostic Help',
                        'Code Portability',
                        'Safety & Checking',
                        'Rapid Prototyping'
                    ],
                    datasets: [
                        {
                            label: 'Assembly',
                            data: [20, 40, 15, 10, 10, 30],
                            fill: true,
                            backgroundColor: 'rgba(37, 99, 235, 0.2)',
                            borderColor: 'rgb(37, 99, 235)',
                            pointBackgroundColor: 'rgb(37, 99, 235)'
                        },
                        {
                            label: 'Modern Fortran',
                            data: [85, 80, 75, 90, 85, 80],
                            fill: true,
                            backgroundColor: 'rgba(13, 148, 136, 0.2)',
                            borderColor: 'rgb(13, 148, 136)',
                            pointBackgroundColor: 'rgb(13, 148, 136)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { size: 11 } } }
                    },
                    scales: {
                        r: {
                            angleLines: { color: '#e2e8f0' },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });
        }
```

<details><summary>Raw HTML (lines 390-451)</summary>

```html
        <section id="market" class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            <div>
                <h3 class="text-xl font-bold text-slate-900">Labor Market Realities & Toolchain Ecosystem</h3>
                <p class="text-slate-500 text-sm">Quantitative analysis of compensation, modern tooling friction, and industry roles.</p>
            </div>

            <!-- Charts Container -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Salary Chart -->
                <div class="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="text-sm font-bold text-slate-800 mb-1 text-center">US Annual Salary Range Comparison ($ USD)</h4>
                    <p class="text-xs text-slate-500 text-center mb-4">Based on defense, cybersecurity, and national lab benchmarks</p>
                    <div class="chart-container">
                        <canvas id="salaryChart"></canvas>
                    </div>
                </div>

                <!-- Ergonomics Radar Chart -->
                <div class="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="text-sm font-bold text-slate-800 mb-1 text-center">Developer Experience & Toolchain Friction Score</h4>
                    <p class="text-xs text-slate-500 text-center mb-4">Higher score indicates lower developer friction / better ergonomics</p>
                    <div class="chart-container">
                        <canvas id="ergonomicsChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Toolchain Matrix Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr class="border-b border-slate-200 bg-slate-50 text-slate-700">
                            <th class="p-3 font-semibold">Metric</th>
                            <th class="p-3 font-semibold text-blue-700">Assembly Ecosystem</th>
                            <th class="p-3 font-semibold text-teal-700">Modern Fortran Ecosystem</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        <tr>
                            <td class="p-3 font-medium text-slate-900">Primary Compilers</td>
                            <td class="p-3 text-slate-600 font-mono text-xs">GNU Assembler (as), NASM, Yasm, LLVM-MC</td>
                            <td class="p-3 text-slate-600 font-mono text-xs">GFortran, Intel Fortran (ifx), LLVM Flang, LFortran</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-medium text-slate-900">Build System</td>
                            <td class="p-3 text-slate-600">Raw Makefiles, CMake linker integration</td>
                            <td class="p-3 text-slate-600"><span class="bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-mono text-xs">fpm</span> (Fortran Package Manager), CMake, Meson</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-medium text-slate-900">IDE & Tooling</td>
                            <td class="p-3 text-slate-600">Ghidra, Compiler Explorer, GDB/LLDB debuggers</td>
                            <td class="p-3 text-slate-600">VS Code + <span class="font-mono text-xs">fortls</span> LSP, Jupyter Notebooks (LFortran)</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-medium text-slate-900">Target Industry Roles</td>
                            <td class="p-3 text-slate-600">Reverse Engineer, Malware Analyst, Firmware Engineer</td>
                            <td class="p-3 text-slate-600">HPC Application Specialist, Climate Scientist, Computational Physicist</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
```
</details>

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D03-C3 | critical | DOC | open | L684–696 vs report L144 | **The salary chart contradicts its source.** The Assembly maximum is plotted as **$180k**, while report 01 says senior defense positions exceed **$200k** (image5). The Fortran maximum ($245k) is kept. The chart therefore *visually* favours Fortran more than the source does. The minimums (112k, 105k) come from the broken, truncated ranges in report 01 (review 01, C1). |
| D03-C4 | critical | DOC | open | L730–756 | The **"Developer Experience & Toolchain Friction Score"** radar chart uses invented numbers (Assembly 20/40/15/10/10/30 vs Fortran 85/80/75/90/85/80). There is no method and no source, yet the section is titled "**Quantitative analysis**". |
| D03-m5 | minor | — | open | salary chart | "Min/Max US base" for a *language* makes no sense; salary belongs to the *role* (review 01, M9). |

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
