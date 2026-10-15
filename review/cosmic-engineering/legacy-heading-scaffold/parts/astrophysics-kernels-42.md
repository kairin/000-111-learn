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

