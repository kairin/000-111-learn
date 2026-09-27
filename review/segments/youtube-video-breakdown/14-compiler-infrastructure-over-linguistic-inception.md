---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Broader Systems Engineering Implications"
lines: 91-96
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-M1]
---

# Compiler Infrastructure Over Linguistic Inception

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 00:19](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=19s). The video asks if old languages can approach modern C++ on new hardware.

> Parent section: **Broader Systems Engineering Implications**


The benchmark demonstrates that the execution speed of a compiled programming language is primarily governed by the sophistication of its compiler optimization backends rather than its date of inception7. Fortran, despite originating in the mid-1950s, remains competitive with modern C++ because modern optimizing compilers generate machine code targeted to advanced x86-64 microarchitectures, incorporating loop unrolling, instruction pipelining, and vectorization7.  
COBOL's lower throughput in this test is the result of architectural domain specialization rather than age: its specifications prioritize data integrity, format conversion, and business auditability over hardware-level memory access and register optimization10.  
Where direct memory layout control, minimal runtime abstraction, and cache saturation are essential, C++ provides consistent computational throughput, maintaining its role as the industry standard for performance-critical systems engineering6.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-M1 | major | VIDEO DOC | open | L39, L43, L93 | _Claim:_ C++ and Fortran "operate near the theoretical limits". Modern gfortran "narrows the gap". Fortran "remains competitive with modern C++". _Problem:_ In the video, Fortran runs at about half the speed of C++ (14:03). At 14:15, Dave says that the leader runs at more than 4,000 passes per second, and that it is not C, C++ or Assembly. So the C++ entry is not near a "theoretical limit". Also, the gfortran-11 value in the document (12,417) is higher than its own C++ value (about 10,000). The document contradicts itself. |

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
