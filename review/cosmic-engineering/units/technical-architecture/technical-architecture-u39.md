# *Propulsion Efficiency Comparison Table ( \$30\\text{g}\$  Base Payload)*

- Unit: `technical-architecture-u39`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `26991:27751`
- Lines: `256:262`
- Purposes: claim-review, learning
- Excerpt SHA-256: `86146c373051e5a68860c75ee1389de9ac7381a42a46c60fe0381fcc88f706c7`

This unit preserves the complete source passage about *Propulsion Efficiency Comparison Table ( \$30\\text{g}\$  Base Payload)*.

Context: This passage gives source structure or transition context without a separately stated testable claim.

## Claims

### `technical-architecture-u39-c01`

The propulsion table assigns efficiency, specific impulse, and launch mass to antimatter, fusion, and fission cases for a 30-gram payload.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantities or compare the stated physical premises with primary evidence.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u39-c02`

The antimatter row gives efficiency 0.176, Isp/c 0.567, and the stated 0.99c launch mass.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

### `technical-architecture-u39-c03`

The fusion row gives efficiency 0.00356, Isp/c 0.0843, and the stated target-speed masses.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

### `technical-architecture-u39-c04`

The fission row gives efficiency 0.000787, Isp/c 0.0397, and the stated target-speed masses.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

## Learning goals

### `technical-architecture-u39-g01`: Propulsion accounting

Recompute the stated propulsion mass, energy, and launch-time quantities from their row inputs.

Prerequisites: Rocket equations, Logarithms

Claim dependencies: `technical-architecture-u39-c01`, `technical-architecture-u39-c02`, `technical-architecture-u39-c03`, `technical-architecture-u39-c04`

## Exact source excerpt

###### *Propulsion Efficiency Comparison Table ( \$30\\text{g}\$  Base Payload)*

Propulsion Class,\$\\eta\$  (Efficiency),\$I\_{sp}/c\$,Mass ( \$m\_0\$ ) for  \$0.50c\$  Target,Mass ( \$m\_0\$ ) for  \$0.80c\$  Target,Mass ( \$m\_0\$ ) for  \$0.99c\$  Target  
Antimatter-Matter,\$0.176\$,\$0.567\$,\$0.0791\\text{ kg}\$,\$0.208\\text{ kg}\$,\$3.20\\text{ kg}\$   (Standard design:  \$5\\text{ kg}\$  probe)  
Nuclear Fusion,\$0.00356\$,\$0.0843\$,\$20.2\\text{ kg}\$,"\$13,600\\text{ kg}\$   (Standard design:  \$15\\text{ t}\$  probe)",\$1.28 \\times 10^{12}\\text{ kg}\$  
Nuclear Fission,\$0.000787\$,\$0.0397\$,"\$31,100\\text{ kg}\$   (Standard design:  \$35\\text{ t}\$  probe)",\$3.23 \\times 10^{10}\\text{ kg}\$,\$2.90 \\times 10^{27}\\text{ kg}\$
