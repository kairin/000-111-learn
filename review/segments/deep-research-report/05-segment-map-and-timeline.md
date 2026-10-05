---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 55-82
findings: []
---

# Segment map and timeline

**Important:** the timestamps in this section are **analytical estimates, not transcript-derived chapter markers**. They divide the ~51:15 working runtime according to the topical progression described in contemporary coverage. Every boundary marked ⚠ should be checked against the actual player before being used for citation, editing or academic quotation. citeturn35search2turn35search6

| Segment # | Start | End | Duration | Summary | Key concepts |
|---|---:|---:|---:|---|---|
| **1** | ~00:00 ⚠ | ~04:20 ⚠ | 4:20 | Project framing: 〇 Star as the culmination of low-level SNES development, establishing the constraint-driven thesis and showing the finished dungeon crawler. The game is independently confirmed as a native SNES project. citeturn31view2turn35search2 | SNES homebrew; assembly; hardware constraints; 〇 Star |
| **2** | ~04:20 ⚠ | ~10:45 ⚠ | 6:25 | Introduces the machine budget: Ricoh 5A22/65C816 lineage, 128 KiB system WRAM, ROM mapping and why low-level memory organisation shapes the implementation. citeturn35search6turn28search4turn26search14 | 5A22; 65C816; WRAM; ROM mapping; assembly |
| **3** | ~10:45 ⚠ | ~19:10 ⚠ | 8:25 | Graphics architecture: Mode 1 backgrounds, colour depth, tile/tilemap representation, HUD/counter representation, scrolling and the HDMA technique used for raster/parallax effects. citeturn35search6turn28search9turn37search6 | Mode 1; tiles; palettes; HDMA; parallax; BCD |
| **4** | ~19:10 ⚠ | ~27:30 ⚠ | 8:20 | World-data section: procedural room generation and compact maze representation are used to get a large shifting dungeon from a small memory budget rather than storing conventional pre-built maps. Detailed dimensions are reported only by the derivative synopsis and therefore remain provisional. citeturn35search6 | procedural generation; memory packing; rooms; tunnels; WRAM |
| **5** | ~27:30 ⚠ | ~36:15 ⚠ | 8:45 | Runtime optimisation: enemy state machines, sprite pressure, visibility-based collision work, talisman effects and other decisions that make gameplay fit the frame-time budget. citeturn35search6 | sprites; OAM; culling; collision; state machines; effects |
| **6** | ~36:15 ⚠ | ~45:10 ⚠ | 8:55 | Audio architecture: the separate SPC700/S-SMP environment, 64 KiB audio RAM, BRR samples, eight DSP voices and Inkbox’s custom driver. The released source confirms a five-music-voice/three-effect-voice split. citeturn33search8turn33search13 fileciteturn7file0L2-L2 | SPC700; S-DSP; BRR; voices; sound driver |
| **7** | ~45:10 ⚠ | ~51:15 ⚠ | 6:05 | Release and implementation wrap-up: sound-engine publication, playable ROM, cartridge/homebrew context and contributor/production credits. The downloadable ROM is independently confirmed at 129 kB in the fetched itch.io snapshot. citeturn31view2 fileciteturn3file0L2-L10 | cartridge; ROM release; open source; tooling; credits |

The sequence above should be understood as **reconstructed topical navigation**, not a substitute for YouTube chapters. The reconstruction is most reliable about *what* topics the video covers, because the same themes recur across the creator’s release materials, source code and Hackaday’s contemporaneous account; it is less reliable about the exact second at which one topic becomes another. citeturn35search2turn31view2

```mermaid
timeline
    title Reconstructed topical flow — all boundaries require timestamp review
    ~00:00–04:20 : Project and 〇 Star framing
    ~04:20–10:45 : CPU, memory and cartridge constraints
    ~10:45–19:10 : Mode 1 graphics, tiles and HDMA
    ~19:10–27:30 : Procedural world generation and data layout
    ~27:30–36:15 : Sprites, gameplay systems and optimisation
    ~36:15–45:10 : SPC700 audio and custom sound engine
    ~45:10–51:15 : Cartridge, release, open source and credits
```

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
