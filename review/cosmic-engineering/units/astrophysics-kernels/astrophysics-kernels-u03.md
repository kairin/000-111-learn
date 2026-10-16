# Hermite integration and block timesteps

- Unit: `astrophysics-kernels-u03`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `7056:11103`
- Lines: `24:41`
- Purposes: claim-review, learning
- Excerpt SHA-256: `649b30cfdd5a8ad01586eef4e253997dde5af975d8a911c69b10a0d01724584e`

Hermite predictor-corrector equations and hierarchical timestep selection.

## Claims

### `astrophysics-kernels-u03-c06`

The fourth-order Hermite method uses analytically evaluated acceleration and jerk in its predictor-corrector update.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: A derivation of the predictor-corrector coefficients and order-convergence results.

Assumptions:
- Pairwise gravitational acceleration is differentiable over the integration step. (`inferred`)

### `astrophysics-kernels-u03-c07`

The stated block-step scheme rounds individual timesteps to power-of-two levels after applying an Aarseth derivative criterion.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, code-inspection.

Evidence needed: The timestep-selection implementation and a logged block-step test.

Assumptions:
- The timestep parameter and derivative estimates are defined for the simulated system. (`inferred`)

## Learning goals

### `astrophysics-kernels-u03-g01`: Collisional N-body methods

Derive why jerk-based Hermite steps and regularization address close binary time scales.

Prerequisites: Newtonian gravity, Taylor methods

Claim dependencies: `astrophysics-kernels-u03-c06`

## Exact source excerpt

### **NBODY6++GPU: Hermite Schemes, Ahmad-Cohen Splitting, and Kustaanheimo-Stiefel Regularization**

Initiated by Sverre Aarseth and scaled to heterogeneous supercomputers by Spurzem, Nitadori, Wang, and Kamlah, NBODY6++GPU is the premier direct collisional N-body code for evolving million-body star clusters with stellar evolution (SSE/BSE) and relativistic black hole binaries. Because collisional gravitational systems exhibit extreme dynamic ranges—spanning cluster-wide crossing times of megayears down to compact binary orbits of minutes—symplectic fixed-step methods fail. NBODY6++GPU addresses this via a three-tier mathematical architecture: a 4th-order Hermite predictor-corrector integrator with hierarchical block time-steps, the Ahmad-Cohen (AC) neighbor scheme, and Kustaanheimo-Stiefel (KS) plus Mikkola-Aarseth chain regularization.

#### **Fourth-Order Hermite Integration and Block Time-Steps**

Unlike standard multi-step methods that require storing long histories of past force evaluations, the 4th-order Hermite scheme (Makino & Aarseth) computes both the gravitational acceleration \\mathbf{a}\_i and its first time derivative, the jerk \\mathbf{j}\_i \= \\dot{\\mathbf{a}}\_i, analytically at every force evaluation:  
\\mathbf{a}\_i \= \\sum\_{j \\neq i} G m\_j \\frac{\\mathbf{r}\_{ij}}{r\_{ij}^3}, \\qquad \\mathbf{j}\_i \= \\dot{\\mathbf{a}}\_i \= \\sum\_{j \\neq i} G m\_j \\left( \\frac{\\mathbf{v}\_{ij}}{r\_{ij}^3} \- 3 \\frac{(\\mathbf{r}\_{ij} \\cdot \\mathbf{v}\_{ij})\\mathbf{r}\_{ij}}{r\_{ij}^5} \\right)  
where \\mathbf{r}\_{ij} \= \\mathbf{r}\_j \- \\mathbf{r}\_i and \\mathbf{v}\_{ij} \= \\mathbf{v}\_j \- \\mathbf{v}\_i. For a particle i advancing from t\_0 to t\_1 \= t\_0 \+ \\Delta t\_i, all active particles are first predicted to time t\_1 via a 3rd-order Taylor polynomial:  
\\mathbf{r}\_{i,\\text{pred}}(t\_1) \= \\mathbf{r}\_i(t\_0) \+ \\mathbf{v}\_i(t\_0)\\Delta t\_i \+ \\frac{1}{2}\\mathbf{a}\_i(t\_0)\\Delta t\_i^2 \+ \\frac{1}{6}\\mathbf{j}\_i(t\_0)\\Delta t\_i^3 \\mathbf{v}\_{i,\\text{pred}}(t\_1) \= \\mathbf{v}\_i(t\_0) \+ \\mathbf{a}\_i(t\_0)\\Delta t\_i \+ \\frac{1}{2}\\mathbf{j}\_i(t\_0)\\Delta t\_i^2  
Using the predicted coordinates (\\mathbf{r}\_{\\text{pred}}, \\mathbf{v}\_{\\text{pred}}), the new acceleration \\mathbf{a}\_i(t\_1) and jerk \\mathbf{j}\_i(t\_1) are evaluated. By Hermite interpolation between t\_0 and t\_1, the second and third derivatives of acceleration (\\mathbf{a}\_i^{(2)} \= \\ddot{\\mathbf{a}}\_i and \\mathbf{a}\_i^{(3)} \= \\dddot{\\mathbf{a}}\_i) at t\_0 are reconstructed without additional force calls:  
\\mathbf{a}\_i^{(2)}(t\_0) \= \\frac{-6\\big\[\\mathbf{a}\_i(t\_0) \- \\mathbf{a}\_i(t\_1)\\big\] \- \\Delta t\_i\\big\[4\\mathbf{j}\_i(t\_0) \+ 2\\mathbf{j}\_i(t\_1)\\big\]}{\\Delta t\_i^2} \\mathbf{a}\_i^{(3)}(t\_0) \= \\frac{12\\big\[\\mathbf{a}\_i(t\_0) \- \\mathbf{a}\_i(t\_1)\\big\] \+ 6\\Delta t\_i\\big\[\\mathbf{j}\_i(t\_0) \+ \\mathbf{j}\_i(t\_1)\\big\]}{\\Delta t\_i^3}  
These higher derivatives furnish the 4th-order corrector step:  
\\mathbf{r}\_i(t\_1) \= \\mathbf{r}\_{i,\\text{pred}}(t\_1) \+ \\frac{1}{24}\\mathbf{a}\_i^{(2)}(t\_0)\\Delta t\_i^4 \+ \\frac{1}{120}\\mathbf{a}\_i^{(3)}(t\_0)\\Delta t\_i^5 \\mathbf{v}\_i(t\_1) \= \\mathbf{v}\_{i,\\text{pred}}(t\_1) \+ \\frac{1}{6}\\mathbf{a}\_i^{(2)}(t\_0)\\Delta t\_i^3 \+ \\frac{1}{24}\\mathbf{a}\_i^{(3)}(t\_0)\\Delta t\_i^4  
To synchronize memory accesses across vector pipelines and GPUs, individual particle time-steps are quantized into hierarchical power-of-two levels l, such that \\Delta t\_l \= \\Delta t\_1 / 2^{l-1}. The continuous step estimate is determined by Aarseth's relative derivative criterion:  
\\Delta t\_i \= \\sqrt{\\eta \\frac{\\|\\mathbf{a}\_i\\|\\,\\|\\mathbf{a}\_i^{(2)}\\| \+ \\|\\mathbf{j}\_i\\|^2}{\\|\\mathbf{j}\_i\\|\\,\\|\\mathbf{a}\_i^{(3)}\\| \+ \\|\\mathbf{a}\_i^{(2)}\\|^2}}  
where \\eta \\approx 0.01 \- 0.02 is a dimensionless accuracy parameter, and \\Delta t\_i is truncated downward to the nearest block step \\Delta t\_l.
