# Writing rules

Use the `ste-writing` skill for prose in this repository. Apply STE-flavored mode to learning pages, READMEs, plans, and review notes. Use strict mode for procedures and safety instructions. Preserve facts, source wording, code, identifiers, and command syntax. Do not edit source documents or generated files in `review/segments/`. Do not edit the generated review map at `review/findings/segment-map.md`. Run `scripts/check-ste-docs.sh` after you edit prose. The checker finds denylist patterns. It does not certify full ASD-STE100 conformance.

## Git identity

Commit as `Mister K <678459+kairin@users.noreply.github.com>`. This is the
public GitHub name and the GitHub noreply email. Do not commit with another
name or with a personal email address. Check with `git config user.name` and
`git config user.email` before you commit.
