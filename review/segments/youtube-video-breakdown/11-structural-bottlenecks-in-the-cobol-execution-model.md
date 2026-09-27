---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Memory Hierarchy Dynamics and Compiler Code Generation"
lines: 75-80
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-C1, D09-C3, D09-M8, D09-m2, D09-m6]
---

# Structural Bottlenecks in the COBOL Execution Model

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 05:30](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=330s). The video says that the COBOL program keeps a preset copy of the array, which is not faithful.

> Parent section: **Memory Hierarchy Dynamics and Compiler Code Generation**


COBOL's performance deficit of approximately ![][image31] is attributable to several architectural design choices8:  
The language lacks native, low-level pointer arithmetic7. Each access to an array element defined by the OCCURS clause requires the generated machine code to compute memory offsets through scaled multiplications and base-register additions10. In a nested loop marking multiples of prime numbers, these repetitive offset calculations consume substantial instruction cycles8.  
Additionally, standard COBOL contains no native bitwise primitives7. To emulate bit-level tracking, a developer must implement complex mathematical division and modulo operations or manipulate individual alphanumeric characters10. Consequently, COBOL implementations typically rely on byte-level structures, incurring both the cache penalties of expanded memory footprints and the execution cost of multi-step arithmetic operations6. Finally, dynamic memory management in COBOL is not designed for low-latency allocation cycles, causing runtime management routines to consume a substantial proportion of the 5-second test window8.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-C1 | critical | VIDEO | open | L33-39, L77 | _Claim:_ C++ about 10,000 P/s, Fortran about 6,000 P/s, COBOL 252 P/s, and COBOL "40 to 50 times slower". _Problem:_ The video gives different numbers. At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. At 14:03, the C++ program of Dave gets 1936 passes. Dave says that Fortran and COBOL are "about the same speed" and "about half the speed of my c plus effort" (14:03). Thus the ratio of C++ to COBOL is about 1.7, not 40 to 50. The ranking and the gap in the document are wrong. |
| D09-C3 | critical | VIDEO | open | L16, L75-79 | _Claim:_ COBOL is slow because of table indexing, emulated bit operations and slow dynamic memory in each pass. _Problem:_ The video contradicts this section. At 05:17, the COBOL array holds a one-bit value repeated 500,000 times. At 05:30, Dave says that the COBOL program keeps a spare, preset copy of the array and copies it for each pass. He says that this "isn't technically faithful to the original". So the COBOL program does not allocate memory in each pass. Also, COBOL was not slow in this race (C1). The section explains a result that did not occur. |
| D09-M8 | major | KNOW VIDEO VERIFY | verify | L16, L79 | _Claim:_ COBOL "lacks native unsigned integer types" and "native bitwise" operations. _Problem:_ A COBOL number with PIC 9 and no S sign is unsigned. The COBOL 2002 standard added bit and boolean data, but compiler support varies. The video shows a one-bit array in the COBOL program (05:17). The claims are too strong. |
| D09-m2 | minor | DOC | open | L77 | _Claim:_ COBOL "performance deficit of approximately 252 P/s". _Problem:_ A deficit (a difference) cannot be the rate itself. The value 252 is a COBOL rate from no known source. |
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
