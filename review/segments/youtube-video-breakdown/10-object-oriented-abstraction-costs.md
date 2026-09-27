---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Memory Hierarchy Dynamics and Compiler Code Generation"
lines: 70-74
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-M9, D09-m6]
---

# Object-Oriented Abstraction Costs

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 10:47](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=647s). The video shows the Fortran program free and allocate its array in each pass. It gives no cost.

> Parent section: **Memory Hierarchy Dynamics and Compiler Code Generation**


The requirement for faithful implementations introduces a dynamic allocation challenge that impacts language runtimes unevenly7. In C++, dynamic memory management can be implemented with minimal overhead by keeping allocations contiguous and utilizing inlined class constructors that avoid dynamic dispatch6.  
In Fortran, wrapping the sieve within an object-oriented type with type-bound procedures and dynamic array fields introduces runtime bookkeeping7. Fortran's runtime libraries are optimized for allocating large numerical tensors at application startup rather than cycling through heap allocations thousands of times per second7. When object-oriented modularization is enforced, Fortran experiences an execution penalty ranging between ![][image30] and ![][image29] relative to its raw procedural equivalent, highlighting an impedance mismatch between classical Fortran compiler optimizations and modern object-oriented idioms7.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-M9 | major | VERIFY | verify | L73 | _Claim:_ An object-oriented Fortran sieve is 30% to 50% slower than a procedural one. _Problem:_ No source gives these numbers. The fetched thread [7] does not state this range. The video shows no such test. |
| D09-m6 | minor | DOC | open | L6-7, L33-77 | _Claim:_ Numbers shown as images. _Problem:_ All key numbers are images of formulas. A screen reader cannot read them. A reader cannot search or copy them. |

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
