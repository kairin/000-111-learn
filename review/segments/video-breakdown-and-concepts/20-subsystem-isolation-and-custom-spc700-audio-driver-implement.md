---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 159-163
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C4, D14-C6, D14-M5, D14-M10, D14-m6]
---

# Subsystem Isolation and Custom SPC700 Audio Driver Implementation

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 18:18](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1098s). The video assigns voices 0 to 4 to music and the last three to sound effects on standby. No voice is taken from the music.

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The Super Nintendo’s audio hardware operates as an independent computer isolated from the main system1. Driven by an 8-bit Sony SPC700 CPU running at 1.024 MHz, an 8-channel DSP, and 64 kB of dedicated Audio RAM, the APU cannot access the main system bus1. Communication between the Ricoh 5A22 CPU and the audio processor is restricted to four 8-bit bidirectional I/O registers (\$2140 through \$2143)1.  
Due to the lack of modern, modular sound drivers for homebrew development, Inkbox wrote a custom audio driver from scratch in SPC700 assembly1. At boot, the main CPU transfers the driver binary and Bit Rate Reduction (BRR) compressed audio samples into ARAM via the I/O communication ports1. The driver divides the DSP’s eight voices between music and sound effects: five channels are assigned to melodic tracks composed by Dr. Matt, while three channels are reserved for gameplay sound effects1. When a sound effect triggers (such as printing talismans, taking damage, or dying), the driver preempts lower-priority musical voices and restores them cleanly once playback finishes, preventing pops or clicks in the audio output1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C4 | critical | VIDEO | open | L43, L62, L94, L162, L183 | _Claim:_ Three "preemptive" sound-effect voices. The driver "preempts lower-priority musical voices and restores them cleanly". _Problem:_ The video says that voices 0 to 4 play music and that the last three voices wait on standby for the CPU (18:18 to 18:38). The CPU tells the APU "which voice channel to run the effect on". At 39:35 object sounds play on a channel "reserved for object sounds", so they do not disturb the player sounds or the music. No voice is taken from the music. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M10 | major | VIDEO VERIFY | verify | L43, L62, L162 | _Claim:_ Inkbox wrote the driver "due to the lack of modern, modular sound drivers". _Problem:_ The video says that "there are lots of SNES sound engines" that he could use (14:08 to 14:29). He writes his own because the Nintendo driver is copyrighted and because he wants to learn. The repository SimpleSNESSoundEngine exists on GitHub with an MIT license and uses SPCASM (checked by WebFetch). |
| D14-M5 | major | VIDEO KNOW | open | L43, L91, L161 | _Claim:_ The APU and CPU communicate through "four 8-bit bidirectional I/O registers". _Problem:_ The four addresses $2140 to $2143 are correct. But the video stresses that these are "eight separate registers" (12:28 to 12:48): four per direction, so a write on one side does not erase the value of the other side. The handshake of the boot ROM ($AA and $BB on ports 0 and 1, address on ports 2 and 3, then $CC, 12:48 to 13:48) is the main content of the audio part, and the document omits it. The "16-bit DSP" label at L92 is not in the video. |
| D14-m6 | minor | VIDEO | open | L162 | _Claim:_ "such as printing talismans, taking damage, or dying". _Problem:_ The player throws talismans (41:58). The word "printing" is wrong. |

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
