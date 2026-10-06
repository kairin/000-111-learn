; Shared routines of the game programs of tests 2, 3 and 4 (dot3d.asm, spin3d.asm and counter.asm):
; the keys, the pixel address and the screen refresh.

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
%ifdef JUMP_KEY                 ; only test 4 has the key J (its routine jump_key)
    cmp al, 'j'
    jne .not_jump
    jmp jump_key
.not_jump:
%endif
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

delay       db 8                ; refreshes for each step: 8 means about 9 steps each second
tick        db 0
paused      db 0
step        db 0
speeds      db 1, 2, 4, 8, 16   ; the refreshes for each step, for the keys 1 to 5
