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

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-M5 | major | VERIFY | verify | L54, L62, L106, L165 | _Claim:_ The document says that Fortran has "zero native support" for display and input, and that a "pure Fortran game must be ASCII".. _Problem:_ This is too strong. Compilers from vendors of that time shipped **graphics libraries that Fortran can call**. An example is the graphics library of Microsoft FORTRAN 5.x. A call to a vendor or assembly library was normal practice. The Assembly path also depends on BIOS calls. |

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
