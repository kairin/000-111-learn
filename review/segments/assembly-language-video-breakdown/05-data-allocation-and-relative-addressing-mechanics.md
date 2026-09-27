---
source: ../Assembly Language Video Breakdown.md
document: "Architectural Analysis and Systems Breakdown of Assembly Language"
kind: subsection
parent: "Execution Flow Analysis: 64-Bit Linux System Programming"
lines: 62-75
video: https://www.youtube.com/watch?v=4gwYkEK0gOk
findings: [D05-M6, D05-m10, D05-m11]
---

# Data Allocation and Relative Addressing Mechanics

> **Source video:** [Assembly Language in 100 Seconds](https://www.youtube.com/watch?v=4gwYkEK0gOk) (Fireship, 2:43) · [at 01:20](https://www.youtube.com/watch?v=4gwYkEK0gOk&t=80s). The video shows db and the length calculation with the dollar sign.

> Parent section: **Execution Flow Analysis: 64-Bit Linux System Programming**


Data preparation begins in the .data section by laying down contiguous byte arrays in memory and computing buffer lengths1:

Code snippet  
section .data  
    msg db "Hello, World\!", 0x0a  
    len equ \$ \- msg

The assembler directive db (define byte) places literal character sequences sequentially into memory1. Appending 0x0a introduces the ASCII line feed character (\\n) to position the terminal output stream onto a new line1.  
Calculating the buffer length dynamically is achieved via the equ (equate) directive paired with the location counter symbol (\$)1. The token \$ resolves to the current memory address immediately following the declared string, while the label msg corresponds to the base memory address where the character sequence begins1. The assembler evaluates the equation:  
![][image2]  
This arithmetic difference yields the exact length of the message array in bytes1. Because the calculation is resolved entirely at assembly time, it eliminates runtime computation overhead1.

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D05-M6 | major | KNOW | open | L62, L93 | _Claim:_ Heading "Relative Addressing Mechanics". _Problem:_ The program uses an absolute address, not a relative one. The reviewer assembled an equivalent program. `mov rsi, msg` gave a 10-byte instruction with an absolute relocation (R_X86_64_64). RIP-relative addressing is `lea rsi, [rel msg]`. The difference matters: the absolute form fails when a learner links a position-independent executable. |
| D05-m10 | minor | DOC | open | L56, L73 | _Claim:_ W XOR X symbol and the length formula. _Problem:_ Both are images. Screen readers and text search cannot read them. |
| D05-m11 | minor | DOC | open | L7-24, L66-69, L80-89, L100-103 | _Claim:_ Code blocks. _Problem:_ The same code appears three times. The raw file has escape characters (`\!`, `\$`, `\_`). If the owner copies the raw text, NASM fails. |

---

## Review worksheet

### 1. Goal of this part
_What does this part try to show, or help the reader decide?_

### 2. Key claims to test
| # | Claim | Evidence given (citation / data) | Verifiable? |
|---|-------|----------------------------------|-------------|
| 1 |       |                                  |             |

### 3. Adversarial review
- **Strongest counter-argument:**
- **Unsupported, overstated, or outdated claims:**
- **Source quality (primary vs. blog/forum/marketing):**
- **Omissions / what a skeptic would ask:**
- **Internal consistency with other segments:**

### 4. Evaluation
- **Does the segment achieve its goal?** (Yes / Partly / No)
- **Confidence:** (High / Medium / Low)
- **Required fixes:**
