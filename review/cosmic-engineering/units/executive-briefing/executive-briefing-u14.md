# Section 3: Computational Engineering, Numerical Methods, and Software Paradigms

- Unit: `executive-briefing-u14`
- Source: [`sources/executive-briefing.md`](../../sources/executive-briefing.md)
- Characters: `18062:18705`
- Lines: `149:160`
- Purposes: claim-review, learning
- Excerpt SHA-256: `b8cc6b174758094d1cfc5418e9db9e0fbbda91bd790b5e3e793d4a26abe42f02`

This unit preserves the complete source passage about Section 3: Computational Engineering, Numerical Methods, and Software Paradigms.

Context: This passage gives source structure or transition context without a separately stated testable claim.

## Claims

### `executive-briefing-u14-c01`

The diagram assigns high-level integration to Fortran and innermost force loops to SIMD assembly.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: logical-analysis, primary-source.

Evidence needed: Recalculate the stated quantities or compare the stated physical premises with primary evidence.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

## Learning goals

### `executive-briefing-u14-g01`: Scientific software

Trace the stated language boundary and test its numerical or performance consequence.

Prerequisites: Fortran basics, Computer architecture

Claim dependencies: `executive-briefing-u14-c01`

## Exact source excerpt

#### Section 3: Computational Engineering, Numerical Methods, and Software Paradigms

  High-Level Code vs. Bare-Metal Execution in Physics Simulations  
    
  \[Fortran 2018 Abstraction\]              \[x86-64 / SIMD Kernel\]  
  speed \= speed \+ boost             mov ax, \[speed\] \-\> add ax, \[boost\]  
  (32 built-in routines)            (AVX-512 / Vectorized Force Loops)  
           |                                         |  
           v                                         v  
  Global Integrator / Logic               Innermost Force Evaluations  
  (Managed Mathematical Flow)             (Saturates ALU / Zero Stalls)
