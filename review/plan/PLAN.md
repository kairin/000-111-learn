# Plan: learn both Assembly and Fortran by building a constrained game that runs on GitHub Pages

**Last updated:** 2026-09-27 · **Decisions:** [DECISIONS.md](DECISIONS.md) · **Session record:** [sessions/2026-09-27.md](sessions/2026-09-27.md)

## Goal

Learn **both** Assembly and Fortran in the roughly 90 days left in 2026 (October to December). The reason is usefulness and fun, not money. The learning is driven by one project: **a small game built under deliberately tight, retro-style limits, playable in the browser on this repository's GitHub Pages site.**

The four Gemini guides reviewed here set the starting point. Their pass-1 findings (e.g. about Mode 13h frame rates, FORTRAN 77 limits, and which retro games were written in assembly) become design input and pitfalls to avoid, not instructions to follow.

- Repository: https://github.com/kairin/000-111-learn
- Live site: https://kairin.github.io/000-111-learn/

## Phases

| Phase | What | Status |
|---|---|---|
| 0 | Segment the 4 documents, adversarial review pass 1, tracker site, public repo | **Done** |
| 1 | Decide the learning goal | **Done:** learn both through a browser-playable constrained game (D11) |
| 2 | Review pass 2: check sources, challenge untested segments | Not started (not blocking) |
| 3 | Site on Astro + Starlight, built and deployed by GitHub Actions | **Done** (D10, D12) |
| 4 | **Toolchain spike:** prove the chosen architecture builds in Actions and runs on Pages | Next; needs **O7** |
| 5 | Game design: concept and constraint spec | Needs **O8** |
| 6 | The 12-week build and learning track (October to December 2026) | After phases 4 and 5 |

## Phase 3: done

The site is Astro + Starlight in `site/`, reading `review/` directly. GitHub Actions builds and deploys it on every push to `main`. It has:
- a dashboard with a segment heatmap,
- a findings explorer (status edits via "Edit on GitHub"),
- every review page, with full-text search and themes.

Game pages and playable builds will be added to this site in phases 4 to 6.

## How code in either language can run on a static page

A static page runs compiled code in the visitor's browser. The build happens in GitHub Actions; the page only loads the result. No server is involved.

**Fortran → WebAssembly (Wasm):**
- **LFortran** (`--backend=wasm`): beta, and supports a subset of Fortran. Its compiler can also run in the browser.
- **LLVM Flang + Emscripten:** the route Pyodide uses for LAPACK. More setup, but handles serious numerical code.
- **f2c + Emscripten:** FORTRAN 77 only; old but reliable.

**Assembly:**
- **Emulate the original machine:** NASM builds a DOS program, and **js-dos** (DOSBox compiled to Wasm) runs it in the page. **v86** emulates a full PC, and 6502 or RISC-V emulators exist in JavaScript.
- **Hand-written WebAssembly text** (`.wat`): runs natively, but it isn't a real CPU's assembly.
- **An assembler and emulator in the page:** readers can edit and run code live.

**Limits:**
- Multithreaded Wasm needs cross-origin isolation, which GitHub Pages can't configure. The workaround is the small `coi-serviceworker` script.
- Emulators add a few MB, so load them only on the game and demo pages.

## Decision O7: how the two languages share one game

There is a real tension here. The only free compiler that builds Fortran into a **DOS** program, OpenWatcom, supports **FORTRAN 77 only**, not the modern Fortran you'd find useful. Three ways to resolve it:

| Option | How it works | You learn | Trade-offs |
|---|---|---|---|
| **A. Authentic DOS, both languages in the game** | The game logic in FORTRAN 77 (OpenWatcom) and the rendering and input in x86 assembly are linked into one DOS program, running in js-dos | Real x86 (DOS, VGA, interrupts), FORTRAN 77, how the two languages call each other | Most authentic. But FORTRAN 77 is the 1977 dialect, and there are 16-bit memory limits or a DOS extender to deal with. OpenWatcom's Fortran is old and little used. |
| **B. All-browser, no emulator** | Modern Fortran compiled to Wasm runs the simulation; hand-written WebAssembly text handles the game loop and rendering; the limits (320×200, 256 colours, 64 KB) are self-imposed | Modern Fortran, WebAssembly | Fast and small, and teaches modern Fortran. But the "assembly" is WebAssembly, not a real CPU's. The limits are a choice rather than real hardware. |
| **C. Split roles** (recommended) | The **game itself is x86 assembly** for DOS, running in js-dos: the truly constrained part. **Modern Fortran is the game's engineering lab.** It generates the game's lookup tables and level data during the build; it acts as a **reference model**, so CI checks that the assembly routines give the same answers; and it powers an interactive "physics lab" page compiled to Wasm | Real x86 assembly **and** modern Fortran, each doing what it's good at | Fortran doesn't run inside the game while it plays. A stretch goal can add that later by linking one FORTRAN 77 routine through OpenWatcom (a taste of option A). |

**Why C:** both languages stay real and useful. The assembly targets a real CPU with real limits, and the Fortran is the modern language. The split also matches how retro developers actually worked: precomputed tables were built offline, and the game used them at runtime. It sidesteps the pass-1 finding that FORTRAN 77 on DOS lacks the features the Gemini report claimed.

## Decision O8: game concept and constraint spec (after O7)

**Concept candidates** (all fit on one screen):
1. **Orbital lander or docking:** gravity, thrust and fuel. The physics suits Fortran (the reference model and trajectory tables), and the rendering is a clean target for assembly. **Recommended** as the smallest game that exercises both languages.
2. **Falling-sand or cellular-automaton sandbox:** simple rules with emergent behaviour. Fortran prototypes the rules and checks the assembly against them.
3. **A tiny *Elite*-style trader:** a procedural galaxy generated from a seed. Historically apt (Elite was assembly), but bigger in scope.

**Constraint spec**, to be fixed before building: target CPU (e.g. a 386), video mode, memory budget and executable size limit.
- Suggested: **VGA Mode 13h** at first, then **Mode X** for tear-free page flipping, as the pass-1 review pointed out.
- The frame rate should be honest: 70 Hz or 35 Hz, not the report's impossible "locked 60".
- Input: keyboard via the **INT 09h** handler, the part of report 02 that holds up.

## Phase 4: toolchain spike (the first thing to build after O7)

Build the smallest possible end-to-end slice before any game work:
1. **Assembly:** NASM builds a DOS program that sets Mode 13h, draws a moving pixel, and exits on a key. Actions builds it, and a Starlight page embeds it in **js-dos**.
2. **Fortran:** a modern Fortran program (built with gfortran in Actions) that generates a lookup table (e.g. sine values) that the assembly program loads. Plus one small Fortran kernel compiled to **Wasm** (LFortran first, falling back to Flang + Emscripten) behind a slider-and-chart page.
3. **Check:** a CI step compares the assembly program's output with the Fortran reference model.

**Done when:** a push to `main` publishes a page where the DOS program runs, fed by a table Fortran generated, and the Wasm demo responds to input.

## Phase 6: 12-week track (outline; finalised after O7 and O8)

Each milestone produces something **runnable on the site**. Progress is tracked like the review findings: data in the repository, shown on the site.

| Weeks | Assembly (the game) | Fortran (the lab) |
|---|---|---|
| 1–2 | Toolchain spike; registers, addressing, Mode 13h, drawing pixels | Modern syntax, modules, arrays; table generator |
| 3–4 | Fast drawing, palette, vertical-retrace sync; fixed-point maths | Physics reference model (integrators) with tests |
| 5–6 | Keyboard interrupt handler; game loop and timer (PIT) | Trajectory and level data generation; a CI check against the assembly |
| 7–8 | Collision and game states; Mode X page flipping | Physics lab page compiled to Wasm |
| 9–10 | Sound (PC speaker or OPL2), polish | Tuning with the lab; balancing data |
| 11–12 | Release a playable build on the site; write-up | Write-up; optional stretch: one FORTRAN 77 routine linked into the game (a taste of option A) |

## Phase 2: review pass 2 (not blocking)

- [ ] Check the high-stakes sources:
  - the LANL Fortran report,
  - whether OpenCoarrays depends on MPI,
  - LFortran's release status,
  - the Microsoft FORTRAN 5.x graphics library,
  - the implementation language of *Elite*, *Frontier* and *M.U.L.E.*
- [ ] Challenge the 15 segments no finding has touched yet.
- [ ] Update statuses in `review/findings/status.json`.
