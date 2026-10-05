---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: subsection
parent: "Factual cross-check and caveats"
lines: 317-322
findings: []
---

# The two most significant corrections

> Parent section: **Factual cross-check and caveats**


The **4 MiB point** is the clearest potential misconception. A reader could leave with the impression that no SNES ROM can exceed 4 MiB. That is false as a universal statement: ExHiROM specifically provides a mapping scheme beyond the normal 4 MiB HiROM range. citeturn28search4 If Inkbox frames 4 MiB as a project rule intended to match an ordinary historical cartridge configuration, however, the claim is perfectly reasonable.

The **CPU description** deserves similar precision. Hackaday calls it a “3.58 MHz Ricoh 6502-based CPU”. citeturn35search2 The family resemblance is real, but the more useful programming description is **Ricoh 5A22 with a 65C816-derived 8/16-bit core**, not an ordinary 8-bit 6502. WDC’s W65C816S documentation identifies 16-bit ALU/register capabilities and a 24-bit, 16 MB address space, while SNES documentation reflects the 5A22-specific system implementation. citeturn26search14turn27search4

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
