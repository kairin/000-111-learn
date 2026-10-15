# NEMO and momentum-conserving tree methods

- Unit: `astrophysics-kernels-u05`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `19247:20967`
- Lines: `72:76`
- Purposes: claim-review, learning
- Excerpt SHA-256: `63e79f113a17abe95278d506d0c58baed443e8fd04b098ad0614eecc41cd3923`

This unit contrasts Barnes-Hut and gyrfalcON force approximation and conservation properties.

## Claims

### `astrophysics-kernels-u05-c01`

NEMO's gyrfalcON uses symmetric mutual cell interactions with O(N) complexity and machine-precision linear-momentum conservation.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Algorithm paper and isolated-system force and integration benchmarks.

Assumptions:
- Complexity and conservation claims are under the algorithm's stated force-approximation conditions. (`inferred`)

## Learning goals

### `astrophysics-kernels-u05-g01`: Hierarchical gravity solvers

Compare one-way tree approximations with symmetric mutual interactions.

Prerequisites: Multipole expansions, Conservation laws

Claim dependencies: `astrophysics-kernels-u05-c01`

## Exact source excerpt

### **NEMO Stellar Dynamics Toolbox**

Founded by Barnes, Hut, and Teuben, the NEMO Stellar Dynamics Toolbox provides an extensible UNIX-style pipeline environment combining legacy Fortran (nbody0, nbody1, nbody2, PMFAST) and C/C++ stellar dynamics engines communicating via structured hierarchical binary files and FITS interchange tables. For large-scale collisionless galactic dynamics (N \\sim 10^6 \- 10^8), NEMO features the classical Barnes-Hut octree (hackcode1, scaling as \\mathcal{O}(N\\log N)) alongside Walter Dehnen's gyrf\[span\_33\](start\_span)\[span\_33\](end\_span)\[span\_38\](start\_span)\[span\_38\](end\_span)alcON (originally YancNemo), a fast multipole tree code that achieves strict \\mathcal{O}(N) complexity and exact machine-precision conservation of total linear momentum.  
In a standard Barnes-Hut octree, forces are evaluated one-way (cell-to-body) whenever the geometric opening criterion s/d \< \\theta is satisfied, violating Newton's third law (\\mathbf{F}\_{AB} \\neq \-\\mathbf{F}\_{BA}) and inducing spurious self-acceleration of the galaxy's barycenter. gyrfalcON resolves this by constructing a hierarchical octree down to cells containing N\_{\\text{crit}} \\sim 8 \- 16 bodies, expanding cell masses into trace-free Cartesian multipole moments \\mathbf{M}^{(n)} up to order p, and evaluating mutual *cell-to-cell* (M2L) Taylor interactions symmetrically whenever s\_A \+ s\_B \< \\theta d\_{AB}. Because the Taylor interaction kernel between cell centers \\mathbf{z}\_A and \\mathbf{z}\_B is antisymmetric under exchange A \\leftrightarrow B, momentum is identically conserved, and orbits are advanced using a reversible Kick-Drift-Kick (KDK) symplectic leapfrog integrator.
