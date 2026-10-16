# Correction priorities review

- Unit: `adversarial-research-review-priorities-u21`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `43091:44912`
- Lines: `257:275`
- Purposes: claim-review, learning
- Excerpt SHA-256: `9b1f2d537dd22f7954af4ad189d43aa541e0621605f10d2ec7455452c92e0b0f`

Focused review of correction priorities review.

## Claims

### `adversarial-research-review-priorities-u21-c01`

Laser, clock, and warp corrections are priority because they alter quantitative conclusions.

Type: `value-judgment`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Reproduce the numerical inconsistencies.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u16-c01`

## Learning goals

### `adversarial-research-review-priorities-u21-g01`: Technical claim review

Evaluate evidence and limits for correction priorities review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-priorities-u21-c01`

## Exact source excerpt

citeturn14view3

For conflicts of interest and evidence independence, code authors are often the natural primary sources for implementation details, but **author benchmarks should not be the sole evidence for universal performance claims**. NBODY6++GPU's published benchmarks establish that its architecture can work at million-body scale on the reported cluster; they do not prove the same speedup on every contemporary platform. citeturn17search2 Similarly, Fuchs et al.'s published energy-condition result is meaningful, but independent tensor implementations and stability studies are needed before elevating the solution into an engineering assumption. citeturn15view0

A practical severity ranking for revision is therefore:

| Priority | Correction |
|---|---|
| **Critical** | Recompute the laser-sail equation/table; remove the \(700\,\mathrm{kg}c^2=3\times10^{44}\) J contradiction; correct the weak-field proper-time sign. |
| **Critical** | Replace the warpax percentages with parameter-, domain-, resolution- and version-specific values. |
| **High** | Correct FAT implementation-status claims. |
| **High** | Fix the \(10^{-9}\) kg/\(5\,\mu\mathrm m\) dust inconsistency. |
| **High** | Separate constant-velocity Fuchs shells from acceleration/steering claims. |
| **High** | Recast the Bondi steering result as a recent result under stated assumptions, not an unconditional established law. |
| **High** | Rebuild propulsion “energy/kg” columns using one consistent accounting scheme. |
| **Medium** | Correct Mercury \(r_{\rm crit}\) and RADAU/Bulirsch–Stoer wording. |
| **Medium** | Distinguish implemented AVX-512 kernels from estimates and hardware-specific optimisation claims. |
| **Medium** | Replace generic force blending with an error-controlled, invariant-tested handoff strategy. |
