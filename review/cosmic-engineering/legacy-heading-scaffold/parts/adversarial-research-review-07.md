## Reproducibility, uncertainty and decisive tests

The document is not presently reproducible as a scientific specification. It has a long bibliography, but individual numerical statements are not tied to exact equations, source versions or test cases. Several citations are secondary repositories, ResearchGate pages, blogs, Wikipedia or Reddit rather than the underlying paper or software documentation. The malformed `[span_…]` artefacts throughout equations are an additional red flag: they can silently corrupt indices and Hamiltonians and should be eliminated before any expression is translated into code.

The following table maps the most important uncertainties to decisive tests.

| Issue | Required test or data | Passing criterion |
|---|---|---|
| FAT capabilities | Pin exact FAT commit/release; compile examples for every claimed RKN, Adams and drag feature | Every claimed solver/model exists as callable tested code; otherwise remove claim. Official current overview presently says otherwise. citeturn10search3 |
| Mercury handoff | Reproduce Chambers' comet and embryo close-encounter tests | Error behaviour comparable with published BS/hybrid results; no spurious secular drift. citeturn12view6 |
| NBODY Hermite/AC implementation | Energy-error convergence against timestep parameter \(\eta\), with/without AC and regularisation | Expected convergence plus stable binary treatment; benchmark hardware disclosed. |
| gyrfalcON conservation | Isolated system, zero external forces; track \(\sum m_i\mathbf v_i\) and angular momentum | Linear momentum remains at round-off scale for symmetric force kernel; integration errors reported separately. citeturn17academia47 |
| Phantom-GRAPE AVX-512 claim | Publish exact kernel source, CPU model, compiler, instruction counters and interactions/s | Distinguish lane width, vector instructions/cycle and complete force interactions/s. |
| WarpFactory curvature | Evaluate analytic metrics with known Einstein tensor at \(\Delta x,\Delta x/2,\Delta x/4\) | Demonstrate expected stencil convergence before testing novel metrics. |
| warpax classification | Symbolic/high-precision cross-check of eigenvalues plus wall-restricted proper-volume sampling | Report whole-grid and wall fractions separately; demonstrate grid convergence. Current work itself shows why this matters. citeturn14view3turn12view2 |
| Fuchs shell | Independent implementation using symbolic/AD and independent tetrad/eigenvalue calculation | All-observer NEC/WEC/SEC/DEC remain non-negative under resolution and parameter perturbations. citeturn15view0turn16view2 |
| Radiative steering | Independent derivation of Bondi flux and junction conditions; numerical dynamical evolution | Recover \(-\dot m\ge3m|\alpha|\) within stated assumptions and establish stability/global matching separately. citeturn15view4turn16view0 |
| ISM shielding | Particle-transport simulation plus measured material stopping/erosion data over realistic composition spectrum | Reproduce material-specific implantation, sputtering, secondary radiation and dust cratering; not merely calorimetric heating. citeturn19academia46 |
| Dust model | Specify \(dN/da\), composition and grain-density distribution | Mass-radius relation exactly consistent for every sampled grain. |
| Bussard scoop | MHD/PIC field solution with coil geometry, stress and radiation losses | Net longitudinal momentum gain positive after collection losses; compare with modern Fishback re-analysis. citeturn19search7 |
| Magsail braking | Relativistic plasma/particle simulation at several densities and orientations | Force/work direction follows ambient-flow energy exchange; quantify drag and lift separately. citeturn19search1 |
| Laser sail | Photon-by-photon four-momentum conservation and independent ODE integration | Recover the exact perfect-mirror energy relation in the \(\mathcal R\to1\) limit. citeturn11view6 |
| Clock integration | Schwarzschild circular/static test cases and SR-only Minkowski limit | Static clocks deeper in a conventional negative potential accumulate *less* proper time; \(\Phi\to0\) gives \(d\tau/dt=1/\gamma\). |
| Solver transitions | Integrate identical trajectory wholly with high-fidelity reference and with state-machine switching | State, energy, momentum and proper time agree within a declared global error budget. |

For numerical claims, “statistical validity” should also be interpreted appropriately. Solver convergence is not primarily a statistical question; it requires deterministic error analysis and convergence testing. Performance claims, however, need repeated timings, hardware counters, uncertainty estimates and workload distributions. Environmental claims need probability distributions for density and dust rather than a single nominal number. Grid percentages need a defined sampling measure. Warp-shell “percentage of points” is especially vulnerable to meaningless statistics because expanding the empty vacuum region can arbitrarily drive a whole-grid percentage towards \(100\%\) without changing the wall physics. The current warpax emphasis on wall-restricted and proper-volume-weighted metrics is therefore methodologically preferable. citeturn14view3

For conflicts of interest and evidence independence, code authors are often the natural primary sources for implementation details, but **author benchmarks should not be the sole evidence for universal performance claims**. NBODY6++GPU's published benchmarks establish that its architecture can work at million-body scale on the reported cluster; they do not prove the same speedup on every contemporary platform. citeturn17search2 Similarly, Fuchs et al.'s published energy-condition result is meaningful, but independent tensor implementations and stability studies are needed before elevating the solution into an engineering assumption. citeturn15view0

A practical severity ranking for revision is therefore:

| Priority | Correction |
|---|---|
| **Critical** | Recompute the laser-sail equation/table; remove the \(700\,\mathrm{kg}c^2=3\times10^{44}\) J contradiction; correct the weak-field proper-time sign. |
| **Critical** | Replace the warpax percentages with parameter-, domain-, resolution- and version-specific values. |
| **High** | Correct FAT implementation-status claims. |
| **High** | Fix the \(10^{-9}\) kg/\(5\,\mu\mathrm m\) dust inconsistency. |
| **High** | Separate constant-velocity Fuchs shells from acceleration/steering claims. |
| **High** | Recast the Bondi steering result as a recent result under stated assumptions, not an unconditional established law. |
| **High** | Rebuild propulsion “energy/kg” columns using one consistent accounting scheme. |
| **Medium** | Correct Mercury \(r_{\rm crit}\) and RADAU/Bulirsch–Stoer wording. |
| **Medium** | Distinguish implemented AVX-512 kernels from estimates and hardware-specific optimisation claims. |
| **Medium** | Replace generic force blending with an error-controlled, invariant-tested handoff strategy. |

