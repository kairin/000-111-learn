---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: subsection
parent: "Video metadata, evidence base, and transcript status"
lines: 13-30
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-m1, D13-m2, D13-m3, D13-m12]
---

# Identified video

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 00:46](https://www.youtube.com/watch?v=j_2bo7ng65E&t=46s). The video names the game Zero Star here. The itch.io page writes it as 〇 Star.

> Parent section: **Video metadata, evidence base, and transcript status**


| Field | Finding |
|---|---|
| **Title** | *It Took Every SNES Hardware Trick To Make My Game* citeturn35search0 |
| **Creator / channel** | Inkbox citeturn35search0turn32search3 |
| **Video ID** | `j_2bo7ng65E` |
| **URL** | [YouTube video](https://www.youtube.com/watch?v=j_2bo7ng65E) |
| **Subject** | Development of the SNES game **〇 Star**, with emphasis on low-level hardware programming and optimisation. citeturn31view2turn35search2 |
| **Publication period** | September 2026. YouTube search indexed it as “last month” during this October 2026 research pass; Hackaday discussed the video on 11 September 2026, and the linked game itself was published on 5 September 2026. citeturn35search0turn35search2turn31view2 |
| **Working duration** | **~51:15**, with a metadata discrepancy noted below. citeturn35search3turn35search5 |
| **Linked game** | **〇 Star**, a SNES dungeon-crawler RPG distributed on itch.io. citeturn31view2 |
| **Linked code** | Inkbox’s **SimpleSNESSoundEngine**, an SPC700 assembly sound engine whose README explicitly says it is a snapshot of the engine used in 〇 Star. fileciteturn3file0L2-L10 |

The indexed YouTube description begins by framing the subject as programming the SNES through its hardware-specific tricks and points viewers towards the playable game and Inkbox’s GitHub material. citeturn35search0 The first-party itch.io snapshot identifies 〇 Star as “a dungeon crawler RPG built for the SNES”, recommends Mesen or bsnes, lists release version 1.01, and shows a 129 kB ROM download. citeturn31view2

**Duration caveat.** Multiple YouTube search/carousel snapshots display **51:15**, but one separate YouTube carousel displays **51:55** beside the Inkbox video. citeturn35search3turn35search4turn35search5 Because the actual watch page could not be opened to settle the discrepancy, I use **51:15 as the working runtime**, but the final endpoint and every reconstructed boundary should be reviewed against the player.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m12 | minor | VIDEO | open | L5, L21, L24 | _Claim:_ The game is "〇 Star". _Problem:_ The itch.io page uses the symbol. The captions say "Zero Star" (00:46). Both names are in use. The document could say so once. |
| D13-m2 | minor | VERIFY | verify | L23, L29, L57, L270 | _Claim:_ Working duration 51:15, with one snapshot at 51:55. _Problem:_ yt-dlp reports 51:14. The last caption block starts at 50:53. The 51:55 value is wrong. The difference of one second has no effect on the review. |
| D13-m3 | minor | VERIFY | verify | L22, L331 | _Claim:_ The game "was published on 5 September 2026". _Problem:_ The fetched itch.io page shows version 1.01 and "updated 12 days ago". It does not show the date 5 September. Pass 2 must check the page metadata. |

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
