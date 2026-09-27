---
source: ../assembly_vs_fortran_learning_advisor.html
document: "Assembly vs. Modern Fortran: Strategic Learning Advisor"
kind: html-section
section_id: roadmap
lines: 271-323, 594-669
findings: [D03-M1, D03-M2]
---

# 12-Week Acquisition Roadmap & Milestones

#### 12-Week Acquisition Roadmap & Milestones

Compare developmental phases across a 90-day learning trajectory.

Weeks 1–4

Weeks 5–8

Weeks 9–12

Assembly Language Track Low-Level Floor

Modern Fortran Track High Math Level

##### End-of-Quarter Attainable Milestone Comparison

Assembly: Reading and auditing decompiled binaries, mapping disassembled blocks to high-level code, and identifying micro-optimization bottlenecks.

Modern Fortran: Architecting and running an end-to-end, parallelized partial differential equation solver or matrix simulation engine from scratch.

## Linked script: Roadmap phase data (lines 594-669)

The recommendation logic / numbers below are claims too; review them.

```js
        // Roadmap Data & Switch Logic
        const roadmapData = {
            1: {
                assembly: [
                    "Binary representations and hexadecimal conversions",
                    "CPU register sets (GPRs) and flag registers",
                    "Basic integer arithmetic and bitwise logic operations",
                    "Stack pointer manipulation & System V ABI calling conventions"
                ],
                fortran: [
                    "Free-form syntax and strict strong typing",
                    "Dynamic array allocation & stride operations",
                    "Intrinsic mathematical functions and modular code organization",
                    "Structured file I/O operations"
                ]
            },
            2: {
                assembly: [
                    "Memory addressing modes (base + index * scale + displacement)",
                    "Control-flow recovery (conditional jumps, branch target analysis)",
                    "Stack frame preservation and local storage offsets",
                    "Linking compiled C routines directly with assembly subroutines"
                ],
                fortran: [
                    "User-defined derived types with type-bound procedures",
                    "Procedure interfaces and pure functions",
                    "OpenMP multi-threading pragmas",
                    "Integration of optimized BLAS and LAPACK linear algebra libraries"
                ]
            },
            3: {
                assembly: [
                    "Disassembly inspection in Ghidra and Compiler Explorer",
                    "Binary patching and control-flow hijacking concepts",
                    "Tracking SIMD vector registers (AVX-512 / ARM NEON)",
                    "Profiling branch mispredictions and microarchitectural pipeline stalls"
                ],
                fortran: [
                    "Native distributed memory scaling via coarrays",
                    "Multi-core loop parallelization using `do concurrent`",
                    "Build orchestration and dependency tracking using `fpm`",
                    "Deploying parallel PDE solvers on HPC clusters"
                ]
            }
        };

        function switchPhase(phase) {
            // Update button styles
            [1, 2, 3].forEach(p => {
                const btn = document.getElementById(`btn-phase-${p}`);
                if (p === phase) {
                    btn.className = "px-3 py-1.5 text-xs font-medium rounded-md bg-white text-slate-900 shadow-sm";
                } else {
                    btn.className = "px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900";
                }
            });

            // Update assembly roadmap list
            const asmContainer = document.getElementById('assembly-roadmap-content');
            asmContainer.innerHTML = roadmapData[phase].assembly.map(item => `
                <div class="flex items-start text-xs text-slate-700 space-x-2">
                    <span class="text-blue-500 font-bold">•</span>
                    <span>${item}</span>
                </div>
            `).join('');

            // Update fortran roadmap list
            const ftContainer = document.getElementById('fortran-roadmap-content');
            ftContainer.innerHTML = roadmapData[phase].fortran.map(item => `
                <div class="flex items-start text-xs text-slate-700 space-x-2">
                    <span class="text-teal-500 font-bold">•</span>
                    <span>${item}</span>
                </div>
            `).join('');
        }
```

<details><summary>Raw HTML (lines 271-323)</summary>

```html
        <section id="roadmap" class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-900">12-Week Acquisition Roadmap & Milestones</h3>
                    <p class="text-slate-500 text-sm">Compare developmental phases across a 90-day learning trajectory.</p>
                </div>
                <div class="mt-4 md:mt-0 inline-flex p-1 bg-slate-100 rounded-lg">
                    <button id="btn-phase-1" onclick="switchPhase(1)" class="px-3 py-1.5 text-xs font-medium rounded-md bg-white text-slate-900 shadow-sm">Weeks 1–4</button>
                    <button id="btn-phase-2" onclick="switchPhase(2)" class="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900">Weeks 5–8</button>
                    <button id="btn-phase-3" onclick="switchPhase(3)" class="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900">Weeks 9–12</button>
                </div>
            </div>

            <!-- Content Grid for Phases -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Assembly Track Card -->
                <div class="border border-blue-200 bg-blue-50/30 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="font-bold text-blue-900 font-mono text-sm">Assembly Language Track</span>
                        <span class="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-full">Low-Level Floor</span>
                    </div>
                    <div id="assembly-roadmap-content" class="space-y-3">
                        <!-- Dynamic Content Inserted by JS -->
                    </div>
                </div>

                <!-- Fortran Track Card -->
                <div class="border border-teal-200 bg-teal-50/30 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="font-bold text-teal-900 font-mono text-sm">Modern Fortran Track</span>
                        <span class="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-1 rounded-full">High Math Level</span>
                    </div>
                    <div id="fortran-roadmap-content" class="space-y-3">
                        <!-- Dynamic Content Inserted by JS -->
                    </div>
                </div>
            </div>

            <!-- Attainable Milestone Comparison -->
            <div class="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">End-of-Quarter Attainable Milestone Comparison</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="flex items-start space-x-2">
                        <span class="text-blue-600 font-bold">Assembly:</span>
                        <span class="text-slate-700">Reading and auditing decompiled binaries, mapping disassembled blocks to high-level code, and identifying micro-optimization bottlenecks.</span>
                    </div>
                    <div class="flex items-start space-x-2">
                        <span class="text-teal-600 font-bold">Modern Fortran:</span>
                        <span class="text-slate-700">Architecting and running an end-to-end, parallelized partial differential equation solver or matrix simulation engine from scratch.</span>
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
| D03-M1 | major | DOC | open | L635 | The roadmap for weeks 9 to 12 adds "**Deploying parallel PDE solvers on HPC clusters**". This item is not in the source report. It goes past the milestone of the report, which is already optimistic. The page does not cover cluster access, schedulers, or MPI. |
| D03-M2 | major | DOC | open | L627 | The roadmap adds "control-flow hijacking concepts" (exploit development), which is not in the source. This is a change of scope, because exploitation is a separate discipline. |

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
