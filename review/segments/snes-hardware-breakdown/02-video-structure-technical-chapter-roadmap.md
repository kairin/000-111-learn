---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-roadmap
lines: 232-259, 594-677, 755-801, 802-816
findings: []
---

# Video Structure & Technical Chapter Roadmap

###  📹 Video Structure & Technical Chapter Roadmap

The video deconstructs nine core engineering stages, mapping each gameplay design goal to specific SNES hardware registers and assembly routines.

ALL (9)

CPU/ASM

WRAM

PPU/HDMA

SPC700

## Linked script: `chaptersData` (lines 594-677)

The recommendation logic / numbers below are claims too; review them.

```js
        const chaptersData = [
            {
                id: 1,
                title: "1. Architecture Baseline & Constraints",
                subsystem: "cpu",
                hardware: "Ricoh 5A22 CPU (3.58 MHz)",
                challenge: "Strict 3.58 MHz cycle budget, lack of OS or MMU, non-uniform memory maps.",
                solution: "Written entirely in bare-metal 65c816 assembly without auxiliary expansion coprocessors.",
                keyConcept: "Hand-crafted assembly eliminates modern compiler register thrashing and stack bloat on vintage accumulator-bound hardware."
            },
            {
                id: 2,
                title: "2. WRAM Banking & Procedural Maps",
                subsystem: "memory",
                hardware: "128 kB WRAM (Banks $7E/$7F)",
                challenge: "Generating massive dynamic dungeons across 9,999 levels without memory fragmentation.",
                solution: "Bank $7F dedicated to a 63 kB uncompressed tile grid (192x168); Bank $7E isolated for stack and system state.",
                keyConcept: "Deterministic memory isolation prevents stack corruption and allows scalable procedural dungeon generation."
            },
            {
                id: 3,
                title: "3. PPU Configuration & BCD HUD",
                subsystem: "ppu",
                hardware: "Dual PPUs & Background Mode 1",
                challenge: "High cycle cost (~320 cycles) of runtime integer division for 5-digit base-10 HUD tallies.",
                solution: "Packed Binary-Coded Decimal (BCD) arithmetic using the 65c816 hardware decimal flag (SED).",
                keyConcept: "Hardware decimal mode propagates carries automatically during addition (ADC), updating HUD displays in zero extra cycles."
            },
            {
                id: 4,
                title: "4. HDMA Scanline Modulation",
                subsystem: "ppu",
                hardware: "DMA Controller & Register $2111",
                challenge: "Creating 3D multi-plane background parallax scrolling without consuming CPU frame cycles.",
                solution: "Horizontal Blank DMA (HDMA) injects scroll updates line-by-line into register $2111 during 15µs scanline gaps.",
                keyConcept: "Automated hardware micro-transfers execute in parallel with display rasterization at full 60 FPS."
            },
            {
                id: 5,
                title: "5. OAM Management & Sprite Limits",
                subsystem: "ppu",
                hardware: "Object Attribute Memory (OAM)",
                challenge: "PPU line buffer drops sprites if more than 32 sprite tiles occupy a single horizontal scanline.",
                solution: "Dynamic entity sorting, viewport culling, dummy tile zero relocation, and alternating priority frame cycling.",
                keyConcept: "Alternating sprite rendering priority converts missing invisible entities into manageable 30 Hz transparency flicker."
            },
            {
                id: 6,
                title: "6. Spatial Hashing & Collision",
                subsystem: "cpu",
                hardware: "65c816 Math & Bank $7F Array",
                challenge: "Pairwise bounding box collision (O(n²)) exhausts CPU cycle budget with multiple active actors.",
                solution: "Direct O(1) spatial memory address hashing: Address = Base + (Y << 7) + (Y << 6) + X.",
                keyConcept: "Fixed playfield tile width (192 tiles = 128 + 64) reduces address multiplication to two instant bitwise shifts."
            },
            {
                id: 7,
                title: "7. Hardware Color Arithmetic",
                subsystem: "ppu",
                hardware: "PPU Color Math Engine",
                challenge: "Modifying CGRAM palettes during active frame cycles causes severe bus contention.",
                solution: "Sub-screen color subtraction ($2131/$2132) for hit-stop black flashes and elemental talisman spell effects.",
                keyConcept: "Real-time hardware screen blending avoids rewriting palette tables in Color Graphics RAM during gameplay."
            },
            {
                id: 8,
                title: "8. SPC700 Subsystem & Audio Engine",
                subsystem: "audio",
                hardware: "Sony SPC700 & 64 kB ARAM",
                challenge: "Asynchronous communication with isolated audio system; lack of modular open-source drivers.",
                solution: "Custom SPC700 driver in assembly; Bit Rate Reduction (BRR) audio compression; 5 music voices + 3 preemptive SFX voices.",
                keyConcept: "Dynamic sound effects steal music voices cleanly and restore them post-playback without audio clicks."
            },
            {
                id: 9,
                title: "9. Physical Synthesis & Verification",
                subsystem: "memory",
                hardware: "Physical Cartridge Mask ROM PCB",
                challenge: "Physical console behavioral divergences from high-accuracy software emulators.",
                solution: "Power-on SRAM clearing loops; floating line stabilization; Mouse Bite Labs open hardware PCB verification.",
                keyConcept: "Authentic silicon requires strict initialization loops to wipe random electrical cold-boot RAM bit patterns."
            }
        ];
```

## Linked script: `renderChapters` (lines 755-801)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderChapters(filter = 'all') {
            const grid = document.getElementById('chaptersGrid');
            grid.innerHTML = '';

            const filtered = filter === 'all' 
                ? chaptersData 
                : chaptersData.filter(c => c.subsystem === filter);

            filtered.forEach(ch => {
                const card = document.createElement('div');
                card.className = "bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between space-y-3";
                
                let badgeColor = "bg-slate-100 text-slate-800";
                if (ch.subsystem === 'cpu') badgeColor = "bg-teal-100 text-teal-800";
                if (ch.subsystem === 'memory') badgeColor = "bg-amber-100 text-amber-800";
                if (ch.subsystem === 'ppu') badgeColor = "bg-rose-100 text-rose-800";
                if (ch.subsystem === 'audio') badgeColor = "bg-indigo-100 text-indigo-800";

                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${badgeColor}">
                                ${ch.subsystem}
                            </span>
                            <span class="font-mono text-xs text-slate-400">Ch. 0${ch.id}</span>
                        </div>
                        <h3 class="font-bold text-slate-900 text-sm leading-snug mb-1">${ch.title}</h3>
                        <div class="text-[11px] font-mono text-amber-800 font-semibold mb-2">📍 Hardware: ${ch.hardware}</div>
                        
                        <div class="space-y-2 text-xs text-slate-600">
                            <div>
                                <strong class="text-slate-800">Challenge:</strong> ${ch.challenge}
                            </div>
                            <div>
                                <strong class="text-slate-800">Assembly Fix:</strong> ${ch.solution}
                            </div>
                        </div>
                    </div>

                    <div class="pt-2 border-t border-stone-100 text-[11px] text-slate-500 italic bg-stone-50 p-2 rounded">
                        💡 ${ch.keyConcept}
                    </div>
                `;
                grid.appendChild(card);
            });
        }
```

## Linked script: `filterChapters` (lines 802-816)

The recommendation logic / numbers below are claims too; review them.

```js
        function filterChapters(subsystem) {
            // Update filter button styling
            document.querySelectorAll('.chapter-filter-btn').forEach(btn => {
                btn.classList.remove('bg-slate-800', 'text-white', 'font-bold');
                btn.classList.add('bg-stone-100', 'text-slate-700');
            });
            event.target.classList.remove('bg-stone-100', 'text-slate-700');
            event.target.classList.add('bg-slate-800', 'text-white', 'font-bold');

            renderChapters(subsystem);
        }

        /* ====================================================================
           4. HARDWARE INSPECTOR INTERACTIVITY
           ==================================================================== */
```

<details><summary>Raw HTML (lines 232-259)</summary>

```html
        <section id="tab-roadmap" class="space-y-6 hidden">
            <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <span>📹</span> Video Structure & Technical Chapter Roadmap
                        </h2>
                        <p class="text-sm text-slate-600 mt-1">
                            The video deconstructs nine core engineering stages, mapping each gameplay design goal to specific SNES hardware registers and assembly routines.
                        </p>
                    </div>

                    <!-- SUBSYSTEM FILTER BUTTONS -->
                    <div class="flex flex-wrap gap-1 font-mono text-xs">
                        <button onclick="filterChapters('all')" class="chapter-filter-btn px-2.5 py-1 rounded bg-slate-800 text-white font-bold">ALL (9)</button>
                        <button onclick="filterChapters('cpu')" class="chapter-filter-btn px-2.5 py-1 rounded bg-stone-100 text-slate-700 hover:bg-stone-200">CPU/ASM</button>
                        <button onclick="filterChapters('memory')" class="chapter-filter-btn px-2.5 py-1 rounded bg-stone-100 text-slate-700 hover:bg-stone-200">WRAM</button>
                        <button onclick="filterChapters('ppu')" class="chapter-filter-btn px-2.5 py-1 rounded bg-stone-100 text-slate-700 hover:bg-stone-200">PPU/HDMA</button>
                        <button onclick="filterChapters('audio')" class="chapter-filter-btn px-2.5 py-1 rounded bg-stone-100 text-slate-700 hover:bg-stone-200">SPC700</button>
                    </div>
                </div>
            </div>

            <!-- CHAPTER CARDS CONTAINER -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="chaptersGrid">
                <!-- Dynamic cards populated via JavaScript -->
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
