---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 102-107
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M1, D14-M3, D14-M8]
---

# Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 32:05](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1925s). The video says that BCD makes the math easier and that INC and DEC ignore the decimal flag. It does not say that the CPU lacks division.

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The console's PPU offers eight discrete graphics modes, each balancing tile color depth against the number of available background planes1. *Zero Star* utilizes Mode 1, which provides two 16-color (4 bits-per-pixel) background layers alongside one 4-color (2 bits-per-pixel) background layer1. Layer 1 displays the playable dungeon map, Layer 2 renders the user interface overlay, and Layer 3 hosts distant mountain art1.  
A major computational challenge in retro programming is updating multi-digit base-10 interface displays1. On modern architectures, converting binary integers to displayable decimal characters relies on integer division and modulo operations, both of which are expensive on a 3.58 MHz CPU lacking hardware division instructions1. Repeatedly executing software division algorithms to update counters for 9,999 chickens, dungeon levels, and player coins would consume substantial frame cycles1.  
Inkbox solves this by maintaining game metrics in Packed Binary-Coded Decimal (BCD)1. In this format, each byte stores two 4-bit nibbles representing values from 0 to 9, allowing a single byte to represent decimal numbers from 00 to 991. By using the 65c816 decimal mode flag (SED), standard instructions such as ADC (Add with Carry) and SBC (Subtract with Borrow) execute in hardware decimal arithmetic1. Carries propagate between nibbles automatically without runtime division1. To push updated tallies to Background Layer 2, the engine separates each nibble using logical shifts (LSR) and masks (AND), using the result to index the appropriate numeric character tile1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M1 | major | VIDEO VERIFY | verify | L5, L19, L23, L100, L105, L194 | _Claim:_ "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement". _Problem:_ The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. |
| D14-M3 | major | KNOW VIDEO VERIFY | verify | L23, L57, L105, L176 | _Claim:_ The CPU lacks "hardware division instructions", and decimal output "relies on integer division and modulo operations, both of which are expensive". _Problem:_ The 5A22 has a hardware unit: $4202 and $4203 start an 8 x 8 unsigned multiply, $4204 to $4206 start a 16 / 8 unsigned divide, and $4214 to $4217 give the quotient, product and remainder (snes.nesdev.org MMIO registers, checked by WebFetch). The video does not give division cost as the reason. Inkbox uses BCD because "it makes the math so much easier" (32:05). The document also omits the trap of the video: INC and DEC ignore the decimal flag, so he must use ADC (32:05 to 32:26). The "LSR and AND" nibble split at L106 is not in the video. |
| D14-M8 | major | VIDEO | open | L23, L27, L84, L104, L111, L178 | _Claim:_ In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup. _Problem:_ In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). |

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
