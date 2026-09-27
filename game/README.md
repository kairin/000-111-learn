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
| `src/spike.asm` | A | Draws the curve, then moves a yellow dot along it. It waits for the screen refresh. The keys 1 to 5 set the speed, Space pauses, N moves one step, and Esc stops the program. |
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
2. NASM assembles `SPIKE.COM` and `DOT3D.COM` (the games), and `CHECK.COM` and `CHECK3D.COM` (the tests).
3. DOSBox runs `CHECK.COM` and `CHECK3D.COM` without a screen. The programs write `Y.BIN` and `P3D.BIN`.
4. The B side compares the two files with its own answers and writes `check.json` and `check3d.json`.
5. A Python step packs `SPIKE.COM` into `spike.jsdos` and `DOT3D.COM` into `dot3d.jsdos`, the files that js-dos plays.

## Results of the first test

- The two sides agree on 256 of 256 values.
- The largest difference from exact maths is 1 pixel. Whole-number arithmetic causes this small error.
- `SPIKE.COM` is 760 bytes, with the speed, pause and step keys. The table `sine.bin` is 512 bytes.

## Screen rows count down

On a PC screen, row 0 is at the top. Thus, a larger row number is lower on the screen. The routine `sine_y` subtracts the sine from the center row, so the curve goes up first, as in maths.

## The second test: the dot in 3D

The second test gives the dot of the first test a third direction: depth. The dot still goes up and down with the sine. It now also moves from the back to the front: the curve starts far away and ends near. The middle point of the curve (angle 128) is the center of the 3D space. The program draws the world in perspective: a far point is smaller and nearer to the center of the screen.

| File | Side | What it does |
|---|---|---|
| `lab/sine_table.f90` | B | The same table as the first test. The height of the dot is the sine. Thus, the second test needs no new table. |
| `src/path3d.inc` | A | Two routines. `path_point`: one angle in, one 3D point (X, Y, Z) out. `project`: one 3D point in, one screen position out. The game and the test use these same routines. |
| `src/dot3d.asm` | A | Draws a floor, the path in the air and its footprint on the floor. Then it moves a yellow dot along the path, with a pole down to its shadow. A near dot is larger. The keys are the same as in the first test. |
| `test/check3d.asm` | A | Runs the two routines for all 256 angles. It writes three numbers for each angle to `P3D.BIN`: the screen x and y of the dot, and the screen y of its shadow. It has no graphics. |
| `lab/check_3d.f90` | B | Calculates the 768 numbers again and compares them with `P3D.BIN`. If one number is different, the check fails. |

### The world and the eye

- **X** goes from left (-192) to right (190): 1.5 times (angle - 128). **Y** goes from down (-64) to up (64): 64 times the sine. **Z** goes from far (128) to near (-127): 128 - angle. The floor is at Y = -96.
- At angle 128, the point is X = 0, Y = 0, Z = 0: the middle of the curve is the center of the world.
- Seen from above, the path is a straight line from the back left to the front right. Seen from the side, it is the sine curve.
- The eye is at the height Y = 120, and 448 in front of the center of the world. The screen is 200 in front of the eye.
- The perspective is two divisions:
  - screen x = 160 + X * 200 / (Z + 448)
  - screen y = 50 - (Y - 120) * 200 / (Z + 448)
- The 8086 word `IDIV` does the division. It rounds toward zero. Fortran rounds a whole-number division toward zero too, so the checker can do the same steps.

### Three new ideas on the A side

- **Divide by 256 with two moves.** `IMUL` puts the full product in DX:AX. To divide it by 256, the program keeps the middle two bytes: `mov al, ah` and `mov ah, dl`. This needs no shift.
- **The perspective division.** `IDIV CX` divides DX:AX by the distance from the eye.
- **An undo list.** The dot, the pole and the shadow cover many pixels. The routine `plot` keeps the old color and the place of each pixel before it draws. The routine `undo` puts the old colors back, the last pixel first.

### Results of the second test

- The two sides agree on 256 of 256 points (768 of 768 numbers).
- The largest difference from exact maths is 1 pixel.
- `DOT3D.COM` is 1103 bytes. It uses the same `sine.bin` of 512 bytes.

The page `/game/3d/` shows the program between the two panels, as the first page does. The B panel has two drawings: the world from above and the world from the side. In each drawing, the line from the eye to the dot crosses the screen at the screen position of the dot.

## The game page: A and B working together

The page `/game/` shows the program between two panels:

- **A side, left:** the steps of `sine_y` and the pixel write for the dot on the screen now, with the values in the registers. It also shows the two bytes that the program reads from `sine.bin`.
- **B side, right:** the maths for the same angle: the angle, its sine, the whole number that Fortran wrote to `sine.bin`, the exact screen row, and the difference from the A-side row. A unit circle shows the angle.

The page reads the screen of the emulator, finds the yellow dot, and changes its x position into the angle number (x minus 32). Thus, the panels change at the speed of the dot. The buttons under the screen press the keys of the program.

The page adds a fingerprint of the game files to their addresses. A browser then never plays an older copy from its cache.
