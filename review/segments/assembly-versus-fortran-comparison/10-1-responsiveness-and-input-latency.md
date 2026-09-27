---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: subsection
parent: "Designing for the Modern Player Under Vintage Constraints"
lines: 101-107
findings: [D02-M5]
---

# 1. Responsiveness and Input Latency

> Parent section: **Designing for the Modern Player Under Vintage Constraints**


Modern players are accustomed to instant input response1. Games that poll the keyboard buffer via standard slow BIOS interrupts (INT 16h) introduce noticeable input lag and cannot handle simultaneous key presses (such as running and shooting diagonally)1.

* **The Assembly Solution:** Hooking hardware interrupt INT 09h directly captures low-level keyboard scan codes, maintaining a bitmask of pressed keys for zero-latency multi-key responses1.  
* **The Fortran Limitation:** A game written in pure Fortran cannot directly install an interrupt handler; it must delegate input processing to external assembly or C drivers12.

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-M5 | major | VERIFY | verify | L54, L62, L106, L165 | _Claim:_ Fortran has "zero native support" for display and input; a "pure Fortran game must be ASCII" — Overstated. Period vendor compilers shipped **graphics libraries callable from Fortran** (Microsoft FORTRAN 5.x's graphics library, for example). Calling a vendor or assembly library is normal practice, and the Assembly path relies on BIOS calls too. |

---

## Review worksheet

### 1. Goal / objective of this segment
_What is this segment trying to establish or help the reader decide?_

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
