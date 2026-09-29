; A side: the test program of test 3. It has no graphics.
; Run spin_point and project for 16 turns (0, 16, 32 ... 240) and all 256 angles along the wave.
; For each point, keep three words: the screen x and y of the point, and the screen y of its
; shadow on the floor. Then write the 12288 words to the file R3D.BIN.
; The B-side program lab/check_spin.f90 then compares them with its own answers.
;
; Build: nasm -f bin -i ../src/ -o CHECK3R.COM check3r.asm
; With -dWRONG_TURN, NASM builds the test of the wrong program (test 3b). It writes R3DW.BIN.
cpu 8086
bits 16
org 100h

    mov di, points              ; DI = the place for the next word
    xor bp, bp                  ; BP = the turn
next_turn:
    xor si, si                  ; SI = the angle along the wave
next_angle:
    call spin_point             ; AX = X, BX = Y, CX = Z
    push ax
    push cx
    call project
    mov [di], ax                ; the screen x of the point
    mov [di + 2], bx            ; the screen y of the point
    pop cx
    pop ax
    mov bx, FLOOR
    call project
    mov [di + 4], bx            ; the screen y of the shadow
    add di, 6
    inc si
    cmp si, 256
    jb next_angle
    add bp, 16
    cmp bp, 256
    jb next_turn

    mov ah, 3Ch                 ; DOS: make a new file
    xor cx, cx                  ; with normal attributes
    mov dx, file_name
    int 21h
    jc failed                   ; CF = 1 means an error
    mov bx, ax                  ; BX = the file handle
    mov ah, 40h                 ; DOS: write to the file
    mov cx, 16 * 256 * 6
    mov dx, points
    int 21h
    jc failed
    mov ah, 3Eh                 ; DOS: close the file
    int 21h
    mov ax, 4C00h               ; DOS: stop, result 0 (success)
    int 21h
failed:
    mov ax, 4C01h               ; DOS: stop, result 1 (error)
    int 21h

%include "path3d.inc"
%include "spin3d.inc"

%ifdef WRONG_TURN
file_name   db 'R3DW.BIN', 0    ; test 3b: the answers of the wrong program
%else
file_name   db 'R3D.BIN', 0
%endif
sine_table: incbin "sine.bin"

; The memory after the program is free in a .COM program. The 24576 bytes of answers use it.
points      equ $
