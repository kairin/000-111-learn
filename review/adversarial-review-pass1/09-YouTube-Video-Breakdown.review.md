---
target: ../segments/YouTube Video Breakdown.md
segments: ../segments/youtube-video-breakdown/
video: https://www.youtube.com/watch?v=yYcHWGxtRQo
pass: 1
date: 2026-09-27
---

# Adversarial review: "Performance Analysis and Architectural Breakdown: C++ vs. Fortran vs. COBOL (Dave's Garage Episode 04)"

The source video is "What's the FASTEST Computer Language? C++ vs Fortran vs Cobol: E04" by Dave's Garage (15:17). The reviewer read the full auto-caption transcript of the video. The reviewer also read two web pages to check high-stakes facts. These are the CONTRIBUTING rules of the PlummersSoftwareLLC/Primes GitHub repository (the project that holds all the drag race programs) and the fortran-lang Discourse thread that the document cites as [7].

The document shows most of its numbers as small images, not as text. The reviewer decoded the 31 images. This review quotes their values in plain text.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (internal contradiction, arithmetic, missing data) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the transcript of the source video, with a timestamp |

## 1. Goals and objectives

1. Summarize what Episode 04 of the "Software Drag Race" shows: a prime sieve race between C++, Fortran and COBOL.
2. Report the benchmark rules and the results (passes per second) of the video correctly.
3. Explain why the languages differ in speed (compilers, memory, cache, language design).
4. Put the result in context: what a small benchmark (a "microbenchmark") can and cannot tell about a language.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Summary of the video | **No** | The document does not describe the video. It omits the code tour, which fills about 10 of the 15 minutes. It adds a compiler study that the video does not contain (C2). |
| 2. Rules and results | **No** | The results contradict the video. In the video, Fortran and COBOL are almost equal, and both run at about half the speed of C++. The document says that COBOL is 40 to 50 times slower (C1). |
| 3. Explanation of speed | **Partly** | The cache arithmetic is correct. But the document explains a COBOL result that did not occur. Several language claims are wrong or too strong (C3, M4, M5, M8). |
| 4. Context | **Partly** | The warning about microbenchmarks is fair and useful. But the "Fortran is competitive with C++" conclusion is not what the video shows (M1). |

**Overall confidence in the document:** Low. The document sounds precise, but its main result contradicts the video, and most numbers come from a different test on a different computer.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L33-39, L77 | C++ about 10,000 P/s, Fortran about 6,000 P/s, COBOL 252 P/s, and COBOL "40 to 50 times slower" | The video gives different numbers. At 13:51, Fortran gets 1163 passes and COBOL gets 1118 passes. At 14:03, the C++ program of Dave gets 1936 passes. Dave says that Fortran and COBOL are "about the same speed" and "about half the speed of my c plus effort" (14:03). Thus the ratio of C++ to COBOL is about 1.7, not 40 to 50. The ranking and the gap in the document are wrong. | [VIDEO] |
| C2 | L41-57 | Eight Fortran compilers (gfortran 7 to 11, ifort, ifx, flang 12) with flags and P/s | The video names no Fortran compiler, no version and no compiler flag. The reviewer fetched the cited source [7]. It is a fortran-lang forum thread from March 2022, with numbers from one user on an AMD Ryzen 7 3700X. The video uses a Threadripper (00:19). The document presents these numbers as "the benchmark" of Episode 04. That is a false attribution. The thread also shows ranges up to about 18,000 for other program variants, so the table shows only one variant. | [VIDEO], [VERIFY] |
| C3 | L16, L75-79 | COBOL is slow because of table indexing, emulated bit operations and slow dynamic memory in each pass | The video contradicts this section. At 05:17, the COBOL array holds a one-bit value repeated 500,000 times. At 05:30, Dave says that the COBOL program keeps a spare, preset copy of the array and copies it for each pass. He says that this "isn't technically faithful to the original". So the COBOL program does not allocate memory in each pass. Also, COBOL was not slow in this race (C1). The section explains a result that did not occur. | [VIDEO] |
| C4 | L35-37 | Throughput cells in the main results table | The cells are images. The C++ cell shows only "≈ 10,000" and a dash, and the Fortran cell shows "≈ 6,000" and a dash. The range has no upper value. The COBOL cell shows only "≈" and no number. The main results table of the document is thus incomplete. | [DOC] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L39, L43, L93 | C++ and Fortran "operate near the theoretical limits". Modern gfortran "narrows the gap". Fortran "remains competitive with modern C++" | In the video, Fortran runs at about half the speed of C++ (14:03). At 14:15, Dave says that the leader runs at more than 4,000 passes per second, and that it is not C, C++ or Assembly. So the C++ entry is not near a "theoretical limit". Also, the gfortran-11 value in the document (12,417) is higher than its own C++ value (about 10,000). The document contradicts itself. | [VIDEO], [DOC] |
| M2 | L6 | Each program runs for "a fixed, non-extendable duration of 5.0 seconds" | The Primes CONTRIBUTING file says that a program runs for "at least 5 seconds" and stops as soon as possible after that (checked by WebFetch). At 10:25, the video shows that the Fortran program checks the time after each pass. The last pass can end after 5 seconds. The value "5 seconds" is correct. The word "non-extendable" is wrong. | [VIDEO], [VERIFY] |
| M3 | L7 | The "faithful" rules: a class, a new buffer on each pass, validation against 78,498 primes "before execution finishes" | The rules are mostly correct, but the document cites them to [7], a forum thread, not to the repository [5]. The CONTRIBUTING file (checked by WebFetch) requires a class or equivalent, a new instance for each pass, a buffer allocated at runtime, and no external libraries. It does not say "validate before execution finishes". The document also omits that the COBOL program in the video breaks these rules (05:30). The reviewer did not check which rules existed on the date of the video. | [DOC], [VIDEO], [VERIFY] |
| M4 | L21, L88 | Standard Fortran "specifies that array arguments cannot overlap", which gives the compiler "complete freedom" | This is too strong. The standard gives this rule to the programmer, and compilers do not check it. Arguments with POINTER or TARGET can overlap. A program that breaks the rule can give wrong results with no error message. Also, the sieve uses one array, so this rule has almost no effect on this race. | [KNOW] |
| M5 | L22 | Fortran 2003 and 2008 "introduced object-oriented paradigms and dynamic memory management" | Dynamic arrays (ALLOCATABLE) came in Fortran 90, not in 2003 or 2008. Object-oriented features came in Fortran 2003. Fortran 2008 mainly added coarrays (parallel features). | [KNOW] |
| M6 | L57 | Intel compilers are slower because they focus on "AVX-512" floating-point work | The table at L52-53 shows the flag "-march=core-avx2". That flag selects AVX2 (256-bit vector instructions), not AVX-512. The explanation has no source. It is a guess presented as a fact. | [DOC], [KNOW] |
| M7 | L66-68 | Bit storage is faster than byte storage because of the cache. The Fortran bit version gives about 50% more throughput than byte arrays | The video does not test or discuss this. The machine in the video is a Threadripper, but the document uses generic cache sizes. In the Primes project, some fast solutions use bytes, not bits, so the cache argument is not always true. The "50%" comes from the forum thread [7]. The fetched thread says the gain is over the best "bitfield" results, not over byte arrays. | [VIDEO], [KNOW], [VERIFY] |
| M8 | L16, L79 | COBOL "lacks native unsigned integer types" and "native bitwise" operations | A COBOL number with PIC 9 and no S sign is unsigned. The COBOL 2002 standard added bit and boolean data, but compiler support varies. The video shows a one-bit array in the COBOL program (05:17). The claims are too strong. | [KNOW], [VIDEO], [VERIFY] |
| M9 | L73 | An object-oriented Fortran sieve is 30% to 50% slower than a procedural one | No source gives these numbers. The fetched thread [7] does not state this range. The video shows no such test. | [VERIFY] |
| M10 | L20 | Fortran "represents the earliest high-level programming language" | This is an overclaim. Earlier high-level languages exist, for example Plankalkul (design) and Short Code. Fortran was the first widely used high-level language with an optimizing compiler. The video says that Fortran "goes back to 1954" (01:35). | [KNOW], [VIDEO] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L47-54 | "[cite: 7]" in each compiler row | These are raw generation artifacts. All eight rows depend on one forum post. | [DOC] |
| m2 | L77 | COBOL "performance deficit of approximately 252 P/s" | A deficit (a difference) cannot be the rate itself. The value 252 is a COBOL rate from no known source. | [DOC] |
| m3 | L27, L66 | C++ keeps working data "entirely within the processor's highest-speed cache lines" | L66 says that the 61 KB bit array spills out of the 32 to 48 KB L1 cache. The two sentences contradict each other. | [DOC] |
| m4 | L26 | C++ "guarantees zero-cost abstractions" | This is a design principle (the "zero-overhead principle"), not a guarantee. Some features, for example exceptions and virtual calls, have a cost. | [KNOW] |
| m5 | L56 | gfortran-7 to gfortran-11 gives a 39.4% increase | The arithmetic is correct (12,417 divided by 8,905 is 1.394). But the thread may report total passes in 5 seconds, not passes per second. The unit needs a check. | [DOC], [VERIFY] |
| m6 | L6-7, L33-77 | Numbers shown as images | All key numbers are images of formulas. A screen reader cannot read them. A reader cannot search or copy them. | [DOC] |
| m7 | L5 | "retired Microsoft systems engineer Dave Plummer" | This is correct in substance. At 00:58, Dave says that he is a retired operating systems engineer from Microsoft, from the MS-DOS and Windows 95 days. | [VIDEO] |

## 4. Source-quality audit

- The document lists 16 sources. The text cites about 9 of them: [1], [2], [3], [6], [7], [8], [9], [10], [13].
- Source [7], a forum thread, gets about 40 citations. That is most of all citations. Source [6], a Reddit "explain like I am five" thread, gets about 15. Source [10], a COBOL tutorial video, gets about 10.
- The video itself [1] gets only one citation. The primary repository [5] (PlummersSoftwareLLC/Primes) gets none, but it holds the real rules and code.
- Source [3] is podwise.ai, an AI summary site. It is not a primary source.
- Sources [4], [5], [11], [12], [14], [15] and [16] never get a citation. The bibliography looks padded.
- Citations often do not support the sentence. For example, the text cites [6] (Reddit) for cache latencies (L66) and [10] (a COBOL tutorial) for the addressing code that compilers generate (L78).

## 5. Omissions a skeptic would raise

1. **The code tour.** Most of the video explains the COBOL and Fortran source code. The document omits all of it: PIC clauses (05:03), PERFORM (06:13), IMPLICIT NONE and implicit typing (09:06 to 09:52), .LT. and .GT. (11:22), BTEST, IBCLR and MOD (11:33), and WRITE formats (12:07).
2. **The fairness of the race.** Dave says that the COBOL program is not faithful (05:30). The document never says this, so the reader cannot judge the COBOL result.
3. **Who wrote the programs.** Community members wrote the COBOL and Fortran programs (04:44). Dave says that he never coded in either language beyond school tasks (03:27). A result shows the skill of one programmer as much as the speed of a language.
4. **Hardware and repeat runs.** The video uses one run on one Threadripper. The document gives no error range and does not name the machine.
5. **The history section of the video.** Dave corrects the Grace Hopper "inventor of COBOL" story (02:23 to 03:08) and gives COBOL usage estimates (03:37 to 04:21). The document omits this part.

## 6. Use for the learning journey

- **B side (Fortran): keep** the idea that a Fortran program needs IMPLICIT NONE. Without it, names that start with I to N are integers and other names are real (09:28). The video shows this, but the document does not.
- **B side (Fortran): keep** the list of bit functions from the video: BTEST, IBCLR and MOD (11:33). Also keep ALLOCATE and DEALLOCATE for each pass (10:47). These are real, useful Fortran tools.
- **Ignore** the compiler table and all P/s numbers in the document. They do not come from the video. Use the video numbers: Fortran 1163, COBOL 1118, C++ 1936 (13:51 to 14:03).
- **About benchmarks:** a sieve race measures one integer task, on one machine, with one program by one author. It does not tell you how fast Fortran is for numerical work, which is its main use. It also does not tell you if Fortran is good to learn.
- **A side (Assembly):** this video has almost no Assembly content. It says only that Fortran replaced hand-written Assembly (02:00) and that Assembly is not the race leader (14:15).

## 7. Pass-2 verification list

- [ ] Confirm the video numbers on screen (1163, 1118, 1936) and whether they are passes in 5 seconds or passes per second (C1, m5).
- [ ] Find the source of "252 P/s", "about 10,000" and "about 6,000", or mark them as invented (C1, C4, m2).
- [ ] Read the forum thread [7] in full. Record the date, machine, program variant and unit of each compiler number (C2, M7, M9).
- [ ] Check the Primes CONTRIBUTING history for the rules on the date of Episode 04 (M2, M3).
- [ ] Check which COBOL compiler the video used (for example GnuCOBOL) and its bit support (M8).
- [ ] Check the Fortran standard text on argument aliasing (M4).
