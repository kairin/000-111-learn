! B side, the laboratory: check the answers of the A side for test 3 (the turning wave).
!
! The A-side test program (test/check3r.asm) runs spin_point and project inside DOSBox
! for 16 turns (0, 16, 32 ... 240) and all 256 angles along the wave. It writes three
! numbers for each point: the screen x and y of the point, and the screen y of its shadow.
! This program calculates the same numbers again, in the same whole-number steps, and
! compares them. It also compares them with the exact maths.
!
! Arguments (both are optional): the A-side file (default R3D.BIN) and the result file
! (default check3r.json). Test 3b gives R3DW.BIN, the answers of the wrong program.
program check_spin
  use, intrinsic :: iso_fortran_env, only: int16, real64
  implicit none

  integer, parameter :: n = 256, turns = 16, turn_step = 16
  integer, parameter :: eye_distance = 448, screen_distance = 200, eye_height = 120
  integer, parameter :: horizon_row = 50, floor = -96, quarter_turn = 64
  real(real64), parameter :: pi = acos(-1.0_real64)
  integer(int16) :: table(0:n - 1), a_side(3, 0:n - 1, 0:turns - 1)
  integer :: expected(3, 0:n - 1, 0:turns - 1), exact(3, 0:n - 1, 0:turns - 1)
  integer :: wrong_by_turn(0:turns - 1)
  integer :: i, k, t, d, unit, mismatches, worst, x, y, z
  real(real64) :: theta, turn, xr, yr, zr
  character(len=256) :: in_file, out_file

  in_file = 'R3D.BIN'
  out_file = 'check3r.json'
  if (command_argument_count() >= 1) call get_command_argument(1, in_file)
  if (command_argument_count() >= 2) call get_command_argument(2, out_file)

  open (newunit=unit, file='sine.bin', access='stream', form='unformatted', status='old')
  read (unit) table
  close (unit)
  open (newunit=unit, file=trim(in_file), access='stream', form='unformatted', status='old')
  read (unit) a_side
  close (unit)

  do k = 0, turns - 1
    t = k * turn_step
    do i = 0, n - 1
      ! The same steps as spin_point: multiply, then keep the middle two bytes
      ! (an arithmetic shift right by 8). The cosine is the sine a quarter turn later.
      d = 128 - i
      x = shifta(d * int(table(t)), 8)
      y = shifta(int(table(i)) * 64, 8)
      z = shifta(d * int(table(modulo(t + quarter_turn, n))), 8)
      ! The same steps as project. Fortran and the 8086 both round a division toward zero.
      expected(1, i, k) = 160 + (x * screen_distance) / (z + eye_distance)
      expected(2, i, k) = horizon_row - ((y - eye_height) * screen_distance) / (z + eye_distance)
      expected(3, i, k) = horizon_row - ((floor - eye_height) * screen_distance) / (z + eye_distance)

      ! The exact maths, with decimal-point numbers.
      theta = 2.0_real64 * pi * i / n
      turn = 2.0_real64 * pi * t / n
      xr = d * sin(turn)
      yr = 64.0_real64 * sin(theta)
      zr = d * cos(turn)
      exact(1, i, k) = nint(160 + xr * screen_distance / (zr + eye_distance))
      exact(2, i, k) = nint(horizon_row - (yr - eye_height) * screen_distance / (zr + eye_distance))
      exact(3, i, k) = nint(horizon_row - (floor - eye_height) * screen_distance / (zr + eye_distance))
    end do
    wrong_by_turn(k) = count(any(int(a_side(:, :, k)) /= expected(:, :, k), dim=1))
  end do

  mismatches = sum(wrong_by_turn)
  worst = maxval(abs(int(a_side) - exact))

  print '(a, a)', 'File: ', trim(in_file)
  print '(a, i0, a, i0, a)', 'A side and B side agree on ', n * turns - mismatches, ' of ', n * turns, ' points'
  print '(a, i0, a)', 'Largest difference from the exact maths: ', worst, ' pixel(s)'

  ! The result, with the number of wrong points for each of the 16 turns.
  open (newunit=unit, file=trim(out_file), status='replace')
  write (unit, '(a, i0, a, i0, a, i0, a, a, a)', advance='no') '{"values": ', n * turns, ', "agree": ', &
    n * turns - mismatches, ', "max_error_px": ', worst, ', "passed": ', &
    trim(merge('true ', 'false', mismatches == 0)), ', "wrong_by_turn": ['
  do k = 0, turns - 1
    if (k > 0) write (unit, '(a)', advance='no') ', '
    write (unit, '(i0)', advance='no') wrong_by_turn(k)
  end do
  write (unit, '(a)') ']}'
  close (unit)

  if (mismatches /= 0) error stop 'The A side and the B side disagree.'
end program check_spin
