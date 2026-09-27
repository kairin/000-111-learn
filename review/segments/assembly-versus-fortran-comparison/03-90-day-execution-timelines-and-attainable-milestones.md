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

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C4 | critical | KNOW DOC | open | L33, L42, L112, L166 | _Claim:_ "Locked 60/70 FPS", V-Sync "completely eliminating tearing" in Mode 13h — (a) Mode 13h runs at **70 Hz**, so a vsync-locked game gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, so there is no page flipping. Copying 64,000 bytes during the ~1–1.5 ms vertical blank is not possible over ISA, so tearing is *reduced*, not eliminated. Tear-free flipping needs Mode X (which L11 mentions but the roadmap never uses). (c) The document's own figure (L70), 3.84 MB/s, exceeds what many 8/16-bit ISA VGA cards could sustain. |
| D02-C5 | critical | KNOW | open | L33 | _Claim:_ 90-day milestone: "fully functional, smooth 60/70 FPS … raycaster written bare-metal" — This is unrealistic for someone learning assembly from scratch. Commercial teams using C plus assembly shipped raycasters that ran well below 60 fps on period hardware. There is no evidence for the timeline. |
| D02-M4 | major | KNOW | open | L41, L30–31 | _Claim:_ 16.16 fixed point "using AX, BX, CX, DX" — These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX…, 386+) or register pairs on 8086. `REP MOVSD` (L31) is also 386+. The document mixes 8086 and 386 targets without saying so. |
| D02-m4 | minor | VERIFY | verify | L26 | "Modern Fortran compiled with retro toolchains": the document names no DOS toolchain that supports modern Fortran. A DJGPP gfortran port may exist, but the document never mentions one. |

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
