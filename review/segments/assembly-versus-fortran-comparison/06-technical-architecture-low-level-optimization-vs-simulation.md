---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: section-lead
parent: ""
lines: 56-67
findings: [D02-C2, D02-M5, D02-M7]
---

# Technical Architecture: Low-Level Optimization vs. Simulation Power

The core engineering tradeoff between Assembly and Fortran centers on whether the bottleneck of the game is hardware throughput (drawing pixels and handling interrupts) or computational logic (processing mathematical systems).

| Evaluation Metric | Assembly Language (x86 DOS / 6502\) | Fortran (FORTRAN 77 / Modern Fortran) |
| :---- | :---- | :---- |
| **Hardware Interactivity** | Complete; raw port I/O (IN/OUT), hardware interrupts, direct VRAM manipulation1. | Zero native support; requires external C or Assembly bindings for I/O and display12. |
| **Arithmetic Paradigms** | Integer arithmetic; manual bit shifts; custom fixed-point trigonometric tables8. | Highly expressive matrix math; native floating-point; multidimensional array slicing3. |
| **Memory Footprint** | Absolute minimal overhead; executable binaries measure mere kilobytes1. | Moderate runtime library overhead; executables include formatting and I/O runtimes12. |
| **Execution Determinism** | Cycle-exact instruction control; fully predictable frame budgets1. | High numerical predictability; compiler reordering may introduce subtle timing variations22. |
| **Ideal Vintage Genre** | Fast arcade action, side-scrolling platformers, Mode 13h raycasters (*Wolfenstein* style)1. | Turn-based strategy, macroscopic wargames, flight dynamic models, deep roguelikes11. |

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C2 | critical | DOC | open | L10 vs L63 | _Claim:_ FPUs "were rare"… yet Fortran offers "native floating-point" — Internal contradiction. Without an FPU, Fortran `REAL` arithmetic runs on **software emulation**, the very latency the document praises Assembly for avoiding (L41). A float-heavy Fortran simulation on a 1980s machine would be *slow*. |
| D02-M5 | major | VERIFY | verify | L54, L62, L106, L165 | _Claim:_ Fortran has "zero native support" for display and input; a "pure Fortran game must be ASCII" — Overstated. Period vendor compilers shipped **graphics libraries callable from Fortran** (Microsoft FORTRAN 5.x's graphics library, for example). Calling a vendor or assembly library is normal practice, and the Assembly path relies on BIOS calls too. |
| D02-M7 | major | KNOW | open | L65 | _Claim:_ Assembly gives "cycle-exact … fully predictable frame budgets" — On real PCs, DRAM refresh, ISA wait states, the 8088 prefetch queue and 486 caches make exact cycle counting impractical. It is true on C64 and NES, not on the DOS target the roadmap uses. |

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
