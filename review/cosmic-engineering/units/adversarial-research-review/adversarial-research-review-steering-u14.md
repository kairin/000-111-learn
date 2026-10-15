# Warp propulsion and steering scope review

- Unit: `adversarial-research-review-steering-u14`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `22505:24522`
- Lines: `100:113`
- Purposes: claim-review, learning
- Excerpt SHA-256: `eb72d90f5ece7aed284578e4119c7291238f762245be42c043b90d44d0b82b38`

Focused review of warp propulsion and steering scope review.

## Claims

### `adversarial-research-review-steering-u14-c01`

Radiative steering is conditional and does not establish reactionless propulsion.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Derive its flux law under stated junction conditions.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u15-c01`

## Learning goals

### `adversarial-research-review-steering-u14-g01`: Technical claim review

Evaluate evidence and limits for warp propulsion and steering scope review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-steering-u14-c01`

## Exact source excerpt

citeturn15view3turn15view0 The two literatures should therefore be presented as exploring different metric/matter classes, not as one side having simply disproved the other.

The uploaded discussion of **radiative steering** needs an even stronger caveat. The 2026 source derives, for its axisymmetric photon-rocket exterior,
\[
-\dot m\ge3m|\alpha|,
\]
from non-negative angular radiation intensity. citeturn15view4turn15view5 But the manuscript's own limitations are substantial: the construction is subluminal; it is explicitly “not reactionless”; occupants feel proper acceleration; the minimum-fuel mass fraction obeys \(m_f/m_0=e^{-3\Delta\eta}\) for a rectilinear boost; global eternal existence is not claimed; and a full distributional positive-Bondi-mass result across the shell retains an open analytic step. citeturn16view0

Accordingly, the uploaded sentence asserting a **“fundamental no-reactionless-steering theorem”** is too strong without attribution and assumptions. A defensible replacement is:

> “A recent radiative-shell analysis derives a no-reactionless-steering result, under its asymptotic and energy-condition assumptions, and obtains the photon-rocket control bound \(-\dot m\ge3m|\alpha|\). The resulting construction is subluminal, expends Bondi mass as radiation, and still has open global/matching questions.”

The conflicts-of-interest dimension here needs careful wording. WarpFactory and the Fuchs physical-warp papers share authors/developers, so software validation and scientific claims are not fully independent. That is **not evidence of misconduct**; author-developed scientific software is normal. It does mean that independent implementations using symbolic tensor algebra, alternative numerical differentiation and rigorous interval/error bounds carry disproportionate evidentiary value. The newer warpax work provides some useful independent cross-checking precisely because it approaches the all-observer question differently. citeturn15view0turn16view2
