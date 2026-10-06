; A side: the test program of test 4. It has no graphics.
; Start at 0000, write the counter, then run bcd_inc. Do this 10,000 times (0000 to 9999).
; Then write the value after 9999 (it must be 0000) and the carry flag (it must be 1).
; The file BCD.BIN has 20,003 bytes: 10,000 values of 2 bytes (the low byte first),
; the value after 9999 (2 bytes), and the carry (1 byte).
; The B-side program lab/check_bcd.f90 then compares all of them with its own answers.
;
; Build: nasm -f bin -i ../src/ -o CHECKBCD.COM checkbcd.asm
;        nasm -f bin -i ../src/ -dWRONG_DECIMAL -o CHECKBCW.COM checkbcd.asm   (test 4b, writes BCDW.BIN)
cpu 8086
bits 16
org 100h

    cld                         ; STOSW goes up in memory
    mov di, values              ; in a .COM program, ES = DS
    mov cx, 10000
next_value:
    mov ax, [counter]
    stosw                       ; write AX at [ES:DI], then DI = DI + 2
    call bcd_inc
    loop next_value             ; STOSW and LOOP do not change CF
    mov al, 0
    adc al, 0                   ; AL = the carry of the last bcd_inc, after 9999
    mov dx, [counter]
    mov [after], dx
    mov [carry], al

    mov ah, 3Ch                 ; DOS: make a new file
    xor cx, cx                  ; with normal attributes
    mov dx, file_name
    int 21h
    jc failed                   ; CF = 1 means an error
    mov bx, ax                  ; BX = the file handle
    mov ah, 40h                 ; DOS: write to the file
    mov cx, 20003
    mov dx, values
    int 21h
    jc failed
    mov ah, 3Eh                 ; DOS: close the file
    int 21h
    mov ax, 4C00h               ; DOS: stop, result 0 (success)
    int 21h
failed:
    mov ax, 4C01h               ; DOS: stop, result 1 (error)
    int 21h

%include "bcd.inc"

%ifdef WRONG_DECIMAL
file_name   db 'BCDW.BIN', 0
%else
file_name   db 'BCD.BIN', 0
%endif
values      times 10000 dw 0
after       dw 0                ; the value after 9999
carry       db 0                ; the carry after 9999
