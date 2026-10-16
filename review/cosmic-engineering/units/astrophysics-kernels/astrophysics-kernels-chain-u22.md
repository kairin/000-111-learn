# Chain regularization

- Unit: `astrophysics-kernels-chain-u22`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `14904:15845`
- Lines: `58:60`
- Purposes: claim-review, learning
- Excerpt SHA-256: `57adff3efbba2b20cdfd8c505dd611d8af6609ab7b9041b950568a75b14db984`

Regularized treatment for compact multi-body subsystems.

## Claims

### `astrophysics-kernels-u03-c11`

Chain regularization is presented as a treatment for compact multi-body subsystems beyond an isolated KS pair.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: The chain-regularization algorithm and a compact multiple-system benchmark.

Assumptions:
- The subsystem hierarchy and perturbing forces satisfy the chain method assumptions. (`inferred`)

## Learning goals

### `astrophysics-kernels-chain-u22-g01`: Computational physics

Compare KS pair regularization with chain regularization for a compact three-body encounter.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-u03-c11`

## Exact source excerpt

\\mathbf{u}'' \- \\frac{\\epsilon}{2}\\mathbf{u} \= \\frac{r}{2}\\mathbf{L}^\\top(\\mathbf{u})\\mathbf{f}, \\qquad \\epsilon' \= \\mathbf{r}' \\cdot \\mathbf{f} \= 2\\mathbf{u}'^\\top \\mathbf{L}^\\top(\\mathbf{u})\\mathbf{f}  
where \\epsilon \= \\frac{1}{2}|\\dot{\\mathbf{r}}|^2 \- \\frac{\\mu}{r} \= \\frac{2\\|\\mathbf{u}'\\|^2 \- \\mu}{r} \< 0 is the specific two-body orbital binding energy. Even at an exact head-on collision (r \\to 0), the equation of motion in \\mathbf{u}(s) remains linear and completely regular. When 3 to 6 compact objects or hard binaries interact simultaneously, NBODY6++GPU invokes Mikkola-Aarseth chain regularization, linking particles along a shortest-interparticle-distance tree vector chain and applying KS transformations to each chain link alongside canonical time transformations, supplemented by Peters-Mathews post-Newtonian gravitational-wave energy decay for relativistic black hole inspirals.
