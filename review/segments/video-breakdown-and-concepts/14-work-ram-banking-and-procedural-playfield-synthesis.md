---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 97-101
findings: []
---

# Work RAM Banking and Procedural Playfield Synthesis

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The 65c816 CPU addresses a 24-bit physical memory space organized into 64-kilobyte banks1. The system Work RAM provides 128 kB spanning Banks \$7E and \$7F1. In developing a sprawling dungeon crawler, allocating level geometry presents a fundamental architecture challenge1. If dynamic room generation is forced to share memory with dynamic arrays, call stacks, and zero-page pointers, large levels risk memory corruption or heap fragmentation1.  
Inkbox resolves this problem by isolating memory workloads between the two banks1. Bank \$7E handles general engine operations, stack pointers, gamepad input buffers, and active entity descriptors1. Bank \$7F is reserved as a dedicated 63 kB tile buffer that represents the active floor across a 192×168 tile grid1. The procedural generation algorithm operates within this clean memory partition, using room stamping combined with single-tile tunnel carving1. Because paths between room origins are generated using deterministic Manhattan vectors, the generator avoids loops and disconnected zones1. This design ensures reliable level generation that can scale up to 9,999 procedurally assembled floors1.

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
