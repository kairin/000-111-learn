! B side, the laboratory: check the answers of the A side.
!
! The A-side test program (test/check.asm) runs the routine sine_y for all
! 256 angles inside DOSBox and writes the 256 screen rows to Y.BIN.
! This program calculates the same rows again, in the same whole-number steps,
! and compares them. It also compares them with the exact maths, to show the
! small error of fixed-point arithmetic.
program check_y
  use, intrinsic :: iso_fortran_env, only: int8, int16, real64
  implicit none

  integer, parameter :: n = 256, center = 100, amplitude = 80
  real(real64), parameter :: pi = acos(-1.0_real64)
  integer(int16) :: table(0:n - 1)
  integer(int8) :: a_side(0:n - 1)
  integer :: expected(0:n - 1), got(0:n - 1), exact(0:n - 1)
  integer :: i, unit, mismatches, worst

  open (newunit=unit, file='sine.bin', access='stream', form='unformatted', status='old')
  read (unit) table
  close (unit)
  open (newunit=unit, file='Y.BIN', access='stream', form='unformatted', status='old')
  read (unit) a_side
  close (unit)

  do i = 0, n - 1
    ! The same steps as sine_y: multiply by 80, then an arithmetic shift right
    ! by 8 (divide by 256 and keep the sign). Screen rows count down from the
    ! top, so the result goes up from the center row: subtract it.
    expected(i) = center - shifta(int(table(i)) * amplitude, 8)
    got(i) = iand(int(a_side(i)), 255)                 ! a byte from 0 to 255
    exact(i) = nint(center - amplitude * sin(2.0_real64 * pi * i / n))
  end do

  mismatches = count(got /= expected)
  worst = maxval(abs(got - exact))

  print '(a, i0, a, i0)', 'A side and B side agree on ', n - mismatches, ' of ', n
  print '(a, i0, a)', 'Largest difference from the exact maths: ', worst, ' pixel(s)'

  open (newunit=unit, file='check.json', status='replace')
  write (unit, '(a, i0, a, i0, a, i0, a, a, a)') '{"values": ', n, ', "agree": ', n - mismatches, &
    ', "max_error_px": ', worst, ', "passed": ', trim(merge('true ', 'false', mismatches == 0)), '}'
  close (unit)

  if (mismatches /= 0) error stop 'The A side and the B side disagree.'
end program check_y
