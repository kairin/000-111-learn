---
target: ../segments/assembly_language_architectural_explorer.html
derived_from: ../segments/Assembly Language Video Breakdown.md
segments: ../segments/assembly-language-architectural-explorer/
video: https://www.youtube.com/watch?v=4gwYkEK0gOk
pass: 1
date: 2026-09-27
---

# Adversarial review: "Assembly Language: Architectural Analysis & Systems Explorer" (HTML)

This page is an interactive version of report 05. Thus **every content finding in review 05 applies here too**. This review covers what the page *adds or changes*: the radar chart, the register simulator, the toolchain panel, the memory map, drift from the report, and delivery. The data and the JavaScript are claims too. The reviewer built an equivalent program locally with GNU `as` and `ld` to examine the addresses that the simulator shows.

## Evidence tags

| Tag | Meaning |
|---|---|
| **[DOC]** | Provable from the document itself (internal contradiction, code bug, missing data) |
| **[KNOW]** | Reviewer knowledge of the field. High confidence, but not yet checked against a primary source |
| **[VERIFY]** | A plausible problem. Pass 2 must confirm it against the cited or primary source |
| **[VIDEO]** | Checked against the timestamped transcript of the video |

## 1. Goals and objectives

1. Give an interactive summary of report 05 in five tabs (ISA, memory, registers, toolchain, security).
2. Let the learner step through the "Hello, World" program and see the registers change.
3. Compare x86-64, ARM64 and WebAssembly at a glance with a chart and a matrix.
4. Show how NASM and `ld` turn the source file into a program.

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Interactive summary | **Partly** | The page follows report 05. But it drops every citation and never names the video (M5). It adds new errors (M3, M4). |
| 2. Register simulator | **Partly** | The values of `rax`, `rdi`, `rsi` and `rdx` before each system call are correct. The instruction addresses after step 2 are wrong, and the return value of the write call is missing (M1, M2). |
| 3. ISA comparison | **No** | The radar chart does not draw on first load (C1). Its numbers have no source or unit (C2). |
| 4. Build steps | **Partly** | The commands are correct. The "hexdump" is invented and does not match the program (C3). |

**Overall confidence in the document:** Low to medium. The simulator is a useful start. The chart and the hexdump are invented.

## 3. Findings

### Critical

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| C1 | L851-853, L1076-1080 | The ISA tab shows a radar chart | The code draws the chart only inside `switchTab('isa')`. The load handler does not call `switchTab` or `initRadarChart`. The ISA tab is the default tab. Thus the chart area is empty on first load. The user must open another tab and then come back. | [DOC] |
| C2 | L907-935, L949 | Radar scores such as x86-64 95/30/60/95/30 and WebAssembly "Cross-Platform Security" 100 | The numbers have no source, no unit and no method. Report 05 has no scores. The code hides the scale ticks (`display: false`), so the reader cannot see the values. "Register Count" gives WebAssembly 40, but WebAssembly has no registers. It uses a stack and local variables. | [DOC] [KNOW] |
| C3 | L823 | Hexdump of `hello.o`: `48 89 c7 48 8d 35 00 00 00 00 e8 00 00 00 00` | These bytes decode as `mov rdi, rax`, `lea rsi, [rip+0]` and a `call`. The program has none of these instructions. The panel also says "Unresolved relocation entry: _start". The local build shows one relocation only, for `msg` in `.data` (type R_X86_64_64). `_start` is defined in the same file and needs no relocation. | [KNOW] |

### Major

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| M1 | L713-797 | RIP values 0x401000, +7, +7, +7, +7, +2, +7, +2 | The page assumes that every `mov` is 7 bytes and `xor rdi, rdi` is 2 bytes. In the local GNU `as` build, `mov rsi, msg` is 10 bytes and `xor rdi, rdi` is 3 bytes. Thus the addresses from step 3 are wrong. The exact sizes from NASM can differ. Also, the page shows the address of the current instruction but the register values after that instruction. It mixes two conventions. | [KNOW] [VERIFY] |
| M2 | L759-781 | After the write `syscall`, `rax` stays 0x1 | The kernel returns the number of bytes written in `rax`. The correct value is 14 (0xE). The `syscall` instruction also overwrites `rcx` and `r11`. The simulator hides the return value, which is the main debugging signal for a learner. | [KNOW] |
| M3 | L204 | Her "1958 treatise" came "prior to" Fortran (1957) | The sentence contradicts itself: 1958 is after 1957. Also, the St Andrews biography (web check) dates the APEC design to 1949, not 1947 (see review 05, M1). | [DOC] [VERIFY] |
| M4 | L252, L692, L699 | `.data` holds "Initialized Static Constants", `.bss` is "Uninitialized Dynamic Data" | The page repeats the error of the video: "data section is where we can initialize constants" (01:16). But the page also marks `.data` as RW- (writable). Constants belong in `.rodata`. The `.bss` badge "Dynamic" contradicts report 05, which says "Uninitialized Static Data" (report L51). | [DOC] [VIDEO] |
| M5 | whole page, L73, L631 | "Architectural Analysis" | The page has no citation and no link to the video or to report 05. A comment (L73) says that the page explains its relation to the source report, but no visible text does this. A reader cannot trace any claim. | [DOC] |
| M6 | L218, L293, L682 | Modern systems "strictly enforce" W XOR X to "prevent" shellcode | W XOR X (a page is writable or executable, never both) blocks injected code in data pages. It does not stop code-reuse attacks such as ROP. Linux also lets a program ask for writable and executable memory, for example for a JIT compiler. "Strictly" is an overclaim. | [KNOW] |
| M7 | L598, L602 | "Single-cycle register manipulation bypassing CPU cache misses" and "compiler dynamic memory allocation" | Registers do not remove cache misses. Data must still come from memory into a register. Compilers do not allocate memory at runtime. This text is new on the page. Report 05 does not say it. | [KNOW] [DOC] |

### Minor

| # | Location | Claim | Problem | Tag |
|---|---|---|---|---|
| m1 | L8, L10 | CDN scripts | `cdn.tailwindcss.com` is the Tailwind Play CDN for development only. `cdn.jsdelivr.net/npm/chart.js` has no version pin. The page needs a network connection and can break after a new major release. | [KNOW] |
| m2 | L949 | `ticks: { max: 100 }` | In Chart.js 3 and later, `max` belongs on the scale, not on `ticks`. Thus the scale is automatic, not 0 to 100. | [VERIFY] |
| m3 | L415, L713, L1029 | RIP display | The first value has 16 hex digits. The steps use 8 digits. The reset value `0x000000000401000` has 15 digits. | [DOC] |
| m4 | L813, L527 | Phase 1 command "Cat hello.asm" | Linux commands are case sensitive. `Cat` fails and `cat` works. The static HTML shows `nasm -f elf64 hello.asm` for phase 1, and the script replaces it on load. | [DOC] |
| m5 | L830 | `file` output with "entry point 0x401000" | The entry address 0x401000 matches the local build. But `file` does not usually print the entry point. `readelf -h` does. | [VERIFY] |
| m6 | L672 | WebAssembly example `i32.const 10` then `i32.add` | `i32.add` needs two values on the stack. This code has one, so a WebAssembly validator rejects it. | [KNOW] |
| m7 | L654, L663 | `mov rax, [rsi + rdx*8]` shows the CISC difference | This is a load with scaled addressing. AArch64 has the same kind of load (`ldr x0, [x1, x2, lsl #3]`). An example such as `add rax, [rsi]` shows arithmetic on a memory operand, which is the real CISC difference. | [KNOW] |
| m8 | L228, L233-237 | Kernel space near "High Address (0x7FFF...)" | On x86-64 Linux, user space ends near 0x00007FFFFFFFFFFF. Kernel space starts at 0xFFFF800000000000. The map also joins the stack and the heap in one band. | [KNOW] |
| m9 | L142, L218, L293, L320, L336, L464 | Formatting | The text `$W \oplus X$` needs a math library, but the page loads none. The raw LaTeX shows on screen. Backticks around `sys_write` and `NASM` also show as raw characters. | [DOC] |
| m10 | L241-257, L477-507, L103-117 | Clickable items | The memory blocks and toolchain steps are `div` elements with `onclick`. A keyboard user cannot reach them. The tabs have no ARIA roles. Emoji icons have no text alternative. Much text is 10 px. | [DOC] |
| m11 | L464 | High-level compilers do "garbage-collection injections" | This is not a standard compiler stage. The report (L119) does not say it. | [DOC] [KNOW] |
| m12 | L634 | "POSIX Compliant" | The program uses Linux system call numbers. It does not run on other POSIX systems such as macOS. | [KNOW] |

## 4. Source-quality audit

- The page has no sources. It drops all 14 citations of report 05, including the video.
- The radar numbers (C2) and the hexdump (C3) appear nowhere in report 05. They are new, invented content.
- What is correct and checked: the message length 14 (0xE), the call numbers 1 and 60 (0x3C), the data address 0x402000 and the entry address 0x401000 all match the local `as` and `ld` build. The program printed "Hello, World!" and exited with code 0. The section order and the R-X and RW- permissions are correct.

## 5. Omissions a skeptic would raise

1. **The simulator shows 4 registers only.** It never shows `rcx` and `r11`, which `syscall` changes. It never shows `rax` after the call.
2. **No link to a real tool.** The page does not suggest `strace`, GDB or Compiler Explorer. With these tools, the learner can see the real values instead of the animation.
3. **No hardware note.** The code needs an x86-64 Linux machine. The video says that Apple silicon and Raspberry Pi use ARM (00:50).
4. **Nothing for the B side.** The page names Fortran once, only as a date.

## 6. Use for the learning journey

- **Keep (A side):** the simulator steps as a checklist of which register holds which argument. The register values before each `syscall` are correct.
- **Keep (A side):** the build commands in the toolchain tab, but type `cat` in lowercase.
- **Ignore:** the radar chart, the hexdump, and the RIP addresses. Use `objdump -d hello` on your own build to see the real bytes and addresses.
- **Fix in your notes:** after the write call, `rax` holds 14. Constants go in `.rodata`.
- **B side:** the page has nothing to learn for Fortran.

## 7. Pass-2 verification list

- [ ] Open the page in a browser. Confirm that the radar chart is empty on first load (C1).
- [ ] Assemble the code with NASM. Record each instruction size with `objdump -d`. Compare with the RIP values (M1).
- [ ] Run the program under GDB. Examine `rax`, `rcx` and `r11` after the first `syscall` (M2).
- [ ] Run `readelf -r hello.o` on the NASM build. Confirm the one relocation for `msg` (C3).
- [ ] Check the Chart.js docs for the location of `max` on a radial scale (m2).
