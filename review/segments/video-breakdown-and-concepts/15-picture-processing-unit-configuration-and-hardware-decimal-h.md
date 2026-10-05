---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 102-107
findings: []
---

# Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The console's PPU offers eight discrete graphics modes, each balancing tile color depth against the number of available background planes1. *Zero Star* utilizes Mode 1, which provides two 16-color (4 bits-per-pixel) background layers alongside one 4-color (2 bits-per-pixel) background layer1. Layer 1 displays the playable dungeon map, Layer 2 renders the user interface overlay, and Layer 3 hosts distant mountain art1.  
A major computational challenge in retro programming is updating multi-digit base-10 interface displays1. On modern architectures, converting binary integers to displayable decimal characters relies on integer division and modulo operations, both of which are expensive on a 3.58 MHz CPU lacking hardware division instructions1. Repeatedly executing software division algorithms to update counters for 9,999 chickens, dungeon levels, and player coins would consume substantial frame cycles1.  
Inkbox solves this by maintaining game metrics in Packed Binary-Coded Decimal (BCD)1. In this format, each byte stores two 4-bit nibbles representing values from 0 to 9, allowing a single byte to represent decimal numbers from 00 to 991. By using the 65c816 decimal mode flag (SED), standard instructions such as ADC (Add with Carry) and SBC (Subtract with Borrow) execute in hardware decimal arithmetic1. Carries propagate between nibbles automatically without runtime division1. To push updated tallies to Background Layer 2, the engine separates each nibble using logical shifts (LSR) and masks (AND), using the result to index the appropriate numeric character tile1.

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
