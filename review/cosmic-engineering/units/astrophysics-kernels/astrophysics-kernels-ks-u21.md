# KS pair regularization

- Unit: `astrophysics-kernels-ks-u21`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `12169:14904`
- Lines: `48:57`
- Purposes: claim-review, learning
- Excerpt SHA-256: `04593a1fd2ac28293d381b32aa2ebb3fb8f91d0c7efa7f588cf9de6a1c316a68`

Sundman time and KS mapping for close pairs.

## Claims

### `astrophysics-kernels-u03-c10`

KS regularization replaces the two-body relative-coordinate singularity with Sundman time and a four-dimensional auxiliary variable.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: A KS transformation derivation and eccentric-binary stability test.

Assumptions:
- The close pair is modelled as point masses with a gravitational 1/r singularity. (`inferred`)

## Learning goals

### `astrophysics-kernels-ks-u21-g01`: Computational physics

Transform the two-body singularity with Sundman time and the four-dimensional KS variable, then test the collision limit.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-u03-c10`

## Exact source excerpt

#### **Kustaanheimo-Stiefel (KS) and Chain Regularization**

When two stars i, j approach within r\_{ij} \\ll R\_s and their two-body binding energy exceeds the local thermal energy, \\Delta t\_{\\text{irr}} \\propto r\_{ij}^{3/2} \\to 0 and numerical round-off destroys the integration. NBODY6++GPU replaces the individual Cartesian coordinates of the pair with their center-of-mass coordinates and regularizes the relative separation vector \\mathbf{r} \= (r\_1, r\_2, r\_3)^\\top via the Kustaanheimo-Stiefel (KS) transformation.  
First, the Sundman time transformation introduces a fictitious regularized time s defined by the differential relation:  
dt \= r\\,ds, \\qquad \\frac{d}{dt}(\\cdot) \= \\frac{1}{r}\\frac{d}{ds}(\\cdot) \= \\frac{1}{r}(\\cdot)'  
Because a 2D Levi-Civita complex square-root transformation (z \= u^2) does not generalize to 3D three-vectors (by Frobenius's theorem on normed division algebras), Kustaanheimo and Stiefel embedded the problem into four dimensions \\mathbb{R}^4 via the Hopf fibration S^1 \\hookrightarrow S^3 \\to S^2. Introducing the 4-vector spinor/quaternion \\mathbf{u} \= (u\_1, u\_2, u\_3, u\_4)^\\top \\in \\mathbb{R}^4, the 3D position extended to \\mathbb{R}^4 as \\mathbf{x} \= (r\_1, r\_2, r\_3, 0)^\\top is mapped via \\mathbf{x} \= \\mathbf{L}(\\mathbf{u})\\mathbf{u}, where the 4\\times 4 KS matrix \\mathbf{L}(\\mathbf{u}) is defined as:  
\\mathbf{L}(\\mathbf{u}) \= \\begin{bmatrix} u\_1 & \-u\_2 & \-u\_3 & u\_4 \\\\ u\_2 & u\_1 & \-u\_4 & \-u\_3 \\\\ u\_3 & u\_4 & u\_1 & u\_2 \\\\ u\_4 & \-u\_3 & u\_2 & \-u\_1 \\end{bmatrix}  
This yields the explicit coordinate relations:  
r\_1 \= u\_1^2 \- u\_2^2 \- u\_3^2 \+ u\_4^2, \\quad r\_2 \= 2(u\_1 u\_2 \- u\_3 u\_4), \\quad r\_3 \= 2(u\_1 u\_3 \+ u\_2 u\_4) r \= \\|\\mathbf{r}\\| \= u\_1^2 \+ u\_2^2 \+ u\_3^2 \+ u\_4^2 \= \\|\\mathbf{u}\\|^2  
The KS matrix is r-orthogonal, satisfying \\mathbf{L}^\\top(\\mathbf{u})\\mathbf{L}(\\mathbf{u}) \= r\\mathbf{I}\_4 and \\mathbf{L}^{-1}(\\mathbf{u}) \= \\frac{1}{r}\\mathbf{L}^\\top(\\mathbf{u}), and obeys the bilinear differential identity d\\mathbf{x} \= 2\\mathbf{L}(\\mathbf{u})d\\mathbf{u} (equivalent in quaternion algebra \\mathbf{u} \= u\_1 \+ i u\_2 \+ j u\_3 \+ k u\_4 to \\mathbf{r} \= \\mathbf{u}\\mathbf{u}^\* and d\\mathbf{r} \= 2\\mathbf{u}d\\mathbf{u}^\*). Substituting dt \= r\\,ds and the KS transformation into the perturbed two-body equation of motion \\ddot{\\mathbf{r}} \= \-\\frac{\\mu}{r^3}\\mathbf{r} \+ \\mathbf{f}(\\mathbf{r}, t) (where \\mu \= G(m\_i \+ m\_j) and \\mathbf{f} is the external tidal perturbation from neighbors) cancels the 1/r^3 collision singularity analytically, yielding the regularized 4D perturbed harmonic oscillator:
