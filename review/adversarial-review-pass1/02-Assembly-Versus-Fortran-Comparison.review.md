---
target: ../segments/Assembly-Versus-Fortran-Comparison.md
segments: ../segments/assembly-versus-fortran-comparison/
pass: 1 (adversarial, desk review — sources not yet fetched)
date: 2026-09-27
---

# Adversarial review: "Assembly and Fortran for 1980s–1990s Constrained Game Development"

This review uses the same tags as review 01. **[DOC]** means an internal problem in the document. **[KNOW]** means reviewer knowledge. **[VERIFY]** means a claim that we must examine.

## 1. Goals and objectives (as stated or implied)

1. Choose between Assembly and Fortran to make a game **with the hardware limits of the 1980s and 1990s**, in 90 days.
2. Connect the choice to the game type. Real-time action goes to Assembly. Deep simulation goes to Fortran.
3. Show how to meet **the expectations of modern players** (latency, frame pacing, depth) with those limits.
4. Give a toolchain (the set of build tools) to do this work on a modern computer.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Language choice | **No** | The Fortran branch depends on features that **do not exist in the hardware or language version of the target era** (C1, C2). Then the final "Recommended Strategy" ignores the decision tree of the document. It selects Assembly in all cases (M6). |
| 2. Genre mapping | **No** | History does not agree. The developers wrote the famous retro simulation and procedural games in **assembly** (C3). |
| 3. Modern player UX | **Partly** | The section about input latency is correct. The promises about frame pacing are technically wrong for Mode 13h (C4). The document does not say how players run a DOS game today (distribution). |
| 4. Toolchain | **Partly** | The Assembly tools are correct. A Fortran path exists (OpenWatcom F77), but the description of it has errors. |

**Overall confidence in the document:** Low. This report is weaker than the first report. The conclusion is possibly correct, but the argument does not support it well.

## 3. Findings (ranked by severity)

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L50, L84, L173 | The document says that Fortran wins because of "anti-aliasing optimizations", "array syntax" and an "auto-vectorizing execution model". | **FORTRAN 77 has no array syntax.** Whole-array expressions and slices came in Fortran 90. **8086 to 486 CPUs have no SIMD**, thus the compiler has nothing to auto-vectorize. MMX came in 1997, and x87 is scalar. The primary Fortran advantages in the document do not exist on its own target. | [KNOW] |
| C2 | L10 vs L63 | The document says that FPUs "were rare". But it also says that Fortran gives "native floating-point". | The document contradicts itself. Without an FPU, Fortran `REAL` arithmetic runs on **software emulation**. The document praises Assembly because it prevents this latency (L41). A Fortran simulation with much float math on a 1980s computer is *slow*. | [DOC] |
| C3 | L114–118, L170, Sim branch of L144–158 | Deep simulation and procedural universes go to Fortran. | History does not agree. The developers wrote **Elite** (1984, procedural galaxies in ~22 KB), **Frontier: Elite II** (1993, Newtonian orbital flight, procedural galaxy) and **M.U.L.E.** (the example in the document, L170) in **assembly**. The claim "Fortran can fit a galaxy in 200 KB" (L118) is weaker than the result that assembly got in 1984. | [KNOW], [VERIFY] exact language per title |
| C4 | L33, L42, L112, L166 | The document promises "Locked 60/70 FPS" and V-Sync "completely eliminating tearing" in Mode 13h. | (a) Mode 13h runs at **70 Hz**. Thus a game locked to vsync gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, thus page flipping is not possible. A copy of 64,000 bytes in the ~1 to 1.5 ms vertical blank is not possible over ISA. As a result, tearing becomes *less*, but it does not stop. Flipping without tears needs Mode X (L11 mentions it, but the roadmap does not use it). (c) The figure in the document (L70), 3.84 MB/s, is more than many 8/16-bit ISA VGA cards can supply. | [KNOW] + [DOC] arithmetic |
| C5 | L33 | The 90-day milestone is a "fully functional, smooth 60/70 FPS … raycaster written bare-metal". | This is not realistic for a person who learns assembly from zero. Commercial teams with C plus assembly shipped raycasters that ran much slower than 60 fps on the hardware of that time. No evidence supports the timeline. | [KNOW] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L37 | The document says that developers wrote commercial titles of the early 1990s "almost exclusively in assembly". | This is true for 8-bit systems in the 1980s. It is **false for the PC in the early 1990s**. At that time, C with assembly inner loops was the norm (for example, id Software titles). The source is a Reddit thread [1]. | [KNOW] |
| M2 | L9 | The document gives "64 KB (Commodore 64, NES)". | The NES has **2 KB** of work RAM (plus cartridge ROM/RAM). Only the C64 figure is correct. | [KNOW] |
| M3 | L10, L37 | The clock range of the era is "1–33 MHz", and a "4.77 MHz" CPU gives 30 to 60 fps. | The document claims the "1990s", but it stops at 33 MHz. The 486DX2-66 came in 1992, and Pentiums came by the mid-1990s. VGA Mode 13h games at 60 fps on a 4.77 MHz 8088 are not credible. The scope is not consistent. | [KNOW] |
| M4 | L41, L30–31 | The document does 16.16 fixed point "using AX, BX, CX, DX". | These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX and the others, 386 and later) or register pairs on the 8086. `REP MOVSD` (L31) also needs a 386 or later. The document mixes 8086 and 386 targets and does not say so. | [KNOW] |
| M5 | L54, L62, L106, L165 | The document says that Fortran has "zero native support" for display and input, and that a "pure Fortran game must be ASCII". | This is too strong. Compilers from vendors of that time shipped **graphics libraries that Fortran can call**. An example is the graphics library of Microsoft FORTRAN 5.x. A call to a vendor or assembly library was normal practice. The Assembly path also depends on BIOS calls. | [VERIFY] MS FORTRAN 5.x graphics library |
| M6 | L176–178 vs L144–174 | The "Recommended Strategy" says that Assembly is "the essential foundation". | This contradicts the decision tree of the document (sim goes to Fortran). The final section changes a conditional recommendation into an unconditional one and does not say so. | [DOC] |
| M7 | L65 | The document says that Assembly gives "cycle-exact … fully predictable frame budgets". | On real PCs, DRAM refresh, ISA wait states, the 8088 prefetch queue and 486 caches make exact cycle counts not practical. The claim is true on the C64 and NES. It is not true on the DOS target that the roadmap uses. | [KNOW] |
| M8 | L130 | The document says that DOSBox-X and 86Box give "highly accurate cycle-by-cycle emulation". | 86Box tries to be cycle-accurate. **DOSBox-X does not** (it uses approximate "cycles"). This is important because performance tuning in DOSBox-X will not match real hardware. | [KNOW] |
| M9 | L138 | The document gives a path with "Modern GFortran with retro constraints … SDL2 framebuffer". | This path removes the premise. A modern operating system with SDL2 is not 80s/90s hardware. If the document permits this path, the full comparison changes. Then C or C++ plus SDL is the clear rival. | [DOC] |
| M10 | whole doc | The document makes promises to modern players. | **The document does not discuss distribution.** Modern players will run the game in DOSBox or in a browser build. Emulator input latency, frame latency and host-display refresh (60 Hz, not 70 Hz) weaken the "zero-latency, locked 70 fps" promises. | [KNOW] |

### Minor

| # | Location | Issue | Tag |
|---|---|---|---|
| m1 | L112 | The document uses *Shovel Knight* and *Celeste* as 60 Hz references. These are modern-engine games, thus they do not show anything about vintage techniques. | [DOC] |
| m2 | L136 | `wfl386` is the 32-bit driver of OpenWatcom. For 16-bit real mode, use `wfl`. | [KNOW] |
| m3 | L128 | The line says "TASM / WASM (OpenWatcom Assembler)". TASM comes from Borland, not OpenWatcom. The line is not clear. | [KNOW] |
| m4 | L26 | The document says "Modern Fortran compiled with retro toolchains". But it names no DOS toolchain that supports modern Fortran. A DJGPP gfortran port can possibly exist, but the document does not mention one. | [VERIFY] |
| m5 | L11, L70 | `![][image1]` shows "320×200" as an image. The text is lost when you copy it or show it without images. | [DOC] |

## 4. Source-quality audit

- The document lists 27 sources, but it cites only about **10**. **42 of about 81 in-text citations point to one Reddit thread [1]** ("How did 80-90s gamedev compile their games?"). The document cites Quora [3] 11 times, also for claims about Fortran game development.
- Sources 13 to 17 and 26 have no relation to retro game development. They are an assembly course listicle, a "machine code 2026 guide", the fortran-lang homepage, Ghidra slides, a **Freelancer hire page** and **Indeed malware-RE salaries**. **The bibliography possibly came as a copy from the first report.**
- The document does not cite the primary or related sources that it lists. These are the VOGONS "Fortran on DOSBox" thread [25] and the MS-FORTRAN retro thread [27]. Another is the 1993 Tasmanian government paper about a FORTRAN development environment for MS-DOS [18].
- These primary sources are missing: *Graphics Programming Black Book* by Michael Abrash, *Game Engine Black Book: Wolfenstein 3D* by Fabien Sanglard, and compiler manuals of that time.

## 5. Omissions a skeptic would raise

1. **C** was the real dominant language of PC games in the early 1990s, often in C plus assembly hybrids. Without C, the comparison is a false choice between two options.
2. **Which platform?** The document moves between the C64, NES, 8086, 386 and SDL2. Select one platform, because the answer depends on it.
3. **Nobody made a Fortran game on DOS in the way that the document describes.** Where is an existing example?
4. **Sound.** The document mentions OPL2/OPL3 and Sound Blaster programming (L12), but the two roadmaps do not include it.
5. **The fun factor.** "Modern players" want good game design, not a language choice. The quality of a 90-day game from one person depends on scope, not on the ISA.

## 6. Pass-2 verification list

- [ ] Make sure of the implementation language of Elite, Frontier: Elite II, M.U.L.E., and early Microsoft Flight Simulator (C3).
- [ ] Make sure that the Microsoft FORTRAN 5.x graphics library and the OpenWatcom F77 graph library exist (M5).
- [ ] Get typical ISA VGA write bandwidth figures, and the Mode 13h refresh rate and vblank duration (C4).
- [ ] Find out if a DJGPP gfortran port exists (m4).
