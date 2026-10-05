---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 135-139
findings: []
---

# Object Attribute Memory Management and Scanline Saturation Controls

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The console’s Object Attribute Memory stores 544 bytes of sprite metadata describing up to 128 dynamic objects1. A primary 512-byte table defines X/Y coordinates, tile indices, and attribute flags, while a secondary 32-byte table holds the ninth horizontal position bit and size toggles1. However, the internal line buffer of the PPU imposes a strict limitation: it can render a maximum of 32 sprite tiles on any single scanline1. If this threshold is exceeded, lower-priority sprites are dropped by the PPU, leading to flickering, invisible enemies, or visual artifacts1.  
To prevent visual dropouts during combat sequences involving multiple enemies, talismans, and item drops, the engine uses dynamic OAM management1. The system sorts active entities along the vertical axis and removes off-screen actors from the hardware drawing queue1. Inactive sprites are moved to coordinate ![][image3] (below the visible display window) and redirected to a transparent dummy tile1. In addition, dynamic sprite priority cycling alternates drawing orders across successive frames1. If entity density temporarily exceeds 32 sprites on a scanline, the engine produces alternating-frame transparency rather than dropping objects from the screen1.

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
