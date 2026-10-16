# Lunar Landing Simulation & Manual Override (Apollo Framework)

- Unit: `technical-architecture-u22`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `15524:15833`
- Lines: `128:131`
- Purposes: claim-review, learning
- Excerpt SHA-256: `5126dd0dfeb82cf9ae245b61f836acfdd30a89c3481b1ddcabb260f415308baa`

This unit preserves the complete source passage about Lunar Landing Simulation & Manual Override (Apollo Framework).

## Claims

### `technical-architecture-u22-c01`

When automated guidance systems fail—such as an Apollo Guidance Computer (AGC) failure at an altitude of 7,500 feet—control reverts to manual pilot overrides.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u22-c02`

The descent dynamics follow strict mass, thrust, and gravitational constraints.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, independent-source.

Evidence needed: Find a primary source and an independent source that test the stated physical or historical assertion.

Assumptions:
- The stated physical setting, measurement conditions, and scope apply. (`explicit`)

## Learning goals

### `technical-architecture-u22-g01`: Lunar flight simulation

Calculate a manual lunar-landing update from altitude, velocity, mass, thrust, and gravity.

Prerequisites: Kinematics, Numerical integration

Claim dependencies: `technical-architecture-u22-c01`, `technical-architecture-u22-c02`

## Exact source excerpt

##### Lunar Landing Simulation & Manual Override (Apollo Framework)

When automated guidance systems fail—such as an Apollo Guidance Computer (AGC) failure at an altitude of 7,500 feet—control reverts to manual pilot overrides. The descent dynamics follow strict mass, thrust, and gravitational constraints.
