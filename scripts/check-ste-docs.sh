#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skill_dir="$repo_root/.agents/skills/ste-writing"

cd "$repo_root"
mapfile -t doc_files < <(
  git ls-files '*.md' |
    rg -v '^(AGENTS\.md$|review/segments/|review/findings/segment-map\.md$)'
)
doc_files=(AGENTS.md "${doc_files[@]}")

if ((${#doc_files[@]} == 0)); then
  printf '%s\n' 'No tracked prose documents to check.'
  exit 0
fi

python3 "$skill_dir/ste-lint.py" --fail-over 2.5 "${doc_files[@]}"
