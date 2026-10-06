---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 192-204
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C2, D14-C6, D14-M1, D14-M7, D14-m10]
---

# Synthesis and Conclusions

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 50:10](https://www.youtube.com/watch?v=j_2bo7ng65E&t=3010s). The video ends with the free release, a poll about a physical release, and the next console. It does not claim 9,999 floors.

Inkbox’s *"It Took Every SNES Hardware Trick To Make My Game"* demonstrates the engineering discipline required to develop for fourth-generation console hardware2. Rather than relying on hardware abstractions, high-level engines, and expansive memory pools, the author of *Zero Star* achieved an expansive 9,999-floor procedural dungeon crawler by balancing the platform's hardware subsystems1.  
Every technical choice in the game is directly shaped by physical hardware constraints:

* Work RAM banking dictates the 63 kB procedural map structure in Bank \$7F1.  
* 65c816 architectural limits drive the use of Packed BCD for zero-cost HUD arithmetic1.  
* CRT electron beam timings guide the use of HDMA for parallax background scrolling1.  
* PPU line buffer limits dictate viewport entity sorting and transparent tile zero culling1.  
* System bus isolation requires an autonomous, custom SPC700 sound engine to manage audio independently1.

By delivering both a fully functional 129 kB game ROM and an open-source audio driver for the retrodevelopment community, Inkbox demonstrates that the architectural constraints of the fourth console generation remain a masterclass in deterministic hardware utilization, mechanical sympathy, and low-level software engineering1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C2 | critical | VIDEO | open | L31, L59, L138, L180, L200 | _Claim:_ The engine sorts entities vertically, maps culled actors to transparent "tile zero", and cycles sprite priority across alternating frames. _Problem:_ The video says the opposite. At 28:34 the five unused sprites of each coin already point to transparent tile zero. The PPU "still counts those transparent sprites" toward the 32 per line, so tile zero is the problem. The fix moves a tile-zero sprite "down to an offscreen value" (28:55). At 30:08 Inkbox says that registers exist to rotate sprites in OAM, but he decides to "leave it as is for now". At 30:55 he says that the objects are "not organized by X or Y". The value "Y = 224" in image 3 is not in the video. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M1 | major | VIDEO VERIFY | verify | L5, L19, L23, L100, L105, L194 | _Claim:_ "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement". _Problem:_ The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |
| D14-m10 | minor | DOC | open | L203 | _Claim:_ "a masterclass in deterministic hardware utilization, mechanical sympathy". _Problem:_ Praise with no measure. The video calls the result "not perfect" (26:32) and "an early pre-release" (itch.io page). |

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
