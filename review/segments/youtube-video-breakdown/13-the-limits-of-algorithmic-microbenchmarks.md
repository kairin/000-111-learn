---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Broader Systems Engineering Implications"
lines: 85-90
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-M4]
---

# The Limits of Algorithmic Microbenchmarks

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17). The video does not cover this idea.

> Parent section: **Broader Systems Engineering Implications**


Evaluating languages using a singular algorithm, such as the Sieve of Eratosthenes, provides insight into integer arithmetic throughput, bitwise manipulation, sequential cache traversal, and loop-branch predictability6. However, it does not represent performance across other computational domains:  
In the domain of dense linear algebra, computational fluid dynamics, and quantum chemistry simulations, Fortran's array constructs and strict pointer aliasing allow it to achieve vectorization efficiency that frequently matches or exceeds equivalent C++ code13. Microbenchmarks focused on integer bitfields bypass Fortran's key architectural strengths in multidimensional mathematical modeling7.  
Similarly, COBOL was never designed to compute prime numbers or execute low-level bit operations10. In enterprise banking, insurance, and payroll systems, COBOL operates on large streams of fixed-point financial transactions where binary floating-point rounding errors cannot be tolerated10. Mainframe architectures support COBOL through dedicated hardware-level decimal arithmetic instructions (packed decimal), enabling efficient multi-field transaction processing and robust I/O throughput10.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-M4 | major | KNOW | open | L21, L88 | _Claim:_ Standard Fortran "specifies that array arguments cannot overlap", which gives the compiler "complete freedom". _Problem:_ This is too strong. The standard gives this rule to the programmer, and compilers do not check it. Arguments with POINTER or TARGET can overlap. A program that breaks the rule can give wrong results with no error message. Also, the sieve uses one array, so this rule has almost no effect on this race. |

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
