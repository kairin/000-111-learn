# Content decomposition plan

This plan replaces the heading-based split with a content-based review set.

1. Define the catalog schema and add a worked record. A record identifies its exact source range, claims, and learning goals.
2. Record source provenance. Keep each imported source unchanged and record its original name, portal path, hash, size, and encoding.
3. Catalog the astrophysics kernels and their adversarial review. Link each review statement to the claim that it examines.
4. Catalog the architecture, executive briefing, and flattened Fermi guide. Separate evidence claims from designs and value judgments.
5. Split each source into coherent units. Keep equations, assumptions, table headers, and related rows in the same unit.
6. Build the claim, learning, and relationship indexes from the catalogs. Use content decisions instead of keyword tags.
7. Check full source coverage, exact ranges, source hashes, references, image dependencies, and generated output.
8. Review every classification and run the repository checks. Report inherited failures separately from new failures.

## Ownership

- The orchestrator owns the schema, provenance, tools, generated files, cross-document relationships, navigation, and final checks.
- One implementation worker owns the astrophysics-kernel and adversarial-review catalogs.
- One implementation worker owns the architecture, executive-briefing, and Fermi-guide catalogs.

## Completion conditions

- Every source character belongs to a coherent unit or an explicit context unit.
- Every substantive assertion has a populated claim record with an unchecked status.
- Every learning unit has a goal, prerequisites, and claim dependencies.
- All ranges reproduce exact source excerpts.
- All internal identifiers and links resolve.
- Repeated claims do not count as independent evidence.
- The generator produces the same output on a second run.
