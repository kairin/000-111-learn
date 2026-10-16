# Regime thresholds and blending review

- Unit: `adversarial-research-review-handoff-u18`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `34074:35359`
- Lines: `186:193`
- Purposes: claim-review, learning
- Excerpt SHA-256: `b11a5703dd8a67d7f9899ff372dede39c102114ddbcf164a394935423aeadb96`

Focused review of regime thresholds and blending review.

## Claims

### `adversarial-research-review-handoff-u18-c01`

Thresholds need error budgets and smooth blends do not guarantee invariants.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Compare switched and reference trajectories.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u14-c01`

## Learning goals

### `adversarial-research-review-handoff-u18-g01`: Technical claim review

Evaluate evidence and limits for regime thresholds and blending review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-handoff-u18-c01`

## Exact source excerpt

The proposed **physics state machine** contains sensible separation-of-scales ideas but its activation thresholds are arbitrary. Nothing singular happens physically at \(\beta=0.01\); \(\gamma-1\approx5\times10^{-5}\) merely indicates that Newtonian kinematic errors have become potentially relevant for a chosen tolerance. Solver switching should be controlled by an error budget, not a hard-coded “relativistic” speed. For example, if a simulation tolerates \(10^{-6}\) relative kinematic error, special-relativistic corrections need to enter much earlier than if it tolerates \(10^{-3}\).

Likewise, blending two force laws smoothly does **not** automatically preserve symplecticity. Chambers' switch is derived at the Hamiltonian level: the potential is partitioned between Hamiltonian pieces and the corresponding operators are composed symmetrically. citeturn16view3 Merely taking
\[
\mathbf a=(1-s)\mathbf a_1+s\mathbf a_2
\]
between two independent solvers may create a force that does not derive from the intended Hamiltonian, and can introduce secular work or momentum errors. Therefore calling a generic handoff “Chambers-style Hamiltonian / Force Blend” is unsafe unless the blended system is actually derived from a common Hamiltonian or validated against invariants.
