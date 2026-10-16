# Einstein Toolkit ADM and BSSN/CCZ4 evolution

- Unit: `astrophysics-kernels-u07`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `28949:35746`
- Lines: `102:124`
- Purposes: claim-review, learning
- Excerpt SHA-256: `9d1bf61148d3ec08b8bb3513e257ac1630d644d4b68432cf5128b3a0f11ea985`

This unit introduces 3+1 decomposition, BSSN/CCZ4 evolution, gauge choices, and Kranc-generated kernels.

## Claims

### `astrophysics-kernels-u07-c01`

The Einstein Toolkit supplies the described ADM, BSSN/CCZ4, McLachlan, and Kranc numerical-relativity components.

Type: `software`. Status: `unchecked`. Priority: `medium`.

Review methods: primary-source, code-inspection.

Evidence needed: Release documentation and thorn source for the claimed formulations and generated kernels.

Assumptions:
- The component description is tied to a particular Toolkit release. (`inferred`)

### `astrophysics-kernels-u07-c02`

The ADM 3+1 decomposition expresses spacetime in lapse, shift, spatial metric, and extrinsic-curvature variables.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: calculation, definition-check.

Evidence needed: A derivation from the 3+1 metric decomposition and variable definitions.

Assumptions:
- A globally hyperbolic foliation and stated sign conventions are used. (`inferred`)

### `astrophysics-kernels-u07-c03`

BSSN introduces conformal variables and algebraic constraints to improve ADM numerical evolution.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: A formulation derivation and constraint-convergence comparison with ADM.

Assumptions:
- The conformal determinant and trace constraints are enforced as specified. (`inferred`)

### `astrophysics-kernels-u07-c04`

CCZ4 adds constraint damping and the stated gauge choices to the BSSN-style evolution system.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: CCZ4 equations, gauge parameters, and constraint-norm convergence data.

Assumptions:
- The damping parameters and gauge equations are fixed for the test. (`inferred`)

### `astrophysics-kernels-u07-c05`

McLachlan and Kranc provide the stated generated numerical-relativity kernels in the Einstein Toolkit.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: A pinned Einstein Toolkit release, thorn metadata, and generated-source inspection.

Assumptions:
- The claimed thorns and generated code are present in the selected Toolkit release. (`inferred`)

## Learning goals

### `astrophysics-kernels-u07-g01`: Numerical relativity

Relate ADM variables to BSSN/CCZ4 evolution and gauge conditions.

Prerequisites: Differential geometry, Partial differential equations

Claim dependencies: `astrophysics-kernels-u07-c01`

## Exact source excerpt

## **3\. Exotic Physics and Numerical Relativity Codebases**

Simulating relativistic spacecraft metrics, strong-field gravitational lensing, or speculative warp geometries requires transitioning from Newtonian potentials \\nabla^2 \\Phi \= 4\\pi G \\rho to the full nonlinear Einstein Field Equations (EFE), G\_{\\mu\\nu} \= \\frac{8\\pi G}{c^4} T\_{\\mu\\nu}. Two open-source paradigms dominate this domain: forward-in-time hyperbolic Cauchy evolution (Einstein Toolkit) and inverse metric-to-stress-energy algebraic/stencil evaluation (WarpFactory and warpax).

### **The Einstein Toolkit: ADM Foliation, BSSN/CCZ4 Evolution, and Kranc Vectorization**

Built atop the Cactus computational framework and the Carpet adaptive mesh refinement (AMR) driver, the Einstein Toolkit provides a modular suite of C, C++, and Fortran 90 "thorns" for evolving dynamical spacetimes coupled to relativistic magnetohydrodynamics (GRHydro, IllinoisGRMHD).

#### **The 3+1 ADM Decomposition (ADMBase)**

To cast the 4D covariant Einstein equations as an initial-value Cauchy problem, the Arnowitt-Deser-Misner (ADM) formalism foliates the 4D manifold (\\mathcal{M}, g\_{\\mu\\nu}) into spacelike 3D hypersurfaces \\Sigma\_t parameterized by global coordinate time t. The spacetime line element is decomposed into the lapse function \\alpha (measuring proper time d\\tau \= \\alpha\\,dt along the future-directed unit normal n^\\mu \= (\\alpha^{-1}, \-\\alpha^{-1}\\beta^i)), the spatial shift vector \\beta^i (measuring how spatial coordinates shift relative to normal observers), and the induced 3-metric \\gamma\_{ij} \= g\_{ij}:  
ds^2 \= g\_{\\mu\\nu}dx^\\mu dx^\\nu \= \-\\left(\\alpha^2 \- \\beta\_i \\beta^i\\right)dt^2 \+ 2\\beta\_i dx^i dt \+ \\gamma\_{ij}dx^i dx^j  
where \\beta\_i \= \\gamma\_{ij}\\beta^j. Embedding \\Sigma\_t into \\mathcal{M} defines the symmetric extrinsic curvature tensor K\_{ij} \= \-\\frac{1}{2}\\mathcal{L}\_{\\mathbf{n}}\\gamma\_{ij} \= \\frac{1}{2\\alpha}\\left(-\\partial\_t \\gamma\_{ij} \+ D\_i \\beta\_j \+ D\_j \\beta\_i\\right), where D\_i is the 3D Levi-Civita covariant derivative associated with \\gamma\_{ij}. In the Einstein Toolkit, the thorn ADMBase registers the 3D grid functions for \\gamma\_{ij}, K\_{ij}, \\alpha, and \\beta^i, while TmunuBase registers the 10 independent components of the stress-energy tensor T\_{\\mu\\nu}, serving as the universal data-exchange bus across all physics modules.

#### **The BSSN and CCZ4 Formalisms (McLachlan)**

Direct numerical integration of the ADM evolution equations fails rapidly in 3D because the ADM system is only weakly hyperbolic, causing unphysical high-frequency constraint violations to grow exponentially. The toolkit's primary evolution thorn, McLachlan (ML\_BSSN and ML\_CCZ4), implements the strongly hyperbolic Baumgarte-Shapiro-Shibata-Nakamura (BSSN) conformal decomposition. BSSN replaces the 12 ADM variables (\\gamma\_{ij}, K\_{ij}) with 17 evolved conformal variables (\\phi, \\tilde{\\gamma}\_{ij}, K, \\tilde{A}\_{ij}, \\tilde{\\Gamma}^i):  
\\phi \= \\frac{1}{12}\\ln(\\det\\gamma\_{ij}) \\qua\[span\_188\](start\_span)\[span\_188\](end\_span)d \\left(\\text{or } W \= (\\det\\gamma\_{ij})^{-1/6} \= e^{-2\\phi}\\right), \\qquad \\tilde{\\gamma}\_{ij} \= e^{-4\\phi}\\gamma\_{ij} K \= \\gamma^{ij}K\_{ij}, \\qquad \\tilde{A}\_{ij} \= e^{-4\\phi}\\left(K\_{ij} \- \\frac{1}{3}\\gamma\_{ij}K\\right), \\qquad \\tilde{\\Gamma}^i \= \\tilde{\\gamma}^{jk}\\tilde{\\Gamma}^i\_{jk} \= \-\\partial\_j \\tilde{\\gamma}^{ij}  
subject to the algebraic constraints \\det\\tilde{\\gamma}\_{ij} \= 1 and \\tilde{\\gamma}^{ij}\\tilde{A}\_{ij} \= 0\. Defining the matter projections onto \\Sigma\_t as the Eulerian energy density \\rho\_{\\text{ADM}} \= n^\\mu n^\\nu T\_{\\mu\\nu}, momentum density S\_i \= \-\\gamma\_{i\\mu}n^\\nu T^{\\mu}\_{\\nu}, and spatial stress tensor S\_{ij} \= \\gamma\_{i\\mu}\\gamma\_{j\\nu}T^{\\mu\\nu} (with trace S \= \\gamma^{ij}S\_{ij}), the BSSN evolution system takes the form:  
\\left(\\partial\_t \- \\mathcal{L}\_{\\boldsymbol{\\beta}}\\right)\\phi \= \-\\frac{1}{6}\\alpha K \\left(\\partial\_t \- \\mathcal{L}\_{\\boldsymbol{\\beta}}\\right)\\tilde{\\gamma}\_{ij} \= \-2\\alpha \\tilde{A}\_{ij} \\left(\\partial\_t \- \\mathcal{L}\_{\\boldsymbol{\\beta}}\\right)K \= \-\\gamma^{ij}D\_i D\_j \\alpha \+ \\alpha\\left(\\tilde{A}\_{ij}\\tilde{A}^{ij} \+ \\frac{1}{3}K^2\\right) \+ 4\\pi\\alpha\\left(\\rho\_{\\text{ADM}} \+ S\\right) \\left(\\partial\_t \- \\mathcal{L}\_{\\boldsymbol{\\beta}}\\right)\\tilde{A}\_{ij} \= e^{-4\\phi}\\left\[-D\_i D\_j \\alpha \+ \\alpha\\left(R\_{ij} \- 8\\pi S\_{ij}\\right)\\right\]^{\\text{TF}} \+ \\alpha\\left(K\\tilde{A}\_{ij} \- 2\\tilde{A}\_{ik}\\tilde{A}^k\_j\\right) \\partial\_t \\tilde{\\Gamma}^i \= \\tilde{\\gamma}^{jk}\\partial\_j \\partial\_k \\beta^i \+ \\frac{1}{3}\\tilde{\\gamma}^{ij}\\partial\_j \\partial\_k \\beta^k \+ \\beta^j \\partial\_j \\tilde{\\Gamma}^i \- \\tilde{\\Gamma}^j \\partial\_j \\beta^i \+ \\frac{2}{3}\\tilde{\\Gamma}^i \\partial\_j \\beta^j \- 2\\tilde{A}^{ij}\\partial\_j \\alpha \+ 2\\alpha\\left(\\tilde{\\Gamma}^i\_{jk}\\tilde{A}^{jk} \- \\frac{2}{3}\\tilde{\\gamma}^{ij}\\partial\_j K \+ 6\\tilde{A}^{ij}\\partial\_j\\phi \- 8\\pi\\tilde{\\gamma}^{ij}S\_j\\right)  
where \[\\cdot\]^{\\text{TF}} denotes the trace-free part with respect to \\gamma\_{ij}, and the 3-Ricci tensor R\_{ij} \= \\tilde{R}\_{ij} \+ R^\\phi\_{ij} has its principal elliptic second-derivative operator \\tilde{\\gamma}^{lm}\\partial\_l\\partial\_m \\tilde{\\gamma}\_{ij} cleanly isolated via \\partial\_j \\tilde{\\Gamma}^i, rendering the PDE system strongly hyperbolic when paired with 1+\\log Bona-Massó slicing (\\partial\_t \\alpha \- \\beta^i\\partial\_i\\alpha \= \-2\\alpha K) and the \\Gamma-driver shift condition. Furthermore, ML\_CCZ4 implements the Conformal and Covariant Z4 formulation, which augments the Einstein equations with a 4-vector constraint-damping field Z\_\\mu (with normal projection \\Theta \= \-n^\\mu Z\_\\mu) that actively propagates and exponentially damps numerical violations of the Hamiltonian (\\mathcal{H}) and momentum (\\mathcal{M}\_i) constraints.  
All McLachlan C++/Fortran thorns are automatically synthesized from high-level Mathematica tensor scripts by Kranc. Kranc expands tensor contractions into explicit 3D grid loops, applies up to 8th-order centered finite-difference stencils for spatial derivatives, inserts upwinded one-sided stencils for shift advection (\\beta^i\\partial\_i), adds 5th-, 7th-, or 9th-order Kreiss-Oliger numerical dissipation to suppress grid-scale Nyquist noise, and wraps arithmetic operations in the Vectors thorn macro layer, which emits native AVX2/AVX-512 SIMD instructions optimized to fit within 32 KB L1 instruction caches.
