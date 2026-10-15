# *4th-Order Runge-Kutta (RK4) Integration*

- Unit: `technical-architecture-u15`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `10785:11504`
- Lines: `87:90`
- Purposes: claim-review, learning
- Excerpt SHA-256: `b03db33b657d0b565478f91e891cb5ae8587bbf9d600eaad7d6f6787d120bd2e`

This unit preserves the complete source passage about *4th-Order Runge-Kutta (RK4) Integration*.

## Claims

### `technical-architecture-u15-c01`

Standard scientific simulations use RK4 to bound global error accumulation.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u15-c02`

RK4 evaluates four derivatives and combines them as y_new = y + h(k1 + 2k2 + 2k3 + k4)/6.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `technical-architecture-u15-g01`: Claim analysis

Derive the RK4 and Euler updates, then compare their error behavior and function-evaluation cost.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u15-c01`, `technical-architecture-u15-c02`

## Exact source excerpt

###### *4th-Order Runge-Kutta (RK4) Integration*

Standard scientific simulations use RK4 to bound global error accumulation. The state step is calculated via four intermediate derivative evaluations per timestep  \$h\$ :  \$\$k\_1 \= f(t, y)\$\$   \$\$k\_2 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h}{2} k\_1\\right)\$\$   \$\$k\_3 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h}{2} k\_2\\right)\$\$   \$\$k\_4 \= f(t \+ h, y \+ h k\_3)\$\$   \$\$y\_{\\text{new}} \= y \+ \\frac{h}{6}(k\_1 \+ 2k\_2 \+ 2k\_3 \+ k\_4)\$\$While highly accurate over extended orbital timescales, RK4 requires four complete function evaluations per step, creating high computational overhead during real-time, frame-bound execution cycles.
