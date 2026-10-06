#!/usr/bin/env bash
# Build and test the game. GitHub Actions runs this script on Ubuntu.
# On this computer, run game/dev.sh: it runs this script inside an Ubuntu container.
#
# Needs: gfortran (B side), nasm (A side), dosbox (runs the A-side tests), python3 (makes the bundle).
# Output: game/build/ (not in git). The website copies build/site/ into its pages.
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
out="$here/build"
rm -rf "$out"
mkdir -p "$out/site"
cd "$out"

echo "== 1. B side: make the sine table (Fortran)"
gfortran -std=f2018 -Wall -Wextra -O2 -o sine_table "$here/lab/sine_table.f90"
./sine_table

echo "== 2. A side: assemble the games and the tests (NASM, 8086 only)"
nasm -f bin -i "$here/src/" -o SPIKE.COM "$here/src/spike.asm"
nasm -f bin -i "$here/src/" -o CHECK.COM "$here/test/check.asm"
nasm -f bin -i "$here/src/" -o DOT3D.COM "$here/src/dot3d.asm"
nasm -f bin -i "$here/src/" -o CHECK3D.COM "$here/test/check3d.asm"
# Test 2b: the same files with one wrong word (SHR, not SAR), to show why the check is necessary.
nasm -f bin -i "$here/src/" -dWRONG_SIGN -o WRONG3D.COM "$here/src/dot3d.asm"
nasm -f bin -i "$here/src/" -dWRONG_SIGN -o CHECK3DW.COM "$here/test/check3d.asm"
# Test 3a: the wave turns around the center. Test 3b: the same files with one wrong value (90, not 64).
nasm -f bin -i "$here/src/" -o SPIN3D.COM "$here/src/spin3d.asm"
nasm -f bin -i "$here/src/" -o CHECK3R.COM "$here/test/check3r.asm"
nasm -f bin -i "$here/src/" -dWRONG_TURN -o WRONGSP.COM "$here/src/spin3d.asm"
nasm -f bin -i "$here/src/" -dWRONG_TURN -o CHECK3RW.COM "$here/test/check3r.asm"
# Test 4a: a packed decimal counter (ADD, ADC and DAA). Test 4b: the same files without DAA.
nasm -f bin -i "$here/src/" -o COUNTER.COM "$here/src/counter.asm"
nasm -f bin -i "$here/src/" -o CHECKBCD.COM "$here/test/checkbcd.asm"
nasm -f bin -i "$here/src/" -dWRONG_DECIMAL -o WRONGCT.COM "$here/src/counter.asm"
nasm -f bin -i "$here/src/" -dWRONG_DECIMAL -o CHECKBCW.COM "$here/test/checkbcd.asm"
ls -l *.COM

echo "== 3. A side: run the seven tests in DOSBox, without a screen"
cat > dosbox-test.conf <<'EOF'
[sdl]
output=surface
[cpu]
cycles=max
[autoexec]
mount c .
c:
CHECK.COM
CHECK3D.COM
CHECK3DW.COM
CHECK3R.COM
CHECK3RW.COM
CHECKBCD.COM
CHECKBCW.COM
exit
EOF
SDL_VIDEODRIVER=dummy SDL_AUDIODRIVER=dummy timeout 120 dosbox -conf dosbox-test.conf >dosbox.log 2>&1 || true
for f in Y.BIN P3D.BIN P3DW.BIN R3D.BIN R3DW.BIN BCD.BIN BCDW.BIN; do
  if [ ! -s "$f" ]; then
    echo "DOSBox did not write $f. The DOSBox log follows:" >&2
    cat dosbox.log >&2
    exit 1
  fi
done

echo "== 4. B side: compare the A-side answers (Fortran)"
gfortran -std=f2018 -Wall -Wextra -O2 -o check_y "$here/lab/check_y.f90"
./check_y
gfortran -std=f2018 -Wall -Wextra -O2 -o check_3d "$here/lab/check_3d.f90"
./check_3d
# Test 2b: the check must find the wrong program. If it does not, the check is broken: stop.
if ./check_3d P3DW.BIN check3d-wrong.json >check3d-wrong.log 2>&1; then
  cat check3d-wrong.log
  echo "The check did not find the errors of the wrong program (test 2b)." >&2
  exit 1
fi
grep -E "^(File|A side|Largest)" check3d-wrong.log
echo "Good: the check found the wrong program (test 2b)."
gfortran -std=f2018 -Wall -Wextra -O2 -o check_spin "$here/lab/check_spin.f90"
./check_spin
# Test 3b: the check must find the wrong program.
if ./check_spin R3DW.BIN check3r-wrong.json >check3r-wrong.log 2>&1; then
  cat check3r-wrong.log
  echo "The check did not find the errors of the wrong program (test 3b)." >&2
  exit 1
fi
grep -E "^(File|A side|Largest)" check3r-wrong.log
echo "Good: the check found the wrong program (test 3b)."
gfortran -std=f2018 -Wall -Wextra -O2 -o check_bcd "$here/lab/check_bcd.f90"
./check_bcd
# Test 4b: the check must find the counter without DAA.
if ./check_bcd BCDW.BIN check-bcd-wrong.json >check-bcd-wrong.log 2>&1; then
  cat check-bcd-wrong.log
  echo "The check did not find the errors of the wrong program (test 4b)." >&2
  exit 1
fi
grep -E "^(File|A side|After|First)" check-bcd-wrong.log
echo "Good: the check found the wrong program (test 4b)."

echo "== 5. Make the bundles for the browser (js-dos)"
python3 - <<'PY'
import json, zipfile, pathlib
conf = """[sdl]
autolock=false
[cpu]
core=normal
cputype=8086
cycles=3000
[autoexec]
mount c .
c:
{program}
"""
for program, bundle in [("SPIKE.COM", "spike.jsdos"), ("DOT3D.COM", "dot3d.jsdos"), ("WRONG3D.COM", "wrong3d.jsdos"),
                         ("SPIN3D.COM", "spin3d.jsdos"), ("WRONGSP.COM", "wrongsp.jsdos"),
                         ("COUNTER.COM", "counter.jsdos"), ("WRONGCT.COM", "wrongct.jsdos")]:
    with zipfile.ZipFile(f"site/{bundle}", "w", zipfile.ZIP_DEFLATED) as z:
        z.write(program, program)
        z.writestr(".jsdos/dosbox.conf", conf.format(program=program))
info = {
    "spike_com_bytes": pathlib.Path("SPIKE.COM").stat().st_size,
    "sine_bin_bytes": pathlib.Path("sine.bin").stat().st_size,
    "check": json.loads(pathlib.Path("check.json").read_text()),
    "dot3d_com_bytes": pathlib.Path("DOT3D.COM").stat().st_size,
    "check3d": json.loads(pathlib.Path("check3d.json").read_text()),
    "wrong3d_com_bytes": pathlib.Path("WRONG3D.COM").stat().st_size,
    "check3d_wrong": json.loads(pathlib.Path("check3d-wrong.json").read_text()),
    "spin3d_com_bytes": pathlib.Path("SPIN3D.COM").stat().st_size,
    "check3r": json.loads(pathlib.Path("check3r.json").read_text()),
    "check3r_wrong": json.loads(pathlib.Path("check3r-wrong.json").read_text()),
    "counter_com_bytes": pathlib.Path("COUNTER.COM").stat().st_size,
    "check_bcd": json.loads(pathlib.Path("check-bcd.json").read_text()),
    "wrongct_com_bytes": pathlib.Path("WRONGCT.COM").stat().st_size,
    "check_bcd_wrong": json.loads(pathlib.Path("check-bcd-wrong.json").read_text()),
}
pathlib.Path("site/game.json").write_text(json.dumps(info, indent=1))
print(json.dumps(info))
PY
cp SPIKE.COM DOT3D.COM WRONG3D.COM SPIN3D.COM WRONGSP.COM sine.bin P3DW.BIN site/
echo "== Done: $out/site"
