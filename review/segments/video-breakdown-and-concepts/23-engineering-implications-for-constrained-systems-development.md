---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: section-lead
parent: ""
lines: 186-191
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M6, D14-m7]
---

# Engineering Implications for Constrained Systems Development

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14). The video does not cover this idea. It does not discuss compilers or register files.

The systems architecture presented in Inkbox’s post-mortem highlights key principles for constrained software development that remain relevant across embedded engineering and retrocomputing2.  
First, targeting constrained processors like the 65c816 illustrates the limits of modern optimizing compilers on non-orthogonal architectures1. Modern C compilers are designed around architectures with deep, uniform register files, such as ARM or RISC-V10. When compiling for the 65c816—which relies on an 8/16-bit accumulator, two index registers, and direct-page memory locations—compilers often generate substantial stack-spilling code2. Hand-assembling the codebase allowed Inkbox to use platform-specific features that compilers rarely target, such as the processor's decimal mode (SED) for zero-cost HUD arithmetic1. This demonstrates that deep hardware familiarity can outperform generic compiler optimizations on specialized, resource-limited platforms1.  
Second, the SNES architecture demonstrates the benefits of using specialized hardware coprocessors to handle distinct processing tasks1. Maximizing performance on vintage silicon is not achieved by forcing the central CPU to compute every operation sequentially, but by offloading work to independent submodules1. HDMA handles multi-plane background parallax scrolling without CPU intervention; the PPU color math engine executes screen-wide visual effects directly in the display pipeline without CGRAM writes; and the SPC700 audio subsystem mixes eight channels of BRR audio completely independently of the gameplay loop1. Organizing software to align with underlying silicon pipelines allows constrained hardware to deliver complex, multi-layered visual and audio experiences1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M6 | major | VIDEO DOC | open | L15, L189 | _Claim:_ Inkbox "shows how modern compilers introduce register-thrashing and memory bloat", and hand assembly "can outperform generic compiler optimizations". _Problem:_ The video does not discuss compilers. It says only "written in pure assembly" (00:00). L189 cites source 10 for the compiler claim. Source 10 is a video about Unity and Mono, not about the 65c816. |
| D14-m7 | minor | KNOW VIDEO | open | L11, L190 | _Claim:_ HDMA is a "hardware coprocessor". _Problem:_ HDMA is a function of the DMA controller in the CPU package, not a coprocessor. The video calls it "a hardware feature" (35:11). |

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
