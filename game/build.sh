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
ls -l SPIKE.COM CHECK.COM DOT3D.COM CHECK3D.COM

echo "== 3. A side: run the two tests in DOSBox, without a screen"
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
exit
EOF
SDL_VIDEODRIVER=dummy SDL_AUDIODRIVER=dummy timeout 120 dosbox -conf dosbox-test.conf >dosbox.log 2>&1 || true
for f in Y.BIN P3D.BIN; do
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
for program, bundle in [("SPIKE.COM", "spike.jsdos"), ("DOT3D.COM", "dot3d.jsdos")]:
    with zipfile.ZipFile(f"site/{bundle}", "w", zipfile.ZIP_DEFLATED) as z:
        z.write(program, program)
        z.writestr(".jsdos/dosbox.conf", conf.format(program=program))
info = {
    "spike_com_bytes": pathlib.Path("SPIKE.COM").stat().st_size,
    "sine_bin_bytes": pathlib.Path("sine.bin").stat().st_size,
    "check": json.loads(pathlib.Path("check.json").read_text()),
    "dot3d_com_bytes": pathlib.Path("DOT3D.COM").stat().st_size,
    "check3d": json.loads(pathlib.Path("check3d.json").read_text()),
}
pathlib.Path("site/game.json").write_text(json.dumps(info, indent=1))
print(json.dumps(info))
PY
cp SPIKE.COM DOT3D.COM sine.bin site/
echo "== Done: $out/site"
