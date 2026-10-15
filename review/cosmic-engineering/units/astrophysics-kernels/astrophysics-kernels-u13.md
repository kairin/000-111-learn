# Coordinate hierarchy and floating origins

- Unit: `astrophysics-kernels-u13`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `76600:81856`
- Lines: `280:304`
- Purposes: claim-review, learning
- Excerpt SHA-256: `f77fd155038d4c7fc41b2ec62967ae069b679c50adad49d0e95a84d498edeb4c`

This unit quantifies binary64 spacing and proposes global fixed-point sectors with local floating frames.

## Claims

### `astrophysics-kernels-u13-c02`

Binary64 coordinate spacing grows as 2 raised to floor(log2 absolute position) minus 52.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation.

Evidence needed: IEEE-754 spacing derivation and representative ULP calculations.

Assumptions:
- Coordinates use IEEE-754 binary64 normal numbers. (`inferred`)

### `astrophysics-kernels-u13-c03`

The proposed global fixed-point sector coordinate has the stated fractional resolution and sector range.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, code-inspection.

Evidence needed: Bit-range calculation and a portable representation design.

Assumptions:
- A 128-bit signed fixed-point representation is available or emulated consistently. (`inferred`)

### `astrophysics-kernels-u13-c04`

A vessel-centered floating origin reduces cancellation in local force calculations after recentering.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: reproduction, calculation.

Evidence needed: Cross-sector motion tests comparing local relative-position error before and after recentering.

Assumptions:
- Recenter operations preserve global position and velocity state without inconsistent rounding. (`inferred`)

## Learning goals

### `astrophysics-kernels-u13-g01`: Numerical coordinate systems

Choose coordinate representations from a range and error budget.

Prerequisites: IEEE-754 arithmetic, Fixed-point arithmetic

Claim dependencies: `astrophysics-kernels-u13-c02`

## Exact source excerpt

## **6\. Synthesis for Simulation Architecture**

Building a unified computational physics backend that seamlessly transitions a vessel from a planetary parking orbit, through a multi-body solar system departure, into a relativistic interstellar cruise or exotic warp transit across hundreds of light-years requires solving two coupled problems: **multi-scale coordinate representation without floating-point precision loss** and **symplectic/covariant integrator handoff across regime boundaries**.

### **Multi-Scale Coordinate Hierarchy and Floating-Point Precision Analysis**

An IEEE-754 64-bit double-precision float (real(real64) in Fortran, double in C/C++) allocates 1 sign bit, 11 exponent bits, and 52 explicit mantissa bits (p \= 53 bits of significand precision). At any coordinate magnitude r, the spatial quantization step—the Unit in the Last Place (\\operatorname{ULP}(r))—is:  
\\operatorname{ULP}(r) \= 2^{\\lfloor \\log\_2 |r| \\rfloor \- 52}  
Evaluating \\operatorname{ULP}(r) across astrophysical scales reveals exactly where a naive single-origin 64-bit Cartesian coordinate grid breaks down:

| Astrophysical Regime | Distance from Origin r (\\text{m}) | \\lfloor \\log\_2 r \\rfloor | binary64 Spatial Resolution \\operatorname{ULP}(r) | Simulation Failure Mode if Unmitigated |
| :---- | :---- | :---- | :---- | :---- |
| **Low Earth Orbit (LEO)** | 6.77 \\times 10^6\\text{ m} | 22 | 9.31 \\times 10^{-10}\\text{ m} (0.93\\text{ nm}) | None; full sub-nanometer precision for docking and attitude control. |
| **Earth–Moon System** | 3.84 \\times 10^8\\text{ m} | 28 | 5.96 \\times 10^{-8}\\text{ m} (59.6\\text\[span\_325\](start\_span)\[span\_325\](end\_span){ nm}) | None; exact CRTBP halo/DRO differential correction. |
| **Inner Solar System (1\\text{ AU})** | 1.496 \\times 10^{11}\\text{ m} | 37 | 3.05 \\times 10^{-5}\\text{ m} (30.5\\text{ }\\mu\\text{\[span\_326\](start\_span)\[span\_326\](end\_span)m}) | None; high-precision interplanetary Lambert targeting. |
| **Outer Solar System (10\\text{ AU})** | 1.496 \\times 10^{12}\\text{ m} | 40 | 2.44 \\ti\[span\_322\](start\_span)\[span\_322\](end\_span)mes 10^{-4}\\text{ m} (0.24\\text{ mm}) | Minor truncation in micro-thruster impulses over small \\Delta t. |
| **Oort Cloud (0.8\\text{ ly})** | 7.57 \\times 10\[span\_323\](start\_span)\[span\_323\](end\_span)^{15}\\text{ m} | 52 | 1.00\\text{ m} | **Critical Threshold:** Complete loss of sub-meter precision; spacecraft components jitter and rigid-body constraints fail. |
| **Alpha Centauri (4.37\\text{ ly})** | 4.13 \\times 10^{16}\\text{ m} | 55 | 8.00\\text{ m} | Numerical velocity integration \\mathbf{r}\_{n+1} \= \\mathbf{r}\_n \+ \\mathbf{v}\\Delta t stalls for small \\Delta t; orbital insertion impossible. |
| **Galactic Scale (10,000\\text{ ly})** | 9.46 \\times 10^{19}\\text{ m} | 66 | 16,384\\text{ m} (16.4\\text{ km}) | Complete loss of planetary orbit resolution. |

#### **The Three-Tier Coordinate Architecture**

To preserve sub-millimeter precision across an entire 100,000\\text{-light-year} galaxy while keeping inner physics loops in fast hardware AVX-512 64-bit/32-bit registers, the backend must implement a three-tier spatial hierarchy combining deterministic integer sector indexing, 128-bit fixed-point global coordinates, and a local Floating Origin. At the top galactic tier, the universe is partitioned into cubic stellar chunks of edge length L\_{\\text{sector}} \= 2^{53}\\text{ m} \\approx 9.007 \\times 10^{15}\\text{ m} (\\approx 0.952\\text{ light-years}) indexed by a 3D integer tuple \\mathbf{S} \= (S\_x, S\_y, S\_z) \\in \\mathbb{Z}\_{\\text{int64}}^3, or represented directly as 128-bit signed fixed-point integers (integer(int128) in Fortran / \_\_int128\_t in C). A 128-bit fixed-point coordinate with 64 integer bits (meters) and 64 fractional bits provides an unvarying uniform spatial resolution of 2^{-64}\\text{ m} \\approx 5.42 \\times 10^{-20}\\text{ m} across a cubic volume of 2^{63}\\text{ m} \\approx 974\\text{ light-years} per sector without exponent shifting.  
At the intermediate stellar-system tier (radius \< 1000\\text{ AU} \\approx 1.5 \\times 10^{14}\\text{ m}), planetary ephemerides (JPLEPH) and Mercury or NBODY6++GPU integrations operate in real64 coordinates anchored to the local system barycenter \\mathbf{R}\_{\\text{sys}}, where \\operatorname{ULP}(100\\text{ AU}) \\approx 2.0\\text{ mm}. Finally, at the innermost spacecraft tier, the active vessel sits at the local coordinate origin \\mathbf{r}\_{\\te\[span\_336\](start\_span)\[span\_336\](end\_span)xt{local}} \= (0, 0, 0\) via a Floating Origin transformation. All nearby celestial bodies, projectiles, tether nodes, and warp metric grids are transformed into this vessel-centered frame via exact integer or fixed-point subtraction before casting to r\[span\_337\](start\_span)\[span\_337\](end\_span)\[span\_338\](start\_span)\[span\_338\](end\_span)\[span\_339\](start\_span)\[span\_339\](end\_span)eal64 or real32 for Phantom-GRAPE SIMD force evaluation. Whenever \\Vert{}\\mathbf{r}\_{\\text{local}}\\Vert{} \> R\_{\\text{recenter}} (e.g., 10^4\\text{ m}), the floating origin shifts atomically into the 128-bit global accumulator, eliminating subtraction cancellation.
