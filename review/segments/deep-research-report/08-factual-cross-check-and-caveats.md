---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 296-316
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-C3, D13-M1, D13-M7, D13-m1, D13-m9, D13-m10]
---

# Factual cross-check and caveats

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 20:58](https://www.youtube.com/watch?v=j_2bo7ng65E&t=1258s). The video says 'my 4 megabyte cartridge ROM' here. It never claims a hardware limit or a 3.58 MHz 6502.

| Claim or theme associated with the video | Assessment | Cross-check |
|---|---|---|
| **“The SNES uses a 3.58 MHz 6502-based CPU.”** | **Partly correct, but imprecise.** | The console CPU is the Ricoh 5A22, derived from the **WDC 65C816** family. Calling it “6502-based” describes its ancestry, but “65C816-derived” is much more precise. Its effective rate is also not constantly 3.58 MHz; slower accesses can reduce the effective clock. citeturn26search14turn27search4 |
| **The system has 128 KiB of work RAM, effectively banks `$7E–$7F`.** | **Correct.** | SNESdev documents the two banks as providing a continuous 128 KiB WRAM region. citeturn28search4 |
| **There is a 4 MB cartridge limit.** | **Needs qualification.** | Ordinary LoROM supports up to 4 MiB, and conventional HiROM has a comparable limit, but SNESdev explicitly documents **ExHiROM as a mapping for exceeding 4 MiB**. Treating 4 MiB as a chosen/conventional historical constraint is sound; calling it an absolute SNES hardware limit is not. citeturn28search4 |
| **Mode 1 gives three background layers, with two 4-bpp and one 2-bpp.** | **Correct.** | SNESdev lists Mode 1 as BG1=4 bpp, BG2=4 bpp, BG3=2 bpp and calls it the most commonly used background mode. citeturn28search9 |
| **Mode 1 can use 16×16 background tiles.** | **Correct.** | The background documentation lists selectable 8×8 or 16×16 tile sizes for the relevant background layers. citeturn28search9 |
| **HDMA can alter scrolling/display state at particular screen lines.** | **Correct.** | SNESdev states that HDMA can automatically write hardware-register values at specific scanlines; its documented transfer patterns include scroll-position registers. citeturn37search6 |
| **SNES audio has a separate SPC700-based processor with 64 KiB audio RAM.** | **Correct.** | The S-SMP documentation identifies the Sony SPC-700, 64 KiB Audio-RAM and CPU/APU communication ports. citeturn33search8 |
| **The sound DSP has eight voices.** | **Correct.** | SNESdev explicitly documents eight S-DSP voices numbered 0–7. citeturn33search8turn33search20 |
| **Samples use BRR compression.** | **Correct.** | SNESdev documents BRR as the native S-DSP sample format, using 16-sample blocks stored in nine bytes and decoded using adaptive predictive filters. citeturn33search13 |
| **〇 Star uses five audio voices for music and three for effects.** | **Strongly verified by first-party code.** | Inkbox’s source allocates song pointers to voices 0–4 and effect pointers to voices 5–7, then runs the corresponding update paths separately. fileciteturn7file0L2-L2 |
| **Inkbox wrote a custom SPC700 sound engine and transfers it to the APU.** | **Verified.** | The creator’s README says the engine is SPC700 assembly, compiles into a binary included in the SNES ROM and transferred to the APU, and is a snapshot of 〇 Star’s engine. fileciteturn3file0L2-L10 |
| **The playable ROM is about 129 kB.** | **Verified for the fetched creator-page snapshot.** | Inkbox’s itch.io page lists `〇 Star SNES ROM 129 kB`. citeturn31view2 |
| **The project took two years.** | **Plausible but not independently verified here.** | The detailed derivative article gives the two-year figure, while Hackaday verifies assembly development but does not provide that duration in the accessible text. citeturn35search6turn35search2 |
| **The generated map is exactly 192×168 tiles / ~63 kB.** | **Unverified game-specific detail.** | Those values appear in the detailed derivative synopsis, but no accessible first-party game source was found to audit them. citeturn35search6 |
| **Only visible enemies are collision-tested.** | **Plausible and sensible, but game-specific implementation remains unverified.** | Reported by the detailed synopsis; without the full game source or transcript, it should not be elevated to independently verified fact. citeturn35search6 |
| **Hornests created background graphics; Mouse Bite Labs designs were used for cartridge work.** | **Secondary-source attribution only.** | These credits are reported in the detailed synopsis but were not duplicated in the first-party pages accessible in this pass. citeturn35search6 |

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-C3 | critical | VIDEO VERIFY | verify | L121-125, L300, L302, L317-321 | _Claim:_ The "two most significant corrections": the "3.58 MHz 6502" of the video and "4 MB cartridge limit" need qualification. _Problem:_ The video makes neither claim. It never says "3.58 MHz". It says "6502" only about the SPC700, which was "heavily inspired by the 6502" (11:47). It says "an NES cartridges 4 megabyte ROM chip" (03:08) and "My 4 megabyte cartridge ROM" (20:58). Both describe his own cartridge, not a hardware limit. The Hackaday article says "3.58 MHz Ricoh 6502-based CPU" (fetched). So the document corrects Hackaday and presents the result as a correction of the video. The ExHiROM fact itself is correct (SNESdev Memory_map, fetched). |
| D13-M1 | major | VIDEO | open | L64, L190, L313, L323-325 | _Claim:_ "192×168 tiles" and "~63 kB" are "provisionally reported" and "unverified game-specific detail". _Problem:_ The video states these numbers itself: "a 192x 168 tile world", "a 12x12 grid" of screens, "3072x 2688 pixel image", and "fills up 63K of RAM" (06:53). The primary source confirms the secondary source. The row at L313 and the list at L325 are now out of date. |
| D13-M7 | major | VIDEO VERIFY | verify | L266, L315, L347 | _Claim:_ Credits: "Hornests for background graphics" and "Mouse Bite Labs" are "secondary-source attribution only". _Problem:_ Mouse Bite Labs is in the captions: thanks "for making these SNES cartridge designs open source" (45:58). The music is by "my friend Dr. Matt" (19:07, 44:42). The document never names Dr. Matt. Hornests is not in the captions. The credit roll (47:35 to 50:10) has no captions, so Hornests stays open. |
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m10 | minor | VIDEO | open | L224-226, L306-308 | _Claim:_ S-SMP, S-DSP, 64 KiB audio RAM, eight voices, BRR of nine bytes for 16 samples. _Problem:_ Correct, and the video confirms it: 64K APU RAM (09:01), eight voices (10:02), "9 byt sample blocks" with a control byte and 16 nibbles (10:45 to 11:05). |
| D13-m9 | minor | VIDEO | open | L112, L301 | _Claim:_ 128 KiB of WRAM in banks $7E to $7F. _Problem:_ Correct, and the video confirms it: "128K of CPU RAM", world in "bank 2" (06:31), objects planned for $7F0000 (21:18). |

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
