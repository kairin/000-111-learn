---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 3-8
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M1, D14-m2, D14-m3, D14-m11]
---

# Architectural Foundations and Project Scope

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 00:26](https://www.youtube.com/watch?v=j_2bo7ng65E&t=26s). The video starts with a recap of the earlier demo and the plan to finish the game. It gives no development time, no ROM size and no CPU name.

Targeting fourth-generation console architectures presents distinct engineering challenges, primarily arising from the platform's non-uniform memory maps, rigid hardware line buffers, and asynchronous co-processing subsystems1. In the technical documentary *"It Took Every SNES Hardware Trick To Make My Game"*, software engineer and retrocomputing specialist Inkbox deconstructs the two-year bare-metal development of *〇 Star* (*Zero Star*), an original top-down dungeon crawler designed for native execution on the Super Nintendo Entertainment System (SNES)1. Unlike contemporary retro-styled projects that rely on high-level languages like C or compiled development environments that introduce runtime overhead and unoptimized binary footprints, *Zero Star* was authored entirely in hand-assembled 65c816 and SPC700 machine instructions1.  
The primary objective was to deliver a responsive, procedurally generated action RPG contained entirely within a 129-kilobyte ROM image, executed on historical hardware without relying on auxiliary expansion coprocessors such as the Super FX or SA-1 chips1. The underlying hardware platform, released in 1990, is governed by a Ricoh 5A22 central processing unit running at a maximum clock frequency of 3.58 MHz, paired with 128 kB of Work RAM (WRAM), 64 kB of Video RAM (VRAM), and an isolated 64 kB Audio RAM (ARAM) subsystem1.  
The documentary covers game design post-mortem analysis and bare-metal systems engineering, demonstrating how hardware quirks and CRT raster timings can be harnessed to bypass the physical constraints of vintage computing silicon1. The physical realization of the project was supported by custom background pixel art by Hornests, an original soundtrack by Dr. Matt, and open-hardware physical cartridge board implementations developed by Mouse Bite Labs1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M1 | major | VIDEO VERIFY | verify | L5, L19, L23, L100, L105, L194 | _Claim:_ "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement". _Problem:_ The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. |
| D14-m11 | minor | VERIFY | verify | L6, L184 | _Claim:_ A "129-kilobyte ROM image". _Problem:_ This is correct. The itch.io page gives 129 kB (checked by WebFetch). The video does not give the size. |
| D14-m2 | minor | VIDEO KNOW | open | L6, L15, L23, L55 | _Claim:_ "Ricoh 5A22", "3.58 MHz", "dual PPUs (PPU1 and PPU2)", "absence of an integrated memory management unit". _Problem:_ The video names none of these. The values are correct hardware facts, but they are not from the video. |
| D14-m3 | minor | VERIFY | verify | L7 | _Claim:_ Background pixel art "by Hornests". _Problem:_ The captions do not name Hornests. Source 1 says it. Pass 2 must check the credits of the game. |

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
