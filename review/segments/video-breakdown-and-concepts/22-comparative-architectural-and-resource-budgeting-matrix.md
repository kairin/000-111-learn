---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 170-185
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C1, D14-C2, D14-C3, D14-C4, D14-C5, D14-C6, D14-M2, D14-M3, D14-M4, D14-M8, D14-M9, D14-m8, D14-m11]
---

# Comparative Architectural and Resource Budgeting Matrix

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14). The video does not give a budget matrix. The CPU has hardware multiply and divide registers, which this part denies.

The following table contrasts the native hardware limits of the Super Nintendo against the low-level software solutions implemented in *Zero Star*:

| Architecture Domain | Hardware Limit / Metric | Computational Bottleneck | Software Engineering Solution |
| :---- | :---- | :---- | :---- |
| **CPU Processing** \[cite: 1, 2\] | Ricoh 5A22 core running at 3.58 MHz1. | Low cycle budget per frame; lack of native division instructions1. | Pure 65c816 assembly; Packed BCD HUD arithmetic via decimal flag (SED)1. |
| **Work Memory (WRAM)** \[cite: 1, 6\] | 128 kB split into two 64 kB banks (\$7E/\$7F)1. | Cannot allocate single buffers exceeding 64 kB; risk of heap fragmentation1. | Bank \$7F dedicated to a 63 kB procedural map; Bank \$7E reserved for system stack and arrays1. |
| **Video Engine Modes** \[cite: 1, 2\] | Mode 1: two 4bpp layers, one 2bpp layer1. | High color depths consume VRAM bandwidth and tile limits1. | Layer 1 allocated to terrain (4bpp); Layer 2 to HUD (4bpp); Layer 3 to parallax background (2bpp)1. |
| **Direct Memory Access** \[cite: 1, 5\] | DMA (V-Blank) & HDMA (H-Blank)1. | V-Blank window is too short for massive runtime tile reloads1. | HDMA writes horizontal scroll registers per scanline to generate multi-plane parallax1. |
| **Sprite Hardware (OAM)** \[cite: 1\] | 128 total sprites; 32 sprites per scanline maximum1. | Overcrowded scanlines drop sprites, causing visual flicker and missing entities1. | Dynamic OAM table cycling; viewport culling; mapping inactive sprites to dummy tile 01. |
| **Collision Engine** \[cite: 1\] | Software-driven bounding box physics1. | Pairwise checks scale quadratically (![][image1]), dropping frame rates1. | Constant-time ![][image2] memory hashing into Bank \$7F; off-screen actor updates culled1. |
| **Visual Color Math** \[cite: 1\] | Sub-screen color addition and subtraction1. | Modifying CGRAM palettes during active frames causes bus contention1. | Real-time color subtraction for hit-stop black flashes; sub-screen blending for talisman effects1. |
| **Audio Processing** \[cite: 1, 2, 9\] | Sony SPC700 \+ DSP with 64 kB ARAM1. | Asynchronous bus; audio memory isolated from main CPU1. | Custom SPC700 driver; BRR compression; dynamic 5-voice music and 3-voice SFX allocation1. |
| **Cartridge Physical Bus** \[cite: 1, 2, 3\] | Standard Mask ROM addressing space (up to 4 MB)2. | Electrical timing quirks and uninitialized RAM discrepancies on real hardware1. | 129 kB ROM image verified on Mouse Bite Labs PCBs using retail consoles1. |

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C1 | critical | VIDEO KNOW DOC | open | L27, L58, L84, L111, L117-133, L179 | _Claim:_ HDMA writes register $2111 (BG3HOFS) for mountain parallax in the game, with bands at scanlines 60, 120, 160 and 210 and rates dx*0.25 and dx*0.50. _Problem:_ The video puts the parallax on the title screen, not in the game (34:08). The far mountains sit on layer 3, and the clouds that scroll sit on layer 2 (34:28). At 35:31 Inkbox says that he writes "the background two horizontal scroll register". That register is $210F, not $2111. The table has three bytes per entry: a line count and a two-byte value (35:51). The scanline numbers and the rates in the diagram are not in the video. In the game, the only HDMA scroll effect moves the inventory selection on layer 2 (33:47, 36:31). |
| D14-C2 | critical | VIDEO | open | L31, L59, L138, L180, L200 | _Claim:_ The engine sorts entities vertically, maps culled actors to transparent "tile zero", and cycles sprite priority across alternating frames. _Problem:_ The video says the opposite. At 28:34 the five unused sprites of each coin already point to transparent tile zero. The PPU "still counts those transparent sprites" toward the 32 per line, so tile zero is the problem. The fix moves a tile-zero sprite "down to an offscreen value" (28:55). At 30:08 Inkbox says that registers exist to rotate sprites in OAM, but he decides to "leave it as is for now". At 30:55 he says that the objects are "not organized by X or Y". The value "Y = 224" in image 3 is not in the video. |
| D14-C3 | critical | VIDEO DOC KNOW | open | L35, L60, L142-147, L181 | _Claim:_ Pairwise collision is O(n^2) or O(n*m). The map in bank $7F is a "spatial hash grid". Address = Base + (Y*192) OR X, and Y*192 = (Y<<7) OR (Y<<6). Off-screen enemies run on "lightweight timer routines". _Problem:_ The video gives the idea only: from the X and Y of the player, with the scroll, find the tile under the player (05:50). Inkbox says this is "faster" than a loop over a wall list (06:11). He gives no formula, no complexity class and no cycle counts. The formula in image 9 is also wrong. Shift results must be added, not combined with OR: for Y = 3, (3<<7) OR (3<<6) = 448, but 3*192 = 576. The OR between Y*192 and X also fails, for example Y = 1, X = 65 gives 193, not 257. The formula also assumes one byte per tile. The video says that 192 x 168 tiles fill 63 K (06:53), so each tile takes two bytes. The video does not describe timer routines for off-screen enemies. Object collision uses generic hitbox functions against the player (38:55) and against on-screen chickens (42:19). |
| D14-C4 | critical | VIDEO | open | L43, L62, L94, L162, L183 | _Claim:_ Three "preemptive" sound-effect voices. The driver "preempts lower-priority musical voices and restores them cleanly". _Problem:_ The video says that voices 0 to 4 play music and that the last three voices wait on standby for the CPU (18:18 to 18:38). The CPU tells the APU "which voice channel to run the effect on". At 39:35 object sounds play on a channel "reserved for object sounds", so they do not disturb the player sounds or the music. No voice is taken from the music. |
| D14-C5 | critical | VIDEO VERIFY | verify | L45-47, L63, L164-168, L184 | _Claim:_ Inkbox flashed ROM chips, tested cartridges on retail consoles, found divergences between Mesen, bsnes and real hardware, and added "boot-clearing loops". _Problem:_ The video has none of this. The cartridge work is a solder mask and transparent shells from the sponsor (07:36 to 08:40), the arrival of the parts (45:36 to 46:18), and solder paste (46:18). At 46:55 Inkbox says that the cartridge is good to go "as soon as I finish the game". The itch.io page tells players to use Mesen or bsnes and says nothing about cartridges (checked by WebFetch). The emulator divergence, the uninitialized RAM problem and the boot-clearing loops are inventions. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M2 | major | VIDEO | open | L19, L56, L99-100, L177 | _Claim:_ Bank $7F holds the world and bank $7E holds the stack and entity arrays, which "prevents stack overflows" and "heap fragmentation". Tunnels are "single-tile pathways" from "deterministic Manhattan vectors" that "avoid loops". _Problem:_ The video says that the world fills 63 K of the second RAM bank (06:31 to 06:53). The objects were first planned for $7F0000, but Inkbox moved them to the first bank to avoid data bank register swaps (21:18 to 21:59). There is no heap, so there is no fragmentation. Rooms come from the random number routine with rejection (25:08). Tunnels are rooms "with either a small width or height" (25:50), not single tiles. The first method made islands (26:12). The fix tunnels to the closest connected room. Inkbox calls it "not perfect" and says that it can give very long tunnels (26:32). Nothing is deterministic. |
| D14-M3 | major | KNOW VIDEO VERIFY | verify | L23, L57, L105, L176 | _Claim:_ The CPU lacks "hardware division instructions", and decimal output "relies on integer division and modulo operations, both of which are expensive". _Problem:_ The 5A22 has a hardware unit: $4202 and $4203 start an 8 x 8 unsigned multiply, $4204 to $4206 start a 16 / 8 unsigned divide, and $4214 to $4217 give the quotient, product and remainder (snes.nesdev.org MMIO registers, checked by WebFetch). The video does not give division cost as the reason. Inkbox uses BCD because "it makes the math so much easier" (32:05). The document also omits the trap of the video: INC and DEC ignore the decimal flag, so he must use ADC (32:05 to 32:26). The "LSR and AND" nibble split at L106 is not in the video. |
| D14-M4 | major | VIDEO | open | L39, L61, L86, L152-157, L182 | _Claim:_ Hit stop is a "single-frame black flash". The engine writes $2132 and enables subtraction in $2131, "inverting the display". The talismans use color math: fire trails, ice "shifts color palettes", gold and peach give "screen-wide color flashes". _Problem:_ The video describes one trick: layer 3 holds black tiles, layer 1 leaves the subscreen, and "add and divide by two" halves the brightness (37:13 to 37:34). That is addition, not subtraction, and no inversion. The same trick darkens the background during hit stop, which pauses the game "for a few frames" (40:37). The four talisman effects are four palette colors of the same cloud animation (42:39). Three talismans spawn new objects (42:59). The video never says that the ice talisman freezes anything or that a screen flashes. |
| D14-M8 | major | VIDEO | open | L23, L27, L84, L104, L111, L178 | _Claim:_ In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup. _Problem:_ In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). |
| D14-M9 | major | VIDEO KNOW | open | L31, L59, L137, L180 | _Claim:_ The PPU renders "a maximum of 32 sprite tiles" per scanline, and "lower-priority sprites are dropped". _Problem:_ The limit is 32 sprites per line and also 34 slivers of 8 pixels per line (29:38 to 29:59). With 16 x 16 sprites, 24 objects plus the player give 48 slivers, so only 17 objects drew. The document omits the sliver rule, which was the real cause of the lost player sprite. |
| D14-m11 | minor | VERIFY | verify | L6, L184 | _Claim:_ A "129-kilobyte ROM image". _Problem:_ This is correct. The itch.io page gives 129 kB (checked by WebFetch). The video does not give the size. |
| D14-m8 | minor | DOC | open | L35, L60, L138, L142-146, L181 | _Claim:_ Formulas shown as images. _Problem:_ All nine formulas are images. A screen reader cannot read them. A reader cannot search or copy them. The decoded content is: O(n^2), O(1), Y = 224, n, m, O(n * m), (x, y), the address formula and the shift formula. |

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
