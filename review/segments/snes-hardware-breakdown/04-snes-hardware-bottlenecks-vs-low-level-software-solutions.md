---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-matrix
lines: 471-499, 678-710, 1140-1159
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D15-C2, D15-C3, D15-C4, D15-C5, D15-M1, D15-M8, D15-M12, D15-m1]
---

# SNES Hardware Bottlenecks vs Low-Level Software Solutions

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 28:34](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1714s). The sprite limit segment: transparent tile-zero sprites still count, so he moves them offscreen. The page gives the reversed fix and the rejected priority rotation.

###  📊 SNES Hardware Bottlenecks vs Low-Level Software Solutions

A comprehensive matrix detailing how physical hardware limits were bypassed through custom assembly engineering and mechanical sympathy for the console's architecture.

| Hardware Subsystem  | Physical Silicon Bottleneck  | Software Assembly Solution  | Engineering Impact

## Linked script: `matrixData` (lines 678-710)

The recommendation logic / numbers below are claims too; review them.

```js
        const matrixData = [
            {
                subsystem: "Main CPU (Ricoh 5A22)",
                bottleneck: "Slow 3.58 MHz speed; no hardware division or multiplication unit.",
                solution: "Packed BCD arithmetic via SED flag; bitwise spatial hashing for collisions.",
                impact: "Reduces cycle consumption by >90% during HUD updates and terrain physics."
            },
            {
                subsystem: "Work RAM (WRAM)",
                bottleneck: "128 kB split into isolated 64 kB Bank $7E and Bank $7F.",
                solution: "Dedicated Bank $7F to uncompressed 63 kB dungeon map grid.",
                impact: "Prevents memory fragmentation and supports 9,999 procedurally generated floors."
            },
            {
                subsystem: "PPU Scanline Buffers",
                bottleneck: "Strict limit of 32 sprite tiles per single horizontal scanline.",
                solution: "Viewport entity sorting; dynamic OAM priority table cycling.",
                impact: "Eliminates game-breaking sprite dropouts during intense multi-enemy combat."
            },
            {
                subsystem: "Display Parallax",
                bottleneck: "V-Blank window (1.3 ms) is too brief for multi-plane background shifts.",
                solution: "HDMA transfers to scroll register $2111 during 15µs scanline gaps.",
                impact: "Achieves smooth 60 FPS multi-plane mountain parallax with 0% CPU overhead."
            },
            {
                subsystem: "Audio Subsystem",
                bottleneck: "SPC700 APU is physically isolated from main CPU bus.",
                solution: "Custom 8-voice assembly sound driver with 4-port I/O handshake ($2140-$2143).",
                impact: "Enables independent BRR music playback and dynamic SFX voice stealing."
            }
        ];
```

## Linked script: `renderMatrixTable` (lines 1140-1159)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderMatrixTable() {
            const tbody = document.getElementById('matrixTableBody');
            tbody.innerHTML = '';

            matrixData.forEach((row, idx) => {
                const tr = document.createElement('tr');
                tr.className = idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60';
                tr.innerHTML = `
                    <td class="p-3 font-mono font-bold text-amber-900 border-b border-stone-200">${row.subsystem}</td>
                    <td class="p-3 border-b border-stone-200">${row.bottleneck}</td>
                    <td class="p-3 font-mono text-teal-800 font-semibold border-b border-stone-200">${row.solution}</td>
                    <td class="p-3 border-b border-stone-200 text-slate-600">${row.impact}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        /* ====================================================================
           8. APPLICATION INITIALIZATION
           ==================================================================== */
```

<details><summary>Raw HTML (lines 471-499)</summary>

```html
        <section id="tab-matrix" class="space-y-6 hidden">
            <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>📊</span> SNES Hardware Bottlenecks vs Low-Level Software Solutions
                </h2>
                <p class="text-sm text-slate-600 mt-1">
                    A comprehensive matrix detailing how physical hardware limits were bypassed through custom assembly engineering and mechanical sympathy for the console's architecture.
                </p>
            </div>

            <!-- COMPARATIVE MATRIX TABLE -->
            <div class="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-900 text-slate-100 font-mono">
                                <th class="p-3 font-bold border-b border-slate-800">Hardware Subsystem</th>
                                <th class="p-3 font-bold border-b border-slate-800">Physical Silicon Bottleneck</th>
                                <th class="p-3 font-bold border-b border-slate-800">Software Assembly Solution</th>
                                <th class="p-3 font-bold border-b border-slate-800">Engineering Impact</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200 font-sans text-slate-700" id="matrixTableBody">
                            <!-- Populated dynamically via JS -->
                        </tbody>
                    </table>
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
| D15-C3 | critical | VIDEO KNOW | open | L328-373, L624-630, L698-702, L866-907 | _Claim:_ HDMA writes register $2111 (BG3HOFS) on the game screen. Lines 1 to 60 are a static sky, 61 to 120 move at dx × 0.25, 121 to 160 at dx × 0.60, 161 to 210 are the playfield and 211 to 224 are the HUD. The cost is "zero CPU overhead".. _Problem:_ The video shows the parallax on the title screen, not in the game [34:08]. The HDMA writes the "background two horizontal scroll register" [35:31], which is $210F (BG2HOFS), not $2111. The table has three bytes per entry: a line count and a two-byte value [35:51]. All band limits, speeds and pixel values on the page are invented. The video names no line numbers. The CPU must build the table and re-enable the channel every frame [36:11], and HDMA itself takes bus cycles from the CPU. The BG3 layer in the game is black tiles [37:13], not mountains. The slider models a screen that does not exist. |
| D15-C4 | critical | VIDEO KNOW VERIFY | verify | L681, L824, L386, L618, L1052-1063 | _Claim:_ "No hardware division or multiplication unit". Software division costs "~320 cycles" for the HUD and 480 cycles for collision. The optimized versions cost 14 and 12 cycles.. _Problem:_ The 5A22 has a hardware multiplier at $4202/$4203 (8 x 8, result at $4216/$4217, 8 cycles) and a divider at $4204 to $4206 (16 / 8, quotient at $4214/$4215). The reviewer fetched the nesdev "Multiplication" page for the multiplier. A binary to decimal conversion is a few hardware divisions, not 320 cycles. The video says only that BCD "makes the math so much easier" [31:44] and that INC and DEC ignore the decimal flag [32:05]. None of the four chart values is in the video or in report 14. The chart is a picture of an invention. |
| D15-C5 | critical | VIDEO | open | L636-638, L693-695, L832 | _Claim:_ The limit is "32 sprite tiles" per scanline. The fixes are "viewport culling, dummy tile zero relocation, and alternating priority frame cycling" and "dynamic entity sorting".. _Problem:_ The video gives two limits: 32 sprites per line [28:34] and 34 8-pixel slivers per line [29:38]. The nesdev "Sprites" page confirms both. Tile zero was the problem, not the fix: the PPU "still counts those transparent sprites" [28:34], so he moves them to an offscreen Y [28:55]. The video names the registers that rotate sprites, then says "leave it as is" [30:21]. The page gives the rejected option as the fix. The objects are "not organized by X or Y" [30:42], so there is no entity sorting. |
| D15-M1 | major | VIDEO VERIFY | verify | L84, L104, L609, L689, L826 | _Claim:_ A "2-year project" with "9,999" floors.. _Problem:_ The goal is "level 10,000" or 10,000 chickens [03:50]. A 16-bit packed BCD counter "fits exactly the 10,000" he needs [32:05]. The number 9,999 is the largest value of the counter, not the number of floors. The video gives no development time. The recap jokes about "two weeks" [00:00]. The "two-year" claim comes from report 14, L5, which cites the video for it. |
| D15-M12 | major | VIDEO DOC | open | L169, L217, L223, L610-611, L687-689, L825, L1008 | _Claim:_ Bank $7F is "63 kB" and holds the map "explicitly". Bank $7E is "isolated for stack and system state". The chart totals "256 kB". The split "prevents heap fragmentation".. _Problem:_ Each WRAM bank is 64 kB. The map is 63 kB of bank $7F, and he names the last 1 kB too [21:18]. The chart puts 63 for the bank and 1 for OAM plus CGRAM, so 64 + 63 + 64 + 64 + 1 = 256 only by this error. The video keeps the objects in the first bank through the 8 kB mirror, to avoid changing the data bank register [21:38 to 21:59]. The banks are not "isolated". There is no heap in this game, so nothing fragments. |
| D15-M8 | major | KNOW VERIFY | verify | L333, L628, L699-700 | _Claim:_ The H-blank gap is 15 µs. The "V-Blank window (1.3 ms) is too brief for multi-plane background shifts".. _Problem:_ An NTSC line is 1364 master clocks, about 63.56 µs, and a frame has 262 lines (nesdev "Timing"). In 224-line mode, 37 lines are blank: about 2.35 ms. In 239-line mode, 22 lines: about 1.4 ms. The value 1.3 ms fits neither. The non-display part of a line is about 85 of 341 dots, about 15.8 µs, so 15 µs is close. The video says only that H-blank is "much shorter than the vertical blank" [35:31]. The reason for HDMA is per-line change, not V-blank length. |
| D15-m1 | minor | VIDEO | open | L199, L706, L839 | _Claim:_ "4x I/O Registers ($2140-$2143)", a "4-port bidirectional" handshake.. _Problem:_ There are four addresses but "eight separate registers", so a write by one side does not erase the other [12:28 to 12:48]. The page loses the point that the video makes. |

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
