# Website artifact readiness and repairs

Status: open findings or validation gaps. Assessment date: 2026-10-11.

The shared baseline recorded **1 source observations** and **2 missing checks** for this repository. This is not a complete application test.

The intent to adopt shared artifact tooling includes fixing known relevant problems first. A successful website build does not erase source or validation failures.

## Tracked work

| ID | Priority | Location or gap | Rule | Required action | Status |
|---|---|---|---|---|---|
| 000-111-learn:F001 | P2 | review/segments/split_documents.py:422 | F541 | Check whether interpolation was intended. Remove the prefix only when literal output is correct. | open |
| 000-111-learn:G001 | G | JavaScript syntax checks need Node | coverage | Make the documented Node version available in a supported environment. Run JavaScript syntax checks and native project validation. | open |
| 000-111-learn:G002 | G | Rust/TypeScript/JSX need the project's documented local compiler/type checks | coverage | Run the project documented compiler/type checks in a supported environment. Record commands, versions and results. | open |

## Repair sequence and closure

1. Reproduce possible correctness defects with synthetic data before new artifact implementation.
2. Review remaining lint findings for intended behavior, public exports and call side effects.
3. Restore missing check coverage in a supported environment.
4. Run the shared baseline and the project's documented functional checks after each bounded repair.
5. Record each closed ID with the source revision, action, test command, result and reviewer.

Project maintainers own these tasks. P1 comes before P2. G means a missing check, not a proved source defect. An inapplicable check needs evidence. Deferred tasks stay open. Do not mass-autofix, suppress findings, delete old source, or change data merely to get a passing result.

The original baseline lacks diagnostic columns. Multiple observations on one line can identify different names. Preserve each observation until targeted diagnostic output resolves it.

## Adoption gate

Known relevant findings require repair or a reviewed technical disposition. Required checks must pass before this repository adopts the shared generator. Existing tests and source-authority rules remain in force.

See the [project intent](website-artifact-intent.md). The private core workspace holds the complete repair inventory and task dependencies. This local document lists only this repository's observations.
