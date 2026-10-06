# Deep Research Report: *It Took Every SNES Hardware Trick To Make My Game* — Inkbox

## Executive summary

Inkbox’s video is a technical postmortem of **〇 Star**, a dungeon-crawler RPG built for the Super Nintendo Entertainment System, and its central thesis is constraint-driven engineering: limited CPU time, memory, graphics bandwidth, cartridge space and audio resources are treated not merely as obstacles but as design parameters. The major topics reconstructed from first-party material and contemporary coverage are 65C816/5A22 assembly programming, SNES memory organisation, Mode 1 tile graphics, HDMA-based raster effects, procedural world generation, sprite and collision optimisation, and a custom SPC700 sound engine. citeturn31view2turn35search2turn35search6

The hardware discussion is mostly technically sound, but several common simplifications need qualification: the SNES CPU is more precisely a **Ricoh 5A22 built around a 65C816-derived core**, 3.58 MHz is not a constant effective CPU rate, and a “4 MB cartridge limit” applies to conventional LoROM/HiROM mapping rather than being a universal maximum. citeturn26search14turn27search4turn28search4 The graphics and audio claims fare particularly well under cross-checking: SNES Mode 1 really does provide two 4-bpp backgrounds plus a 2-bpp third background; HDMA can rewrite hardware registers at selected scanlines; and the audio subsystem provides 64 KiB of audio RAM, eight DSP voices and BRR-compressed sample playback. citeturn28search9turn37search6turn33search8turn33search13

There is one material research limitation: the YouTube watch page was throttled and YouTube’s timed-text/caption endpoints were disabled in the accessible research environment, so I could not obtain a trustworthy full transcript or automated-caption track. citeturn31view0turn34view1turn34view2 Accordingly, I have **not invented timestamped quotations**; all segment boundaries below are explicitly marked as reconstructed estimates, and the report separates independently verified hardware facts from game-specific claims that currently rest only on secondary reporting.

## Video metadata, evidence base, and transcript status

### Identified video

| Field | Finding |
|---|---|
| **Title** | *It Took Every SNES Hardware Trick To Make My Game* citeturn35search0 |
| **Creator / channel** | Inkbox citeturn35search0turn32search3 |
| **Video ID** | `j_2bo7ng65E` |
| **URL** | [YouTube video](https://www.youtube.com/watch?v=j_2bo7ng65E) |
| **Subject** | Development of the SNES game **〇 Star**, with emphasis on low-level hardware programming and optimisation. citeturn31view2turn35search2 |
| **Publication period** | September 2026. YouTube search indexed it as “last month” during this October 2026 research pass; Hackaday discussed the video on 11 September 2026, and the linked game itself was published on 5 September 2026. citeturn35search0turn35search2turn31view2 |
| **Working duration** | **~51:15**, with a metadata discrepancy noted below. citeturn35search3turn35search5 |
| **Linked game** | **〇 Star**, a SNES dungeon-crawler RPG distributed on itch.io. citeturn31view2 |
| **Linked code** | Inkbox’s **SimpleSNESSoundEngine**, an SPC700 assembly sound engine whose README explicitly says it is a snapshot of the engine used in 〇 Star. fileciteturn3file0L2-L10 |

The indexed YouTube description begins by framing the subject as programming the SNES through its hardware-specific tricks and points viewers towards the playable game and Inkbox’s GitHub material. citeturn35search0 The first-party itch.io snapshot identifies 〇 Star as “a dungeon crawler RPG built for the SNES”, recommends Mesen or bsnes, lists release version 1.01, and shows a 129 kB ROM download. citeturn31view2

**Duration caveat.** Multiple YouTube search/carousel snapshots display **51:15**, but one separate YouTube carousel displays **51:55** beside the Inkbox video. citeturn35search3turn35search4turn35search5 Because the actual watch page could not be opened to settle the discrepancy, I use **51:15 as the working runtime**, but the final endpoint and every reconstructed boundary should be reviewed against the player.

### Transcript and quotation status

I attempted three routes to obtain the textual source:

1. The ordinary YouTube watch page returned an online-fetch throttling error. citeturn31view0
2. The YouTube `api/timedtext` endpoint for English captions returned a disabled-endpoint error. citeturn34view1
3. The caption-track listing endpoint likewise returned a disabled-endpoint error. citeturn34view2

Searches for publicly indexed transcripts also returned the video itself and commentary about it, rather than a reliable full transcript. citeturn24search0turn25search0 This therefore does **not** establish that the video has no captions; it means that neither the ordinary transcript nor an automated-caption track could be retrieved through the available interface.

A full verbatim reproduction of a copyrighted YouTube transcript would in any event not be appropriate to reproduce here. More importantly for this analysis, because the source text itself was inaccessible, **I will not attach quotation marks and timestamps to reconstructed prose and pretend it is what Inkbox said**. The “important quote” field for every segment therefore explicitly records the limitation.

### Evidence hierarchy

The reconstruction uses four evidence levels.

**Primary creator sources** are given the most weight: Inkbox’s YouTube metadata, the 〇 Star itch.io page, and Inkbox’s SimpleSNESSoundEngine repository. The GitHub README states that its binary is included in the SNES ROM and transferred to the APU, and explicitly identifies the code as a snapshot of 〇 Star’s sound engine. fileciteturn3file0L2-L10

**Technical references** are headed by the Western Design Center’s official documentation for the W65C816S and the SNESdev Wiki’s hardware documentation. WDC describes the W65C816S as a 16-bit processor with a 24-bit address bus and 16 MB address space; SNESdev provides detailed memory-map, graphics, DMA/HDMA and audio documentation. citeturn26search14turn28search4turn28search9turn37search6turn33search8

**Secondary reporting** comes primarily from Hackaday’s 11 September 2026 article, which independently identifies the video as a deep dive into Inkbox’s assembly-based SNES game and its architecture. citeturn35search2

Finally, the unusually detailed **VETAU24H synopsis** is used only to reconstruct the video's likely topic sequence and game-specific details where primary material is unavailable. Because it is a derivative secondary/tertiary source rather than an authoritative technical reference, claims found only there are flagged as such rather than treated as established fact. citeturn35search6

## Segment map and timeline

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

## Detailed segment breakdown

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

## Main concepts and how they connect

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

## Factual cross-check and caveats

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

### The two most significant corrections

The **4 MiB point** is the clearest potential misconception. A reader could leave with the impression that no SNES ROM can exceed 4 MiB. That is false as a universal statement: ExHiROM specifically provides a mapping scheme beyond the normal 4 MiB HiROM range. citeturn28search4 If Inkbox frames 4 MiB as a project rule intended to match an ordinary historical cartridge configuration, however, the claim is perfectly reasonable.

The **CPU description** deserves similar precision. Hackaday calls it a “3.58 MHz Ricoh 6502-based CPU”. citeturn35search2 The family resemblance is real, but the more useful programming description is **Ricoh 5A22 with a 65C816-derived 8/16-bit core**, not an ordinary 8-bit 6502. WDC’s W65C816S documentation identifies 16-bit ALU/register capabilities and a 24-bit, 16 MB address space, while SNES documentation reflects the 5A22-specific system implementation. citeturn26search14turn27search4

### What remains genuinely unsupported

Nothing uncovered suggests a major technical fabrication in the video. The uncertainty instead clusters around **project-specific implementation numbers and exact wording**: precise world-grid dimensions, exact runtime data structures, exact development duration, contributor credits, and the second-by-second ordering of topics. Those details depend primarily on a derivative written synopsis because the actual caption track was inaccessible. citeturn35search6turn34view1 They should therefore be checked directly against the video before being reused as quotations, academic citations or exact implementation specifications.

## Sources and methodological notes

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