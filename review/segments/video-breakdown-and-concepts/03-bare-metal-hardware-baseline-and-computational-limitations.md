---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 13-16
findings: []
---

# Bare-Metal Hardware Baseline and Computational Limitations

> Parent section: **Video Structure and Narrative Progression**


The video begins by examining the physical architecture of the Super Nintendo, highlighting the lack of an operating system, the absence of an integrated memory management unit, and the severe processing limitations of the Ricoh 5A22 central processor1. Inkbox discusses the rationale behind writing native 65c816 assembly rather than using high-level compiled abstractions, showing how modern compilers introduce register-thrashing and memory bloat on vintage accumulator-constrained CPUs1. The introduction outlines the central technical challenge: building a procedural dungeon crawler capable of managing dynamic world generation, dozens of concurrent entities, multi-layered parallax backgrounds, and dynamic sound effects within an unforgiving 16-bit hardware architecture1.

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
