# Numerical Integration Mechanics: RK4 vs. Euler Trade-Offs

- Unit: `technical-architecture-u14`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `10535:10785`
- Lines: `83:86`
- Purposes: claim-review, learning
- Excerpt SHA-256: `7e5ae7ebf022e0e10ee586c655f3db8817e8de6c9b8da26e57588b7920be1301`

This unit preserves the complete source passage about Numerical Integration Mechanics: RK4 vs. Euler Trade-Offs.

## Claims

### `technical-architecture-u14-c01`

Real-time simulation requires balancing mathematical accuracy against frame execution budgets ( \$100\\text{ ms}\$ tick target).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `technical-architecture-u14-g01`: Claim analysis

Derive the RK4 and Euler updates, then compare their error behavior and function-evaluation cost.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u14-c01`

## Exact source excerpt

##### Numerical Integration Mechanics: RK4 vs. Euler Trade-Offs

Real-time simulation requires balancing mathematical accuracy against frame execution budgets ( \$100\\text{ ms}\$  tick target). The engine evaluates two main integration strategies:
