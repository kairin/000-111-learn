---
source: ../YouTube Video Breakdown.md
document: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"
kind: section-lead
parent: ""
lines: 3-8
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
findings: [D09-M2, D09-M3, D09-m6, D09-m7]
---

# Benchmark Design and Experimental Protocol

> **Source video:** [What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage, 15:17) · [at 10:25](https://www.youtube.com/watch?v=yYcHWGxtRQo&t=625s). The video shows the 5-second loop here and names the one-million limit at 13:03.

In Episode 04 of the "Software Drag Race" series hosted on the *Dave's Garage* channel, retired Microsoft systems engineer Dave Plummer conducts a comparative performance evaluation among three historically foundational compiled programming languages: C++, Fortran, and COBOL1. Originating from a broader open-source initiative designed to evaluate execution efficiency across dozens of languages, the benchmark implements an identical computational workload across all test subjects using the Sieve of Eratosthenes algorithm2. The primary objective is to determine how compiler maturity, memory abstraction layers, and language-specific runtime architectures influence execution speed under standardized execution constraints6.  
The testing apparatus evaluates single-threaded execution throughput by generating prime numbers up to an upper limit of ![][image1]7. Each implementation is executed within a fixed, non-extendable duration of 5.0 seconds, during which the runtime completes as many full passes of the sieve as possible7. Performance is quantified using the standardized metric of passes per second (![][image2]), calculated by dividing the total number of verified passes by the elapsed runtime7.  
To maintain parity and prevent unfair optimization shortcuts, the project defines strict "faithful" implementation criteria7. A faithful submission must encapsulate the algorithm within a class, module, or distinct object boundary, dynamically allocate or reinitialize the working memory buffer on every pass rather than reusing a static array, and validate the computed result against a reference truth table (![][image3] primes below ![][image4]) before execution finishes7. Implementations are further categorized based on their underlying data storage strategy, differentiating between compact 1-bit representations that optimize for processor cache residency and 8-bit byte-array representations that eliminate bit-shifting arithmetic overhead7.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D09-M2 | major | VIDEO VERIFY | verify | L6 | _Claim:_ Each program runs for "a fixed, non-extendable duration of 5.0 seconds". _Problem:_ The Primes CONTRIBUTING file says that a program runs for "at least 5 seconds" and stops as soon as possible after that (checked by WebFetch). At 10:25, the video shows that the Fortran program checks the time after each pass. The last pass can end after 5 seconds. The value "5 seconds" is correct. The word "non-extendable" is wrong. |
| D09-M3 | major | DOC VIDEO VERIFY | verify | L7 | _Claim:_ The "faithful" rules: a class, a new buffer on each pass, validation against 78,498 primes "before execution finishes". _Problem:_ The rules are mostly correct, but the document cites them to [7], a forum thread, not to the repository [5]. The CONTRIBUTING file (checked by WebFetch) requires a class or equivalent, a new instance for each pass, a buffer allocated at runtime, and no external libraries. It does not say "validate before execution finishes". The document also omits that the COBOL program in the video breaks these rules (05:30). The reviewer did not check which rules existed on the date of the video. |
| D09-m6 | minor | DOC | open | L6-7, L33-77 | _Claim:_ Numbers shown as images. _Problem:_ All key numbers are images of formulas. A screen reader cannot read them. A reader cannot search or copy them. |
| D09-m7 | minor | VIDEO | open | L5 | _Claim:_ "retired Microsoft systems engineer Dave Plummer". _Problem:_ This is correct in substance. At 00:58, Dave says that he is a retired operating systems engineer from Microsoft, from the MS-DOS and Windows 95 days. |

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
