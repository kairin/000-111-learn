# von Neumann Probe Design and Propulsion Mechanics

- Unit: `executive-briefing-u08`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `10388:12869`
- Lines: `82:93`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f9297bd614a9970c5136cc7536457d07fe501eef3ef5cd5dc4c4606f455ca9fb`

This unit preserves the complete source passage about von Neumann Probe Design and Propulsion Mechanics.

## Claims

### `executive-briefing-u08-c01`

To achieve universal coverage, self-replicating von Neumann probes are propelled toward target galaxies using fixed electromagnetic launch systems (coilguns, quenchguns, or laser/particle beams at 50% efficiency).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the result with the stated cosmology and document the galaxy-density assumption.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u08-c02`

The source gives theoretical lower bound  as Merkle-Freitas molecular assembler ( \$3.91 \\times 10^{-18}\\text{ kg}\$ ).

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u08-c03`

Blueprint storage is trivial.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, independent-source.

Evidence needed: Find a primary source and an independent source that test the stated physical or historical assertion.

Assumptions:
- The stated physical setting, measurement conditions, and scope apply. (`explicit`)

### `executive-briefing-u08-c04`

Probes must carry onboard fuel to decelerate upon arrival.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `executive-briefing-u08-c05`

The source applies the displayed relativistic rocket equation to probe deceleration.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `executive-briefing-u08-c06`

At \$0.99c\$ , collisions with intergalactic dust ( \$\>1\\text{ }\\mu\\text{m}\$ , mass density \$10^{-35}\\text{ g cm}^{-3}\$ , particle density \$\\rho \= 2.79 \\times 10^{-28}\\text{ cm}^{-3}\$ ) are lethal above \$800\\text{ kJ}\$ impact energy.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u08-g01`: Self-replicating systems

Recompute the stated propulsion mass, energy, and launch-time quantities from their row inputs.

Prerequisites: Systems engineering, Mass and energy accounting

Claim dependencies: `executive-briefing-u08-c01`, `executive-briefing-u08-c02`, `executive-briefing-u08-c03`, `executive-briefing-u08-c04`, `executive-briefing-u08-c05`, `executive-briefing-u08-c06`

## Exact source excerpt

##### von Neumann Probe Design and Propulsion Mechanics

To achieve universal coverage, self-replicating von Neumann probes are propelled toward target galaxies using fixed electromagnetic launch systems (coilguns, quenchguns, or laser/particle beams at 50% efficiency). Probes carry a small replicator payload that constructs local infrastructure upon arrival.

* **Replicator Mass Bounds** :  
* *Theoretical Lower Bound* : Merkle-Freitas molecular assembler ( \$3.91 \\times 10^{-18}\\text{ kg}\$ ).  
* *Baseline Target Model* : A 30-gram autonomous unit equipped with AI, manipulator tools, and mass spectrometry capabilities.  
* *Conservative Upper Bound* : Freitas fusion-powered 1980 design ( \$500\\text{ metric tons}\$ ).  
* **Data Storage Density** : Blueprint storage is trivial. Carbon 12/13 isotopic diamond storage yields  \$5 \\times 10^{22}\\text{ bits g}^{-1}\$  (storing global human data in a fraction of a gram). DNA yields  \$9.13 \\times 10^{20}\\text{ bits g}^{-1}\$ .  
* **Deceleration Requirements** : Probes must carry onboard fuel to decelerate upon arrival. Applying the relativistic rocket equation:\$\$\\Delta v \= c \\tanh \\left( \\frac{I\_{sp}}{c} \\ln \\frac{m\_0}{m\_1} \\right)\$\$| Propulsion Mode | Mass Conversion Efficiency ( \$\\eta\$ ) | Specific Impulse ( \$I\_{sp}/c\$ ) | Launch Velocity | Final Payload Mass ( \$m\_1\$ ) | Launch Probe Mass ( \$m\_0\$ ) || \------ | \------ | \------ | \------ | \------ | \------ || **Antimatter-Matter** | \$0.176\$ | \$0.567\$ | \$0.99c\$ | \$30\\text{ g}\$ | **\$5\\text{ kg}**\$ || **Nuclear Fusion** | \$0.00356\$ | \$0.0843\$ | \$0.80c\$ | \$30\\text{ g}\$ | **\$15\\text{ metric tons}**\$ || **Nuclear Fission** | \$0.000787\$ | \$0.0397\$ | \$0.50c\$ | \$30\\text{ g}\$ | **\$35\\text{ metric tons}**\$ || **Coasting (No Rocket)** | N/A | N/A | \$0.99c\$ | \$1\\text{ kg}\$ | **\$1\\text{ kg}**\$ |  
* **Intergalactic Space Redundancy** : At  \$0.99c\$ , collisions with intergalactic dust ( \$\>1\\text{ }\\mu\\text{m}\$ , mass density  \$10^{-35}\\text{ g cm}^{-3}\$ , particle density  \$\\rho \= 2.79 \\times 10^{-28}\\text{ cm}^{-3}\$ ) are lethal above  \$800\\text{ kJ}\$  impact energy. Using a  \$1\\text{ cm}^2\$  frontal cross-section over a maximum comoving distance of  \$4.09\\text{ Gpc}\$ , probe survival probability yields a launch redundancy factor  \$R \= \\exp(d A \\rho) \\approx 30.7\$ . Launching  **40 probes per target galaxy**  guarantees destination arrival.
