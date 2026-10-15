# Reproducibility methods review

- Unit: `adversarial-research-review-u07`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `37865:43091`
- Lines: `232:257`
- Purposes: claim-review, learning
- Excerpt SHA-256: `5282c9c6373ef47576c96e8afc4eb86b657f9a1f8b2de21a41da29f675d7a244`

Focused review of reproducibility methods review.

## Claims

### `adversarial-research-review-u07-c01`

Reproducibility needs pinned versions, equations, and decisive tests.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Create a claim-to-test matrix.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u16-c01`

## Learning goals

### `adversarial-research-review-u07-g01`: Technical claim review

Evaluate evidence and limits for reproducibility methods review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-u07-c01`

## Exact source excerpt

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

For numerical claims, “statistical validity” should also be interpreted appropriately. Solver convergence is not primarily a statistical question; it requires deterministic error analysis and convergence testing. Performance claims, however, need repeated timings, hardware counters, uncertainty estimates and workload distributions. Environmental claims need probability distributions for density and dust rather than a single nominal number. Grid percentages need a defined sampling measure. Warp-shell “percentage of points” is especially vulnerable to meaningless statistics because expanding the empty vacuum region can arbitrarily drive a whole-grid percentage towards \(100\%\) without changing the wall physics. The current warpax emphasis on wall-restricted and proper-volume-weighted metrics is therefore methodologically preferable.
