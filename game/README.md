# The game

This folder holds the game of the project. The two sides work together here:

- **A side, the game:** 8086 Assembly. It runs in a copy of a 1980s PC (DOSBox). On the website, js-dos runs that copy in the browser.
- **B side, the laboratory:** modern Fortran. It does the maths before the game runs. It also checks the answers of the A side.

This split is decision D19 in [the decision log](../review/plan/DECISIONS.md).

## The first test

The first test is the smallest program that uses the two sides.

| File | Side | What it does |
|---|---|---|
| `lab/sine_table.f90` | B | Calculates 256 sine values. It writes them as whole numbers to `sine.bin`, because the 8086 has no verbs for decimal-point numbers. |
| `src/sine_y.inc` | A | The routine `sine_y`: one angle in, one screen row out. The game and the test use this same routine. |
| `src/spike.asm` | A | Draws the curve, then moves a yellow dot along it. It waits for each screen refresh. Push a key to stop. |
| `test/check.asm` | A | Runs `sine_y` for all 256 angles and writes the rows to `Y.BIN`. It has no graphics. |
| `lab/check_y.f90` | B | Calculates the 256 rows again and compares them with `Y.BIN`. If one row is different, the check fails. |

The word `cpu 8086` at the top of each Assembly file tells NASM to refuse instructions that are newer than the 8086.

## Build and test

On this computer, run:

```sh
game/dev.sh
```

The script needs Docker only. It runs `game/build.sh` in an Ubuntu 24.04 container with gfortran, NASM and DOSBox. The results go to `game/build/`, which is not in git.

GitHub Actions runs `game/build.sh` for each push to `main`. If the check fails, GitHub Actions stops, and the website does not change.

## The steps in build.sh

1. The B side makes `sine.bin`.
2. NASM assembles `SPIKE.COM` (the game) and `CHECK.COM` (the test).
3. DOSBox runs `CHECK.COM` without a screen. The program writes `Y.BIN`.
4. The B side compares `Y.BIN` with its own answers and writes `check.json`.
5. A Python step packs `SPIKE.COM` into `spike.jsdos`, the file that js-dos plays.

## Results of the first test

- The two sides agree on 256 of 256 values.
- The largest difference from exact maths is 1 pixel. Whole-number arithmetic causes this small error.
- `SPIKE.COM` is 655 bytes. The table `sine.bin` is 512 bytes.

## Screen rows count down

On a PC screen, row 0 is at the top. Thus, a larger row number is lower on the screen. The routine `sine_y` subtracts the sine from the center row, so the curve goes up first, as in maths.
