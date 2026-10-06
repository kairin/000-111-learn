---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-roadmap
lines: 232-259, 594-677, 755-801, 802-816
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D15-C1, D15-C2, D15-C3, D15-C4, D15-C5, D15-M1, D15-M3, D15-M5, D15-M6, D15-M7, D15-M8, D15-M10, D15-M12, D15-M13, D15-m8]
---

# Video Structure & Technical Chapter Roadmap

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 00:46](https://www.youtube.com/watch?v=j_2bo7ng65E&t=46s). The video lists its own plan here: graphics, world, music, a music engine, enemies, animations, sound effects and cartridges. The nine chapters of the page are not in the video order and have no timestamps.

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

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D15-C1 | critical | VIDEO DOC | open | L287, L304-319, L646-647, L849-864 | _Claim:_ The tile address is Base + (Y × 192) + X, as (Y << 7) + (Y << 6) + X. The default X = 48, Y = 32 gives $7F:1830. The cost is "12 Clock Cycles".. _Problem:_ The video gives a 192 x 168 tile world that "fills up 63K" [06:53]. 192 x 168 = 32,256 tiles, and 63 x 1024 = 64,512 bytes. Thus each tile takes 2 bytes, as a SNES tilemap entry does. The address must be Base + ((Y × 192) + X) × 2. The default gives $7F:3060, not $7F:1830. The largest address of the page, $7F:7DFF (measured), covers only half the map. The video says only that a tile lookup is "actually faster" than a wall list [06:11]. It gives no formula, no "spatial hash", no O(n²) and no cycle count. The split 192 = 128 + 64 is correct arithmetic, but the video never says it. |
| D15-C2 | critical | VIDEO DOC | open | L428-433, L664-665, L707, L840, L973-986, L1106 | _Claim:_ "SPC700 Dynamic Sound Stealing": when a sound effect fires, the driver "steals music channels cleanly". The simulator marks voice 4, 3 or 2 as "SFX STEAL".. _Problem:_ The video says the opposite. The first five voices play music and the last three play sound effects [18:18]. The three wait for the CPU to name a voice and an effect [18:38]. Object sounds use "the second to last sound effect channel" so that they do not disturb the player sounds or the music [39:35]. The code steals voices 4, 3 and 2 (measured: voice 4 after a sword press). All of these are music voices. The simulator teaches a design that the developer avoided on purpose. |
| D15-C3 | critical | VIDEO KNOW | open | L328-373, L624-630, L698-702, L866-907 | _Claim:_ HDMA writes register $2111 (BG3HOFS) on the game screen. Lines 1 to 60 are a static sky, 61 to 120 move at dx × 0.25, 121 to 160 at dx × 0.60, 161 to 210 are the playfield and 211 to 224 are the HUD. The cost is "zero CPU overhead".. _Problem:_ The video shows the parallax on the title screen, not in the game [34:08]. The HDMA writes the "background two horizontal scroll register" [35:31], which is $210F (BG2HOFS), not $2111. The table has three bytes per entry: a line count and a two-byte value [35:51]. All band limits, speeds and pixel values on the page are invented. The video names no line numbers. The CPU must build the table and re-enable the channel every frame [36:11], and HDMA itself takes bus cycles from the CPU. The BG3 layer in the game is black tiles [37:13], not mountains. The slider models a screen that does not exist. |
| D15-C4 | critical | VIDEO KNOW VERIFY | verify | L681, L824, L386, L618, L1052-1063 | _Claim:_ "No hardware division or multiplication unit". Software division costs "~320 cycles" for the HUD and 480 cycles for collision. The optimized versions cost 14 and 12 cycles.. _Problem:_ The 5A22 has a hardware multiplier at $4202/$4203 (8 x 8, result at $4216/$4217, 8 cycles) and a divider at $4204 to $4206 (16 / 8, quotient at $4214/$4215). The reviewer fetched the nesdev "Multiplication" page for the multiplier. A binary to decimal conversion is a few hardware divisions, not 320 cycles. The video says only that BCD "makes the math so much easier" [31:44] and that INC and DEC ignore the decimal flag [32:05]. None of the four chart values is in the video or in report 14. The chart is a picture of an invention. |
| D15-C5 | critical | VIDEO | open | L636-638, L693-695, L832 | _Claim:_ The limit is "32 sprite tiles" per scanline. The fixes are "viewport culling, dummy tile zero relocation, and alternating priority frame cycling" and "dynamic entity sorting".. _Problem:_ The video gives two limits: 32 sprites per line [28:34] and 34 8-pixel slivers per line [29:38]. The nesdev "Sprites" page confirms both. Tile zero was the problem, not the fix: the PPU "still counts those transparent sprites" [28:34], so he moves them to an offscreen Y [28:55]. The video names the registers that rotate sprites, then says "leave it as is" [30:21]. The page gives the rejected option as the fix. The objects are "not organized by X or Y" [30:42], so there is no entity sorting. |
| D15-M1 | major | VIDEO VERIFY | verify | L84, L104, L609, L689, L826 | _Claim:_ A "2-year project" with "9,999" floors.. _Problem:_ The goal is "level 10,000" or 10,000 chickens [03:50]. A 16-bit packed BCD counter "fits exactly the 10,000" he needs [32:05]. The number 9,999 is the largest value of the counter, not the number of floors. The video gives no development time. The recap jokes about "two weeks" [00:00]. The "two-year" claim comes from report 14, L5, which cites the video for it. |
| D15-M10 | major | DOC | open | L802-812 | _Claim:_ `filterChapters` reads `event.target`.. _Problem:_ The function uses the global `window.event`, which is deprecated. A call without a click throws `Cannot read properties of undefined` (measured). A keyboard activation of the button works only because browsers synthesize a click. The function has no parameter for the button. |
| D15-M12 | major | VIDEO DOC | open | L169, L217, L223, L610-611, L687-689, L825, L1008 | _Claim:_ Bank $7F is "63 kB" and holds the map "explicitly". Bank $7E is "isolated for stack and system state". The chart totals "256 kB". The split "prevents heap fragmentation".. _Problem:_ Each WRAM bank is 64 kB. The map is 63 kB of bank $7F, and he names the last 1 kB too [21:18]. The chart puts 63 for the bank and 1 for OAM plus CGRAM, so 64 + 63 + 64 + 64 + 1 = 256 only by this error. The video keeps the objects in the first bank through the 8 kB mirror, to avoid changing the data bank register [21:38 to 21:59]. The banks are not "isolated". There is no heap in this game, so nothing fragments. |
| D15-M13 | major | VIDEO | open | L553-555, L602 | _Claim:_ Compilers cause "register thrashing and stack bloat" on the 65c816. Hand assembly beats them.. _Problem:_ The video never mentions a compiler. The claim is from report 14. It stands as a lesson without evidence. |
| D15-M3 | major | DOC VIDEO | open | L100, L146, L560-562, L601 | _Claim:_ "CO-PROCESSORS: NONE (0)".. _Problem:_ The page contradicts itself. L146 says the console has "dedicated coprocessors". L560 calls the HDMA unit, the PPU color math and the SPC700 "coprocessor offloading". The video says he did not use Mode 7 or the "extra in cartridge processing chips" [50:53]. So "no cartridge enhancement chip" is right, "zero coprocessors" is wrong. |
| D15-M5 | major | VIDEO | open | L510, L523-541, L669-674 | _Claim:_ Emulators (Mesen, bsnes) start with clean RAM, real consoles do not, so the game "required an explicit boot-clearing loop". "Thorough hardware testing on Mouse Bite Labs PCBs" fixed floating lines.. _Problem:_ The video names no emulator and no test on a console. The cartridge segment shows a solder stencil, resin shells and solder paste [45:36 to 46:18]. The cartridge "should be good to go" when he finishes the game [46:55]. The Mouse Bite Labs credit is real [45:58]. The rest of the tab is invented. The video does say that zeroing the map in RAM makes a solid forest [24:47], but that is level generation, not a boot clear. |
| D15-M6 | major | VIDEO VERIFY | verify | L539, L655-656, L833 | _Claim:_ "Sub-screen color subtraction ($2131/$2132)" gives "single-frame hit-stop black flashes" and "elemental spell bursts", and a "Color Math Hardware Inversion".. _Problem:_ $2131 is CGADSUB (add or subtract, half, layer enable) and $2132 is COLDATA (the fixed color). The reviewer fetched the nesdev "PPU registers" page. The video uses add and halve, not subtract: BG3 has black tiles, BG1 leaves the subscreen, and the result is half brightness [37:34]. The hit stop pauses "for a few frames" and darkens the background [40:37], not a single black frame. The talisman clouds use four palette colors [42:39], not color math. Nothing inverts. |
| D15-M7 | major | DOC VIDEO | open | L386, L393-398, L620, L910-937 | _Claim:_ "Packed BCD Hardware Decimal HUD": a chicken kills counter from 0482 with +1, +25 and Reset.. _Problem:_ The code does `bcdKillCounter + amount` on a binary integer, then `toString().padStart(4, '0')`. It is a decimal string, not BCD. It clamps at 9999 (measured: 9990 + 25 gives 9999). A decimal-mode ADC wraps to 0000 and sets the carry. The nibble display is correct. In the video, the chicken counter counts down and keeps its leading zeros [33:06]. The level counter counts up and drops them [32:26]. The one real trap in the video, INC and DEC ignore the flag [32:05], is absent from the simulator. |
| D15-M8 | major | KNOW VERIFY | verify | L333, L628, L699-700 | _Claim:_ The H-blank gap is 15 µs. The "V-Blank window (1.3 ms) is too brief for multi-plane background shifts".. _Problem:_ An NTSC line is 1364 master clocks, about 63.56 µs, and a frame has 262 lines (nesdev "Timing"). In 224-line mode, 37 lines are blank: about 2.35 ms. In 239-line mode, 22 lines: about 1.4 ms. The value 1.3 ms fits neither. The non-display part of a line is about 85 of 341 dots, about 15.8 µs, so 15 µs is close. The video says only that H-blank is "much shorter than the vertical blank" [35:31]. The reason for HDMA is per-line change, not V-blank length. |
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
