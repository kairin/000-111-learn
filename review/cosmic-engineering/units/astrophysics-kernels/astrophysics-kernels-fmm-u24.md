# FMM and TreePM vectorization

- Unit: `astrophysics-kernels-fmm-u24`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `26328:28949`
- Lines: `97:101`
- Purposes: claim-review, learning
- Excerpt SHA-256: `9e41d20aec0c5ace902c6684397db213657215e9a27ed8d5ef915f26da5b58d8`

Near-field and far-field vectorization strategies.

## Claims

### `astrophysics-kernels-fmm-u24-c01`

Near-field P2P interactions in the listed FMM and TreePM codes have the same structure as direct N-body summation and can call Phantom-GRAPE SIMD kernels.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, reproduction.

Evidence needed: Inspect the named code paths and benchmark the SIMD near-field operator.

Assumptions:
- The named implementations and hardware paths match the source description. (`explicit`)

### `astrophysics-kernels-fmm-u24-c02`

The source says solidfmm reforms M2L work into aligned SIMD matrix-vector products by using real solid harmonics and rotation or grouped cells.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: Inspect the solidfmm formulation and verify its data layout and vector width.

Assumptions:
- The source describes the relevant solidfmm release. (`explicit`)

### `astrophysics-kernels-fmm-u24-c03`

The interpolation formulation uses FFT diagonalization to reduce an M2L loop from O(p^6) to O(p^3 log p).

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: Derive the operation counts and benchmark scaling across expansion order p.

Assumptions:
- The stated Toeplitz and translation-invariance conditions hold. (`explicit`)

### `astrophysics-kernels-fmm-u24-c04`

GADGET-4 and gyrfalcON are said to use symmetric trace-free Cartesian tensors that map to unrolled fused-multiply-add instructions.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, primary-source.

Evidence needed: Inspect the generated or templated kernels in pinned releases.

Assumptions:
- The named implementations use the stated tensor form. (`explicit`)

## Learning goals

### `astrophysics-kernels-fmm-u24-g01`: Computational physics

Trace P2P and M2L work through the SIMD, solid-harmonic, FFT, and Cartesian-tensor formulations, then compare their operation counts.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-fmm-u24-c01`, `astrophysics-kernels-fmm-u24-c02`, `astrophysics-kernels-fmm-u24-c03`, `astrophysics-kernels-fmm-u24-c04`

## Exact source excerpt

### **Vectorizing Fast Multipole Methods (FMM) and TreePM Codes**

In hierarchical \\mathcal{O}(N) Fast Multipole Methods (ExaFMM/exafmm-t, solidfmm, GADGET-4) and Tree-Particle-Mesh codes (FDPS/GREEM, PKDGRAV3), computational effort is split between the near-field **P2P (Particle-to-Particle)** direct operator and the far-field **M2L (Multipole-to-Local)** translation operator. Near-field leaf P2P interactions are structurally identical to direct N-body summation and directly invoke Phantom-GRAPE AVX2/AVX-512 kernels. In GADGET-4, short-range TreePM forces modify the Newtonian 1/r^2 kernel with an Ewald/Gaussian complementary error function cutoff \\operatorname{erfc}(\\frac{1}{2}a\_s r) \+ \\frac{a\_s r}{\\sqrt{\\pi}}\\exp(-\\frac{1}{4}a\_s^2 r^2), which is evaluated inside SIMD lanes using Chebyshev polynomial approximations rather than branching libm calls.  
In contrast, naive FMM implementations write the far-field M2L translation—which converts multipole expansion coefficients M\_n^m of up to 189 far-field source cells into local Taylor coefficients L\_j^k of a target cell—as deeply nested loops over spherical harmonic degrees (n, m, j, k), crippling SIMD units with unaligned scalar memory accesses. High-performance libraries overcome this through three distinct mathematical reformulations. First, solidfmm replaces complex spherical harmonics with real-valued solid harmonics R\_n^m(\\mathbf{r}) and S\_n^m(\\mathbf{r}). By rotating the coordinate frame along the interaction vector or grouping 8 (AVX2) to 16 (AVX-512) source cells at the same octree level, solidfmm transforms M2L translations into dense, cache-aligned SIMD matrix-vector products. Second, equispaced interpolation and directional FMM codes (ExaFMM) represent cell potentials on a uniform reference grid \\Xi^\* \\subset \\mathbb{R}^3 of (2L+1)^3 Chebyshev or equispaced nodes. Because the gravitational kernel G(\\mathbf{x} \- \\mathbf{y}) is translation-invariant across cells of identical level \\beta\_s \= \\beta\_t, the M2L convolution matrix is Toeplitz and is diagonalized via Fast Fourier Transforms (\\mathbf{G}(\\Xi\_s, \\Xi\_t) \= \\boldsymbol{\\chi}^\\top \\mathcal{F}^{-1} \\mathbf{D}\_{s,t} \\mathcal{F} \\boldsymbol{\\chi}), converting an \\mathcal{O}(p^6) loop into a vectorized \\mathcal{O}(p^3 \\log p) Hadamard element-wise product in Fourier space. Third, GADGET-4 and gyrfalcON express multipoles in symmetric trace-free Cartesian tensors \\mathcal{Q}\_{ijk\\dots} rather than spherical harmonics, enabling unrolled compile-time template meta-programming that maps directly onto vfmadd instructions.
