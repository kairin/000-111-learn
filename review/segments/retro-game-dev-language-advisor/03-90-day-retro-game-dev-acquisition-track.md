---
source: ../retro_game_dev_language_advisor.html
document: "Retro Game Dev Advisor: Assembly vs. Fortran (1980s-1990s Constraints)"
kind: html-section
section_id: roadmap
lines: 263-318, 542-614
findings: [D04-C2, D04-C3]
---

# 90-Day Retro Game Dev Acquisition Track

####   90-Day Retro Game Dev Acquisition Track

Compare milestones across a 12-week development trajectory targeting vintage hardware.

Weeks 1–4

Weeks 5–8

Weeks 9–12

Assembly Track (x86 DOS / Mode 13h) Bare-Metal Rasterization

Fortran Track (OpenWatcom FORTRAN 77) Mathematical Engine

##### 90-Day Deliverable Comparison

Assembly: A smooth 60/70 FPS 2D action game, tile scroller, or pseudo-3D raycaster (*Wolfenstein* style) running directly on real mode DOS.

Fortran: A deep, complex simulation game (e.g., orbital space flight dynamics, procedural galaxy generator, or tactical wargame engine).

## Linked script: Roadmap phase data (lines 542-614)

The recommendation logic / numbers below are claims too; review them.

```js
        // Roadmap Data & Switch Logic
        const roadmapData = {
            1: {
                assembly: [
                    "Registers (AX, BX, CX, DX, SI, DI) & Real Mode segment math",
                    "Setting BIOS Video Mode 13h via INT 10h (320x200 256-color)",
                    "Direct pixel plotting at physical memory address 0xA000:0000",
                    "Fixed-point integer arithmetic (16.16) & shift operations"
                ],
                fortran: [
                    "FORTRAN 77 / Modern Fortran free-form syntax & strict typing",
                    "DO loop structures & multi-dimensional array mapping",
                    "ASCII / ANSI terminal graphics rendering loops",
                    "Game state data structures & deterministic random seeds"
                ]
            },
            2: {
                assembly: [
                    "Fast RAM double-buffering & string blitting (REP MOVSW)",
                    "Hooking hardware interrupt INT 09h for lag-free keyboard bitmasks",
                    "Polling status port 0x3DA for CRT vertical retrace (V-Sync)",
                    "Sprite clipping, transparency masking, & dirty rectangle updates"
                ],
                fortran: [
                    "Cellular automata terrain & procedural map generation algorithms",
                    "Matrix operations for orbital mechanics / physical trajectories",
                    "Integration of linear algebra logic for tactical combat systems",
                    "File Save/Load binary serialization"
                ]
            },
            3: {
                assembly: [
                    "Fixed-point trigonometry LUTs for 2D tile scrolling or pseudo-3D raycasting",
                    "Programmable Interval Timer (PIT 8253) music/sound interrupt hooks",
                    "Profiling assembly loops in DOSBox-X debuggers",
                    "Shipping a complete, smooth 60 FPS standalone DOS executable (.COM/.EXE)"
                ],
                fortran: [
                    "Procedural galaxy generation & trading economy web engine",
                    "Coupling simulation core with low-level drawing harness / C subroutines",
                    "Optimizing loop unrolling & array non-aliasing execution",
                    "Deploying a complete procedural strategy / flight sim game"
                ]
            }
        };

        function switchPhase(phase) {
            [1, 2, 3].forEach(p => {
                const btn = document.getElementById(`btn-phase-${p}`);
                if (p === phase) {
                    btn.className = "px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-slate-800 text-amber-400 shadow-sm border border-slate-700";
                } else {
                    btn.className = "px-3 py-1.5 text-xs font-mono font-medium rounded-md text-slate-400 hover:text-slate-200";
                }
            });

            const asmContainer = document.getElementById('assembly-roadmap-content');
            asmContainer.innerHTML = roadmapData[phase].assembly.map(item => `
                <div class="flex items-start text-slate-300 space-x-2">
                    <span class="text-indigo-400 font-bold">&gt;</span>
                    <span>${item}</span>
                </div>
            `).join('');

            const ftContainer = document.getElementById('fortran-roadmap-content');
            ftContainer.innerHTML = roadmapData[phase].fortran.map(item => `
                <div class="flex items-start text-slate-300 space-x-2">
                    <span class="text-cyan-400 font-bold">&gt;</span>
                    <span>${item}</span>
                </div>
            `).join('');
        }
```

<details><summary>Raw HTML (lines 263-318)</summary>

```html
        <section id="roadmap" class="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-bold font-mono text-white flex items-center gap-2">
                        <span class="w-3 h-3 bg-cyan-500 inline-block rounded-sm"></span>
                        90-Day Retro Game Dev Acquisition Track
                    </h3>
                    <p class="text-slate-400 text-sm mt-1">Compare milestones across a 12-week development trajectory targeting vintage hardware.</p>
                </div>
                <div class="inline-flex p-1 bg-slate-950 rounded-lg border border-slate-800">
                    <button id="btn-phase-1" onclick="switchPhase(1)" class="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-slate-800 text-amber-400 shadow-sm border border-slate-700">Weeks 1–4</button>
                    <button id="btn-phase-2" onclick="switchPhase(2)" class="px-3 py-1.5 text-xs font-mono font-medium rounded-md text-slate-400 hover:text-slate-200">Weeks 5–8</button>
                    <button id="btn-phase-3" onclick="switchPhase(3)" class="px-3 py-1.5 text-xs font-mono font-medium rounded-md text-slate-400 hover:text-slate-200">Weeks 9–12</button>
                </div>
            </div>

            <!-- Content Grid for Phases -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Assembly Track Card -->
                <div class="border border-indigo-500/30 bg-slate-800/40 rounded-xl p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-indigo-400 font-mono text-sm">Assembly Track (x86 DOS / Mode 13h)</span>
                        <span class="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full">Bare-Metal Rasterization</span>
                    </div>
                    <div id="assembly-roadmap-content" class="space-y-2.5 font-mono text-xs">
                        <!-- Dynamic Content Inserted by JS -->
                    </div>
                </div>

                <!-- Fortran Track Card -->
                <div class="border border-cyan-500/30 bg-slate-800/40 rounded-xl p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-cyan-400 font-mono text-sm">Fortran Track (OpenWatcom FORTRAN 77)</span>
                        <span class="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-full">Mathematical Engine</span>
                    </div>
                    <div id="fortran-roadmap-content" class="space-y-2.5 font-mono text-xs">
                        <!-- Dynamic Content Inserted by JS -->
                    </div>
                </div>
            </div>

            <!-- Attainable Milestone Summary -->
            <div class="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">90-Day Deliverable Comparison</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="flex items-start space-x-2">
                        <span class="text-indigo-400 font-mono font-bold">Assembly:</span>
                        <span class="text-slate-300">A smooth 60/70 FPS 2D action game, tile scroller, or pseudo-3D raycaster (*Wolfenstein* style) running directly on real mode DOS.</span>
                    </div>
                    <div class="flex items-start space-x-2">
                        <span class="text-cyan-400 font-mono font-bold">Fortran:</span>
                        <span class="text-slate-300">A deep, complex simulation game (e.g., orbital space flight dynamics, procedural galaxy generator, or tactical wargame engine).</span>
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
| D04-C2 | critical | KNOW | open | L552 vs track title | The Fortran track is headed **"OpenWatcom FORTRAN 77"**, but week 1 teaches "**FORTRAN 77 / Modern Fortran free-form syntax**". FORTRAN 77 is **fixed-form**; free-form arrived in Fortran 90. Week 3's "array non-aliasing execution" and loop-unrolling optimisation don't matter on SIMD-less DOS targets. |
| D04-C3 | critical | KNOW | open | L353, L577, summary card | "Locked **60/70 FPS**", "guaranteeing locked 60 or 70 FPS without tearing", "smooth **60 FPS** DOS executable". VGA Mode 13h refreshes at 70 Hz, so V-Sync locking gives 70 or 35 fps, and 60 fps on a 70 Hz display judders. Mode 13h has no page flipping, so "guaranteed" tear-free is wrong (review 02, C4). |

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
