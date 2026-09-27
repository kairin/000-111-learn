# **Comparative Strategic Analysis of Assembly and Fortran for 1980s–1990s Constrained Game Development: Low-Level Optimization, Simulation Architecture, and Modern Player Experience**

Developing a video game under the strict architectural constraints of 1980s and 1990s hardware—such as sub-megabyte memory limits, tight clock cycle budgets, and direct memory-mapped framebuffers—requires maximizing computational efficiency1. When allocated a finite three-month learning window for the remainder of the year, choosing between Assembly and Fortran requires evaluating whether the target game design relies on direct hardware control and real-time rasterization or on complex numerical simulations and procedural logic1. Furthermore, bridging the gap between retro constraints and the expectations of modern players—who demand responsive inputs, consistent frame pacing, deterministic physics, and systemic depth—demands deep mechanical optimization2.

## **The Retro-Engineering Paradigm: 1980s–1990s Hardware Ceilings**

Creating software within the technological envelope of the 1980s and 1990s requires working directly with physical hardware constraints:

* **Memory Architecture:** Systems of this era operated with severe memory ceilings, ranging from 64 KB (Commodore 64, NES) to 640 KB conventional DOS memory on 16-bit x86 architectures, and up to a few megabytes on early 32-bit DOS protected-mode machines1. Dynamic allocation was expensive or unavailable; memory layouts had to be statically planned and byte-aligned2.  
* **Processor Budgets:** Clock rates ranged from 1 MHz to 33 MHz (MOS 6502, Zilog Z80, Motorola 68000, Intel 8086/80386/80486)1. Floating-point hardware units (FPUs like the 8087 or 80387\) were rare consumer upgrades, necessitating software-emulated floating point or custom fixed-point arithmetic10.  
* **Video Hardware & Display Pipelines:** Video modes lacked hardware acceleration1. PC games relied on CGA, EGA, or VGA Mode 13h (![][image1] pixels, 256 colors), where the display buffer was accessed as a contiguous flat memory block at physical segment address 0xA000:00001. Advanced techniques used VGA "Mode X" (planar unchained mode) to enable page flipping and hardware scrolling1.  
* **Audio and Input Interfaces:** Sound required direct register manipulation of programmable sound generators, such as the MOS SID chip, Yamaha OPL2/OPL3 (AdLib, Sound Blaster FM synthesis), or custom interrupt-driven PC speaker PWM routines1.

                 Abstraction Spectrum in 1980s–1990s Game Development

  Physical Registers / Memory          Intermediate System Layer          Mathematical Domain Layer  
  \===========================          \=========================          \=========================  
  \[ASSEMBLY\]                           \[C / PASCAL / FORTH\]               \[FORTRAN\]  
  \- Direct VGA Buffer Writes           \- Structured Control Flow          \- Matrix Math & Vectors  
  \- Cycle-Exact Raster Loops           \- Standard OS System Calls         \- Deterministic Simulations  
  \- Programmable Interrupt Timers      \- Algorithmic Orchestration        \- Non-Aliasing Loop Execution  
  \- Bit-Level Packing & Shift Blits    \- Modular Data Structures          \- Procedural Universe Algorithms

## **90-Day Execution Timelines and Attainable Milestones**

The three-month acquisition trajectory differs markedly depending on whether the developer chooses Assembly (such as 16-bit x86 DOS or MOS 6502/68000) or Fortran (such as FORTRAN 77 under DOS or Modern Fortran compiled with retro toolchains)1.

| Week Interval | Assembly Pathway (x86 Real Mode / DOS Mode 13h) | Fortran Pathway (FORTRAN 77 / Modern Fortran) |
| :---- | :---- | :---- |
| **Weeks 1–4** | CPU registers, binary logic, stack management; setting up BIOS interrupts (INT 10h for Mode 13h); plotting pixels directly to 0xA000:00008. | Variable typing; DO loop logic; multidimensional arrays; array indexing; basic ASCII graphics and game state structures6. |
| **Weeks 5–8** | Fast memory copy (REP MOVSW/MOVSD); fixed-point trigonometry math; double-buffering in conventional RAM; keyboard IRQ (INT 09h) handling1. | Matrix transformations; celestial mechanics; cellular automata loops; procedural map generation; file save/load routines3. |
| **Weeks 9–12** | Tile blitting routines; vertical blank synchronization (V-Sync on port 0x3DA); custom fixed-point raycasting or 2D sprite engine1. | Complex deterministic economy/simulation engine; integration with low-level drawing wrappers or ANSI text terminal rendering12. |
| **Attainable Milestone** | A fully functional, smooth 60/70 FPS 2D action game, tile scroller, or pseudo-3D raycaster written bare-metal1. | A deep, complex simulation game (e.g., hard-sci-fi flight dynamics, tactical wargame, or procedural roguelike)11. |

### **Assembly: Direct Hardware Authorship**

In 1980s and early 1990s game production, commercial titles were authored almost exclusively in assembly1. Because compilers of that era generated suboptimal machine code, squeezing 30 to 60 frames per second out of a 4.77 MHz to 25 MHz CPU required manual instruction scheduling and cycle counting1.  
Within a dedicated three-month timeline focusing on x86 DOS development, a programmer can master:

* Direct segment:offset addressing, manipulating the 64 KB memory bank allocated to the VGA framebuffer1.  
* Fixed-point 16.16 or 8.8 mathematics using integer registers (AX, BX, CX, DX), eliminating the severe latency of software floating-point emulation8.  
* Hardware vertical retrace synchronization via polling input status register 1 (port 0x3DA), completely eliminating visual tearing1.  
* Efficient blitting loops utilizing string manipulation instructions (LODSB, STOSB, MOVSW), unrolled manually to maximize memory throughput1.

### **Fortran: The Engine of Pure Mathematical Simulation**

While Fortran was rarely used for commercial arcade or action games, it played an important role in early computer gaming history on mainframes and minicomputers (e.g., Don Woods' FORTRAN IV expansion of *Colossal Cave Adventure*, tactical wargames, orbital space simulators, and economic strategy engines)6.  
Within 90 days, a developer learning Fortran (whether standard FORTRAN 77 via compilers like OpenWatcom/MS-FORTRAN or Modern Fortran restricted to vintage paradigms) can master:

* Large multidimensional array calculations with strict anti-aliasing optimizations, allowing simulated physical environments to run fast3.  
* Complex procedural generation algorithms (e.g., planetary generation, star system modeling, fluid-like cellular terrain) expressed directly as mathematical operations3.  
* Modular separation of game logic, deterministic state machines, and numerical simulation loops6.

However, Fortran inherently lacks built-in primitives to communicate directly with hardware display buffers, palette registers, or sound cards12. A pure Fortran game must either run as an ASCII/text-mode experience, or rely on assembly subroutines and external libraries to render frames to the screen1.

## **Technical Architecture: Low-Level Optimization vs. Simulation Power**

The core engineering tradeoff between Assembly and Fortran centers on whether the bottleneck of the game is hardware throughput (drawing pixels and handling interrupts) or computational logic (processing mathematical systems).

| Evaluation Metric | Assembly Language (x86 DOS / 6502\) | Fortran (FORTRAN 77 / Modern Fortran) |
| :---- | :---- | :---- |
| **Hardware Interactivity** | Complete; raw port I/O (IN/OUT), hardware interrupts, direct VRAM manipulation1. | Zero native support; requires external C or Assembly bindings for I/O and display12. |
| **Arithmetic Paradigms** | Integer arithmetic; manual bit shifts; custom fixed-point trigonometric tables8. | Highly expressive matrix math; native floating-point; multidimensional array slicing3. |
| **Memory Footprint** | Absolute minimal overhead; executable binaries measure mere kilobytes1. | Moderate runtime library overhead; executables include formatting and I/O runtimes12. |
| **Execution Determinism** | Cycle-exact instruction control; fully predictable frame budgets1. | High numerical predictability; compiler reordering may introduce subtle timing variations22. |
| **Ideal Vintage Genre** | Fast arcade action, side-scrolling platformers, Mode 13h raycasters (*Wolfenstein* style)1. | Turn-based strategy, macroscopic wargames, flight dynamic models, deep roguelikes11. |

### **The Assembly Advantage: Conquering the 80s/90s Hardware Bottlenecks**

In retro game architecture, the primary performance bottleneck was almost always memory bandwidth and pixel plotting1. A standard ![][image1] screen in 256 colors requires writing 64,000 bytes per frame1. At 60 frames per second, the CPU must move 3.84 MB of data per second across an 8-bit or 16-bit system bus—a massive task for an Intel 8086 or 286 processor1.  
Assembly addresses this through microarchitectural techniques:

* **Register Conservation:** Critical inner loops keep pointers, sprite counters, and accumulator data inside general-purpose registers (SI, DI, CX, BX), avoiding RAM access penalties entirely8.  
* **Self-Modifying Code:** On systems without protected memory or instruction caches, developers dynamically altered immediate operands inside drawing instructions to save CPU cycles1.  
* **Dirty Rectangles & Overdraw Prevention:** Rather than redrawing the full screen, custom assembly blitters track changed bounding boxes, updating only modified memory locations1.  
* **Custom Interrupt Hooks:** Hooking into the Programmable Interval Timer (PIT 8253/8254) via interrupt INT 08h or INT 1Ch allows games to establish non-blocking music playback and fixed physics ticks independent of CPU clock speed1.

### **The Fortran Advantage: Simulation Depth and Procedural Complexity**

Where Assembly struggles is in expressing complex mathematical systems3. Authoring multi-body gravitational simulations, aerodynamic flight calculations, or complex economic trade webs in raw assembly requires thousands of lines of tedious, error-prone integer scaling and register management4.  
Fortran handles this effortlessly:

* **Native Multidimensional Processing:** Handling grid-based simulations—such as environmental heat diffusion, wind vectors, or tactical line-of-sight maps—is syntactically natural and aggressively optimized by the compiler3.  
* **Non-Aliased Optimizations:** Fortran's strict pointer rules allow the compiler to unroll matrix transformations and vector calculations without defensive memory reloading3.  
* **Numerical Expressiveness:** Translating real-world physics formulas (e.g., lift, drag, ballistic trajectories, orbital mechanics) from paper directly into code requires minimal cognitive friction3.

## **Designing for the Modern Player Under Vintage Constraints**

Modern players evaluating a retro game expect authentic 80s/90s aesthetics, but they have zero tolerance for poor gameplay mechanics2. A successful constrained game must combine retro technical limitations with modern design standards.

       Sustaining Modern Player Engagement Under Vintage Constraints

       Technical Limitation (80s/90s)        Modern Gameplay Expectation  
       \------------------------------        \---------------------------  
       No GPU Acceleration               \-\>  Rock-Solid 60/70 FPS (Zero Tearing)  
       Sub-Megabyte Memory Caps          \-\>  Emergent Procedural Depth & Replayability  
       Low Resolution (320x200)          \-\>  High Visual Readability & Clear Signaling  
       Lack of Dynamic Floating Point    \-\>  Deterministic Physics & Responsive Controls  
       Slow Disk Storage / Floppy Caps   \-\>  Instant Load Times & Seamless Transitions

### **1\. Responsiveness and Input Latency**

Modern players are accustomed to instant input response1. Games that poll the keyboard buffer via standard slow BIOS interrupts (INT 16h) introduce noticeable input lag and cannot handle simultaneous key presses (such as running and shooting diagonally)1.

* **The Assembly Solution:** Hooking hardware interrupt INT 09h directly captures low-level keyboard scan codes, maintaining a bitmask of pressed keys for zero-latency multi-key responses1.  
* **The Fortran Limitation:** A game written in pure Fortran cannot directly install an interrupt handler; it must delegate input processing to external assembly or C drivers12.

### **2\. Smooth Frame Pacing and Visual Fluidity**

Nothing breaks modern player immersion faster than sluggish, inconsistent frame rates and screen tearing1.

* In Assembly, double buffering using off-screen RAM buffers combined with polling vertical blanking registers ensures that pixel updates occur strictly during the monitor's retrace period, delivering the fluid 60 Hz or 70 Hz responsiveness expected of modern indie retro games (such as *Shovel Knight* or *Celeste*)1.

### **3\. Emergent Simulation and Procedural Depth**

Modern players love games with high replayability, deep systemic interactions, and emergent narratives (e.g., *Dwarf Fortress*, roguelikes, complex space simulations)12. Under 80s/90s constraints, games could not rely on massive asset files, pre-rendered cinematics, or large voice audio clips1.

* This is where **Fortran excels**: a developer can fit an entire galaxy of procedurally generated star systems, market dynamics, and faction diplomacy into a 200 KB executable3. By focusing on complex cellular automata and mathematical state evolution rather than high-speed pixel manipulation, Fortran delivers systemic depth that modern players find engaging12.

## **Toolchains and Environment Setup**

Developing for retro constraints today does not require working on physical 1980s hardware; developers can use modern workstations with specialized emulators and cross-compilation toolchains1.

### **Assembly Retro Toolchain**

* **Assemblers:**  
  * **NASM (Netwide Assembler):** The premier cross-platform assembler for x86 real-mode and protected-mode development1.  
  * **TASM / WASM (OpenWatcom Assembler):** Historically accurate assemblers for 16-bit DOS executables (.COM and .EXE)1.  
* **Emulation & Debugging:**  
  * **DOSBox-X / 86Box:** Highly accurate cycle-by-cycle PC hardware emulation, featuring built-in low-level debuggers to inspect registers, VGA memory, and interrupt vector tables in real time1.  
  * **Ghidra / IDA Pro:** Useful for disassembling and studying historical 1980s and 1990s commercial game binaries to reverse-engineer their optimization tricks2.

### **Fortran Retro Toolchain**

* **Compilers:**  
  * **OpenWatcom FORTRAN 77 (wfl386):** The premier open-source toolchain capable of targeting 16-bit real mode DOS as well as 32-bit DOS protected-mode (DOS4GW), linking seamlessly with C and assembly object files11.  
  * **Vintage Microsoft FORTRAN 3.x / 5.1:** Available in retro-computing archives for building period-accurate 16-bit DOS executables12.  
  * **Modern GFortran with Retro Constraints:** Developing with modern GFortran while strictly constraining memory allocations and array sizes, targeting low-resource embedded targets or minimal SDL2 framebuffers configured to emulate vintage ![][image1] resolutions11.

## **The Definitive Verdict: Which Language Should You Learn?**

With only the remaining months of the year to commit to a single discipline, the choice depends on your intended game design:

                    Decision Pathway for Retro Game Development

                                \[Your Target Retro Game\]  
                                           |  
                    \-----------------------------------------------  
                    |                                             |  
            \[Real-Time Action\]                            \[Deep Simulation\]  
            \- Arcade Platformer                           \- Orbital Flight Mechanics  
            \- 2D Shmup / Top-Down                         \- Tactical Wargame / 4X  
            \- Mode 13h Raycaster                          \- Procedural Roguelike / Econ  
                    |                                             |  
                    v                                             v  
          CHOOSE: ASSEMBLY                              CHOOSE: FORTRAN  
     (Direct Hardware Mastery,                     (Mathematical Engine,  
      Zero-Lag IRQs, Smooth 60 FPS)                 Anti-Aliased Simulation Loops)

### **Choose Assembly If:**

You want to build an **action-oriented, real-time game** (e.g., a fast 2D platformer, top-down scrolling shooter, or a 3D raycaster)1.

* **The Reason:** Under 80s and 90s constraints, smooth real-time graphics and responsive inputs require direct interaction with physical registers, interrupt vectors, and the VGA display buffer1.  
* Fortran cannot talk to this hardware natively; you would inevitably find yourself having to write assembly subroutines just to get pixels onto the screen12.  
* Learning **x86 Assembly (targeting DOS Mode 13h)** for the rest of the year gives you 100% self-sufficiency to create a complete, deeply optimized, bare-metal game that hits a locked 60/70 FPS, satisfying the responsiveness modern players demand1.

### **Choose Fortran If:**

You want to build a **deep simulation, procedural universe, or tactical wargame** (e.g., a hard-physics space orbital simulator, an economic trading sim like *M.U.L.E.*, or a procedural turn-based strategy game)11.

* **The Reason:** If the challenge of your game lies in complex mathematics, matrix transformations, and emergent system logic rather than rapid pixel blitting, Fortran will allow you to build an astonishingly deep simulation within 90 days3.  
* Its array syntax and auto-vectorizing execution model will allow you to simulate complex systems that ran circles around other high-level languages of that era3.  
* You can render the game via an authentic, stylized ASCII/ANSI terminal interface or pair it with a pre-existing graphics harness12.

### **Recommended Strategy for the Remaining Months**

If your objective is to experience true 1980s–1990s optimization and build games that feel like authentic commercial titles of that era, **Assembly is the essential foundation**1. It provides the mechanical sympathy and low-level hardware control required to bypass vintage bottlenecks and deliver the fluid, high-frame-rate performance that modern players demand1.

#### **Works cited**

> 1. How did 80-90s gamedev compile their games? \- Reddit, [https://www.reddit.com/r/gamedev/comments/18aj95l/how\_did\_8090s\_gamedev\_compile\_their\_games/](https://www.reddit.com/r/gamedev/comments/18aj95l/how_did_8090s_gamedev_compile_their_games/)  
> 2. Exploring Retro Game Programming Languages \- From Assembly to, [https://www.retroreversing.com/programming-languages](https://www.retroreversing.com/programming-languages)  
> 3. What makes Fortran more straightforward for scientific and ... \- Quora, [https://www.quora.com/What-makes-Fortran-more-straightforward-for-scientific-and-engineering-computations-compared-to-C](https://www.quora.com/What-makes-Fortran-more-straightforward-for-scientific-and-engineering-computations-compared-to-C)  
> 4. The Evolution of Programming Languages: From Assembly to High, [https://medium.com/@kodegasm.id/the-evolution-of-programming-languages-from-assembly-to-high-level-languages-8d1417631203](https://medium.com/@kodegasm.id/the-evolution-of-programming-languages-from-assembly-to-high-level-languages-8d1417631203)  
> 5. Why were old games programmed in assembly when higher level, [https://stackoverflow.com/questions/4904707/why-were-old-games-programmed-in-assembly-when-higher-level-languages-existed](https://stackoverflow.com/questions/4904707/why-were-old-games-programmed-in-assembly-when-higher-level-languages-existed)  
> 6. Fortran \- Wikipedia, [https://en.wikipedia.org/wiki/Fortran](https://en.wikipedia.org/wiki/Fortran)  
> 7. What programming languages were commonly used for games, [https://www.reddit.com/r/gamedev/comments/s65pyp/what\_programming\_languages\_were\_commonly\_used\_for/](https://www.reddit.com/r/gamedev/comments/s65pyp/what_programming_languages_were_commonly_used_for/)  
> 8. Courses Based on CS:APP \- CS:APP3e, Bryant and O'Hallaron, [https://csapp.cs.cmu.edu/3e/courses.html](https://csapp.cs.cmu.edu/3e/courses.html)  
> 9. Some people believe that RISC-V is simple and elegant, other, [https://news.ycombinator.com/item?id=42960796](https://news.ycombinator.com/item?id=42960796)  
> 10. ARM vs x86; What are the key differences? \- Stack Overflow, [https://stackoverflow.com/questions/44269853/arm-vs-x86-what-are-the-key-differences](https://stackoverflow.com/questions/44269853/arm-vs-x86-what-are-the-key-differences)  
> 11. BASIC vs. FORTRAN 77: Comparing programming blasts from the past, [https://opensource.com/article/23/4/basic-vs-fortran-77](https://opensource.com/article/23/4/basic-vs-fortran-77)  
> 12. rlauzon54/fortran77: Microsoft FORTRAN programs \- GitHub, [https://github.com/rlauzon54/fortran77](https://github.com/rlauzon54/fortran77)  
> 13. 12 Best Assembly Language Courses for 2026: ARM to RISC-V, [https://www.classcentral.com/report/best-assembly-courses/](https://www.classcentral.com/report/best-assembly-courses/)  
> 14. What Is Machine Code? The Complete 2026 Guide \- Articsledge, [https://www.articsledge.com/post/machine-code](https://www.articsledge.com/post/machine-code)  
> 15. Fortran-lang.org, [https://fortran-lang.org/](https://fortran-lang.org/)  
> 16. Ghidra vs IDA Pro: Key Features Explained | PDF \- Scribd, [https://www.scribd.com/document/882778522/session-3](https://www.scribd.com/document/882778522/session-3)  
> 17. Find Top Fortran Developers for Hire on Freelancer (September 2026), [https://www.freelancer.com/hire/fortran](https://www.freelancer.com/hire/fortran)  
> 18. A FORTRAN program development environment for MS-DOS, [https://www.mrt.tas.gov.au/mrtdoc/dominfo/download/UR1993\_07/UR1993\_07.pdf](https://www.mrt.tas.gov.au/mrtdoc/dominfo/download/UR1993_07/UR1993_07.pdf)  
> 19. Fortran in Modern Scientific Computing: An Unexpected Comeback, [https://medium.com/@stack1/fortran-in-modern-scientific-computing-an-unexpected-comeback-55be2564d22d](https://medium.com/@stack1/fortran-in-modern-scientific-computing-an-unexpected-comeback-55be2564d22d)  
> 20. Do Fortran compilers really generate faster code than C compilers?, [https://softwareengineering.stackexchange.com/questions/60372/do-fortran-compilers-really-generate-faster-code-than-c-compilers](https://softwareengineering.stackexchange.com/questions/60372/do-fortran-compilers-really-generate-faster-code-than-c-compilers)  
> 21. IBM Fortran Compiler /2 \- WinWorld, [https://winworldpc.com/product/ibm-fortran-compiler/-2](https://winworldpc.com/product/ibm-fortran-compiler/-2)  
> 22. Is Fortran code still faster than C code? \- Reddit, [https://www.reddit.com/r/fortran/comments/1cozndo/is\_fortran\_code\_still\_faster\_than\_c\_code/](https://www.reddit.com/r/fortran/comments/1cozndo/is_fortran_code_still_faster_than_c_code/)  
> 23. SIMD City: Auto-Vectorisation \- Hacker News, [https://news.ycombinator.com/item?id=46336019](https://news.ycombinator.com/item?id=46336019)  
> 24. CUDA Pro Tip: Optimize for Pointer Aliasing | NVIDIA Technical Blog, [https://developer.nvidia.com/blog/cuda-pro-tip-optimize-pointer-aliasing/](https://developer.nvidia.com/blog/cuda-pro-tip-optimize-pointer-aliasing/)  
> 25. Running Fortran on DOSBOX \- VOGONS, [https://www.vogons.org/viewtopic.php?t=45466](https://www.vogons.org/viewtopic.php?t=45466)  
> 26. 800 All Malware Reverse Engineer Salary Jobs & Work \- Indeed, [https://www.indeed.com/q-all-malware-reverse-engineer-salary-jobs.html](https://www.indeed.com/q-all-malware-reverse-engineer-salary-jobs.html)  
> 27. MS-FORTRAN : r/vintagecomputing \- Reddit, [https://www.reddit.com/r/vintagecomputing/comments/12r1kws/msfortran/](https://www.reddit.com/r/vintagecomputing/comments/12r1kws/msfortran/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAAZCAYAAABEmrJwAAAEsUlEQVR4Xu2YB6hdRRCGx94VNTZQnqKiUaNiQZSIDSMGxIYoJhqxKwRRsCAqMRFR7C0koknsBRsi2GLXBI2aqGCLkmDBgmADRUXM/73ZvXfO3nPvuy8hAeF88MPdOXvO7pndmTN7zRoaGhq6crg0X3pNekaaKK1c6WG2hjRN+lH6Wrpf2rLSw9lcult6RXpbOqN6eYXBO3wu/Sy9KI2uXh5kVWmy9LL0nnS9tFalh3OS9Kw0R3pUGqhe7s7u0pvSBql9sPSfdFurh/NQsm0mHS39Ki2S1g99RkgfSuem9lbSQmlS7rCCYPyXpO2lvczn9K+0b+xk/k5sEpy8pvS0uaMjPGuBtGlqXyF9H9o9ud3cmSek9krS79If0rrJdpD5ruZahkG577pgu8H8RSJnSz9JqxX25cV60mJpk2AbZT7Xd4LtyGSLTtop2fZJbTbSn9JxrR4e0UTuhcHWlSnmq3pMauPAv8wHyc69WPpbOj+1gZRAH3ZvZrH0SGhDjoT9C/vygt3JeOU8Pk52djPcI/3QvjwIOxhfXJrap5nfs2urhzNbeq6wdYXwzZAmeCAPyFyQbDODbcNkIwcDuZb29FYPZ89kv6ywl+wojSyNAXbifqWxBtIA431Z2Ocl+26pTYR90r7cghz9Qvqdozr6B54wj25SSd+Qd8k7TCSGFSE9war59QDzgXOOyi/FhCI5JOPC1MF4vNRAeUFsJL1r/qx+IOS3De3VzdMcIZ6j8RfrTGFAPs0L86T53Nk4kYeTPY7Rk0ukD8wncWD1Ui1UDgxwWGpnZ5fOzXmMD8dQbGO+WPnjCquYVzCkl6VlnPkcrg422nXO/Vb6Jv1mseuc+0Cy94q0WvJETi0vBAhhctPlwZZzXelcJoCdHNcPhD6lEw7GsfdJJ1Z6DA9C9zPzHMnzMmyiOufi2EXpN4ta51w2Cvacv4cFaYEQwokla5vv8JmFfQfzAe8o7Lsk+02FvRfUpDj4XumU6qVhQ4RRw1JFRL6SPips8J15f2BhmfsW7cuDUMJh37iwd8BXv7x5hnWGEVBJPGh+SIi7AKhxuYdrkb2TPe7yoeCr/bz0vnm+XVrOsc7vR4ZnU4OXUL+zsHCz+dxJV5Gnkr08aFVgu/9jvktxToYQ5uYbgw0mmT84PjTuSE5Ej4c2cPrjWWMLezdw7GPS6eb15qtWzcH9Mkb61KqOPc/ajrrLvDKIEJXM9ZrUnpDae7R6OBy63ipsHWxtfjODxGL69WTnq5s51rwIXyfY+ApzuMhcZZ7f4mGDYptQ6+cQQTTwsbg22MjlfFiG4+DtzHdl+cEhGnLFc6j5Ow60Lw8uZnQm5eZv0smtHv7OHIpYqCGh2GYV2TFwpvkAcYfubB4u5CJChrKInMVhg7yU4ePBih6V2pzT2c3jWz16Q46datXFgUPMFzwubDfYffPNyynmOlf6wtxJuQrI8F9CjE7epazTeRf+U8hpkP9KeH5fNS5/yNxiflphZ75h7uCYUzni4vA6XRn6ATmSsm6WdKf5/xD9cLz5PErHZligcqw6jrDOOWaV/xuwec4yr3DYYBclWwkpBh/g/Ftt2b4DDQ0NDQ0NDQ0NDf9blgD1ARBXT6ZLpwAAAABJRU5ErkJggg==>