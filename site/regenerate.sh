#!/usr/bin/env bash
# Regenerate everything derived from review/ and stage it.
#
# Builds from the STAGED content (the index), not the working tree, so the
# generated files always match exactly what is being committed:
#   review/segments/<doc>/*.md, review/segments/README.md, review/segments/manifest.json,
#   review/findings/segment-map.md   <- review/segments/split_documents.py
#   serve/                           <- site/build.py
#
# Called by .githooks/pre-commit; can also be run by hand before `git commit`.
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"   # uv is usually installed here

repo=$(git rev-parse --show-toplevel)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# 1. Snapshot the index (respects GIT_INDEX_FILE when run inside a commit hook).
git -C "$repo" checkout-index -a -f --prefix="$tmp/"

# 2. Re-split documents and re-map findings inside the snapshot.
python3 "$tmp/review/segments/split_documents.py" >/dev/null

# 3. Copy the generated segment files back into the working tree.
seg="review/segments"
for d in "$tmp/$seg"/*/; do
  name=$(basename "$d")
  rsync -a --delete "$d" "$repo/$seg/$name/"
done
cp "$tmp/$seg/README.md" "$tmp/$seg/manifest.json" "$repo/$seg/"
cp "$tmp/review/findings/segment-map.md" "$repo/review/findings/"

# 4. Build the site from the snapshot into serve/.
uv run --quiet "$tmp/site/build.py" --out "$repo/serve"

# 5. Stage only generated paths (never the user's other unstaged edits).
cd "$repo"
git add -A serve "$seg/README.md" "$seg/manifest.json" review/findings/segment-map.md
for d in "$tmp/$seg"/*/; do git add -A "$seg/$(basename "$d")"; done
