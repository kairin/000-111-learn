# *Initial Boundary Conditions*

- Unit: `technical-architecture-u23`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `15833:16319`
- Lines: `132:138`
- Purposes: claim-review, learning
- Excerpt SHA-256: `d10129bf330f5a96fec6e4b07124cd32258db1f1439e62ba6f6f224973f56486`

This unit preserves the complete source passage about *Initial Boundary Conditions*.

## Claims

### `technical-architecture-u23-c01`

The lunar-descent scenario starts at an altitude of 7,500 ft.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Use the stated altitude as the initial vertical position. 

Assumptions:
- The stated initial boundary conditions are inputs to the lunar-descent model. (`explicit`)

### `technical-architecture-u23-c02`

The initial downward velocity ranges from 200 to 700 ft/s.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Evaluate the descent model at both velocity bounds.

Assumptions:
- The stated initial boundary conditions are inputs to the lunar-descent model. (`explicit`)

### `technical-architecture-u23-c03`

The initial horizontal velocity ranges from 50 to 200 ft/s.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Evaluate the lateral trajectory at both velocity bounds.

Assumptions:
- The stated initial boundary conditions are inputs to the lunar-descent model. (`explicit`)

### `technical-architecture-u23-c04`

The model uses lunar gravity of 5.33 ft/s², about one sixth of Earth gravity.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Check the conversion and use the value in a descent update.

Assumptions:
- The stated initial boundary conditions are inputs to the lunar-descent model. (`explicit`)

## Learning goals

### `technical-architecture-u23-g01`: Claim analysis

Use the stated altitude, velocity ranges, and lunar gravity to calculate the first descent update.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u23-c01`, `technical-architecture-u23-c02`, `technical-architecture-u23-c03`, `technical-architecture-u23-c04`

## Exact source excerpt

###### *Initial Boundary Conditions*

* **Altitude:**  7,500 ft above the lunar surface.  
* **Downward Velocity (**  **\$v\_y**\$  **):**   \$200\\text{ ft/s}\$  to  \$700\\text{ ft/s}\$  (variable due to initial burn errors).  
* **Horizontal Velocity (**  **\$v\_x**\$  **):**   \$50\\text{ ft/s}\$  to  \$200\\text{ ft/s}\$ .  
* **Lunar Gravity (**  **\$g\_{\\text{lunar}}**\$  **):**   \$5.33\\text{ ft/s}^2\$  ( \$\\sim 1/6\\text{th}\$  of Earth's  \$32.174\\text{ ft/s}^2\$ ).
