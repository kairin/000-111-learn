# Physics state machine and solver handoff

- Unit: `astrophysics-kernels-u14`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `81856:86823`
- Lines: `305:325`
- Purposes: claim-review, learning
- Excerpt SHA-256: `2c73ed82f6d2e27ab0ffee127fc15adef99ddb44e2ac3e903257579a8d99c8d3`

This unit selects solver regimes by compactness and velocity, then proposes force blending, clock integration, and PN corrections.

## Claims

### `astrophysics-kernels-u14-c01`

The listed hard thresholds and Chambers-style force blend give a mathematically valid transition between local, N-body, and relativistic solvers.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction, calculation, logical-analysis.

Evidence needed: Reference trajectories and invariant/error comparisons across each switching overlap.

Assumptions:
- The thresholds meet a declared error budget and the blended forces derive from a compatible model. (`inferred`)

### `astrophysics-kernels-u14-c02`

The displayed proper-clock relation has the correct sign and force-frame interpretation for the stated gravitational potential and thrust inputs.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, logical-analysis.

Evidence needed: Weak-field and special-relativistic limiting-case derivations with explicit force types.

Assumptions:
- The potential sign convention and force frame are defined consistently. (`inferred`)

### `astrophysics-kernels-u14-c03`

The beta thresholds and compactness triggers in the state table select solvers within an acceptable error budget.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: Declared tolerance and reference-solver error curves.

### `astrophysics-kernels-u14-c04`

The stated coordinate-acceleration formula correctly converts the named proper thrust and ISM drag inputs.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, logical-analysis.

Evidence needed: Four-force and coordinate-three-force derivation with transverse and collinear tests.

### `astrophysics-kernels-u14-c05`

The displayed proper-clock equation has the correct weak-field sign convention.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, logical-analysis.

Evidence needed: Minkowski and weak-field static-clock limit checks.

## Learning goals

### `astrophysics-kernels-u14-g01`: Multiphysics handoffs

Specify solver transitions with common variables, frames, invariants, and an error budget.

Prerequisites: Hamiltonian mechanics, Special relativity, Numerical error analysis

Claim dependencies: `astrophysics-kernels-u14-c01`, `astrophysics-kernels-u14-c02`

## Exact source excerpt

### **Multi-Regime Physics State-Machine and Mathematical Handoff**

Rather than attempting to solve the Einstein Field Equations at 1-meter resolution across light-years, the simulation engine operates as a multi-scale domain-decomposition state machine that dynamically switches mathematical formulations based on two dimensionless physical invariants: the **gravitational compactness parameter** \\chi\_g \= \\frac{G M}{r c^2} (and tidal perturbation ratio \\eta\_{\\text{tidal}} \= \\frac{\\Vert{}\\mathbf{a}\_{\\text{3rd-body}}\\Vert{}}{\\Vert{}\\mathbf{a}\_{\\text{primary}}\\Vert{}}) and the **Lorentz kinetic parameter** \\gamma \- 1 \= (1 \- \\beta^2)^{-1/2} \- 1:

| Regime State | Activation Trigger | Governing Mathematical Solver | Coordinate Frame & Time Variable |
| :---- | :---- | :---- | :---- |
| **1\. Planetary / Cislunar Maneuvering** | r \< R\_{\\text{SOI}} and \\beta \< 10^{-3} | FAT Fehlberg RK7(8) / RK8(9) or DDEAB\[span\_342\](start\_span)\[span\_342\](end\_span)\[span\_343\](start\_span)\[span\_343\](end\_span)\[span\_344\](start\_span)\[span\_344\](end\_span)\[span\_345\](start\_span)\[span\_345\](end\_span)M with spherical harmonics, drag, and Brent event-finding; KS regularization if r \\to 0 | Primary body-centered inertial frame (real64), coordinate time t \\approx \\tau |
| **2\. Interplanetary / Multi-Body System** | R\_{\\text{SOI}} \\le r \\le R\_{\\text{Hill,sys}} and \\beta \< 0.01 | Mercury Hybrid Symplectic Wisdom-Holman \+ Chambers switching function K(r\_{ij}/3R\_{\\text{Hill}}) \+ Phantom-GRAPE AVX-512 | Democratic Heliocentric (\\mathbf{Q}\_i, \\mathbf{P}\_i) (real64), barycentric coordinate time t |
| **3\. Relativistic Interstellar Transit** | r \> R\_{\\text{Hill,sys}} and \\beta \\ge 0.01 (\\gamma \- 1 \\ge 5 \\times 10^{-5}) | Relativistic four-momentum ODE \\frac{d(\\gamma M \\mathbf{v})}{d\\tau} \= \\gamma\\mathbf{F}\_{\\text{thrust}} \+ \\mathbf{F}\_{\\text{drag,ISM}} \+ \\mathbf{F}\_{\\te\[span\_349\](start\_span)\[span\_349\](end\_span)\[span\_350\](start\_span)\[span\_350\](end\_span)\[span\_351\](start\_span)\[span\_351\](end\_span)xt{MS}} with ablation \\dot{\\sigma}\_{\\text{abl}} and Bremsstrahlung \\Phi\_{\\text{brem}} | 128-bit Galactic Sector \+ Vessel Floating Origin; dual time integration \\frac{dt}{d\\tau} \= \\gamma(\\tau) |
| **4\. Exotic Metric / Warp Bubble Transit** | Active Shift/Lapse Metric (g\_{\\mu\\nu} \\neq \\eta\_{\\mu\\nu}) | WarpFactory / warpax local 4D ADM grid \+ Tsitouras 5(4) / RK7(8) Geodesic & Tidal Deviation integrator | Co-moving Eulerian Bubble Grid (1m spacing around Floating Origin) \+ Bondi-Sachs flux coupling |

#### **Mathematical Handoff Between Patched/N-Body Orbits and Relativistic Cruise**

Unlike simplistic patched-conics approximations that suffer discontinuous velocity jumps at arbitrary spheres of influence (SOI), a hard-science backend executes a smooth **Chambers-style Hamiltonian / Force Blend** across the boundary r \\in \[R\_{\\text{inner}}, R\_{\\text{outer}}\] when transitioning between Regime 1 (local primary \+ high-order geopotential), Regime 2 (solar system N-body), and Regime 3 (relativistic interstellar cruise):  
\\mathbf{a}\_{\\text{coord}}(t, \\mathbf{r}, \\mathbf{v}) \= \\frac{1}{\\gamma}\\left\[ \\frac{\\mathbf{F}\_{\\text{prop}} \+ \\mathbf{F}\_{\\text{ISM}}}{M(\\tau)} \- \\frac{\\beta^2}{v^2}\\left(\\frac{\\mathbf{F}\_{\\text{prop}} \+ \\mathbf{F}\_{\\text{ISM}}}{M(\\tau)} \\cdot \\mathbf{v}\\right)\\mathbf{v} \\right\] \+ \\sum\_{k} \\mathbf{a}\_{\\text{grav},k}(\\mathbf{r}) \+ \\mathbf{a}\_{\\text{1PN}}(\\mathbf{r}, \\mathbf{v})  
where the first term is the exact special-relativistic transformation of proper thrust and ISM drag into coordinate acceleration (reducing cleanly to \\alpha / \\gamma^3 for collinear motion), \\sum\_k \\mathbf{a}\_{\\text{grav},k} is the Newtonian N-body acceleration evaluated via Phantom-GRAPE, and \\mathbf{a}\_{\\text{1PN}} is the Einstein-Infeld-Hoffmann 1st Post-Newtonian correction for close stellar flybys:  
\\mathbf{a}\_{\\text{1PN}} \= \\frac{G M\_\\star}{r^3 c^2}\\left\[ \\left(\\frac{4 G M\_\\star}{r} \- v^2\\right)\\mathbf{r} \+ 4(\\mathbf{r} \\cdot \\mathbf{v})\\mathbf{v} \\right\]  
Simultaneously, the engine integrates the ship's proper clock \\tau alongside galactic coordinate time t via the coupled state variable:  
\\frac{d\\tau}{dt} \= \\sqrt{1 \-\[span\_34\](start\_span)\[span\_34\](end\_span)\[span\_39\](start\_span)\[span\_39\](end\_span) \\frac{v^2}{c^2} \- \\frac{2\\Phi\_{\\text{grav}}(\\mathbf{r})}{c^2}} \\qquad \\text{or} \\qquad \\frac{dt}{d\\tau} \= \\left(1 \- \\frac{v^2}{c^2} \- \\frac{2\\Phi\_{\\text{grav}}(\\mathbf{r})}{c^2}\\right)^{-1/2}  
When the player accelerates to relativistic cruise (\\beta \\to 0.5c), onboard ship systems step by \\Delta \\tau, while galactic ephemerides advance by \\Delta t \= \\gamma \\Delta \\tau, naturally manifesting relativistic time dilation without numerical stiffness.
