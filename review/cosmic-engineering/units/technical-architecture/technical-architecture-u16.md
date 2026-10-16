# *Simplified Euler Integration*

- Unit: `technical-architecture-u16`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `11504:12435`
- Lines: `91:98`
- Purposes: claim-review, learning
- Excerpt SHA-256: `52500e2ff35b1ea2387d93221f92fa52bb7a879c8e2f8db0d03342008c2f697b`

This unit preserves the complete source passage about *Simplified Euler Integration*.

## Claims

### `technical-architecture-u16-c01`

Reduces derivative evaluations from 4 to 1 per timestep, yielding an immediate \$\\sim 4\\times\$ processing speedup per entity.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u16-c02`

While Euler integration introduces position drift over long durations, this is managed by using RK4 periodic corrections on backend Fortran servers for stable long-term planetary orbits while reserving Euler for short-term active craft piloting.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `technical-architecture-u16-g01`: Claim analysis

Derive the RK4 and Euler updates, then compare their error behavior and function-evaluation cost.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u16-c01`, `technical-architecture-u16-c02`

## Exact source excerpt

###### *Simplified Euler Integration*

Under constrained frame-rate conditions (such as real-time 10 FPS update loops operating at  \$h \= 0.1\\text{s}\$  intervals), the engine dynamically shifts localized entity physics to simplified Euler integration:  \$\$y\_{\\text{new}} \= y \+ h \\cdot f(t, y)\$\$

* **Computational Complexity:**  Reduces derivative evaluations from 4 to 1 per timestep, yielding an immediate  \$\\sim 4\\times\$  processing speedup per entity.  
* **Game Loop Impact:**  Lowering CPU execution time per entity frees up cycle budgets to maintain stable 10 FPS /  \$0.1\\text{s}\$  update loops across high entity counts.  
* **Numerical Drift Management:**  While Euler integration introduces position drift over long durations, this is managed by using RK4 periodic corrections on backend Fortran servers for stable long-term planetary orbits while reserving Euler for short-term active craft piloting.
