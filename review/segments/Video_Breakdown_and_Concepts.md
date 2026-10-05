# **Technical Architecture and Systems Deconstruction of Inkbox's "It Took Every SNES Hardware Trick To Make My Game"**

## **Architectural Foundations and Project Scope**

Targeting fourth-generation console architectures presents distinct engineering challenges, primarily arising from the platform's non-uniform memory maps, rigid hardware line buffers, and asynchronous co-processing subsystems1. In the technical documentary *"It Took Every SNES Hardware Trick To Make My Game"*, software engineer and retrocomputing specialist Inkbox deconstructs the two-year bare-metal development of *〇 Star* (*Zero Star*), an original top-down dungeon crawler designed for native execution on the Super Nintendo Entertainment System (SNES)1. Unlike contemporary retro-styled projects that rely on high-level languages like C or compiled development environments that introduce runtime overhead and unoptimized binary footprints, *Zero Star* was authored entirely in hand-assembled 65c816 and SPC700 machine instructions1.  
The primary objective was to deliver a responsive, procedurally generated action RPG contained entirely within a 129-kilobyte ROM image, executed on historical hardware without relying on auxiliary expansion coprocessors such as the Super FX or SA-1 chips1. The underlying hardware platform, released in 1990, is governed by a Ricoh 5A22 central processing unit running at a maximum clock frequency of 3.58 MHz, paired with 128 kB of Work RAM (WRAM), 64 kB of Video RAM (VRAM), and an isolated 64 kB Audio RAM (ARAM) subsystem1.  
The documentary covers game design post-mortem analysis and bare-metal systems engineering, demonstrating how hardware quirks and CRT raster timings can be harnessed to bypass the physical constraints of vintage computing silicon1. The physical realization of the project was supported by custom background pixel art by Hornests, an original soundtrack by Dr. Matt, and open-hardware physical cartridge board implementations developed by Mouse Bite Labs1.

## **Video Structure and Narrative Progression**

The video provides an exhaustive, pedagogical walk-through that correlates each major gameplay design requirement with a specific hardware coprocessor or architectural feature of the Super Nintendo2. The presentation follows nine distinct technical stages:

### **Bare-Metal Hardware Baseline and Computational Limitations**

The video begins by examining the physical architecture of the Super Nintendo, highlighting the lack of an operating system, the absence of an integrated memory management unit, and the severe processing limitations of the Ricoh 5A22 central processor1. Inkbox discusses the rationale behind writing native 65c816 assembly rather than using high-level compiled abstractions, showing how modern compilers introduce register-thrashing and memory bloat on vintage accumulator-constrained CPUs1. The introduction outlines the central technical challenge: building a procedural dungeon crawler capable of managing dynamic world generation, dozens of concurrent entities, multi-layered parallax backgrounds, and dynamic sound effects within an unforgiving 16-bit hardware architecture1.

### **Work RAM Topology and Procedural Dungeon Generation**

The analysis moves to internal memory organization, focusing on the 128 kB Work RAM pool split across two 64 kB banks: Bank \$7E and Bank \$7F1. Inkbox explains that memory fragmentation cannot be tolerated when dynamically generating massive dungeons1. The developer details a custom procedural level generator that stamps out interconnected chambers and carves deterministic, single-tile pathways across a 192×168 tile grid1. By dedicating Bank \$7F entirely to this 63 kB world buffer while keeping all core engine variables, entity arrays, and the hardware stack isolated in Bank \$7E, the game prevents stack overflows and achieves non-fragmented procedural scaling across 9,999 distinct dungeon levels1.

### **Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic**

The video transitions to the console’s dual Picture Processing Units (PPU1 and PPU2) and explains the selection of Background Mode 11. Inkbox outlines how graphical priorities are organized across three distinct planes: a 4 bits-per-pixel (16-color) interactive terrain playfield on Background Layer 1, a static heads-up display on Background Layer 2, and distant background art on Background Layer 3 rendered at 2 bits per pixel (4 colors)1. Within this section, the presentation breaks down the implementation of the game's dynamic on-screen counters1. Rather than burning clock cycles on integer division algorithms to parse base-10 values from binary registers, the engine stores the 9,999 chicken kill requirement, floor depth, and coin metrics in Packed Binary-Coded Decimal (BCD)1. Activating the 65c816 decimal flag (SED) allows the hardware to calculate multi-digit carries automatically during standard addition and subtraction instructions1.

### **Raster Manipulation via Horizontal Blank Direct Memory Access**

To simulate three-dimensional environmental depth on flat tilemaps, the presentation explores Direct Memory Access (DMA) and Horizontal Blank DMA (HDMA)1. Standard DMA transfers are restricted to the vertical blanking interval (V-Blank), whereas HDMA operates during the brief horizontal blanking periods between individual CRT scanline draws1. Inkbox demonstrates how HDMA channels are configured to update horizontal scroll registers scanline by scanline1. By mapping 16×16 graphic tiles across a 32×32 virtual playfield and modulating the horizontal displacement of Background Layer 3 down the display, the engine produces smooth, multi-plane mountain parallax effects without consuming central processor cycles during active rasterization1.

### **Object Attribute Memory Partitioning and Scanline Saturation**

The video addresses dynamic entity rendering, focusing on the strict physical limitations of the console’s Object Attribute Memory (OAM)1. Although the SNES can register 128 total hardware sprites, the internal line buffer of the PPU cannot process more than 32 sprites on any single horizontal scanline1. Inkbox demonstrates the resulting visual dropouts and presents an entity culling and multiplexing system1. By sorting active entities vertically, unlinking off-screen objects, mapping culled actors to a transparent dummy "tile zero," and cycling sprite priority evaluation across alternating frames, the engine eliminates sprite dropouts and visual artifacting during intense combat sequences1.

### **Spatial Hashing and Entity Collision Architecture**

The documentary deconstructs entity interaction physics and boundary detection routines1. Traditional pairwise collision detection, which compares every entity's bounding box against every other object, exhibits quadratic complexity (![][image1]) and quickly exhausts the 3.58 MHz CPU budget1. Inkbox shows how the 63 kB uncompressed tilemap in Bank \$7F functions as a direct spatial hash grid1. By using fast bitwise shifts to convert entity world coordinates into absolute memory offsets, terrain collision resolves in constant time (![][image2])1. In addition, dynamic actor updates are clamped to the active camera viewport, running off-screen enemies on lightweight timer routines to save CPU cycles1.

### **Real-Time Color Arithmetic and Visual Effects**

Inkbox highlights the console’s dedicated hardware color math engine, which enables visual effects without the bandwidth costs of rewriting Color Graphics RAM (CGRAM) palettes during active frames1. The hardware allows the sub-screen and main-screen color values to be dynamically added, subtracted, or averaged in real time1. The video demonstrates how hit-stop impact effects (such as the single-frame black flash triggered when striking a chicken), weapon slashes, and elemental talisman spells (fire trails, ice freezing, and bonus item bursts) are executed through direct register updates rather than expensive palette reloads1.

### **Independent Audio Subsystem and Custom SPC700 Driver Engineering**

The video examines the SNES audio architecture, which operates as a self-contained system physically isolated from the main processor1. Built around an 8-bit Sony SPC700 CPU running at 1.024 MHz, an 8-channel DSP, and 64 kB of dedicated Audio RAM, the audio unit communicates with the main CPU through four 8-bit bidirectional I/O registers1. Inkbox discusses the challenges of modern homebrew audio development and presents an open-source SPC700 audio driver built entirely from scratch in assembly1. The technical breakdown details how Bit Rate Reduction (BRR) compressed audio samples are loaded, and how the DSP’s eight voices are divided: five voices dedicated to Dr. Matt’s musical score, and three preemptive voices reserved for dynamic sound effects1.

### **Physical Manufacturing and Silicon Verification**

The documentary concludes by covering the transition from emulator-based debugging to physical cartridge manufacturing1. Inkbox details the flashing of non-volatile ROM chips, integration with open-hardware PCB designs by Mouse Bite Labs, and the electrical testing of physical cartridges on original retail consoles1. The developer analyzes behavioral discrepancies observed between high-accuracy PC emulators (such as Mesen and bsnes) and real hardware, highlighting edge cases in open bus states, floating lines, and uninitialized RAM variables1. The presentation ends with the public release of the playable ROM image and the publication of the audio driver repository2.

## **Detailed Structural Mapping of Video Content**

The following table summarizes the video presentation, linking narrative segments to their underlying hardware subsystems, primary technical challenges, and software implementations:

| Segment Title | Target Hardware Subsystem | Primary Technical Challenge | Core Software Implementation |
| :---- | :---- | :---- | :---- |
| **1\. Architecture Baseline & Constraints** \[cite: 1, 2\] | Ricoh 5A22 CPU & System Bus1 | Strict 3.58 MHz processing budget, lack of OS, non-uniform memory architecture1. | Bare-metal 65c816 assembly implementation; zero external coprocessor dependence1. |
| **2\. WRAM Banking & Procedural Maps** \[cite: 1\] | 128 kB Work RAM (Banks \$7E/\$7F)1 | Generating large dynamic playfields without memory fragmentation1. | Bank \$7F dedicated to a 63 kB procedural tile buffer; Bank \$7E isolated for stack and system state1. |
| **3\. PPU Configuration & BCD HUD** \[cite: 1\] | Dual PPUs & Background Mode 11 | High cycle cost of runtime integer division for five-digit base-10 HUD tallies1. | Mode 1 layer allocation; Packed BCD arithmetic with hardware decimal flag (SED)1. |
| **4\. HDMA Scanline Modulation** \[cite: 1\] | DMA Controller & PPU Registers1 | Generating convincing environmental depth without CPU frame cycle consumption1. | Per-scanline horizontal offset table updates targeting register \$2111 during H-Blank1. |
| **5\. OAM Management & Sprite Limits** \[cite: 1\] | Object Attribute Memory (OAM)1 | Hardware dropout and flickering caused by the 32 sprites-per-scanline threshold1. | Viewport culling; dynamic OAM cycling; redirecting inactive sprites to transparent dummy tile 01. |
| **6\. Spatial Hashing & Collision** \[cite: 1\] | 65c816 Math & WRAM Data Access1 | Quadratic scaling (![][image1]) of traditional pairwise bounding box collision algorithms1. | Direct ![][image2] memory address hashing from coordinates; viewport-bounded enemy updates1. |
| **7\. Hardware Color Arithmetic** \[cite: 1\] | PPU Color Math Engine1 | High bus-bandwidth cost of modifying CGRAM palettes during active frame cycles1. | Sub-screen color subtraction for hit-stop black flashes; real-time blending for spells1. |
| **8\. SPC700 Subsystem & Audio Engine** \[cite: 1, 3\] | Sony SPC700, DSP, 64 kB ARAM1 | Asynchronous communication and lack of flexible open-source audio drivers1. | Custom SPC700 driver; BRR compression; dynamic 5-voice music and 3-voice SFX allocation1. |
| **9\. Physical Synthesis & Testing** \[cite: 1, 3\] | PCB Bus & Physical Mask ROM1 | Silicon behavioral divergences from emulator timing, bus floats, and uninitialized RAM1. | Mouse Bite Labs open hardware; EEPROM verification; open-source driver release1. |

## **Systematic Decomposition of Core Architectural Concepts**

\================================================================================  
          SNES MEMORY AND CO-PROCESSOR BUS WORKLOAD DISTRIBUTION  
\================================================================================

 \[ MAIN PROCESSING DOMAIN \]  
       Ricoh 5A22 CPU (65c816 @ 3.58 MHz)  
             |  
             \+---\> Bank \$7E: System State, Stack, Entity Arrays (64 kB)  
             \+---\> Bank \$7F: Uncompressed Procedural Map Array (63 kB)  
             |  
             \+---\> Direct DMA / HDMA Configuration Pipeline

 \[ DISPLAY PROCESSING DOMAIN \]  
       Dual PPUs (PPU1 / PPU2) & 64 kB Video RAM  
             |  
             \+---\> Background Layer 1: 4bpp Dynamic Playfield Terrain  
             \+---\> Background Layer 2: 4bpp Static Packed BCD HUD  
             \+---\> Background Layer 3: 2bpp Parallax Mountains (HDMA Scrolled)  
             \+---\> Object Attribute Memory: 128 Sprites (Max 32 / Scanline)  
             \+---\> Hardwired Color Math: Real-Time Screen Blending / Inversion

 \[ INDEPENDENT AUDIO DOMAIN \]  
       Sony SPC700 Subsystem (1.024 MHz) & 64 kB Audio RAM  
             |  
             \+---\> 4-Port Bidirectional I/O Interface (\$2140-\$2143)  
             \+---\> 16-bit DSP with 8 Hardware Voices:  
                     \* Channels 0-4: Polyphonic Musical Playback (BRR)  
                     \* Channels 5-7: Dynamic Priority Sound Effects  
\================================================================================

### **Work RAM Banking and Procedural Playfield Synthesis**

The 65c816 CPU addresses a 24-bit physical memory space organized into 64-kilobyte banks1. The system Work RAM provides 128 kB spanning Banks \$7E and \$7F1. In developing a sprawling dungeon crawler, allocating level geometry presents a fundamental architecture challenge1. If dynamic room generation is forced to share memory with dynamic arrays, call stacks, and zero-page pointers, large levels risk memory corruption or heap fragmentation1.  
Inkbox resolves this problem by isolating memory workloads between the two banks1. Bank \$7E handles general engine operations, stack pointers, gamepad input buffers, and active entity descriptors1. Bank \$7F is reserved as a dedicated 63 kB tile buffer that represents the active floor across a 192×168 tile grid1. The procedural generation algorithm operates within this clean memory partition, using room stamping combined with single-tile tunnel carving1. Because paths between room origins are generated using deterministic Manhattan vectors, the generator avoids loops and disconnected zones1. This design ensures reliable level generation that can scale up to 9,999 procedurally assembled floors1.

### **Picture Processing Unit Configuration and Hardware Decimal HUD Arithmetic**

The console's PPU offers eight discrete graphics modes, each balancing tile color depth against the number of available background planes1. *Zero Star* utilizes Mode 1, which provides two 16-color (4 bits-per-pixel) background layers alongside one 4-color (2 bits-per-pixel) background layer1. Layer 1 displays the playable dungeon map, Layer 2 renders the user interface overlay, and Layer 3 hosts distant mountain art1.  
A major computational challenge in retro programming is updating multi-digit base-10 interface displays1. On modern architectures, converting binary integers to displayable decimal characters relies on integer division and modulo operations, both of which are expensive on a 3.58 MHz CPU lacking hardware division instructions1. Repeatedly executing software division algorithms to update counters for 9,999 chickens, dungeon levels, and player coins would consume substantial frame cycles1.  
Inkbox solves this by maintaining game metrics in Packed Binary-Coded Decimal (BCD)1. In this format, each byte stores two 4-bit nibbles representing values from 0 to 9, allowing a single byte to represent decimal numbers from 00 to 991. By using the 65c816 decimal mode flag (SED), standard instructions such as ADC (Add with Carry) and SBC (Subtract with Borrow) execute in hardware decimal arithmetic1. Carries propagate between nibbles automatically without runtime division1. To push updated tallies to Background Layer 2, the engine separates each nibble using logical shifts (LSR) and masks (AND), using the result to index the appropriate numeric character tile1.

### **Scanline Manipulation via Horizontal Blank Direct Memory Access**

In standard tile-engine rendering, scrolling a background requires updating horizontal and vertical offset registers during the vertical blanking interval (V-Blank)1. While this method shifts entire layers uniformly, it cannot generate depth across horizontal bands within a single layer1. Horizontal Blank Direct Memory Access (HDMA) circumvents this constraint by performing automated register transfers during the 15-microsecond horizontal blanking periods between individual CRT scanline sweeps1.  
To simulate environmental depth on Background Layer 3, Inkbox maps 16×16 graphic tiles across a 32×32 virtual playfield1. The engine sets up an HDMA channel targeting register \$2111 (BG3HOFS) and feeds it an offset table indexed to the vertical beam position1.

\================================================================================  
             PPU BACKGROUND MODE 1 LAYER ALLOCATION & HDMA DEPTH  
\================================================================================

Scanline 001  \+--------------------------------------------------------------+  
              | BG3: Static Distant Sky & Cloud Planes (HDMA Offset: 0\)       |  
              \+--------------------------------------------------------------+  
Scanline 060  | BG3: Mountain Peaks (HDMA Scroll Offset: dx \* 0.25)           |  
              \+--------------------------------------------------------------+  
Scanline 120  | BG3: Mountain Foothills (HDMA Scroll Offset: dx \* 0.50)      |  
              \+--------------------------------------------------------------+  
Scanline 160  | BG1: 4bpp Interactive Playfield (Foreground Dungeon Tiles)   |  
              |      \[16x16 Pixel Tiles, Walkable Collision Geometry\]         |  
              |                                                              |  
              | OAM: Dynamic Sprites (Player, Enemies, Projectiles)          |  
              \+--------------------------------------------------------------+  
Scanline 210  | BG2: 4bpp Static HUD Overlay Plane (Packed BCD Metrics)      |  
Scanline 224  \+--------------------------------------------------------------+  
\================================================================================

As the raster beam draws down the screen, upper scanlines display static sky graphics, mid-tier scanlines shift at fractional rates to show distant mountain peaks, and lower scanlines scroll faster to match foreground motion1. Because the DMA controller processes these register updates independently, multi-layer parallax scrolling runs smoothly at 60 frames per second without burdening the central processor1.

### **Object Attribute Memory Management and Scanline Saturation Controls**

The console’s Object Attribute Memory stores 544 bytes of sprite metadata describing up to 128 dynamic objects1. A primary 512-byte table defines X/Y coordinates, tile indices, and attribute flags, while a secondary 32-byte table holds the ninth horizontal position bit and size toggles1. However, the internal line buffer of the PPU imposes a strict limitation: it can render a maximum of 32 sprite tiles on any single scanline1. If this threshold is exceeded, lower-priority sprites are dropped by the PPU, leading to flickering, invisible enemies, or visual artifacts1.  
To prevent visual dropouts during combat sequences involving multiple enemies, talismans, and item drops, the engine uses dynamic OAM management1. The system sorts active entities along the vertical axis and removes off-screen actors from the hardware drawing queue1. Inactive sprites are moved to coordinate ![][image3] (below the visible display window) and redirected to a transparent dummy tile1. In addition, dynamic sprite priority cycling alternates drawing orders across successive frames1. If entity density temporarily exceeds 32 sprites on a scanline, the engine produces alternating-frame transparency rather than dropping objects from the screen1.

### **Constant-Time Spatial Hashing and Entity Collision Architecture**

Bounding-box collision detection between multiple mobile entities presents a common performance bottleneck in action games1. Testing ![][image4] dynamic actors against ![][image5] environment tiles yields algorithmic complexity of ![][image6], which quickly overburdens a 3.58 MHz processor1.  
Inkbox avoids this bottleneck by treating the uncompressed level data in Bank \$7F as a spatial hash grid1. Because the dungeon floor is stored as a contiguous 192×168 array, checking terrain collision under an entity at coordinate ![][image7] requires calculating a direct memory address:  
![][image8]  
Because the playfield width is fixed at 192 tiles, this multiplication reduces to simple bitwise operations:  
![][image9]  
The CPU checks the byte at the calculated address in constant time (![][image2]) to determine terrain properties (such as walls, open ground, or hazards)1. For entity-to-entity checks, the engine processes bounding boxes only for actors currently within the camera viewport, updating off-screen enemies via lightweight state timers1.

### **Hardware Color Arithmetic for Dynamic Visual Feedback**

Delivering visual feedback for attacks, damage, and spell effects typically requires altering palette data in Color Graphics RAM (CGRAM)1. However, writing to CGRAM during active frames causes bus contention, restricting palette reloads to the brief V-Blank window1. To provide responsive combat visuals, *Zero Star* utilizes the PPU's hardwired color math unit1.  
The SNES can mathematically combine main-screen and sub-screen RGB values using hardware addition, subtraction, or averaging1. Inkbox uses this feature to implement a hit-stop mechanic: when the player strikes an enemy chicken, the screen flashes black for a single frame and the chicken sprite is replaced by an explosive smoke cloud1. Rather than redrawing background tiles or swapping palette tables, the engine writes to the fixed color register (\$2132) and enables sub-screen color subtraction (\$2131), inverting the display in real time1.  
The game’s four collectible talismans rely on this color arithmetic pipeline for their visual effects:

* The Fire Talisman generates smoke trails using color blending1.  
* The Ice Talisman shifts color palettes to freeze targets in place1.  
* The Gold and Peach Talismans trigger screen-wide color flashes when spawning bonus items1.

### **Subsystem Isolation and Custom SPC700 Audio Driver Implementation**

The Super Nintendo’s audio hardware operates as an independent computer isolated from the main system1. Driven by an 8-bit Sony SPC700 CPU running at 1.024 MHz, an 8-channel DSP, and 64 kB of dedicated Audio RAM, the APU cannot access the main system bus1. Communication between the Ricoh 5A22 CPU and the audio processor is restricted to four 8-bit bidirectional I/O registers (\$2140 through \$2143)1.  
Due to the lack of modern, modular sound drivers for homebrew development, Inkbox wrote a custom audio driver from scratch in SPC700 assembly1. At boot, the main CPU transfers the driver binary and Bit Rate Reduction (BRR) compressed audio samples into ARAM via the I/O communication ports1. The driver divides the DSP’s eight voices between music and sound effects: five channels are assigned to melodic tracks composed by Dr. Matt, while three channels are reserved for gameplay sound effects1. When a sound effect triggers (such as printing talismans, taking damage, or dying), the driver preempts lower-priority musical voices and restores them cleanly once playback finishes, preventing pops or clicks in the audio output1.

## **Physical Hardware Realization and Real-Silicon Divergence**

Moving from emulator-based debugging to physical cartridge hardware exposes subtle differences between software models and authentic silicon1. High-accuracy emulators such as Mesen and bsnes simulate standard hardware timings closely, but physical systems introduce electrical behaviors like bus float, cold-boot RAM states, and variable signal propagation1.  
In software emulation, uninitialized RAM typically defaults to predictable zero states1. On physical console hardware, however, power-on SRAM cells contain random bit patterns that can trigger game logic bugs unless memory is explicitly cleared during boot1. Similarly, leaving hardware buses ungrounded can float data lines, producing phantom inputs or visual corruption1. Inkbox resolved these issues by adding exhaustive boot-clearing loops and strict initialization sequences to ensure reliable execution on physical hardware1.  
The physical production of *Zero Star* used open-hardware PCB designs from Mouse Bite Labs, pairing non-volatile flash ROMs with surface-mount cartridge shells to verify electrical compatibility on unmodified retail Super Nintendo hardware1.

## **Comparative Architectural and Resource Budgeting Matrix**

The following table contrasts the native hardware limits of the Super Nintendo against the low-level software solutions implemented in *Zero Star*:

| Architecture Domain | Hardware Limit / Metric | Computational Bottleneck | Software Engineering Solution |
| :---- | :---- | :---- | :---- |
| **CPU Processing** \[cite: 1, 2\] | Ricoh 5A22 core running at 3.58 MHz1. | Low cycle budget per frame; lack of native division instructions1. | Pure 65c816 assembly; Packed BCD HUD arithmetic via decimal flag (SED)1. |
| **Work Memory (WRAM)** \[cite: 1, 6\] | 128 kB split into two 64 kB banks (\$7E/\$7F)1. | Cannot allocate single buffers exceeding 64 kB; risk of heap fragmentation1. | Bank \$7F dedicated to a 63 kB procedural map; Bank \$7E reserved for system stack and arrays1. |
| **Video Engine Modes** \[cite: 1, 2\] | Mode 1: two 4bpp layers, one 2bpp layer1. | High color depths consume VRAM bandwidth and tile limits1. | Layer 1 allocated to terrain (4bpp); Layer 2 to HUD (4bpp); Layer 3 to parallax background (2bpp)1. |
| **Direct Memory Access** \[cite: 1, 5\] | DMA (V-Blank) & HDMA (H-Blank)1. | V-Blank window is too short for massive runtime tile reloads1. | HDMA writes horizontal scroll registers per scanline to generate multi-plane parallax1. |
| **Sprite Hardware (OAM)** \[cite: 1\] | 128 total sprites; 32 sprites per scanline maximum1. | Overcrowded scanlines drop sprites, causing visual flicker and missing entities1. | Dynamic OAM table cycling; viewport culling; mapping inactive sprites to dummy tile 01. |
| **Collision Engine** \[cite: 1\] | Software-driven bounding box physics1. | Pairwise checks scale quadratically (![][image1]), dropping frame rates1. | Constant-time ![][image2] memory hashing into Bank \$7F; off-screen actor updates culled1. |
| **Visual Color Math** \[cite: 1\] | Sub-screen color addition and subtraction1. | Modifying CGRAM palettes during active frames causes bus contention1. | Real-time color subtraction for hit-stop black flashes; sub-screen blending for talisman effects1. |
| **Audio Processing** \[cite: 1, 2, 9\] | Sony SPC700 \+ DSP with 64 kB ARAM1. | Asynchronous bus; audio memory isolated from main CPU1. | Custom SPC700 driver; BRR compression; dynamic 5-voice music and 3-voice SFX allocation1. |
| **Cartridge Physical Bus** \[cite: 1, 2, 3\] | Standard Mask ROM addressing space (up to 4 MB)2. | Electrical timing quirks and uninitialized RAM discrepancies on real hardware1. | 129 kB ROM image verified on Mouse Bite Labs PCBs using retail consoles1. |

## **Engineering Implications for Constrained Systems Development**

The systems architecture presented in Inkbox’s post-mortem highlights key principles for constrained software development that remain relevant across embedded engineering and retrocomputing2.  
First, targeting constrained processors like the 65c816 illustrates the limits of modern optimizing compilers on non-orthogonal architectures1. Modern C compilers are designed around architectures with deep, uniform register files, such as ARM or RISC-V10. When compiling for the 65c816—which relies on an 8/16-bit accumulator, two index registers, and direct-page memory locations—compilers often generate substantial stack-spilling code2. Hand-assembling the codebase allowed Inkbox to use platform-specific features that compilers rarely target, such as the processor's decimal mode (SED) for zero-cost HUD arithmetic1. This demonstrates that deep hardware familiarity can outperform generic compiler optimizations on specialized, resource-limited platforms1.  
Second, the SNES architecture demonstrates the benefits of using specialized hardware coprocessors to handle distinct processing tasks1. Maximizing performance on vintage silicon is not achieved by forcing the central CPU to compute every operation sequentially, but by offloading work to independent submodules1. HDMA handles multi-plane background parallax scrolling without CPU intervention; the PPU color math engine executes screen-wide visual effects directly in the display pipeline without CGRAM writes; and the SPC700 audio subsystem mixes eight channels of BRR audio completely independently of the gameplay loop1. Organizing software to align with underlying silicon pipelines allows constrained hardware to deliver complex, multi-layered visual and audio experiences1.

## **Synthesis and Conclusions**

Inkbox’s *"It Took Every SNES Hardware Trick To Make My Game"* demonstrates the engineering discipline required to develop for fourth-generation console hardware2. Rather than relying on hardware abstractions, high-level engines, and expansive memory pools, the author of *Zero Star* achieved an expansive 9,999-floor procedural dungeon crawler by balancing the platform's hardware subsystems1.  
Every technical choice in the game is directly shaped by physical hardware constraints:

* Work RAM banking dictates the 63 kB procedural map structure in Bank \$7F1.  
* 65c816 architectural limits drive the use of Packed BCD for zero-cost HUD arithmetic1.  
* CRT electron beam timings guide the use of HDMA for parallax background scrolling1.  
* PPU line buffer limits dictate viewport entity sorting and transparent tile zero culling1.  
* System bus isolation requires an autonomous, custom SPC700 sound engine to manage audio independently1.

By delivering both a fully functional 129 kB game ROM and an open-source audio driver for the retrodevelopment community, Inkbox demonstrates that the architectural constraints of the fourth console generation remain a masterclass in deterministic hardware utilization, mechanical sympathy, and low-level software engineering1.

#### **Works cited**

> 1. Zero Star Climbs Out of Two Years of Pure SNES Assembly, [https\://www\.techeblog.com/zero-star-homebrew-snes-game-assembly-language/](https://www.techeblog.com/zero-star-homebrew-snes-game-assembly-language/)  
> 2. [https\://hackaday.com/2026/09/11/hand-coded-asm-powers-homebrew-snes-game/](https://hackaday.com/2026/09/11/hand-coded-asm-powers-homebrew-snes-game/)  
> 3. It Took Every SNES Hardware Trick To Make My Game \- YouTube, [https\://www\.youtube.com/watch?v=j\_2bo7ng65E](https://www.youtube.com/watch?v=j_2bo7ng65E)  
> 4. Snes | Hackaday, [https\://hackaday.com/tag/snes/](https://hackaday.com/tag/snes/)  
> 5. Reverse Engineering Game Code from the Neutral Zone \- YouTube, [https\://m.youtube.com/watch?v=5HSjJU562e8\&lc=Ugy4qjY-Y5rwAX55K\_N4AaABAg](https://m.youtube.com/watch?v=5HSjJU562e8&lc=Ugy4qjY-Y5rwAX55K_N4AaABAg)  
> 6. YouTube, [https\://www\.youtube.com/live/kYLJLJkVfLk?pp=0gcJCbIJAYcqIYzv](https://www.youtube.com/live/kYLJLJkVfLk?pp=0gcJCbIJAYcqIYzv)  
> 7. Post by SNES-Testberichte in 〇 Star comments \- itch.io, [https\://itch.io/post/17378575](https://itch.io/post/17378575)  
> 8. [https\://inkbox-software.itch.io/zerostar](https://inkbox-software.itch.io/zerostar)  
> 9. Super Nintendo Entertainment System | Hackaday, [https\://hackaday.com/tag/super-nintendo-entertainment-system/](https://hackaday.com/tag/super-nintendo-entertainment-system/)  
> 10. The Real Reason Unity Is Finally Dropping Mono \- YouTube, [https\://www\.youtube.com/watch?v=ojM9tgbcbwU](https://www.youtube.com/watch?v=ojM9tgbcbwU)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAXCAYAAACbDhZsAAACzklEQVR4Xu2WWahNURjHP3Nm6RqjiAcP5MmD2yWUIQkPokwZHhSKDOGSq0TigTI+SObIEOXNUIZIEhkyhFtK5IUXCon//3x7nfPt7+zLOfvs8yK/+nX2+r51dmuvvfa3lsh/MmMjvAzvwnEuV3VawbOwr0+UwFy4ProeDr/BwYW01MH9pp05e+FUHyyRdfCOab+EG0ybbJbCA2bKTHjeB1PSBn6B81y8JXwOa108RidYD0/Ci/AavAXXwBamX6A5fAcn+ERKlsCnsJ1PgNWiY0pktugrWyk6qEANvA+viM6MZTJ8BZu5eBqGwKuwj09EDIC/JP495NgO38NBPhExRvSPDS5+DO52sTR0gEdhx6g9qpCK0Qg32cBC0YH9qURxxn/Cey7+Ai51sXLhWzsAJ4kOeoYUr/nAEXghNDjT/EBu59PJtBd9wI8m1jmKTTGxwGjRB+V9uRzGi5bSG9EvY4FVovexjjB5CyvOo9DgK2fnRfl0MiNF+900saFRjDkLaz6rD3/fwLeibyd8F4/hiei6XHgfLu9c9fggOoD+tkcC20T72fU9LIrZWSSsPMthN9E8l4TlgaQf/Bz4gxcsR+E1sY42RU/RpfVd4gMNM8/fJKaJ5m1t7hfFFphYOcwS/X8OvkI22ubTxewR7bPWxXkUSFo2gV3wk8QnhrvpV9jFxMphMfwcGltEBzAxn47DzkmvnoSPmFUiiYfwlGlzzT8TLa9kH+xaSJcEH573zcGl81p0V+PyCLSGW0UPSSuk6U2oES7zQdBbipcH788YN0NWucMmVyoHxX0vPeBOeF10++XMnBbdjnuZfkkcgsd9UPQk+AR2d3FOCI8bOyTd0mGZ5LgyYb5o7WdZrDY8d7HS2BVSEbwhy+10n6gC3IvO+WCl8CR4yQczhhWLS2agT1QKT6DcUcf6RIY0SPq94a9wnzgjWmWyhh8/C8O/wW9TB4xdtWzAdQAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAXCAYAAABnGz2mAAACTUlEQVR4Xu2WTYhPURjGX98hI5N8hbKYsvAxC5ONNIgkDStJStMsFEqZNJONlUk2FigLaYqUSL42wpTIgqxEEc1qxsfCZxaUeJ55z2nOfdx7u+P/Fwu/+jXd571z/u89595zr9l//i7j4EU4TwslTIOXYYMW6skJuFnDhAUaBNbAG3CMFurBNnhJQzAFtsJT8H22lOE07NZQ4bQegOfgFdgH78Euy7+q0XAArpe8Gb4xH+cp/JAtZ1hufu5ELUS2w+ew0/wHI9PhI3gLTkhy0gZfwFGSp1yz8sZIP9yjITkCX8GFWgishj/gQcnPwGOSKVUa64W3Neww/9F1WkjgTH2HDyV/ZgVXmlClMfbwMQ04Q1/g/TTMYbJ582+TbGrINiVZHlUaW2k+1qwYcBkY7IxBAfEf7ybZ0pCxVkaVxpaYj7WIB3zKXoegaJ+JHDY/L72fWkK2OMnyYGOZZcphvvlYrTyYFA7o2OFzfoHTy+X+Ztkm4ozxbxlVGptrPhY33CEeh6BwDwHHzc/RTZCvn6pL+UlDgUvIsZbF4FAINsRA2GVeP6kFG34gNmpBYGOfNRRWmI81IwZczpfwiSVPBBgPe+BXuM+KN9B+uFdD4ab5rcALKWKHZZ/4IWbCo/CO+WuIm+Z5uB/OTs7Lg++5sxqCRvPx+I6M9/E78yY5Owpvl6sa1kK7+ZXys6cWHsCtGtYCX/rccrZoYQQ0wUEr3xl+i93wuoYjoNf8Hqs7/BLh99haLVRglfk9/cfgPngBztFCCXxA+CnFneHf5yfFjHi14LBmxgAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAaCAYAAAD/nKG4AAACrElEQVR4Xu2XS6hOURiG38g1lOQuh1CUS0qh3EJmQibEyK0oGclERC4DKTPMKCUmIuQuISK55q4MTimJGBAS7+vb6/j24v/79y7HVuupp876vrX22f/aa639bSCRSCQKMYCepO/pI7qddsr1MFbTp/QdPUsn5dN/5CJdEgf/V7rQx3QZ7UHX0e/0mO9EVtHzdBgdR+/Rb3Si7xSxAHatFXEiZgps9l/DBnyhV2h734k8gOW/0pt0aj7919lAt0axg7B7mp21u9KXtGfoQEbB+txwMY8ewnM0OFmBRbABJ+JExlx6hw6NE63EcfqWTnaxcM/7s7ZWj9qHWnoYD7O4VlvMFroTll8e5Wqiva89rpXln4wYAVvacbw1OQL7Qf5c0QNU7HDW1rZT+0VLD0M7QfExUbyJnqPjUXCyxF7YoJUu1hu2Tfu42L+gF11I27jYetj9bnKxOXSIa+s4+Ug/wbac5wAdSyeg4DYUWuIadClrd4Qt/0GhQ4NoYnWdIs76ObJx2sLO0Te0b5TzhK26LYprgva5vwtPltAbRwNH0qN0dD5dGfRW1MtmZpxw6GE/oadgk+vRguiX/V16sjbCBjbTaflUZRgOq7W0auqxh96CvSU9i2FbOFB6subBBm6OExWhO2z7LY0TETp3dbDHL6XO9Crt4GKlJ2sXbKAuUJYyZ1a97RRoR8/QtS6myVMN5tH5p+PET9QaOhi/JqaeDZdH92ElhH/rVAU9yN1RTEX1DtfWD30GK3c8p2m3KBaYD5ukQitL314apJqmauic0b2p3pN36SvYp0z4kdpit2F1lsqda7Dq/APsDK6FShJd25dMNZkOu7j+kQbp00dtFWtV4Tp+3y7BGVkfffbEueCFrI9nIOzT7jOsj2qxy7S/75RIJBKJRCKRSFSGH2mfuxW/76fhAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAbCAYAAABIpm7EAAAAqUlEQVR4XmNgGAVDGuQB8XUgXg3EAkBcDsQrgfgUEE8HYn6EUgYGDSCeAMQqQPwfiK8AsRVUThIqlgHlg0ETEJsBcTBUMhpJThQqhqIBBiYC8WcgZkUSi2eAaADZjgFI1nAOiDeiiW0H4sNoYmAgzgAxKRtJTAEqlgbEzEC8BEmOIRIqiWx1OFRMFoiTGCAa4aAEiDchCwABLwMkXnYCcSEQM6FKj4IhBQBL2CBY4xJo5AAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAaCAYAAAC6nQw6AAAA5ElEQVR4Xu2RvQ4BQRRGL4maiEaiQyJRCgWvIFEo0VCJB6BS06io/VWiEXQ6Cg9AQ6LXKxV8s3N3c3fiARRzkpPsntm5+0dksfwhHXiAaxiBXbiCV7iHIViGS3ji67LOTkEOTmESfkhvLvJanNsZtmGA+w0u+NhjCEuwSnpTTay5g8aiKS70Y5DLBL5Iv4ZLg/SgvGgpbk3RfKjH3RhNvfITBkXrwzeMiebh3kV9dMkDzsW5GniHOz6fwbC3SvpDqkFp0TLc6qIluLVggfw3cejBrdEqpP9g1OgDeIQjMp7GYvkbvhiYK6Z1PF2yAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAaCAYAAAAZtWr8AAADY0lEQVR4Xu2YaahMYRzG//Z9yU7UlSWRKESSoqwJyZb4gA8KIZIlkg8kEtlSxMiSLUvZkpT9gyxlly2SJSWKQuJ55j2neefpzJ3hmnFPza9+3Xuf/9wzZ8553//7njErUiTOVIGHYSstxIAE7KphodgMR2oYE5rBW7C5FvLNBHhEw5gxGZ7U8E+oCxfDffA4PA8vwwWwkve6kIrwNRyshZhRDX6A3bWQCxPhYzjP3AUJaQRvwHPm3sBnOHwCK0geR3bCAxpmYzV8AztoIaA//AWXSb4bbpQsrkyBP8wtdDkx1dxFGagFD460n/C65I/gTMniSjtz16GHFqLgCPsCr2pBqGXuoO+9rF6QjfCykH7mLjKP2xkOMrdduRj8ZPYvaAm3wTtwLGwDD8LT8CEcBRvC9fAQvALnJ/8zGo64cRpGwWnGDz9NC0Jfc6+75GVdgow1Hw51rrL8+Qy+NDcqwz7ID7k3+L2sHIVtzfWnT3ADrBHUuEV6BU+Z23IQ9nGec/vgb+UdnK6hwlXyrbkDtZaassrc6/x+xiHNTEcPV9g5sLG5+tb0cnLPlO3C9TR3UTiKMlEbngl+vwlvw+qpcvLCcTb5n228lX7hOEqXaqjUNHcQWllqPrxbPIHvln6RwhHHn1GMNlfv7WUlQcZGXBpc2fm6XFa5FuZeu1By9t9jkiXMzYJM3IfLNYyC04ZvGg7vKDZZ9Inx8Yq5TtUQ9pWPln5TFsGvsL6XRcHtEDfW7KPZmGTuPPymzl7HzF+46sDPcK2XKdxZzNUwihXm3mCoFgI436OmGwkXjGFaCODU2e/9zR73wNwWhmyBDVLlvyZh7gP7e08+CfDcuFJq1gt2g0u8Wgh3DmM0jILT9Sm8Z6kGSqrClfCbuTuQaYP7HM7W0FLTx5+SPD4zNmiu5gmvVhb45LJLMt4cTlUf3nyeL+FTkfa5EnPn11HyjDSF6+AFcwfkm7K3cNnO9uC7A+7REPSBd2ETyXkz+Ai3xrJP11zgVObTDjfoPtfgLMn4DchZc31viNQItyFsLf7IzRsc/tzb5bzbLsew93ElLgj8UoBbmtK2DXGAC9gL2EnyvDIDntAwZrAXb9cw37An8ElhgBZiAns8HwW5UBYc7gP5LMjVNG5wy/TfvjovUqRIkfLEbztyqYd7Ci4GAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAaCAYAAADrCT9ZAAACx0lEQVR4Xu2XSchNYRzG/8ZIho3IEGUIGYrExlhKmQsLJMPGPEQyJGJhRTIUFjaU5IuIJCFlgwWFDOGzQLIwbcS34Hn6n5v3Pt0z3O+eWxf3V7++7/6f877n3Pec877vNavz/9EGNsDeGtQwW+AiLWblKJytxRqnJbwFJ2mQxgJ4Xot/Cf3ge9hRgzg4Su/gVA0C+Kh/hL8iX8O5UbY4qH+Hd+GoKEtjPLxuf/r+Ce/AtuFB4LF53gTvwwnFsV2Cm6UWy0z4ErbQQGgFn5qfmKNagAPGL7nHyhhlYaF5v1c0iOCr9hD21yBimflN04EqySl4WIsxbDS/sANBbR9cGXxuDu3hZ/M73FWywfBGiXoIB4LXNVmDUjyHa7QYQxf4FX6L/t8L1xYd0XyOm190OHjdzB/57kEtjka4SYtKZ/OTzNIggSPmbfgu7ZSsEsaZ93s7+twOXoZ9CwekcM382hIZYX4STh5ZGW7e5pP5e50nz8z7Hgovmp8rK2fhGS0qo81PMEyDBLjYfzFvN02yStll3u9bOLE4SuWE+eOfSOEO828W+GX5rnFJYjuOap7MMe+XM365HIM3tahwG5n1kd4K95svX63hG/gD9gmOqZSD5tczVoMM8HG+oEWlg/kJpmsgbIe7pbbDvC23pEkMgjO0GMMj8+WJa3u5XIWHtFiKRrheixH8QcHH654G5ksF7zB3Vz0kC+GGgAMzUgOhl/lxqXcphhdwhRZLcRKeltoA8y0e11teBLd04VrNJeRVlFGu5ZwwuIFQuMxwQ7FKgwhuFtj2gXlf3Gby85jwoBQ4+Gybqc1S85PwblaLeXC5FnOE+4gnWoyjE/wA52uQI5zsBmoxR/iEbtBiEqvNdzXVoKdVr2/C14+THXdmmeGsyN/DUzTIgXXmE1I14HVzdh6iQRY44Zyz5Bm31tgGl2ixTp06/x6/AaP+jCbTNCykAAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,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>

[image9]: <data:image/png;base64,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>