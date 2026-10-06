#!/usr/bin/env bash
# Run game/build.sh inside an Ubuntu 24.04 container, the same system that GitHub Actions uses.
# This computer then needs no Fortran compiler, no assembler and no DOSBox. It needs Podman or Docker only.
# On RHEL 10, Podman is installed by default. Set CONTAINER=docker or CONTAINER=podman to choose.
set -euo pipefail
repo=$(cd "$(dirname "$0")/.." && pwd)
engine=${CONTAINER:-$(command -v podman || command -v docker || true)}
if [ -z "$engine" ]; then
  echo "game/dev.sh: install Podman or Docker" >&2
  exit 1
fi
# Rootless Podman maps container root to your user, so the files already belong to you.
# Docker runs as real root, so give the files back to you after the build.
fix_owner=""
case "$(basename "$engine")" in
  docker) fix_owner="&& chown -R $(id -u):$(id -g) game/build" ;;
esac
# :Z relabels the folder for SELinux (RHEL). Docker without SELinux ignores it.
"$engine" run --rm -v "$repo:/work:Z" -w /work -e DEBIAN_FRONTEND=noninteractive docker.io/library/ubuntu:24.04 bash -c "
  apt-get update -qq >/dev/null &&
  apt-get install -y -qq --no-install-recommends gfortran nasm dosbox python3 >/dev/null &&
  bash game/build.sh $fix_owner"
