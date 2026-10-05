---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 327-349
findings: []
---

# Sources and methodological notes

The most important source is the original [YouTube video by Inkbox](https://www.youtube.com/watch?v=j_2bo7ng65E). Its search metadata verifies the title, channel and broad description, but the watch page itself was throttled in this research environment. citeturn35search0turn31view0

The creator’s [〇 Star itch.io page](https://inkbox-software.itch.io/zerostar) is the strongest source for the game itself. The fetched snapshot identifies it as a SNES dungeon-crawler RPG, gives its publication date as 5 September 2026, recommends Mesen or bsnes, and lists the downloadable ROM at 129 kB. citeturn31view2

Inkbox’s [SimpleSNESSoundEngine repository](https://github.com/InkboxSoftware/SimpleSNESSoundEngine) and [README](https://github.com/InkboxSoftware/SimpleSNESSoundEngine/blob/main/README.md) are primary implementation evidence. The repository describes itself as an SPC700 SNES sound engine written in Assembly, while the README explicitly says it is a snapshot of the engine in 〇 Star and explains compilation and transfer to the APU. fileciteturn2file0L2-L10 fileciteturn3file0L2-L10 The [SPC700 source file](https://github.com/InkboxSoftware/SimpleSNESSoundEngine/blob/main/soundengine-spc700.s) directly establishes the eight voice definitions and the 0–4 music / 5–7 effects architecture. fileciteturn7file0L2-L2

For processor context, the [Western Design Center W65C816S product documentation](https://www.westerndesigncenter.com/wdc/w65c816s-chip.php) is the most authoritative accessible source used here; it documents the 16-bit processor core, 24-bit address bus and 16 MB address space. citeturn26search14

For SNES-specific low-level architecture, the report relies on the technical community reference [SNESdev Memory Map](https://snes.nesdev.org/wiki/Memory_map), which documents 128 KiB WRAM, LoROM/HiROM behaviour and ExHiROM’s ability to exceed the ordinary 4 MiB mapping limit. citeturn28search4

The [SNESdev Backgrounds documentation](https://snes.nesdev.org/wiki/Mode_7) provides the Mode 1 cross-check: BG1 and BG2 are 4-bpp layers, BG3 is 2-bpp, and background layers support selectable tile sizes and independent scrolling. citeturn28search9

The [SNESdev DMA/HDMA documentation](https://snes.nesdev.org/wiki/DMA_registers) confirms that ordinary DMA accelerates transfers to graphics/palette/OAM resources and that HDMA can automatically write hardware registers on particular scanlines, including scroll-position register patterns. citeturn37search6

For audio, [SNESdev S-SMP](https://snes.nesdev.org/wiki/S-SMP) documents the SPC700 processor, S-DSP, 64 KiB Audio-RAM and eight voices. citeturn33search8 [SNESdev BRR Samples](https://snes.nesdev.org/wiki/BRR_samples) documents the bit-rate-reduction sample format, and [S-DSP Registers](https://snes.nesdev.org/wiki/S-DSP_registers) documents the eight voice register sets. citeturn33search13turn33search20

[Hackaday’s *Hand-Coded ASM Powers Homebrew SNES Game*](https://hackaday.com/2026/09/11/hand-coded-asm-powers-homebrew-snes-game/) is the strongest independent contemporary overview located. It confirms the video's focus on assembly, SNES architecture, graphics modes, sound registers, cartridge constraints and the open-source sound engine. citeturn35search2

Finally, [VETAU24H’s *Zero Star Climbs Out of Two Years of Pure SNES Assembly*](https://vetau24h.com/zero-star-climbs-out-of-two-years-of-pure-snes-assembly/) contains the most detailed text synopsis found, including Mode 1 layer use, HDMA, procedural world generation, talismans, enemy/collision behaviour, BRR audio, the five-plus-three voice split and cartridge credits. citeturn35search6 Because that site is not a primary technical authority, this report uses it primarily to **reconstruct topical coverage and identify claims for verification**, not as the final authority on SNES hardware.

**Overall confidence:** **high** for the video's central concepts and the hardware/audio cross-checks; **medium** for game-specific implementation details supported only by contemporary secondary coverage; and **low for exact segment boundaries or verbatim spoken wording** until the original YouTube caption/audio stream can be inspected directly. The transcript/caption retrieval failures are documented rather than concealed, and every timestamp in the segment map should consequently be treated as **⚠ review-required**. citeturn31view0turn34view1turn34view2

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
