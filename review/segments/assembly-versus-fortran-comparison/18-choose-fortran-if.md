---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: subsection
parent: "The Definitive Verdict: Which Language Should You Learn?"
lines: 168-175
findings: [D02-C1, D02-C3, D02-M6]
---

# Choose Fortran If:

> Parent section: **The Definitive Verdict: Which Language Should You Learn?**


You want to build a **deep simulation, procedural universe, or tactical wargame** (e.g., a hard-physics space orbital simulator, an economic trading sim like *M.U.L.E.*, or a procedural turn-based strategy game)11.

* **The Reason:** If the challenge of your game lies in complex mathematics, matrix transformations, and emergent system logic rather than rapid pixel blitting, Fortran will allow you to build an astonishingly deep simulation within 90 days3.  
* Its array syntax and auto-vectorizing execution model will allow you to simulate complex systems that ran circles around other high-level languages of that era3.  
* You can render the game via an authentic, stylized ASCII/ANSI terminal interface or pair it with a pre-existing graphics harness12.

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C1 | critical | KNOW | open | L50, L84, L173 | _Claim:_ Fortran wins through "anti-aliasing optimizations", "array syntax" and an "auto-vectorizing execution model" — **FORTRAN 77 has no array syntax.** Whole-array expressions and slicing arrived in Fortran 90. **8086–486 CPUs have no SIMD**, so there is nothing to auto-vectorize (MMX came in 1997; x87 is scalar). The document's main Fortran advantages don't exist on its own target. |
| D02-C3 | critical | KNOW VERIFY | verify | L114–118, L170, Sim branch of L144–158 | _Claim:_ Deep simulation / procedural universes → Fortran — History contradicts this. **Elite** (1984, procedural galaxies in ~22 KB), **Frontier: Elite II** (1993, Newtonian orbital flight, procedural galaxy) and **M.U.L.E.** (the document's own example, L170) were written in **assembly**. The claim "Fortran can fit a galaxy in 200 KB" (L118) is weaker than what assembly actually did in 1984. |
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
