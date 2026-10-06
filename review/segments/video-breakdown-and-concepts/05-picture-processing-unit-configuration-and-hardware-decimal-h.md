---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 21-24
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M1, D14-M3, D14-M7, D14-M8, D14-m2]
---

# Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 04:10](https://www.youtube.com/watch?v=j_2bo7ng65E&t=250s). The video gives mode 1, layer 1 for the environment and layer 2 for the HUD. The packed BCD counters start at 31:44.

> Parent section: **Video Structure and Narrative Progression**


The video transitions to the console’s dual Picture Processing Units (PPU1 and PPU2) and explains the selection of Background Mode 11. Inkbox outlines how graphical priorities are organized across three distinct planes: a 4 bits-per-pixel (16-color) interactive terrain playfield on Background Layer 1, a static heads-up display on Background Layer 2, and distant background art on Background Layer 3 rendered at 2 bits per pixel (4 colors)1. Within this section, the presentation breaks down the implementation of the game's dynamic on-screen counters1. Rather than burning clock cycles on integer division algorithms to parse base-10 values from binary registers, the engine stores the 9,999 chicken kill requirement, floor depth, and coin metrics in Packed Binary-Coded Decimal (BCD)1. Activating the 65c816 decimal flag (SED) allows the hardware to calculate multi-digit carries automatically during standard addition and subtraction instructions1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M1 | major | VIDEO VERIFY | verify | L5, L19, L23, L100, L105, L194 | _Claim:_ "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement". _Problem:_ The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. |
| D14-M3 | major | KNOW VIDEO VERIFY | verify | L23, L57, L105, L176 | _Claim:_ The CPU lacks "hardware division instructions", and decimal output "relies on integer division and modulo operations, both of which are expensive". _Problem:_ The 5A22 has a hardware unit: $4202 and $4203 start an 8 x 8 unsigned multiply, $4204 to $4206 start a 16 / 8 unsigned divide, and $4214 to $4217 give the quotient, product and remainder (snes.nesdev.org MMIO registers, checked by WebFetch). The video does not give division cost as the reason. Inkbox uses BCD because "it makes the math so much easier" (32:05). The document also omits the trap of the video: INC and DEC ignore the decimal flag, so he must use ADC (32:05 to 32:26). The "LSR and AND" nibble split at L106 is not in the video. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |
| D14-M8 | major | VIDEO | open | L23, L27, L84, L104, L111, L178 | _Claim:_ In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup. _Problem:_ In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). |
| D14-m2 | minor | VIDEO KNOW | open | L6, L15, L23, L55 | _Claim:_ "Ricoh 5A22", "3.58 MHz", "dual PPUs (PPU1 and PPU2)", "absence of an integrated memory management unit". _Problem:_ The video names none of these. The values are correct hardware facts, but they are not from the video. |

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
