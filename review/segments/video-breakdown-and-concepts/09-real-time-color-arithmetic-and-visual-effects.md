---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 37-40
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M4, D14-M7]
---

# Real-Time Color Arithmetic and Visual Effects

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 37:13](https://www.youtube.com/watch?v=j_2bo7ng65E&t=2233s). The video darkens layer 1 with black tiles on layer 3 and add-half color math. No subtraction, no inversion, no single-frame flash.

> Parent section: **Video Structure and Narrative Progression**


Inkbox highlights the console’s dedicated hardware color math engine, which enables visual effects without the bandwidth costs of rewriting Color Graphics RAM (CGRAM) palettes during active frames1. The hardware allows the sub-screen and main-screen color values to be dynamically added, subtracted, or averaged in real time1. The video demonstrates how hit-stop impact effects (such as the single-frame black flash triggered when striking a chicken), weapon slashes, and elemental talisman spells (fire trails, ice freezing, and bonus item bursts) are executed through direct register updates rather than expensive palette reloads1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M4 | major | VIDEO | open | L39, L61, L86, L152-157, L182 | _Claim:_ Hit stop is a "single-frame black flash". The engine writes $2132 and enables subtraction in $2131, "inverting the display". The talismans use color math: fire trails, ice "shifts color palettes", gold and peach give "screen-wide color flashes". _Problem:_ The video describes one trick: layer 3 holds black tiles, layer 1 leaves the subscreen, and "add and divide by two" halves the brightness (37:13 to 37:34). That is addition, not subtraction, and no inversion. The same trick darkens the background during hit stop, which pauses the game "for a few frames" (40:37). The four talisman effects are four palette colors of the same cloud animation (42:39). Three talismans spawn new objects (42:59). The video never says that the ice talisman freezes anything or that a screen flashes. |
| D14-M7 | major | VIDEO | open | L11-47, L203 | _Claim:_ The video "follows nine distinct technical stages", begins with the CPU architecture and the lack of an OS, and ends with the ROM release and the driver repository. _Problem:_ The video begins with a recap and game design: fewer buttons, the attack blind spot, animation timing (00:26 to 02:48). The audio part is in the middle (08:40 to 19:30), not at the end. The video ends with the cartridge parts, the music of Dr. Matt, the free release, a poll about a physical release, and the PC Engine (45:03 to 50:53). The nine stages are the structure of the document, not of the video. |

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
