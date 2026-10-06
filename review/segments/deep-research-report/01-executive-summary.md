---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 3-10
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-m1, D13-m8, D13-m12]
---

# Executive summary

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 03:08](https://www.youtube.com/watch?v=j_2bo7ng65E&t=188s). The video gives its main idea here: the ROM is read only, so the world is generated in RAM. It never says constraint-driven design.

Inkbox’s video is a technical postmortem of **〇 Star**, a dungeon-crawler RPG built for the Super Nintendo Entertainment System, and its central thesis is constraint-driven engineering: limited CPU time, memory, graphics bandwidth, cartridge space and audio resources are treated not merely as obstacles but as design parameters. The major topics reconstructed from first-party material and contemporary coverage are 65C816/5A22 assembly programming, SNES memory organisation, Mode 1 tile graphics, HDMA-based raster effects, procedural world generation, sprite and collision optimisation, and a custom SPC700 sound engine. citeturn31view2turn35search2turn35search6

The hardware discussion is mostly technically sound, but several common simplifications need qualification: the SNES CPU is more precisely a **Ricoh 5A22 built around a 65C816-derived core**, 3.58 MHz is not a constant effective CPU rate, and a “4 MB cartridge limit” applies to conventional LoROM/HiROM mapping rather than being a universal maximum. citeturn26search14turn27search4turn28search4 The graphics and audio claims fare particularly well under cross-checking: SNES Mode 1 really does provide two 4-bpp backgrounds plus a 2-bpp third background; HDMA can rewrite hardware registers at selected scanlines; and the audio subsystem provides 64 KiB of audio RAM, eight DSP voices and BRR-compressed sample playback. citeturn28search9turn37search6turn33search8turn33search13

There is one material research limitation: the YouTube watch page was throttled and YouTube’s timed-text/caption endpoints were disabled in the accessible research environment, so I could not obtain a trustworthy full transcript or automated-caption track. citeturn31view0turn34view1turn34view2 Accordingly, I have **not invented timestamped quotations**; all segment boundaries below are explicitly marked as reconstructed estimates, and the report separates independently verified hardware facts from game-specific claims that currently rest only on secondary reporting.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m12 | minor | VIDEO | open | L5, L21, L24 | _Claim:_ The game is "〇 Star". _Problem:_ The itch.io page uses the symbol. The captions say "Zero Star" (00:46). Both names are in use. The document could say so once. |
| D13-m8 | minor | KNOW | open | L7, L121 | _Claim:_ "3.58 MHz is not a constant effective CPU rate". _Problem:_ Correct. The 5A22 bus runs at 3.58 MHz for fast ROM and RAM, 2.68 MHz for slow ROM, and 1.79 MHz for some I/O. The video does not discuss this. |

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
