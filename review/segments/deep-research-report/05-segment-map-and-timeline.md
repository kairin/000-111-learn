---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 55-82
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-C1, D13-C2, D13-M1, D13-M6, D13-m1, D13-m2]
---

# Segment map and timeline

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 08:40](https://www.youtube.com/watch?v=j_2bo7ng65E&t=520s). The audio section starts here, not at 36:15 as the segment map says. Four of the seven segments are at the wrong time.

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

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-C1 | critical | VIDEO | open | L59-81, L222, L247 | _Claim:_ Segment 6, audio, runs from about 36:15 to 45:10. Segment 2, CPU and memory, runs from 04:20 to 10:45. Segment 3, graphics, runs from 10:45 to 19:10. _Problem:_ The captions show a different order. The audio section starts at 08:40 ("time to tackle SNES audio processing") and ends at 19:30. The tile engine and scrolling start at 04:10. The memory-bank discussion is at 20:35 to 22:00. The HDMA parallax is at 35:11. The color math is at 36:52, where the document puts audio. The mermaid timeline repeats the same wrong order. The document marks the times as estimates, but the estimates miss by up to 28 minutes. |
| D13-C2 | critical | VIDEO DOC | open | L59-67, L83-271 | _Claim:_ Seven segments cover the whole video. _Problem:_ The map has no segment for the object engine: 32-byte objects, the data bank register, the low-RAM mirror, OAM copying and the ninth X bit (19:34 to 24:26). It has no entry for the HUD counters (31:24), the inventory (33:26), the title screen (34:08), color math (36:52), hit stop (40:37), windows and the stair transition (43:19), or the sponsor segment (07:58 to 08:40). The segment "Runtime optimisation" (L65) is one label for eight different topics. |
| D13-M1 | major | VIDEO | open | L64, L190, L313, L323-325 | _Claim:_ "192×168 tiles" and "~63 kB" are "provisionally reported" and "unverified game-specific detail". _Problem:_ The video states these numbers itself: "a 192x 168 tile world", "a 12x12 grid" of screens, "3072x 2688 pixel image", and "fills up 63K of RAM" (06:53). The primary source confirms the secondary source. The row at L313 and the list at L325 are now out of date. |
| D13-M6 | major | VIDEO | open | L253-268, L67 | _Claim:_ Segment 7 holds "sound-engine publication" and "emulator testing and real-hardware orientation". _Problem:_ The open-source promise is at 19:07, inside the audio section, not at the end. The video does not discuss emulator testing. The end of the video shows the transparent cartridges (45:36), the solder paste (46:18), a members video (46:55), credits with music (47:35 to 50:10), the free release (50:31), a "maybe" physical release with a poll (50:31), and no Mode 7 or extra chips (50:53). |
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m2 | minor | VERIFY | verify | L23, L29, L57, L270 | _Claim:_ Working duration 51:15, with one snapshot at 51:55. _Problem:_ yt-dlp reports 51:14. The last caption block starts at 50:53. The 51:55 value is wrong. The difference of one second has no effect on the review. |

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
