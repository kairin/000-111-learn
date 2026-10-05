---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 25-28
findings: []
---

# Raster Manipulation via Horizontal Blank Direct Memory Access

> Parent section: **Video Structure and Narrative Progression**


To simulate three-dimensional environmental depth on flat tilemaps, the presentation explores Direct Memory Access (DMA) and Horizontal Blank DMA (HDMA)1. Standard DMA transfers are restricted to the vertical blanking interval (V-Blank), whereas HDMA operates during the brief horizontal blanking periods between individual CRT scanline draws1. Inkbox demonstrates how HDMA channels are configured to update horizontal scroll registers scanline by scanline1. By mapping 16×16 graphic tiles across a 32×32 virtual playfield and modulating the horizontal displacement of Background Layer 3 down the display, the engine produces smooth, multi-plane mountain parallax effects without consuming central processor cycles during active rasterization1.

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
