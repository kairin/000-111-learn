---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 17-20
findings: []
---

# Work RAM Topology and Procedural Dungeon Generation

> Parent section: **Video Structure and Narrative Progression**


The analysis moves to internal memory organization, focusing on the 128 kB Work RAM pool split across two 64 kB banks: Bank \$7E and Bank \$7F1. Inkbox explains that memory fragmentation cannot be tolerated when dynamically generating massive dungeons1. The developer details a custom procedural level generator that stamps out interconnected chambers and carves deterministic, single-tile pathways across a 192×168 tile grid1. By dedicating Bank \$7F entirely to this 63 kB world buffer while keeping all core engine variables, entity arrays, and the hardware stack isolated in Bank \$7E, the game prevents stack overflows and achieves non-fragmented procedural scaling across 9,999 distinct dungeon levels1.

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
