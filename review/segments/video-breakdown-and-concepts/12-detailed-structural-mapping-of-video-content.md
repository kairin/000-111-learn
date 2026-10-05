---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 49-64
findings: []
---

# Detailed Structural Mapping of Video Content

The following table summarizes the video presentation, linking narrative segments to their underlying hardware subsystems, primary technical challenges, and software implementations:

| Segment Title | Target Hardware Subsystem | Primary Technical Challenge | Core Software Implementation |
| :---- | :---- | :---- | :---- |
| **1\. Architecture Baseline & Constraints** \[cite: 1, 2\] | Ricoh 5A22 CPU & System Bus1 | Strict 3.58 MHz processing budget, lack of OS, non-uniform memory architecture1. | Bare-metal 65c816 assembly implementation; zero external coprocessor dependence1. |
| **2\. WRAM Banking & Procedural Maps** \[cite: 1\] | 128 kB Work RAM (Banks \$7E/\$7F)1 | Generating large dynamic playfields without memory fragmentation1. | Bank \$7F dedicated to a 63 kB procedural tile buffer; Bank \$7E isolated for stack and system state1. |
| **3\. PPU Configuration & BCD HUD** \[cite: 1\] | Dual PPUs & Background Mode 11 | High cycle cost of runtime integer division for five-digit base-10 HUD tallies1. | Mode 1 layer allocation; Packed BCD arithmetic with hardware decimal flag (SED)1. |
| **4\. HDMA Scanline Modulation** \[cite: 1\] | DMA Controller & PPU Registers1 | Generating convincing environmental depth without CPU frame cycle consumption1. | Per-scanline horizontal offset table updates targeting register \$2111 during H-Blank1. |
| **5\. OAM Management & Sprite Limits** \[cite: 1\] | Object Attribute Memory (OAM)1 | Hardware dropout and flickering caused by the 32 sprites-per-scanline threshold1. | Viewport culling; dynamic OAM cycling; redirecting inactive sprites to transparent dummy tile 01. |
| **6\. Spatial Hashing & Collision** \[cite: 1\] | 65c816 Math & WRAM Data Access1 | Quadratic scaling (![][image1]) of traditional pairwise bounding box collision algorithms1. | Direct ![][image2] memory address hashing from coordinates; viewport-bounded enemy updates1. |
| **7\. Hardware Color Arithmetic** \[cite: 1\] | PPU Color Math Engine1 | High bus-bandwidth cost of modifying CGRAM palettes during active frame cycles1. | Sub-screen color subtraction for hit-stop black flashes; real-time blending for spells1. |
| **8\. SPC700 Subsystem & Audio Engine** \[cite: 1, 3\] | Sony SPC700, DSP, 64 kB ARAM1 | Asynchronous communication and lack of flexible open-source audio drivers1. | Custom SPC700 driver; BRR compression; dynamic 5-voice music and 3-voice SFX allocation1. |
| **9\. Physical Synthesis & Testing** \[cite: 1, 3\] | PCB Bus & Physical Mask ROM1 | Silicon behavioral divergences from emulator timing, bus floats, and uninitialized RAM1. | Mouse Bite Labs open hardware; EEPROM verification; open-source driver release1. |

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
