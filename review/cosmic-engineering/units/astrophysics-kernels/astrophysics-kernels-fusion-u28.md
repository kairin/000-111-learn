# Deuterium-helium-3 fusion propulsion

- Unit: `astrophysics-kernels-fusion-u28`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `71411:72703`
- Lines: `264:267`
- Purposes: claim-review, learning
- Excerpt SHA-256: `3efc53c916c62849545e0555e883fb8d4ad14af6304cf10e10133e36a1ecf492`

ICF fusion-drive claims.

## Claims

### `astrophysics-kernels-fusion-u28-c01`

The fusion row gives exhaust speed 0.03536c, mass ratio 17.08 to reach 0.1c, and mass ratio 5.59 × 10^6 to reach 0.5c.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate both mass ratios from the stated exhaust speed.

Assumptions:
- The row describes a flyby and uses the displayed rocket equation. (`explicit`)

### `astrophysics-kernels-fusion-u28-c02`

The source proposes a 250 Hz pellet-ignition cycle and reports an effective exhaust speed of 10,600 km/s for the fusion concept.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, calculation.

Evidence needed: Check the propulsion study and derive average thrust and exhaust speed from pellet parameters.

Assumptions:
- The cited pellet and nozzle assumptions apply. (`explicit`)

## Learning goals

### `astrophysics-kernels-fusion-u28-g01`: Computational physics

Calculate fusion exhaust speed, pulse-averaged thrust, and the two table mass ratios from the stated inputs.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-fusion-u28-c01`, `astrophysics-kernels-fusion-u28-c02`

## Exact source excerpt

#### **Deuterium-Helium-3 Inertial Confinement Fusion (Project Daedalus / Icarus)**

The British Interplanetary Society's Project Daedalus (and Project Icarus) utilizes aneutronic \\text{D} \+ {}^3\\text{He} \\to {}^4\\text{He}\\,(3.6\\text{ MeV}) \+ p\\,(14.7\\text{ MeV}) inertial confinement fusion pellets ignited at 250\\text{ Hz} by relativistic electron or laser beams inside an axisymmetric magnetic reaction chamber. Because both reaction products are charged particles (^4\\text{He}^{2+} and p^+), a superconducting magnetic nozzle redirects the expanding plasma shell into a collimated exhaust at v\_e \= 1.06 \\times 10^7\\text{ m/s} (0.03536c, I\_{sp} \= 1.081 \\times 10^6\\text{ s}). At this exhaust velocity, a 0.1c flyby requires a highly practical two-stage mass ratio of R \= 17.08 (investing 9.03 \\times 10^{14}\\text{ J} of fusion energy per kg of dry payload, calculated via \\frac{1}{2}(R \- 1)v\_e^2). However, attempting to push a \\text{D-}^3\\text{He} fusion vessel to 0.5c drives the required mass ratio to R \= 5.59 \\times 10^6. Side \\text{D-D} reactions within the fuel pellet still generate 2.45\\text{ MeV} neutrons that induce cryogenic coil embrittlement and require a beryllium/tungsten shadow shield between the reaction bowl and the propellant tanks.
