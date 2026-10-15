# FAT architecture and trajectory solvers

- Unit: `astrophysics-kernels-u02`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `2663:7056`
- Lines: `14:23`
- Purposes: claim-review, learning
- Excerpt SHA-256: `b0a531fd5a0b1e662ce6e08086e2a8d05ad832bcc2272fa15588b596db05b733`

This unit describes FAT's object model, variable-step methods, event finding, targeting, and modified equinoctial elements.

## Claims

### `astrophysics-kernels-u02-c01`

FAT implements the stated polymorphic integration architecture and the RK, RKN, DDEABM, drag, event, Lambert, and modified-equinoctial capabilities attributed to it.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: A pinned release, API documentation, and executable examples for each claimed module.

Assumptions:
- Claims refer to a current or specified FAT release. (`inferred`)

### `astrophysics-kernels-u02-c02`

FAT uses derived types, abstract interfaces, deferred type-bound procedures, and procedure pointers for its solver architecture.

Type: `software`. Status: `unchecked`. Priority: `medium`.

Review methods: code-inspection, primary-source.

Evidence needed: Versioned module declarations and API documentation.

### `astrophysics-kernels-u02-c03`

FAT provides the named embedded Runge-Kutta methods for the stated non-conservative trajectory models.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: Callable API examples for each named solver and model.

Assumptions:
- The named methods and force models are implemented in the same supported release. (`inferred`)

### `astrophysics-kernels-u02-c04`

FAT provides RKN and DDEABM methods for the stated second-order propagation problems.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: Versioned solver implementations and regression tests.

### `astrophysics-kernels-u02-c05`

The displayed modified equinoctial equations remove the stated orbital-element singularities.

Type: `mathematical`. Status: `unchecked`. Priority: `medium`.

Review methods: calculation, definition-check.

Evidence needed: A derivation and limit checks at circular and equatorial configurations.

Assumptions:
- The formulation's prograde or retrograde convention is specified. (`inferred`)

## Learning goals

### `astrophysics-kernels-u02-g01`: Astrodynamics integration

Explain embedded Runge-Kutta error control, event roots, and non-singular orbital elements.

Prerequisites: ODE solvers, Classical orbital elements

Claim dependencies: `astrophysics-kernels-u02-c01`

## Exact source excerpt

### **Fortran-Astrodynamics-Toolkit (FAT) and Modern Object-Oriented Architecture**

Developed by Jacob Williams, the Fortran-Astrodynamics-Toolkit (alongside its companion fundamental astronomy library astro-fortran, which refactors the Fortran 77 IAU SOFA library) represents the paradigm of modern, object-oriented Fortran (Fortran 2008/2018) managed via the Fortran Package Manager (fpm). Rather than relying on legacy COMMON blocks or static fixed-size arrays, the toolkit architects its solvers around extensible derived types (base\_class\_module) utilizing abstract interfaces, deferred type-bound procedures, and procedure pointers.  
In the numerical integration subsystem (rk\_module and rk\_module\_variable\_step), an integration engine is instantiated as a polymorphic class holding a procedure pointer to the right-hand-side (RHS) equations of motion \\dot{\\mathbf{y}} \= \\mathbf{f}(t, \\mathbf{y}) and an optional event-finding constraint function g(t, \\mathbf{y}) \= 0\. For general trajectory propagation where non-conservative forces—such as atmospheric drag in drag\_module, solar radiation pressure, eclipsing in lighting\_module, or continuous low-thrust spacecraft engine models—are active, the toolkit implements Erwin Fehlberg's high-order embedded Runge-Kutta schemes, specifically RK7(8) and RK8(9), as well as Shanks' 8th-order formulas. An s-stage embedded Runge-Kutta method advances the state vector \\mathbf{y}\_n \\in \\mathbb{R}^d over step h via:  
\\mathbf{k}\_i \= \\mathbf{f}\\\!\\left(t\_n \+ c\_i h,\\, \\mathbf{y}\_n \+ h \\sum\_{j=1}^{i-1} a\_{ij} \\mathbf{k}\_j\\right), \\quad i \= 1, \\dots, s \\mathbf{y}\_{n+1} \= \\mathbf{y}\_n \+ h \\sum\_{i=1}^{s} b\_i \\mathbf{k}\_i, \\qquad \\hat{\\mathbf{y}}\_{n+1} \= \\mathbf{y}\_n \+ h \\sum\_{i=1}^{s} \\hat{b}\_i \\mathbf{k}\_i  
where a\_{ij}, b\_i, \\hat{b}\_i, c\_i are the Butcher tableau coefficients. Step-size control is governed by the local truncation error estimate \\mathbf{e}\_{n+1} \= \\|\\mathbf{y}\_{n+1} \- \\hat{\\mathbf{y}}\_{n+1}\\|\_\\infty, scaling the subsequent step h\_{\\text{new}} \= \\sigma h (\\text{tol} / \\|\\mathbf{e}\_{n+1}\\|)^{1/(p+1)} with safety factor \\sigma \\approx 0.8 \- 0.9. When the governing differential equations are strictly second-order of the form \\ddot{\\mathbf{r}} \= \\mathbf{f}(t, \\mathbf{r})—such as high-degree spherical harmonic geopotential perturbations loaded from Grace GGM03C.GEO files or third-body point-mass perturbations from JPL DE405 JPLEPH and SPICE ephemerides—FAT provides Runge-Kutta-Nyström (RKN) integrators and the Adams-Bashforth-Moulton variable-step predictor-corrector (DDEABM). RKN methods exploit the absence of \\dot{\\mathbf{r}} in the acceleration function to reduce stage evaluations while maintaining high phase accuracy.  
When terminal conditions depend on geometric crossings rather than fixed epochs (such as periapsis passage, lunar sphere-of-influence entry, or x-axis crossings in Circular Restricted Three-Body Problem \[CRTBP\] Distant Retrograde Orbit \[DRO\] targeting), the integrator couples step progression with brent\_module.f90. Brent's algorithm isolates roots of g(t, \\mathbf{y}(t)) \= 0 without derivatives by dynamically switching between inverse quadratic interpolation, secant steps, and bisection, guaranteeing superlinear convergence (order \\approx 1.324) within a strict floating-point stopping tolerance of 4\\epsilon |x| \+ \\text{tol}, where \\epsilon is the relative machine precision (epsilon(1.0\_wp)). For boundary-value orbital targeting, the toolkit pairs Gooding, Izzo, and Arora-Russell Lambert solvers with minpack\_module (hybrd1 and hybrj) and nlsolver-fortran, utilizing sparse finite-difference Jacobians (NumDiff) to execute Newton-type minimum-norm differential corrections for halo orbits and multi-burn transfers. To prevent coordinate singularities during near-circular (e \\to 0\) or equatorial (i \\to 0, \\pi) low-thrust spirals, modified\_equinoctial\_module transforms classical Keplerian elements (a, e, i, \\Omega, \\omega, \\nu) into non-singular Modified Equinoctial Elements (p, f, g, h, k, L):

p \= a(1 \- e^2), \\quad f \= e\\cos(\\omega \+ \\Omega), \\quad g \= e\\sin(\\omega \+ \\Omega) h \= \\tan\\\!\\left(\\frac{i}{2}\\right)\\cos\\Omega, \\quad k \= \\tan\\\!\\left(\\frac{i}{2}\\right)\\sin\\Omega, \\quad L \= \\Omega \+ \\omega \+ \\nu
