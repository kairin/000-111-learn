---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 13-16
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M6, D14-M7, D14-m2]
---

# Bare-Metal Hardware Baseline and Computational Limitations

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 00:00](https://www.youtube.com/watch?v=j_2bo7ng65E&t=0s). The video says only that the game is written in pure assembly. It does not discuss compilers, an OS or a memory management unit.

> Parent section: **Video Structure and Narrative Progression**


The video begins by examining the physical architecture of the Super Nintendo, highlighting the lack of an operating system, the absence of an integrated memory management unit, and the severe processing limitations of the Ricoh 5A22 central processor1. Inkbox discusses the rationale behind writing native 65c816 assembly rather than using high-level compiled abstractions, showing how modern compilers introduce register-thrashing and memory bloat on vintage accumulator-constrained CPUs1. The introduction outlines the central technical challenge: building a procedural dungeon crawler capable of managing dynamic world generation, dozens of concurrent entities, multi-layered parallax backgrounds, and dynamic sound effects within an unforgiving 16-bit hardware architecture1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M6 | major | VIDEO DOC | open | L15, L189 | _Claim:_ Inkbox "shows how modern compilers introduce register-thrashing and memory bloat", and hand assembly "can outperform generic compiler optimizations". _Problem:_ The video does not discuss compilers. It says only "written in pure assembly" (00:00). L189 cites source 10 for the compiler claim. Source 10 is a video about Unity and Mono, not about the 65c816. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |
| D14-m2 | minor | VIDEO KNOW | open | L6, L15, L23, L55 | _Claim:_ "Ricoh 5A22", "3.58 MHz", "dual PPUs (PPU1 and PPU2)", "absence of an integrated memory management unit". _Problem:_ The video names none of these. The values are correct hardware facts, but they are not from the video. |

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
