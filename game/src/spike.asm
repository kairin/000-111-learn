; A side: the first test of the toolchain.
; Draw the sine curve that the B side calculated, then move a yellow dot along it.
; The dot moves one step after a number of screen refreshes (see "speeds").
;
; Keys:  1 to 5  speed (1 is the fastest)
;        Space   pause or continue
;        N       one step, while the program is paused
;        Esc     stop the program
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
    call wait_vsync             ; one screen refresh (70 each second)
    call read_keys              ; speed, pause, step or stop
    cmp byte [paused], 0
    jne .paused
    inc byte [tick]             ; count the refreshes
    mov al, [tick]
    cmp al, [delay]
    jb frame                    ; not yet time for the next step
    mov byte [tick], 0
    call move_dot
    jmp frame
.paused:
    cmp byte [step], 0          ; while paused, move only when N asks for a step
    je frame
    mov byte [step], 0
    call move_dot
    jmp frame

; move_dot: put the curve color back at the old place, draw the dot for angle SI,
; then go to the next angle. After angle 255, start again at 0.
move_dot:
    mov di, [old_pos]
    mov byte [es:di], 8
    call sine_y
    call pixel_offset
    mov [old_pos], di
    mov byte [es:di], 14        ; draw the dot in yellow
    inc si
    and si, 00FFh
    ret

; read_keys: if a key is ready, read it and do its action. Changes: AX, BX.
read_keys:
    mov ah, 01h                 ; BIOS: is a key ready? (ZF = 1 means no)
    int 16h
    jz .done
    mov ah, 00h                 ; BIOS: read the key. AL = its character
    int 16h
    cmp al, 1Bh                 ; Esc
    je quit
    cmp al, ' '                 ; Space: pause or continue
    jne .not_space
    xor byte [paused], 1
    ret
.not_space:
    or al, 20h                  ; a capital letter becomes a small letter
    cmp al, 'n'                 ; N: one step while paused
    jne .not_step
    mov byte [step], 1
    ret
.not_step:
    sub al, '1'                 ; the keys 1 to 5 become 0 to 4
    cmp al, 4
    ja .done                    ; another key: do nothing
    mov bx, speeds
    xlat                        ; AL = the byte at [BX + AL]: a table lookup
    mov [delay], al
    mov byte [tick], 0
.done:
    ret

quit:
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
delay       db 8                ; refreshes for each step: 8 means about 9 steps each second
tick        db 0
paused      db 0
step        db 0
speeds      db 1, 2, 4, 8, 16   ; the refreshes for each step, for the keys 1 to 5
sine_table: incbin "sine.bin"
