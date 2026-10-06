# Plan: learn two languages, then build a small game

**Last update:** 2026-10-05 · **Decisions:** [DECISIONS.md](DECISIONS.md) · **Session records:** [sessions/2026-09-27.md](sessions/2026-09-27.md), [sessions/2026-10-05.md](sessions/2026-10-05.md)

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
| 4d | Three planned tests from the SNES review: the decimal counter, the row-start table and the terrain | Planned. See "Phase 4d" below. |
| 5 | Game design: the rules of the lander game | Next |
| 6 | The 12-week course and the game | After phases 4 and 5 |
| 7 | Second review pass (background research) | Not started. It does not block other work. |
| 0b | Split and review the three SNES video guides (documents 13 to 15), and position their lessons on the site | Done (D25, D26) |

## Phase 4: the first test (done)

The first test works. The files are in `game/`, and the steps are in `game/README.md`.

1. **B side:** `lab/sine_table.f90` calculates 256 sine values as whole numbers.
2. **A side:** `src/spike.asm` draws the curve and moves a dot along it. It is 655 bytes and uses 8086 instructions only.
3. **The check:** DOSBox runs the A-side test without a screen. The B-side checker agrees with the answers on 256 of 256 values.
4. **The website:** js-dos runs the game on the page `/game/test1/`. The player files come from this site only. The page also shows the dictionary words that each program uses, and the new words to learn next.

GitHub Actions does these steps for each push. If the check fails, the website does not change.

## Phase 4b: the second test, the dot in 3D (done)

The owner asked for the same movement of the dot, but in a world with depth. The files are in `game/`, and the steps are in `game/README.md` ("The second test").

1. **B side:** the same `sine.bin`. The curve starts at the back and ends at the front. Its middle point is the center of the 3D space.
2. **A side:** `src/dot3d.asm` draws a floor and moves the dot in perspective, with a pole to its shadow. It is 1103 bytes and uses 8086 instructions only.
3. **The check:** the B-side checker agrees with the A-side test on 256 of 256 points.
4. **The website:** the page `/game/test2a/`.
5. **Test 2b:** the same program with one wrong word (`SHR`, not `SAR`), on the page `/game/test2b/`. The check finds 128 wrong points. The build requires this check to fail.
6. **The hub:** the page `/game/` lists all tests, with the result of each check.

## Phase 4c: test 3, the wave turns (done)

1. **Test 3a:** the wave goes from the back to the front, and turns around the center of the 3D space. `src/spin3d.asm` uses double buffering. The check agrees on 4096 of 4096 points. The page is `/game/test3a/`.
2. **Test 3b:** the same program with one wrong value (`QUARTER_TURN equ 90`, not 64). The ring on the floor becomes a tilted oval. The check finds 3759 wrong points. The page is `/game/test3b/`.

## Phase 4d: planned tests from the SNES review (not started)

The review of the SNES video guides (documents 13 to 15, decision D25) gave the laboratory three new tests and one rule. Each test keeps the pattern of tests 1 to 3: the B side makes or checks the data, the A side runs the same routine as the game, and a program with one wrong word must fail the check. Nothing in this phase is code yet.

**The rule.** A table from the B side is a contract. Write its size, its byte order, its kind and its rounding rule next to it, as `sine.bin` does (256 values, 2 bytes each, low byte first, `NINT(256 * sin)`). When a routine has few inputs, the check runs all of them. Each new table and each new routine gets a wrong twin, and `build.sh` requires that check to fail.

| Test | A side | B side | The wrong twin |
|---|---|---|---|
| 4: the decimal counter | `test/checkbcd.asm` counts from 0000 to 9999 in two packed decimal bytes: `add al, 1` then `daa` on the low byte, `adc al, 0` then `daa` on the high byte. It writes the two bytes after each step (20,000 bytes). | `lab/check_bcd.f90` calculates each value with `MOD` and `ISHFT`, compares all 10,000 pairs with `COUNT` and `ANY`, and prints the agreement. The value after 9999 is 0000 with a carry. | The switch `-dWRONG_DECIMAL` removes `DAA`. The check must find 9,990 wrong values. |
| 5: the row-start table | A routine gives the screen address of a row in three ways: `MUL` by 320, `(y << 8) + (y << 6)`, and one indexed `MOV` from a table. The test writes the three answers for all 200 rows. | `lab/row_table.f90` writes 200 words (`y * 320`) with `ISHFT` and `IAND`, and the checker compares the three A-side answers with the table. | The switch `-dWRONG_OR` joins the two shifts with `OR`. The check must fail on every row that has a carry. |
| 6: the terrain | The lander draws 320 ground heights, one for each column, and tests the landing with one compare against `[terrain + x]`. | `lab/terrain.f90` makes `terrain.bin` (320 bytes) from a fixed seed with `RANDOM_NUMBER`, with one flat pad of 24 columns. The checker makes sure that every height is inside the screen, that the pad is flat and wide enough, and that no hill is higher than row 20. | A table with no flat pad. The check must fail. |
| The note table | The A side plays a note with `OUT` to the ports 43h, 42h and 61h. It reads the divisor from `notes.bin` with `INCBIN`. | `lab/note_table.f90` writes one PIT divisor for each semitone from C2 to B5: `NINT(1193182.0_real64 / f)`. It prints the largest error in cents. The check makes sure that the divisor of the octave above is within 1 of the half. | A table with the frequency in place of the divisor. The check must fail. |

New words that these tests teach. A side: `ADC`, `DAA`, `DAS`, `AAM`, `XLAT`, `INCBIN`. B side: `MODULO`, `IAND`, `ISHFT`, `SHIFTA`, `MERGE`, `ERROR STOP`, `RANDOM_NUMBER`, and the formats `I4.4` and `I0`. The dictionaries have these words now.

## Where the SNES learning units live (decision D26)

The SNES video is a source of ideas, not of words. The 65C816 and the SPC700 are dialects that this project does not learn, and the VGA has no sprites, no HDMA and no color math. Thus, each unit lives on an existing segment page, as a new strength or limit, with "Watch out" notes from the reviews. The summary `../adversarial-review-pass1/00-SUMMARY-snes-video-guides.md` gives the reasons for each unit.

| Unit | Segment page | Weeks | Test |
|---|---|---|---|
| U1 Budget first: a frame is about 68,000 cycles | Controlling the hardware (A) | 1 to 2 | Open question O9 |
| U2 Look it up: sine, row start, terrain | Doing arithmetic (A), Working with many values (A) | 3 to 8 | Tests 5 and 6 |
| U3 Digits on the screen: `DAA` and `I4.4` | Showing text and reading keys (A and B), Doing arithmetic (A) | 3 to 4 | Test 4 |
| U4 The table is the contract | Organizing a program (A and B) | 1 to 2 | The rule of Phase 4d |
| U5 What you cannot see still costs | Working with many values (A) | 5 to 8 | none |
| U6 Segment:offset is not bank:offset | Keeping values (A) | 1 to 2 | none |
| U7 The beam and the ports | Controlling the hardware (A and B) | 7 to 10 | The note table |
| U8 Wrap for free, or say `MODULO` | Doing arithmetic (A and B) | 3 to 4 | none (test 3 shows it) |

Ideas that the review dropped: sound from samples (the PC speaker plays one square wave), a maze with a flood-fill check (the lander has no maze), and the SNES words `SED`, `LDA` and the data bank register (a different dialect).

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

Open question **O9** (from the SNES review): which PC speed does the lander target? One frame at 70 Hz gives a 4.77 MHz 8086 about 68,000 clock cycles. A full-screen copy with `REP MOVSW` costs about 544,000. The js-dos bundle sets `cputype=8086` and `cycles=3000`, which are DOSBox cycles, not 8086 clock cycles. The answer sets the budget of each picture.

## Phase 6: the 12-week course (draft)

Each two weeks add new words on each side and one playable result on the site.

| Weeks | A side (the game) | B side (the laboratory) |
|---|---|---|
| 1 to 2 | Registers, memory, the graphics mode: the first nouns and verbs. Segment:offset (U6), the frame budget (U1) | Types, arrays, modules: the first nouns and adjectives. The table is the contract (U4) |
| 3 to 4 | Drawing, colors, screen timing. Digits on the screen with `DAA` (U3), the row-start table (U2), wrap for free (U8) | Physics formulas and tests. Test 4 (the decimal counter) and test 5 (the row-start table). `MODULO` (U8), `I4.4` and `I0` (U3) |
| 5 to 6 | The keyboard interrupt, the game loop, the clock. What you cannot see still costs (U5) | Level data and trajectory tables. The terrain with one flat pad (test 6): the B side makes it and checks it, and a terrain with no pad must fail |
| 7 to 8 | Collisions, game states, smooth page flips. The terrain lookup (U2), Mode X pages and the line compare (U7) | A physics page in the browser (Wasm) |
| 9 to 10 | Sound, polish. The PIT note protocol on the ports 43h, 42h and 61h (U7) | Balance of the game data. The note table and its error in cents |
| 11 to 12 | Publish the playable game | Write the story of the two sides |

## Phase 7: second review pass (background research)

- [ ] Check the important sources: the LANL Fortran report, OpenCoarrays and MPI, LFortran status, the Microsoft FORTRAN 5.x graphics library, and the language of Elite, Frontier and M.U.L.E.
- [ ] Examine the 15 document parts that no finding touched.
- [ ] For the SNES guides: watch the credit roll for the Hornests credit, read the counter limit in the game, and confirm the BG2 scroll register, the divider timing and the V-blank length on the SNESdev wiki. The full list is in `../adversarial-review-pass1/00-SUMMARY-snes-video-guides.md`.
- [ ] Record the results in `review/findings/status.json`.
