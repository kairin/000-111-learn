---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-topology
lines: 140-227, 711-711, 817-847, 991-1042
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D15-C2, D15-C4, D15-C5, D15-M1, D15-M3, D15-M4, D15-M6, D15-M11, D15-M12, D15-m1, D15-m2, D15-m3, D15-m8]
---

# SNES Hardware Architecture & Memory Allocation

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 09:01](https://www.youtube.com/watch?v=j_2bo7ng65E&t=541s). The video gives the three memories here: 128K for the CPU, 64K for the PPU and 64K for the APU. It gives no 256 kB total, no 129 KB ROM and no 63 kB bank.

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

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D15-C2 | critical | VIDEO DOC | open | L428-433, L664-665, L707, L840, L973-986, L1106 | _Claim:_ "SPC700 Dynamic Sound Stealing": when a sound effect fires, the driver "steals music channels cleanly". The simulator marks voice 4, 3 or 2 as "SFX STEAL".. _Problem:_ The video says the opposite. The first five voices play music and the last three play sound effects [18:18]. The three wait for the CPU to name a voice and an effect [18:38]. Object sounds use "the second to last sound effect channel" so that they do not disturb the player sounds or the music [39:35]. The code steals voices 4, 3 and 2 (measured: voice 4 after a sword press). All of these are music voices. The simulator teaches a design that the developer avoided on purpose. |
| D15-C4 | critical | VIDEO KNOW VERIFY | verify | L681, L824, L386, L618, L1052-1063 | _Claim:_ "No hardware division or multiplication unit". Software division costs "~320 cycles" for the HUD and 480 cycles for collision. The optimized versions cost 14 and 12 cycles.. _Problem:_ The 5A22 has a hardware multiplier at $4202/$4203 (8 x 8, result at $4216/$4217, 8 cycles) and a divider at $4204 to $4206 (16 / 8, quotient at $4214/$4215). The reviewer fetched the nesdev "Multiplication" page for the multiplier. A binary to decimal conversion is a few hardware divisions, not 320 cycles. The video says only that BCD "makes the math so much easier" [31:44] and that INC and DEC ignore the decimal flag [32:05]. None of the four chart values is in the video or in report 14. The chart is a picture of an invention. |
| D15-C5 | critical | VIDEO | open | L636-638, L693-695, L832 | _Claim:_ The limit is "32 sprite tiles" per scanline. The fixes are "viewport culling, dummy tile zero relocation, and alternating priority frame cycling" and "dynamic entity sorting".. _Problem:_ The video gives two limits: 32 sprites per line [28:34] and 34 8-pixel slivers per line [29:38]. The nesdev "Sprites" page confirms both. Tile zero was the problem, not the fix: the PPU "still counts those transparent sprites" [28:34], so he moves them to an offscreen Y [28:55]. The video names the registers that rotate sprites, then says "leave it as is" [30:21]. The page gives the rejected option as the fix. The objects are "not organized by X or Y" [30:42], so there is no entity sorting. |
| D15-M1 | major | VIDEO VERIFY | verify | L84, L104, L609, L689, L826 | _Claim:_ A "2-year project" with "9,999" floors.. _Problem:_ The goal is "level 10,000" or 10,000 chickens [03:50]. A 16-bit packed BCD counter "fits exactly the 10,000" he needs [32:05]. The number 9,999 is the largest value of the counter, not the number of floors. The video gives no development time. The recap jokes about "two weeks" [00:00]. The "two-year" claim comes from report 14, L5, which cites the video for it. |
| D15-M11 | major | DOC | open | L114-130, L220, L293-298, L342, L418, L460, L966-967 | _Claim:_ Accessibility.. _Problem:_ The five tab buttons have no `role="tab"` and no `aria-selected`. The three canvases have no text alternative and no data table. The two labels have no `for`, so a screen reader does not link them to the inputs (measured). The range slider has no `aria-label`. The voice grid text is 9 and 10 pixels. Stolen voices show only by color and a pulse. Emoji are the only icons. |
| D15-M12 | major | VIDEO DOC | open | L169, L217, L223, L610-611, L687-689, L825, L1008 | _Claim:_ Bank $7F is "63 kB" and holds the map "explicitly". Bank $7E is "isolated for stack and system state". The chart totals "256 kB". The split "prevents heap fragmentation".. _Problem:_ Each WRAM bank is 64 kB. The map is 63 kB of bank $7F, and he names the last 1 kB too [21:18]. The chart puts 63 for the bank and 1 for OAM plus CGRAM, so 64 + 63 + 64 + 64 + 1 = 256 only by this error. The video keeps the objects in the first bank through the 8 kB mirror, to avoid changing the data bank register [21:38 to 21:59]. The banks are not "isolated". There is no heap in this game, so nothing fragments. |
| D15-M3 | major | DOC VIDEO | open | L100, L146, L560-562, L601 | _Claim:_ "CO-PROCESSORS: NONE (0)".. _Problem:_ The page contradicts itself. L146 says the console has "dedicated coprocessors". L560 calls the HDMA unit, the PPU color math and the SPC700 "coprocessor offloading". The video says he did not use Mode 7 or the "extra in cartridge processing chips" [50:53]. So "no cartridge enhancement chip" is right, "zero coprocessors" is wrong. |
| D15-M4 | major | KNOW VIDEO | open | L824 | _Claim:_ The 65c816 is a "16-bit processor with 8-bit registers".. _Problem:_ The accumulator and the index registers switch between 8 and 16 bits with the M and X flags. The video uses the 16-bit mode for the BCD counter [32:05]. The data bus is 8 bits wide. The sentence is reversed. |
| D15-M6 | major | VIDEO VERIFY | verify | L539, L655-656, L833 | _Claim:_ "Sub-screen color subtraction ($2131/$2132)" gives "single-frame hit-stop black flashes" and "elemental spell bursts", and a "Color Math Hardware Inversion".. _Problem:_ $2131 is CGADSUB (add or subtract, half, layer enable) and $2132 is COLDATA (the fixed color). The reviewer fetched the nesdev "PPU registers" page. The video uses add and halve, not subtract: BG3 has black tiles, BG1 leaves the subscreen, and the result is half brightness [37:34]. The hit stop pauses "for a few frames" and darkens the background [40:37], not a single black frame. The talisman clouds use four palette colors [42:39], not color math. Nothing inverts. |
| D15-m1 | minor | VIDEO | open | L199, L706, L839 | _Claim:_ "4x I/O Registers ($2140-$2143)", a "4-port bidirectional" handshake.. _Problem:_ There are four addresses but "eight separate registers", so a write by one side does not erase the other [12:28 to 12:48]. The page loses the point that the video makes. |
| D15-m2 | minor | DOC | open | L146, L287, L313, L525, L569, L584 | _Claim:_ `*Zero Star*`, `` `$7F` `` and `$O(n^2)$`.. _Problem:_ The page is HTML. The reader sees raw asterisks, backticks and dollar signs (measured in six elements). |
| D15-m3 | minor | VIDEO | open | L831 | _Claim:_ "Layer 3 = 2bpp parallax mountain background" in the game.. _Problem:_ In the game, BG3 is black tiles for the darkening effect [37:13]. The mountains on BG3 are on the title screen only [34:28]. |
| D15-m8 | minor | KNOW | open | L96, L164, L599-600 | _Claim:_ The CPU runs at 3.58 MHz.. _Problem:_ That is the fast clock. Access to WRAM and to slow ROM runs at 2.68 MHz. A "strict 3.58 MHz cycle budget" (L600) overstates the budget. The video does not give a clock for the main CPU. |

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
