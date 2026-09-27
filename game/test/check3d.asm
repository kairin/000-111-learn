; A side: the test program of the second test. It has no graphics.
; Run path_point and project for all 256 angles. For each angle, keep three words:
; the screen x and the screen y of the dot, and the screen y of its shadow on the floor.
; Then write the 768 words to the file P3D.BIN.
; The B-side program lab/check_3d.f90 then compares them with its own answers.
;
; Build: nasm -f bin -i ../src/ -o CHECK3D.COM check3d.asm
cpu 8086
bits 16
org 100h

    xor si, si                  ; SI = angle number
    mov di, points              ; DI = the place for the next word
next_angle:
    call path_point             ; AX = X, BX = Y, CX = Z
    push ax
    push cx
    call project
    mov [di], ax                ; the screen x of the dot
    mov [di + 2], bx            ; the screen y of the dot
    pop cx
    pop ax
    mov bx, FLOOR
    call project
    mov [di + 4], bx            ; the screen y of the shadow
    add di, 6
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
    mov cx, 256 * 6
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

file_name   db 'P3D.BIN', 0
points      times 256 * 3 dw 0
sine_table: incbin "sine.bin"
