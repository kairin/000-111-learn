---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 83-271
video: https://www.youtube.com/watch?v=j_2bo7ng65E
findings: [D13-C1, D13-C2, D13-C3, D13-M1, D13-M2, D13-M3, D13-M4, D13-M5, D13-M6, D13-M7, D13-M9, D13-M10, D13-M11, D13-m1, D13-m2, D13-m5, D13-m6, D13-m7, D13-m8, D13-m9, D13-m10, D13-m11]
---

# Detailed segment breakdown

> **Source video:** [It Took Every SNES Hardware Trick To Make My Game](https://www.youtube.com/watch?v=j_2bo7ng65E) (Inkbox, 51:14) · [at 04:10](https://www.youtube.com/watch?v=j_2bo7ng65E&t=250s). The tile engine and the scrolling start here. The document puts graphics at 10:45.

**Segment 1 — Project framing and the constraint-driven premise**  
**Estimated:** ~00:00–04:20 ⚠

The opening is best understood as the “why” of the whole presentation: 〇 Star is presented as a game designed *for* the SNES rather than a modern game merely rendered in a retro style. Hackaday describes the project as an assembly-written top-down adventure in which Inkbox gets directly into how the SNES architecture must be used, while the creator’s own itch.io page confirms that the deliverable is an actual SNES ROM rather than a visual imitation. citeturn35search2turn31view2

**Key concepts**
- Native SNES homebrew rather than retro-styled software.
- Assembly as a means of explicit control over hardware resources.
- Hardware constraints feeding directly into game design.
- 〇 Star as the concrete case study.

**Important quote, verbatim:** **Unavailable for timestamp verification.** The accessible research interface could not retrieve the audio transcript or caption track; supplying one here would require inventing wording or timing. citeturn31view0turn34view1

**Concept tags:** `SNES-homebrew` · `〇-Star` · `assembly` · `constraint-driven-design`

**Speaker / visuals:** Inkbox is the identified creator/narrator associated with the video; no separate guest speaker could be independently verified from accessible material. citeturn35search0turn35search2 Contemporary coverage indicates that the presentation mixes gameplay with explanations of the underlying architecture. citeturn35search2

**Review flag:** verify the ~04:20 boundary and any statement about the project's exact development duration. A derivative article says Inkbox spent two years writing the game in 65C816 assembly, but I did not find that duration independently stated in the creator’s accessible first-party pages. citeturn35search6


**Segment 2 — CPU, memory and cartridge architecture**  
**Estimated:** ~04:20–10:45 ⚠

This section establishes the machine-level budget that drives subsequent choices: a 5A22/65C816-family CPU, small work RAM and bank-oriented addressing, plus a deliberately constrained cartridge representation. The crucial lesson is not simply “the SNES is slow”; it is that performance depends on understanding *where* code and data live, what address ranges are fast, how banks are arranged and what can be moved efficiently. citeturn28search4turn35search2

**Key concepts**
- Ricoh 5A22 and 65C816-family instruction architecture.
- 128 KiB of system WRAM accessible continuously through banks `$7E–$7F`.
- Banked address-space thinking.
- LoROM/HiROM cartridge mapping.
- Assembly-level resource accounting.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `65C816` · `Ricoh-5A22` · `WRAM` · `memory-map` · `LoROM` · `assembly`

A technically important correction applies here. Describing the SNES simply as having a “3.58 MHz 6502” is useful shorthand but not exact. WDC identifies the W65C816 family as a 16-bit processor architecture with 24-bit addressing, while SNES references identify the console’s Ricoh 5A22 as a derivative of the 65C816; its effective CPU rate is not a single invariant 3.58 MHz because access timing varies. citeturn26search14turn27search4

The cartridge-size point is similarly nuanced. SNESdev documents ordinary LoROM as supporting up to 4 MiB and conventional HiROM having the same basic 4 MiB range, **but also documents ExHiROM specifically as a mapping for exceeding the 4 MiB limit**. citeturn28search4 Thus, a 4 MiB ceiling makes sense as a historically motivated design constraint or a conventional mapping limit; it is not an absolute physical maximum of all possible SNES cartridges.

**Review flag:** claims phrased as “the SNES is limited to 4 MB” should be interpreted in that narrower mapping/design context, not literally.


**Segment 3 — Mode 1 graphics, tile economics and scanline tricks**  
**Estimated:** ~10:45–19:10 ⚠

This is the graphics-centred part of the argument. Instead of a modern framebuffer mentality, SNES graphics are organised as reusable tiles, tilemaps, palettes and independently scrolling background layers. The detailed contemporary synopsis reports that 〇 Star uses Mode 1 with a colourful main world, HUD material and a lower-colour mountain background, together with 16×16 tiles and HDMA-controlled scrolling to create greater apparent depth. citeturn35search6

SNESdev confirms the underlying hardware structure precisely: **Mode 1 has BG1 and BG2 at 4 bits per pixel, plus BG3 at 2 bits per pixel**, and backgrounds can use either 8×8 or 16×16 tile sizes. citeturn28search9 HDMA can automatically write values to hardware registers at selected scanlines, and its transfer patterns explicitly support scroll-position registers. citeturn37search6

**Key concepts**
- Mode 1 background composition.
- 4-bpp versus 2-bpp colour budgets.
- Tiles and tilemaps instead of full-screen bitmaps.
- Background scrolling and parallax.
- HDMA as a scanline-sensitive graphics technique.
- Compact decimal counters/HUD representation.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `Mode-1` · `tilemap` · `4bpp` · `2bpp` · `HDMA` · `parallax` · `HUD`

A useful conceptual visualisation of the technique is:

```text
         Conceptual 〇 Star display composition
         (not a literal priority-register dump)

      Game objects / sprites
                ↓
      HUD / foreground information
                ↓
      Walkable tiled world
                ↓
      Distant mountain background
                ↑
      HDMA modifies selected scroll-register
      values as the raster crosses scanlines
```

The conceptual point is broader than “parallax looks nice”: **memory-efficient representation and raster-time register changes substitute for brute-force pixel rendering**. Mode 1 gives the game three useful background planes with different colour costs; HDMA then changes display state without making the main CPU explicitly perform every update at the exact raster moment. citeturn28search9turn37search6

The derivative synopsis also describes packed binary-coded decimal for large counters. citeturn35search6 That game-specific implementation is plausible for the 65xx family, but because the accessible primary source code for the *game* itself was not available, I would treat the exact counter implementation as a **reported implementation detail rather than independently audited code**.

**Review flag:** verify exactly where the video moves from Mode 1/tile explanation into HDMA and HUD/counter implementation.


**Segment 4 — Procedural dungeon generation as a memory strategy**  
**Estimated:** ~19:10–27:30 ⚠

The next idea is more algorithmic: rather than dedicating cartridge and RAM capacity to a huge catalogue of hand-authored maps, the game can generate dungeon structure from compact rules. The derivative synopsis describes a system that stamps random chambers and connects them with one-tile corridors, with world data stored in a second RAM bank. citeturn35search6

That fits the broader engineering philosophy of the video: **procedural generation is not merely a replayability feature; it is a form of data compression**. A small program plus state can describe far more possible spaces than explicitly storing every possible level as tile data. This relationship between algorithm and storage follows from the project's documented small-ROM context—the distributed build in the fetched creator snapshot is only 129 kB. citeturn31view2

**Key concepts**
- Procedural dungeon generation.
- Room stamping and corridor carving.
- Generated state versus stored level data.
- RAM-bank budgeting.
- Algorithms as a substitute for content storage.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `procedural-generation` · `maze-generation` · `memory-budget` · `data-compression` · `WRAM`

The secondary synopsis gives unusually specific figures—**192×168 tiles** and about **63 kB** for the generated grid. citeturn35search6 I did not locate a first-party game-source repository or creator document that independently exposes those structures, so those numbers should be regarded as **provisionally reported**, not audited.

**Review flag:** ~19:10–27:30 is one of the least certain segment placements because the precise ordering of graphics, world generation and RAM-layout discussion cannot be recovered without captions.


**Segment 5 — Sprite pressure, visibility culling and gameplay optimisation**  
**Estimated:** ~27:30–36:15 ⚠

This part moves from “how is the world represented?” to “how do you keep a busy game responsive?” The contemporary detailed recap describes chickens/enemies with compact behavioural states, sprite-management measures, talisman effects and collision logic that focuses CPU work on objects that are actually relevant on screen. citeturn35search6

The important general lesson is **culling**: hardware does not reward calculating invisible gameplay entities with the same intensity as visible ones. Restricting collision or expensive update work to nearby/on-screen enemies is therefore both a game-engine optimisation and a direct response to the frame-time budget.

**Key concepts**
- Sprite/object limits.
- Visibility culling.
- Collision-detection workload reduction.
- Small enemy state machines.
- Reuse of animations across related abilities.
- Visual feedback produced with hardware effects rather than expensive bespoke animation.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `sprites` · `culling` · `collision` · `state-machine` · `frame-budget` · `talismans`

The detailed secondary account reports four talisman variants sharing an underlying throw animation while changing their effects; it also describes chickens switching among simple movement/behaviour states and reports that off-screen enemies are excluded from collision work. citeturn35search6 Those are credible game-engine patterns but, unlike the hardware facts in the graphics and audio sections, they could not be independently inspected because Inkbox has publicly released the sound-driver source rather than a complete 〇 Star game-source tree in the material found here.

This distinction matters: **“the SNES has feature X” can be checked against hardware documentation; “〇 Star’s game loop does Y” needs either the transcript, the full game source, or direct instrumentation.** For this segment the evidence is therefore lower-confidence than for the Mode 1 or SPC700 sections.

**Review flag:** all specific talisman/enemy/collision phrasing should be checked against the video before quoting or citing as Inkbox’s exact implementation description.


**Segment 6 — SPC700 sound architecture, BRR and voice budgeting**  
**Estimated:** ~36:15–45:10 ⚠

This is one of the strongest parts of the reconstruction because the relevant source code is publicly available from Inkbox. The SNES does not simply have the main CPU poke a basic sound generator: its audio subsystem includes the Sony SPC-700-based S-SMP, an S-DSP and **64 KiB of Audio-RAM**, with communication between the main SNES CPU and sound CPU occurring through dedicated ports. citeturn33search8

The S-DSP has **eight voices**, numbered 0–7, and plays samples stored in **BRR**, or bit-rate-reduction, format. SNESdev documents BRR as blocks of 16 samples stored in nine bytes—a one-byte header plus eight bytes containing 4-bit sample values—and describes the predictive filters used during decoding. citeturn33search13turn33search20

**Key concepts**
- Separate sound processor.
- SPC700 assembly programming.
- 64 KiB shared audio-memory budget.
- BRR sample compression.
- Eight-voice DSP architecture.
- Music/SFX channel allocation.
- CPU-to-APU command protocol.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `SPC700` · `S-SMP` · `S-DSP` · `BRR` · `audio-RAM` · `8-voices`

Here the creator’s source code provides excellent corroboration. The released engine explicitly defines `VOICE0` through `VOICE7`; it provides **song pointers for voices 0–4** and **effect pointers for voices 5–7**. The runtime proceeds through music handling for voices 0–4 and separate effect handling for voices 5–7. fileciteturn7file0L2-L2 That directly supports the secondary article’s statement that five voices are assigned to music and the remaining three to effects. citeturn35search6

The README further says the engine is written in **SPC700 assembly**, compiles to a binary that can be included in the SNES ROM and then transferred to the APU, and that the released code is a snapshot of the version used in 〇 Star. fileciteturn3file0L2-L10 This means that, unlike several game-loop claims, the video’s discussion of a bespoke SNES audio driver is independently supported by first-party implementation artefacts.

The architecture illustrates the video's broader pattern especially well: there is no single “audio trick”. Inkbox has to solve a chain of constraints—sample compression, limited Audio-RAM, an independent instruction set, eight finite DSP voices, CPU↔APU communication, and music-versus-effects arbitration—then turn those constraints into an engine interface.

**Review flag:** exact starting point of the audio section should be checked, but the technical substance of the section has high evidential confidence.


**Segment 7 — Release, physical cartridge context and reuse by other developers**  
**Estimated:** ~45:10–51:15 ⚠

The closing material ties the engineering exercise back to a usable artefact. The first-party game page offers 〇 Star as a downloadable SNES ROM on a name-your-own-price basis; the fetched snapshot lists a 129 kB ROM and recommends Mesen or bsnes. citeturn31view2 Inkbox separately published the sound engine as a public Assembly repository, allowing the audio work to outlive this particular game and become reusable homebrew infrastructure. fileciteturn2file0L2-L10

**Key concepts**
- From development experiment to distributable ROM.
- Physical-cartridge/homebrew workflow.
- Open-source reuse of low-level infrastructure.
- Emulator testing and real-hardware orientation.
- Contributor/art/PCB credits.

**Important quote, verbatim:** **Unavailable for timestamp verification.**

**Concept tags:** `ROM` · `cartridge` · `open-source` · `homebrew` · `release`

Secondary reporting says the video also discusses physical cartridge work, translucent shells and Mouse Bite Labs board designs, and credits Hornests for background graphics. citeturn35search6 I did not find those credits repeated in the accessible first-party itch/GitHub pages, so they should be regarded as **secondary-source attributions pending direct video review**, not definitive credit metadata.

The close also gives the project a useful pedagogical afterlife: the sound driver is not merely shown in the video. The public repository identifies itself as a “Simple Sound Engine for the SPC700 processor of the Super Nintendo Entertainment System”, is written in Assembly, and contains the actual driver source. fileciteturn2file0L2-L10 fileciteturn5file0L2-L10

**Review flag:** because the total runtime itself has conflicting search metadata—51:15 versus 51:55—the exact final timestamp should be checked directly in YouTube. citeturn35search3turn35search4

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D13-C1 | critical | VIDEO | open | L59-81, L222, L247 | _Claim:_ Segment 6, audio, runs from about 36:15 to 45:10. Segment 2, CPU and memory, runs from 04:20 to 10:45. Segment 3, graphics, runs from 10:45 to 19:10. _Problem:_ The captions show a different order. The audio section starts at 08:40 ("time to tackle SNES audio processing") and ends at 19:30. The tile engine and scrolling start at 04:10. The memory-bank discussion is at 20:35 to 22:00. The HDMA parallax is at 35:11. The color math is at 36:52, where the document puts audio. The mermaid timeline repeats the same wrong order. The document marks the times as estimates, but the estimates miss by up to 28 minutes. |
| D13-C2 | critical | VIDEO DOC | open | L59-67, L83-271 | _Claim:_ Seven segments cover the whole video. _Problem:_ The map has no segment for the object engine: 32-byte objects, the data bank register, the low-RAM mirror, OAM copying and the ninth X bit (19:34 to 24:26). It has no entry for the HUD counters (31:24), the inventory (33:26), the title screen (34:08), color math (36:52), hit stop (40:37), windows and the stair transition (43:19), or the sponsor segment (07:58 to 08:40). The segment "Runtime optimisation" (L65) is one label for eight different topics. |
| D13-C3 | critical | VIDEO VERIFY | verify | L121-125, L300, L302, L317-321 | _Claim:_ The "two most significant corrections": the "3.58 MHz 6502" of the video and "4 MB cartridge limit" need qualification. _Problem:_ The video makes neither claim. It never says "3.58 MHz". It says "6502" only about the SPC700, which was "heavily inspired by the 6502" (11:47). It says "an NES cartridges 4 megabyte ROM chip" (03:08) and "My 4 megabyte cartridge ROM" (20:58). Both describe his own cartridge, not a hardware limit. The Hackaday article says "3.58 MHz Ricoh 6502-based CPU" (fetched). So the document corrects Hackaday and presents the result as a correction of the video. The ExHiROM fact itself is correct (SNESdev Memory_map, fetched). |
| D13-M1 | major | VIDEO | open | L64, L190, L313, L323-325 | _Claim:_ "192×168 tiles" and "~63 kB" are "provisionally reported" and "unverified game-specific detail". _Problem:_ The video states these numbers itself: "a 192x 168 tile world", "a 12x12 grid" of screens, "3072x 2688 pixel image", and "fills up 63K of RAM" (06:53). The primary source confirms the secondary source. The row at L313 and the list at L325 are now out of date. |
| D13-M10 | major | VIDEO | open | L172-192 | _Claim:_ The generator "stamps random chambers and connects them with one-tile corridors". _Problem:_ The video says that tunnels are "the same thing as rooms, just with either a small width or height" (25:50). The document misses the algorithm: reject binary space partitioning (24:47), call the random routine until the room fits the limits (25:08), and the bug where two rooms are each other's closest neighbor, fixed by a tunnel to the closest connected room (26:12). |
| D13-M11 | major | VIDEO | open | L167, L141 | _Claim:_ Packed BCD counters are a "reported implementation detail rather than independently audited code". _Problem:_ The video gives the detail: the decimal flag does the carry (32:05), a 16-bit packed BCD counter holds "exactly the 10,000 I need", INC and DEC ignore the flag, so he uses ADC (32:05 to 32:26), and he suppresses leading zeros, except for the chicken counter (32:46 to 33:06). The claim is now checkable and correct. |
| D13-M2 | major | VIDEO | open | L131-133, L139, L147-165 | _Claim:_ The game world uses HDMA parallax for depth. The diagram puts "Distant mountain background" under the "Walkable tiled world". _Problem:_ In the video, the parallax is on the title screen: mountains on layer 3, clouds on layer 2, with HDMA on the layer 2 horizontal scroll register (34:28 to 36:11). The inventory uses a second HDMA table with two entries (36:31). In the game world, layer 3 is "all black tiles" for the color math darkening (37:13). The diagram describes the title screen, not the game. |
| D13-M3 | major | VIDEO | open | L195-218, L284 | _Claim:_ The lesson of the sprite segment is "culling": restrict work to on-screen entities. _Problem:_ The lesson of the video is different. The PPU counts transparent sprites toward the limit of 32 sprites per line (28:34). The fix moves tile-zero sprites to an off-screen Y (28:55). Then the "34 sliver per line rule" cuts 24 objects to 17 (29:38 to 29:59). He chose not to use the OAM rotation registers (30:21). The document names none of these. Its on-screen check exists in the video (22:19), but as a render step, not as a collision step. |
| D13-M4 | major | VIDEO | open | L105-126, L280 | _Claim:_ Segment 2 teaches "LoROM/HiROM cartridge mapping" and "what address ranges are fast". _Problem:_ The video names neither LoROM nor HiROM, and it does not discuss fast or slow ROM. Its memory lesson is the data bank register: ROM from bank $C0, code in the second half of each bank, so the mirror reaches the hardware registers and "the first 8K of low RAM" (20:35 to 21:59). It moved the objects from bank $7F to the first RAM bank to avoid bank switches. The document misses this lesson, which is the closest SNES parallel to the 8086 segment registers. |
| D13-M5 | major | VIDEO VERIFY | verify | L221-247 | _Claim:_ The audio segment is "one of the strongest parts of the reconstruction". _Problem:_ The hardware facts are correct. But the document had the source file, and it still reports almost none of the engine content of the video. The video names SPCASM (14:29), BRRtools (11:05), the 128 Hz timer (14:29) and the sample directory of four bytes per entry (14:50). It explains the IPL handshake with $AA and $BB on ports 0 and 1 (12:48 to 13:48) and the eight separate port registers (12:28). It gives the SPC700 at 1.024 MHz with 256 valid opcodes (11:47 to 12:07). It shows the resample trick: sample at 16 kHz and set the pitch from $1000 to $0800 (16:35 to 17:15). The fetched source file sets `T0DIV` to 128 Hz and `DIRTABLE` at $0900. The document could report these. |
| D13-M6 | major | VIDEO | open | L253-268, L67 | _Claim:_ Segment 7 holds "sound-engine publication" and "emulator testing and real-hardware orientation". _Problem:_ The open-source promise is at 19:07, inside the audio section, not at the end. The video does not discuss emulator testing. The end of the video shows the transparent cartridges (45:36), the solder paste (46:18), a members video (46:55), credits with music (47:35 to 50:10), the free release (50:31), a "maybe" physical release with a poll (50:31), and no Mode 7 or extra chips (50:53). |
| D13-M7 | major | VIDEO VERIFY | verify | L266, L315, L347 | _Claim:_ Credits: "Hornests for background graphics" and "Mouse Bite Labs" are "secondary-source attribution only". _Problem:_ Mouse Bite Labs is in the captions: thanks "for making these SNES cartridge designs open source" (45:58). The music is by "my friend Dr. Matt" (19:07, 44:42). The document never names Dr. Matt. Hornests is not in the captions. The credit roll (47:35 to 50:10) has no captions, so Hornests stays open. |
| D13-M9 | major | VIDEO | open | L85-102 | _Claim:_ Segment 1 shows "the finished dungeon crawler" and 〇 Star "as the culmination". _Problem:_ The video opens with a recap of "Chapter 25" (00:26) and a game-design change: condense punch and kick on A, sword on B, fix the attack blind spot and the animation timing (01:47 to 02:48). Then the "read only" ROM leads to the idea of a world generated in RAM (03:08 to 03:28). The game is not finished in the video. At 46:55 he says that he still has to "finish everything up". |
| D13-m1 | minor | DOC | open | L5-349 | _Claim:_ 107 `citeturn` and 16 `fileciteturn` markers. _Problem:_ These are generation artifacts with hidden control characters. 94 lines of the document carry them. They are not citations. A reader cannot follow them. |
| D13-m10 | minor | VIDEO | open | L224-226, L306-308 | _Claim:_ S-SMP, S-DSP, 64 KiB audio RAM, eight voices, BRR of nine bytes for 16 samples. _Problem:_ Correct, and the video confirms it: 64K APU RAM (09:01), eight voices (10:02), "9 byt sample blocks" with a control byte and 16 nibbles (10:45 to 11:05). |
| D13-m11 | minor | VIDEO | open | L208, L214 | _Claim:_ Visual feedback uses "hardware effects rather than expensive bespoke animation". _Problem:_ Half true. The hit stop darkens the background with color math (40:37). But the dust cloud is an object with its own animation (40:58), and talisman clouds use four palette colors (42:39). |
| D13-m2 | minor | VERIFY | verify | L23, L29, L57, L270 | _Claim:_ Working duration 51:15, with one snapshot at 51:55. _Problem:_ yt-dlp reports 51:14. The last caption block starts at 50:53. The 51:55 value is wrong. The difference of one second has no effect on the review. |
| D13-m5 | minor | DOC VIDEO | open | L241, L294, L333 | _Claim:_ `fileciteturn7file0L2-L2` supports the voices 0 to 4 and 5 to 7 split. _Problem:_ The marker points to one line of the source file. One line cannot hold eight voice constants and eight pointers. The claim itself is correct: the fetched file has `SONGPOINTER0` to `SONGPOINTER4` and `EFFECTPOINTER5` to `EFFECTPOINTER7`. The video says the same at 18:18. |
| D13-m6 | minor | VIDEO | open | L245 | _Claim:_ The engine does "music-versus-effects arbitration". _Problem:_ There is no arbitration. Five voices play music and three wait for the CPU to name a voice and an effect (18:18 to 18:38). Object sounds use one dedicated voice, so they do not interrupt the player sounds or the music (39:35). |
| D13-m7 | minor | VIDEO | open | L266 | _Claim:_ "translucent shells" come from secondary reporting. _Problem:_ The video says it: transparent resin shells from PCBWay, the sponsor of the video (07:58). The document never names the sponsor. |
| D13-m8 | minor | KNOW | open | L7, L121 | _Claim:_ "3.58 MHz is not a constant effective CPU rate". _Problem:_ Correct. The 5A22 bus runs at 3.58 MHz for fast ROM and RAM, 2.68 MHz for slow ROM, and 1.79 MHz for some I/O. The video does not discuss this. |
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
