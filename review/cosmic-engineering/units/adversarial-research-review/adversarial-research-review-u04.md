# Warp tooling and statistics review

- Unit: `adversarial-research-review-u04`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `17943:20952`
- Lines: `84:94`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f858eb6de9c479bbcc098990bee71cae02802c4a4fa179d8b95fa31e1fe08565`

Focused review of warp tooling and statistics review.

## Claims

### `adversarial-research-review-u04-c01`

Warp diagnostic percentages require fixed metric, domain, resolution, observer set, and version.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Recompute a matched benchmark.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u08-c02`

## Learning goals

### `adversarial-research-review-u04-g01`: Technical claim review

Evaluate evidence and limits for warp tooling and statistics review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-u04-c01`

## Exact source excerpt

## Relativity and warp-drive claims

The document is right to distinguish ordinary numerical relativity from “inverse” warp-metric analysis. WarpFactory is a published numerical framework for specifying a metric, computing the resulting stress-energy and testing energy conditions rather than time-evolving self-consistent matter from Cauchy data. citeturn2search4 That workflow is legitimate mathematics: if a sufficiently differentiable metric is supplied, Einstein's equations determine the stress-energy tensor that would be required for that geometry. It does **not**, by itself, show that a known material, equation of state, dynamical formation process or stable control system can realise that tensor.

That distinction matters because the document repeatedly shifts from **“a metric satisfying an algebraic energy-condition test exists”** to language resembling **“a physical propulsion architecture exists”**. Those are not equivalent propositions.

The classical Alcubierre assessment is not problematic: its standard wall requires exotic stress-energy, and subsequent work has investigated the severity and quantum-inequality constraints. More importantly for this review, Santiago, Schuster and Visser showed why checking the Eulerian observer alone is insufficient: WEC requires positivity for *all* timelike observers, not merely the comoving one. Within the class analysed in their paper, physically reasonable warp drives violate WEC, SEC and DEC, and under additional plausible assumptions NEC as well. citeturn15view3

This makes the uploaded warpax passage particularly problematic. It gives highly precise Hawking–Ellis Type-I fractions—“100% Rodal, 99.9% Lentz, 99.6% WarpShell, 98.4% Van Den Broeck, 98.0% Alcubierre, 97.5% Natário”—without defining whether the denominator is the entire mostly-flat grid, the active wall, proper-volume weighting, a particular velocity, or a particular resolution. Current warpax material reports a very different wall-restricted picture: at one matched benchmark Alcubierre is \(0.9\%\) Type I/\(99.1\%\) Type IV, Natário \(10.1/89.9\%\), Van den Broeck \(12.2/87.8\%\), and Rodal \(100/0\%\). citeturn14view3 The same current manuscript warns that several benchmark walls are poorly resolved and explicitly excludes Lentz from its quantitative comparison because its wall is vastly thinner than a grid cell in that setup. citeturn12view2

This is a classic **statistical-denominator failure**: both “98% Type I over the full computational volume” and “99% Type IV in the wall” can theoretically coexist if most of the grid is flat vacuum. Without stating the sampling domain, resolution, weighting and velocity, percentages are scientifically uninterpretable. **Corrective wording:** “Hawking–Ellis fractions depend strongly on whether one samples the whole domain or restricts to the active wall; current wall-restricted warpax benchmarks find Type-IV-dominated Alcubierre, Natário and Van-den-Broeck walls, while Rodal remains Type I.”
