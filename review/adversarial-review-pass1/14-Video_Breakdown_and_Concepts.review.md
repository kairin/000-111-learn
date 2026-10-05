---
target: ../segments/Video_Breakdown_and_Concepts.md
segments: ../segments/video-breakdown-and-concepts/
video: https://www.youtube.com/watch?v=j_2bo7ng65E
pass: 1
date: 2026-10-05
---

# Adversarial review: "Technical Architecture and Systems Deconstruction of Inkbox's 'It Took Every SNES Hardware Trick To Make My Game'"

The source video is "It Took Every SNES Hardware Trick To Make My Game" by Inkbox (51:14). The reviewer read the full caption transcript of the video. The reviewer also read six web pages to check high-stakes facts: the techeblog article that the document cites as source 1, the Hackaday article (source 2), the itch.io page of the game (source 8), the GitHub repository InkboxSoftware/SimpleSNESSoundEngine, and two pages of snes.nesdev.org (PPU registers, MMIO registers, Timing).

The document shows its nine formulas as small images (L35, L60, L138, L142 to L146, L181). The reviewer decoded the nine images. This review quotes their content in plain text. A reader of the document cannot search or copy these formulas.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (internal contradiction, arithmetic, missing data) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the transcript of the source video, with a timestamp |

## 1. Goals and objectives

1. Describe the structure and content of the video: what Inkbox did to finish the game Zero Star on the SNES.
2. Report the hardware facts and the engineering solutions of the video correctly (memory, PPU, HDMA, sprites, collision, color math, audio, cartridge).
3. Map each part of the video to a hardware subsystem (the two tables).
4. Draw lessons for constrained systems development.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Structure and content | **No** | The nine "stages" do not match the video (M7). The document omits the first 8 minutes, the tile streaming, the bank register, the APU handshake, the windows and the release (section 5). It adds a hardware verification section that the video does not contain (C5). |
| 2. Facts and solutions | **No** | The document reverses the sprite fix (C2), moves the parallax to the wrong layer and screen (C1), invents a collision formula that is also wrong (C3), reverses the sound-effect design (C4), and says that the CPU has no hardware division (M3). |
| 3. Mapping tables | **Partly** | The subsystem names are right. The challenge and solution cells repeat the errors C1 to C5. |
| 4. Lessons | **Partly** | "Hardware counts work you cannot see" and "use the hardware pipelines" are fair lessons. The compiler lesson is not from the video and cites a video about Unity (M6). |

**Overall confidence in the document:** Low. Almost every claim cites source 1, a news article, not the video. Where the video is specific, the document often says the opposite.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L27, L58, L84, L111, L117-133, L179 | HDMA writes register $2111 (BG3HOFS) for mountain parallax in the game, with bands at scanlines 60, 120, 160 and 210 and rates dx*0.25 and dx*0.50 | The video puts the parallax on the title screen, not in the game (34:08). The far mountains sit on layer 3, and the clouds that scroll sit on layer 2 (34:28). At 35:31 Inkbox says that he writes "the background two horizontal scroll register". That register is $210F, not $2111. The table has three bytes per entry: a line count and a two-byte value (35:51). The scanline numbers and the rates in the diagram are not in the video. In the game, the only HDMA scroll effect moves the inventory selection on layer 2 (33:47, 36:31). | [VIDEO], [KNOW], [DOC] |
| C2 | L31, L59, L138, L180, L200 | The engine sorts entities vertically, maps culled actors to transparent "tile zero", and cycles sprite priority across alternating frames | The video says the opposite. At 28:34 the five unused sprites of each coin already point to transparent tile zero. The PPU "still counts those transparent sprites" toward the 32 per line, so tile zero is the problem. The fix moves a tile-zero sprite "down to an offscreen value" (28:55). At 30:08 Inkbox says that registers exist to rotate sprites in OAM, but he decides to "leave it as is for now". At 30:55 he says that the objects are "not organized by X or Y". The value "Y = 224" in image 3 is not in the video. | [VIDEO] |
| C3 | L35, L60, L142-147, L181 | Pairwise collision is O(n^2) or O(n*m). The map in bank $7F is a "spatial hash grid". Address = Base + (Y*192) OR X, and Y*192 = (Y<<7) OR (Y<<6). Off-screen enemies run on "lightweight timer routines" | The video gives the idea only: from the X and Y of the player, with the scroll, find the tile under the player (05:50). Inkbox says this is "faster" than a loop over a wall list (06:11). He gives no formula, no complexity class and no cycle counts. The formula in image 9 is also wrong. Shift results must be added, not combined with OR: for Y = 3, (3<<7) OR (3<<6) = 448, but 3*192 = 576. The OR between Y*192 and X also fails, for example Y = 1, X = 65 gives 193, not 257. The formula also assumes one byte per tile. The video says that 192 x 168 tiles fill 63 K (06:53), so each tile takes two bytes. The video does not describe timer routines for off-screen enemies. Object collision uses generic hitbox functions against the player (38:55) and against on-screen chickens (42:19). | [VIDEO], [DOC], [KNOW] |
| C4 | L43, L62, L94, L162, L183 | Three "preemptive" sound-effect voices. The driver "preempts lower-priority musical voices and restores them cleanly" | The video says that voices 0 to 4 play music and that the last three voices wait on standby for the CPU (18:18 to 18:38). The CPU tells the APU "which voice channel to run the effect on". At 39:35 object sounds play on a channel "reserved for object sounds", so they do not disturb the player sounds or the music. No voice is taken from the music. | [VIDEO] |
| C5 | L45-47, L63, L164-168, L184 | Inkbox flashed ROM chips, tested cartridges on retail consoles, found divergences between Mesen, bsnes and real hardware, and added "boot-clearing loops" | The video has none of this. The cartridge work is a solder mask and transparent shells from the sponsor (07:36 to 08:40), the arrival of the parts (45:36 to 46:18), and solder paste (46:18). At 46:55 Inkbox says that the cartridge is good to go "as soon as I finish the game". The itch.io page tells players to use Mesen or bsnes and says nothing about cartridges (checked by WebFetch). The emulator divergence, the uninitialized RAM problem and the boot-clearing loops are inventions. | [VIDEO], [VERIFY] |
| C6 | L5-203 (all citations) | Each sentence cites "1", and the text names the video as the subject | Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. | [DOC], [VERIFY] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L5, L19, L23, L100, L105, L194 | "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement" | The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. | [VIDEO], [VERIFY] |
| M2 | L19, L56, L99-100, L177 | Bank $7F holds the world and bank $7E holds the stack and entity arrays, which "prevents stack overflows" and "heap fragmentation". Tunnels are "single-tile pathways" from "deterministic Manhattan vectors" that "avoid loops" | The video says that the world fills 63 K of the second RAM bank (06:31 to 06:53). The objects were first planned for $7F0000, but Inkbox moved them to the first bank to avoid data bank register swaps (21:18 to 21:59). There is no heap, so there is no fragmentation. Rooms come from the random number routine with rejection (25:08). Tunnels are rooms "with either a small width or height" (25:50), not single tiles. The first method made islands (26:12). The fix tunnels to the closest connected room. Inkbox calls it "not perfect" and says that it can give very long tunnels (26:32). Nothing is deterministic. | [VIDEO] |
| M3 | L23, L57, L105, L176 | The CPU lacks "hardware division instructions", and decimal output "relies on integer division and modulo operations, both of which are expensive" | The 5A22 has a hardware unit: $4202 and $4203 start an 8 x 8 unsigned multiply, $4204 to $4206 start a 16 / 8 unsigned divide, and $4214 to $4217 give the quotient, product and remainder (snes.nesdev.org MMIO registers, checked by WebFetch). The video does not give division cost as the reason. Inkbox uses BCD because "it makes the math so much easier" (32:05). The document also omits the trap of the video: INC and DEC ignore the decimal flag, so he must use ADC (32:05 to 32:26). The "LSR and AND" nibble split at L106 is not in the video. | [KNOW], [VIDEO], [VERIFY] |
| M4 | L39, L61, L86, L152-157, L182 | Hit stop is a "single-frame black flash". The engine writes $2132 and enables subtraction in $2131, "inverting the display". The talismans use color math: fire trails, ice "shifts color palettes", gold and peach give "screen-wide color flashes" | The video describes one trick: layer 3 holds black tiles, layer 1 leaves the subscreen, and "add and divide by two" halves the brightness (37:13 to 37:34). That is addition, not subtraction, and no inversion. The same trick darkens the background during hit stop, which pauses the game "for a few frames" (40:37). The four talisman effects are four palette colors of the same cloud animation (42:39). Three talismans spawn new objects (42:59). The video never says that the ice talisman freezes anything or that a screen flashes. | [VIDEO] |
| M5 | L43, L91, L161 | The APU and CPU communicate through "four 8-bit bidirectional I/O registers" | The four addresses $2140 to $2143 are correct. But the video stresses that these are "eight separate registers" (12:28 to 12:48): four per direction, so a write on one side does not erase the value of the other side. The handshake of the boot ROM ($AA and $BB on ports 0 and 1, address on ports 2 and 3, then $CC, 12:48 to 13:48) is the main content of the audio part, and the document omits it. The "16-bit DSP" label at L92 is not in the video. | [VIDEO], [KNOW] |
| M6 | L15, L189 | Inkbox "shows how modern compilers introduce register-thrashing and memory bloat", and hand assembly "can outperform generic compiler optimizations" | The video does not discuss compilers. It says only "written in pure assembly" (00:00). L189 cites source 10 for the compiler claim. Source 10 is a video about Unity and Mono, not about the 65c816. | [VIDEO], [DOC] |
| M7 | L11-47, L203 | The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository | The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. | [VIDEO] |
| M8 | L23, L27, L84, L104, L111, L178 | In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup | In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). | [VIDEO] |
| M9 | L31, L59, L137, L180 | The PPU renders "a maximum of 32 sprite tiles" per scanline, and "lower-priority sprites are dropped" | The limit is 32 sprites per line and also 34 slivers of 8 pixels per line (29:38 to 29:59). With 16 x 16 sprites, 24 objects plus the player give 48 slivers, so only 17 objects drew. The document omits the sliver rule, which was the real cause of the lost player sprite. | [VIDEO], [KNOW] |
| M10 | L43, L62, L162 | Inkbox wrote the driver "due to the lack of modern, modular sound drivers" | The video says that "there are lots of SNES sound engines" that he could use (14:08 to 14:29). He writes his own because the Nintendo driver is copyrighted and because he wants to learn. The repository SimpleSNESSoundEngine exists on GitHub with an MIT license and uses SPCASM (checked by WebFetch). | [VIDEO], [VERIFY] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L110 | HDMA transfers happen in "15-microsecond horizontal blanking periods" | The nesdev Timing page gives 1364 master clocks per line, with active video from clock 88 to 1112. The rest is about 340 clocks, or 15.8 microseconds, but it includes the borders. The usable HDMA window is shorter. The value is a fair approximation, not a video fact. | [VERIFY] |
| m2 | L6, L15, L23, L55 | "Ricoh 5A22", "3.58 MHz", "dual PPUs (PPU1 and PPU2)", "absence of an integrated memory management unit" | The video names none of these. The values are correct hardware facts, but they are not from the video. | [VIDEO], [KNOW] |
| m3 | L7 | Background pixel art "by Hornests" | The captions do not name Hornests. Source 1 says it. Pass 2 must check the credits of the game. | [VERIFY] |
| m4 | L137 | OAM holds 544 bytes: a 512-byte table and a 32-byte table with the ninth X bit | This is correct. The video uses the high X bit in the second OAM section for smooth scrolling at the screen edges (23:03 to 23:44). | [VIDEO], [KNOW] |
| m5 | L99 | "zero-page pointers" | The 65c816 has a direct page, not a zero page. The video does not use either term. | [KNOW] |
| m6 | L162 | "such as printing talismans, taking damage, or dying" | The player throws talismans (41:58). The word "printing" is wrong. | [VIDEO] |
| m7 | L11, L190 | HDMA is a "hardware coprocessor" | HDMA is a function of the DMA controller in the CPU package, not a coprocessor. The video calls it "a hardware feature" (35:11). | [KNOW], [VIDEO] |
| m8 | L35, L60, L138, L142-146, L181 | Formulas shown as images | All nine formulas are images. A screen reader cannot read them. A reader cannot search or copy them. The decoded content is: O(n^2), O(1), Y = 224, n, m, O(n * m), (x, y), the address formula and the shift formula. | [DOC] |
| m9 | L205-216 | Ten works cited | Sources 5, 6 and 10 are a video about a different topic, a live stream and a video about Unity. They have no link to this video. Source 2 (Hackaday) has one sentence about the game (checked by WebFetch), but the text cites it for the structure and the lessons of the video. | [DOC], [VERIFY] |
| m10 | L203 | "a masterclass in deterministic hardware utilization, mechanical sympathy" | Praise with no measure. The video calls the result "not perfect" (26:32) and "an early pre-release" (itch.io page). | [DOC] |
| m11 | L6, L184 | A "129-kilobyte ROM image" | This is correct. The itch.io page gives 129 kB (checked by WebFetch). The video does not give the size. | [VERIFY] |

## 4. Source-quality audit

- The document lists 10 sources. The text cites 1, 2, 3, 5, 6, 9 and 10. It cites 4, 7 and 8 nowhere.
- Source 1 (techeblog) gets more than 100 citations: almost every sentence. The video (source 3) gets three citations, each together with source 1. A reader cannot tell which claim comes from the video.
- The reviewer fetched source 1. The article is short. It names "two years", "129-kilobyte ROM", mode 1 with three layers, HDMA for scroll registers, 128 sprites with 32 per line, five music voices plus three effect voices, Hornests and Mouse Bite Labs. It does not support the collision formula, the color math, the sprite cycling, the emulator divergence or the compiler claims.
- Source 2 (Hackaday) has one sentence about the game. The text cites it for the nine stages (L11), the ROM release (L47) and the lessons (L188, L194).
- Source 10 is "The Real Reason Unity Is Finally Dropping Mono". The text cites it for compiler behavior on the 65c816 (L189).
- Sources 5 and 6 are unrelated YouTube links. The bibliography looks padded.
- The "[cite: 1, 2]" cells in the two tables are raw generation artifacts.

## 5. Omissions a skeptic would raise

1. **The game design.** The video starts with fun: fewer buttons for the same action, the attack blind spot, the animation timing (01:06 to 02:48). The document has none of it.
2. **The scroll engine.** The 128 x 112 pixel box around the player, the row and column streaming into VRAM, and the wrap at the tilemap edges (04:50 to 05:30). This part explains why collision changed.
3. **The data bank register.** The 24-bit address, the 4 MB ROM from bank $C0, the code in the second half of each bank, the 8 K low RAM mirror, and the choice to keep objects in the first bank (20:35 to 21:59). This is the main memory lesson of the video.
4. **The APU boot handshake.** The IPL ROM protocol on ports 0 to 3 (12:48 to 13:48), the sample directory with four bytes per entry (14:50), and the resample trick: 16 kHz samples with pitch $0800 instead of $1000 (16:35 to 17:15).
5. **The object system.** 32 bytes per object, the 9-byte prototype, the sine lookup table for the coin float, the shared action function, the front and back insertion for render order (19:34 to 20:35, 27:13 to 27:54, 41:18).
6. **The sprite 0 rule.** Priority bits order sprites against backgrounds only. Between sprites, the lowest OAM index wins, so the inventory and talisman sprites use slot 0 (38:14 to 38:34).
7. **Windows.** The staircase transition uses one window and an HDMA table with 14 sections of 16 lines (43:19 to 44:42). The document never mentions windows.
8. **The sponsor and the release.** PCBWay sponsors the video (07:58). The game is free online, and a physical release is "if I do it" with a poll (50:31). The document presents the physical release as done.
9. **The errors of the video.** The captions say "16x6" tiles and "NES cartridge" at 03:08. A good breakdown would note the ASR errors and the slip.

## 6. Use for the learning journey

- **A side (Assembly): keep** the "look up, do not search" idea (05:50). It is the same idea as `pixel_at` in `game/src/common.inc`: `DI = y * 320 + x`. The 8086 has `MUL`, and the routine uses it. A shift form exists too: 320 = 256 + 64, so `y * 320 = (y << 8) + (y << 6)`. Use `ADD` here, never `OR`. The wrong formula in C3 is a good negative example for a review note.
- **B side (Fortran): keep** the exhaustive check pattern. A Fortran checker can compute `y * 320 + x` for all 200 rows and compare the Assembly table, as `check_y.f90` does for the sine table.
- **A side: keep** the decimal counter lesson (31:44 to 32:46). The 8086 has `DAA` and `AAM`, not a decimal flag. The trap is the same shape: `INC` does not set the carry, so a decimal counter needs `ADD` and `DAA`. **B side:** a Fortran checker tests a BCD counter against `MOD` for all values 0 to 9999, the same way test 1 covers 256 of 256 angles.
- **Both sides: keep** "tables made ahead of time". The HDMA table (line count, value) and the sine table for the coin float are data tables. In this project, Fortran makes `sine.bin`, and Assembly plays it (decision D19). A raster table for Mode 13h row effects is the same pattern.
- **A side: note** the beam timing. VGA has a retrace flag on port 3DAh, and `wait_vsync` in `common.inc` uses it. VGA has no HDMA. An 8086 program that wants a per-row effect must do it with the CPU, or not at all. Mode X page flips (decision D20) are the realistic form.
- **Both sides: consider** a maze test. Rooms, tunnels and "closest connected room" (24:26 to 26:53) fit a later level generator. A Fortran flood fill can check that every room is reachable. A generator with the first bug of the video (closest neighbor, 26:12) must fail that check, as tests 2b and 3b must fail.
- **A side: note** the memory analogy. The SNES bank:offset with a data bank register (20:35) is close to the 8086 segment:offset with `DS`. The video shows why a program keeps hot data where the current bank reaches it. The same reason applies to `DS` on the 8086.
- **Ignore** the collision formula, the HDMA diagram, the priority cycling, the color subtraction, the voice preemption and the silicon section of the document. They are not from the video, and some are wrong.
- **Do not** turn this into an SNES course. The 65c816 and the SPC700 are other dialects. The course stays with the 8086 on DOS and modern Fortran as the laboratory.

## 7. Pass-2 verification list

- [ ] Open the game in an emulator and read the counter limit: 9999 or 10,000 (M1).
- [ ] Check the credits of the game for Hornests (m3) and the itch.io page for a release date.
- [ ] Confirm the register of the BG2 horizontal scroll ($210F) and the HDMA mode for a two-byte write on the nesdev wiki (C1).
- [ ] Confirm the 34-sliver rule and the "time over" flag in a primary source (M9).
- [ ] Confirm the hardware multiply and divide timings of the 5A22 (M3).
- [ ] Measure the H-blank window that HDMA can use (m1).
- [ ] Read the SimpleSNESSoundEngine README for the voice assignment and the CPU to APU protocol (C4, M10).
- [ ] Check whether any later source reports hardware tests of the cartridge (C5).
