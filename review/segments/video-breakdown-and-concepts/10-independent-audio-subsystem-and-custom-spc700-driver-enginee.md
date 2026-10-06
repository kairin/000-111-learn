---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Video Structure and Narrative Progression"
lines: 41-44
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C4, D14-C6, D14-M5, D14-M7, D14-M10]
---

# Independent Audio Subsystem and Custom SPC700 Driver Engineering

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 08:40](https://www.youtube.com/watch?v=j_2bo7ng65E&t=520s). The audio part runs from here to 19:30. Five voices play music, and three dedicated voices wait for sound effects (18:18).

> Parent section: **Video Structure and Narrative Progression**


The video examines the SNES audio architecture, which operates as a self-contained system physically isolated from the main processor1. Built around an 8-bit Sony SPC700 CPU running at 1.024 MHz, an 8-channel DSP, and 64 kB of dedicated Audio RAM, the audio unit communicates with the main CPU through four 8-bit bidirectional I/O registers1. Inkbox discusses the challenges of modern homebrew audio development and presents an open-source SPC700 audio driver built entirely from scratch in assembly1. The technical breakdown details how Bit Rate Reduction (BRR) compressed audio samples are loaded, and how the DSP’s eight voices are divided: five voices dedicated to Dr. Matt’s musical score, and three preemptive voices reserved for dynamic sound effects1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C4 | critical | VIDEO | open | L43, L62, L94, L162, L183 | _Claim:_ Three "preemptive" sound-effect voices. The driver "preempts lower-priority musical voices and restores them cleanly". _Problem:_ The video says that voices 0 to 4 play music and that the last three voices wait on standby for the CPU (18:18 to 18:38). The CPU tells the APU "which voice channel to run the effect on". At 39:35 object sounds play on a channel "reserved for object sounds", so they do not disturb the player sounds or the music. No voice is taken from the music. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M10 | major | VIDEO VERIFY | verify | L43, L62, L162 | _Claim:_ Inkbox wrote the driver "due to the lack of modern, modular sound drivers". _Problem:_ The video says that "there are lots of SNES sound engines" that he could use (14:08 to 14:29). He writes his own because the Nintendo driver is copyrighted and because he wants to learn. The repository SimpleSNESSoundEngine exists on GitHub with an MIT license and uses SPCASM (checked by WebFetch). |
| D14-M5 | major | VIDEO KNOW | open | L43, L91, L161 | _Claim:_ The APU and CPU communicate through "four 8-bit bidirectional I/O registers". _Problem:_ The four addresses $2140 to $2143 are correct. But the video stresses that these are "eight separate registers" (12:28 to 12:48): four per direction, so a write on one side does not erase the value of the other side. The handshake of the boot ROM ($AA and $BB on ports 0 and 1, address on ports 2 and 3, then $CC, 12:48 to 13:48) is the main content of the audio part, and the document omits it. The "16-bit DSP" label at L92 is not in the video. |
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
