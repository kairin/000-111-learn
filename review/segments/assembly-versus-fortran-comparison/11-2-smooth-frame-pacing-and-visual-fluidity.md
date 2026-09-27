---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: subsection
parent: "Designing for the Modern Player Under Vintage Constraints"
lines: 108-113
findings: [D02-C4, D02-m1]
---

# 2. Smooth Frame Pacing and Visual Fluidity

> Parent section: **Designing for the Modern Player Under Vintage Constraints**


Nothing breaks modern player immersion faster than sluggish, inconsistent frame rates and screen tearing1.

* In Assembly, double buffering using off-screen RAM buffers combined with polling vertical blanking registers ensures that pixel updates occur strictly during the monitor's retrace period, delivering the fluid 60 Hz or 70 Hz responsiveness expected of modern indie retro games (such as *Shovel Knight* or *Celeste*)1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ The document promises "Locked 60/70 FPS" and V-Sync "completely eliminating tearing" in Mode 13h.. _Problem:_ (a) Mode 13h runs at **70 Hz**. Thus a game locked to vsync gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, thus page flipping is not possible. A copy of 64,000 bytes in the ~1 to 1.5 ms vertical blank is not possible over ISA. As a result, tearing becomes *less*, but it does not stop. Flipping without tears needs Mode X (L11 mentions it, but the roadmap does not use it). (c) The figure in the document (L70), 3.84 MB/s, is more than many 8/16-bit ISA VGA cards can supply. |
| D02-m1 | minor | DOC | open | L112 | The document uses *Shovel Knight* and *Celeste* as 60 Hz references. These are modern-engine games, thus they do not show anything about vintage techniques. |

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
