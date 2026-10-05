---
source: ../deep-research-report.md
document: "Deep Research Report: It Took Every SNES Hardware Trick To Make My Game — Inkbox"
kind: section-lead
parent: ""
lines: 83-271
findings: []
---

# Detailed segment breakdown

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
