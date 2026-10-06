---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 29-32
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C2, D14-C6, D14-M7, D14-M9]
---

# Object Attribute Memory Partitioning and Scanline Saturation

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 28:14](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1694s). The video shows that transparent tile-zero sprites still count. The fix moves them off screen. Inkbox does not rotate sprite priority (30:08).

> Parent section: **Video Structure and Narrative Progression**


The video addresses dynamic entity rendering, focusing on the strict physical limitations of the console’s Object Attribute Memory (OAM)1. Although the SNES can register 128 total hardware sprites, the internal line buffer of the PPU cannot process more than 32 sprites on any single horizontal scanline1. Inkbox demonstrates the resulting visual dropouts and presents an entity culling and multiplexing system1. By sorting active entities vertically, unlinking off-screen objects, mapping culled actors to a transparent dummy "tile zero," and cycling sprite priority evaluation across alternating frames, the engine eliminates sprite dropouts and visual artifacting during intense combat sequences1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C2 | critical | VIDEO | open | L31, L59, L138, L180, L200 | _Claim:_ The engine sorts entities vertically, maps culled actors to transparent "tile zero", and cycles sprite priority across alternating frames. _Problem:_ The video says the opposite. At 28:34 the five unused sprites of each coin already point to transparent tile zero. The PPU "still counts those transparent sprites" toward the 32 per line, so tile zero is the problem. The fix moves a tile-zero sprite "down to an offscreen value" (28:55). At 30:08 Inkbox says that registers exist to rotate sprites in OAM, but he decides to "leave it as is for now". At 30:55 he says that the objects are "not organized by X or Y". The value "Y = 224" in image 3 is not in the video. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |
| D14-M9 | major | VIDEO KNOW | open | L31, L59, L137, L180 | _Claim:_ The PPU renders "a maximum of 32 sprite tiles" per scanline, and "lower-priority sprites are dropped". _Problem:_ The limit is 32 sprites per line and also 34 slivers of 8 pixels per line (29:38 to 29:59). With 16 x 16 sprites, 24 objects plus the player give 48 slivers, so only 17 objects drew. The document omits the sliver rule, which was the real cause of the lost player sprite. |

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
