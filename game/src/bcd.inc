; Test 4: a packed decimal counter from 0000 to 9999 in two bytes.
; The game (counter.asm) and the test (test/checkbcd.asm) use these same routines.
;
; Packed decimal (BCD) keeps one decimal digit in each half of a byte (a nibble).
; The number 1234 is the two bytes 12h 34h. The low byte comes first in memory: 34h, 12h.
; The 8086 has no decimal flag. It adds in binary, and DAA (decimal adjust after
; addition) then corrects AL: 09h + 1 = 0Ah becomes 10h, and 99h + 1 = 9Ah becomes 00h
; with CF = 1.
;
; Test 4b: the switch -dWRONG_DECIMAL removes the two DAA words. The counter then
; counts in binary: after 0009 comes 000A, not 0010.

; bcd_inc: add 1 to [counter]. After 9999 comes 0000, with CF = 1.
; Changes: AL, the flags.
bcd_inc:
    mov al, [counter]           ; the low byte: the tens and the units
    add al, 1                   ; INC does not change CF, so the program uses ADD
%ifndef WRONG_DECIMAL
    daa                         ; make AL a decimal pair again. CF = 1 after 99
%endif
    mov [counter], al           ; MOV does not change the flags: CF stays
    mov al, [counter + 1]       ; the high byte: the thousands and the hundreds
    adc al, 0                   ; add the carry from the low byte
%ifndef WRONG_DECIMAL
    daa
%endif
    mov [counter + 1], al       ; CF = 1 only after 9999
    ret

; bcd_digits: write the 4 digits of [counter] as 4 characters at DI.
; XLAT reads one character from a table of 16: a nibble from 0 to 15 gives "0" to "F".
; With DAA, each nibble is 0 to 9. Without DAA, the letters A to F show the error.
; Changes: AX, BX, CL, DI.
bcd_digits:
    mov bx, hex_digits
    mov al, [counter + 1]       ; the high byte first: the thousands are on the left
    call .pair
    mov al, [counter]
.pair:
    mov ah, al
    mov cl, 4
    shr al, cl                  ; the high nibble. The 8086 shifts by more than 1 only with CL
    xlat                        ; AL = the byte at [BX + AL]
    mov [di], al
    inc di
    mov al, ah
    and al, 0Fh                 ; the low nibble
    xlat
    mov [di], al
    inc di
    ret

hex_digits  db '0123456789ABCDEF'
counter     dw 0                ; two packed decimal bytes, the low byte first
