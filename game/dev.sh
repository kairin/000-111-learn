#!/usr/bin/env bash
# Run game/build.sh inside an Ubuntu 24.04 container, the same system that GitHub Actions uses.
# This computer then needs no Fortran compiler, no assembler and no DOSBox. It needs Docker only.
set -euo pipefail
repo=$(cd "$(dirname "$0")/.." && pwd)
docker run --rm -v "$repo:/work" -w /work -e DEBIAN_FRONTEND=noninteractive ubuntu:24.04 bash -c '
  apt-get update -qq >/dev/null &&
  apt-get install -y -qq --no-install-recommends gfortran nasm dosbox python3 >/dev/null &&
  bash game/build.sh &&
  chown -R '"$(id -u):$(id -g)"' game/build'
