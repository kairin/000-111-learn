# Argument and evidence map review

- Unit: `adversarial-research-review-argument-u22`
- Source: [`sources/adversarial-research-review.md`](../../sources/adversarial-research-review.md)
- Characters: `48400:50000`
- Lines: `299:333`
- Purposes: claim-review, learning
- Excerpt SHA-256: `16977ce0e7315061cc1bae31852e958a61337453e445666d6fba8d6a0509f574`

Focused review of argument and evidence map review.

## Claims

### `adversarial-research-review-argument-u22-c01`

A unified design needs explicit evidence-to-handoff links.

Type: `design-proposal`. Status: `unchecked`. Priority: `high`.

Review methods: primary-source, reproduction.

Evidence needed: Review a traceable dependency map.

Assumptions:
- The cited review evidence applies to the source configuration. (`inferred`)

Review targets:
- `astrophysics-kernels-u16-c01`

## Learning goals

### `adversarial-research-review-argument-u22-g01`: Technical claim review

Evaluate evidence and limits for argument and evidence map review.

Prerequisites: Source evaluation

Claim dependencies: `adversarial-research-review-argument-u22-c01`

## Exact source excerpt

 |

The document's argument can be represented as follows. The red-flag nodes are not necessarily false ideas; they are points where the conclusion no longer follows from the evidence without an additional assumption or test.

```mermaid
flowchart TD
    A[Established physics and numerical methods]
    A --> B[Choose specialised solver for each scale]
    B --> C[Combine orbital, N-body, SR and GR kernels]
    C --> D[Build unified interstellar simulation]

    A --> E[Published software descriptions]
    E --> F[FAT / Mercury / NBODY / NEMO / Phantom-GRAPE]
    F --> G{Exact release and implementation checked?}
    G -- No --> H[Failure point: roadmap or old-paper feature treated as current code]
    G -- Yes --> C

    A --> I[Warp metric literature]
    I --> J[Compute metric-derived stress-energy]
    J --> K{All observers and wall region tested?}
    K -- No --> L[Failure point: preferred-frame positivity mistaken for energy-condition satisfaction]
    K -- Yes --> M[Geometry passes specified algebraic tests]
    M --> N{Dynamical formation, acceleration and stability demonstrated?}
    N -- No --> O[Failure point: valid metric promoted to practical propulsion system]
    N -- Yes --> D

    A --> P[Relativistic propulsion]
    P --> Q[Ackeret / photon momentum / ISM interactions]
    Q --> R{Common energy accounting and dimensions verified?}
    R -- No --> S[Failure point: incomparable or internally inconsistent propulsion table]
    R -- Yes --> D

    A --> T[Multiscale coordinates and handoffs]
    T --> U[Floating origin / sectors / solver switching]
    U --> V{
