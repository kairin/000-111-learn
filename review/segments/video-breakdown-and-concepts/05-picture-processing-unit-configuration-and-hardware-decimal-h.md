---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 21-24
findings: []
---

# Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic

> Parent section: **Video Structure and Narrative Progression**


The video transitions to the console’s dual Picture Processing Units (PPU1 and PPU2) and explains the selection of Background Mode 11. Inkbox outlines how graphical priorities are organized across three distinct planes: a 4 bits-per-pixel (16-color) interactive terrain playfield on Background Layer 1, a static heads-up display on Background Layer 2, and distant background art on Background Layer 3 rendered at 2 bits per pixel (4 colors)1. Within this section, the presentation breaks down the implementation of the game's dynamic on-screen counters1. Rather than burning clock cycles on integer division algorithms to parse base-10 values from binary registers, the engine stores the 9,999 chicken kill requirement, floor depth, and coin metrics in Packed Binary-Coded Decimal (BCD)1. Activating the 65c816 decimal flag (SED) allows the hardware to calculate multi-digit carries automatically during standard addition and subtraction instructions1.

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
