# Force and clock convention review

- Unit: `adversarial-research-review-clock-u19`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `35359:36827`
- Lines: `194:227`
- Purposes: claim-review, learning
- Excerpt SHA-256: `5d040f36ca3e3074d824247eba7d2ae49ff27ae46989ed00320aae9ed871efb4`

Focused review of force and clock convention review.

## Claims

### `adversarial-research-review-clock-u19-c01`

The review says the weak-field clock correction has the wrong sign if Φ is the conventional negative Newtonian potential.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, logical-analysis.

Evidence needed: Evaluate the expression for Φ < 0 and compare it with the standard weak-field proper-time limit.

Assumptions:
- The conventional negative-potential sign is used. (`explicit`)

Review targets:
- `astrophysics-kernels-u14-c05`

### `adversarial-research-review-clock-u19-c02`

The review requires force-frame labels and limiting-case tests for coordinate and proper acceleration handoffs.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, reproduction.

Evidence needed: Test zero velocity, zero gravity, and constant proper-acceleration limits with explicit frame labels.

Assumptions:
- The handoff equations mix coordinate and proper quantities. (`explicit`)

Review targets:
- `astrophysics-kernels-u14-c04`

## Learning goals

### `adversarial-research-review-clock-u19-g01`: Technical claim review

Evaluate the weak-field sign and test each acceleration handoff in named frames and limiting cases.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-clock-u19-c01`, `adversarial-research-review-clock-u19-c02`

## Exact source excerpt

The relativistic force handoff also has a frame-definition problem. The document writes a coordinate-acceleration transformation and labels the inputs “proper thrust” and “ISM drag”, but the standard relation
\[
\mathbf a
=
\frac{1}{\gamma m}
\left[
\mathbf F-
\frac{(\mathbf F\cdot\mathbf v)\mathbf v}{c^2}
\right]
\]
uses the **three-force measured in the coordinate frame**. A proper force/four-force requires a Lorentz transformation before it can simply be inserted as \(\mathbf F\). For collinear forces the familiar \(\alpha/\gamma^3\) result is recovered, but matching that special case is not sufficient to prove the vector expression is valid for transverse thrust. The engine therefore needs explicit types such as `FourForce`, `ComovingThreeForce` and `CoordinateThreeForce` rather than treating “force” as frame-free.

The proper-clock equation is more serious. Under the standard weak-field metric convention
\[
g_{00}\simeq-\left(1+\frac{2\Phi}{c^2}\right),\qquad
\Phi=-\frac{GM}{r},
\]
the leading relation is
\[
\boxed{
\frac{d\tau}{dt}
\simeq
\sqrt{
1+\frac{2\Phi}{c^2}
-\frac{v^2}{c^2}
}
}.
\]
Because \(\Phi<0\), both gravity and velocity slow the local clock relative to asymptotic coordinate time. The uploaded
\[
\sqrt{1-v^2/c^2-2\Phi/c^2}
\]
would make a stationary clock deeper in a conventional negative gravitational potential run *faster*. This should be corrected or the potential should be explicitly redefined as a positive \(U=GM/r\).
