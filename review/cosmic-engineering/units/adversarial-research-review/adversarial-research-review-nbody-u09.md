# NBODY and gyrfalcON review

- Unit: `adversarial-research-review-nbody-u09`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `12342:14098`
- Lines: `70:73`
- Purposes: claim-review, learning
- Excerpt SHA-256: `ecc0f82e6d1d024c1e6f945ccb278de0e0579420e197aa4e607150135c8bc4c2`

Reviews collisional N-body architecture and conservation claims.

## Claims

### `adversarial-research-review-nbody-u09-c01`

NBODY architecture claims need hardware-qualified benchmarks, and gyrfalcON force conservation does not prove all integration invariants.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Reproduce benchmarks and isolated-system invariant tests.

Assumptions:
- The review and target source refer to identifiable releases. (`inferred`)

Review targets:
- `astrophysics-kernels-u03-c06`

## Learning goals

### `adversarial-research-review-nbody-u09-g01`: Scientific software review

Assess the evidence and limits of nbody and gyrfalcon review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-nbody-u09-c01`

## Exact source excerpt

By contrast, the NBODY6++GPU description gets the central architecture right. Wang et al. describe a direct collisional \(N\)-body code combining MPI, GPUs, OpenMP and AVX/SSE, explicitly targeting million-particle simulations. They report that GPU acceleration is particularly effective for the long-range regular force and that AVX/SSE plus OpenMP accelerates prediction and neighbour/irregular calculations; their million-particle benchmark used 320 CPU cores and 32 K20X GPUs. citeturn17search2 Thus the document's high-level account of Ahmad–Cohen splitting, heterogeneous regular/irregular force evaluation, block timesteps and million-body scaling is credible. Exact performance ratios, however, should always be attached to hardware, compiler, \(N\), binary fraction and workload; they are not intrinsic properties of the algorithm. citeturn17search2

The same distinction applies to **gyrfalcON**. Dehnen's original method really does use symmetric mutual cell–cell interactions so Newton's third law is satisfied by construction and total linear momentum is conserved to numerical precision in the force calculation. The 2000 paper described measured scaling as “almost linear”; the subsequent 2002 paper explicitly developed the method as a hierarchical \(O(N)\) algorithm and reported empirically sublinear cost over its tested range. citeturn17academia47turn17search13 The file's “strict \(O(N)\)” phrasing should therefore be softened to “an \(O(N)\)-class hierarchical method whose measured scaling can be close to or even sublinear over particular benchmark ranges”. Also, exact action–reaction symmetry in the force approximation does not by itself imply exact conservation of every invariant after finite-timestep integration.
