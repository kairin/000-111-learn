---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 3-10
findings: []
---

# Executive summary

Inkbox’s video is a technical postmortem of **〇 Star**, a dungeon-crawler RPG built for the Super Nintendo Entertainment System, and its central thesis is constraint-driven engineering: limited CPU time, memory, graphics bandwidth, cartridge space and audio resources are treated not merely as obstacles but as design parameters. The major topics reconstructed from first-party material and contemporary coverage are 65C816/5A22 assembly programming, SNES memory organisation, Mode 1 tile graphics, HDMA-based raster effects, procedural world generation, sprite and collision optimisation, and a custom SPC700 sound engine. citeturn31view2turn35search2turn35search6

The hardware discussion is mostly technically sound, but several common simplifications need qualification: the SNES CPU is more precisely a **Ricoh 5A22 built around a 65C816-derived core**, 3.58 MHz is not a constant effective CPU rate, and a “4 MB cartridge limit” applies to conventional LoROM/HiROM mapping rather than being a universal maximum. citeturn26search14turn27search4turn28search4 The graphics and audio claims fare particularly well under cross-checking: SNES Mode 1 really does provide two 4-bpp backgrounds plus a 2-bpp third background; HDMA can rewrite hardware registers at selected scanlines; and the audio subsystem provides 64 KiB of audio RAM, eight DSP voices and BRR-compressed sample playback. citeturn28search9turn37search6turn33search8turn33search13

There is one material research limitation: the YouTube watch page was throttled and YouTube’s timed-text/caption endpoints were disabled in the accessible research environment, so I could not obtain a trustworthy full transcript or automated-caption track. citeturn31view0turn34view1turn34view2 Accordingly, I have **not invented timestamped quotations**; all segment boundaries below are explicitly marked as reconstructed estimates, and the report separates independently verified hardware facts from game-specific claims that currently rest only on secondary reporting.

---

## Review findings for this part

_Pass 1 found nothing in this part. This does not mean that the part is correct. Nobody challenged it yet._

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
