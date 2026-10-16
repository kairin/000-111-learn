# *Spacecraft Mass and Engine Parameters*

- Unit: `technical-architecture-u24`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `16319:16616`
- Lines: `139:145`
- Purposes: claim-review, learning
- Excerpt SHA-256: `3877894d7800c58c9b7ecd1ea2bf562acf0b4d4945fb2ecbd2c73499d16f91fa`

This unit preserves the complete source passage about *Spacecraft Mass and Engine Parameters*.

## Claims

### `technical-architecture-u24-c01`

The source gives descent stage dry mass as 4,700 lbs. Descent Stage Fuel Capacity: 1,500 lbs.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `technical-architecture-u24-c02`

The source gives horizontal trim engine thrust as \$\\pm 10\\text{ lbs/s}\$ .

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u24-c03`

The vertical main-engine thrust is variable from 0 to 250 lbs/s.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: Evaluate the control law at zero and maximum vertical thrust.

Assumptions:
- The source treats pounds per second as its thrust-control unit. (`explicit`)

## Learning goals

### `technical-architecture-u24-g01`: Claim analysis

Use the stated dry mass, fuel mass, and vertical and horizontal thrust limits to calculate an engine update.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `technical-architecture-u24-c01`, `technical-architecture-u24-c02`, `technical-architecture-u24-c03`

## Exact source excerpt

###### *Spacecraft Mass and Engine Parameters*

* **Descent Stage Dry Mass:**  4,700 lbs.  
* **Descent Stage Fuel Capacity:**  1,500 lbs.  
* **Vertical Main Engine Thrust:**  Variable from  \$0\$  to  \$250\\text{ lbs/s}\$ .  
* **Horizontal Trim Engine Thrust:**   \$\\pm 10\\text{ lbs/s}\$ .
