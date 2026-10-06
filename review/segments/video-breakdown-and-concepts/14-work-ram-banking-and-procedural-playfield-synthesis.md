---
source: ../Video_Breakdown_and_Concepts.md
document: "Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game""
kind: subsection
parent: "Systematic Decomposition of Core Architectural Concepts"
lines: 97-101
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D14-C6, D14-M1, D14-M2, D14-m5]
---

# Work RAM Banking and Procedural Playfield Synthesis

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 21:18](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1278s). The video moves the objects out of bank $7F into the first bank to avoid bank register swaps. Tunnels are thin rooms (25:50), not single tiles.

> Parent section: **Systematic Decomposition of Core Architectural Concepts**


The 65c816 CPU addresses a 24-bit physical memory space organized into 64-kilobyte banks1. The system Work RAM provides 128 kB spanning Banks \$7E and \$7F1. In developing a sprawling dungeon crawler, allocating level geometry presents a fundamental architecture challenge1. If dynamic room generation is forced to share memory with dynamic arrays, call stacks, and zero-page pointers, large levels risk memory corruption or heap fragmentation1.  
Inkbox resolves this problem by isolating memory workloads between the two banks1. Bank \$7E handles general engine operations, stack pointers, gamepad input buffers, and active entity descriptors1. Bank \$7F is reserved as a dedicated 63 kB tile buffer that represents the active floor across a 192×168 tile grid1. The procedural generation algorithm operates within this clean memory partition, using room stamping combined with single-tile tunnel carving1. Because paths between room origins are generated using deterministic Manhattan vectors, the generator avoids loops and disconnected zones1. This design ensures reliable level generation that can scale up to 9,999 procedurally assembled floors1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D14-C6 | critical | DOC VERIFY | verify | L5-203 (all citations) | _Claim:_ Each sentence cites "1", and the text names the video as the subject. _Problem:_ Source 1 is the techeblog news article, not the video. The video is source 3, and the text cites it only three times together with 1 (L62, L63, L184). The reviewer fetched source 1. It is a short summary that mentions HDMA, mode 1, 128 sprites and five plus three voices. It says nothing about spatial hashing, color math, priority cycling, emulator divergence or compilers. So most citations point to a source that does not hold the claim. A "video breakdown" that cites a news article for the video is not a breakdown of the video. |
| D14-M1 | major | VIDEO VERIFY | verify | L5, L19, L23, L100, L105, L194 | _Claim:_ "Two-year bare-metal development", "9,999 distinct dungeon levels", "the 9,999 chicken kill requirement". _Problem:_ The video never gives a development time. Source 1 (techeblog) gives "two years" without a source. The video gives the goal as level 10,000 or 10,000 slain chickens (03:50). At 32:05 Inkbox says that the 16-bit packed BCD counter "fits exactly the 10,000 I need". An itch.io comment says 9999 (checked by WebFetch), so the number needs a check against the game. The document must not present it as a fact from the video. |
| D14-M2 | major | VIDEO | open | L19, L56, L99-100, L177 | _Claim:_ Bank $7F holds the world and bank $7E holds the stack and entity arrays, which "prevents stack overflows" and "heap fragmentation". Tunnels are "single-tile pathways" from "deterministic Manhattan vectors" that "avoid loops". _Problem:_ The video says that the world fills 63 K of the second RAM bank (06:31 to 06:53). The objects were first planned for $7F0000, but Inkbox moved them to the first bank to avoid data bank register swaps (21:18 to 21:59). There is no heap, so there is no fragmentation. Rooms come from the random number routine with rejection (25:08). Tunnels are rooms "with either a small width or height" (25:50), not single tiles. The first method made islands (26:12). The fix tunnels to the closest connected room. Inkbox calls it "not perfect" and says that it can give very long tunnels (26:32). Nothing is deterministic. |
| D14-m5 | minor | KNOW | open | L99 | _Claim:_ "zero-page pointers". _Problem:_ The 65c816 has a direct page, not a zero page. The video does not use either term. |

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
