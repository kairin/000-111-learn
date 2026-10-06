---
target: ../segments/snes_hardware_breakdown.html
derived_from: ../segments/Video_Breakdown_and_Concepts.md
segments: ../segments/snes-hardware-breakdown/
video: https://www.youtube.com/watch?v=j_2bo7ng65E
pass: 1
date: 2026-10-05
---

# Adversarial review: "Zero Star Hardware Systems Explorer" (HTML)

This page is an interactive version of report 14. It keeps the same nine chapters and the same numbers. Thus **the content findings of review 14 apply here too**. This review covers what the page adds or changes: the header metrics, the four simulators, the three charts, the matrix, the "Silicon reality" tab, the JavaScript and the delivery. The chart data, the simulator code and the start values are claims too. Line numbers are HTML file lines.

The reviewer read the full caption transcript of the video (51:14). The reviewer ran the page in headless Chromium with Playwright and called its functions directly. The reviewer also fetched four pages of snes.nesdev.org (PPU registers, Timing, Sprites, Multiplication) to check the high-stakes hardware facts. The page for DMA gave only the table format.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (a contradiction, arithmetic, code behavior, a measured run of the page) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the video captions, with a timestamp |

## 1. Goals and objectives

1. Give the key facts of the project at a glance (ROM size, clock, coprocessors, floors) and a map of the three hardware domains with a memory chart.
2. Map the video to nine chapters with a filter by subsystem.
3. Let the reader test four techniques of the game: a tile address calculator, an HDMA scanline slider, a packed BCD counter and a sound-voice allocator, with two charts.
4. Show a matrix of hardware limits against the software answers.
5. Explain what changes between an emulator and real hardware, and give engineering lessons.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Key facts and memory | **No** | Three of the four header metrics are wrong or unsourced (M1, M2, M3). The CPU card says the 5A22 has no multiply or divide unit. It has both (C4). The three RAM sizes are correct [09:01]. |
| 2. Chapter map | **Partly** | The nine chapters cover real topics of the video. But the order is not the video order, no chapter has a timestamp, and four chapters reverse what the video says (C2, C3, C5, M5). |
| 3. Simulators | **No** | The address calculator uses one byte per tile, so every address is half the real one (C1). The HDMA slider models a layer, a register and a screen that the video does not show (C3). The BCD counter adds decimal strings, not BCD (M7). The voice simulator steals music voices, which the video rules out (C2). Both bar charts show invented cycle counts (C4). |
| 4. Matrix | **No** | All five rows carry at least one claim the video contradicts: no multiply unit, isolated banks, 32 "sprite tiles", 1.3 ms V-blank, voice stealing (C4, C5, M8, M12). |
| 5. Silicon reality | **No** | The video does not test a cartridge on a console. The cartridge is not finished at the end of the video [46:55]. The boot-clearing loops, bus floats and emulator comparison are invented (M5). |

**Overall confidence in the document:** Low. The page is well built as software, and some facts are right. But its central claims about memory layout, sprites, sound and the CPU contradict the video, and every number in the charts is invented.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L287, L304-319, L646-647, L849-864 | The tile address is Base + (Y × 192) + X, as (Y << 7) + (Y << 6) + X. The default X = 48, Y = 32 gives $7F:1830. The cost is "12 Clock Cycles". | The video gives a 192 x 168 tile world that "fills up 63K" [06:53]. 192 x 168 = 32,256 tiles, and 63 x 1024 = 64,512 bytes. Thus each tile takes 2 bytes, as a SNES tilemap entry does. The address must be Base + ((Y × 192) + X) × 2. The default gives $7F:3060, not $7F:1830. The largest address of the page, $7F:7DFF (measured), covers only half the map. The video says only that a tile lookup is "actually faster" than a wall list [06:11]. It gives no formula, no "spatial hash", no O(n²) and no cycle count. The split 192 = 128 + 64 is correct arithmetic, but the video never says it. | [VIDEO], [DOC] |
| C2 | L428-433, L664-665, L707, L840, L973-986, L1106 | "SPC700 Dynamic Sound Stealing": when a sound effect fires, the driver "steals music channels cleanly". The simulator marks voice 4, 3 or 2 as "SFX STEAL". | The video says the opposite. The first five voices play music and the last three play sound effects [18:18]. The three wait for the CPU to name a voice and an effect [18:38]. Object sounds use "the second to last sound effect channel" so that they do not disturb the player sounds or the music [39:35]. The code steals voices 4, 3 and 2 (measured: voice 4 after a sword press). All of these are music voices. The simulator teaches a design that the developer avoided on purpose. | [VIDEO], [DOC] |
| C3 | L328-373, L624-630, L698-702, L866-907 | HDMA writes register $2111 (BG3HOFS) on the game screen. Lines 1 to 60 are a static sky, 61 to 120 move at dx × 0.25, 121 to 160 at dx × 0.60, 161 to 210 are the playfield and 211 to 224 are the HUD. The cost is "zero CPU overhead". | The video shows the parallax on the title screen, not in the game [34:08]. The HDMA writes the "background two horizontal scroll register" [35:31], which is $210F (BG2HOFS), not $2111. The table has three bytes per entry: a line count and a two-byte value [35:51]. All band limits, speeds and pixel values on the page are invented. The video names no line numbers. The CPU must build the table and re-enable the channel every frame [36:11], and HDMA itself takes bus cycles from the CPU. The BG3 layer in the game is black tiles [37:13], not mountains. The slider models a screen that does not exist. | [VIDEO], [KNOW] |
| C4 | L681, L824, L386, L618, L1052-1063 | "No hardware division or multiplication unit". Software division costs "~320 cycles" for the HUD and 480 cycles for collision. The optimized versions cost 14 and 12 cycles. | The 5A22 has a hardware multiplier at $4202/$4203 (8 x 8, result at $4216/$4217, 8 cycles) and a divider at $4204 to $4206 (16 / 8, quotient at $4214/$4215). The reviewer fetched the nesdev "Multiplication" page for the multiplier. A binary to decimal conversion is a few hardware divisions, not 320 cycles. The video says only that BCD "makes the math so much easier" [31:44] and that INC and DEC ignore the decimal flag [32:05]. None of the four chart values is in the video or in report 14. The chart is a picture of an invention. | [VIDEO], [KNOW], [VERIFY] divider timing |
| C5 | L636-638, L693-695, L832 | The limit is "32 sprite tiles" per scanline. The fixes are "viewport culling, dummy tile zero relocation, and alternating priority frame cycling" and "dynamic entity sorting". | The video gives two limits: 32 sprites per line [28:34] and 34 8-pixel slivers per line [29:38]. The nesdev "Sprites" page confirms both. Tile zero was the problem, not the fix: the PPU "still counts those transparent sprites" [28:34], so he moves them to an offscreen Y [28:55]. The video names the registers that rotate sprites, then says "leave it as is" [30:21]. The page gives the rejected option as the fix. The objects are "not organized by X or Y" [30:42], so there is no entity sorting. | [VIDEO] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L84, L104, L609, L689, L826 | A "2-year project" with "9,999" floors. | The goal is "level 10,000" or 10,000 chickens [03:50]. A 16-bit packed BCD counter "fits exactly the 10,000" he needs [32:05]. The number 9,999 is the largest value of the counter, not the number of floors. The video gives no development time. The recap jokes about "two weeks" [00:00]. The "two-year" claim comes from report 14, L5, which cites the video for it. | [VIDEO], [VERIFY] |
| M2 | L92, L569 | "ROM SIZE 129 KB". | The video says the world goes on a "4 megabyte ROM chip" [03:08] and that his cartridge ROM is 4 megabytes from bank $C0 [20:58]. No source for 129 KB is given. Report 14 (L184, L203) states it with the same missing source. | [VIDEO], [VERIFY] |
| M3 | L100, L146, L560-562, L601 | "CO-PROCESSORS: NONE (0)". | The page contradicts itself. L146 says the console has "dedicated coprocessors". L560 calls the HDMA unit, the PPU color math and the SPC700 "coprocessor offloading". The video says he did not use Mode 7 or the "extra in cartridge processing chips" [50:53]. So "no cartridge enhancement chip" is right, "zero coprocessors" is wrong. | [DOC], [VIDEO] |
| M4 | L824 | The 65c816 is a "16-bit processor with 8-bit registers". | The accumulator and the index registers switch between 8 and 16 bits with the M and X flags. The video uses the 16-bit mode for the BCD counter [32:05]. The data bus is 8 bits wide. The sentence is reversed. | [KNOW], [VIDEO] |
| M5 | L510, L523-541, L669-674 | Emulators (Mesen, bsnes) start with clean RAM, real consoles do not, so the game "required an explicit boot-clearing loop". "Thorough hardware testing on Mouse Bite Labs PCBs" fixed floating lines. | The video names no emulator and no test on a console. The cartridge segment shows a solder stencil, resin shells and solder paste [45:36 to 46:18]. The cartridge "should be good to go" when he finishes the game [46:55]. The Mouse Bite Labs credit is real [45:58]. The rest of the tab is invented. The video does say that zeroing the map in RAM makes a solid forest [24:47], but that is level generation, not a boot clear. | [VIDEO] |
| M6 | L539, L655-656, L833 | "Sub-screen color subtraction ($2131/$2132)" gives "single-frame hit-stop black flashes" and "elemental spell bursts", and a "Color Math Hardware Inversion". | $2131 is CGADSUB (add or subtract, half, layer enable) and $2132 is COLDATA (the fixed color). The reviewer fetched the nesdev "PPU registers" page. The video uses add and halve, not subtract: BG3 has black tiles, BG1 leaves the subscreen, and the result is half brightness [37:34]. The hit stop pauses "for a few frames" and darkens the background [40:37], not a single black frame. The talisman clouds use four palette colors [42:39], not color math. Nothing inverts. | [VIDEO], [VERIFY] |
| M7 | L386, L393-398, L620, L910-937 | "Packed BCD Hardware Decimal HUD": a chicken kills counter from 0482 with +1, +25 and Reset. | The code does `bcdKillCounter + amount` on a binary integer, then `toString().padStart(4, '0')`. It is a decimal string, not BCD. It clamps at 9999 (measured: 9990 + 25 gives 9999). A decimal-mode ADC wraps to 0000 and sets the carry. The nibble display is correct. In the video, the chicken counter counts down and keeps its leading zeros [33:06]. The level counter counts up and drops them [32:26]. The one real trap in the video, INC and DEC ignore the flag [32:05], is absent from the simulator. | [DOC], [VIDEO] |
| M8 | L333, L628, L699-700 | The H-blank gap is 15 µs. The "V-Blank window (1.3 ms) is too brief for multi-plane background shifts". | An NTSC line is 1364 master clocks, about 63.56 µs, and a frame has 262 lines (nesdev "Timing"). In 224-line mode, 37 lines are blank: about 2.35 ms. In 239-line mode, 22 lines: about 1.4 ms. The value 1.3 ms fits neither. The non-display part of a line is about 85 of 341 dots, about 15.8 µs, so 15 µs is close. The video says only that H-blank is "much shorter than the vertical blank" [35:31]. The reason for HDMA is per-line change, not V-blank length. | [KNOW], [VERIFY] |
| M9 | L8, L10, L1169 | Tailwind and Chart.js come from CDNs. | cdn.tailwindcss.com is the Tailwind development CDN, not for production. The Chart.js link has no version, so a future major version can break the page. In the headless run, both loads failed. The page then had no layout, and `Chart is not defined` was thrown twice, once at load and once on each tab switch. | [DOC], [KNOW] |
| M10 | L802-812 | `filterChapters` reads `event.target`. | The function uses the global `window.event`, which is deprecated. A call without a click throws `Cannot read properties of undefined` (measured). A keyboard activation of the button works only because browsers synthesize a click. The function has no parameter for the button. | [DOC] |
| M11 | L114-130, L220, L293-298, L342, L418, L460, L966-967 | Accessibility. | The five tab buttons have no `role="tab"` and no `aria-selected`. The three canvases have no text alternative and no data table. The two labels have no `for`, so a screen reader does not link them to the inputs (measured). The range slider has no `aria-label`. The voice grid text is 9 and 10 pixels. Stolen voices show only by color and a pulse. Emoji are the only icons. | [DOC] |
| M12 | L169, L217, L223, L610-611, L687-689, L825, L1008 | Bank $7F is "63 kB" and holds the map "explicitly". Bank $7E is "isolated for stack and system state". The chart totals "256 kB". The split "prevents heap fragmentation". | Each WRAM bank is 64 kB. The map is 63 kB of bank $7F, and he names the last 1 kB too [21:18]. The chart puts 63 for the bank and 1 for OAM plus CGRAM, so 64 + 63 + 64 + 64 + 1 = 256 only by this error. The video keeps the objects in the first bank through the 8 kB mirror, to avoid changing the data bank register [21:38 to 21:59]. The banks are not "isolated". There is no heap in this game, so nothing fragments. | [VIDEO], [DOC] |
| M13 | L553-555, L602 | Compilers cause "register thrashing and stack bloat" on the 65c816. Hand assembly beats them. | The video never mentions a compiler. The claim is from report 14. It stands as a lesson without evidence. | [VIDEO] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L199, L706, L839 | "4x I/O Registers ($2140-$2143)", a "4-port bidirectional" handshake. | There are four addresses but "eight separate registers", so a write by one side does not erase the other [12:28 to 12:48]. The page loses the point that the video makes. | [VIDEO] |
| m2 | L146, L287, L313, L525, L569, L584 | `*Zero Star*`, `` `$7F` `` and `$O(n^2)$`. | The page is HTML. The reader sees raw asterisks, backticks and dollar signs (measured in six elements). | [DOC] |
| m3 | L831 | "Layer 3 = 2bpp parallax mountain background" in the game. | In the game, BG3 is black tiles for the darkening effect [37:13]. The mountains on BG3 are on the title screen only [34:28]. | [VIDEO] |
| m4 | L433, L1101 | "Dr. Matt's music engine". | Dr. Matt wrote the music tracks [19:07, 44:42]. Inkbox wrote the engine, because the driver from Nintendo is not free to use [14:08 to 14:29]. | [VIDEO] |
| m5 | L941-948 | Voice roles: Bass, Chords, Melody, Harmony, Percussion. | The video gives five voices "with a list of song data" [18:38]. The roles are invented. | [VIDEO] |
| m6 | L51-67 | Comments about the palette, "NO SVG" and "NO Mermaid". | These are leftover instructions from the page generator. They do not help the reader. | [DOC] |
| m7 | L306, L862 | The start text "Bitwise Shift: (32 << 7) + (32 << 6) + 48". | The script replaces it at load with a longer text that adds "= 4096 + 2048 + 48". The reader sees a flash of different text. The same applies to L371. | [DOC] |
| m8 | L96, L164, L599-600 | The CPU runs at 3.58 MHz. | That is the fast clock. Access to WRAM and to slow ROM runs at 2.68 MHz. A "strict 3.58 MHz cycle budget" (L600) overstates the budget. The video does not give a clock for the main CPU. | [KNOW] |
| m9 | L740-749 | The code destroys and rebuilds each chart on every tab switch, after a 50 ms delay. | This works, but each switch does new work for the same data. With no Chart.js, each switch throws an uncaught error (M9). A lazy first render would be enough. | [DOC] |

## 4. Source-quality audit

- The page has **no citations and no links**. The footer (L582) names the video. The header (L84) gives a project length and a floor count that the video does not give.
- Every number in the three charts (L1008, L1056, L1061, L1102, L1107) is without source. Only the memory sizes 64, 64, 64 match the video [09:01]. The split 5 + 3 voices is correct [18:18].
- All nine chapters and all five matrix rows come from report 14. The page inherits its errors and adds the simulators on top of them.
- The reviewer fetched snes.nesdev.org for the PPU registers (M6, C3), the timing (M8), the sprites (C5) and the multiplier (C4). The divider timing and the HDMA cycle cost still need a primary source.
- Correct content on the page: the three RAM sizes, Mode 1 with BG1 and BG2 at 4bpp and BG3 at 2bpp, the HUD on BG2, 128 sprites, OAM at 544 bytes, the SPC700 at 1.024 MHz, BRR, 64 kB of audio RAM, the 5 + 3 voice split, packed BCD with the decimal flag, the 192 x 168 map in bank $7F, and the Mouse Bite Labs credit.

## 5. Omissions a skeptic would raise

1. **The game design lesson.** The video starts with what makes a game fun: fewer, better actions, a full attack arc and good animation timing [01:06 to 02:48]. The page has no word of it.
2. **The tile streaming.** A 128 x 112 pixel box around the player, a new row or column of tiles into VRAM at the edge, and wrap at the tilemap edges [04:50 to 05:30]. This is the core of the scroll engine.
3. **The data bank register.** 24-bit addresses, code in the second half of the banks, mirrors of the first 8 kB of RAM [20:35 to 21:59]. This is the closest idea to 8086 segments, and the page replaces it with "isolated banks".
4. **The APU handshake.** The IPL boot ROM protocol with $AA, $BB, $CC and the index on port 0 [12:48 to 13:48]. The page calls it a "4-port handshake" and stops.
5. **The sample size trick.** A sample at 16 kHz with the pitch at $0800 instead of $1000 [16:35 to 16:55]. A real engineering trade.
6. **The maze bug and its fix.** Two rooms that are the closest neighbor of each other make islands. The fix is to tunnel to the closest connected room [26:12]. The page says nothing about level generation.
7. **The sprite 0 rule.** The lowest OAM index wins between sprites. Priority bits only order sprites against backgrounds [38:14]. The sprite advice of the page ignores it.
8. **The 9th X bit** for smooth edge scroll [23:03], and the windows plus HDMA stair transition [44:00 to 44:22].
9. **The sponsor** [07:58 to 08:40] and the "maybe" physical release [50:31].

## 6. Use for the learning journey

- **Relevance is medium, but only as ideas.** The SNES is a 65C816 and an SPC700, two dialects that this course does not learn. The hardware claims of the page are wrong too often to study. Do not learn SNES programming from it. Take four ideas from the simulators and rebuild each one on the A side (8086 Assembly, VGA Mode 13h, the lander) with the B side (Fortran) as the laboratory.
- **Keep: the address calculator, rebuilt with the real entry size.** The shift trick of the page is right in form: 192 = 128 + 64 gives two shifts. The game already does the same for the pixel: `pixel_at` in `game/src/common.inc` computes DI = y * 320 + x with `MUL`. The 8086 version of the trick is (y << 8) + (y << 6) + x, because 320 = 256 + 64. A Fortran program can make a table of 200 row offsets and check both versions for all 64,000 pixels, as `check_y.f90` checks 256 of 256 sine values. Then apply the same lookup to the terrain of the lander: a height per column, or a tile per cell, in an array. The lander reads one entry instead of scanning a wall list, which is the real lesson of the video [05:50]. Teach the entry size as part of the lesson: `sine.bin` is 512 bytes for 256 entries, so 2 bytes each, as the SNES tilemap is.
- **Keep: the decimal counter, rebuilt as real BCD.** The lander needs a score and a fuel number on screen. The 8086 has `DAA` and `DAS` for packed BCD after `ADD` and `SUB`, and `AAM` and `AAD` for unpacked digits. A correct simulator adds one byte at a time with carry and wraps at 9999. The Fortran laboratory checks the A side for all 10,000 values against `MOD`, as the 4096-point checks do today. The "talk" segment of the course says "no number formatting" at present. BCD is the smallest way to lift that limit.
- **Keep: the raster table as data, drop the HDMA claims.** The HDMA table is a list of (line count, value) pairs. That is a data table, as `sine.bin` is. VGA has no HDMA, so a Mode 13h program that wants a per-line effect must poll the status port 3DAh in a loop, or not do it. This is a good hardware lesson for the A side: `wait_vsync` in `common.inc` already polls that port for the vertical retrace. The B side can generate a per-line table (for a parallax sky or a wavy horizon) and the A side can play it, as decision D19 splits the roles.
- **Drop: the voice simulator.** The PC speaker has one voice through the PIT. A budget simulator with eight voices teaches nothing for this course. The real lesson of the video is the split of voices and the handshake over I/O ports, which maps to `IN` and `OUT` on the 8086.
- **Keep as a review rule: no chart without a measured file.** Every chart on this page is invented. In this project, the numbers on the pages come from the test files (`Y.BIN`, `P3D.BIN`, `R3D.BIN`). Keep that rule for any future page.
- **Better source:** the video itself for the ideas, the WDC 65C816 and the Intel 8086 manuals for instruction facts, and snes.nesdev.org for SNES register facts.

## 7. Pass-2 verification list

- [ ] Confirm the divider timing of the 5A22 ($4204 to $4206, 16 cycles) on the nesdev MMIO registers page (C4).
- [ ] Confirm the HDMA bus cost per channel per line, to put a number on "zero CPU overhead" (C3).
- [ ] Watch 35:31 to 36:11 and check whether the on-screen code writes $210F (BG2HOFS) and which HDMA transfer mode it uses (C3).
- [ ] Watch 06:53 to 07:15 and check the on-screen map size and address of the world in bank $7F, to confirm 2 bytes per tile (C1).
- [ ] Find a source for "129 KB" and "two years" (M1, M2). Check the itch.io page of the game for the ROM size.
- [ ] Confirm the V-blank length for the display mode the game uses, 224 or 239 lines (M8).
- [ ] Watch 37:13 to 37:54 and read the color math registers on screen (M6).
- [ ] Open the page without a network and confirm the loss of layout and the thrown errors (M9).
- [ ] Test the page with a keyboard only and with a screen reader (M10, M11).
- [ ] Check the 65C816 cycle cost of ADC in decimal mode, to settle "zero extra cycles" (M7).
