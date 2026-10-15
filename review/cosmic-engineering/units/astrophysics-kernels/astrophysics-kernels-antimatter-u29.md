# Antimatter beam-core propulsion

- Unit: `astrophysics-kernels-antimatter-u29`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `72703:74370`
- Lines: `268:271`
- Purposes: claim-review, learning
- Excerpt SHA-256: `e05cb71eec3d6db7ad57a0dc5a2ecdbcba2e4894f3b1207fa4cfcdc8c436c660`

Antimatter drive claims.

## Claims

### `astrophysics-kernels-antimatter-u29-c01`

At an effective exhaust speed of 0.69c, the subsection gives mass ratio 1.1565 for 0.1c and 2.2169 for 0.5c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate each mass ratio at both exhaust-speed bounds.

Assumptions:
- The table uses its stated pion-capture efficiencies and flyby case. (`explicit`)

### `astrophysics-kernels-antimatter-u29-c02`

The subsection says charged pions decay into muons and neutrinos; a 50 T magnetic nozzle collimates the charged-pion and muon streams.

Type: `empirical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, calculation.

Evidence needed: Check branching fractions, pion energies, and nozzle momentum capture against primary data.

Assumptions:
- The annihilation-at-rest and nozzle model apply. (`explicit`)

### `astrophysics-kernels-antimatter-u29-c03`

Neutral-pion gamma rays carry 33% of the annihilation power as an isotropic heat load that requires shielding and radiators.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

## Learning goals

### `astrophysics-kernels-antimatter-u29-g01`: Computational physics

Trace annihilation products through nozzle capture, then recompute exhaust speed and mass ratio at both efficiency bounds.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-antimatter-u29-c01`, `astrophysics-kernels-antimatter-u29-c02`, `astrophysics-kernels-antimatter-u29-c03`

## Exact source excerpt

#### **Antimatter Beam-Core Pion Drives**

When protons and antiprotons annihilate (p \+ \\bar{p}), the rest mass 2m\_p c^2 \= 1.8765\\text{ GeV} does not convert directly into low-energy thermal photons; instead, quark rearrangement produces an average of 3.0 charged pions (\\pi^+, \\pi^-, rest mass 139.57\\text{ MeV}/c^2, proper lifetime \\tau\_{\\pi^\\pm} \= 26.03\\text{ ns}) and 2.0 neutral pions (\\pi^0, rest mass 134.98\\text{ MeV}/c^2, decaying in 8.5 \\times 10^{-17}\\text{ s} into two \\sim 200\\text{ MeV} gamma rays). The nascent charged pions emerge at an average velocity of v\_{\\pi} \\approx 0.94c (\\gamma\_\\pi \\approx 2.93, extending their relativistic decay length to L\_\\pi \= \\gamma\_\\pi v\_\\pi \\tau\_{\\pi^\\pm} \\approx 21.3\\text{ m} before decaying into muons \\mu^\\pm and neutrinos). Collimating these relativistic \\pi^\\pm and \\mu^\\pm streams with a 50\\text{ T} superconducting magnetic nozzle achieves an effective axial exhaust velocity of v\_e \= 0.58c (Frisbee's conservative nozzle efficiency) to v\_e \= 0.69c (theoretical dipole limit). At v\_e \= 0.69c, reaching 0.1c requires a mass ratio of just R \= 1.1565, and reaching 0.5c requires R \= 2.2169 (1.22\\text{ kg} of p\\text{-}\\bar{p} propellant per kg of dry ship, representing a total annihilation energy investment of \\Delta M c^2 / M\_f \= 1.10 \\times 10^{17}\\text{ J/kg}). The dominant engineering constraint is waste-heat rejection: the uncollimated \\pi^0 \\to 2\\gamma flash radiates 33\\% of the total annihilation power isotropically, requiring a massive liquid-droplet or tungsten-beryllium gamma-ray shadow shield and high-temperature radiators.
