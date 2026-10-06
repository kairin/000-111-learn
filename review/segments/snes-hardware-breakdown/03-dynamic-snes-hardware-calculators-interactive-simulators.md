---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-simulators
lines: 264-466, 712-712, 713-717, 848-865, 866-908, 909-911, 912-916, 917-921, 922-938, 939-950, 951-972, 973-990, 1043-1088, 1089-1139
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D15-C1, D15-C2, D15-C3, D15-C4, D15-M7, D15-M8, D15-M11, D15-m2, D15-m4, D15-m5, D15-m7]
---

# Dynamic SNES Hardware Calculators & Interactive Simulators

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 05:50](https://www.youtube.com/watch?v=j_2bo7ng65E&t=350s). The tile lookup for collision starts here. The BCD counter is at 31:44, the HDMA parallax at 35:11 and the voice split at 18:18. The video gives no formula, no cycle counts and no voice stealing.

###  ⚡ Dynamic SNES Hardware Calculators & Interactive Simulators

Interact directly with the math and register manipulations used in *Zero Star* to bypass hardware limits. Test spatial hashing, CRT scanline HDMA parallax, packed BCD math, and sound channel stealing in real time.

####  01. Constant-Time O(1) Spatial Hash Grid
Bank $7F Map

Traditional pairwise collision ($O(n^2)$) exhausts the 3.58 MHz CPU. *Zero Star* treats the 63 kB uncompressed tilemap in Bank `$7F` as a direct spatial hash grid, using fast bit shifts to resolve terrain collisions in $O(1)$ constant time.

X Tile Coordinate (0-191):

Y Tile Coordinate (0-167):

FORMULA: Base ($7F:0000) + (Y × 192) + X

Bitwise Shift: (32 << 7) + (32 << 6) + 48

Absolute RAM Address: $7F:1830

Execution Cost: 12 Clock Cycles ($O(1)$)

💡 Why 192 tiles width? $192 = 128 + 64 = (2^7 + 2^6)$. Multiplying by 192 reduces to two fast bitwise arithmetic shifts (`ASL`), eliminating runtime multiplication instructions entirely!

####  02. HDMA Scanline Parallax Modulation
Register $2111 (BG3HOFS)

Standard V-Blank DMA shifts entire layers uniformly. Horizontal Blank DMA (HDMA) executes micro-transfers during the 15µs scanline gaps, updating scroll offsets line-by-line with zero CPU overhead.

CRT Beam Scanline Position: Scanline 110 / 224

Scanline 1 (Sky) 120 (Peaks) 160 (Playfield) 224 (HUD)

Active Display Layer: BG3: Mountain Peaks (2bpp)

HDMA Register Injection: $2111 Write Value = 12 px

Visual Parallax Offset: dx × 0.25 (Slow Scroll)

[ ▲▲▲▲ MOUNTAIN PEAKS PARALLAX SHIFT: 12px ▲▲▲▲ ]

####  03. Packed BCD Hardware Decimal HUD
SED Flag Arithmetic

Converting raw binary integers to base-10 strings via software division requires ~320 cycles. By storing HUD tallies (chickens killed, level depth) in Packed BCD and setting the 65c816 decimal flag (`SED`), standard `ADC` operations handle multi-digit carries automatically in zero extra cycles.

Chicken Kills Metrics:

0482

+1 Kill

+25 Kills

Reset

Packed BCD Bytes: $04 $82

Hardware Nibble Encoding: 0000 0100 | 1000 0010

[chart: cyclesChart — data in the Linked script section below]

####  04. SPC700 Dynamic Sound Stealing
8 DSP Channels

The SPC700 audio processor runs independently with 64 kB ARAM. Dr. Matt's music engine uses 5 polyphonic voices, leaving 3 channels reserved for dynamic gameplay sound effects. When dynamic SFX fire, the custom driver steals music channels cleanly and restores them post-playback without audio clicks.

Trigger Gameplay Sound Effect:

⚔️ Sword Slash

✨ Talisman Burst

🐔 Chicken Strike

8-VOICE DSP HARMONIC CHANNEL MATRIX

[chart: audioChart — data in the Linked script section below]

## Linked script: `cyclesChartInstance` (lines 712-712)

The recommendation logic / numbers below are claims too; review them.

```js
        let cyclesChartInstance = null;
```

## Linked script: `audioChartInstance` (lines 713-717)

The recommendation logic / numbers below are claims too; review them.

```js
        let audioChartInstance = null;

        /* ====================================================================
           2. TAB SWITCHING LOGIC
           ==================================================================== */
```

## Linked script: `calculateSpatialHash` (lines 848-865)

The recommendation logic / numbers below are claims too; review them.

```js
        // SIM 1: SPATIAL HASHING
        function calculateSpatialHash() {
            let x = parseInt(document.getElementById('hashX').value) || 0;
            let y = parseInt(document.getElementById('hashY').value) || 0;

            // Clamp coordinates to playfield bounds
            x = Math.max(0, Math.min(191, x));
            y = Math.max(0, Math.min(167, y));

            const yShift7 = y << 7;
            const yShift6 = y << 6;
            const offset = yShift7 + yShift6 + x;
            const hexOffset = offset.toString(16).toUpperCase().padStart(4, '0');

            document.getElementById('hashBitwiseResult').innerText = `Bitwise Shift: (${y} << 7) + (${y} << 6) + ${x} = ${yShift7} + ${yShift6} + ${x}`;
            document.getElementById('hashAddressOut').innerText = `$7F:${hexOffset}`;
        }
```

## Linked script: `updateScanlineSim` (lines 866-908)

The recommendation logic / numbers below are claims too; review them.

```js
        // SIM 2: HDMA SCANLINE PARALLAX
        function updateScanlineSim(line) {
            line = parseInt(line);
            document.getElementById('scanlineDisplay').innerText = `Scanline ${line} / 224`;

            let layerText = "";
            let regVal = 0;
            let speedText = "";
            let visualText = "";

            if (line <= 60) {
                layerText = "BG3: Static Sky & Cloud Plane (2bpp)";
                regVal = 0;
                speedText = "dx × 0.00 (Static)";
                visualText = "[ ☁️ STATIC DISTANT SKY PLANE ☁️ ]";
            } else if (line <= 120) {
                layerText = "BG3: Distant Mountain Peaks (2bpp)";
                regVal = Math.floor((line - 60) * 0.25);
                speedText = "dx × 0.25 (Slow Parallax)";
                visualText = `[ ▲▲ MOUNTAIN PEAKS PARALLAX SHIFT: ${regVal}px ▲▲ ]`;
            } else if (line <= 160) {
                layerText = "BG3: Near Mountain Foothills (2bpp)";
                regVal = Math.floor((line - 120) * 0.60) + 15;
                speedText = "dx × 0.60 (Fast Parallax)";
                visualText = `[ ⛰️ FOOTHILLS FAST PARALLAX SHIFT: ${regVal}px ⛰️ ]`;
            } else if (line <= 210) {
                layerText = "BG1: Interactive Terrain Playfield (4bpp)";
                regVal = 0;
                speedText = "Fixed Camera Viewport Scroll";
                visualText = "[ 🛡️ ACTIVE PLAYFIELD TERRAIN & SPRITES 🛡️ ]";
            } else {
                layerText = "BG2: Static HUD Overlay Plane (4bpp)";
                regVal = 0;
                speedText = "dx × 0.00 (Locked HUD)";
                visualText = "[ 🪙 HUD OVERLAY: CHICKENS / COINS / DEPTH 🪙 ]";
            }

            document.getElementById('hdmaLayerText').innerText = layerText;
            document.getElementById('hdmaRegText').innerText = `$2111 Write Value = ${regVal} px`;
            document.getElementById('hdmaSpeedText').innerText = speedText;
            document.getElementById('parallaxVisualBox').innerText = visualText;
        }
```

## Linked script: `bcdKillCounter` (lines 909-911)

The recommendation logic / numbers below are claims too; review them.

```js
        // SIM 3: PACKED BCD HUD ARITHMETIC
        let bcdKillCounter = 482;
```

## Linked script: `addBcdKills` (lines 912-916)

The recommendation logic / numbers below are claims too; review them.

```js
        function addBcdKills(amount) {
            bcdKillCounter = Math.min(9999, bcdKillCounter + amount);
            updateBcdDisplay();
        }
```

## Linked script: `resetBcdKills` (lines 917-921)

The recommendation logic / numbers below are claims too; review them.

```js
        function resetBcdKills() {
            bcdKillCounter = 0;
            updateBcdDisplay();
        }
```

## Linked script: `updateBcdDisplay` (lines 922-938)

The recommendation logic / numbers below are claims too; review them.

```js
        function updateBcdDisplay() {
            const strVal = bcdKillCounter.toString().padStart(4, '0');
            document.getElementById('bcdDisplay').innerText = strVal;

            const highByte = strVal.substring(0, 2);
            const lowByte = strVal.substring(2, 4);

            document.getElementById('bcdHexVal').innerText = `$${highByte} $${lowByte}`;

            const bin1 = parseInt(highByte[0]).toString(2).padStart(4, '0');
            const bin2 = parseInt(highByte[1]).toString(2).padStart(4, '0');
            const bin3 = parseInt(lowByte[0]).toString(2).padStart(4, '0');
            const bin4 = parseInt(lowByte[1]).toString(2).padStart(4, '0');

            document.getElementById('bcdBinaryVal').innerText = `${bin1} ${bin2} | ${bin3} ${bin4}`;
        }
```

## Linked script: `activeVoices` (lines 939-950)

The recommendation logic / numbers below are claims too; review them.

```js
        // SIM 4: AUDIO VOICE ALLOCATION
        let activeVoices = [
            { id: 0, role: 'Music (Bass)', stolen: false },
            { id: 1, role: 'Music (Chords)', stolen: false },
            { id: 2, role: 'Music (Melody)', stolen: false },
            { id: 3, role: 'Music (Harmony)', stolen: false },
            { id: 4, role: 'Music (Percussion)', stolen: false },
            { id: 5, role: 'SFX Ch 1 (Reserved)', stolen: false },
            { id: 6, role: 'SFX Ch 2 (Reserved)', stolen: false },
            { id: 7, role: 'SFX Ch 3 (Reserved)', stolen: false }
        ];
```

## Linked script: `renderVoiceGrid` (lines 951-972)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderVoiceGrid() {
            const grid = document.getElementById('voiceGrid');
            grid.innerHTML = '';

            activeVoices.forEach(v => {
                const item = document.createElement('div');
                let colorClass = "bg-indigo-950 text-indigo-300 border-indigo-800";
                if (v.stolen) {
                    colorClass = "bg-rose-900 text-rose-200 border-rose-600 animate-pulse";
                } else if (v.id >= 5) {
                    colorClass = "bg-teal-950 text-teal-300 border-teal-800";
                }

                item.className = `p-2 rounded border ${colorClass} flex flex-col justify-between font-mono`;
                item.innerHTML = `
                    <div class="font-bold text-[10px]">VOICE 0${v.id}</div>
                    <div class="text-[9px] mt-1">${v.stolen ? '🔥 SFX STEAL' : v.role}</div>
                `;
                grid.appendChild(item);
            });
        }
```

## Linked script: `triggerSfx` (lines 973-990)

The recommendation logic / numbers below are claims too; review them.

```js
        function triggerSfx(type) {
            // Temporarily steal a musical channel for dynamic SFX
            let targetVoice = 4; // Steal percussion melody first
            if (type === 'talisman') targetVoice = 3;
            if (type === 'chicken') targetVoice = 2;

            activeVoices[targetVoice].stolen = true;
            renderVoiceGrid();

            setTimeout(() => {
                activeVoices[targetVoice].stolen = false;
                renderVoiceGrid();
            }, 1200);
        }

        /* ====================================================================
           6. CHART.JS INITIALIZATION
           ==================================================================== */
```

## Linked script: `renderCyclesChart` (lines 1043-1088)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderCyclesChart() {
            const ctx = document.getElementById('cyclesChart');
            if (!ctx) return;

            if (cyclesChartInstance) cyclesChartInstance.destroy();

            cyclesChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['HUD Decimal Update', 'Terrain Collision Check'],
                    datasets: [
                        {
                            label: 'Standard Assembly / Division',
                            data: [320, 480],
                            backgroundColor: '#f43f5e'
                        },
                        {
                            label: 'Zero Star Optimized Assembly',
                            data: [14, 12],
                            backgroundColor: '#10b981'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: '65c816 CPU Clock Cycles', font: { size: 10, family: 'monospace' } },
                            ticks: { font: { size: 10, family: 'monospace' } }
                        },
                        x: {
                            ticks: { font: { size: 10, family: 'monospace' } }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { font: { size: 10, family: 'monospace' }, boxWidth: 12 }
                        }
                    }
                }
            });
        }
```

## Linked script: `renderAudioChart` (lines 1089-1139)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderAudioChart() {
            const ctx = document.getElementById('audioChart');
            if (!ctx) return;

            if (audioChartInstance) audioChartInstance.destroy();

            audioChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['SPC700 Voice Allocation (8 Channels Total)'],
                    datasets: [
                        {
                            label: 'Polyphonic Music (Dr. Matt)',
                            data: [5],
                            backgroundColor: '#6366f1'
                        },
                        {
                            label: 'Dynamic SFX (Preemptive)',
                            data: [3],
                            backgroundColor: '#14b8a6'
                        }
                    ]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true,
                            max: 8,
                            ticks: { stepSize: 1, font: { size: 10, family: 'monospace' } }
                        },
                        y: {
                            stacked: true,
                            ticks: { font: { size: 10, family: 'monospace' } }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { font: { size: 10, family: 'monospace' }, boxWidth: 12 }
                        }
                    }
                }
            });
        }

        /* ====================================================================
           7. MATRIX TABLE POPULATION
           ==================================================================== */
```

<details><summary>Raw HTML (lines 264-466)</summary>

```html
        <section id="tab-simulators" class="space-y-6 hidden">
            <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>⚡</span> Dynamic SNES Hardware Calculators & Interactive Simulators
                </h2>
                <p class="text-sm text-slate-600 mt-1">
                    Interact directly with the math and register manipulations used in *Zero Star* to bypass hardware limits. Test spatial hashing, CRT scanline HDMA parallax, packed BCD math, and sound channel stealing in real time.
                </p>
            </div>

            <!-- SIMULATORS GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <!-- SIMULATOR 1: SPATIAL HASH ADDRESS CALCULATOR -->
                <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                                <span class="text-teal-600">01.</span> Constant-Time O(1) Spatial Hash Grid
                            </h3>
                            <span class="font-mono text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">Bank $7F Map</span>
                        </div>
                        <p class="text-xs text-slate-600 mb-4">
                            Traditional pairwise collision ($O(n^2)$) exhausts the 3.58 MHz CPU. *Zero Star* treats the 63 kB uncompressed tilemap in Bank `$7F` as a direct spatial hash grid, using fast bit shifts to resolve terrain collisions in $O(1)$ constant time.
                        </p>

                        <!-- INPUT CONTROLS -->
                        <div class="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200 font-mono text-xs mb-4">
                            <div>
                                <label class="block text-slate-600 mb-1 font-bold">X Tile Coordinate (0-191):</label>
                                <input type="number" id="hashX" value="48" min="0" max="191" oninput="calculateSpatialHash()" class="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500">
                            </div>
                            <div>
                                <label class="block text-slate-600 mb-1 font-bold">Y Tile Coordinate (0-167):</label>
                                <input type="number" id="hashY" value="32" min="0" max="167" oninput="calculateSpatialHash()" class="w-full bg-white border border-stone-300 rounded px-2 py-1 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500">
                            </div>
                        </div>

                        <!-- MATHEMATICAL DERIVATION BREAKDOWN -->
                        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs space-y-2 border border-slate-700">
                            <div class="text-slate-400 text-[11px]">FORMULA: Base ($7F:0000) + (Y × 192) + X</div>
                            <div class="text-amber-400 font-bold" id="hashBitwiseResult">
                                Bitwise Shift: (32 << 7) + (32 << 6) + 48
                            </div>
                            <div class="flex justify-between items-center pt-2 border-t border-slate-800 text-sm">
                                <span class="text-slate-300">Absolute RAM Address:</span>
                                <span class="text-teal-400 font-bold text-base" id="hashAddressOut">$7F:1830</span>
                            </div>
                            <div class="text-[11px] text-slate-400 text-right">
                                Execution Cost: <span class="text-teal-300 font-bold">12 Clock Cycles ($O(1)$)</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-xs text-slate-500 mt-4 italic bg-amber-50 p-2.5 rounded border border-amber-200 text-amber-900">
                        💡 <strong>Why 192 tiles width?</strong> $192 = 128 + 64 = (2^7 + 2^6)$. Multiplying by 192 reduces to two fast bitwise arithmetic shifts (`ASL`), eliminating runtime multiplication instructions entirely!
                    </div>
                </div>

                <!-- SIMULATOR 2: HDMA CRT SCANLINE PARALLAX SIMULATOR -->
                <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                                <span class="text-amber-600">02.</span> HDMA Scanline Parallax Modulation
                            </h3>
                            <span class="font-mono text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Register $2111 (BG3HOFS)</span>
                        </div>
                        <p class="text-xs text-slate-600 mb-3">
                            Standard V-Blank DMA shifts entire layers uniformly. Horizontal Blank DMA (HDMA) executes micro-transfers during the 15µs scanline gaps, updating scroll offsets line-by-line with zero CPU overhead.
                        </p>

                        <!-- INTERACTIVE SCANLINE SLIDER -->
                        <div class="bg-stone-50 p-3 rounded-lg border border-stone-200 mb-4 space-y-2">
                            <div class="flex justify-between items-center text-xs font-mono font-bold">
                                <span class="text-slate-700">CRT Beam Scanline Position:</span>
                                <span class="bg-slate-800 text-amber-400 px-2 py-0.5 rounded" id="scanlineDisplay">Scanline 110 / 224</span>
                            </div>
                            <input type="range" id="scanlineSlider" min="1" max="224" value="110" oninput="updateScanlineSim(this.value)" class="w-full accent-amber-600 cursor-pointer">
                            <div class="flex justify-between text-[10px] font-mono text-slate-400">
                                <span>Scanline 1 (Sky)</span>
                                <span>120 (Peaks)</span>
                                <span>160 (Playfield)</span>
                                <span>224 (HUD)</span>
                            </div>
                        </div>

                        <!-- SIMULATED PPU RASTER STATUS PANEL -->
                        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs space-y-2 border border-slate-700">
                            <div class="flex justify-between border-b border-slate-800 pb-1">
                                <span class="text-slate-400">Active Display Layer:</span>
                                <span class="text-amber-300 font-bold" id="hdmaLayerText">BG3: Mountain Peaks (2bpp)</span>
                            </div>
                            <div class="flex justify-between border-b border-slate-800 pb-1">
                                <span class="text-slate-400">HDMA Register Injection:</span>
                                <span class="text-teal-400 font-bold" id="hdmaRegText">$2111 Write Value = 12 px</span>
                            </div>
                            <div class="flex justify-between items-center pt-1">
                                <span class="text-slate-400">Visual Parallax Offset:</span>
                                <span class="text-amber-400 font-bold text-sm" id="hdmaSpeedText">dx × 0.25 (Slow Scroll)</span>
                            </div>
                        </div>
                    </div>

                    <!-- SCANLINE VISUAL REPRESENTATION -->
                    <div class="mt-4 bg-slate-950 p-2 rounded-lg border border-slate-800 relative h-12 overflow-hidden flex items-center justify-center">
                        <div id="parallaxVisualBox" class="text-xs font-mono text-amber-400 text-center font-bold tracking-widest transition-all duration-75">
                            [ ▲▲▲▲ MOUNTAIN PEAKS PARALLAX SHIFT: 12px ▲▲▲▲ ]
                        </div>
                    </div>
                </div>

                <!-- SIMULATOR 3: PACKED BCD VS DIVISION BENCHMARK -->
                <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                                <span class="text-rose-600">03.</span> Packed BCD Hardware Decimal HUD
                            </h3>
                            <span class="font-mono text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">SED Flag Arithmetic</span>
                        </div>
                        <p class="text-xs text-slate-600 mb-3">
                            Converting raw binary integers to base-10 strings via software division requires ~320 cycles. By storing HUD tallies (chickens killed, level depth) in Packed BCD and setting the 65c816 decimal flag (`SED`), standard `ADC` operations handle multi-digit carries automatically in zero extra cycles.
                        </p>

                        <!-- COUNTER CONTROLS -->
                        <div class="bg-stone-50 p-3 rounded-lg border border-stone-200 mb-4 flex items-center justify-between">
                            <div>
                                <div class="text-xs font-mono text-slate-600 font-bold">Chicken Kills Metrics:</div>
                                <div class="text-2xl font-mono font-extrabold text-slate-900" id="bcdDisplay">0482</div>
                            </div>
                            <div class="flex gap-2 font-mono">
                                <button onclick="addBcdKills(1)" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded font-bold text-xs">+1 Kill</button>
                                <button onclick="addBcdKills(25)" class="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded font-bold text-xs">+25 Kills</button>
                                <button onclick="resetBcdKills()" class="bg-stone-200 hover:bg-stone-300 text-slate-700 px-2 py-1.5 rounded font-bold text-xs">Reset</button>
                            </div>
                        </div>

                        <!-- BCD BYTE REGISTER REPRESENTATION -->
                        <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs space-y-1.5 border border-slate-700">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Packed BCD Bytes:</span>
                                <span class="text-amber-400 font-bold" id="bcdHexVal">$04 $82</span>
                            </div>
                            <div class="flex justify-between text-[11px]">
                                <span class="text-slate-400">Hardware Nibble Encoding:</span>
                                <span class="text-teal-300" id="bcdBinaryVal">0000 0100 | 1000 0010</span>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Chart Component -->
                    <div class="mt-4">
                        <div class="chart-container">
                            <canvas id="cyclesChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- SIMULATOR 4: AUDIO SUBSYSTEM VOICE ALLOCATION ENGINE -->
                <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
                                <span class="text-indigo-600">04.</span> SPC700 Dynamic Sound Stealing
                            </h3>
                            <span class="font-mono text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">8 DSP Channels</span>
                        </div>
                        <p class="text-xs text-slate-600 mb-3">
                            The SPC700 audio processor runs independently with 64 kB ARAM. Dr. Matt's music engine uses 5 polyphonic voices, leaving 3 channels reserved for dynamic gameplay sound effects. When dynamic SFX fire, the custom driver steals music channels cleanly and restores them post-playback without audio clicks.
                        </p>

                        <!-- SFX TRIGGER CONTROLS -->
                        <div class="bg-stone-50 p-3 rounded-lg border border-stone-200 mb-3 font-mono text-xs">
                            <div class="text-slate-700 font-bold mb-2">Trigger Gameplay Sound Effect:</div>
                            <div class="flex flex-wrap gap-2">
                                <button onclick="triggerSfx('sword')" class="bg-teal-700 hover:bg-teal-800 text-white px-2.5 py-1 rounded font-bold">⚔️ Sword Slash</button>
                                <button onclick="triggerSfx('talisman')" class="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded font-bold">✨ Talisman Burst</button>
                                <button onclick="triggerSfx('chicken')" class="bg-rose-700 hover:bg-rose-800 text-white px-2.5 py-1 rounded font-bold">🐔 Chicken Strike</button>
                            </div>
                        </div>
                    </div>

                    <!-- VOICE MAP VISUALIZER -->
                    <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs border border-slate-700 space-y-2">
                        <div class="text-slate-400 text-[11px] border-b border-slate-800 pb-1">
                            8-VOICE DSP HARMONIC CHANNEL MATRIX
                        </div>
                        <div class="grid grid-cols-4 gap-2 text-center text-[11px]" id="voiceGrid">
                            <!-- Populated dynamically via JS -->
                        </div>
                    </div>

                    <!-- Chart Container for Audio Voice Allocation -->
                    <div class="mt-3">
                        <div class="chart-container">
                            <canvas id="audioChart"></canvas>
                        </div>
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
| D15-C1 | critical | VIDEO DOC | open | L287, L304-319, L646-647, L849-864 | _Claim:_ The tile address is Base + (Y × 192) + X, as (Y << 7) + (Y << 6) + X. The default X = 48, Y = 32 gives $7F:1830. The cost is "12 Clock Cycles".. _Problem:_ The video gives a 192 x 168 tile world that "fills up 63K" [06:53]. 192 x 168 = 32,256 tiles, and 63 x 1024 = 64,512 bytes. Thus each tile takes 2 bytes, as a SNES tilemap entry does. The address must be Base + ((Y × 192) + X) × 2. The default gives $7F:3060, not $7F:1830. The largest address of the page, $7F:7DFF (measured), covers only half the map. The video says only that a tile lookup is "actually faster" than a wall list [06:11]. It gives no formula, no "spatial hash", no O(n²) and no cycle count. The split 192 = 128 + 64 is correct arithmetic, but the video never says it. |
| D15-C2 | critical | VIDEO DOC | open | L428-433, L664-665, L707, L840, L973-986, L1106 | _Claim:_ "SPC700 Dynamic Sound Stealing": when a sound effect fires, the driver "steals music channels cleanly". The simulator marks voice 4, 3 or 2 as "SFX STEAL".. _Problem:_ The video says the opposite. The first five voices play music and the last three play sound effects [18:18]. The three wait for the CPU to name a voice and an effect [18:38]. Object sounds use "the second to last sound effect channel" so that they do not disturb the player sounds or the music [39:35]. The code steals voices 4, 3 and 2 (measured: voice 4 after a sword press). All of these are music voices. The simulator teaches a design that the developer avoided on purpose. |
| D15-C3 | critical | VIDEO KNOW | open | L328-373, L624-630, L698-702, L866-907 | _Claim:_ HDMA writes register $2111 (BG3HOFS) on the game screen. Lines 1 to 60 are a static sky, 61 to 120 move at dx × 0.25, 121 to 160 at dx × 0.60, 161 to 210 are the playfield and 211 to 224 are the HUD. The cost is "zero CPU overhead".. _Problem:_ The video shows the parallax on the title screen, not in the game [34:08]. The HDMA writes the "background two horizontal scroll register" [35:31], which is $210F (BG2HOFS), not $2111. The table has three bytes per entry: a line count and a two-byte value [35:51]. All band limits, speeds and pixel values on the page are invented. The video names no line numbers. The CPU must build the table and re-enable the channel every frame [36:11], and HDMA itself takes bus cycles from the CPU. The BG3 layer in the game is black tiles [37:13], not mountains. The slider models a screen that does not exist. |
| D15-C4 | critical | VIDEO KNOW VERIFY | verify | L681, L824, L386, L618, L1052-1063 | _Claim:_ "No hardware division or multiplication unit". Software division costs "~320 cycles" for the HUD and 480 cycles for collision. The optimized versions cost 14 and 12 cycles.. _Problem:_ The 5A22 has a hardware multiplier at $4202/$4203 (8 x 8, result at $4216/$4217, 8 cycles) and a divider at $4204 to $4206 (16 / 8, quotient at $4214/$4215). The reviewer fetched the nesdev "Multiplication" page for the multiplier. A binary to decimal conversion is a few hardware divisions, not 320 cycles. The video says only that BCD "makes the math so much easier" [31:44] and that INC and DEC ignore the decimal flag [32:05]. None of the four chart values is in the video or in report 14. The chart is a picture of an invention. |
| D15-M11 | major | DOC | open | L114-130, L220, L293-298, L342, L418, L460, L966-967 | _Claim:_ Accessibility.. _Problem:_ The five tab buttons have no `role="tab"` and no `aria-selected`. The three canvases have no text alternative and no data table. The two labels have no `for`, so a screen reader does not link them to the inputs (measured). The range slider has no `aria-label`. The voice grid text is 9 and 10 pixels. Stolen voices show only by color and a pulse. Emoji are the only icons. |
| D15-M7 | major | DOC VIDEO | open | L386, L393-398, L620, L910-937 | _Claim:_ "Packed BCD Hardware Decimal HUD": a chicken kills counter from 0482 with +1, +25 and Reset.. _Problem:_ The code does `bcdKillCounter + amount` on a binary integer, then `toString().padStart(4, '0')`. It is a decimal string, not BCD. It clamps at 9999 (measured: 9990 + 25 gives 9999). A decimal-mode ADC wraps to 0000 and sets the carry. The nibble display is correct. In the video, the chicken counter counts down and keeps its leading zeros [33:06]. The level counter counts up and drops them [32:26]. The one real trap in the video, INC and DEC ignore the flag [32:05], is absent from the simulator. |
| D15-M8 | major | KNOW VERIFY | verify | L333, L628, L699-700 | _Claim:_ The H-blank gap is 15 µs. The "V-Blank window (1.3 ms) is too brief for multi-plane background shifts".. _Problem:_ An NTSC line is 1364 master clocks, about 63.56 µs, and a frame has 262 lines (nesdev "Timing"). In 224-line mode, 37 lines are blank: about 2.35 ms. In 239-line mode, 22 lines: about 1.4 ms. The value 1.3 ms fits neither. The non-display part of a line is about 85 of 341 dots, about 15.8 µs, so 15 µs is close. The video says only that H-blank is "much shorter than the vertical blank" [35:31]. The reason for HDMA is per-line change, not V-blank length. |
| D15-m2 | minor | DOC | open | L146, L287, L313, L525, L569, L584 | _Claim:_ `*Zero Star*`, `` `$7F` `` and `$O(n^2)$`.. _Problem:_ The page is HTML. The reader sees raw asterisks, backticks and dollar signs (measured in six elements). |
| D15-m4 | minor | VIDEO | open | L433, L1101 | _Claim:_ "Dr. Matt's music engine".. _Problem:_ Dr. Matt wrote the music tracks [19:07, 44:42]. Inkbox wrote the engine, because the driver from Nintendo is not free to use [14:08 to 14:29]. |
| D15-m5 | minor | VIDEO | open | L941-948 | _Claim:_ Voice roles: Bass, Chords, Melody, Harmony, Percussion.. _Problem:_ The video gives five voices "with a list of song data" [18:38]. The roles are invented. |
| D15-m7 | minor | DOC | open | L306, L862 | _Claim:_ The start text "Bitwise Shift: (32 << 7) + (32 << 6) + 48".. _Problem:_ The script replaces it at load with a longer text that adds "= 4096 + 2048 + 48". The reader sees a flash of different text. The same applies to L371. |

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
