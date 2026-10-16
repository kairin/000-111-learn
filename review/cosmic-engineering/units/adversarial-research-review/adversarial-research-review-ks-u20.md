# Collision and KS regularization review

- Unit: `adversarial-research-review-ks-u20`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `36827:37865`
- Lines: `228:231`
- Purposes: claim-review, learning
- Excerpt SHA-256: `8b369cf0e10c9bec8404ebf7484876fcf93eaa459a9df574fb17943a0f1a20da`

Focused review of collision and ks regularization review.

## Claims

### `adversarial-research-review-ks-u20-c01`

KS regularization must yield to collision geometry for extended bodies.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Test finite-radius encounters.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u03-c10`

## Learning goals

### `adversarial-research-review-ks-u20-g01`: Technical claim review

Evaluate evidence and limits for collision and ks regularization review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-ks-u20-c01`

## Exact source excerpt

Finally, the architectural prescription to use KS regularisation automatically whenever any two objects come close is too broad. KS regularisation is excellent for gravitational point-mass two-body singularities, but a spacecraft approaching a planet, asteroid or another spacecraft is generally encountering a physical surface/collision problem before \(r\to0\). Regularising the mathematical \(1/r\) singularity should not permit an extended body to pass numerically through another body. Collision geometry, finite radii, tidal disruption and contact physics need higher priority than regularisation for such entities.

**Corrected architectural principle:** use a hierarchy selected by quantified approximation error: Newtonian \(N\)-body where \(GM/(rc^2)\), \(v^2/c^2\) and required accuracy permit it; PN corrections where a controlled expansion remains valid; full GR only where curvature/dynamics requires it; and represent transitions through a mathematically common model or overlap region validated for conserved quantities.
