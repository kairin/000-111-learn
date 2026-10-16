# Propulsion comparison assumptions and table

- Unit: `astrophysics-kernels-u12`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `65214:70353`
- Lines: `241:259`
- Purposes: claim-review, learning
- Excerpt SHA-256: `bb3265585eb1892961a32422afae1902c366fef8244bd0903793df6460df4e92`

Common comparison table and its accounting assumptions.

## Claims

### `astrophysics-kernels-u12-c02`

The table puts onboard propulsion, external laser energy, and metric-shell energy in shared energy columns, so its resource measures require separate interpretation.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: definition-check, dimensional-analysis.

Evidence needed: Define kinetic, onboard, beam, field, and waste-heat energy for each row before comparing values.

Assumptions:
- Each row uses the energy definition stated or implied by that propulsion architecture. (`inferred`)

### `astrophysics-kernels-u12-c04`

The Orion row gives exhaust speed 0.00033c, mass ratio 1.62 × 10^133 and energy 7.81 × 10^143 J/kg for 0.1c, and marks 0.5c unachievable.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c05`

The Medusa row gives exhaust speed 0.00327c, mass ratios 2.09 × 10^13 and 8.49 × 10^72, and energies 1.01 × 10^25 and 4.08 × 10^84 J/kg.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c06`

The fission-fragment row gives exhaust speed 0.0173c, mass ratios 330 and 6.08 × 10^13, and energies 4.45 × 10^15 and 8.22 × 10^26 J/kg.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c07`

The D–helium-3 fusion row gives exhaust speed 0.03536c, mass ratios 17.08 and 5.59 × 10^6, and energies 9.03 × 10^14 and 3.14 × 10^20 J/kg.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c08`

The antimatter row maps exhaust speeds 0.58c and 0.69c to mass ratios 1.189/1.157 at 0.1c and 2.578/2.217 at 0.5c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c09`

The laser-sail row assumes no onboard fuel and gives beam energies 9.95 × 10^15 J/kg at 0.1c and 3.11 × 10^17 J/kg at 0.5c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c10`

The Alcubierre/White row gives negative energy from about 10^64 J to 3.0 × 10^44 J for its 0.1c comparison and 7.5 × 10^45 J for 0.5c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

### `astrophysics-kernels-u12-c11`

The physical-shell row gives shell energy from 10^44 to 10^47 J and treats inertial coast as mass-ratio one while steering loses Bondi mass.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Recalculate the mass ratios and energy values from the row inputs, then test the stated bottleneck separately.

Assumptions:
- The table uses Ackeret mass ratios and its stated energy-accounting convention. (`explicit`)

## Learning goals

### `astrophysics-kernels-u12-g01`: Propulsion accounting

Recalculate each propulsion row’s mass ratio and energy, then keep onboard, beam, field, and waste-heat accounts separate.

Prerequisites: Energy conservation, Special relativity

Claim dependencies: `astrophysics-kernels-u12-c02`, `astrophysics-kernels-u12-c04`, `astrophysics-kernels-u12-c05`, `astrophysics-kernels-u12-c06`, `astrophysics-kernels-u12-c07`, `astrophysics-kernels-u12-c08`, `astrophysics-kernels-u12-c09`, `astrophysics-kernels-u12-c10`, `astrophysics-kernels-u12-c11`

## Exact source excerpt

## **5\. Propulsion Energy Budgets and Engineering Constraints**

To establish hard-science resource and energy constraints for a simulation backend, the table below synthesizes the exact relativistic rocket performance metrics across five canonical propulsion architectures. All mass ratios R \= M\_0 / M\_f are computed directly via Ackeret's relativistic formula R(\\beta) \= \\exp\\\!\\left(\\frac{c}{v\_e}\\operatorname{artanh}(\\beta)\\right) for a single-stage acceleration from rest to 0.1c (\\operatorname{artanh}(0.1) \= 0.1003353) and 0.5c (\\operatorname{artanh}(0.5) \= 0.5493061) without external braking. Total energy required per kilogram of dry payload (E\_{\\text{tot}} / M\_f) reflects the total nuclear, antimatter, laser, or metric field energy generated or expended to accelerate 1 kg of dry vehicle mass to target velocity.

### **Quantitative Comparison of Interstellar Propulsion Systems**

| Propulsion Architecture | Specific Impulse I\_{sp} (\\text{s}) | Exhaust Velocity v\_e / c | Mass Ratio R to 0.1c (Flyby) | Mass Ratio R to 0.5c (Flyby) | Total Energy per kg Payload to 0.1c (\\text{J/kg}) | Total Energy per kg Payload to 0.5c (\\text{J/kg}) | Primary Engineering & Material Bottlenecks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Nuclear Pulse (Project Orion)** | 1.00 \\times 10^4\\text{ s} | 0.00033c (98.1\\text{ km/s}) | 1.62 \\times 10^{133} | \\infty (\\sim 10^{729}) | 7.81 \\times 10^{143}\\text{ J/kg} | Unachievable | Pusher-plate ablation, shock absorber mechanical fatigue, low v\_e limits mission velocity to \\le 0.01c. |
| **Advanced Pulse (Medusa / Mini-Mag)** | 1.00 \\times 10^5\\text{ s} | 0.00327c (980.7\\text{ km/s}) | 2.09 \\times 10^{13} | 8.49 \\times 10^{72} | 1.01 \\times 10^{25}\\text{ J/kg} | 4.08 \\times 10^{84}\\text{ J/kg} | Polyethylene/beryllium spinnaker tether tensile limits (\\sigma\_{\\max}), X-ray pulse canopy survival. |
| **Fission Fragment (Dusty Plasma)** | 5.30 \\times 10^5\\text{ s} | 0.0173c (5,200\\text{ km/s}) | 3.30 \\times 10^2 | 6.08 \\times 10^{13} | 4.45 \\times 10^{15}\\text{ J/kg} | 8.22 \\times 10^{26}\\text{ J/kg} | Micron-scale \\text{UO}\_2/\\text{PuO}\_2 dust electrostatic self-absorption, magnetic cusp core cooling. |
| **\\text{D-}^3\\text{He} ICF Fusion (Project Daedalus / Icarus)** | 1.08 \\times 10^6\\text{ s} | 0.03536c (10,600\\text{ km/s}) | 17.08 | 5.59 \\times 10^6 | 9.03 \\times 10^{14}\\text{ J/kg} | 3.14 \\times 10^{20}\\text{ J/kg} | Cryogenic ^3\\text{He} scarcity (Jovian mining or lunar regolith), 250\\text{ Hz} electron/laser driver efficiency, X-ray first-wall lifetime. |
| **Antimatter Beam-Core Pion (p\\text{-}\\bar{p})** | 1.77 \\times 10^7\\text{ s} – 2.11 \\times 10^7\\text{ s} | 0.58c – 0.69c | 1.189 (0.58c) / 1.157 (0.69c) | 2.578 (0.58c) / 2.217 (0.69c) | 1.41 \\times 10^{16}\\text{ J/kg} | 1.10 \\times 10^{17}\\text{ J/kg} | 200\\text{ MeV} gamma-ray heat load from \\pi^0 \\to 2\\gamma (33% of energy), cryogenic \\bar{\\text{H}}\_2 diamagnetic Penning/Ioffe trap stability, \>50\\text{ T} superconducting magnetic nozzle. |
| **Beamed-Energy Laser Light Sail (Starshot Scale-Up)** | \\infty (External Propellantless) | 1.00c (Photon Reflection) | 1.00 (No onboard fuel) | 1.00 (No onboard fuel) | 9.95 \\times 10^{15}\\text{ J/kg} (Beam energy at \\mathcal{R}=0.9999) | 3.11 \\times 10^{17}\\text{ J/kg} (Beam energy at \\mathcal{R}=0.9999) | Dielectric Bragg mirror absorptivity (1 \- \\mathcal{R} \\le 10^{-5}) to prevent sail vaporization, Rayleigh diffraction aperture D\_{\\text{tx}} \\sim 10^2 \- 10^3\\text{ km}, relativistic Doppler shift detuning. |
| **Alcubierre / White-Juday Oscillating Metric** | N/A (Metric Expansion/Contraction) | Apparent v\_s \\lessgtr c | 1.00 (Field-driven) | 1.00 (Field-driven) | \\sim \-10^{64}\\text{ J} (Classic) to \\sim \-3.0 \\times 10^{44}\\text{ J} (White Torus, \\sim 700\\text{ kg } c^2 per 10\\text{ m} bubble) | Scales as v\_s^2: \\sim \-7.5 \\times 10^{45}\\text{ J} | Requires macroscopic Hawking-Ellis Type I/IV negative energy density (\\rho \< 0, violating WEC/NEC/DEC), quantum inequalities limit negative-energy pulse duration, horizon formation at v\_s \\ge c. |
| **Bobrick-Martire / Fuchs-Helmerich Physical Warp Shell** | N/A (Shift Vector inside Positive-Mass Shell) | Subluminal (v\_s \< c) | 1.00 (Inertial Coast); Radiative Bondi mass loss for acceleration | 1.00 (Inertial Coast); Radiative Bondi mass loss for acceleration | E\_{\\text{shell}} \= M\_{\\text{ADM}} c^2 \\sim 10^{44} \- 10^{47}\\text{ J} (\\sim 0.01 M\_{\\text{Jup}} c^2 to M\_\\odot c^2 independent of payload kg) | E\_{\\text{shell}} \\sim 10^{44} \- 10^{47}\\text{ J}; Steering requires Bondi flux \-\\dot{m}\_B \\ge 3 m\_B \\vert{}a\\vert{} | Satisfies all energy conditions (\\rho \> 0), but requires compressing planetary-to-stellar mass densities (\\sim 10^{16}\\text{ kg/m}^3) into a 10\\text{ m}\[span\_315\](start\_span)\[span\_315\](end\_span)\[span\_318\](start\_span)\[span\_318\](end\_span) shell, plus photon-rocket Bondi radiation for acceleration. |

### **Deep-Dive Engineering Analysis of Propulsion Regimes**
