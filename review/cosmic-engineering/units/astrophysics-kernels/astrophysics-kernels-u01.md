# Scope and codebase comparison

- Unit: `astrophysics-kernels-u01`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `0:2663`
- Lines: `1:13`
- Purposes: claim-review, learning
- Excerpt SHA-256: `53a63148a55079b26b9a603b9d5e219271a6c145f05102ece5916e4fd1d9abe3`

The title, scope statement, and comparison table connect numerical codebases to their proposed domains.

## Claims

### `astrophysics-kernels-u01-c01`

FAT is listed as modern Fortran with RK, RKN, and Adams-family integrators plus equinoctial, universal-variable, and event-handling methods.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Check the complete row against a pinned release and its documentation.

Assumptions:
- The row refers to an identifiable version of the named codebase. (`explicit`)

### `astrophysics-kernels-u01-c02`

NBODY6++GPU is listed as a heterogeneous direct N-body code with a fourth-order Hermite scheme, block time steps, neighbor splitting, and KS and chain regularization.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Check the complete row against a pinned release and its documentation.

Assumptions:
- The row refers to an identifiable version of the named codebase. (`explicit`)

### `astrophysics-kernels-u01-c03`

Mercury/Swifter is listed with a Wisdom-Holman map and close-encounter handoff methods for long-term planetary dynamics.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Check the complete row against a pinned release and its documentation.

Assumptions:
- The row refers to an identifiable version of the named codebase. (`explicit`)

### `astrophysics-kernels-u01-c04`

NEMO is listed with leapfrog and direct integrators, softening, tree methods, and collisionless galactic applications.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Check the complete row against a pinned release and its documentation.

Assumptions:
- The row refers to an identifiable version of the named codebase. (`explicit`)

## Learning goals

### `astrophysics-kernels-u01-g01`: Scientific software selection

Compare the four codebase rows by integrator, encounter treatment, domain, and scaling claim, using pinned versions.

Prerequisites: Ordinary differential equations, N-body terminology

Claim dependencies: `astrophysics-kernels-u01-c01`, `astrophysics-kernels-u01-c02`, `astrophysics-kernels-u01-c03`, `astrophysics-kernels-u01-c04`

## Exact source excerpt

# **Computational Physics Kernels, Numerical Integrators, and Relativistic Mathematical Formulations for Hard-Science Interstellar Simulation**

## **1\. Fortran Astrophysics and Astrodynamics Codebases**

High-precision orbital mechanics and stellar dynamics simulations rely heavily on Fortran due to its native array semantics, strict pointer aliasing rules (intent(in), intent(inout)), and mature compiler vectorization pipelines. Across the open-source astrodynamics ecosystem, four foundational codebases—Fortran-Astrodynamics-Toolkit, NBODY6++GPU, Mercury, and the NEMO Stellar Dynamics Toolbox—establish the mathematical standards for trajectory propagation, collisional N-body dynamics, symplectic planetary integration, and collisionless galactic modeling.

| Codebase | Primary Language & Paradigm | Core Numerical Integrators | Close-Encounter & Singularity Handling | Primary Domain & Scaling |
| :---- | :---- | :---- | :---- | :---- |
| **Fortran-Astrodynamics-Toolkit (FAT)** | Modern Fortran (F2008+ OOP, fpm) | Fehlberg RK7(8), RK8(9), Shanks RK8, Runge-Kutta-Nyström (RKN), Adams-Bashforth-Moulton (DDEABM) | Modified Equinoctial Elements (e=0, i=0), Universal Variables (Gooding/Shepperd), Brent root-finding event detection | Spacecraft trajectory design, Lambert targeting, CRTBP halo/DRO orbits, high-order geopotentials |
| **NBODY6++GPU** | Fortran 77/90 \+ CUDA \+ OpenMP \+ MPI \+ AVX | 4th-Order Hermite Predictor-Corrector with hierarchical block time-steps (\\Delta t\_l \= \\Delta t\_1 / 2^{l-1}) | Kustaanheimo-Stiefel (KS) 4D spinor/quaternion regularization, Mikkola-Aarseth chain regularization, Ahmad-Cohen neighbor splitting | Collisional star clusters (N \\sim 10^5 \- 10^6), hard binaries, stellar/BH evolution (SSE/BSE), post-Newtonian decay |
| **Mercury / Swifter** | Fortran 77/90 (C port in MERCURIUS) | 2nd-Order Wisdom-Holman Symplectic Map (Democratic Heliocentric), 15th-Order Gauss-Radau (RADAU) / Bulirsch-Stoer | Smooth polynomial/trigonometric force-switching function K(r\_{ij}/r\_{\\text{crit}}) transferring close encounters into the Keplerian operator | Long-term secular planetary system evolution (10^6 \- 10^9\\text{ yr}), planetesimal accretion and scattering |
| **NEMO Stellar Dynamics Toolbox** | Fortran 77/90 \+ C/C++ modular UNIX pipe architecture | Symplectic Kick-Drift-Kick (KDK) Leapfrog, Aarseth direct integrators (nbody0–nbody2) | Kernel softening length \\epsilon\_s, Barnes-Hut octree (\\mathcal{O}(N\\log N)), Dehnen's momentum-conserving Fast Multipole gyrfalcON (\\mathcal{O}(N)) | Collisionless galactic dynamics, bar/spiral instabilities, halo mergers, large-scale N-body streams |
