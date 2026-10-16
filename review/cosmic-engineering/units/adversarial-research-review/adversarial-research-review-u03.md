# FAT implementation review

- Unit: `adversarial-research-review-u03`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `10407:12342`
- Lines: `60:69`
- Purposes: claim-review, learning
- Excerpt SHA-256: `c1c599e4569a024fd39f60325ce7d3f197dab266bad08862be5c25be817bc4bd`

Reviews FAT solver and force-model implementation claims.

## Claims

### `adversarial-research-review-u03-c01`

The review says FAT claims for Nyström, Adams, and drag need a pinned release because the inspected public documentation did not substantiate all of them.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Pin the reviewed FAT release and compare its solver and perturbation inventory with each source claim.

Assumptions:
- The review accurately identifies the documentation and version it inspected. (`explicit`)

### `adversarial-research-review-u03-c02`

The review says the common prograde modified-equinoctial formulation remains singular at retrograde inclination i = π, despite the source’s nonsingularity wording.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, primary-source.

Evidence needed: Derive the element-map denominator at inclination π and compare it with the source wording.

Assumptions:
- The cited equinoctial convention and retrograde limit apply. (`explicit`)

Review targets:
- `astrophysics-kernels-u02-c01`

## Learning goals

### `adversarial-research-review-u03-g01`: Scientific software review

Pin the FAT release, audit each listed solver, and derive the stated retrograde singularity.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-u03-c01`, `adversarial-research-review-u03-c02`

## Exact source excerpt

## Numerical code and HPC claims

The document's treatment of **NBODY6++GPU and gyrfalcON is substantially better than its treatment of FAT and Phantom-GRAPE**.

The strongest direct contradiction concerns FAT. The uploaded text describes FAT as already providing Runge–Kutta–Nyström integration, Adams–Bashforth–Moulton/DDEABM propagation, and atmospheric drag. Yet the project's own current overview marks “Nystrom”, “Adams”, and “atmospheric drag” as not implemented, while listing Runge–Kutta, geopotential, solar-radiation-pressure, JPLEPH and SPICE functionality as implemented. citeturn10search3 The variable-step module presently documents Fehlberg 7(8), Fehlberg 8(9), Verner 8(9), and several Feagin methods; it contains event handling and configurable absolute/relative tolerances, but this does not support the document's assertion that DDEABM itself is one of FAT's active propagation engines—the module merely notes that one initial-step estimator originated in DDEABM. citeturn10search0turn10search4

That is not a small wording issue: a software architecture based on calling a solver that the dependency does not implement will fail at implementation time. **Recommended wording:** “FAT currently provides a broad family of high-order Runge–Kutta methods and event detection; Nyström, Adams and some force models appear on the project's roadmap and should not be treated as available without checking the exact repository revision.” citeturn10search3

A second FAT caveat concerns modified equinoctial elements. Their usefulness near \(e=0\) and the usual prograde equatorial limit is sound, but the common prograde formulation does **not** remove the retrograde \(i=\pi\) singularity. Therefore the statement that the transformation solves singularities as \(i\to0,\pi\) is overbroad. The project's own modified-equinoctial documentation identifies the retrograde-equatorial exception. citeturn0search8
