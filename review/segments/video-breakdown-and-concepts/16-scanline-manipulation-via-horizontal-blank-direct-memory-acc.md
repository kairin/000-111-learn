---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 108-134
findings: []
---

# Scanline Manipulation via Horizontal Blank Direct Memory Access

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

_Pass 1 found nothing in this part. This does not mean that the part is correct. Nobody challenged it yet._

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
