---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: section-lead
parent: ""
lines: 24-34
findings: [D02-C4, D02-C5, D02-M4, D02-m4]
---

# 90-Day Execution Timelines and Attainable Milestones

The three-month acquisition trajectory differs markedly depending on whether the developer chooses Assembly (such as 16-bit x86 DOS or MOS 6502/68000) or Fortran (such as FORTRAN 77 under DOS or Modern Fortran compiled with retro toolchains)1.

| Week Interval | Assembly Pathway (x86 Real Mode / DOS Mode 13h) | Fortran Pathway (FORTRAN 77 / Modern Fortran) |
| :---- | :---- | :---- |
| **Weeks 1–4** | CPU registers, binary logic, stack management; setting up BIOS interrupts (INT 10h for Mode 13h); plotting pixels directly to 0xA000:00008. | Variable typing; DO loop logic; multidimensional arrays; array indexing; basic ASCII graphics and game state structures6. |
| **Weeks 5–8** | Fast memory copy (REP MOVSW/MOVSD); fixed-point trigonometry math; double-buffering in conventional RAM; keyboard IRQ (INT 09h) handling1. | Matrix transformations; celestial mechanics; cellular automata loops; procedural map generation; file save/load routines3. |
| **Weeks 9–12** | Tile blitting routines; vertical blank synchronization (V-Sync on port 0x3DA); custom fixed-point raycasting or 2D sprite engine1. | Complex deterministic economy/simulation engine; integration with low-level drawing wrappers or ANSI text terminal rendering12. |
| **Attainable Milestone** | A fully functional, smooth 60/70 FPS 2D action game, tile scroller, or pseudo-3D raycaster written bare-metal1. | A deep, complex simulation game (e.g., hard-sci-fi flight dynamics, tactical wargame, or procedural roguelike)11. |

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ The document promises "Locked 60/70 FPS" and V-Sync "completely eliminating tearing" in Mode 13h.. _Problem:_ (a) Mode 13h runs at **70 Hz**. Thus a game locked to vsync gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, thus page flipping is not possible. A copy of 64,000 bytes in the ~1 to 1.5 ms vertical blank is not possible over ISA. As a result, tearing becomes *less*, but it does not stop. Flipping without tears needs Mode X (L11 mentions it, but the roadmap does not use it). (c) The figure in the document (L70), 3.84 MB/s, is more than many 8/16-bit ISA VGA cards can supply. |
| D02-C5 | critical | KNOW | open | L33 | _Claim:_ The 90-day milestone is a "fully functional, smooth 60/70 FPS … raycaster written bare-metal".. _Problem:_ This is not realistic for a person who learns assembly from zero. Commercial teams with C plus assembly shipped raycasters that ran much slower than 60 fps on the hardware of that time. No evidence supports the timeline. |
| D02-M4 | major | KNOW | open | L41, L30–31 | _Claim:_ The document does 16.16 fixed point "using AX, BX, CX, DX".. _Problem:_ These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX and the others, 386 and later) or register pairs on the 8086. `REP MOVSD` (L31) also needs a 386 or later. The document mixes 8086 and 386 targets and does not say so. |
| D02-m4 | minor | VERIFY | verify | L26 | The document says "Modern Fortran compiled with retro toolchains". But it names no DOS toolchain that supports modern Fortran. A DJGPP gfortran port can possibly exist, but the document does not mention one. |

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
