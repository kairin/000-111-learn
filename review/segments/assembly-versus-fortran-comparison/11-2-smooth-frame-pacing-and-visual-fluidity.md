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

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ "Locked 60/70 FPS", V-Sync "completely eliminating tearing" in Mode 13h — (a) Mode 13h runs at **70 Hz**, so a vsync-locked game gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, so there is no page flipping. Copying 64,000 bytes during the ~1–1.5 ms vertical blank is not possible over ISA, so tearing is *reduced*, not eliminated. Tear-free flipping needs Mode X (which L11 mentions but the roadmap never uses). (c) The document's own figure (L70), 3.84 MB/s, exceeds what many 8/16-bit ISA VGA cards could sustain. |
| D02-m1 | minor | DOC | open | L112 | *Shovel Knight* / *Celeste* cited as 60 Hz references: these are modern-engine games, so they don't show anything about vintage techniques. |

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
