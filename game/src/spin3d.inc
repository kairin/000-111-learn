; The shared routine of test 3: the sine wave turns around the center of the world.
; The game (spin3d.asm) and the test (test/check3r.asm) use this same routine.
; It needs the constants and the routine project of path3d.inc.
;
; Before the turn, the wave goes from the back to the front, through the center:
;   X = 0,  Y = 64 * sine(angle),  Z = d = 128 - angle
; The turn is a second angle, T (256 steps are one full turn). After the turn:
;   X = d * sine(T)
;   Z = d * cosine(T)
; At T = 0, the wave goes from the back to the front. At T = 64 (a quarter turn),
; it goes from the right to the left, as in test 1.

%ifdef WRONG_TURN
QUARTER_TURN    equ 90          ; test 3b: WRONG. 90 is a quarter turn in degrees, but this circle has 256 steps.
%else
QUARTER_TURN    equ 64          ; a quarter turn: 256 steps / 4. The cosine is the sine a quarter turn later.
%endif

; spin_point: the 3D point of the turning wave.
;
; In:  SI = angle along the wave, 0 to 255 (0 is one end, 128 is the center)
;      BP = the turn T, 0 to 255
; Out: AX = X, BX = Y, CX = Z (each from -128 to 128)
; Also changes: DX
; Needs: the label sine_table (256 words from the B-side file sine.bin)
spin_point:
    mov bx, si
    shl bx, 1                   ; each table value is 2 bytes
    mov ax, [sine_table + bx]   ; the sine of the angle along the wave
    mov cx, 64                  ; the height: 64 up and 64 down
    imul cx                     ; DX:AX = sine * 64
    mov al, ah                  ; divide DX:AX by 256: keep the middle two bytes
    mov ah, dl
    push ax                     ; keep Y

    mov cx, 128
    sub cx, si                  ; CX = d = 128 - angle: the place on the wave

    mov bx, bp
    shl bx, 1
    mov ax, [sine_table + bx]   ; the sine of the turn
    imul cx                     ; DX:AX = d * sine (128 * 256 = 32768: too large for AX alone)
    mov al, ah                  ; divide DX:AX by 256
    mov ah, dl
    push ax                     ; keep X

    mov bx, bp
    add bx, QUARTER_TURN        ; the cosine is the sine a quarter turn later
    and bx, 00FFh               ; after step 255, start again at 0
    shl bx, 1
    mov ax, [sine_table + bx]   ; the cosine of the turn
    imul cx                     ; DX:AX = d * cosine
    mov al, ah                  ; divide DX:AX by 256
    mov ah, dl
    mov cx, ax                  ; CX = Z

    pop ax                      ; AX = X
    pop bx                      ; BX = Y
    ret
