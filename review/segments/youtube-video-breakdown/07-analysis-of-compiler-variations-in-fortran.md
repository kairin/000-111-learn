---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Empirical Results and Quantitative Comparison"
lines: 41-58
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-C2, D09-M1, D09-M6, D09-m1, D09-m5, D09-m6]
---

# Analysis of Compiler Variations in Fortran

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17). The video does not cover this idea. It names no Fortran compiler or flag.

> Parent section: **Empirical Results and Quantitative Comparison**


The benchmark highlights that Fortran's execution throughput is sensitive to the specific compiler version and optimization flags applied7. Because the GNU Compiler Collection (GCC) shares its backend across languages, modern versions of gfortran narrow the performance gap with C++, while older toolchains and alternative compiler architectures exhibit lower throughput on integer sieve operations7.

| Compiler Toolchain | Optimization Flags | Storage Mode | Output Throughput (P/s) |
| :---- | :---- | :---- | :---- |
| **GNU Fortran 7 (gfortran-7)** | \-march=native \-O3 | 1-bit integer packing | ![][image8] \[cite: 7\] |
| **GNU Fortran 8 (gfortran-8)** | \-march=native \-O3 | 1-bit integer packing | ![][image9] \[cite: 7\] |
| **GNU Fortran 9 (gfortran-9)** | \-march=native \-O3 | 1-bit integer packing | ![][image10] \[cite: 7\] |
| **GNU Fortran 10 (gfortran-10)** | \-march=native \-O3 | 1-bit integer packing | ![][image11] \[cite: 7\] |
| **GNU Fortran 11 (gfortran-11)** | \-march=native \-O3 | 1-bit integer packing | ![][image12] \[cite: 7\] |
| **Intel Fortran Classic (ifort 2021.4)** | \-Ofast \-march=core-avx2 | 1-bit integer packing | ![][image13] \[cite: 7\] |
| **Intel Fortran Compiler (ifx 2021.4)** | \-Ofast \-march=core-avx2 | 1-bit integer packing | ![][image14] \[cite: 7\] |
| **LLVM Flang 12 (flang-12)** | \-march=native \-O3 | 1-bit integer packing | ![][image15] \[cite: 7\] |

The jump in performance from gfortran-7 (![][image16]) to gfortran-11 (![][image17]) illustrates that compiler-level instruction scheduling, register allocation, and dead-code elimination can yield a ![][image18] performance increase on identical source code7.  
Conversely, the lower throughput observed with Intel's ifort and ifx compilers underscores the architectural focus of these compilers: while Intel's tools excel at auto-vectorizing dense, double-precision floating-point matrix multiplications via AVX-512, their optimization heuristics are less effective for non-contiguous, integer-dominated memory strides characteristic of the Sieve of Eratosthenes7.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-C2 | critical | VIDEO VERIFY | verify | L41-57 | _Claim:_ Eight Fortran compilers (gfortran 7 to 11, ifort, ifx, flang 12) with flags and P/s. _Problem:_ The video names no Fortran compiler, no version and no compiler flag. The reviewer fetched the cited source [7]. It is a fortran-lang forum thread from March 2022, with numbers from one user on an AMD Ryzen 7 3700X. The video uses a Threadripper (00:19). The document presents these numbers as "the benchmark" of Episode 04. That is a false attribution. The thread also shows ranges up to about 18,000 for other program variants, so the table shows only one variant. |
| D09-M1 | major | VIDEO DOC | open | L39, L43, L93 | _Claim:_ C++ and Fortran "operate near the theoretical limits". Modern gfortran "narrows the gap". Fortran "remains competitive with modern C++". _Problem:_ In the video, Fortran runs at about half the speed of C++ (14:03). At 14:15, Dave says that the leader runs at more than 4,000 passes per second, and that it is not C, C++ or Assembly. So the C++ entry is not near a "theoretical limit". Also, the gfortran-11 value in the document (12,417) is higher than its own C++ value (about 10,000). The document contradicts itself. |
| D09-M6 | major | DOC KNOW | open | L57 | _Claim:_ Intel compilers are slower because they focus on "AVX-512" floating-point work. _Problem:_ The table at L52-53 shows the flag "-march=core-avx2". That flag selects AVX2 (256-bit vector instructions), not AVX-512. The explanation has no source. It is a guess presented as a fact. |
| D09-m1 | minor | DOC | open | L47-54 | _Claim:_ "[cite: 7]" in each compiler row. _Problem:_ These are raw generation artifacts. All eight rows depend on one forum post. |
| D09-m5 | minor | DOC VERIFY | verify | L56 | _Claim:_ gfortran-7 to gfortran-11 gives a 39.4% increase. _Problem:_ The arithmetic is correct (12,417 divided by 8,905 is 1.394). But the thread may report total passes in 5 seconds, not passes per second. The unit needs a check. |
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
