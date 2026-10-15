# Phantom-GRAPE review

- Unit: `adversarial-research-review-phantom-u11`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `15492:16612`
- Lines: `78:79`
- Purposes: claim-review, learning
- Excerpt SHA-256: `8ed898c1fa8fcd0a431009dca6b251df32f54227ad0adb3f8fa961248f067676`

Reviews SIMD implementation versus projected AVX-512 claims.

## Claims

### `adversarial-research-review-phantom-u11-c01`

Documented AVX2 kernels must be distinguished from projected or architecture-dependent AVX-512 claims.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Inspect versioned kernels and measure named CPUs.

Assumptions:
- The review and target source refer to identifiable releases. (`inferred`)

Review targets:
- `astrophysics-kernels-u06-c02`

## Learning goals

### `adversarial-research-review-phantom-u11-g01`: Scientific software review

Assess the evidence and limits of phantom-grape review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-phantom-u11-c01`

## Exact source excerpt

The Phantom-GRAPE section illustrates another recurring problem: **accurate microarchitectural language is used to hide uncertain provenance**. The 2019 PASJ implementation really does describe explicit YMM register use, four target particles against two source cells for its quadrupole kernel, `VRSQRTPS`, horizontal reductions and AVX2-level instruction scheduling. But the same paper's AVX-512 discussion is explicitly an *estimate*: it calculates expected speedups by assuming twice-wide registers and additional registers, and says further performance is expected when AVX-512 is implemented. citeturn18search0 Hence statements such as “the AVX-512 kernel executes \(4i\times4j\) or \(2i\times8j\) interactions per clock cycle” require a particular current code revision and hardware benchmark; they cannot be justified from the cited AVX2 literature. “Sixteen single-precision lanes per vector instruction” is also not equivalent to “16 interactions per clock cycle”, because instruction dependencies, reciprocal-square-root throughput, loads and reductions determine realised throughput. citeturn18search0
