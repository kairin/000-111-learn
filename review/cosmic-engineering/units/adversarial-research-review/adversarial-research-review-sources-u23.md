# Primary-source recommendations

- Unit: `adversarial-research-review-sources-u23`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `50000:52157`
- Lines: `333:340`
- Purposes: claim-review, learning
- Excerpt SHA-256: `c56395166349da083057d4f9bba91f5512c5d47e89343e2bfa7c08b98cf768c3`

Focused review of primary-source recommendations.

## Claims

### `adversarial-research-review-sources-u23-c01`

Quantitative claims need primary sources, exact versions, and tests.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Replace secondary citations with primary artifacts.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u16-c01`

## Learning goals

### `adversarial-research-review-sources-u23-g01`: Technical claim review

Evaluate evidence and limits for primary-source recommendations.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-sources-u23-c01`

## Exact source excerpt

Invariant and convergence tests across transition?}
    V -- No --> W[Failure point: smooth-looking force blend creates secular numerical error]
    V -- Yes --> D
```

The most important **primary or first-party sources** for a corrected version are: Chambers' original Mercury hybrid-integrator paper for Hamiltonian splitting and encounter handling; Wang et al.'s NBODY6++GPU paper for the heterogeneous million-body implementation; Dehnen's 2000 and 2002 papers for symmetric momentum-conserving tree/FMM algorithms; the FAT project's own current documentation for actual solver status; the Einstein Toolkit's official documentation and release notes for current numerical-relativity infrastructure; Kodama and Ishiyama's PASJ SIMD implementation for Phantom-GRAPE-level AVX details; Hoang et al.'s *Astrophysical Journal* ISM-impact analysis; Kipping's relativistic photon-sail derivation; Santiago, Schuster and Visser's energy-condition critique; the peer-reviewed WarpFactory and Fuchs constant-velocity-shell papers; and the current warpax and radiative-steering manuscripts for claims specific to 2026. citeturn10search3turn17search2turn16view3turn17academia47turn17search13turn18search0turn13search1turn19academia46turn11view6turn15view3turn15view0turn14view3turn16view0

**Overall confidence: High.** The document contains enough correct underlying mathematics to serve as the basis of a serious hard-science simulation design, but it is **not reliable enough in its present form to serve as an implementation specification or quantitative reference**. Its most serious weaknesses are not exotic speculative assumptions themselves; they are unversioned software claims, missing denominator/resolution definitions, mixing of model domains, inconsistent resource accounting, and several easily reproducible numerical errors. The appropriate revision is therefore not to discard the document, but to separate it into three epistemic layers: **validated numerical algorithms**, **engineering models with explicit uncertainty**, and **speculative GR constructions whose mathematical existence is distinct from physical realisability**.
