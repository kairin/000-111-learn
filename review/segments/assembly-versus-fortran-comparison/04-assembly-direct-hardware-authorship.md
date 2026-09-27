---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: subsection
parent: "90-Day Execution Timelines and Attainable Milestones"
lines: 35-44
findings: [D02-C4, D02-M1, D02-M3, D02-M4]
---

# Assembly: Direct Hardware Authorship

> Parent section: **90-Day Execution Timelines and Attainable Milestones**


In 1980s and early 1990s game production, commercial titles were authored almost exclusively in assembly1. Because compilers of that era generated suboptimal machine code, squeezing 30 to 60 frames per second out of a 4.77 MHz to 25 MHz CPU required manual instruction scheduling and cycle counting1.  
Within a dedicated three-month timeline focusing on x86 DOS development, a programmer can master:

* Direct segment:offset addressing, manipulating the 64 KB memory bank allocated to the VGA framebuffer1.  
* Fixed-point 16.16 or 8.8 mathematics using integer registers (AX, BX, CX, DX), eliminating the severe latency of software floating-point emulation8.  
* Hardware vertical retrace synchronization via polling input status register 1 (port 0x3DA), completely eliminating visual tearing1.  
* Efficient blitting loops utilizing string manipulation instructions (LODSB, STOSB, MOVSW), unrolled manually to maximize memory throughput1.

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ "Locked 60/70 FPS", V-Sync "completely eliminating tearing" in Mode 13h — (a) Mode 13h runs at **70 Hz**, so a vsync-locked game gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, so there is no page flipping. Copying 64,000 bytes during the ~1–1.5 ms vertical blank is not possible over ISA, so tearing is *reduced*, not eliminated. Tear-free flipping needs Mode X (which L11 mentions but the roadmap never uses). (c) The document's own figure (L70), 3.84 MB/s, exceeds what many 8/16-bit ISA VGA cards could sustain. |
| D02-M1 | major | KNOW | open | L37 | _Claim:_ Early-1990s commercial titles authored "almost exclusively in assembly" — True for 8-bit systems in the 1980s. **False for early-1990s PC**, where C with assembly inner loops was the norm (id Software titles, for example). Source: a Reddit thread [1]. |
| D02-M3 | major | KNOW | open | L10, L37 | _Claim:_ Era clock range "1–33 MHz", and 30–60 fps from a "4.77 MHz" CPU — The document claims "1990s" but stops at 33 MHz (486DX2-66 in 1992; Pentiums by the mid-1990s). VGA Mode 13h games at 60 fps on a 4.77 MHz 8088 is not credible. The scope is inconsistent. |
| D02-M4 | major | KNOW | open | L41, L30–31 | _Claim:_ 16.16 fixed point "using AX, BX, CX, DX" — These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX…, 386+) or register pairs on 8086. `REP MOVSD` (L31) is also 386+. The document mixes 8086 and 386 targets without saying so. |

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
