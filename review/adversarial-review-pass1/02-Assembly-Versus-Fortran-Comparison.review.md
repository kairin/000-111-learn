---
target: ../segments/Assembly-Versus-Fortran-Comparison.md
segments: ../segments/assembly-versus-fortran-comparison/
pass: 1 (adversarial, desk review — sources not yet fetched)
date: 2026-09-27
---

# Adversarial review — "Assembly and Fortran for 1980s–1990s Constrained Game Development"

The tags are the same as in review 01: **[DOC]** internal, **[KNOW]** reviewer knowledge, **[VERIFY]** must be checked.

## 1. Goals and objectives (as stated or implied)

1. Choose between Assembly and Fortran for building a game **under 1980s–1990s hardware constraints**, within 90 days.
2. Map the choice to game type: real-time action → Assembly; deep simulation → Fortran.
3. Show how to satisfy **modern player expectations** (latency, frame pacing, depth) under those constraints.
4. Give a toolchain for doing this on a modern workstation.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Language choice | **No** | The Fortran branch rests on features that **don't exist on the target era's hardware or dialect** (C1, C2). The final "Recommended Strategy" then overrides the document's own decision tree and says Assembly regardless (M6). |
| 2. Genre mapping | **No** | History contradicts it. The landmark retro simulation and procedural games were written in **assembly** (C3). |
| 3. Modern player UX | **Partly** | The input-latency section is sound. The frame-pacing promises are technically wrong for Mode 13h (C4). Distribution (how players actually run a DOS game today) is missing. |
| 4. Toolchain | **Partly** | The Assembly tools are right. The Fortran path exists (OpenWatcom F77) but is described with errors. |

**Overall confidence in the document:** Low. This is the weaker of the two reports: the conclusion survives, but mostly despite the argument rather than because of it.

## 3. Findings (ranked by severity)

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L50, L84, L173 | Fortran wins through "anti-aliasing optimizations", "array syntax" and an "auto-vectorizing execution model" | **FORTRAN 77 has no array syntax.** Whole-array expressions and slicing arrived in Fortran 90. **8086–486 CPUs have no SIMD**, so there is nothing to auto-vectorize (MMX came in 1997; x87 is scalar). The document's main Fortran advantages don't exist on its own target. | [KNOW] |
| C2 | L10 vs L63 | FPUs "were rare"… yet Fortran offers "native floating-point" | Internal contradiction. Without an FPU, Fortran `REAL` arithmetic runs on **software emulation**, the very latency the document praises Assembly for avoiding (L41). A float-heavy Fortran simulation on a 1980s machine would be *slow*. | [DOC] |
| C3 | L114–118, L170, Sim branch of L144–158 | Deep simulation / procedural universes → Fortran | History contradicts this. **Elite** (1984, procedural galaxies in ~22 KB), **Frontier: Elite II** (1993, Newtonian orbital flight, procedural galaxy) and **M.U.L.E.** (the document's own example, L170) were written in **assembly**. The claim "Fortran can fit a galaxy in 200 KB" (L118) is weaker than what assembly actually did in 1984. | [KNOW], [VERIFY] exact language per title |
| C4 | L33, L42, L112, L166 | "Locked 60/70 FPS", V-Sync "completely eliminating tearing" in Mode 13h | (a) Mode 13h runs at **70 Hz**, so a vsync-locked game gets 70 or 35 fps, not a locked 60. (b) Mode 13h has **one page**, so there is no page flipping. Copying 64,000 bytes during the ~1–1.5 ms vertical blank is not possible over ISA, so tearing is *reduced*, not eliminated. Tear-free flipping needs Mode X (which L11 mentions but the roadmap never uses). (c) The document's own figure (L70), 3.84 MB/s, exceeds what many 8/16-bit ISA VGA cards could sustain. | [KNOW] + [DOC] arithmetic |
| C5 | L33 | 90-day milestone: "fully functional, smooth 60/70 FPS … raycaster written bare-metal" | This is unrealistic for someone learning assembly from scratch. Commercial teams using C plus assembly shipped raycasters that ran well below 60 fps on period hardware. There is no evidence for the timeline. | [KNOW] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L37 | Early-1990s commercial titles authored "almost exclusively in assembly" | True for 8-bit systems in the 1980s. **False for early-1990s PC**, where C with assembly inner loops was the norm (id Software titles, for example). Source: a Reddit thread [1]. | [KNOW] |
| M2 | L9 | "64 KB (Commodore 64, NES)" | The NES has **2 KB** of work RAM (plus cartridge ROM/RAM). Only the C64 figure is right. | [KNOW] |
| M3 | L10, L37 | Era clock range "1–33 MHz", and 30–60 fps from a "4.77 MHz" CPU | The document claims "1990s" but stops at 33 MHz (486DX2-66 in 1992; Pentiums by the mid-1990s). VGA Mode 13h games at 60 fps on a 4.77 MHz 8088 is not credible. The scope is inconsistent. | [KNOW] |
| M4 | L41, L30–31 | 16.16 fixed point "using AX, BX, CX, DX" | These are **16-bit** registers. 16.16 math needs 32-bit registers (EAX…, 386+) or register pairs on 8086. `REP MOVSD` (L31) is also 386+. The document mixes 8086 and 386 targets without saying so. | [KNOW] |
| M5 | L54, L62, L106, L165 | Fortran has "zero native support" for display and input; a "pure Fortran game must be ASCII" | Overstated. Period vendor compilers shipped **graphics libraries callable from Fortran** (Microsoft FORTRAN 5.x's graphics library, for example). Calling a vendor or assembly library is normal practice, and the Assembly path relies on BIOS calls too. | [VERIFY] MS FORTRAN 5.x graphics library |
| M6 | L176–178 vs L144–174 | "Recommended Strategy": Assembly is "the essential foundation" | This contradicts the document's own decision tree (sim → Fortran). The final section silently turns a conditional recommendation into an unconditional one. | [DOC] |
| M7 | L65 | Assembly gives "cycle-exact … fully predictable frame budgets" | On real PCs, DRAM refresh, ISA wait states, the 8088 prefetch queue and 486 caches make exact cycle counting impractical. It is true on C64 and NES, not on the DOS target the roadmap uses. | [KNOW] |
| M8 | L130 | DOSBox-X / 86Box "highly accurate cycle-by-cycle emulation" | 86Box aims for cycle accuracy; **DOSBox-X does not** (it uses approximate "cycles"). This matters because performance tuning in DOSBox-X won't match real hardware. | [KNOW] |
| M9 | L138 | "Modern GFortran with retro constraints … SDL2 framebuffer" | This defines away the premise: a modern OS with SDL2 is not 80s/90s hardware. If this path is allowed, the whole comparison changes (C or C++ plus SDL is the obvious rival). | [DOC] |
| M10 | whole doc | Modern players | **Distribution is missing.** Modern players will run the game in DOSBox or in a browser build. Emulator input and frame latency and host-display refresh (60 Hz, not 70 Hz) undercut the "zero-latency, locked 70 fps" promises. | [KNOW] |

### Minor

| # | Location | Issue | Tag |
|---|---|---|---|
| m1 | L112 | *Shovel Knight* / *Celeste* cited as 60 Hz references: these are modern-engine games, so they don't show anything about vintage techniques. | [DOC] |
| m2 | L136 | `wfl386` is OpenWatcom's 32-bit driver; 16-bit real mode uses `wfl`. | [KNOW] |
| m3 | L128 | "TASM / WASM (OpenWatcom Assembler)": TASM is Borland's, not OpenWatcom's. The line is ambiguous. | [KNOW] |
| m4 | L26 | "Modern Fortran compiled with retro toolchains": the document names no DOS toolchain that supports modern Fortran. A DJGPP gfortran port may exist, but the document never mentions one. | [VERIFY] |
| m5 | L11, L70 | `![][image1]` stands for "320×200" as an image, which breaks when you copy the text or view it without images. | [DOC] |

## 4. Source-quality audit

- 27 sources are listed; only about **10 are cited**. **42 of about 81 in-text citations point to one Reddit thread [1]** ("How did 80-90s gamedev compile their games?"). Quora [3] is cited 11 times, including for Fortran game-dev claims.
- Sources 13–17 and 26 (assembly course listicle, "machine code 2026 guide", fortran-lang homepage, Ghidra slides, **Freelancer hire page**, **Indeed malware-RE salaries**) have nothing to do with retro game dev. **The bibliography appears to have been copied from the first report.**
- The primary or relevant sources that *are* listed go uncited: the VOGONS "Fortran on DOSBox" thread [25], the MS-FORTRAN retro thread [27], and the 1993 Tasmanian government paper on a FORTRAN development environment for MS-DOS [18].
- Missing primary sources: Michael Abrash's *Graphics Programming Black Book*, Fabien Sanglard's *Game Engine Black Book: Wolfenstein 3D*, and period compiler manuals.

## 5. Omissions a skeptic would raise

1. **C**, the actual dominant language of early-1990s PC games, and C plus assembly hybrids. Leaving it out makes this a false dichotomy.
2. **Which platform?** The document swings between the C64, NES, 8086, 386 and SDL2. Pick one; the answer depends on it.
3. **No Fortran game was ever made the way the document describes on DOS.** Where is an existing example?
4. **Sound.** OPL2/OPL3 and Sound Blaster programming is mentioned (L12) but appears in neither roadmap.
5. **The fun factor.** "Modern players" want game design, not language choice. A 90-day, one-person game's quality depends on scope, not ISA.

## 6. Pass-2 verification list

- [ ] Confirm the implementation language of Elite, Frontier: Elite II, M.U.L.E., and early Microsoft Flight Simulator (C3).
- [ ] Confirm the Microsoft FORTRAN 5.x graphics library and the OpenWatcom F77 graph library (M5).
- [ ] Get typical ISA VGA write bandwidth figures, and the Mode 13h refresh rate and vblank duration (C4).
- [ ] Check whether a DJGPP gfortran port exists (m4).
