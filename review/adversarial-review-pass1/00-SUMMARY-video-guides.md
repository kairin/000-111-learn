# Adversarial review, pass 1: summary of the eight video guides

The owner gave four YouTube videos to Google Gemini. For each video, Gemini wrote one report and one interactive page. This review checks the eight documents against the videos. The purpose is the same as in the first review: to show errors and areas that the owner did not think about. The learning of the two languages stays the primary goal.

**Method.** Four reviewers read the documents, their document parts and the English captions of each video. Each finding has a line location and an evidence tag. The new tag **[VIDEO]** means that the reviewer checked the claim against the captions. The captions stay on the computer of the owner, because the videos are the work of their makers. The reviews quote no more than 10 words from a video, with a timestamp. Some reviewers also did a few web checks. Their findings say so.

## The documents and their videos

| # | Document | Type | Video | Length |
|---|---|---|---|---|
| 05 | Assembly Language Video Breakdown | Report | [Assembly Language in 100 Seconds](https://www.youtube.com/watch?v=4gwYkEK0gOk) (Fireship) | 2:43 |
| 06 | assembly_language_architectural_explorer | Page | the same video | 2:43 |
| 07 | Fortran Video Breakdown | Report | [FORTRAN in 100 Seconds](https://www.youtube.com/watch?v=NMWzgy8FsKs) (Fireship) | 2:38 |
| 08 | fortran_technical_deconstruction | Page | the same video | 2:38 |
| 09 | YouTube Video Breakdown | Report | [C++ vs Fortran vs Cobol: E04](https://www.youtube.com/watch?v=yYcHWGxtRQo) (Dave's Garage) | 15:17 |
| 10 | software_drag_race_breakdown | Page | the same video | 15:17 |
| 11 | YouTube Video Content Analysis | Report | [E01: 45 Languages Tested](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage) | 22:26 |
| 12 | prime_sieve_benchmark_interactive_explorer | Page | the same video | 22:26 |

Each document part on the website shows its video. If the reviewer found the idea in the video, the link opens the video at that moment. 60 of the 71 new document parts have a moment. The other 11 parts say that the video does not cover the idea.

## Scorecard

| # | Goal met? | Confidence | Critical | Major | Minor | Headline |
|---|---|---|---|---|---|---|
| 05 | Partly | Medium | 2 | 9 | 12 | The code walk-through is correct, but the report cites the video for many claims that the video does not make. |
| 06 | Partly | Low | 3 | 7 | 12 | The simulator is a useful start. But the page invents the chart and the hexdump, and the chart does not draw on load. |
| 07 | Partly | Medium-low | 3 | 8 | 11 | The Fortran advice is mostly good, but the citations do not support the text, and the report misses most errors of the video. |
| 08 | Partly | Low | 3 | 8 | 9 | The page shows invented chart numbers, and its fake compiler prints the wrong output. |
| 09 | No | Low | 4 | 10 | 7 | The report contradicts the results of the video and takes most numbers from a later forum test. |
| 10 | No | Low | 4 | 9 | 8 | The page invents its headline numbers and shows COBOL 50 times slower, but the video shows COBOL equal to Fortran. |
| 11 | Partly | Low | 3 | 7 | 8 | The report names the right languages, but it invents results and reverses the Ada against Pascal outcome. |
| 12 | No | Low | 4 | 9 | 9 | The page shows invented speed data as real results, and its safety simulator computes nothing. |

In total: 169 findings (26 critical, 67 major, 76 minor). 50 findings have the tag [VIDEO].

## Problems that repeat in the eight documents

1. **The documents give the video as the source of claims that the video does not make.** A video of 2 or 3 minutes cannot hold a long technical report. The Assembly report cites the video about 80 times, also for memory protection, privilege rings and security. The video says none of these.
2. **Numbers contradict the video.** In E04, the video gives Fortran 1163 passes and COBOL 1118 passes (13:51). Dave says the two run at about the same speed, and at about half the speed of C++ (1936 passes). The report and the page say that COBOL is 40 to 50 times slower. Most numbers of report 09 come from a forum post of March 2022 on a different computer.
3. **The documents reverse or invent results.** The E01 report says that safe languages run as fast as C. The video has no C in that race, Delphi was not counted, and Pascal beat Ada. The E01 page shows 15 speed numbers with no source.
4. **The interactive parts do not compute.** The "virtual compiler" of page 08 shows fixed texts and prints integers where real Fortran prints real numbers. The safety simulator of page 12 and the cache "simulator" of page 10 only swap text. Page 06 invents its hexdump, and its chart does not draw when the page opens.
5. **The citations do not support the sentences.** The sources include Facebook posts, forum threads, a GitHub issue about a different language and mirror sites that look like spam. Good sources that the reports list are often not cited.
6. **The videos also have errors, and the documents do not catch them.** For example, the Fortran video says that 1957 gave the first language standard (the first standard was FORTRAN 66). The Assembly video says that the `.data` section holds constants.
7. **The pages repeat the delivery faults of the first review:** the development version of Tailwind from a CDN, Chart.js with no version number, raw LaTeX on the screen, and weak keyboard and screen-reader support.

## What holds up

- The Assembly "Hello, World" walk-through is correct: the code, the syscall numbers 1 and 60, the 14 bytes, the register roles and the `nasm` and `ld` commands. A reviewer built an equal program and ran it.
- The core Fortran facts are correct: Backus, the IBM 704, 1954 to 1957, the punch-card columns, the I to N rule, and the advice to use `implicit none` and `.f90`.
- The E04 and E01 documents give the correct benchmark frame: a sieve to 1,000,000, 78,498 primes, and runs of 5 seconds.

## What this means for the learning journey

| Video | Use for the owner |
|---|---|
| Assembly in 100 Seconds | A good first look at the A side. But it uses **x86-64 on Linux**, a later dialect than the **8086 on DOS** of the game. The words `mov`, `syscall` and the 64-bit registers (`rax`, `rdi`) do not exist in the 8086 in this form. |
| FORTRAN in 100 Seconds | A good first look at the B side: types, the I to N rule, `implicit none`, arrays and loops. Watch for its errors (see finding list of document 07). |
| E04: C++ vs Fortran vs Cobol | The most useful part for the B side is the code tour, which the documents ignore: `IMPLICIT NONE`, `BTEST`, `IBCLR`, `MOD`, `ALLOCATE` and `WRITE` formats. The benchmark result says little about Fortran in general. |
| E01: 45 Languages | Low relevance. The race is Ada against Pascal. Assembly and Fortran show only briefly. The repository of the series has Assembly and Fortran versions that are worth a look later. |

## Pass-2 plan

- [ ] Read the numbers that the videos show only on screen (for example the Ada and Pascal pass counts in E01, 19:51 to 20:20).
- [ ] Check the high-stakes web facts that the reviews tag [VERIFY], for example the rules of the Primes repository and the dates of Kathleen Booth.
- [ ] Record the results in `review/findings/status.json`.

## Files

- `05-Assembly-Language-Video-Breakdown.review.md`
- `06-assembly_language_architectural_explorer.review.md`
- `07-Fortran-Video-Breakdown.review.md`
- `08-fortran_technical_deconstruction.review.md`
- `09-YouTube-Video-Breakdown.review.md`
- `10-software_drag_race_breakdown.review.md`
- `11-YouTube-Video-Content-Analysis.review.md`
- `12-prime_sieve_benchmark_interactive_explorer.review.md`
- Findings data: `../findings/pass1-video-guides.json`
- Video moments: `../findings/video-moments/`
