#### **The Ahmad-Cohen Neighbor Scheme**

Evaluating \\mathcal{O}(N^2) forces at every short time-step \\Delta t\_{\\text{irr}} of a close binary would stall a million-body simulation. The Ahmad-Cohen (AC) scheme splits the total force on star i into an irregular component from N\_{\\text{nb}} nearby neighbors inside a sphere of radius R\_s and a smooth regular component from the remaining N \- N\_{\\text{nb}} distant stars:  
\\mathbf{F}\_{\\text{tot},i}(t) \= \\mathbf{F}\_{\\text{irr},i}(t) \+ \\mathbf{F}\_{\\text{reg},i}(t\_0) \+ (t \- t\_0)\\dot{\\mathbf{F}}\_{\\text{reg},i}(t\_0)  
In NBODY6++GPU, the fluctuating neighbor force \\mathbf{F}\_{\\text{irr},i} (where N\_{\\text{nb}} \\sim 50 \- 200 \\ll N) is updated at high frequency (\\Delta t\_{\\text{irr}}) on the host CPU using OpenMP and AVX intrinsics, avoiding PCIe latency, while the expensive \\mathcal{O}(N) regular force \\mathbf{F}\_{\\text{reg},i} and neighbor list reconstruction are offloaded to GPUs at larger regular intervals \\Delta t\_{\\text{reg}} \= 2^k \\Delta t\_{\\text{irr}}.

