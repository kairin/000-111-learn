---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 108-134
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C1, D14-C6, D14-M8, D14-m1]
---

# Scanline Manipulation via Horizontal Blank Direct Memory Access

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 34:49](https://www.youtube.com/watch?v=j_2bo7ng65E&t=2089s). The video writes the layer 2 horizontal scroll register from a three-byte HDMA table on the title screen. The scanline bands in this part are not in the video.

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


In standard tile-engine rendering, scrolling a background requires updating horizontal and vertical offset registers during the vertical blanking interval (V-Blank)1. While this method shifts entire layers uniformly, it cannot generate depth across horizontal bands within a single layer1. Horizontal Blank Direct Memory Access (HDMA) circumvents this constraint by performing automated register transfers during the 15-microsecond horizontal blanking periods between individual CRT scanline sweeps1.  
To simulate environmental depth on Background Layer 3, Inkbox maps 16×16 graphic tiles across a 32×32 virtual playfield1. The engine sets up an HDMA channel targeting register \$2111 (BG3HOFS) and feeds it an offset table indexed to the vertical beam position1.

\================================================================================  
             PPU BACKGROUND MODE 1 LAYER ALLOCATION & HDMA DEPTH  
\================================================================================

Scanline 001  \+--------------------------------------------------------------+  
              | BG3: Static Distant Sky & Cloud Planes (HDMA Offset: 0\)       |  
              \+--------------------------------------------------------------+  
Scanline 060  | BG3: Mountain Peaks (HDMA Scroll Offset: dx \* 0.25)           |  
              \+--------------------------------------------------------------+  
Scanline 120  | BG3: Mountain Foothills (HDMA Scroll Offset: dx \* 0.50)      |  
              \+--------------------------------------------------------------+  
Scanline 160  | BG1: 4bpp Interactive Playfield (Foreground Dungeon Tiles)   |  
              |      \[16x16 Pixel Tiles, Walkable Collision Geometry\]         |  
              |                                                              |  
              | OAM: Dynamic Sprites (Player, Enemies, Projectiles)          |  
              \+--------------------------------------------------------------+  
Scanline 210  | BG2: 4bpp Static HUD Overlay Plane (Packed BCD Metrics)      |  
Scanline 224  \+--------------------------------------------------------------+  
\================================================================================

As the raster beam draws down the screen, upper scanlines display static sky graphics, mid-tier scanlines shift at fractional rates to show distant mountain peaks, and lower scanlines scroll faster to match foreground motion1. Because the DMA controller processes these register updates independently, multi-layer parallax scrolling runs smoothly at 60 frames per second without burdening the central processor1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C1 | critical | VIDEO KNOW DOC | open | L27, L58, L84, L111, L117-133, L179 | _Claim:_ HDMA writes register $2111 (BG3HOFS) for mountain parallax in the game, with bands at scanlines 60, 120, 160 and 210 and rates dx*0.25 and dx*0.50. _Problem:_ The video puts the parallax on the title screen, not in the game (34:08). The far mountains sit on layer 3, and the clouds that scroll sit on layer 2 (34:28). At 35:31 Inkbox says that he writes "the background two horizontal scroll register". That register is $210F, not $2111. The table has three bytes per entry: a line count and a two-byte value (35:51). The scanline numbers and the rates in the diagram are not in the video. In the game, the only HDMA scroll effect moves the inventory selection on layer 2 (33:47, 36:31). |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M8 | major | VIDEO | open | L23, L27, L84, L104, L111, L178 | _Claim:_ In the game, layer 3 holds "distant mountain art" with HDMA parallax. The 16 x 16 tiles on a 32 x 32 tilemap belong to the HDMA setup. _Problem:_ In the game, layer 1 holds the environment and layer 2 the HUD (04:10). Layer 3 holds black tiles for the darkening trick (37:13). The mountains on layer 3 exist only on the title screen (34:28). The 16 x 16 tiles and the 32 x 32 tilemap belong to the scroll engine (04:30), where a 128 x 112 pixel box around the player drives the tile streaming (04:50). |
| D14-m1 | minor | VERIFY | verify | L110 | _Claim:_ HDMA transfers happen in "15-microsecond horizontal blanking periods". _Problem:_ The nesdev Timing page gives 1364 master clocks per line, with active video from clock 88 to 1112. The rest is about 340 clocks, or 15.8 microseconds, but it includes the borders. The usable HDMA window is shorter. The value is a fair approximation, not a video fact. |

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
