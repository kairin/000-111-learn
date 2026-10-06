---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 45-48
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C5, D14-C6, D14-M7]
---

# Physical Manufacturing and Silicon Verification

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 45:36](https://www.youtube.com/watch?v=j_2bo7ng65E&t=2736s). The video shows the transparent cartridge parts and solder paste. It shows no ROM flashing, no console test and no emulator comparison.

> Parent section: **Video Structure and Narrative Progression**


The documentary concludes by covering the transition from emulator-based debugging to physical cartridge manufacturing1. Inkbox details the flashing of non-volatile ROM chips, integration with open-hardware PCB designs by Mouse Bite Labs, and the electrical testing of physical cartridges on original retail consoles1. The developer analyzes behavioral discrepancies observed between high-accuracy PC emulators (such as Mesen and bsnes) and real hardware, highlighting edge cases in open bus states, floating lines, and uninitialized RAM variables1. The presentation ends with the public release of the playable ROM image and the publication of the audio driver repository2.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C5 | critical | VIDEO VERIFY | verify | L45-47, L63, L164-168, L184 | _Claim:_ Inkbox flashed ROM chips, tested cartridges on retail consoles, found divergences between Mesen, bsnes and real hardware, and added "boot-clearing loops". _Problem:_ The video has none of this. The cartridge work is a solder mask and transparent shells from the sponsor (07:36 to 08:40), the arrival of the parts (45:36 to 46:18), and solder paste (46:18). At 46:55 Inkbox says that the cartridge is good to go "as soon as I finish the game". The itch.io page tells players to use Mesen or bsnes and says nothing about cartridges (checked by WebFetch). The emulator divergence, the uninitialized RAM problem and the boot-clearing loops are inventions. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
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
