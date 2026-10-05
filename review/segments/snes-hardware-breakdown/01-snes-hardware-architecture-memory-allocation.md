---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-topology
lines: 140-227, 711-711, 817-847, 991-1042
findings: []
---

# SNES Hardware Architecture & Memory Allocation

###  🏛️ SNES Hardware Architecture & Memory Allocation

The Super Nintendo operates as a multi-domain architecture with isolated processing cores, non-uniform memory maps, and dedicated coprocessors. Developing *Zero Star* required splitting memory workloads precisely between Work RAM Banks, Video RAM, and Audio RAM without software abstractions.

####  Hardware Domain Diagram Click any block to inspect technical specs

MAIN CPU DOMAIN

Ricoh 5A22 Core

65c816 @ 3.58 MHz

Allocated Memory:

WRAM Bank $7E (64 kB)

WRAM Bank $7F (63 kB)

DISPLAY DOMAIN

Dual PPUs (PPU1 / PPU2)

Background Mode 1

Dedicated Graphics:

64 kB Video RAM (VRAM)

544 B Sprite Metadata (OAM)

512 B Palette Memory (CGRAM)

AUDIO SUBSYSTEM

Sony SPC700 Core

8-Bit CPU @ 1.024 MHz

Isolated Audio:

64 kB Audio RAM (ARAM)

16-Bit 8-Voice DSP

4x I/O Registers ($2140-$2143)

👉 SELECT A DOMAIN ABOVE TO INSPECT TECHNICAL SPECS

Click on the Main CPU Domain, Display Domain, or Audio Subsystem block to analyze memory layout, bus boundaries, and core hardware register allocations.

#### Console Memory Budget

Total addressable hardware RAM distribution (256 kB Total)

[chart: memoryChart — data in the Linked script section below]

Bank $7F explicitly holds the uncompressed 63 kB dungeon playfield.

## Linked script: `memoryChartInstance` (lines 711-711)

The recommendation logic / numbers below are claims too; review them.

```js
        let memoryChartInstance = null;
```

## Linked script: `inspectHardware` (lines 817-847)

The recommendation logic / numbers below are claims too; review them.

```js
        function inspectHardware(domain) {
            const title = document.getElementById('inspectorTitle');
            const body = document.getElementById('inspectorBody');

            if (domain === 'cpu') {
                title.innerText = "🖥️ MAIN CPU DOMAIN: Ricoh 5A22 Core (65c816 @ 3.58 MHz)";
                body.innerHTML = `
                    <p class="mb-2"><strong>Core Specs:</strong> 16-bit processor with 8-bit registers, 24-bit linear addressing space, zero hardware division/multiplication coprocessor.</p>
                    <p class="mb-2"><strong>WRAM Bank $7E:</strong> System call stack, gamepad input buffers, active entity descriptors, and zero-page pointers.</p>
                    <p><strong>WRAM Bank $7F:</strong> Dedicated 63 kB uncompressed map buffer representing a 192×168 tile playfield across 9,999 dungeon levels.</p>
                `;
            } else if (domain === 'ppu') {
                title.innerText = "🖼️ DISPLAY PPU DOMAIN: Dual PPUs (Background Mode 1)";
                body.innerHTML = `
                    <p class="mb-2"><strong>Layer Allocation:</strong> Layer 1 = 4bpp dynamic playfield; Layer 2 = 4bpp static HUD overlay; Layer 3 = 2bpp parallax mountain background.</p>
                    <p class="mb-2"><strong>OAM Limits:</strong> 128 total hardware sprites; max 32 sprite tiles per single horizontal scanline before line-buffer dropping.</p>
                    <p><strong>Color Math Engine:</strong> Direct hardware sub-screen color subtraction ($2131/$2132) yields real-time hit-stop black flashes without rewriting CGRAM.</p>
                `;
            } else if (domain === 'apu') {
                title.innerText = "🔊 AUDIO SUBSYSTEM: Sony SPC700 Core & 8-Voice DSP";
                body.innerHTML = `
                    <p class="mb-2"><strong>System Isolation:</strong> Completely autonomous 8-bit CPU running at 1.024 MHz with 64 kB Audio RAM (ARAM). Cannot access main CPU bus.</p>
                    <p class="mb-2"><strong>Communication:</strong> High-speed 4-port bidirectional I/O registers ($2140-$2143).</p>
                    <p><strong>Voice Allocation:</strong> 5 voices dedicated to polyphonic music score; 3 preemptive voices reserved for gameplay sound effects.</p>
                `;
            }
        }

        /* ====================================================================
           5. INTERACTIVE SIMULATOR COMPUTATIONS
           ==================================================================== */
```

## Linked script: `renderMemoryChart` (lines 991-1042)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderMemoryChart() {
            const ctx = document.getElementById('memoryChart');
            if (!ctx) return;

            if (memoryChartInstance) memoryChartInstance.destroy();

            memoryChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'WRAM Bank $7E (System/Stack)',
                        'WRAM Bank $7F (Procedural Map)',
                        'Video RAM (VRAM)',
                        'Audio RAM (ARAM)',
                        'Sprite/Palette (OAM/CGRAM)'
                    ],
                    datasets: [{
                        data: [64, 63, 64, 64, 1],
                        backgroundColor: [
                            '#0d9488', // Teal
                            '#f59e0b', // Amber
                            '#e11d48', // Rose
                            '#6366f1', // Indigo
                            '#64748b'  // Slate
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { size: 10, family: 'monospace' },
                                boxWidth: 12
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ` ${context.label}: ${context.raw} kB`;
                                }
                            }
                        }
                    }
                }
            });
        }
```

<details><summary>Raw HTML (lines 140-227)</summary>

```html
        <section id="tab-topology" class="space-y-6">
            <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🏛️</span> SNES Hardware Architecture & Memory Allocation
                </h2>
                <p class="text-sm text-slate-600 mt-1">
                    The Super Nintendo operates as a multi-domain architecture with isolated processing cores, non-uniform memory maps, and dedicated coprocessors. Developing *Zero Star* required splitting memory workloads precisely between Work RAM Banks, Video RAM, and Audio RAM without software abstractions.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Interactive Subsystem Inspector -->
                <div class="lg:col-span-2 bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                    <h3 class="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                        <span>Hardware Domain Diagram</span>
                        <span class="text-xs text-slate-500 font-normal">Click any block to inspect technical specs</span>
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                        <!-- MAIN CPU DOMAIN -->
                        <div class="border-2 border-teal-600/60 bg-teal-50/50 rounded-lg p-3 flex flex-col justify-between hover:border-teal-600 cursor-pointer transition-all" onclick="inspectHardware('cpu')">
                            <div>
                                <div class="font-bold text-teal-900 text-sm mb-1">MAIN CPU DOMAIN</div>
                                <div class="text-teal-800">Ricoh 5A22 Core</div>
                                <div class="text-slate-600 text-[11px] mt-1">65c816 @ 3.58 MHz</div>
                            </div>
                            <div class="mt-3 bg-white p-2 rounded border border-teal-200 space-y-1">
                                <div class="text-slate-700 font-semibold">Allocated Memory:</div>
                                <div class="text-teal-700 font-bold">WRAM Bank $7E (64 kB)</div>
                                <div class="text-amber-700 font-bold">WRAM Bank $7F (63 kB)</div>
                            </div>
                        </div>

                        <!-- DISPLAY PPU DOMAIN -->
                        <div class="border-2 border-amber-600/60 bg-amber-50/50 rounded-lg p-3 flex flex-col justify-between hover:border-amber-600 cursor-pointer transition-all" onclick="inspectHardware('ppu')">
                            <div>
                                <div class="font-bold text-amber-900 text-sm mb-1">DISPLAY DOMAIN</div>
                                <div class="text-amber-800">Dual PPUs (PPU1 / PPU2)</div>
                                <div class="text-slate-600 text-[11px] mt-1">Background Mode 1</div>
                            </div>
                            <div class="mt-3 bg-white p-2 rounded border border-amber-200 space-y-1">
                                <div class="text-slate-700 font-semibold">Dedicated Graphics:</div>
                                <div class="text-amber-800">64 kB Video RAM (VRAM)</div>
                                <div class="text-amber-800">544 B Sprite Metadata (OAM)</div>
                                <div class="text-amber-800">512 B Palette Memory (CGRAM)</div>
                            </div>
                        </div>

                        <!-- AUDIO APU DOMAIN -->
                        <div class="border-2 border-indigo-600/60 bg-indigo-50/50 rounded-lg p-3 flex flex-col justify-between hover:border-indigo-600 cursor-pointer transition-all" onclick="inspectHardware('apu')">
                            <div>
                                <div class="font-bold text-indigo-900 text-sm mb-1">AUDIO SUBSYSTEM</div>
                                <div class="text-indigo-800">Sony SPC700 Core</div>
                                <div class="text-slate-600 text-[11px] mt-1">8-Bit CPU @ 1.024 MHz</div>
                            </div>
                            <div class="mt-3 bg-white p-2 rounded border border-indigo-200 space-y-1">
                                <div class="text-slate-700 font-semibold">Isolated Audio:</div>
                                <div class="text-indigo-800">64 kB Audio RAM (ARAM)</div>
                                <div class="text-indigo-800">16-Bit 8-Voice DSP</div>
                                <div class="text-indigo-800">4x I/O Registers ($2140-$2143)</div>
                            </div>
                        </div>
                    </div>

                    <!-- HARDWARE INSPECTOR DETAILS DISPLAY PANEL -->
                    <div id="inspectorPanel" class="mt-4 p-4 bg-slate-900 text-slate-100 rounded-lg border border-slate-700 font-mono text-xs leading-relaxed">
                        <div class="text-amber-400 font-bold mb-1" id="inspectorTitle">👉 SELECT A DOMAIN ABOVE TO INSPECT TECHNICAL SPECS</div>
                        <div class="text-slate-300" id="inspectorBody">
                            Click on the Main CPU Domain, Display Domain, or Audio Subsystem block to analyze memory layout, bus boundaries, and core hardware register allocations.
                        </div>
                    </div>
                </div>

                <!-- Chart container for RAM Distribution -->
                <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 class="text-base font-bold text-slate-900 mb-1">Console Memory Budget</h3>
                        <p class="text-xs text-slate-500 mb-3">Total addressable hardware RAM distribution (256 kB Total)</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="memoryChart"></canvas>
                    </div>
                    <div class="text-[11px] text-slate-500 text-center mt-2 font-mono">
                        Bank $7F explicitly holds the uncompressed 63 kB dungeon playfield.
                    </div>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings for this part

_Pass 1 found nothing in this part. This does not mean that the part is correct. Nobody challenged it yet._

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
