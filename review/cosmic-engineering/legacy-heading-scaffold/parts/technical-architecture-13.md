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

