# Cosmological Geodesics and Reachability Ceilings

- Unit: `technical-architecture-u40`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `27751:29047`
- Lines: `263:271`
- Purposes: claim-review, learning
- Excerpt SHA-256: `6c50d0828abea2d1e03c312c300f809b2d29b148117031cea7575b6574f68789`

This unit preserves the complete source passage about Cosmological Geodesics and Reachability Ceilings.

Context: This passage gives source structure or transition context without a separately stated testable claim.

## Claims

### `technical-architecture-u40-c01`

The source uses stated FLRW parameters to calculate cosmological geodesics and limits on reachable galaxies.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, primary-source.

Evidence needed: Recalculate the stated quantities or compare the stated physical premises with primary evidence.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u40-c02`

The source sets H0 to 71 km/s/Mpc, ΩΛ to 0.73, Ωm to 0.27, and Ωr to 8.35 × 10^-5.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

### `technical-architecture-u40-c03`

The 0.50c row gives the stated reach and galaxy count.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

### `technical-architecture-u40-c04`

The 0.80c row gives the stated reach and galaxy count.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

### `technical-architecture-u40-c05`

The 0.99c row gives the stated reach and galaxy count.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate this row from its stated inputs and compare it with an independent calculation.

Assumptions:
- The row values and boundary conditions stated in the source apply. (`explicit`)

## Learning goals

### `technical-architecture-u40-g01`: Cosmological models

Calculate a reach result from the stated cosmological parameters and separate it from galaxy-count assumptions.

Prerequisites: Differential equations, Cosmology

Claim dependencies: `technical-architecture-u40-c01`, `technical-architecture-u40-c02`, `technical-architecture-u40-c03`, `technical-architecture-u40-c04`, `technical-architecture-u40-c05`

## Exact source excerpt

##### Cosmological Geodesics and Reachability Ceilings

Because the universe expands at an accelerating rate governed by the Friedmann-Lemaître-Robertson-Walker (FLRW) metric, distant galaxies recede from the launch point. Current cosmological parameters establish this expansion:

* \$H\_0 \= 71\\text{ km/s/Mpc} \= 2.3 \\times 10^{-18}\\text{ s}^{-1}\$  
* Dark Energy Density ( \$\\Omega\_\\Lambda\$ ):  \$0.73\$  
* Matter Density ( \$\\Omega\_m\$ ):  \$0.27\$  
* Radiation Density ( \$\\Omega\_r\$ ):  \$8.35 \\times 10^{-5}\$The metric equation governing spatial geodesics is:  \$\$g \= dt^2 \- a(t)^2 d\\Sigma^2\$\$Calculating probe trajectories across comoving coordinates establishes hard limits on reachable target galaxies in an expanding universe:| Launch Speed Vector | Maximum Reachable Distance (Gpc / Parsecs) | Maximum Reachable Target Galaxies || \------ | \------ | \------ || **\$0.50c**\$  **Velocity** | \$1.24\\text{ Gpc}\$  ( \$1.24 \\times 10^9\\text{ pc}\$ ) | \$1.16 \\times 10^8\\text{ galaxies}\$ || **\$0.80c**\$  **Velocity** | \$2.33\\text{ Gpc}\$  ( \$2.33 \\times 10^9\\text{ pc}\$ ) | \$7.62 \\times 10^8\\text{ galaxies}\$ || **\$0.99c**\$  **Velocity** | \$4.09\\text{ Gpc}\$  ( \$4.09 \\times 10^9\\text{ pc}\$ ) | \$4.13 \\times 10^9\\text{ galaxies}\$ |
