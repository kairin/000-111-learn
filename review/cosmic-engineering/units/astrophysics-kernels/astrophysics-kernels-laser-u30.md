# Laser-sail energy and Doppler relations

- Unit: `astrophysics-kernels-laser-u30`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `74370:76600`
- Lines: `272:279`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f2efa9254e3fbc753488e7adb77c56e6ebf503e39ff568ac17780be4782d2a8e`

Laser-sail energy and relativistic Doppler claims.

## Claims

### `astrophysics-kernels-u12-c03`

The displayed laser-sail Doppler energy equation produces the source table values.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, dimensional-analysis.

Evidence needed: Independent photon four-momentum calculation and substitution into the displayed equation.

## Learning goals

### `astrophysics-kernels-laser-u30-g01`: Computational physics

Derive the laser-sail Doppler energy relation and test whether it reproduces each table value.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-u12-c03`

## Exact source excerpt

#### **Beamed-Energy Laser Light Sails (Relativistic Doppler Equations)**

Beamed-energy propulsion leaves the power plant in the home star system, reflecting a phased-array laser beam of lab-frame power P\_0 off a dielectric Bragg sail of reflectivity \\mathcal{R} \\in (0, 1\] and rest mass M\_s. As the sail accelerates to velocity \\beta \= v/c, two relativistic effects degrade thrust: the incident photons are redshifted in the sail's rest frame by the relativistic Doppler factor D(\\beta) \= \\sqrt{\\frac{1 \- \\beta}{1 \+ \\beta}}, and the rate at which emitted photons catch up to the receding sail drops by (1 \- \\beta). Consequently, the proper force F\_{\\text{sail}} and coordinate acceleration dv/dt obey Kulkarni & Lubin's exact relativistic light-sail equation:  
F\_{\\text{sail}} \= M\_s \\gamma^3 \\frac{dv}{dt} \= \\frac{P\_0}{c}\\left\[(1 \+ \\mathcal{R})\\left(\\frac{1 \- \\beta}{1 \+ \\beta}\\right) \+ (1 \- \\mathcal{R})\\sqrt{\\frac{1 \- \\beta}{1 \+ \\beta}}\\right\] \\approx \\frac{2 \\mathcal{R} P\_0}{c}\\left(\\frac{1 \- \\beta}{1 \+ \\beta}\\right)  
Integrating dE\_{\\text{beam}} \= P\_0\\,dt \= \\frac{M\_s c^2}{2\\mathcal{R}} \\gamma^3 \\left(\\frac{1 \+ \\beta}{1 \- \\beta}\\right)\\beta\\,d\\beta from 0 to \\beta gives the exact total laser energy E\_{\\text{beam}} per kilogram of payload:  
\\frac{E\_{\\text{beam}}}{M\_s} \= \\frac{c^2}{2\\mathcal{R}}\\left\[ \\frac{\\gamma(1 \+ \\beta) \- 1}{1 \- \\beta} \- (\\gamma \- 1\) \\right\]  
For \\mathcal{R} \= 0.9999, accelerating 1\\text{ kg} to 0.1c requires 9.95 \\times 10^{15}\\text{ J/kg} of beamed light, while reaching 0.5c requires 3.11 \\times 10^{17}\\text{ J/kg}. Furthermore, because the sail absorbs a thermal power fraction (1 \- \\mathcal{R}) P\_0 \\left(\\frac{1 \- \\beta}{1 \+ \\beta}\\right) in its rest frame and must radiate it via Stefan-Boltzmann emission 2 A\_{\\text{sail}} \\epsilon\_{\\text{ir}} \\sigma\_{\\text{SB}} T\_{\\text{sail}}^4, maximum acceleration is strictly capped by dielectric melting temperature T\_{\\max} and shifting of the multilayer Bragg reflection band as the incident laser wavelength stretches by \\lambda\_{\\text{sail}} \= \\lambda\_0 \\sqrt{\\frac{1 \+ \\beta}{1 \- \\beta}}.
