; A side: the first test of the toolchain.
; Draw the sine curve that the B side calculated, then move a yellow dot along it.
; Each move waits for the screen refresh. Push a key to stop.
;
; Build: nasm -f bin -o SPIKE.COM spike.asm   (sine.bin must be in the same folder)
cpu 8086                        ; the assembler refuses words that are newer than the 8086
bits 16
org 100h                        ; a DOS .COM program starts at address 100h

start:
    mov ax, 0013h               ; BIOS: 320 x 200 pixels, 256 colors (Mode 13h)
    int 10h
    mov ax, 0A000h              ; the segment of the screen memory
    mov es, ax

    xor si, si                  ; SI = angle number
draw_curve:                     ; draw the full curve in dark gray (color 8)
    call sine_y
    call pixel_offset
    mov byte [es:di], 8
    inc si
    cmp si, 256
    jb draw_curve

    xor si, si                  ; remember the place of the first dot
    call sine_y
    call pixel_offset
    mov [old_pos], di

frame:
    call wait_vsync
    mov di, [old_pos]
    mov byte [es:di], 8         ; put the curve color back at the old place
    call sine_y
    call pixel_offset
    mov [old_pos], di
    mov byte [es:di], 14        ; draw the dot in yellow
    inc si
    and si, 00FFh               ; after angle 255, start again at 0

    mov ah, 01h                 ; BIOS: is a key ready? (ZF = 1 means no)
    int 16h
    jz frame
    mov ah, 00h                 ; BIOS: read the key
    int 16h

    mov ax, 0003h               ; BIOS: text mode again
    int 10h
    mov ax, 4C00h               ; DOS: stop the program
    int 21h

; pixel_offset: DI = y * 320 + x, with x = 32 + SI.
; In: AX = y. Also changes: DX.
pixel_offset:
    mov dx, 320
    mul dx                      ; AX = y * 320
    add ax, 32
    add ax, si
    mov di, ax
    ret

; wait_vsync: wait for the start of the vertical retrace (the beam goes to the top).
; Bit 3 of the VGA status port 3DAh is 1 during the retrace.
wait_vsync:
    mov dx, 3DAh
retrace_end:                    ; if a retrace is in progress, wait for its end
    in al, dx
    test al, 8
    jnz retrace_end
retrace_start:                  ; then wait for the next retrace to start
    in al, dx
    test al, 8
    jz retrace_start
    ret

%include "sine_y.inc"

old_pos     dw 0
sine_table: incbin "sine.bin"
