---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 272-295
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-M3, D13-M4, D13-m1, D13-m5]
---

# Main concepts and how they connect

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 20:35](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1235s). The video explains the 24-bit address and the data bank register here. This is the memory lesson that the concept table misses.

The video is most coherent when understood not as a collection of unrelated retro-programming curiosities, but as an **engineering dependency chain**:

| Main concept | Role in the video | How it connects to the others |
|---|---|---|
| **Constraint-driven design** | The overarching philosophy: make a game around what the console can efficiently do. citeturn35search2 | CPU, memory, graphics and sound limits cause almost every subsequent design choice. |
| **65C816/5A22 assembly** | Gives direct control over registers, memory layout and timing. citeturn26search14turn27search4 | Makes optimisations such as packed state, register-level PPU control and custom APU communication practical and explicit. |
| **Banked memory and compact representation** | 128 KiB WRAM and cartridge mapping reward deliberate data placement. citeturn28search4 | Encourages tilemaps, procedural levels, small state machines and reuse rather than large uncompressed assets. |
| **Mode 1 tile graphics** | Two 4-bpp layers plus one 2-bpp layer provide an economical basis for world/HUD/background composition. citeturn28search9 | Turns VRAM and colour limitations into layered scene design. |
| **DMA / HDMA** | Moves data efficiently and permits register changes tied to scanlines. citeturn37search6 | Extends the apparent graphics sophistication without brute-force software rendering; particularly useful for scrolling/parallax. |
| **Procedural generation** | Generates shifting dungeon structure from algorithms rather than a large catalogue of explicit maps. citeturn35search6 | Trades CPU work for stored-data capacity—a useful exchange when ROM/RAM are constrained. |
| **Culling and state-based gameplay** | Keeps runtime work focused on entities that matter to the current screen. citeturn35search6 | Protects the finite CPU/frame-time budget created by the same hardware constraints. |
| **SPC700/BRR sound pipeline** | Treats sound as its own small computer system with 64 KiB RAM and eight DSP voices. citeturn33search8turn33search13 | Forces another round of memory compression, channel scheduling and custom assembly programming. |
| **Open-source tooling** | The custom audio driver becomes reusable infrastructure rather than remaining locked inside the ROM. fileciteturn3file0L2-L10 | Converts the project from a one-off demonstration into a contribution to the SNES homebrew ecosystem. |

The most important relationship is therefore:

**hard limits → compact representations → hardware-assisted transfers/effects → selective runtime work → a complete game that looks richer than its raw resource budget suggests.**

That relationship explains why the title’s “every hardware trick” framing is meaningful. Mode 1, HDMA, procedural generation, culling and SPC700 programming are not individually magical. Their value comes from **composition**: each technique removes pressure from a different scarce resource, allowing the others to be used where they have the greatest perceptual or gameplay impact. This interpretation is consistent with Hackaday’s description of the video as covering SNES architecture from graphics modes through sound registers while showing how those mechanisms are used in an actual game. citeturn35search2

A second recurring idea is **specialisation rather than abstraction**. A modern cross-platform engine generally tries to hide hardware specifics; 〇 Star does the opposite. The implementation is designed around the precise capabilities of the target machine—65C816-family assembly on the main CPU, tiled PPU backgrounds, HDMA, and a separate SPC700 assembly program for sound. The released sound-engine code is particularly strong evidence of that philosophy because it exposes the DSP registers, eight individual voice offsets, CPU communication ports and per-voice update machinery directly. fileciteturn7file0L2-L2

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-M3 | major | VIDEO | open | L195-218, L284 | _Claim:_ The lesson of the sprite segment is "culling": restrict work to on-screen entities. _Problem:_ The lesson of the video is different. The PPU counts transparent sprites toward the limit of 32 sprites per line (28:34). The fix moves tile-zero sprites to an off-screen Y (28:55). Then the "34 sliver per line rule" cuts 24 objects to 17 (29:38 to 29:59). He chose not to use the OAM rotation registers (30:21). The document names none of these. Its on-screen check exists in the video (22:19), but as a render step, not as a collision step. |
| D13-M4 | major | VIDEO | open | L105-126, L280 | _Claim:_ Segment 2 teaches "LoROM/HiROM cartridge mapping" and "what address ranges are fast". _Problem:_ The video names neither LoROM nor HiROM, and it does not discuss fast or slow ROM. Its memory lesson is the data bank register: ROM from bank $C0, code in the second half of each bank, so the mirror reaches the hardware registers and "the first 8K of low RAM" (20:35 to 21:59). It moved the objects from bank $7F to the first RAM bank to avoid bank switches. The document misses this lesson, which is the closest SNES parallel to the 8086 segment registers. |
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m5 | minor | DOC VIDEO | open | L241, L294, L333 | _Claim:_ `fileciteturn7file0L2-L2` supports the voices 0 to 4 and 5 to 7 split. _Problem:_ The marker points to one line of the source file. One line cannot hold eight voice constants and eight pointers. The claim itself is correct: the fetched file has `SONGPOINTER0` to `SONGPOINTER4` and `EFFECTPOINTER5` to `EFFECTPOINTER7`. The video says the same at 18:18. |

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
