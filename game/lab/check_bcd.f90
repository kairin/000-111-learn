! B side, the laboratory: check the decimal counter of the A side (test 4).
!
! The A-side test program (test/checkbcd.asm) runs the routine bcd_inc 10,000
! times inside DOSBox. It writes each value of the counter (0000 to 9999) as two
! packed decimal bytes, the low byte first. Then it writes the value after 9999
! and the carry flag. This program makes each value again from the number of
! steps, with MOD and ISHFT, and compares all of them.
!
! Arguments (optional): the input file (default BCD.BIN) and the name of the
! result file (default check-bcd.json). Test 4b gives BCDW.BIN, the answers of
! the wrong program, to prove that the check finds the wrong values.
program check_bcd
  use, intrinsic :: iso_fortran_env, only: int8
  implicit none

  integer, parameter :: n = 10000
  integer(int8) :: bytes(0:2 * n + 2)
  integer :: expected(0:n - 1), got(0:n - 1), wrong_by_thousand(0:9)
  integer :: i, unit, mismatches, after, carry, first_wrong
  logical :: wrap_ok
  character(len=256) :: in_file, out_file

  in_file = 'BCD.BIN'
  out_file = 'check-bcd.json'
  if (command_argument_count() >= 1) call get_command_argument(1, in_file)
  if (command_argument_count() >= 2) call get_command_argument(2, out_file)

  open (newunit=unit, file=trim(in_file), access='stream', form='unformatted', status='old')
  read (unit) bytes
  close (unit)

  do i = 0, n - 1
    ! The packed decimal form of i: one digit in each group of 4 bits.
    expected(i) = ishft(i / 1000, 12) + ishft(mod(i / 100, 10), 8) + ishft(mod(i / 10, 10), 4) + mod(i, 10)
    got(i) = word_at(2 * i)
  end do
  after = word_at(2 * n)
  carry = iand(int(bytes(2 * n + 2)), 255)
  wrap_ok = after == 0 .and. carry == 1           ! after 9999 comes 0000, with a carry

  mismatches = count(got /= expected)
  first_wrong = -1
  if (any(got /= expected)) first_wrong = findloc(got /= expected, .true., dim=1) - 1
  do i = 0, 9
    wrong_by_thousand(i) = count(got(1000 * i:1000 * i + 999) /= expected(1000 * i:1000 * i + 999))
  end do

  print '(a, a)', 'File: ', trim(in_file)
  print '(a, i0, a, i0, a)', 'A side and B side agree on ', n - mismatches, ' of ', n, ' values'
  print '(a, z4.4, a, i0, a, a)', 'After 9999: ', after, ', carry ', carry, ' (must be 0000, carry 1): ', &
    trim(merge('right', 'wrong', wrap_ok))
  if (first_wrong >= 0) print '(a, i0, a, z4.4, a, z4.4)', 'First wrong value: step ', first_wrong, &
    ': A side ', got(first_wrong), ', B side ', expected(first_wrong)

  open (newunit=unit, file=trim(out_file), status='replace')
  write (unit, '(a, i0, a, i0, a, a, a, i0, a, i0, a, i0, a, a, a)', advance='no') &
    '{"values": ', n, ', "agree": ', n - mismatches, &
    ', "wrap_ok": ', trim(merge('true ', 'false', wrap_ok)), ', "after": ', after, ', "carry": ', carry, &
    ', "first_wrong": ', first_wrong, ', "passed": ', trim(merge('true ', 'false', mismatches == 0 .and. wrap_ok)), &
    ', "wrong_by_thousand": ['
  do i = 0, 9
    write (unit, '(i0, a)', advance='no') wrong_by_thousand(i), trim(merge(', ', ']}', i < 9))
  end do
  write (unit, '(a)') ''
  close (unit)

  if (mismatches /= 0 .or. .not. wrap_ok) error stop 'The A side and the B side disagree.'

contains

  ! The 16-bit value at byte k of the file: the low byte first.
  integer function word_at(k)
    integer, intent(in) :: k
    word_at = iand(int(bytes(k)), 255) + 256 * iand(int(bytes(k + 1)), 255)
  end function word_at

end program check_bcd
