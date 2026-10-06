---
target: ../segments/deep-research-report.md
segments: ../segments/deep-research-report/
video: https://www.youtube.com/watch?v=j_2bo7ng65E
pass: 1
date: 2026-10-05
---

# Adversarial review: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"

The source video is "It Took Every SNES Hardware Trick To Make My Game" by Inkbox (51:14 by yt-dlp). The reviewer read the full English caption track of the video. The document says that it could not get the captions. It builds its content from a web article and from hardware references instead. This review checks that reconstruction against the real captions.

The reviewer also fetched eight web pages to check high-stakes facts: the README and the file `soundengine-spc700.s` of the GitHub repository InkboxSoftware/SimpleSNESSoundEngine, the itch.io page of the game, the Hackaday article of 11 September 2026, the VETAU24H article, the techeblog article with the same title, and the SNESdev wiki pages Memory_map, Backgrounds and Mode_7.

The document holds 107 `citeturn` markers and 16 `fileciteturn` markers, with hidden control characters around them. These are artifacts of the tool that wrote the document. They are not citations. This review ignores them, except in finding m1.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (internal contradiction, arithmetic, missing data) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the transcript of the source video, with a timestamp |

## 1. Goals and objectives

1. Identify the video and its metadata (title, channel, date, duration, linked game and code).
2. Give a segment map of the video with timestamps and a summary of each segment.
3. Explain the main concepts of the video and how they connect.
4. Cross-check the hardware claims against references and name the claims that stay unverified.
5. Be honest about what the research could not reach.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Metadata | **Mostly** | Title, channel, video ID, game page, ROM size, emulators, price and the sound-engine repository are correct. The duration is 51:14, not 51:15 (m2). The publication date of the game is not confirmed (m3). |
| 2. Segment map | **No** | Four of the seven segments are at the wrong time. The audio section starts at 08:40, not 36:15. The document also omits the object engine (19:34 to 24:26), which fills almost five minutes (C1, C2). |
| 3. Concepts | **Partly** | The dependency chain (limits, compact data, hardware transfers, selective work) is a fair reading. But the document puts parallax in the game world, misses the sprite-per-line lesson, and misses the memory-bank lesson (M2, M3, M4). |
| 4. Cross-check | **Partly** | The hardware rows are correct. But the two "most significant corrections" correct a Hackaday sentence, not the video. The video never says "3.58 MHz 6502" or "4 MB limit" (C3). Three "unverified" items are in the captions (M1). |
| 5. Honesty | **Yes** | The document says what it could not get. It invents no quotation. It marks every timestamp as an estimate. This is the strongest point of the document. |

**Overall confidence in the document:** Medium for the hardware facts. Low for the segment map and for the game-specific content. The document is honest, but a reader who trusts its timeline will look for the audio section in the wrong half of the video.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L59-81, L222, L247 | Segment 6, audio, runs from about 36:15 to 45:10. Segment 2, CPU and memory, runs from 04:20 to 10:45. Segment 3, graphics, runs from 10:45 to 19:10 | The captions show a different order. The audio section starts at 08:40 ("time to tackle SNES audio processing") and ends at 19:30. The tile engine and scrolling start at 04:10. The memory-bank discussion is at 20:35 to 22:00. The HDMA parallax is at 35:11. The color math is at 36:52, where the document puts audio. The mermaid timeline repeats the same wrong order. The document marks the times as estimates, but the estimates miss by up to 28 minutes. | [VIDEO] |
| C2 | L59-67, L83-271 | Seven segments cover the whole video | The map has no segment for the object engine: 32-byte objects, the data bank register, the low-RAM mirror, OAM copying and the ninth X bit (19:34 to 24:26). It has no entry for the HUD counters (31:24), the inventory (33:26), the title screen (34:08), color math (36:52), hit stop (40:37), windows and the stair transition (43:19), or the sponsor segment (07:58 to 08:40). The segment "Runtime optimisation" (L65) is one label for eight different topics. | [VIDEO], [DOC] |
| C3 | L121-125, L300, L302, L317-321 | The "two most significant corrections": the "3.58 MHz 6502" of the video and "4 MB cartridge limit" need qualification | The video makes neither claim. It never says "3.58 MHz". It says "6502" only about the SPC700, which was "heavily inspired by the 6502" (11:47). It says "an NES cartridges 4 megabyte ROM chip" (03:08) and "My 4 megabyte cartridge ROM" (20:58). Both describe his own cartridge, not a hardware limit. The Hackaday article says "3.58 MHz Ricoh 6502-based CPU" (fetched). So the document corrects Hackaday and presents the result as a correction of the video. The ExHiROM fact itself is correct (SNESdev Memory_map, fetched). | [VIDEO], [VERIFY] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L64, L190, L313, L323-325 | "192×168 tiles" and "~63 kB" are "provisionally reported" and "unverified game-specific detail" | The video states these numbers itself: "a 192x 168 tile world", "a 12x12 grid" of screens, "3072x 2688 pixel image", and "fills up 63K of RAM" (06:53). The primary source confirms the secondary source. The row at L313 and the list at L325 are now out of date. | [VIDEO] |
| M2 | L131-133, L139, L147-165 | The game world uses HDMA parallax for depth. The diagram puts "Distant mountain background" under the "Walkable tiled world" | In the video, the parallax is on the title screen: mountains on layer 3, clouds on layer 2, with HDMA on the layer 2 horizontal scroll register (34:28 to 36:11). The inventory uses a second HDMA table with two entries (36:31). In the game world, layer 3 is "all black tiles" for the color math darkening (37:13). The diagram describes the title screen, not the game. | [VIDEO] |
| M3 | L195-218, L284 | The lesson of the sprite segment is "culling": restrict work to on-screen entities | The lesson of the video is different. The PPU counts transparent sprites toward the limit of 32 sprites per line (28:34). The fix moves tile-zero sprites to an off-screen Y (28:55). Then the "34 sliver per line rule" cuts 24 objects to 17 (29:38 to 29:59). He chose not to use the OAM rotation registers (30:21). The document names none of these. Its on-screen check exists in the video (22:19), but as a render step, not as a collision step. | [VIDEO] |
| M4 | L105-126, L280 | Segment 2 teaches "LoROM/HiROM cartridge mapping" and "what address ranges are fast" | The video names neither LoROM nor HiROM, and it does not discuss fast or slow ROM. Its memory lesson is the data bank register: ROM from bank $C0, code in the second half of each bank, so the mirror reaches the hardware registers and "the first 8K of low RAM" (20:35 to 21:59). It moved the objects from bank $7F to the first RAM bank to avoid bank switches. The document misses this lesson, which is the closest SNES parallel to the 8086 segment registers. | [VIDEO] |
| M5 | L221-247 | The audio segment is "one of the strongest parts of the reconstruction" | The hardware facts are correct. But the document had the source file, and it still reports almost none of the engine content of the video. The video names SPCASM (14:29), BRRtools (11:05), the 128 Hz timer (14:29) and the sample directory of four bytes per entry (14:50). It explains the IPL handshake with $AA and $BB on ports 0 and 1 (12:48 to 13:48) and the eight separate port registers (12:28). It gives the SPC700 at 1.024 MHz with 256 valid opcodes (11:47 to 12:07). It shows the resample trick: sample at 16 kHz and set the pitch from $1000 to $0800 (16:35 to 17:15). The fetched source file sets `T0DIV` to 128 Hz and `DIRTABLE` at $0900. The document could report these. | [VIDEO], [VERIFY] |
| M6 | L253-268, L67 | Segment 7 holds "sound-engine publication" and "emulator testing and real-hardware orientation" | The open-source promise is at 19:07, inside the audio section, not at the end. The video does not discuss emulator testing. The end of the video shows the transparent cartridges (45:36), the solder paste (46:18), a members video (46:55), credits with music (47:35 to 50:10), the free release (50:31), a "maybe" physical release with a poll (50:31), and no Mode 7 or extra chips (50:53). | [VIDEO] |
| M7 | L266, L315, L347 | Credits: "Hornests for background graphics" and "Mouse Bite Labs" are "secondary-source attribution only" | Mouse Bite Labs is in the captions: thanks "for making these SNES cartridge designs open source" (45:58). The music is by "my friend Dr. Matt" (19:07, 44:42). The document never names Dr. Matt. Hornests is not in the captions. The credit roll (47:35 to 50:10) has no captions, so Hornests stays open. | [VIDEO], [VERIFY] |
| M8 | L53, L347 | VETAU24H holds "the most detailed text synopsis found" and is a "derivative" source | The VETAU24H page is a copy of the techeblog article "Zero Star Climbs Out of Two Years of Pure SNES Assembly" by Bill Smith, 11 September 2026 (both fetched). The image links of the copy point to images.techeblog.com. The document cites the copy and not the origin. Document 14 cites the techeblog page. The copy shows a date of 5 October 2026, which may be a page-view date. | [VERIFY], [DOC] |
| M9 | L85-102 | Segment 1 shows "the finished dungeon crawler" and 〇 Star "as the culmination" | The video opens with a recap of "Chapter 25" (00:26) and a game-design change: condense punch and kick on A, sword on B, fix the attack blind spot and the animation timing (01:47 to 02:48). Then the "read only" ROM leads to the idea of a world generated in RAM (03:08 to 03:28). The game is not finished in the video. At 46:55 he says that he still has to "finish everything up". | [VIDEO] |
| M10 | L172-192 | The generator "stamps random chambers and connects them with one-tile corridors" | The video says that tunnels are "the same thing as rooms, just with either a small width or height" (25:50). The document misses the algorithm: reject binary space partitioning (24:47), call the random routine until the room fits the limits (25:08), and the bug where two rooms are each other's closest neighbor, fixed by a tunnel to the closest connected room (26:12). | [VIDEO] |
| M11 | L167, L141 | Packed BCD counters are a "reported implementation detail rather than independently audited code" | The video gives the detail: the decimal flag does the carry (32:05), a 16-bit packed BCD counter holds "exactly the 10,000 I need", INC and DEC ignore the flag, so he uses ADC (32:05 to 32:26), and he suppresses leading zeros, except for the chicken counter (32:46 to 33:06). The claim is now checkable and correct. | [VIDEO] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L5-349 | 107 `citeturn` and 16 `fileciteturn` markers | These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. | [DOC] |
| m2 | L23, L29, L57, L270 | Working duration 51:15, with one snapshot at 51:55 | yt-dlp reports 51:14. The last caption block starts at 50:53. The 51:55 value is wrong. The difference of one second has no effect on the review. | [VERIFY] |
| m3 | L22, L331 | The game "was published on 5 September 2026" | The fetched itch.io page shows version 1.01 and "updated 12 days ago". It does not show the date 5 September. Pass 2 must check the page metadata. | [VERIFY] |
| m4 | L339 | "SNESdev Backgrounds documentation" links to `snes.nesdev.org/wiki/Mode_7` | The link label and the URL do not match. The fetched Mode_7 URL serves the page of all eight modes, so the content is correct. | [DOC], [VERIFY] |
| m5 | L241, L294, L333 | `fileciteturn7file0L2-L2` supports the voices 0 to 4 and 5 to 7 split | The marker points to one line of the source file. One line cannot hold eight voice constants and eight pointers. The claim itself is correct: the fetched file has `SONGPOINTER0` to `SONGPOINTER4` and `EFFECTPOINTER5` to `EFFECTPOINTER7`. The video says the same at 18:18. | [DOC], [VIDEO] |
| m6 | L245 | The engine does "music-versus-effects arbitration" | There is no arbitration. Five voices play music and three wait for the CPU to name a voice and an effect (18:18 to 18:38). Object sounds use one dedicated voice, so they do not interrupt the player sounds or the music (39:35). | [VIDEO] |
| m7 | L266 | "translucent shells" come from secondary reporting | The video says it: transparent resin shells from PCBWay, the sponsor of the video (07:58). The document never names the sponsor. | [VIDEO] |
| m8 | L7, L121 | "3.58 MHz is not a constant effective CPU rate" | Correct. The 5A22 bus runs at 3.58 MHz for fast ROM and RAM, 2.68 MHz for slow ROM, and 1.79 MHz for some I/O. The video does not discuss this. | [KNOW] |
| m9 | L112, L301 | 128 KiB of WRAM in banks $7E to $7F | Correct, and the video confirms it: "128K of CPU RAM", world in "bank 2" (06:31), objects planned for $7F0000 (21:18). | [VIDEO] |
| m10 | L224-226, L306-308 | S-SMP, S-DSP, 64 KiB audio RAM, eight voices, BRR of nine bytes for 16 samples | Correct, and the video confirms it: 64K APU RAM (09:01), eight voices (10:02), "9 byt sample blocks" with a control byte and 16 nibbles (10:45 to 11:05). | [VIDEO] |
| m11 | L208, L214 | Visual feedback uses "hardware effects rather than expensive bespoke animation" | Half true. The hit stop darkens the background with color math (40:37). But the dust cloud is an object with its own animation (40:58), and talisman clouds use four palette colors (42:39). | [VIDEO] |
| m12 | L5, L21, L24 | The game is "〇 Star" | The itch.io page uses the symbol. The captions say "Zero Star" (00:46). Both names are in use. The document could say so once. | [VIDEO] |

## 4. Source-quality audit

- The document lists 12 web pages. Nine are references for the SNES hardware or the 65C816, and these citations hold up (SNESdev Memory_map and Backgrounds, fetched).
- The GitHub repository exists. The README says that the code is a snapshot of the engine in 〇 Star, and names SPCASM (fetched). The source file confirms the voice split, the 128 Hz timer and the sample directory (fetched).
- The itch.io page confirms the ROM size of 129 kB, version 1.01, "name your own price" and the emulators Mesen and bsnes (fetched).
- All game-specific content comes from one source: the VETAU24H copy of the techeblog article (M8). The document says this. But one secondary source cannot replace a 51-minute video. The video holds about 20 topics. The document finds seven.
- The `citeturn` markers replace real citations. A reader cannot tell which sentence rests on which page without the list in section 11 of the document (m1).

## 5. Omissions a skeptic would raise

1. **The object engine.** Almost five minutes (19:34 to 24:26) on 32-byte objects, the data bank register, the low-RAM mirror and the ninth X bit of OAM. Not in the document.
2. **The tile streaming.** A 128 by 112 pixel box around the player, one new row or column of tiles into VRAM, and the wrap rule at the edge of the tilemap (04:50 to 05:30). Not in the document.
3. **The collision lookup.** From the X and Y position, with scroll, compute the tile under the player (05:50). The video says that this is faster than a list of walls (06:11). Not in the document.
4. **The sprite limits.** 128 sprites, 32 per line, 34 slivers per line, and transparent sprites that still count (27:54 to 30:21). The document says only "sprite/object limits".
5. **Color math, windows and HDMA details.** Add, subtract, half-add (37:13), sprites with palettes 0 to 3 stay unaffected (37:34), sprite 0 always wins (38:14), two windows and the stair transition with 14 sections of 16 lines (43:19 to 44:22). Not in the document.
6. **The audio protocol.** The IPL handshake, the port rules and the resample trick (12:28 to 17:15). The document gives only the hardware summary.
7. **The game-design opening.** Fewer, better actions make a game fun (01:06 to 02:48). The document starts its story with "constraint-driven design", which the video never names.
8. **The end state.** The game is free online, physical release is a "maybe" with a poll, no Mode 7 or extra chips, and PC Engine next (50:10 to 50:53).

## 6. Use for the learning journey

This project learns 8086 Assembly on DOS (A side, VGA Mode 13h, a lander game) and modern Fortran (B side, the laboratory). The SNES uses a different processor family. The document is a map of a different country. Use it only for the lessons that cross over.

- **A side: memory banks are segment:offset.** The SNES data bank register picks a 64 KiB bank, and code lives where the mirror reaches both ROM and low RAM (20:35 to 21:59). The 8086 does the same with `DS`, `ES` and `CS`. Keep this analogy. The document misses it (M4).
- **A side: look up, do not search.** The SNES game finds the tile under the player by address arithmetic (05:50). The lander does the same with `pixel_at` in `game/src/common.inc`: `DI = y * 320 + x`. A table lookup is faster than a loop over a list. The document misses this (omission 3).
- **A side and B side: decimal counters.** The 65C816 decimal flag with ADC, where INC ignores the flag (32:05 to 32:26). The 8086 has `DAA` and `DAS` after `ADD` and `SUB`, and `INC` does not touch the carry flag. The B side can check a BCD counter routine for all 10,000 values, as `check_y.f90` checks 256 of 256 values. The document reports BCD only as hearsay (M11).
- **B side makes tables, A side plays them.** The HDMA table holds pairs of line count and value (35:51). The coin float uses a sine lookup table (27:33). This is decision D19: Fortran makes `sine.bin`, Assembly reads it. VGA has no HDMA. The 8086 must wait on port 3DAh (`wait_vsync`) and change registers itself, or not at all.
- **B side as a checker for a generator.** The maze bug of the video (26:12) is a connectivity bug. A Fortran flood fill can test the maze of an Assembly generator with the same seed. A wrong generator must fail, as test 2b and test 3b fail on purpose.
- **Hardware counts work you cannot see.** Transparent sprites still count per line (28:34). On VGA, a pixel write to the wrong page or a missed retrace also costs a frame. Keep this as a lesson for the "hardware" segment.
- **Ignore** the segment map, the "two corrections" and the "culling" lesson of the document. Do not use the document as a timeline of the video (C1, C3, M3).

## 7. Pass-2 verification list

- [ ] Watch the credit roll (47:35 to 50:10) for the Hornests credit (M7).
- [ ] Check the itch.io page metadata for the publication date of 5 September 2026 (m3).
- [ ] Confirm the techeblog origin and date of the VETAU24H copy (M8).
- [ ] Confirm the yt-dlp duration 51:14 against the YouTube player (m2).
- [ ] Check the SNESdev DMA page for the HDMA table format: the video says three bytes per entry for a two-byte write (35:51).
- [ ] Read the full `soundengine-spc700.s` for the CPU port protocol and compare with the video description at 18:38 (M5).
