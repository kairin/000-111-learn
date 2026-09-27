; A side: the second test. The same dot as in the first test, but the world now has depth.
; The dot goes up and down (the sine) and also from the back to the front.
; The middle point of the curve is the center of the 3D space.
; The program draws a floor, the path in the air, and the footprint of the path on the floor.
; Then it moves a yellow dot along the path. A pole goes from the dot down to its shadow.
; A near dot is larger than a far dot.
;
; Keys:  1 to 5  speed (1 is the fastest)
;        Space   pause or continue
;        N       one step, while the program is paused
;        Esc     stop the program
;
; Build: nasm -f bin -o DOT3D.COM dot3d.asm   (sine.bin must be in the same folder)
; With -dWRONG_SIGN, NASM builds the wrong program of test 2b (see path3d.inc).
cpu 8086                        ; the assembler refuses words that are newer than the 8086
bits 16
org 100h                        ; a DOS .COM program starts at address 100h

start:
    mov ax, 0013h               ; BIOS: 320 x 200 pixels, 256 colors (Mode 13h)
    int 10h
    mov ax, 0A000h              ; the segment of the screen memory
    mov es, ax

; The floor: 9 lines from near to far, and 15 lines from left to right, in blue (color 1).
    mov bp, -128                ; BP = Z of the line
floor_across:
    mov si, -224                ; SI = X
.point:
    mov ax, si
    mov bx, FLOOR
    mov cx, bp
    call project
    call pixel_at
    mov byte [es:di], 1
    add si, 2
    cmp si, 224
    jle .point
    add bp, 32
    cmp bp, 128
    jle floor_across

    mov si, -224                ; SI = X of the line
floor_deep:
    mov bp, -128                ; BP = Z
.point:
    mov ax, si
    mov bx, FLOOR
    mov cx, bp
    call project
    call pixel_at
    mov byte [es:di], 1
    inc bp
    cmp bp, 128
    jle .point
    add si, 32
    cmp si, 224
    jle floor_deep

; The footprint of the path on the floor, in cyan (color 3).
    xor si, si                  ; SI = angle number
draw_footprint:
    call path_point
    mov bx, FLOOR               ; the same X and Z, but on the floor
    call project
    call pixel_at
    mov byte [es:di], 3
    inc si
    cmp si, 256
    jb draw_footprint

; The path in the air, in dark gray (color 8).
    xor si, si
draw_path:
    call path_point
    call project
    call pixel_at
    mov byte [es:di], 8
    inc si
    cmp si, 256
    jb draw_path

    xor si, si                  ; the dot starts at angle 0

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

; move_dot: remove the old dot, pole and shadow. Draw them for angle SI.
; Then go to the next angle. After angle 255, start again at 0.
move_dot:
    call undo
    call path_point             ; AX = X, BX = Y, CX = Z
    mov [z], cx
    push ax                     ; keep X and Z for the shadow
    push cx
    call project
    mov [dot_x], ax
    mov [dot_y], bx
    pop cx
    pop ax
    mov bx, FLOOR               ; the shadow: the same X and Z, on the floor
    call project
    mov [shadow_y], bx

    mov byte [dot_size], 2      ; far: 2 x 2 pixels
    mov ax, [z]
    cmp ax, 43
    jge .sized
    inc byte [dot_size]         ; middle: 3 x 3 pixels
    cmp ax, -43
    jge .sized
    inc byte [dot_size]         ; near: 4 x 4 pixels
.sized:

    mov cx, [dot_y]             ; the pole: from under the dot to the shadow
    mov al, [dot_size]
    xor ah, ah
    add cx, ax
.pole:
    cmp cx, [shadow_y]
    jge .shadow
    mov ax, [dot_x]
    mov bx, cx
    mov dl, 7                   ; light gray
    call plot
    inc cx
    jmp .pole
.shadow:
    mov ax, [dot_x]
    mov bx, [shadow_y]
    mov dl, 12                  ; light red
    call plot

    xor ch, ch                  ; the dot: a square, CH = row, CL = column
.row:
    xor cl, cl
.column:
    mov al, cl
    xor ah, ah
    add ax, [dot_x]
    mov bl, ch
    xor bh, bh
    add bx, [dot_y]
    mov dl, 14                  ; yellow
    call plot
    inc cl
    cmp cl, [dot_size]
    jb .column
    inc ch
    cmp ch, [dot_size]
    jb .row

    inc si
    and si, 00FFh
    ret

; plot: draw one pixel, and remember the old color, so that undo can put it back.
; In: AX = x, BX = y, DL = color. Also changes: AX, BX, DI.
plot:
    push dx
    call pixel_at
    pop dx
    mov bx, [undo_count]
    mov al, [es:di]
    mov [undo_color + bx], al   ; the old color
    shl bx, 1
    mov [undo_place + bx], di   ; the place (2 bytes)
    shr bx, 1
    inc bx
    mov [undo_count], bx
    mov [es:di], dl
    ret

; undo: put back the old colors, the last pixel first. Changes: AX, BX, DI.
undo:
    mov bx, [undo_count]
.next:
    cmp bx, 0
    je .done
    dec bx
    mov al, [undo_color + bx]
    shl bx, 1
    mov di, [undo_place + bx]
    shr bx, 1
    mov [es:di], al
    jmp .next
.done:
    mov word [undo_count], 0
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

; pixel_at: DI = y * 320 + x.
; In: AX = x, BX = y. Also changes: AX, DX.
pixel_at:
    push ax
    mov ax, 320
    mul bx                      ; DX:AX = y * 320
    pop di
    add di, ax
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

%include "path3d.inc"

z           dw 0
dot_x       dw 0
dot_y       dw 0
shadow_y    dw 0
dot_size    db 2
delay       db 8                ; refreshes for each step: 8 means about 9 steps each second
tick        db 0
paused      db 0
step        db 0
speeds      db 1, 2, 4, 8, 16   ; the refreshes for each step, for the keys 1 to 5
undo_count  dw 0
sine_table: incbin "sine.bin"

; The memory after the program is free in a .COM program. The undo list uses it.
; The pole has at most 200 pixels, the dot 16 and the shadow 1: 256 places are enough.
undo_color  equ $               ; 256 bytes: the old colors
undo_place  equ $ + 256         ; 256 words: the places on the screen
