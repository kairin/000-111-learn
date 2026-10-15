# High-Performance Computing Kernels in Astrophysics

- Unit: `executive-briefing-u15`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `18705:19328`
- Lines: `161:164`
- Purposes: claim-review, learning
- Excerpt SHA-256: `1c7763167d3fb18436eb5ee51d60f96d2fefb676790522c72315370d82b9237c`

This unit preserves the complete source passage about High-Performance Computing Kernels in Astrophysics.

## Claims

### `executive-briefing-u15-c01`

In large-scale gravitational and fluid astrophysics simulations, global time-step integration is governed by high-level mathematical control logic.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Derive the displayed relation and test its units and limiting cases.

Assumptions:
- The equation uses the variables, units, and boundary conditions stated in the passage. (`explicit`)

### `executive-briefing-u15-c02`

The source claims that more than 95% of execution time occurs in innermost force-evaluation loops.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u15-c03`

They rely on hand-tuned x86-64 Assembly (SSE, AVX2, AVX-512) and ARM NEON/SVE low-level SIMD kernels to directly saturate CPU Arithmetic Logic Units (ALUs).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u15-g01`: Scientific computing

Trace the stated language boundary and test its numerical or performance consequence.

Prerequisites: Programming fundamentals, Arrays and data types

Claim dependencies: `executive-briefing-u15-c01`, `executive-briefing-u15-c02`, `executive-briefing-u15-c03`

## Exact source excerpt

##### High-Performance Computing Kernels in Astrophysics

In large-scale gravitational and fluid astrophysics simulations, global time-step integration is governed by high-level mathematical control logic. However,  **over 95% of execution time**  occurs inside the innermost force-evaluation loops.To prevent execution stalls caused by hardware square-root dividers or memory latency, modern high-performance astrophysics codes bypass compiler auto-vectorization. They rely on hand-tuned x86-64 Assembly (SSE, AVX2, AVX-512) and ARM NEON/SVE low-level SIMD kernels to directly saturate CPU Arithmetic Logic Units (ALUs).
