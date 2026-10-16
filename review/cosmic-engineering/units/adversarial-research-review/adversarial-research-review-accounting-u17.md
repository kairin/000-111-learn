# Propulsion accounting review

- Unit: `adversarial-research-review-accounting-u17`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `30513:32442`
- Lines: `148:173`
- Purposes: claim-review, learning
- Excerpt SHA-256: `bebb1fa35a9adcb02256b05764ce92110064c11cbd8b245abf688749c85d55d6`

Focused review of propulsion accounting review.

## Claims

### `adversarial-research-review-accounting-u17-c01`

Energy comparisons require separate kinetic, onboard, beamed, and heat accounts.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Recompute rows under a common boundary.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u12-c02`

## Learning goals

### `adversarial-research-review-accounting-u17-g01`: Technical claim review

Evaluate evidence and limits for propulsion accounting review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-accounting-u17-c01`

## Exact source excerpt

The largest quantitative failure in the propulsion section is the **laser-sail energy calculation**. For an ideal mirror initially at rest, conservation of energy and momentum gives
\[
\frac{E_{\rm light}}{m}
=
\frac{c^2}{2}
\left[
\sqrt{\frac{1+\beta}{1-\beta}}-1
\right].
\]
Kipping derives this directly for an ensemble of photons. citeturn11view6 It gives:

| Target speed | Exact ideal-reflector incident energy | Uploaded table | Ratio, uploaded/exact |
|---|---:|---:|---:|
| \(0.1c\) | \(4.74\times10^{15}\) J/kg | \(9.95\times10^{15}\) J/kg | \(2.10\) |
| \(0.5c\) | \(3.29\times10^{16}\) J/kg | \(3.11\times10^{17}\) J/kg | \(9.45\) |

Worse, inserting \(\mathcal R=0.9999\) into the **equation printed in the uploaded document itself** gives approximately \(5.04\times10^{15}\) and \(5.88\times10^{16}\) J/kg, respectively—not the table's values. The table therefore fails an internal reproduction test even before comparison with outside literature. An imperfect sail additionally requires a treatment of absorption, re-emission and changing rest mass/temperature rather than merely dividing an ideal result by reflectivity. citeturn11view6

There is a similarly unequivocal error in the classic-warp row. The phrase “\(3.0\times10^{44}\) J … \(\sim700\) kg \(c^2\)” is impossible because
\[
700c^2 \approx 6.29\times10^{19}\ {\rm J},
\]
so the two stated quantities differ by approximately \(4.77\times10^{24}\). This entry should be deleted and rebuilt from the actual source, including bubble size, wall thickness, velocity, energy definition and sign convention.

**Recommended corrective wording for the entire propulsion table:** “These rows use different resource metrics and are not directly comparable. Report mass ratio, vehicle kinetic energy, onboard propellant energy, external supplied energy and waste heat separately; do not collapse all of them into one ‘total energy per kg payload’ column.”
