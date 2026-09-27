---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: subsection
parent: "The Definitive Verdict: Which Language Should You Learn?"
lines: 160-167
findings: [D02-C4, D02-M5, D02-M6]
---

# Choose Assembly If:

> Parent section: **The Definitive Verdict: Which Language Should You Learn?**


You want to build an **action-oriented, real-time game** (e.g., a fast 2D platformer, top-down scrolling shooter, or a 3D raycaster)1.

* **The Reason:** Under 80s and 90s constraints, smooth real-time graphics and responsive inputs require direct interaction with physical registers, interrupt vectors, and the VGA display buffer1.  
* Fortran cannot talk to this hardware natively; you would inevitably find yourself having to write assembly subroutines just to get pixels onto the screen12.  
* Learning **x86 Assembly (targeting DOS Mode 13h)** for the rest of the year gives you 100% self-sufficiency to create a complete, deeply optimized, bare-metal game that hits a locked 60/70 FPS, satisfying the responsiveness modern players demand1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ The document promises "Locked 60/70 FPS" and V-Sync "completely eliminating tearing" in Mode 13h.. _Problem:_ (a) Mode 13h runs at **70 Hz**. Thus a game locked to vsync gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, thus page flipping is not possible. A copy of 64,000 bytes in the ~1 to 1.5 ms vertical blank is not possible over ISA. As a result, tearing becomes *less*, but it does not stop. Flipping without tears needs Mode X (L11 mentions it, but the roadmap does not use it). (c) The figure in the document (L70), 3.84 MB/s, is more than many 8/16-bit ISA VGA cards can supply. |
| D02-M5 | major | VERIFY | verify | L54, L62, L106, L165 | _Claim:_ The document says that Fortran has "zero native support" for display and input, and that a "pure Fortran game must be ASCII".. _Problem:_ This is too strong. Compilers from vendors of that time shipped **graphics libraries that Fortran can call**. An example is the graphics library of Microsoft FORTRAN 5.x. A call to a vendor or assembly library was normal practice. The Assembly path also depends on BIOS calls. |
| D02-M6 | major | DOC | open | L176–178 vs L144–174 | _Claim:_ The "Recommended Strategy" says that Assembly is "the essential foundation".. _Problem:_ This contradicts the decision tree of the document (sim goes to Fortran). The final section changes a conditional recommendation into an unconditional one and does not say so. |

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
