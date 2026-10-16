# *Algorithmic Adaptation: RK4 to Euler Integration*

- Unit: `executive-briefing-u19`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `22175:23071`
- Lines: `183:186`
- Purposes: claim-review, learning
- Excerpt SHA-256: `86b933abd1e935bafa38dafbb0af2281522ed5028fe1b6e0797cd2c2cae8233b`

This unit preserves the complete source passage about *Algorithmic Adaptation: RK4 to Euler Integration*.

## Claims

### `executive-briefing-u19-c01`

The displayed RK4 update uses four derivative evaluations and the weighted combination (k1 + 2k2 + 2k3 + k4)/6.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u19-c02`

The source gives the simulator adapts the physics engine to euler integration as \$\$y\_{new} \= y \+ h \\cdot f(t, y)\$\$This reduction from four function evaluations per timestep to one yields a \$4\\times\$ speed improvement , enabling real-time execution at 10 frames per second ( \$0.1\\text{ s}\$ intervals).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u19-g01`: Claim analysis

Derive the RK4 and Euler updates, then compare their error behavior and function-evaluation cost.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `executive-briefing-u19-c01`, `executive-briefing-u19-c02`

## Exact source excerpt

###### *Algorithmic Adaptation: RK4 to Euler Integration*

In modern C, Python, or QB64 implementations, descent trajectories use 4th-Order Runge-Kutta (RK4) integration for high accuracy:\$\$k\_1 \= f(t, y)\$\$\$\$k\_2 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h k\_1}{2}\\right)\$\$\$\$k\_3 \= f\\left(t \+ \\frac{h}{2}, y \+ \\frac{h k\_2}{2}\\right)\$\$\$\$k\_4 \= f\\left(t \+ h, y \+ h k\_3\\right)\$\$\$\$y\_{new} \= y \+ \\frac{h(k\_1 \+ 2k\_2 \+ 2k\_3 \+ k\_4)}{6}\$\$Executing RK4 via software floating-point routines on a 1 MHz MOS 6510 processor introduces severe frame drops. The simulator adapts the physics engine to Euler integration:\$\$y\_{new} \= y \+ h \\cdot f(t, y)\$\$This reduction from four function evaluations per timestep to one yields a  **\$4\\times**\$  **speed improvement** , enabling real-time execution at 10 frames per second ( \$0.1\\text{ s}\$  intervals).
