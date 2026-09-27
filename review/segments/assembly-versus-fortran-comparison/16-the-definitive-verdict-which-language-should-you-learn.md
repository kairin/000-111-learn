---
source: ../Assembly-Versus-Fortran-Comparison.md
document: "Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience"
kind: section-lead
parent: ""
lines: 140-159
findings: [D02-C3, D02-M6]
---

# The Definitive Verdict: Which Language Should You Learn?

With only the remaining months of the year to commit to a single discipline, the choice depends on your intended game design:

                    Decision Pathway for Retro Game Development

                                \[Your Target Retro Game\]  
                                           |  
                    \-----------------------------------------------  
                    |                                             |  
            \[Real-Time Action\]                            \[Deep Simulation\]  
            \- Arcade Platformer                           \- Orbital Flight Mechanics  
            \- 2D Shmup / Top-Down                         \- Tactical Wargame / 4X  
            \- Mode 13h Raycaster                          \- Procedural Roguelike / Econ  
                    |                                             |  
                    v                                             v  
          CHOOSE: ASSEMBLY                              CHOOSE: FORTRAN  
     (Direct Hardware Mastery,                     (Mathematical Engine,  
      Zero-Lag IRQs, Smooth 60 FPS)                 Anti-Aliased Simulation Loops)

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
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
