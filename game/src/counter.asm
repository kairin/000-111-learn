; A side: test 4a, a packed decimal counter.
; The counter goes from 0000 to 9999, then to 0000 again with a carry. The program shows it as
; four large digits. Under each digit, it shows the 4 bits of its nibble: yellow is 1, gray is 0.
; The cell on the left is the carry: red after 9999 becomes 0000.
; The big digits come from the 8 x 8 font of the BIOS, each dot made 7 x 7 pixels.
;
; Keys:  1 to 5  speed (1 is the fastest)
;        Space   pause or continue
;        N       one step, while the program is paused
;        J       jump to 9990, to see the step after 9999 sooner
;        Esc     stop the program
;
; Build: nasm -f bin -i src/ -o COUNTER.COM counter.asm
;        nasm -f bin -i src/ -dWRONG_DECIMAL -o WRONGCT.COM counter.asm   (test 4b: no DAA)
cpu 8086
bits 16
org 100h

%define JUMP_KEY                ; read_keys in common.inc also reads the key J

DIGIT_Y     equ 40              ; the top row of the large digits
DIGIT_X     equ 36              ; the left column of the first digit. Each digit is 64 pixels wide
SCALE       equ 7               ; each dot of the font becomes 7 x 7 pixels
CELL_Y      equ 116             ; the top row of the bit cells
CELL        equ 12              ; a bit cell is 12 x 12 pixels, 14 pixels apart
DIGIT_COLOR equ 15              ; white

start:
    cld
    mov ax, 0013h               ; BIOS: 320 x 200 pixels, 256 colors (Mode 13h)
    int 10h
    mov ax, 1130h               ; BIOS: where is the 8 x 8 font? (ES:BP)
    mov bh, 03h
    int 10h
    mov [font_ptr], bp
    mov [font_ptr + 2], es
    mov ax, 0A000h              ; the segment of the screen memory
    mov es, ax

    mov si, title               ; the words on the screen
    mov dx, 0102h               ; row 1, column 2
    mov bl, 7
    call print_at
    mov si, label_c
    mov dx, 1102h
    call print_at
    mov si, label_high
    mov dx, 1107h
    call print_at
    mov si, label_low
    mov dx, 1118h
    call print_at
    mov si, label_keys
    mov dx, 1602h
    mov bl, 8
    call print_at

    call show                   ; 0000

frame:
    call wait_vsync             ; one screen refresh (70 each second)
    call read_keys              ; speed, pause, step, jump or stop
    cmp byte [paused], 0
    jne .paused
    inc byte [tick]             ; count the refreshes
    mov al, [tick]
    cmp al, [delay]
    jb frame                    ; not yet time for the next step
    mov byte [tick], 0
    call count_step
    jmp frame
.paused:
    cmp byte [step], 0          ; while paused, count only when N asks for a step
    je frame
    mov byte [step], 0
    call count_step
    jmp frame

; count_step: add 1 to the counter, keep the carry, and show the new value.
count_step:
    call bcd_inc                ; the routine of the test (bcd.inc)
    mov al, 0
    adc al, 0                   ; AL = CF: 1 only after 9999
    mov [last_carry], al
    jmp show

; jump_key: the key J. Go to the value that 9990 steps give.
jump_key:
%ifdef WRONG_DECIMAL
    mov word [counter], 9990    ; no DAA: the counter counts in binary (2706h)
%else
    mov word [counter], 9990h   ; packed decimal: the bytes 90h and 99h
%endif
    mov byte [last_carry], 0
    ; continue in show

; show: draw the four digits and the bit cells of [counter].
show:
    mov di, digit_chars
    call bcd_digits             ; 4 characters, from "0" to "F"
    mov si, digit_chars
    mov di, DIGIT_Y * 320 + DIGIT_X
    mov cx, 4
.digit:
    push cx
    push si
    push di
    mov al, [si]
    call draw_digit
    pop di
    pop si
    pop cx
    inc si
    add di, 64
    loop .digit
    ; continue in draw_cells

; draw_cells: one cell for each of the 16 bits of the counter, the high bit first.
; The 4 cells of a nibble are under the digit of that nibble.
draw_cells:
    mov bx, [counter]           ; BH = the high byte, BL = the low byte: bit 15 is the left cell
    mov di, CELL_Y * 320 + DIGIT_X
    mov dh, 4                   ; 4 nibbles
.nibble:
    mov dl, 4                   ; 4 bits in each nibble
.cell:
    mov al, 8                   ; gray: the bit is 0
    shl bx, 1                   ; the next bit goes into CF
    jnc .paint
    mov al, 14                  ; yellow: the bit is 1
.paint:
    call fill_cell
    add di, CELL + 2
    dec dl
    jnz .cell
    add di, 64 - 4 * (CELL + 2) ; the cells of the next digit
    dec dh
    jnz .nibble
    mov al, 8                   ; the carry cell: gray, or red after 9999
    cmp byte [last_carry], 0
    je .carry
    mov al, 12
.carry:
    mov di, CELL_Y * 320 + 14
    ; continue in fill_cell

; fill_cell: a square of CELL x CELL pixels in color AL at DI. Keeps DI. Changes: CX.
fill_cell:
    push di
    push bp
    mov bp, CELL
.row:
    mov cx, CELL
    rep stosb
    add di, 320 - CELL
    dec bp
    jnz .row
    pop bp
    pop di
    ret

; draw_digit: draw the character AL from the BIOS font, 8 x 8 dots, each dot SCALE x SCALE
; pixels, with the top left at DI. Changes: AX, BX, CX, DX, SI, BP, DI.
draw_digit:
    xor ah, ah
    mov cl, 3
    shl ax, cl                  ; 8 bytes for each character
    push di
    push ds
    lds si, [font_ptr]          ; DS:SI = the font of the BIOS
    add si, ax
    mov bx, glyph
    mov cx, 8
.copy:
    lodsb                       ; one row of dots
    mov [cs:bx], al             ; CS is the segment of this program
    inc bx
    loop .copy
    pop ds
    pop di
    mov si, glyph
    mov dh, 8                   ; 8 rows of dots
.dot_row:
    mov dl, [si]
    inc si
    mov bp, SCALE               ; each row of dots is SCALE rows of pixels
.pixel_row:
    push di
    mov bl, dl                  ; the dots of this row, the left dot in the top bit
    mov ah, 8
.dot:
    mov al, 0                   ; black
    shl bl, 1
    jnc .paint
    mov al, DIGIT_COLOR
.paint:
    mov cx, SCALE
    rep stosb
    dec ah
    jnz .dot
    pop di
    add di, 320
    dec bp
    jnz .pixel_row
    dec dh
    jnz .dot_row
    ret

; print_at: show the text at SI (it ends with 0) at row DH, column DL, in color BL.
print_at:
    mov ah, 02h                 ; BIOS: put the cursor at row DH, column DL
    xor bh, bh
    int 10h
.next:
    lodsb
    or al, al
    jz .done
    mov ah, 0Eh                 ; BIOS: write one character (in color BL)
    int 10h
    jmp .next
.done:
    ret

%include "common.inc"
%include "bcd.inc"

%ifdef WRONG_DECIMAL
title       db 'TEST 4B: THE SAME COUNTER, NO DAA', 0
%else
title       db 'TEST 4A: A PACKED DECIMAL COUNTER', 0
%endif
label_c     db 'C', 0
label_high  db 'HIGH BYTE', 0
label_low   db 'LOW BYTE', 0
label_keys  db '1-5 SPEED  N STEP  J TO 9990', 0
font_ptr    dw 0, 0             ; the offset, then the segment
last_carry  db 0
digit_chars db '0000'
glyph       times 8 db 0
