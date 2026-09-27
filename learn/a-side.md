# A side: Assembly, the first language of the machine

![A cassette tape with a handwritten label: "A Side. Assembly, the first language of the machine."](images/a-side-cassette.jpg)

Assembly speaks directly to the processor. The processor is the part of a computer that does the work. Each Assembly word is the name of one step that the processor can do.

## One language, many dialects

Each processor family has its own Assembly. These are dialects of one idea, as British English and American English are dialects of English.

| Dialect | Where it runs | Size of the dictionary |
|---|---|---|
| **Intel 8086** (our choice) | IBM PC computers of the 1980s, and DOS | 81 instructions |
| MOS 6502 family | Apple II, Commodore 64 and NES (close variants of the 6502) | 56 instructions |
| RISC-V (base set) | New open-design chips | about 40 instructions |
| x86-64 | Most desktop computers today | more than 1,000 instruction names |

We learn the 8086 dialect because the game of this project runs on a copy of a 1980s PC. That copy runs inside your web browser. The 8086 dialect is small, old and well recorded. Many books and examples exist for it.

## The parts of speech on the A side

- **Verbs** are instructions. `MOV` copies a value. `ADD` adds. `JMP` goes to a different place in the program.
- **Nouns** are registers, flags, ports and places in memory. A register is a small, fast box inside the processor. The 8086 has 14 register names, for example `AX`, `BX` and `CX`.
- **Adjectives** are size words. `BYTE` means 8 bits. `WORD` means 16 bits.
- **Adverbs** change how a verb acts. `REP` means "do the next verb again, CX times".
- **Idioms** are ready-made services of the BIOS and DOS. The BIOS is a small program inside the computer. `INT 21h` with `AH=09h` means "show this line of text".
- **Grammar marks** join the words. A comma separates the two operands. Square brackets mean "the value at this address".
- **Notes to the translator** are directives. The assembler reads them, but the processor never sees them. `ORG 100h` tells the assembler where the program starts.

## The shape of one sentence

Each line of Assembly is one sentence. It has up to four parts:

```nasm
again:   add ax, bx    ; add BX to AX
```

| Part | In the example | Meaning |
|---|---|---|
| Label | `again:` | A name for this place in the program |
| Verb | `add` | The action |
| Operands | `ax, bx` | The nouns: the destination first, then the source |
| Comment | `; add BX to AX` | A note for people. The assembler ignores it. |

## What the A side says well

- Each word is one exact step. You know the cost of every step.
- You can talk to the hardware directly: the screen memory, the keyboard chip and the clock chip.
- Programs are very small and very fast.

## What the A side cannot say easily

- A formula needs many words.
- Each dialect is different. 8086 words do not work on a different processor.
- The language does not stop mistakes. A wrong address can stop the program.

## The segments

Each segment below has an A page. Open a segment to see its strengths and its words.
