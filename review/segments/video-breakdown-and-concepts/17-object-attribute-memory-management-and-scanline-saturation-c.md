---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 135-139
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C2, D14-C6, D14-M9, D14-m4, D14-m8]
---

# Object Attribute Memory Management and Scanline Saturation Controls

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 29:38](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1778s). The video gives the 34-sliver rule: only 17 of 24 objects drew. No vertical sort and no priority cycling.

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The console’s Object Attribute Memory stores 544 bytes of sprite metadata describing up to 128 dynamic objects1. A primary 512-byte table defines X/Y coordinates, tile indices, and attribute flags, while a secondary 32-byte table holds the ninth horizontal position bit and size toggles1. However, the internal line buffer of the PPU imposes a strict limitation: it can render a maximum of 32 sprite tiles on any single scanline1. If this threshold is exceeded, lower-priority sprites are dropped by the PPU, leading to flickering, invisible enemies, or visual artifacts1.  
To prevent visual dropouts during combat sequences involving multiple enemies, talismans, and item drops, the engine uses dynamic OAM management1. The system sorts active entities along the vertical axis and removes off-screen actors from the hardware drawing queue1. Inactive sprites are moved to coordinate ![][image3] (below the visible display window) and redirected to a transparent dummy tile1. In addition, dynamic sprite priority cycling alternates drawing orders across successive frames1. If entity density temporarily exceeds 32 sprites on a scanline, the engine produces alternating-frame transparency rather than dropping objects from the screen1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C2 | critical | VIDEO | open | L31, L59, L138, L180, L200 | _Claim:_ The engine sorts entities vertically, maps culled actors to transparent "tile zero", and cycles sprite priority across alternating frames. _Problem:_ The video says the opposite. At 28:34 the five unused sprites of each coin already point to transparent tile zero. The PPU "still counts those transparent sprites" toward the 32 per line, so tile zero is the problem. The fix moves a tile-zero sprite "down to an offscreen value" (28:55). At 30:08 Inkbox says that registers exist to rotate sprites in OAM, but he decides to "leave it as is for now". At 30:55 he says that the objects are "not organized by X or Y". The value "Y = 224" in image 3 is not in the video. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M9 | major | VIDEO KNOW | open | L31, L59, L137, L180 | _Claim:_ The PPU renders "a maximum of 32 sprite tiles" per scanline, and "lower-priority sprites are dropped". _Problem:_ The limit is 32 sprites per line and also 34 slivers of 8 pixels per line (29:38 to 29:59). With 16 x 16 sprites, 24 objects plus the player give 48 slivers, so only 17 objects drew. The document omits the sliver rule, which was the real cause of the lost player sprite. |
| D14-m4 | minor | VIDEO KNOW | open | L137 | _Claim:_ OAM holds 544 bytes: a 512-byte table and a 32-byte table with the ninth X bit. _Problem:_ This is correct. The video uses the high X bit in the second OAM section for smooth scrolling at the screen edges (23:03 to 23:44). |
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
