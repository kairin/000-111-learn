; sine_y: calculate the screen row (y) of the dot for one angle.
; The game (spike.asm) and the test (test/check.asm) use this same routine.
;
; In:  SI = angle number, 0 to 255 (256 angles are one full turn)
; Out: AX = the screen row, 20 to 180
; Also changes: BX, CX, DX
; Needs: the label sine_table (256 words from the B-side file sine.bin)
sine_y:
    mov bx, si
    shl bx, 1                   ; each table value is 2 bytes
    mov ax, [sine_table + bx]   ; sine in 8.8 fixed point: 256 means 1.0
    mov cx, 80                  ; the amplitude: 80 pixels up and down
    imul cx                     ; DX:AX = AX * 80 (numbers with a sign)
    mov cl, 8                   ; the 8086 shifts by 1 or by CL only
    sar ax, cl                  ; divide by 256 and keep the sign
    neg ax                      ; screen rows count down from the top: "up" is a smaller row
    add ax, 100                 ; the center row of the screen
    ret
