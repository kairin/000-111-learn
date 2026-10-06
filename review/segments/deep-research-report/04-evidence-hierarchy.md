---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: subsection
parent: "Video metadata, evidence base, and transcript status"
lines: 43-54
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-M8, D13-m1]
---

# Evidence hierarchy

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 19:07](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1147s). The video promises the open-source sound engine here. That engine is the first-party code of this part.

> Parent section: **Video metadata, evidence base, and transcript status**


The reconstruction uses four evidence levels.

**Primary creator sources** are given the most weight: Inkbox’s YouTube metadata, the 〇 Star itch.io page, and Inkbox’s SimpleSNESSoundEngine repository. The GitHub README states that its binary is included in the SNES ROM and transferred to the APU, and explicitly identifies the code as a snapshot of 〇 Star’s sound engine. fileciteturn3file0L2-L10

**Technical references** are headed by the Western Design Center’s official documentation for the W65C816S and the SNESdev Wiki’s hardware documentation. WDC describes the W65C816S as a 16-bit processor with a 24-bit address bus and 16 MB address space; SNESdev provides detailed memory-map, graphics, DMA/HDMA and audio documentation. citeturn26search14turn28search4turn28search9turn37search6turn33search8

**Secondary reporting** comes primarily from Hackaday’s 11 September 2026 article, which independently identifies the video as a deep dive into Inkbox’s assembly-based SNES game and its architecture. citeturn35search2

Finally, the unusually detailed **VETAU24H synopsis** is used only to reconstruct the video's likely topic sequence and game-specific details where primary material is unavailable. Because it is a derivative secondary/tertiary source rather than an authoritative technical reference, claims found only there are flagged as such rather than treated as established fact. citeturn35search6

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-M8 | major | VERIFY DOC | verify | L53, L347 | _Claim:_ VETAU24H holds "the most detailed text synopsis found" and is a "derivative" source. _Problem:_ The VETAU24H page is a copy of the techeblog article "Zero Star Climbs Out of Two Years of Pure SNES Assembly" by Bill Smith, 11 September 2026 (both fetched). The image links of the copy point to images.techeblog.com. The document cites the copy and not the origin. Document 14 cites the techeblog page. The copy shows a date of 5 October 2026, which may be a page-view date. |
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
