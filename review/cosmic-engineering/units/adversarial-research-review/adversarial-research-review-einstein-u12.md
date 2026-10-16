# Einstein Toolkit review

- Unit: `adversarial-research-review-einstein-u12`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `16612:17943`
- Lines: `80:83`
- Purposes: claim-review, learning
- Excerpt SHA-256: `0d33b1968c5dc1ce27370e6628d88fdb468f4bfc55ec0127ffe4b86d713da790`

Reviews numerical-relativity release and component claims.

## Claims

### `adversarial-research-review-einstein-u12-c01`

Einstein Toolkit component claims require release-qualified documentation because its infrastructure evolves.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Inspect a pinned thorn inventory and release notes.

Assumptions:
- The review and target source refer to identifiable releases. (`inferred`)

Review targets:
- `astrophysics-kernels-u07-c01`

## Learning goals

### `adversarial-research-review-einstein-u12-g01`: Scientific software review

Assess the evidence and limits of einstein toolkit review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-einstein-u12-c01`

## Exact source excerpt

The Einstein Toolkit portion is historically recognisable but should not be presented as a frozen architecture. ADMBase does provide the standard 3-metric, extrinsic curvature, lapse and shift interface, and McLachlan is a Kranc-generated Einstein solver associated with BSSN; CCZ4 was added to McLachlan in the 2012 toolkit release. citeturn13search4turn16view4turn13search9 However, by the 2026 Hypatia release the Toolkit also contained newer GPU-oriented CarpetX evolution thorns, including Cottonmouth BSSNOK/Z4c and CanudaX. citeturn13search1 Thus “the Einstein Toolkit is built atop Carpet” is now too restrictive. Likewise, the document's very specific assertion that Kranc-generated arithmetic is arranged to fit within a 32 kB L1 instruction cache is not established by the cited Toolkit documentation and should be removed unless a compiler/performance source is supplied.

**Methodological verdict on this section:** the mathematics of the established integrators is mostly credible, but **implementation status must be checked against tagged source releases rather than inferred from module names, old papers or project roadmaps**. The correct reproducibility unit is not “FAT”, “Mercury”, or “Phantom-GRAPE” generically; it is an exact release/commit, compiler, build flags, hardware platform and benchmark.
