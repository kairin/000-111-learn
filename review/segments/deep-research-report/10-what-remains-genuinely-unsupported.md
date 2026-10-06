---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: subsection
parent: "Factual cross-check and caveats"
lines: 323-326
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-M1, D13-m1]
---

# What remains genuinely unsupported

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 06:53](https://www.youtube.com/watch?v=j_2bo7ng65E&t=413s). The video states 192 by 168 tiles and 63K of RAM here. This part calls the numbers unverified.

> Parent section: **Factual cross-check and caveats**


Nothing uncovered suggests a major technical fabrication in the video. The uncertainty instead clusters around **project-specific implementation numbers and exact wording**: precise world-grid dimensions, exact runtime data structures, exact development duration, contributor credits, and the second-by-second ordering of topics. Those details depend primarily on a derivative written synopsis because the actual caption track was inaccessible. citeturn35search6turn34view1 They should therefore be checked directly against the video before being reused as quotations, academic citations or exact implementation specifications.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-M1 | major | VIDEO | open | L64, L190, L313, L323-325 | _Claim:_ "192×168 tiles" and "~63 kB" are "provisionally reported" and "unverified game-specific detail". _Problem:_ The video states these numbers itself: "a 192x 168 tile world", "a 12x12 grid" of screens, "3072x 2688 pixel image", and "fills up 63K of RAM" (06:53). The primary source confirms the secondary source. The row at L313 and the list at L325 are now out of date. |
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
