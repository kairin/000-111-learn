; A side: test 3. The sine wave of test 2 turns around the center of the world.
; Before the turn, the wave goes from the back to the front. The wave turns one step
; for each two steps of the dot. The program draws the floor and a ring on the floor:
; the circle that the two ends of the wave follow. For each step, it draws the wave,
; its footprint, and the dot with a pole down to its shadow.
;
; Double buffering: the whole picture changes at each step. If the program draws on the
; screen, you see the wave go away and come back. Thus it uses two buffers of 64000 bytes
; in the memory after the program: the background (the floor and the ring, drawn once)
; and the work buffer. For each step, it copies the background into the work buffer,
; draws the wave and the dot there, and then copies the finished picture to the screen.
;
; Keys:  1 to 5  speed (1 is the fastest)
;        Space   pause or continue
;        N       one step, while the program is paused
;        Esc     stop the program
;
; Build: nasm -f bin -o SPIN3D.COM spin3d.asm   (sine.bin must be in the same folder)
; With -dWRONG_TURN, NASM builds the wrong program of test 3b (see spin3d.inc).
cpu 8086                        ; the assembler refuses words that are newer than the 8086
bits 16
org 100h                        ; a DOS .COM program starts at address 100h

start:
    mov ax, 0013h               ; BIOS: 320 x 200 pixels, 256 colors (Mode 13h)
    int 10h
    mov ax, cs                  ; the two buffers: 64 KB (1000h paragraphs) and 128 KB after the program
    add ax, 1000h
    mov [background], ax
    add ax, 1000h
    mov [work], ax

    mov es, [background]        ; clear the background: 32000 words of color 0
    xor di, di
    xor ax, ax
    mov cx, 32000
    cld                         ; the string words go up in memory
    rep stosw

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

; The ring: the end of the wave (angle 0) for each of the 256 turns, on the floor (magenta, color 5).
    xor si, si
    xor bp, bp                  ; BP = the turn
draw_ring:
    call spin_point
    mov bx, FLOOR
    call project
    call pixel_at
    mov byte [es:di], 5
    inc bp
    cmp bp, 256
    jb draw_ring

    xor si, si                  ; SI = the angle of the dot along the wave
    xor bp, bp                  ; BP = the turn of the wave
    call move_step              ; the first picture

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
    call move_step
    jmp frame
.paused:
    cmp byte [step], 0          ; while paused, move only when N asks for a step
    je frame
    mov byte [step], 0
    call move_step
    jmp frame

; move_step: make the picture for the turn BP and the angle SI in the work buffer, and
; show it. Then go to the next angle, and turn the wave after each two steps.
move_step:
    mov ax, [background]        ; start from a clean copy of the floor and the ring
    mov bx, [work]
    call copy_buffer
    mov es, [work]              ; draw in the work buffer
    mov [dot_angle], si
    xor si, si
.wave:                          ; the wave in the air (gray) and its footprint (cyan)
    call spin_point             ; AX = X, BX = Y, CX = Z
    push ax
    push cx
    call project
    mov dl, 8                   ; dark gray
    call put
    pop cx
    pop ax
    mov bx, FLOOR
    call project
    mov dl, 3                   ; cyan
    call put
    inc si
    cmp si, 256
    jb .wave
    mov si, [dot_angle]

    call spin_point             ; the dot
    mov [z], cx
    push ax
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
    call put
    inc cx
    jmp .pole
.shadow:
    mov ax, [dot_x]
    mov bx, [shadow_y]
    mov dl, 12                  ; light red
    call put

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
    call put
    inc cl
    cmp cl, [dot_size]
    jb .column
    inc ch
    cmp ch, [dot_size]
    jb .row

    call wait_vsync             ; show the picture: copy the work buffer to the screen
    mov ax, [work]
    mov bx, 0A000h
    call copy_buffer

    inc si                      ; the next angle along the wave
    and si, 00FFh
    test si, 1                  ; after each two steps (SI is even again) ...
    jnz .done
    inc bp                      ; ... the wave turns one step
    and bp, 00FFh
.done:
    ret

; put: draw one pixel in the buffer at ES.
; In: AX = x, BX = y, DL = color. Also changes: AX, DI.
put:
    push dx
    call pixel_at
    pop dx
    mov [es:di], dl
    ret

; copy_buffer: copy 64000 bytes (one picture) from the segment AX to the segment BX.
; Changes: CX, ES.
copy_buffer:
    push ds
    push si
    push di
    mov ds, ax                  ; from DS:SI ...
    mov es, bx                  ; ... to ES:DI
    xor si, si
    xor di, di
    mov cx, 32000               ; 32000 words
    cld
    rep movsw                   ; one instruction repeats the copy CX times
    pop di
    pop si
    pop ds
    ret

%include "common.inc"
%include "path3d.inc"
%include "spin3d.inc"

background  dw 0                ; the segment of the background buffer
work        dw 0                ; the segment of the work buffer
dot_angle   dw 0
z           dw 0
dot_x       dw 0
dot_y       dw 0
shadow_y    dw 0
dot_size    db 2
sine_table: incbin "sine.bin"
