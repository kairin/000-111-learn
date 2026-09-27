! B side, the laboratory: check the answers of the A side for the second test (the dot in 3D).
!
! The A-side test program (test/check3d.asm) runs path_point and project for all
! 256 angles inside DOSBox. It writes three numbers for each angle to P3D.BIN:
! the screen x and y of the dot, and the screen y of its shadow on the floor.
! This program calculates the same numbers again, in the same whole-number steps,
! and compares them. It also compares them with the exact maths.
program check_3d
  use, intrinsic :: iso_fortran_env, only: int16, real64
  implicit none

  integer, parameter :: n = 256
  integer, parameter :: eye_distance = 448, screen_distance = 200, eye_height = 120
  integer, parameter :: horizon_row = 50, floor = -96
  real(real64), parameter :: pi = acos(-1.0_real64)
  integer(int16) :: table(0:n - 1), a_side(3, 0:n - 1)
  integer :: expected(3, 0:n - 1), exact(3, 0:n - 1)
  integer :: i, unit, mismatches, worst, x, y, z
  real(real64) :: theta, xr, yr, zr

  open (newunit=unit, file='sine.bin', access='stream', form='unformatted', status='old')
  read (unit) table
  close (unit)
  open (newunit=unit, file='P3D.BIN', access='stream', form='unformatted', status='old')
  read (unit) a_side
  close (unit)

  do i = 0, n - 1
    ! The same steps as path_point: multiply, then keep the middle two bytes
    ! (an arithmetic shift right by 8). The cosine is the sine 64 angles later.
    x = 2 * (i - 128)
    y = shifta(int(table(i)) * 64, 8)
    z = shifta(int(table(modulo(i + 64, n))) * 128, 8)
    ! The same steps as project. Fortran and the 8086 both round a division toward zero.
    expected(1, i) = 160 + (x * screen_distance) / (z + eye_distance)
    expected(2, i) = horizon_row - ((y - eye_height) * screen_distance) / (z + eye_distance)
    expected(3, i) = horizon_row - ((floor - eye_height) * screen_distance) / (z + eye_distance)

    ! The exact maths, with decimal-point numbers.
    theta = 2.0_real64 * pi * i / n
    xr = 2.0_real64 * (i - 128)
    yr = 64.0_real64 * sin(theta)
    zr = 128.0_real64 * cos(theta)
    exact(1, i) = nint(160 + xr * screen_distance / (zr + eye_distance))
    exact(2, i) = nint(horizon_row - (yr - eye_height) * screen_distance / (zr + eye_distance))
    exact(3, i) = nint(horizon_row - (floor - eye_height) * screen_distance / (zr + eye_distance))
  end do

  mismatches = count(any(int(a_side) /= expected, dim=1))
  worst = maxval(abs(int(a_side) - exact))

  print '(a, i0, a, i0, a)', 'A side and B side agree on ', n - mismatches, ' of ', n, ' points'
  print '(a, i0, a)', 'Largest difference from the exact maths: ', worst, ' pixel(s)'

  open (newunit=unit, file='check3d.json', status='replace')
  write (unit, '(a, i0, a, i0, a, i0, a, a, a)') '{"values": ', n, ', "agree": ', n - mismatches, &
    ', "max_error_px": ', worst, ', "passed": ', trim(merge('true ', 'false', mismatches == 0)), '}'
  close (unit)

  if (mismatches /= 0) error stop 'The A side and the B side disagree.'
end program check_3d
