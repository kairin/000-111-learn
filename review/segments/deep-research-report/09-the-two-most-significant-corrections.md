---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: subsection
parent: "Factual cross-check and caveats"
lines: 317-322
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-C3, D13-m1]
---

# The two most significant corrections

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 11:47](https://www.youtube.com/watch?v=j_2bo7ng65E&t=707s). The only 6502 remark of the video is here, about the SPC700. The two corrections of this part correct Hackaday, not the video.

> Parent section: **Factual cross-check and caveats**


The **4 MiB point** is the clearest potential misconception. A reader could leave with the impression that no SNES ROM can exceed 4 MiB. That is false as a universal statement: ExHiROM specifically provides a mapping scheme beyond the normal 4 MiB HiROM range. citeturn28search4 If Inkbox frames 4 MiB as a project rule intended to match an ordinary historical cartridge configuration, however, the claim is perfectly reasonable.

The **CPU description** deserves similar precision. Hackaday calls it a “3.58 MHz Ricoh 6502-based CPU”. citeturn35search2 The family resemblance is real, but the more useful programming description is **Ricoh 5A22 with a 65C816-derived 8/16-bit core**, not an ordinary 8-bit 6502. WDC’s W65C816S documentation identifies 16-bit ALU/register capabilities and a 24-bit, 16 MB address space, while SNES documentation reflects the 5A22-specific system implementation. citeturn26search14turn27search4

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-C3 | critical | VIDEO VERIFY | verify | L121-125, L300, L302, L317-321 | _Claim:_ The "two most significant corrections": the "3.58 MHz 6502" of the video and "4 MB cartridge limit" need qualification. _Problem:_ The video makes neither claim. It never says "3.58 MHz". It says "6502" only about the SPC700, which was "heavily inspired by the 6502" (11:47). It says "an NES cartridges 4 megabyte ROM chip" (03:08) and "My 4 megabyte cartridge ROM" (20:58). Both describe his own cartridge, not a hardware limit. The Hackaday article says "3.58 MHz Ricoh 6502-based CPU" (fetched). So the document corrects Hackaday and presents the result as a correction of the video. The ExHiROM fact itself is correct (SNESdev Memory_map, fetched). |
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |

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
