# Intergalactic dust hazards and launch redundancy

- Unit: `fermi-paradox-guide-u08`
- Source: [`sources/fermi-paradox-guide.md`](../../sources/fermi-paradox-guide.md)
- Characters: `12167:13395`
- Lines: `3:3`
- Purposes: claim-review, learning
- Excerpt SHA-256: `adb162fa51e3d19ef4f2160b36c924d7781e4af50cd096e7451ede0a515ac650`

This unit preserves the complete source passage about Intergalactic Space Hazards & Redundancy At relativistic speeds, colliding with intergalactic dust particles poses a lethal kinetic threat. Using the Mathis-Rumpl-Nordsieck dust distribution model, the density of hazardous dust particles ( \$\>1 \\mu\\text{m}\$ ) in intergalactic space is.

## Claims

### `fermi-paradox-guide-u08-c01`

Using the Mathis-Rumpl-Nordsieck dust distribution model, the density of hazardous dust particles ( \$\>1 \\mu\\text{m}\$ ) in intergalactic space is estimated at \$\\rho \= 2.79 \\times 10^{-28} \\text{ particles/cm}^3\$ .

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u08-c02`

To guarantee that at least one probe reaches its destination intact, the required launch redundancy factor \$R\$ is calculated as: \$\$R \= \\exp(d \\cdot A \\cdot \\rho)\$\$ Where \$d\$ is the comoving transit distance and \$A\$ is the frontal cross-sectional area ( \$1 \\text{ cm}^2\$ for a tightly packed coasting vehicle).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the result with the stated cosmology and document the galaxy-density assumption.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u08-c03`

At \$99\\%c\$ , over gigaparsec distances, maintaining survival confidence requires launching a redundancy factor of \$R \\approx 40\$ identical probes per target galaxy.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the result with the stated cosmology and document the galaxy-density assumption.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `fermi-paradox-guide-u08-g01`: Claim analysis

Derive the probe redundancy factor from cross-section, dust density, and travel distance, then compare the speed cases.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `fermi-paradox-guide-u08-c01`, `fermi-paradox-guide-u08-c02`, `fermi-paradox-guide-u08-c03`

## Exact source excerpt

\#\#\#\#\# Intergalactic Space Hazards & Redundancy At relativistic speeds, colliding with intergalactic dust particles poses a lethal kinetic threat. Using the Mathis-Rumpl-Nordsieck dust distribution model, the density of hazardous dust particles ( \$\>1 \\mu\\text{m}\$ ) in intergalactic space is estimated at \$\\rho \= 2.79 \\times 10^{-28} \\text{ particles/cm}^3\$ . To guarantee that at least one probe reaches its destination intact, the required launch redundancy factor \$R\$ is calculated as: \$\$R \= \\exp(d \\cdot A \\cdot \\rho)\$\$ Where \$d\$ is the comoving transit distance and \$A\$ is the frontal cross-sectional area ( \$1 \\text{ cm}^2\$ for a tightly packed coasting vehicle). At \$99\\%c\$ , over gigaparsec distances, maintaining survival confidence requires launching a redundancy factor of \$R \\approx 40\$ identical probes per target galaxy. At lower velocities ( \$50\\%c \\text{ and } 80\\%c\$ ), dust collision risks drop significantly, requiring a nominal redundancy factor of only \$R \= 2\$ . Having established local Dyson Swarm power capture and relativistic propulsion mechanics, these engineering capabilities can now be integrated directly into the expanding geometry of the universe.
