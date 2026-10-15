# Mercury hybrid symplectic switching

- Unit: `astrophysics-kernels-u04`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `15845:19247`
- Lines: `61:71`
- Purposes: claim-review, learning
- Excerpt SHA-256: `0477dd3048af5ccd609df74815291146cd271e822b2b04f976234b061e1f55ad`

This unit presents democratic heliocentric coordinates, Hamiltonian splitting, and close-encounter switching.

## Claims

### `astrophysics-kernels-u04-c01`

Mercury transfers close-encounter interactions between Hamiltonian parts with a smooth switching function and uses RADAU or Bulirsch-Stoer for encounter integration.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection, reproduction.

Evidence needed: Chambers' paper, Mercury source, and encounter benchmarks with conserved-quantity traces.

Assumptions:
- The stated switch radius and encounter-solver wording describe Chambers' hybrid algorithm rather than merely package options. (`inferred`)

### `astrophysics-kernels-u04-c02`

Mercury uses democratic heliocentric positions and barycentric canonical momenta in the stated Hamiltonian decomposition.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: primary-source, calculation.

Evidence needed: The canonical transformation and Mercury documentation.

### `astrophysics-kernels-u04-c03`

The stated switch function and three-Hill-radius critical distance are the appropriate encounter criterion.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Chambers criterion and encounter-error tests.

Assumptions:
- The criterion is not problem dependent. (`inferred`)

### `astrophysics-kernels-u04-c04`

The displayed Strang composition is the second-order propagation operator for the split Hamiltonian.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: calculation, logical-analysis.

Evidence needed: A Lie-operator derivation and order test.

## Learning goals

### `astrophysics-kernels-u04-g01`: Symplectic integration

Explain Hamiltonian splitting and why a close-encounter handoff requires invariant testing.

Prerequisites: Hamiltonian mechanics, Numerical integration

Claim dependencies: `astrophysics-kernels-u04-c01`

## Exact source excerpt

### **Mercury: Hybrid Symplectic Wisdom-Holman Integration**

For planetary systems dominated by a central star (m\_0 \\gg \\sum\_{i=1}^N m\_i), John Chambers's Mercury Fortran package (and its modern C port MERCURIUS in REBOUND) employs a hybrid symplectic integrator designed to conserve the Poincaré integral invariants over billion-year integrations while surviving close planetary encounters.  
To eliminate artificial secular drifts associated with Jacobi coordinates when planetary orbits cross, Mercury formulates the N-body Hamiltonian in *democratic heliocentric coordinates*: heliocentric positions \\mathbf{Q}\_i \= \\mathbf{r}\_i \- \\mathbf{r}\_0 and barycentric canonical momenta \\mathbf{P}\_i \= m\_i \\dot{\\mathbf{r}}\_{\\text{bary},i}. The total Hamiltonian H \= H\_{\\text{Kep}} \+ H\_{\\text{Sun}} \+ H\_{\\text{int}} is split into three pieces, with the close-encounter switching function K(r\_{ij} / r\_{\\text{crit},ij}) \\in \[0, 1\] partitioning the mutual planetary potential between the integrable Keplerian drift H\_A and the perturbative kick H\_B:  
H\_A \= \\sum\_{i=1}^N \\left( \\frac{\\|\\mathbf{P}\_i\\|^2}{2m\_i} \- \\frac{G m\_0 m\_i}{\\|\\mathbf{Q}\_i\\|} \\right) \- \\sum\_{i=1}^{N-1}\\sum\_{j=i+1}^N \\frac{G m\_i m\_j}{\\|\\mathbf{Q}\_i \- \\mathbf{Q}\_j\\|}\\Big\[1 \- K(r\_{\[span\_31\](start\_span)\[span\_31\](end\_span)\[span\_36\](start\_span)\[span\_36\](end\_span)ij})\\Big\] H\_B \= \-\\sum\_{i=1}^{N-1}\\sum\_{j=i+1}^N \\frac{G m\_i m\_j}{\\|\\mathbf{Q}\_i \- \\mathbf{Q}\_j\\|} K(r\_{ij}), \\qquad H\_{\\text{Sun}} \= \\frac{1}{2m\_0}\\left\\|\\sum\_{i=1}^N \\mathbf{P}\_i\\right\\|^2  
where r\_{ij} \= \\|\\mathbf{Q}\_i \- \\mathbf{Q}\_j\\| and the critical switchover distance r\_{\\text{cr\[span\_41\](start\_span)\[span\_41\](end\_span)\[span\_43\](start\_span)\[span\_43\](end\_span)\[span\_45\](start\_span)\[span\_45\](end\_span)it},ij} is typically set to 3 R\_{\\text{Hill}}. In Chambers's formulation, K(y) (with y \= \\frac{r\_{ij} \- 0.1 r\_{\\text{crit}}}{0.9 r\_{\\text{crit}}}) is a smooth polynomial spline:  
K(y) \= \\begin{cases} 0, & y \< 0 \\\\ \\frac{y^2}{2y^2 \- 2y \+ 1}, & 0 \\le y \\le 1 \\\\ 1, & y \> 1 \\end{cases}  
Across a single macro-step \\Delta t, the state evolves via the second-order symmetric Strang splitting operator:  
\\mathbf{\\Psi}(\\Delta t) \= \\exp\\\!\\left(\\frac{\\Delta t}{2}\\mathcal{L}\_{H\_{\\text{Sun}}}\\right) \\exp\\\!\\left(\\frac{\\Delta t}{2}\\mathcal{L}\_{H\_B}\\right) \\exp(\\Delta t\\,\\mathcal{L}\_{H\_A}) \\exp\\\!\\left(\\frac{\\Delta t}{2}\\mathcal{L}\_{H\_B}\\right) \\exp\\\!\\left(\\frac{\\Delta t}{2}\\mathcal{L}\_{H\_{\\text{Sun}}}\\right)  
where \\mathcal{L}\_H \= \\{\\cdot, H\\} is the Poisson bracket Lie derivative. When all planets are well separated (r\_{ij} \> r\_{\\text{crit}} \\implies K \= 1), H\_A consists of N decoupled two-body Keplerian orbits advanced analytically in \\mathcal{O}(N) operations via universal variables, while H\_B applies an impulsive velocity kick. If two bodies i, j suffer a close encounter (r\_{ij} \< r\_{\\text{crit}} \\implies K \< 1), the rapidly varying 1/r\_{ij} force is smoothly subtracted from the kick H\_B—keeping H\_B small and bounded—and transferred into H\_A, where only the interacting pair is integrated through pericenter using Everhart's 15th-order Gauss-Radau (RADAU) or a Bulirsch-Stoer adaptive integrator.
