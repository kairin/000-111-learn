! B side, the laboratory: make the sine table for the A-side program.
!
! The 8086 has no verbs for decimal-point numbers. Thus, this program does the
! maths once, before the game runs. Each value is round(256 * sin(angle)):
! a 16-bit whole number in "8.8 fixed point" (256 means 1.0).
! The A-side program reads the file sine.bin with the NASM word incbin.
program sine_table
  use, intrinsic :: iso_fortran_env, only: int16, real64
  implicit none

  integer, parameter :: n = 256                        ! angles in one full turn
  real(real64), parameter :: pi = acos(-1.0_real64)
  integer(int16) :: table(0:n - 1)
  integer :: i, unit

  do i = 0, n - 1
    table(i) = int(nint(256.0_real64 * sin(2.0_real64 * pi * i / n)), int16)
  end do

  ! Stream access writes the raw bytes, 2 for each value, low byte first.
  open (newunit=unit, file='sine.bin', access='stream', form='unformatted', status='replace')
  write (unit) table
  close (unit)

  print '(a, i0, a, i0, a, i0)', 'sine.bin: ', n, ' values. Smallest ', minval(table), ', largest ', maxval(table)
end program sine_table
