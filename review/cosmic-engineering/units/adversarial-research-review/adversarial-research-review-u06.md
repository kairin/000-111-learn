# Coordinate precision review

- Unit: `adversarial-research-review-u06`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `32442:34074`
- Lines: `174:185`
- Purposes: claim-review, learning
- Excerpt SHA-256: `747ba751bbdff8f72aabafd3aa5c20bc57045fcf5a5f3b3f877719e2fc96b143`

Focused review of coordinate precision review.

## Claims

### `adversarial-research-review-u06-c01`

Floating origins are one precision design among several alternatives.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Compare range and error of representations.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u13-c02`

## Learning goals

### `adversarial-research-review-u06-g01`: Technical claim review

Evaluate evidence and limits for coordinate precision review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-u06-c01`

## Exact source excerpt

## Simulation architecture and mathematical handoffs

The binary64 ULP analysis is mostly correct. At \(1\) AU, a binary64 coordinate has an ULP of roughly \(3.05\times10^{-5}\) m; around \(0.8\) ly it is about \(1\) m; near Alpha Centauri-scale coordinates it is several metres; and at \(10^4\) ly it is kilometres. Those are direct consequences of
\[
\mathrm{ULP}(x)=2^{\lfloor\log_2|x|\rfloor-52}.
\]
So the document is right that a single galactic-origin binary64 coordinate is inappropriate for centimetre- or millimetre-scale local simulation.

The conclusion “therefore use global integer sectors plus local floating origins” is a sound engineering proposal, but **not the unique solution**. Hierarchical reference frames, double-double arithmetic, compensated relative coordinates, integer cell indices plus local doubles, or arbitrary/fixed precision can all work. A 64.64 signed fixed-point coordinate would offer \(2^{-64}\) m fractional granularity but only roughly \(\pm2^{63}\) m—about \(\pm975\) light-years—before an additional higher-level sector is needed. The file's sector hierarchy can provide that extra range, but this should be described as a representation design rather than “the” required architecture.

There is also a portability issue: “`integer(int128)` in Fortran” is not a Fortran 2018 guarantee. The standard provides selected integer kinds according to compiler capabilities; a native 128-bit integer is implementation-dependent. A production design should therefore abstract the global-coordinate representation behind a portable interface rather than requiring a particular non-universal kind.
