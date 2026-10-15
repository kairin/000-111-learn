# Fixed launch systems and relativistic deceleration

- Unit: `fermi-paradox-guide-u07`
- Source: [`sources/fermi-paradox-guide.md`](../../sources/fermi-paradox-guide.md)
- Characters: `9906:12167`
- Lines: `3:3`
- Purposes: claim-review, learning
- Excerpt SHA-256: `212621a3cc67cc1f56affb0dd09f7597c48904962c44c8debf7e2aba39782f65`

This unit preserves the complete source passage about Fixed Launch Infrastructure & Relativistic Deceleration Rather than burdening probes with massive launch propellant, fixed solar-powered launch architectures—such as superconducting coilguns, quenchguns, laser sails, or particle beams—accelerate probes to relativistic fractions of lightsp.

## Claims

### `fermi-paradox-guide-u07-c01`

The source states that probes need reaction mass to decelerate at the target, and that their launch mass follows the relativistic rocket equation.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, calculation.

Evidence needed: Specify inputs, invariants, and failure conditions, then test the proposed design against them.

Assumptions:
- The game rules, resources, and system behavior follow the stated design. (`explicit`)

### `fermi-paradox-guide-u07-c02`

The source gives the relativistic rocket equation and relates specific impulse to mass-energy conversion efficiency.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u07-c03`

For nuclear fission, the table gives Isp/c = 0.0397, efficiency = 0.000787, target speed = 0.50c, 35 t launch mass, and redundancy factor 2.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u07-c04`

Raw conversion efficiencies prior to structural deduction are \$0.000828\$ for Nuclear Fission, \$0.00375\$ for Nuclear Fusion, and \$0.185\$ for Matter-Antimatter reactions.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u07-c05`

For nuclear fusion, the table gives Isp/c = 0.0843, efficiency = 0.00356, speed = 0.80c, 15 t launch mass, and redundancy 2.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The table inputs, units, and model assumptions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u07-c06`

For matter-antimatter, the table gives Isp/c = 0.567, efficiency = 0.176, speed = 0.99c, 5 kg launch mass, and redundancy 40.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The table inputs, units, and model assumptions stated in the passage apply. (`explicit`)

### `fermi-paradox-guide-u07-c07`

For no-rocket coasting, the table gives 0.99c, 1 kg launch mass, and redundancy 40.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The table inputs, units, and model assumptions stated in the passage apply. (`explicit`)

## Learning goals

### `fermi-paradox-guide-u07-g01`: Claim analysis

Use the relativistic rocket equation and each row’s efficiency to check its launch mass and redundancy assumption.

Prerequisites: Algebra, Source evaluation

Claim dependencies: `fermi-paradox-guide-u07-c01`, `fermi-paradox-guide-u07-c02`, `fermi-paradox-guide-u07-c03`, `fermi-paradox-guide-u07-c04`, `fermi-paradox-guide-u07-c05`, `fermi-paradox-guide-u07-c06`, `fermi-paradox-guide-u07-c07`

## Exact source excerpt

\#\#\#\#\# Fixed Launch Infrastructure & Relativistic Deceleration Rather than burdening probes with massive launch propellant, fixed solar-powered launch architectures—such as superconducting coilguns, quenchguns, laser sails, or particle beams—accelerate probes to relativistic fractions of lightspeed ( \$c\$ ) at \$50\\%\$ energy conversion efficiency. However, probes must carry reaction mass to **decelerate** upon entering target galaxies. The required launch mass ( \$m\_0\$ ) to deliver a 30-gram payload ( \$m\_1\$ ) to a target destination is governed by the **Relativistic Rocket Equation** : \$\$\\Delta v \= c \\cdot \\tanh \\left( \\frac{I\_{sp}}{c} \\ln \\frac{m\_0}{m\_1} \\right)\$\$ Where \$I\_{sp}/c\$ represents the specific impulse fraction, which is mathematically derived directly from the net mass-energy conversion efficiency \$\\eta\$ : \$\$\\frac{I\_{sp}}{c} \= \\sqrt{2\\eta \- \\eta^2}\$\$ Accounting for a deadweight structural/engine mass allocation of \$5\\%\$ (leaving \$95\\%\$ usable propellant mass that is progressively consumed during deceleration), the net efficiency \$\\eta\$ is adjusted downwards from raw reaction values, yielding the effective \$I\_{sp}/c\$ parameters outlined below: | Propulsion Mechanism | Specific Impulse ( \$I\_{sp}/c\$ ) | Net Conversion Efficiency ( \$\\eta\$ )\* | Target Velocity | Total Launch Mass per Probe (30g Payload) | Required Redundancy Factor ( \$R\$ ) | | \------ | \------ | \------ | \------ | \------ | \------ | | **Nuclear Fission** | \$0.0397\$ | \$0.000787\$ | \$50\\%c\$ | \$35,000 \\text{ kg}\$ ( \$35 \\text{ t}\$ ) | \$2\$ | | **Nuclear Fusion** | \$0.0843\$ | \$0.00356\$ | \$80\\%c\$ | \$15,000 \\text{ kg}\$ ( \$15 \\text{ t}\$ ) | \$2\$ | | **Matter-Antimatter** | \$0.567\$ | \$0.176\$ | \$99\\%c\$ | \$5 \\text{ kg}\$ | \$40\$ | | **No-Rocket Coasting** | N/A | Cosmic Drag | \$99\\%c\$ | \$1 \\text{ kg}\$ | \$40\$ | \**Note: Net efficiency* *\$\\eta*\$ *reflects the system's usable mass-energy conversion after subtracting* *\$5\\%*\$ *structural and engine deadweight. Raw conversion efficiencies prior to structural deduction are* *\$0.000828*\$ *for Nuclear Fission,* *\$0.00375*\$ *for Nuclear Fusion, and* *\$0.185*\$ *for Matter-Antimatter reactions.*
