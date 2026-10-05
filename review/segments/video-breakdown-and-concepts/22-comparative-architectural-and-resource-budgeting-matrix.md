---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 170-185
findings: []
---

# Comparative Architectural and Resource Budgeting Matrix

The following table contrasts the native hardware limits of the Super Nintendo against the low-level software solutions implemented in *Zero Star*:

| Architecture Domain | Hardware Limit / Metric | Computational Bottleneck | Software Engineering Solution |
| :---- | :---- | :---- | :---- |
| **CPU Processing** \[cite: 1, 2\] | Ricoh 5A22 core running at 3.58 MHz1. | Low cycle budget per frame; lack of native division instructions1. | Pure 65c816 assembly; Packed BCD HUD arithmetic via decimal flag (SED)1. |
| **Work Memory (WRAM)** \[cite: 1, 6\] | 128 kB split into two 64 kB banks (\$7E/\$7F)1. | Cannot allocate single buffers exceeding 64 kB; risk of heap fragmentation1. | Bank \$7F dedicated to a 63 kB procedural map; Bank \$7E reserved for system stack and arrays1. |
| **Video Engine Modes** \[cite: 1, 2\] | Mode 1: two 4bpp layers, one 2bpp layer1. | High color depths consume VRAM bandwidth and tile limits1. | Layer 1 allocated to terrain (4bpp); Layer 2 to HUD (4bpp); Layer 3 to parallax background (2bpp)1. |
| **Direct Memory Access** \[cite: 1, 5\] | DMA (V-Blank) & HDMA (H-Blank)1. | V-Blank window is too short for massive runtime tile reloads1. | HDMA writes horizontal scroll registers per scanline to generate multi-plane parallax1. |
| **Sprite Hardware (OAM)** \[cite: 1\] | 128 total sprites; 32 sprites per scanline maximum1. | Overcrowded scanlines drop sprites, causing visual flicker and missing entities1. | Dynamic OAM table cycling; viewport culling; mapping inactive sprites to dummy tile 01. |
| **Collision Engine** \[cite: 1\] | Software-driven bounding box physics1. | Pairwise checks scale quadratically (![][image1]), dropping frame rates1. | Constant-time ![][image2] memory hashing into Bank \$7F; off-screen actor updates culled1. |
| **Visual Color Math** \[cite: 1\] | Sub-screen color addition and subtraction1. | Modifying CGRAM palettes during active frames causes bus contention1. | Real-time color subtraction for hit-stop black flashes; sub-screen blending for talisman effects1. |
| **Audio Processing** \[cite: 1, 2, 9\] | Sony SPC700 \+ DSP with 64 kB ARAM1. | Asynchronous bus; audio memory isolated from main CPU1. | Custom SPC700 driver; BRR compression; dynamic 5-voice music and 3-voice SFX allocation1. |
| **Cartridge Physical Bus** \[cite: 1, 2, 3\] | Standard Mask ROM addressing space (up to 4 MB)2. | Electrical timing quirks and uninitialized RAM discrepancies on real hardware1. | 129 kB ROM image verified on Mouse Bite Labs PCBs using retail consoles1. |

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
