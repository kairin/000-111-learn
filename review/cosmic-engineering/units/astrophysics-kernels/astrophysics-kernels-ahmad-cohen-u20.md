# Ahmad-Cohen force splitting

- Unit: `astrophysics-kernels-ahmad-cohen-u20`
- Source: [`sources/astrophysics-kernels.md`](../../sources/astrophysics-kernels.md)
- Characters: `11103:12169`
- Lines: `42:47`
- Purposes: claim-review, learning
- Excerpt SHA-256: `51b8d175fa4bcbd137bcdca44c4b870168f0580bad5154851f4d6e563e5be251`

Neighbor and regular force separation and execution cadence.

## Claims

### `astrophysics-kernels-u03-c08`

Ahmad-Cohen splitting separates rapidly changing neighbor forces from slower regular forces.

Type: `mathematical`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, reproduction.

Evidence needed: Force-error and cost measurements with and without the split.

Assumptions:
- A neighbor sphere and update cadence are selected consistently with force variation. (`inferred`)

### `astrophysics-kernels-u03-c09`

The source assigns irregular-force updates to CPU work and regular-force work to GPU execution at longer intervals.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, reproduction.

Evidence needed: Versioned scheduling code and profiler output from a stated platform.

Assumptions:
- This host/device placement applies to the specified NBODY6++GPU version and hardware. (`inferred`)

## Learning goals

### `astrophysics-kernels-ahmad-cohen-u20-g01`: Computational physics

Derive separate neighbor and regular force schedules, then map each schedule to the stated CPU and GPU work.

Prerequisites: Numerical methods

Claim dependencies: `astrophysics-kernels-u03-c08`

## Exact source excerpt

#### **The Ahmad-Cohen Neighbor Scheme**

Evaluating \\mathcal{O}(N^2) forces at every short time-step \\Delta t\_{\\text{irr}} of a close binary would stall a million-body simulation. The Ahmad-Cohen (AC) scheme splits the total force on star i into an irregular component from N\_{\\text{nb}} nearby neighbors inside a sphere of radius R\_s and a smooth regular component from the remaining N \- N\_{\\text{nb}} distant stars:  
\\mathbf{F}\_{\\text{tot},i}(t) \= \\mathbf{F}\_{\\text{irr},i}(t) \+ \\mathbf{F}\_{\\text{reg},i}(t\_0) \+ (t \- t\_0)\\dot{\\mathbf{F}}\_{\\text{reg},i}(t\_0)  
In NBODY6++GPU, the fluctuating neighbor force \\mathbf{F}\_{\\text{irr},i} (where N\_{\\text{nb}} \\sim 50 \- 200 \\ll N) is updated at high frequency (\\Delta t\_{\\text{irr}}) on the host CPU using OpenMP and AVX intrinsics, avoiding PCIe latency, while the expensive \\mathcal{O}(N) regular force \\mathbf{F}\_{\\text{reg},i} and neighbor list reconstruction are offloaded to GPUs at larger regular intervals \\Delta t\_{\\text{reg}} \= 2^k \\Delta t\_{\\text{irr}}.
