# Repository checks: findings and resolution plan

Date: 2026-10-16. Reviewed commit: `d44a239`, with the current working files.
Scope: reproduce the reported checks, identify causes, and plan repairs.
This review changes only this report. It does not apply repairs.

The earlier phrase "existing repository-wide failures" refers to four file findings.
Three files exceed the prose threshold. One Python file has a Ruff finding.
A separate TypeScript notice means that compiler checks remain incomplete.
It does not report a TypeScript compile failure.

## Reproduced results

All commands below ran locally from the repository root.
They made no network requests or hosted service calls.

| Check | Command | Result |
|---|---|---|
| Repository prose | `bash scripts/check-ste-docs.sh` | Exit 1. Three files exceed 2.5 findings per 100 words. |
| Shared baseline | `python3 /home/kkk/Apps/000-0-ai/local-bin/check-projects.py /home/kkk/Apps/000-111-learn --json` | Exit 1. One Ruff finding and one incomplete compiler-check notice. |
| Detailed prose diagnosis | `python3 .agents/skills/ste-writing/ste-lint.py --json --fail-over 2.5 .agents/skills/ste-writing/SKILL.md CLAUDE.md GEMINI.md` | Exit 1. Confirms the three prose scores and their categories. |
| Tracked language inventory | `git ls-files '*.rs' '*.ts' '*.tsx' '*.jsx' '*Cargo.toml' '*tsconfig*'` | Five TypeScript source files and one TypeScript configuration. No Rust or JSX source files. |
| Node availability | `node --version` | `v24.22.0`, which meets the declared Node requirement. |
| npm availability | `npm --version` | `11.19.1`. |

The baseline checked three Python files, three shell files, and five JavaScript files.
It reported no Git whitespace, shell syntax, or JavaScript syntax findings.
Its overall status is `incomplete`, even though its findings list contains a real lint failure.
The status-selection code gives incomplete checks priority over failures.

The affected files and the prose selector match their bytes at `HEAD`.
Thus, these findings precede the current uncommitted research and documentation work.

## F1: the prose check scores instructional examples

File: [.agents/skills/ste-writing/SKILL.md](../../.agents/skills/ste-writing/SKILL.md).
Score: **4.95**, from 70 findings in 1,414 words.

The skill teaches the writing rules through examples of rejected language.
The checker counts those examples as ordinary prose.
Examples occur at line 35 for rejected words, line 37 for marketing terms,
line 44 for hedge phrases, and line 47 for phrasal verbs.

The detailed result includes 16 rejected-word matches, nine marketing terms,
nine hedge phrases, and six phrasal verbs. Other categories contribute the remaining findings.
Some findings concern instructional prose itself. The result is not entirely an example-handling artifact.

The checker strips fenced and inline code at
[ste-lint.py](../../.agents/skills/ste-writing/ste-lint.py), lines 58 to 63.
It does not distinguish quoted counterexamples from author recommendations.
Its 13 dash markers do not contribute to this STE-flavored failure score.
It also scores YAML metadata. The long description at skill line 3 triggers sentence-length findings.
Code stripping does not establish correct scope for metadata or teaching examples.

The local skill and linter match the copies in `000-0-ai/skills/ste-writing/`.
The skill also matches `000-0-ASD-STE100/ste-writing-skill.md`.
The latter repository identifies itself as the payload source in its README, line 107.
Editing the local copy alone would create drift.

Proposed resolution: keep the shared skill bytes and classify its rule examples separately from project prose.
Use a narrow exclusion for the shared instructional payload in the project prose selector.
Check payload identity separately. Keep ordinary project prose subject to the existing threshold.
If the skill needs editorial changes, route them through its source repository and normal delivery process.
Do not run historical setup instructions from that repository as part of this repair.

## F2 and F3: canonical instruction pointers exceed the prose threshold

Files: [CLAUDE.md](../../CLAUDE.md), line 3, and [GEMINI.md](../../GEMINI.md), line 3.
Each score is **4.08**, from two findings in 49 words.
Each file contains one semicolon and one 25-word sentence under the checker rules.

Both files are regular files. Their bytes match the respective templates in `000-0-ai/agents/`.
They are correct instruction pointers, not duplicate instruction documents.

The workspace policy requires identical pointer text and forbids routine edits to these files.
See `000-0-workspace/docs/agent-instruction-files.md`, lines 11 to 19.
The owner already chose this pointer contract. Do not rewrite its wording to lower a prose score.

Proposed resolution: exclude these two exact pointer paths from the project prose score.
Keep their template-byte and regular-file checks separate.
Do not change their contents, replace them with symlinks, or alter their local protection settings in this task.
The existing pointer policy already settles the content decision.

## F4: an unnecessary Python string prefix

File: [review/segments/split_documents.py](../segments/split_documents.py), line 422.
Rule: **Ruff F541**, an f-string without replacement fields.
The string contains a fixed label. The adjacent expression supplies the variable text.
Removing only the unnecessary `f` prefix leaves the resulting text unchanged.

The preservation rule in [AGENTS.md](../../AGENTS.md), line 3, protects source documents and generated files in `review/segments/`.
It also protects `review/findings/segment-map.md`.
The Python file is the authored generator. Its opening docstring lists its generated outputs at lines 12 to 16.
It is not one of those generated documents.

Proposed resolution: make the one-character change in the generator during a later repair task.
Keep imported source documents and generated outputs unchanged.
Do not run the generator in the working tree merely to fix this lint finding.
A temporary-copy comparison can confirm identical string output without replacing protected files.

## I1: TypeScript compiler checks remain incomplete

The baseline emits the generic Rust/TypeScript/JSX notice whenever it finds any matching source extension.
See `000-0-ai/local-bin/check-projects.py`, lines 75 to 77.
It does not run a compiler or read a separate compiler result.
Its notice remains even after a successful separate project check.

Here, the five files are all TypeScript:

- `site/src/content.config.ts`
- `site/src/lib/bcd.ts`
- `site/src/lib/inline.ts`
- `site/src/lib/learn.ts`
- `site/src/lib/spin.ts`

[site/tsconfig.json](../../site/tsconfig.json) extends the strict Astro configuration.
[site/package.json](../../site/package.json), lines 5 to 12, declares the sync and build commands.
It does not declare a type-check command or an `@astrojs/check` dependency.
The deployment workflow also runs the site build, at `.github/workflows/pages.yml:58`.
An Astro build and a TypeScript diagnostic pass are separate evidence.

This checkout has no `site/node_modules/.bin/astro`, local `tsc`, or `@astrojs/check` package.
No global `tsc` is on PATH. A local compile result cannot be claimed from this review.
The review did not install packages or run the build, which writes generated site files.

Proposed resolution: restore the locked site dependencies in a separate local validation workspace.
Document and run a dedicated TypeScript/Astro diagnostic command there.
If that command needs new check dependencies, review the package and lockfile change explicitly.
Run the existing `npm run build` after the content sync.
Record the diagnostic result and build result separately from the unchanged baseline notice.
Do not change the shared baseline merely to hide that notice.

## C1: checks do not cover all new files

The prose selector uses `git ls-files` at
[scripts/check-ste-docs.sh](../../scripts/check-ste-docs.sh), line 9.
The baseline uses the same tracked-file boundary in its `source_files` function, line 21.
Both read working-tree contents for tracked paths. They omit untracked paths.

At review time, `review/cosmic-engineering/` and the new session record were untracked.
This report is also untracked. The report therefore receives a direct prose check below.
Passing a tracked-file check would not establish complete coverage of those additions.

The prose selector currently excludes the old source segments and the generated segment map.
It does not yet distinguish the new source archive, exact excerpts, or preserved legacy scaffold.
See the collection [data layout](../cosmic-engineering/README.md), lines 21 to 25.
This is a coverage and check-scope issue, not an additional failure reproduced in the current tracked run.

Proposed resolution: classify the new files before final delivery checks.
Keep imported bytes and exact excerpts intact. Check authored prose separately from preserved quotations.
Do not exclude the whole research collection, which also contains authored goals and summaries.
Run the collection's read-only integrity command after any catalog change:

```sh
python3 review/cosmic-engineering/tools/build.py --check
```

Use direct checks for named untracked files during review.
During later delivery, stage the intended additions and repeat the tracked baseline.
This report does not stage, commit, push, or publish files.

## Local validation prerequisites

Python, Ruff, Node, npm, ShellCheck, and Podman are available on PATH.
The review found no native `gfortran`, `nasm`, or `dosbox` on PATH.
These missing game tools do not cause the reproduced Ruff or prose failures.

The documented game command is `game/dev.sh`, in [game/README.md](../../game/README.md).
That script starts an Ubuntu container and runs package downloads at lines 19 to 22.
It is not an offline test as currently written.
The direct `game/build.sh` command needs the three missing tools and replaces `game/build/`.

A later full project validation can use a prepared local toolchain in a disposable checkout.
Run `bash game/build.sh` there and retain its positive and expected-negative test results.
Do not install tools, pull containers, trigger hosted jobs, or rebuild the game for this documentation-only review.
The prose-selector and generator repairs need their own focused checks first.
They do not require changes to gameplay, publishing workflows, or hooks.

For this report, the required prose command and the requested baseline reproduction ran.
The direct report check closes the untracked-file gap for this new document.
The site build and game tests are documented project checks, not failures discovered by the baseline.
Their availability limits future full validation. They do not block completion of this review and plan.

## Bounded repair sequence

The following tasks are proposals. No repair task ran during this review.

| Task | Owner and scope | Dependency | Acceptance |
|---|---|---|---|
| R1: prose scope | Project maintainer, `scripts/check-ste-docs.sh` and its check documentation | Use the existing pointer and source-preservation policies | Exact pointer bytes and shared skill bytes stay unchanged. Ordinary authored prose retains the 2.5 threshold. Imported quotations retain their bytes. |
| R2: generator lint | Project maintainer, only the string prefix at `review/segments/split_documents.py:422` | None beyond authorization to implement the repair | Ruff `E9,F` passes for this file. The fixed label is identical. Protected documents and generated files do not change. |
| R3: project diagnostics | Site maintainer, local validation setup and documented check command | Existing locked dependencies and any reviewed diagnostic dependency change | Dedicated type diagnostics and the normal site build each have recorded results. No deployment occurs. |
| R4: complete evidence | Integration reviewer, named additions and check records | R1 and R2, plus R3 for site validation | Direct new-file checks pass. Collection integrity passes. Tracked checks repeat after staging during delivery. Remaining incomplete checks stay explicit. |

For R1, run Bash syntax and ShellCheck on the changed shell script.
Check that the selector includes an ordinary authored page and excludes only the declared special cases.
For R2, run Ruff without autofixes and inspect the literal in a temporary copy.
Do not suppress F541 across the repository.

The existing policies support the narrow R1 and R2 approach.
No new pointer wording decision is needed.
Changes to a shared skill, shared policy, or diagnostic dependency remain distinct, reviewable work.
Preserve the retired-environment boundary. Do not restore retired shells, services, hooks, or setup machinery.

## Report validation

This report uses STE-flavored prose. Direct lint passed at **0.97 findings per 100 words**, below the 2.5 threshold.
Command: `python3 .agents/skills/ste-writing/ste-lint.py --json --fail-over 2.5 review/plan/repository-checks-2026-10-16.md`.
The checker measures patterns. It does not certify full ASD-STE100 conformance.
The repository prose command was repeated after this report was written.
Its existing three-file failure remains separate from the direct result for this report.
All relative file links in this report resolve.
