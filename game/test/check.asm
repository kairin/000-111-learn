; A side: the test program. It has no graphics.
; Run the routine sine_y for all 256 angles, then write the 256 rows to the file Y.BIN.
; The B-side program lab/check_y.f90 then compares the rows with its own answers.
;
; Build: nasm -f bin -i ../src/ -o CHECK.COM check.asm
cpu 8086
bits 16
org 100h

    xor si, si
next_angle:
    call sine_y
    mov [rows + si], al         ; one byte for each row (20 to 180)
    inc si
    cmp si, 256
    jb next_angle

    mov ah, 3Ch                 ; DOS: make a new file
    xor cx, cx                  ; with normal attributes
    mov dx, file_name
    int 21h
    jc failed                   ; CF = 1 means an error
    mov bx, ax                  ; BX = the file handle
    mov ah, 40h                 ; DOS: write to the file
    mov cx, 256
    mov dx, rows
    int 21h
    jc failed
    mov ah, 3Eh                 ; DOS: close the file
    int 21h
    mov ax, 4C00h               ; DOS: stop, result 0 (success)
    int 21h
failed:
    mov ax, 4C01h               ; DOS: stop, result 1 (error)
    int 21h

%include "sine_y.inc"

file_name   db 'Y.BIN', 0
rows        times 256 db 0
sine_table: incbin "sine.bin"
