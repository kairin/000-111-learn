# Relativistic Rocket Equation & Fuel Efficiency Breakdown

- Unit: `technical-architecture-u38`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `26343:26991`
- Lines: `252:255`
- Purposes: claim-review, learning
- Excerpt SHA-256: `08f76b3b251b4f391cdf2f94e5298809c1b5336fe154fa1e73c9a10b0ff73ab8`

This unit preserves the complete source passage about Relativistic Rocket Equation & Fuel Efficiency Breakdown.

## Claims

### `technical-architecture-u38-c01`

The velocity change ( \$\\Delta v\$ ) achievable by a spacecraft carrying onboard deceleration fuel is governed by the relativistic rocket equation:\$\$\\Delta v \= c \\tanh \\left( \\frac{I\_{sp}}{c} \\ln \\frac{m\_0}{m\_1} \\right)\$\$where \$m\_0\$ is initial launch mass, \$m\_1\$ is final payload mass ( \$30\\text{g}\$ base replicator mass).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `technical-architecture-u38-g01`: Propulsion analysis

Calculate a mass ratio from specific impulse and target velocity, then state the deceleration assumption.

Prerequisites: Special relativity, Logarithms

Claim dependencies: `technical-architecture-u38-c01`

## Exact source excerpt

##### Relativistic Rocket Equation & Fuel Efficiency Breakdown

The velocity change ( \$\\Delta v\$ ) achievable by a spacecraft carrying onboard deceleration fuel is governed by the relativistic rocket equation:\$\$\\Delta v \= c \\tanh \\left( \\frac{I\_{sp}}{c} \\ln \\frac{m\_0}{m\_1} \\right)\$\$where  \$m\_0\$  is initial launch mass,  \$m\_1\$  is final payload mass ( \$30\\text{g}\$  base replicator mass),  \$I\_{sp}/c\$  is normalized specific impulse, and  \$\\eta\$  is mass-to-energy conversion efficiency:\$\$I\_{sp}/c \= \\sqrt{2\\eta \- \\eta^2}\$\$Fuel structure is budgeted assuming 95% propellant mass and 5% structural mass.
