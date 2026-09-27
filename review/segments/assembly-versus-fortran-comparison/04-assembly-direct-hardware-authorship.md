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

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ The document promises "Locked 60/70 FPS" and V-Sync "completely eliminating tearing" in Mode 13h.. _Problem:_ (a) Mode 13h runs at **70 Hz**. Thus a game locked to vsync gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, thus page flipping is not possible. A copy of 64,000 bytes in the ~1 to 1.5 ms vertical blank is not possible over ISA. As a result, tearing becomes *less*, but it does not stop. Flipping without tears needs Mode X (L11 mentions it, but the roadmap does not use it). (c) The figure in the document (L70), 3.84 MB/s, is more than many 8/16-bit ISA VGA cards can supply. |
| D02-M1 | major | KNOW | open | L37 | _Claim:_ The document says that developers wrote commercial titles of the early 1990s "almost exclusively in assembly".. _Problem:_ This is true for 8-bit systems in the 1980s. It is **false for the PC in the early 1990s**. At that time, C with assembly inner loops was the norm (for example, id Software titles). The source is a Reddit thread [1]. |
| D02-M3 | major | KNOW | open | L10, L37 | _Claim:_ The clock range of the era is "1–33 MHz", and a "4.77 MHz" CPU gives 30 to 60 fps.. _Problem:_ The document claims the "1990s", but it stops at 33 MHz. The 486DX2-66 came in 1992, and Pentiums came by the mid-1990s. VGA Mode 13h games at 60 fps on a 4.77 MHz 8088 are not credible. The scope is not consistent. |
| D02-M4 | major | KNOW | open | L41, L30–31 | _Claim:_ The document does 16.16 fixed point "using AX, BX, CX, DX".. _Problem:_ These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX and the others, 386 and later) or register pairs on the 8086. `REP MOVSD` (L31) also needs a 386 or later. The document mixes 8086 and 386 targets and does not say so. |

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
