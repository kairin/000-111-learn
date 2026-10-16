# Fission and pulse propulsion

- Unit: `astrophysics-kernels-fission-u27`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `70353:71411`
- Lines: `260:263`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f2c7f4bda890726c89b261247b417156e17f911a69d5591a91249ad3f94caef0`

Fission-fragment and pulse-drive claims.

## Claims

### `astrophysics-kernels-fission-u27-c01`

The table assigns Orion an exhaust speed of 0.00033c and an asserted mass ratio of 1.62 × 10^133 to reach 0.1c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the row with the displayed Ackeret formula.

Assumptions:
- The table exhaust speed and flyby definition apply. (`explicit`)

### `astrophysics-kernels-fission-u27-c02`

The table assigns Medusa/Mini-Mag an exhaust speed of 0.00327c and an asserted mass ratio of 2.09 × 10^13 to reach 0.1c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the row with the displayed Ackeret formula.

Assumptions:
- The table exhaust speed and flyby definition apply. (`explicit`)

### `astrophysics-kernels-fission-u27-c03`

The fission-fragment discussion gives effective exhaust speed 0.0173c and a mass ratio near 330 for a 0.1c flyby.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the mass ratios and check the asserted exhaust speed.

Assumptions:
- The table uses the displayed relativistic rocket model. (`explicit`)

## Learning goals

### `astrophysics-kernels-fission-u27-g01`: Computational physics

Recalculate the Orion, Medusa, and fission-fragment mass ratios from their stated exhaust speeds.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-fission-u27-c01`, `astrophysics-kernels-fission-u27-c02`, `astrophysics-kernels-fission-u27-c03`

## Exact source excerpt

#### **Fission Fragment and Nuclear Pulse Drives (Orion & Medusa)**

Classical nuclear pulse propulsion (Project Orion, I\_{sp} \\approx 10^4\\text{ s}, v\_e \\approx 0.00033c) and tether-borne spinnaker canopy pulse drives (Johndale Solem's Medusa, I\_{sp} \\approx 10^5\\text{ s}, v\_e \\approx 0.00327c) detonate shaped nuclear charges externally against a momentum-conditioning pusher plate or polyethylene canopy. While ideal for high-thrust interplanetary heavy transport (\\Delta v \\sim 100 \- 3,000\\text{ km/s}), Ackeret's equation demonstrates why they fail for fast interstellar transit: reaching 0.1c requires an unphysical mass ratio of R \= 1.62 \\times 10^{133} for Orion and 2.09 \\times 10^{13} for Medusa. By contrast, a magnetic-core **Fission Fragment Rocket** directly channels nascent fission fragments (A \\approx 90 \- 140, born at \\sim 0.03c \- 0.05c and collimated to an effective v\_e \\approx 0.0173c) out of a rotating dusty-plasma or aerogel core before thermalization, reducing the 0.1c flyby mass ratio to R \\approx 330\.
