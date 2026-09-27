---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: section-lead
parent: ""
lines: 29-40
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-C1, D09-C4, D09-M1, D09-m6]
---

# Empirical Results and Quantitative Comparison

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 13:51](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=831s). The video gives Fortran 1163 and COBOL 1118 passes, not the numbers in this part.

The execution throughput recorded in Episode 04 demonstrates performance tiers that span multiple orders of magnitude3. The quantitative outcomes illustrate the direct relationship between language design goals and computational execution speeds7.

| Language | Primary Target Domain | Memory Storage Unit | Relative Throughput (P/s) | Primary Execution Characteristics |
| :---- | :---- | :---- | :---- | :---- |
| **C++** | Systems / Systems Architecture | 1-bit packed field | ![][image5] | Fully inlined bitwise ALU operations; complete L1/L2 cache residency; optimal loop pipelining7 |
| **Fortran** | Numerical / High-Performance Computing | 1-bit field / 8-bit byte array | ![][image6] | Strict non-aliasing array optimization; high sensitivity to compiler versions and dynamic memory overhead7 |
| **COBOL** | Enterprise Transaction Processing | Indexed record byte table | ![][image7] | Multi-instruction table indexing; emulation of bit operations; structural runtime overhead8 |

The recorded metrics divide the competitors into two distinct performance brackets: C++ and Fortran operate near the theoretical limits of native single-threaded execution, while COBOL lags substantially behind, executing approximately 40 to 50 times slower than its counterparts7.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-C1 | critical | VIDEO | open | L33-39, L77 | _Claim:_ C++ about 10,000 P/s, Fortran about 6,000 P/s, COBOL 252 P/s, and COBOL "40 to 50 times slower". _Problem:_ The video gives different numbers. At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. At 14:03, the C++ program of Dave gets 1936 passes. Dave says that Fortran and COBOL are "about the same speed" and "about half the speed of my c plus effort" (14:03). Thus the ratio of C++ to COBOL is about 1.7, not 40 to 50. The ranking and the gap in the document are wrong. |
| D09-C4 | critical | DOC | open | L35-37 | _Claim:_ Throughput cells in the main results table. _Problem:_ The cells are images. The C++ cell shows only "≈ 10,000" and a dash, and the Fortran cell shows "≈ 6,000" and a dash. The range has no upper value. The COBOL cell shows only "≈" and no number. The main results table of the document is thus incomplete. |
| D09-M1 | major | VIDEO DOC | open | L39, L43, L93 | _Claim:_ C++ and Fortran "operate near the theoretical limits". Modern gfortran "narrows the gap". Fortran "remains competitive with modern C++". _Problem:_ In the video, Fortran runs at about half the speed of C++ (14:03). At 14:15, Dave says that the leader runs at more than 4,000 passes per second, and that it is not C, C++ or Assembly. So the C++ entry is not near a "theoretical limit". Also, the gfortran-11 value in the document (12,417) is higher than its own C++ value (about 10,000). The document contradicts itself. |
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
