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

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D02-C3 | critical | KNOW VERIFY | verify | L114–118, L170, Sim branch of L144–158 | _Claim:_ Deep simulation and procedural universes go to Fortran.. _Problem:_ History does not agree. The developers wrote **Elite** (1984, procedural galaxies in ~22 KB), **Frontier: Elite II** (1993, Newtonian orbital flight, procedural galaxy) and **M.U.L.E.** (the example in the document, L170) in **assembly**. The claim "Fortran can fit a galaxy in 200 KB" (L118) is weaker than the result that assembly got in 1984. |
| D02-M6 | major | DOC | open | L176–178 vs L144–174 | _Claim:_ The "Recommended Strategy" says that Assembly is "the essential foundation".. _Problem:_ This contradicts the decision tree of the document (sim goes to Fortran). The final section changes a conditional recommendation into an unconditional one and does not say so. |

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
