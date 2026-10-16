# *Modern Fortran to Assembly C-Interop Specification*

- Unit: `technical-architecture-u13`
- Source: [`sources/technical-architecture.md`](../../sources/technical-architecture.md)
- Characters: `9296:10535`
- Lines: `63:82`
- Purposes: claim-review, learning
- Excerpt SHA-256: `3a996652c877265c16bf386ed8e9143979f2b064274b5bd4da3eeaa4c21dffdc`

This unit preserves the complete source passage about *Modern Fortran to Assembly C-Interop Specification*.

## Claims

### `technical-architecture-u13-c01`

The design passes particle mass, position, and acceleration pointers directly from Fortran structures to C-exported Assembly routines.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, reproduction.

Evidence needed: Inspect a versioned implementation and reproduce the stated behavior with a defined workload and hardware configuration.

Assumptions:
- The described code, hardware, version, and workload conditions apply. (`explicit`)

### `technical-architecture-u13-c02`

In the underlying Assembly implementation, array memory addresses passed into vector registers (e.g., AVX-512 zmm0–zmm7) are processed in contiguous 64-byte chunks, maximizing memory bandwidth and L1 cache utilization.

Type: `quantitative`. Status: `unchecked`. Priority: `high`.

Review methods: calculation, independent-source.

Evidence needed: Recalculate the stated quantity from declared inputs and compare it with an independent source.

Assumptions:
- The numerical inputs, units, efficiencies, and boundary conditions stated in the passage apply. (`explicit`)

### `technical-architecture-u13-c03`

The source says ISO C Binding connects the Fortran and Assembly layers without call-overhead penalties.

Type: `software`. Status: `unchecked`. Priority: `high`.

Review methods: code-inspection, reproduction.

Evidence needed: Benchmark the interoperation boundary and inspect whether copying or wrapper calls remain.

Assumptions:
- The shown interoperability interface is the one used by the proposed engine. (`explicit`)

## Learning goals

### `technical-architecture-u13-g01`: Scientific computing

Trace the stated language boundary and test its numerical or performance consequence.

Prerequisites: Programming fundamentals, Arrays and data types

Claim dependencies: `technical-architecture-u13-c01`, `technical-architecture-u13-c02`

## Exact source excerpt

###### *Modern Fortran to Assembly C-Interop Specification*

To bridge the numerical Fortran layer with the high-throughput Assembly SIMD routines without incurring call-overhead penalties, the engine utilizes Fortran’s ISO C Binding (iso\_c\_binding). Memory pointers for particle mass, position, and acceleration arrays are passed directly from Fortran structures to C-exported Assembly routines.  
module SIMD\_Force\_Interface  
  use, intrinsic :: iso\_c\_binding  
  implicit none

  interface  
    \! Assembly kernel bindings executing hand-tuned AVX-512 / ARM SVE force loops  
    subroutine compute\_nbody\_forces\_asm(n\_particles, pos\_x, pos\_y, pos\_z, mass, accel\_out) &  
               bind(C, name="compute\_nbody\_forces\_asm")  
      import :: c\_int, c\_double, c\_ptr  
      integer(c\_int), value :: n\_particles  
      type(c\_ptr), value    :: pos\_x, pos\_y, pos\_z, mass, accel\_out  
    end subroutine compute\_nbody\_forces\_asm  
  end interface  
end module SIMD\_Force\_Interface

In the underlying Assembly implementation, array memory addresses passed into vector registers (e.g., AVX-512 zmm0–zmm7) are processed in contiguous 64-byte chunks, maximizing memory bandwidth and L1 cache utilization.
