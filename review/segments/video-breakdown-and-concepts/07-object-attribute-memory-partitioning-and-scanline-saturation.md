---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 29-32
findings: []
---

# Object Attribute Memory Partitioning and Scanline Saturation

> Parent section: **Video Structure and Narrative Progression**


The video addresses dynamic entity rendering, focusing on the strict physical limitations of the console’s Object Attribute Memory (OAM)1. Although the SNES can register 128 total hardware sprites, the internal line buffer of the PPU cannot process more than 32 sprites on any single horizontal scanline1. Inkbox demonstrates the resulting visual dropouts and presents an entity culling and multiplexing system1. By sorting active entities vertically, unlinking off-screen objects, mapping culled actors to a transparent dummy "tile zero," and cycling sprite priority evaluation across alternating frames, the engine eliminates sprite dropouts and visual artifacting during intense combat sequences1.

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
