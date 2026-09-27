; The shared routines of the second test: the dot in 3D.
; The game (dot3d.asm) and the test (test/check3d.asm) use these same routines.
;
; The world has three directions:
;   X  left (-) and right (+)
;   Y  down (-) and up (+)
;   Z  near (-) and far (+): this is the new direction, the depth
;
; The eye looks along Z. A far point comes nearer to the center of the screen:
;   screen x = 160 + X * 200 / (Z + 448)
;   screen y =  50 - (Y - 120) * 200 / (Z + 448)
; 448 is the distance from the eye to the center of the world (Z = 0).
; 200 is the distance from the eye to the screen. 120 is the height of the eye.

EYE_DISTANCE    equ 448
SCREEN_DISTANCE equ 200
EYE_HEIGHT      equ 120
HORIZON_ROW     equ 50
FLOOR           equ -96         ; the Y of the floor

; path_point: the 3D point of the path for one angle.
; The height is the sine (as in the first test). The depth is the cosine:
; the sine of the angle a quarter turn (64 angles) later.
;
; In:  SI = angle number, 0 to 255
; Out: AX = X (-256 to 254), BX = Y (-64 to 64), CX = Z (-128 to 128)
; Also changes: DX
; Needs: the label sine_table (256 words from the B-side file sine.bin)
path_point:
    mov bx, si
    shl bx, 1                   ; each table value is 2 bytes
    mov ax, [sine_table + bx]   ; sine in 8.8 fixed point: 256 means 1.0
    mov cx, 64                  ; the height: 64 up and 64 down
    imul cx                     ; DX:AX = sine * 64
    mov al, ah                  ; divide DX:AX by 256: keep the middle two bytes
    mov ah, dl
    push ax                     ; keep Y

    mov bx, si
    add bx, 64                  ; a quarter turn later
    and bx, 00FFh               ; after angle 255, start again at 0
    shl bx, 1
    mov ax, [sine_table + bx]   ; the cosine
    mov cx, 128                 ; the depth: 128 near and 128 far
    imul cx                     ; DX:AX = cosine * 128 (too large for AX alone)
    mov al, ah                  ; divide DX:AX by 256
    mov ah, dl
    mov cx, ax                  ; CX = Z

    pop bx                      ; BX = Y
    mov ax, si
    sub ax, 128
    shl ax, 1                   ; AX = X = 2 * (angle - 128)
    ret

; project: change a 3D point into a screen position (the perspective).
; A far point has a large distance, so the division makes it smaller.
;
; In:  AX = X, BX = Y, CX = Z
; Out: AX = screen x, BX = screen y, CX = the distance from the eye (Z + 448)
; Also changes: DX
project:
    add cx, EYE_DISTANCE        ; CX = the distance from the eye
    push bx                     ; keep Y
    mov dx, SCREEN_DISTANCE
    imul dx                     ; DX:AX = X * 200
    idiv cx                     ; AX = DX:AX / distance (the 8086 rounds toward zero)
    add ax, 160                 ; the center column of the screen
    pop bx
    push ax                     ; keep the screen x
    mov ax, bx
    sub ax, EYE_HEIGHT          ; the height above or below the eye
    mov dx, SCREEN_DISTANCE
    imul dx                     ; DX:AX = (Y - 120) * 200
    idiv cx
    neg ax                      ; screen rows count down from the top: "up" is a smaller row
    add ax, HORIZON_ROW         ; a point at the height of the eye goes to row 50
    mov bx, ax                  ; BX = screen y
    pop ax                      ; AX = screen x
    ret
