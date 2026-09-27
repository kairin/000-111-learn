---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: subsection
parent: "Architectural Foundations of the Contending Languages"
lines: 13-17
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-C3, D09-M8]
---

# COBOL: Business Data Processing and Record Orientation

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 04:32](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=272s). The COBOL code tour starts here.

> Parent section: **Architectural Foundations of the Contending Languages**


Created in 1959 under the auspices of the Conference on Data Systems Languages (CODASYL), COBOL was designed specifically to standardize commercial data management, payroll, and banking operations across diverse hardware architectures10. The language architecture is centered on file record processing, fixed-point decimal arithmetic (COMP-3), and English-like self-documenting syntax, rather than low-level integer manipulation or systems programming10.  
COBOL lacks low-level memory manipulation primitives, native unsigned integer types, and native bitwise bit-shifting instructions7. Array structures in COBOL are defined via the OCCURS clause within hierarchical data divisions, which necessitates runtime address calculations based on fixed record lengths rather than direct pointer displacement10. Furthermore, iterative execution relies on the PERFORM ... VARYING ... UNTIL construct, which imposes structured control-flow checks that resist aggressive register reuse and loop-unrolling optimizations10. When tasked with computing the Sieve of Eratosthenes, the COBOL compiler must synthesize mathematical indexing through high-level runtime routines, introducing significant overhead compared to systems-oriented languages8.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-C3 | critical | VIDEO | open | L16, L75-79 | _Claim:_ COBOL is slow because of table indexing, emulated bit operations and slow dynamic memory in each pass. _Problem:_ The video contradicts this section. At 05:17, the COBOL array holds a one-bit value repeated 500,000 times. At 05:30, Dave says that the COBOL program keeps a spare, preset copy of the array and copies it for each pass. He says that this "isn't technically faithful to the original". So the COBOL program does not allocate memory in each pass. Also, COBOL was not slow in this race (C1). The section explains a result that did not occur. |
| D09-M8 | major | KNOW VIDEO VERIFY | verify | L16, L79 | _Claim:_ COBOL "lacks native unsigned integer types" and "native bitwise" operations. _Problem:_ A COBOL number with PIC 9 and no S sign is unsigned. The COBOL 2002 standard added bit and boolean data, but compiler support varies. The video shows a one-bit array in the COBOL program (05:17). The claims are too strong. |

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
