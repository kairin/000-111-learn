---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 164-169
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C5, D14-C6]
---

# Physical Hardware Realization and Real-Silicon Divergence

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14). The video does not cover this idea. The cartridge is not finished in the video (46:55), and no hardware test or emulator divergence is shown.

Moving from emulator-based debugging to physical cartridge hardware exposes subtle differences between software models and authentic silicon1. High-accuracy emulators such as Mesen and bsnes simulate standard hardware timings closely, but physical systems introduce electrical behaviors like bus float, cold-boot RAM states, and variable signal propagation1.  
In software emulation, uninitialized RAM typically defaults to predictable zero states1. On physical console hardware, however, power-on SRAM cells contain random bit patterns that can trigger game logic bugs unless memory is explicitly cleared during boot1. Similarly, leaving hardware buses ungrounded can float data lines, producing phantom inputs or visual corruption1. Inkbox resolved these issues by adding exhaustive boot-clearing loops and strict initialization sequences to ensure reliable execution on physical hardware1.  
The physical production of *Zero Star* used open-hardware PCB designs from Mouse Bite Labs, pairing non-volatile flash ROMs with surface-mount cartridge shells to verify electrical compatibility on unmodified retail Super Nintendo hardware1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C5 | critical | VIDEO VERIFY | verify | L45-47, L63, L164-168, L184 | _Claim:_ Inkbox flashed ROM chips, tested cartridges on retail consoles, found divergences between Mesen, bsnes and real hardware, and added "boot-clearing loops". _Problem:_ The video has none of this. The cartridge work is a solder mask and transparent shells from the sponsor (07:36 to 08:40), the arrival of the parts (45:36 to 46:18), and solder paste (46:18). At 46:55 Inkbox says that the cartridge is good to go "as soon as I finish the game". The itch.io page tells players to use Mesen or bsnes and says nothing about cartridges (checked by WebFetch). The emulator divergence, the uninitialized RAM problem and the boot-clearing loops are inventions. |
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |

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
