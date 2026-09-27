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

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ "Locked 60/70 FPS", V-Sync "completely eliminating tearing" in Mode 13h — (a) Mode 13h runs at **70 Hz**, so a vsync-locked game gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, so there is no page flipping. Copying 64,000 bytes during the ~1–1.5 ms vertical blank is not possible over ISA, so tearing is *reduced*, not eliminated. Tear-free flipping needs Mode X (which L11 mentions but the roadmap never uses). (c) The document's own figure (L70), 3.84 MB/s, exceeds what many 8/16-bit ISA VGA cards could sustain. |
| D02-M5 | major | VERIFY | verify | L54, L62, L106, L165 | _Claim:_ Fortran has "zero native support" for display and input; a "pure Fortran game must be ASCII" — Overstated. Period vendor compilers shipped **graphics libraries callable from Fortran** (Microsoft FORTRAN 5.x's graphics library, for example). Calling a vendor or assembly library is normal practice, and the Assembly path relies on BIOS calls too. |
| D02-M6 | major | DOC | open | L176–178 vs L144–174 | _Claim:_ "Recommended Strategy": Assembly is "the essential foundation" — This contradicts the document's own decision tree (sim → Fortran). The final section silently turns a conditional recommendation into an unconditional one. |

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
