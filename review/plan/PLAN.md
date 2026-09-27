# Plan: learn two languages, then build a small game

**Last update:** 2026-09-27 · **Decisions:** [DECISIONS.md](DECISIONS.md) · **Session record:** [sessions/2026-09-27.md](sessions/2026-09-27.md)

## The goal

Learn **Assembly** and **Fortran** in the last three months of 2026 (October to December). The reason is fun and usefulness, not money. The final project is a small game with strict retro limits. A person can play the game in a web browser, on this project's website.

## The lens: two languages, parts of speech

This project treats Assembly and Fortran as real languages. The starting point is one skill: you can read English.

- **A side: Assembly.** This is the first language of the machine. Each Assembly word matches one machine number. It is like the Rumi script for machine code: the same language in letters that a person can read.
- **B side: Fortran.** This language speaks maths. The name comes from FORmula TRANslation. You think in maths, and the compiler translates your maths into the machine tongue.

Each lesson uses the parts of speech:

| Part of speech | A side: Assembly | B side: Fortran |
|---|---|---|
| Verb | An instruction (`MOV`, `ADD`) | A statement (`PRINT`, `ALLOCATE`) |
| Noun | A register or a place in memory (`AX`) | A type of value (`INTEGER`, `REAL`) |
| Adjective | A size word (`BYTE`, `WORD`) | An attribute (`ALLOCATABLE`) |
| Idiom | A BIOS or DOS service call | A built-in function (`MATMUL`) |
| Grammar | Commas and `[brackets]` | Maths notation |

The two dictionaries have very different sizes. The 8086 has 81 instructions. Fortran 2018 has 598 keywords. Thus, Assembly uses a small dictionary and long sentences. Fortran uses a large dictionary and short sentences.

## The website

- Site: https://kairin.github.io/000-111-learn/
- Repository: https://github.com/kairin/000-111-learn

The site has two sides, A and B. Seven segments are common to the two sides. A segment is one job that a language must be able to say, for example "Doing arithmetic". Each segment has an A page and a B page. Each page shows the strengths of the language, its limits, one example sentence and the words that it uses.

## Phases

| Phase | Work | Status |
|---|---|---|
| 0 | Split and review the four AI-written guides (background research) | Done |
| 1 | Choose the goal: learn the two languages, with a game at the end | Done |
| 2 | Put the site on Astro and Starlight, built by GitHub Actions | Done |
| 3 | Make the language lens the center of the site: A side, B side, dictionary | Done |
| 4 | Toolchain test: build a small program on each side and run it in the browser | Done. See the game page of the site. |
| 5 | Game design: the rules of the lander game | Next |
| 6 | The 12-week course and the game | After phases 4 and 5 |
| 7 | Second review pass (background research) | Not started. It does not block other work. |

## Phase 4: the first test (done)

The first test works. The files are in `game/`, and the steps are in `game/README.md`.

1. **B side:** `lab/sine_table.f90` calculates 256 sine values as whole numbers.
2. **A side:** `src/spike.asm` draws the curve and moves a dot along it. It is 655 bytes and uses 8086 instructions only.
3. **The check:** DOSBox runs the A-side test without a screen. The B-side checker agrees with the answers on 256 of 256 values.
4. **The website:** js-dos runs the game on the page `/game/`. The player files come from this site only. The page also shows the dictionary words that each program uses, and the new words to learn next.

GitHub Actions does these steps for each push. If the check fails, the website does not change.

## Phase 4b: the second test, the dot in 3D (done)

The owner asked for the same movement of the dot, but in a world with depth. The files are in `game/`, and the steps are in `game/README.md` ("The second test").

1. **B side:** the same `sine.bin`. The cosine is the sine a quarter turn later.
2. **A side:** `src/dot3d.asm` draws a floor and moves the dot in perspective, with a pole to its shadow. It is 1120 bytes and uses 8086 instructions only.
3. **The check:** the B-side checker agrees with the A-side test on 256 of 256 points.
4. **The website:** the page `/game/3d/`.

## Decision D19 (was O7): how the two languages share the game

The only free compiler that makes DOS programs from Fortran (OpenWatcom) knows only FORTRAN 77. That is the dialect of 1977, not modern Fortran.

| Option | How it works | Result |
|---|---|---|
| A. All in DOS | FORTRAN 77 and 8086 Assembly in one DOS program | Very authentic, but you learn old Fortran |
| B. All in the browser | Modern Fortran as Wasm, and WebAssembly text | No PC copy, but the Assembly is not a real processor language |
| **C. Split roles (chosen)** | The game is 8086 Assembly in js-dos. Modern Fortran is the laboratory: it makes tables and levels, it checks the Assembly results, and it runs a physics page in the browser. | Each language does its best job, and you learn real forms of the two |

## Decision D20 (was O8): the game

Chosen concept: a small lander game. You steer a ship to a soft landing against gravity. Fortran calculates the physics. Assembly draws the screen and reads the keys.

Chosen limits: an 8086 or 386 PC, VGA Mode 13h (320 x 200 pixels, 256 colors), then Mode X for smooth page flips. The screen updates at 70 or 35 frames each second. The review found that a locked 60 frames each second is not possible in Mode 13h.

## Phase 6: the 12-week course (draft)

Each two weeks add new words on each side and one playable result on the site.

| Weeks | A side (the game) | B side (the laboratory) |
|---|---|---|
| 1 to 2 | Registers, memory, the graphics mode: the first nouns and verbs | Types, arrays, modules: the first nouns and adjectives |
| 3 to 4 | Drawing, colors, screen timing | Physics formulas and tests |
| 5 to 6 | The keyboard interrupt, the game loop, the clock | Level data and trajectory tables |
| 7 to 8 | Collisions, game states, smooth page flips | A physics page in the browser (Wasm) |
| 9 to 10 | Sound, polish | Balance of the game data |
| 11 to 12 | Publish the playable game | Write the story of the two sides |

## Phase 7: second review pass (background research)

- [ ] Check the important sources: the LANL Fortran report, OpenCoarrays and MPI, LFortran status, the Microsoft FORTRAN 5.x graphics library, and the language of Elite, Frontier and M.U.L.E.
- [ ] Examine the 15 document parts that no finding touched.
- [ ] Record the results in `review/findings/status.json`.
