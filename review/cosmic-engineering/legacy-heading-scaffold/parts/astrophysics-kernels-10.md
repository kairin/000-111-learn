## **2\. Assembly and Low-Level SIMD Kernels in Physics Simulation**

While high-level numerical integrators govern global error bounds, over 95% of wall-clock execution time in gravitational and fluid codes is consumed inside the innermost force evaluation loops. To saturate modern CPU arithmetic logic units (ALUs) without stalling on memory latency or hardware square-root dividers, HPC astrophysics codes bypass compiler auto-vectorization and utilize hand-tuned x86-64 Assembly (SSE, AVX2, AVX-512) and ARM NEON/SVE intrinsics.

