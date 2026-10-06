---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 33-36
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C3, D14-C6, D14-M7, D14-m8]
---

# Spatial Hashing and Entity Collision Architecture

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 05:50](https://www.youtube.com/watch?v=j_2bo7ng65E&t=350s). The video finds the tile under the player from X and Y with the scroll. It gives no formula, no complexity class and no spatial hash.

> Parent section: **Video Structure and Narrative Progression**


The documentary deconstructs entity interaction physics and boundary detection routines1. Traditional pairwise collision detection, which compares every entity's bounding box against every other object, exhibits quadratic complexity (![][image1]) and quickly exhausts the 3.58 MHz CPU budget1. Inkbox shows how the 63 kB uncompressed tilemap in Bank \$7F functions as a direct spatial hash grid1. By using fast bitwise shifts to convert entity world coordinates into absolute memory offsets, terrain collision resolves in constant time (![][image2])1. In addition, dynamic actor updates are clamped to the active camera viewport, running off-screen enemies on lightweight timer routines to save CPU cycles1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C3 | critical | VIDEO DOC KNOW | open | L35, L60, L142-147, L181 | _Claim:_ Pairwise collision is O(n^2) or O(n*m). The map in bank $7F is a "spatial hash grid". Address = Base + (Y*192) OR X, and Y*192 = (Y<<7) OR (Y<<6). Off-screen enemies run on "lightweight timer routines". _Problem:_ The video gives the idea only: from the X and Y of the player, with the scroll, find the tile under the player (05:50). Inkbox says this is "faster" than a loop over a wall list (06:11). He gives no formula, no complexity class and no cycle counts. The formula in image 9 is also wrong. Shift results must be added, not combined with OR: for Y = 3, (3<<7) OR (3<<6) = 448, but 3*192 = 576. The OR between Y*192 and X also fails, for example Y = 1, X = 65 gives 193, not 257. The formula also assumes one byte per tile. The video says that 192 x 168 tiles fill 63 K (06:53), so each tile takes two bytes. The video does not describe timer routines for off-screen enemies. Object collision uses generic hitbox functions against the player (38:55) and against on-screen chickens (42:19). |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |
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
