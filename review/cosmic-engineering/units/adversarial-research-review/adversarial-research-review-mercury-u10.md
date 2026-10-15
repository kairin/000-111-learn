# Mercury hybrid review

- Unit: `adversarial-research-review-mercury-u10`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `14098:15492`
- Lines: `74:77`
- Purposes: claim-review, learning
- Excerpt SHA-256: `e517b5effc61b3d28dd31267835d6cf7803aac14f316afb17453d4cdb1cc2faa`

Reviews encounter switching and solver attribution.

## Claims

### `adversarial-research-review-mercury-u10-c01`

Mercury must distinguish Chambers Hamiltonian switching from separately available encounter integrators.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, code-inspection.

Evidence needed: Compare the Chambers method with Mercury source and encounter tests.

Assumptions:
- The review and target source refer to identifiable releases. (`inferred`)

Review targets:
- `astrophysics-kernels-u04-c01`

## Learning goals

### `adversarial-research-review-mercury-u10-g01`: Scientific software review

Assess the evidence and limits of mercury hybrid review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-mercury-u10-c01`

## Exact source excerpt

The Mercury section captures Chambers' core idea accurately: transfer the rapidly varying close-encounter potential from the perturbative kick into the part integrated numerically, while retaining an efficient symplectic mapping away from encounters. Chambers explicitly describes bodies outside encounters as moving on analytically solved Kepler orbits, while encounter bodies have the Kepler and \(1-K\) close-encounter terms integrated numerically. citeturn16view3

Two details need correction. First, Chambers states that \(r_{\rm crit}\) should generally be the larger of a Hill-radius term and a timestep-times-velocity term, with problem-dependent coefficients; he gives \(3\!-\!10\) Hill radii as a useful coefficient range rather than defining \(3R_H\) as a universal switching distance. citeturn16view3 Second, he says the close-encounter numerical algorithm is in principle a matter of choice but advocates Bulirsch–Stoer for robustness; he remarks that Everhart's RADAU can be faster but occasionally has difficulty in very close encounters. Mercury distributes RADAU as an additional package integrator. citeturn12view7turn12view6 **Corrective wording:** “Mercury's hybrid map conventionally uses an adaptive high-accuracy numerical method—Chambers recommends Bulirsch–Stoer—for encounter groups; the package also contains an independent Everhart RADAU implementation.”
