# *Physics Dynamics and Spacecraft Modeling*

- Unit: `executive-briefing-u18`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `21256:22175`
- Lines: `174:182`
- Purposes: claim-review, learning
- Excerpt SHA-256: `8686cd461ddb03524f1456904af4232d8346b4644c258e7a61c0c1e07f1a6c8c`

This unit preserves the complete source passage about *Physics Dynamics and Spacecraft Modeling*.

## Claims

### `executive-briefing-u18-c01`

Lunar gravity is set to \$5.33\\text{ ft/s}^2\$ in a vacuum environment.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u18-c02`

Fuel burn continuously reduces spacecraft mass, governing descent stage dry mass ( \$4,700\\text{ lbs}\$ ) and fuel capacity ( \$1,500\\text{ lbs}\$ ).

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `executive-briefing-u18-c03`

Abort-to-orbit dynamics employ Tsiolkovsky's Rocket Equation:\$\$\\Delta v \= V\_e \\ln \\left( \\frac{m\_{initial}}{m\_{final}} \\right)\$\$where exhaust velocity \$V\_e \= 10,000\\text{ ft/s}\$ and required orbital velocity is \$5,512\\text{ ft/s}\$ .

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u18-g01`: Claim analysis

Model one lunar-descent step using the stated gravity, fuel mass, thrust, and rocket equation.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `executive-briefing-u18-c01`, `executive-briefing-u18-c02`, `executive-briefing-u18-c03`

## Exact source excerpt

###### *Physics Dynamics and Spacecraft Modeling*

The Apollo Lunar Module descent simulation models real-world lunar landing physics:

* **Initial State** : Spacecraft guidance fails at  \$7,500\\text{ ft}\$  altitude with downward vertical speeds of  \$200\\text{--}700\\text{ ft/s}\$  and horizontal speeds of  \$50\\text{--}200\\text{ ft/s}\$ .  
* **Lunar Constants** : Lunar gravity is set to  \$5.33\\text{ ft/s}^2\$  in a vacuum environment.  
* **Mass-Variable Dynamics** : Fuel burn continuously reduces spacecraft mass, governing descent stage dry mass ( \$4,700\\text{ lbs}\$ ) and fuel capacity ( \$1,500\\text{ lbs}\$ ).  
* **Rocket Equation** : Abort-to-orbit dynamics employ Tsiolkovsky's Rocket Equation:\$\$\\Delta v \= V\_e \\ln \\left( \\frac{m\_{initial}}{m\_{final}} \\right)\$\$where exhaust velocity  \$V\_e \= 10,000\\text{ ft/s}\$  and required orbital velocity is  \$5,512\\text{ ft/s}\$ .
