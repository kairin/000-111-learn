# Warp metric derivative tooling

- Unit: `astrophysics-kernels-u08`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `35746:39716`
- Lines: `125:138`
- Purposes: claim-review, learning
- Excerpt SHA-256: `4152de1f9205574cb210d20dc8bfd14a03852c58692ae408e1dd6f8b8f3adb07`

Finite-difference and automatic-differentiation stress-energy tooling.

## Claims

### `astrophysics-kernels-u08-c02`

WarpFactory obtains metric derivatives with finite differences while warpax uses forward-mode automatic differentiation as described.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: Versioned implementation and derivative-convergence tests.

## Learning goals

### `astrophysics-kernels-u08-g01`: Stress-energy diagnostics

Compute energy-condition margins from a metric and state the observer and sampling measure.

Prerequisites: General relativity, Linear algebra

Claim dependencies: `astrophysics-kernels-u08-c02`

## Exact source excerpt

### **WarpFactory and Warpax: Metric Discretization, Stress-Energy Evaluation, and Energy Conditions**

While the Einstein Toolkit evolves initial data forward in time, designing and testing exotic propulsion metrics (such as Alcubierre, Natário, Van Den Broeck, Lentz, or Fuchs-Helmerich warp shells) follows the *reverse* mathematical workflow: specifying a desired spacetime geometry g\_{\\mu\\nu}(t, x, y, z) that transports a passenger volume and solving the Einstein equations algebraically for the required stress-energy tensor T\_{\\mu\\nu} to evaluate its physicality. This reverse pipeline is implemented in WarpFactory (developed by Jared Fuchs, Christopher Helmerich, et al. at Applied Physics) and its modern JAX-based automatic-differentiation successor warpax.

#### **Grid Discretization vs. Forward-Mode Automatic Differentiation**

In WarpFactory, the 10 independent components of the covariant metric g\_{\\mu\\nu} (enforcing Minkowskian signature (-,+,+,+)) are sampled across a 4D Cartesian spacetime grid (t\_i, x\_j, y\_k, z\_l), typically using a 1\\text{-meter} spatial grid spacing. First and second partial derivatives (\\partial\_\\alpha g\_{\\mu\\nu} and \\partial\_\\alpha \\partial\_\\beta g\_{\\mu\\nu}) are evaluated across all interior points using 4th-order central finite-difference stencils (cropping two boundary ghost zones on each face):  
\\frac{\\partial g\_{\\mu\\nu}}{\\partial x^\\alpha} \\approx \\frac{-g\_{\\mu\\nu}(x^\\alpha \+ 2\\Delta x^\\alpha) \+ 8g\_{\\mu\\nu}(x^\\alpha \+ \\Delta x^\\alpha) \- 8g\_{\\mu\\nu}(x^\\alpha \- \\Delta x^\\alpha) \+ g\_{\\mu\\nu}(x^\\alpha \- 2\\Delta x^\\alpha)}{12\\Delta x^\\alpha}  
Rather than constructing Christoffel symbols \\Gamma^\\lambda\_{\\mu\\nu} and differentiating them numerically a second time (which compounds stencil truncation error), WarpFactory expands the Ricci tensor R\_{\\mu\\nu} directly in terms of first and second metric derivatives and the inverse metric g^{\\alpha\\beta}:  
R\_{\\mu\\nu} \= \-\\frac{1}{2}\\sum\_{\\alpha,\\beta=0}^{3}\\left(\\frac{\\partial^2 g\_{\\mu\\nu}}{\\partial x^\\alpha \\partial x^\\beta} \+ \\frac{\\partial^2 g\_{\\alpha\\beta}}{\\partial x^\\mu \\partial x^\\nu} \- \\frac{\\partial^2 g\_{\\mu\\beta}}{\\partial x^\\nu \\partial x^\\alpha} \- \\frac{\\partial^2 g\_{\\nu\\beta}}{\\partial x^\\mu \\partial x^\\alpha}\\right)g^{\\alpha\\beta} \+ \\frac{1}{2}\\sum\_{\\alpha,\\beta,\\gamma,\\delta=0}^{3}\\left(\\frac{1}{2}\\frac{\\partial g\_{\\alpha\\gamma}}{\\partial x^\\mu}\\frac{\\partial g\_{\\beta\\delta}}{\\partial x^\\nu} \+ \\frac{\\partial g\_{\\mu\\gamma}}{\\partial x^\\alpha}\\frac{\\partial g\_{\\nu\\delta}}{\\partial x^\\beta} \- \\frac{\\partial g\_{\\mu\\gamma}}{\\partial x^\\alpha}\\frac{\\partial g\_{\\nu\\beta}}{\\partial x^\\delta}\\right)g^{\\alpha\\beta}g^{\\gamma\\delta} \- \\frac{1}{4}\\sum\_{\\alpha,\\beta,\\gamma,\\delta=0}^{3}\\frac{\\partial g\_{\\gamma\\delta}}{\\partial x^\\alpha}\\left(\\frac{\\partial g\_{\\mu\\nu}}{\\partial x^\\beta} \- \\frac{\\partial g\_{\\mu\\beta}}{\\partial x^\\nu} \- \\frac{\\partial g\_{\\nu\\beta}}{\\partial x^\\mu}\\right)g^{\\alpha\\beta}g^{\\gamma\\delta}  
Contracting R \= g^{\\mu\\nu}R\_{\\mu\\nu} yields the stress-energy tensor directly via the inverse Einstein equation:  
T\_{\\mu\\nu} \= \\frac{c^4}{8\\pi G}\\left(R\_{\\mu\\nu} \- \\frac{1}{2}R g\_{\\mu\\nu}\\right)  
By the contracted Bianchi identities (\\nabla^\\nu G\_{\\mu\\nu} \\equiv 0), any C^2-continuous metric evaluated through this pipeline automatically satisfies covariant stress-energy conservation \\nabla^\\nu T\_{\\mu\\nu} \= 0 up to the truncation order of the finite-difference stencil. In warpax, this finite-difference stencil is replaced by exact nested forward-mode Jacobian-vector products (jax.jacfwd) in 64-bit precision, completely eliminating stencil truncation errors and preventing numerical noise from corrupting eigenvalue degeneracies near bubble walls.
