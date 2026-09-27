---
source: ../assembly_language_architectural_explorer.html
document: "Assembly Language: Architectural Analysis & Systems Explorer"
kind: html-section
section_id: tab-content-execution
lines: 328-453, 643-644, 709-808, 981-1019, 1020-1040
video: https://www.youtube.com/watch?v=4gwYkEK0gOk
findings: [D06-M1, D06-M2, D06-m3, D06-m9]
---

# 64-Bit Linux Execution Flow & Register State Machine

> **Source video:** [Assembly Language in 100 Seconds](https://www.youtube.com/watch?v=4gwYkEK0gOk) (Fireship, 2:43) · [at 01:47](https://www.youtube.com/watch?v=4gwYkEK0gOk&t=107s). The video explains the registers for the write and exit calls.

###   64-Bit Linux Execution Flow & Register State Machine

In 64-bit x86-64 Linux programming under the System V AMD64 ABI, parameters for operating system kernel system calls are staged inside dedicated physical CPU registers rather than pushed onto the stack. Use the interactive step-through engine below to execute a 64-bit Linux "Hello, World!" binary line-by-line. Observe how register values mutate, how system calls (`sys_write` and `sys_exit`) transition execution to Ring 0 kernel space, and how clean process termination prevents segmentation faults (`SIGSEGV`).

Linux Kernel Execution Sandbox

#### System V AMD64 ABI Syscall Animator

↺ Reset

Step Instruction ▶

ASM SOURCE (hello.asm) RIP: _start

section .data

msg db "Hello, World!", 0x0a

len equ $ - msg // len = 14 bytes

section .text

global _start

_start:

mov rax, 1 // Syscall #1: sys_write

mov rdi, 1 // FD #1: stdout

mov rsi, msg // Buffer memory address

mov rdx, len // Buffer length (14)

syscall // Trigger Ring 0 write

mov rax, 60 // Syscall #60: sys_exit

xor rdi, rdi // Status code 0 (Success)

syscall // Terminate process

64-BIT CPU REGISTERS User Mode (Ring 3)

RAX (Syscall ID) 0x0000000000000000

RDI (Arg 1: FD/Status) 0x0000000000000000

RSI (Arg 2: Buffer Pt) 0x0000000000000000

RDX (Arg 3: Count) 0x0000000000000000

RIP (Instruction Pt) 0x0000000000401000

Current Mode: Ring 3 (User Execution)

HARDWARE EXPLANATION

Click "Step Instruction" to begin loading register parameters for the Linux System V ABI write system call.

Step 0 of 8

TERMINAL STDOUT ● bash

$ ./hello

## Linked script: `currentStep` (lines 643-644)

The recommendation logic / numbers below are claims too; review them.

```js
        let currentStep = 0;
```

## Linked script: `executionSteps` (lines 709-808)

The recommendation logic / numbers below are claims too; review them.

```js
        // Execution Flow Simulator Steps
        const executionSteps = [
            {
                line: 6,
                rip: "0x00401000",
                rax: "0x0000000000000001",
                rdi: "0x0000000000000000",
                rsi: "0x0000000000000000",
                rdx: "0x0000000000000000",
                highlightReg: "rax",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'mov rax, 1'. Loads System Call Identifier 1 (sys_write) into accumulator register RAX according to System V AMD64 ABI conventions.",
                terminal: "$ ./hello"
            },
            {
                line: 7,
                rip: "0x00401007",
                rax: "0x0000000000000001",
                rdi: "0x0000000000000001",
                rsi: "0x0000000000000000",
                rdx: "0x0000000000000000",
                highlightReg: "rdi",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'mov rdi, 1'. Loads File Descriptor 1 (standard output / stdout) into RDI, which serves as First Argument for Linux system calls.",
                terminal: "$ ./hello"
            },
            {
                line: 8,
                rip: "0x0040100E",
                rax: "0x0000000000000001",
                rdi: "0x0000000000000001",
                rsi: "0x0000000000402000",
                rdx: "0x0000000000000000",
                highlightReg: "rsi",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'mov rsi, msg'. Loads virtual address pointer (0x402000) of string buffer into RSI (Second Argument).",
                terminal: "$ ./hello"
            },
            {
                line: 9,
                rip: "0x00401015",
                rax: "0x0000000000000001",
                rdi: "0x0000000000000001",
                rsi: "0x0000000000402000",
                rdx: "0x000000000000000E",
                highlightReg: "rdx",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'mov rdx, len'. Sets RDX (Third Argument) to 14 bytes (computed via assembler constant expression '$ - msg').",
                terminal: "$ ./hello"
            },
            {
                line: 10,
                rip: "0x0040101C",
                rax: "0x0000000000000001",
                rdi: "0x0000000000000001",
                rsi: "0x0000000000402000",
                rdx: "0x000000000000000E",
                highlightReg: "none",
                ring: "Ring 0 (Kernel Privilege Transition)",
                desc: "Instruction: 'syscall'. CPU initiates privilege transition from User Ring 3 to Kernel Ring 0. Linux sys_write executes, sending 14 bytes from RSI memory pointer to stdout console driver.",
                terminal: "Hello, World!"
            },
            {
                line: 11,
                rip: "0x0040101E",
                rax: "0x000000000000003C",
                rdi: "0x0000000000000001",
                rsi: "0x0000000000402000",
                rdx: "0x000000000000000E",
                highlightReg: "rax",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'mov rax, 60'. Loads System Call Identifier 60 (sys_exit) into RAX to prepare for clean process termination.",
                terminal: "Hello, World!"
            },
            {
                line: 12,
                rip: "0x00401025",
                rax: "0x000000000000003C",
                rdi: "0x0000000000000000",
                rsi: "0x0000000000402000",
                rdx: "0x000000000000000E",
                highlightReg: "rdi",
                ring: "Ring 3 (User Space)",
                desc: "Instruction: 'xor rdi, rdi'. Clears RDI register to 0 via single-cycle bitwise XOR (Exit Return Status Code 0 = Success).",
                terminal: "Hello, World!"
            },
            {
                line: 13,
                rip: "0x00401027",
                rax: "0x000000000000003C",
                rdi: "0x0000000000000000",
                rsi: "0x0000000000402000",
                rdx: "0x000000000000000E",
                highlightReg: "none",
                ring: "Kernel Process Terminated",
                desc: "Instruction: 'syscall'. Kernel receives sys_exit, frees mapped virtual memory pages, and communicates return status 0 back to parent shell context. Prevents segmentation fault (SIGSEGV).",
                terminal: "Hello, World!\n[Process exited with code 0]"
            }
        ];
```

## Linked script: `stepExecution` (lines 981-1019)

The recommendation logic / numbers below are claims too; review them.

```js
        // Register Simulator Execution Controls
        function stepExecution() {
            if (currentStep >= executionSteps.length) return;
            const state = executionSteps[currentStep];

            // Highlight source code line
            document.querySelectorAll('.code-exec-line').forEach(el => el.classList.remove('bg-amber-600/30', 'text-amber-300', 'border-l-2', 'border-amber-500'));
            const lineEl = document.getElementById(`code-line-${state.line}`);
            if (lineEl) lineEl.classList.add('bg-amber-600/30', 'text-amber-300', 'border-l-2', 'border-amber-500');

            // Update Register Values
            document.getElementById('reg-val-rax').innerText = state.rax;
            document.getElementById('reg-val-rdi').innerText = state.rdi;
            document.getElementById('reg-val-rsi').innerText = state.rsi;
            document.getElementById('reg-val-rdx').innerText = state.rdx;
            document.getElementById('reg-val-rip').innerText = state.rip;

            // Highlight register changed
            document.querySelectorAll('#reg-box-rax, #reg-box-rdi, #reg-box-rsi, #reg-box-rdx').forEach(el => el.classList.remove('border-amber-500', 'bg-amber-950/40'));
            if (state.highlightReg !== 'none') {
                const regBox = document.getElementById(`reg-box-${state.highlightReg}`);
                if (regBox) regBox.classList.add('border-amber-500', 'bg-amber-950/40');
            }

            // Update ring & description text
            document.getElementById('privilege-level-indicator').innerHTML = `Current Mode: <strong class="text-amber-400">${state.ring}</strong>`;
            document.getElementById('execution-step-desc').innerText = state.desc;
            document.getElementById('step-counter-text').innerText = `Step ${currentStep + 1} of ${executionSteps.length}`;
            document.getElementById('terminal-stdout').innerText = state.terminal;

            currentStep++;

            if (currentStep >= executionSteps.length) {
                const btn = document.getElementById('btn-next-step');
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.innerHTML = '<span>Execution Completed</span>';
            }
        }
```

## Linked script: `resetExecution` (lines 1020-1040)

The recommendation logic / numbers below are claims too; review them.

```js
        function resetExecution() {
            currentStep = 0;
            document.querySelectorAll('.code-exec-line').forEach(el => el.classList.remove('bg-amber-600/30', 'text-amber-300', 'border-l-2', 'border-amber-500'));
            document.querySelectorAll('#reg-box-rax, #reg-box-rdi, #reg-box-rsi, #reg-box-rdx').forEach(el => el.classList.remove('border-amber-500', 'bg-amber-950/40'));

            document.getElementById('reg-val-rax').innerText = '0x0000000000000000';
            document.getElementById('reg-val-rdi').innerText = '0x0000000000000000';
            document.getElementById('reg-val-rsi').innerText = '0x0000000000000000';
            document.getElementById('reg-val-rdx').innerText = '0x0000000000000000';
            document.getElementById('reg-val-rip').innerText = '0x000000000401000';

            document.getElementById('privilege-level-indicator').innerHTML = `Current Mode: <strong class="text-emerald-400">Ring 3 (User Execution)</strong>`;
            document.getElementById('execution-step-desc').innerText = `Click "Step Instruction" to begin loading register parameters for the Linux System V ABI write system call.`;
            document.getElementById('step-counter-text').innerText = `Step 0 of ${executionSteps.length}`;
            document.getElementById('terminal-stdout').innerHTML = `<span class="text-slate-600 font-normal">$ ./hello</span>`;

            const btn = document.getElementById('btn-next-step');
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btn.innerHTML = '<span>Step Instruction &#9654;</span>';
        }
```

<details><summary>Raw HTML (lines 328-453)</summary>

```html
        <section id="tab-content-execution" class="tab-pane hidden space-y-6">
            <!-- Section Introductory Paragraph -->
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
                    64-Bit Linux Execution Flow & Register State Machine
                </h2>
                <p class="text-slate-600 leading-relaxed text-sm">
                    In 64-bit x86-64 Linux programming under the System V AMD64 ABI, parameters for operating system kernel system calls are staged inside dedicated physical CPU registers rather than pushed onto the stack. Use the interactive step-through engine below to execute a 64-bit Linux <code>"Hello, World!"</code> binary line-by-line. Observe how register values mutate, how system calls (`sys_write` and `sys_exit`) transition execution to Ring 0 kernel space, and how clean process termination prevents segmentation faults (`SIGSEGV`).
                </p>
            </div>

            <!-- Execution Step-Through Control Dashboard -->
            <div class="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xl space-y-6">
                <!-- Controls Bar -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <span class="text-xs font-mono text-amber-400 uppercase tracking-widest">Linux Kernel Execution Sandbox</span>
                        <h3 class="text-lg font-bold font-mono text-white">System V AMD64 ABI Syscall Animator</h3>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="resetExecution()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded border border-slate-700 transition">
                            &#8634; Reset
                        </button>
                        <button onclick="stepExecution()" id="btn-next-step" class="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold rounded shadow transition flex items-center gap-2">
                            <span>Step Instruction &#9654;</span>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Column 1: Assembly Code View -->
                    <div class="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs code-scroll overflow-x-auto">
                        <div class="text-slate-500 pb-2 mb-2 border-b border-slate-800 flex justify-between">
                            <span>ASM SOURCE (hello.asm)</span>
                            <span id="instruction-pointer-label" class="text-amber-400">RIP: _start</span>
                        </div>
                        <div class="space-y-1">
                            <div id="code-line-0" class="p-1 rounded transition-colors text-slate-500">section .data</div>
                            <div id="code-line-1" class="p-1 rounded transition-colors text-slate-400 pl-4">msg db "Hello, World!", 0x0a</div>
                            <div id="code-line-2" class="p-1 rounded transition-colors text-slate-400 pl-4">len equ $ - msg <span class="text-slate-600">// len = 14 bytes</span></div>
                            <div id="code-line-3" class="p-1 rounded transition-colors text-slate-500 mt-2">section .text</div>
                            <div id="code-line-4" class="p-1 rounded transition-colors text-slate-500 pl-4">global _start</div>
                            <div id="code-line-5" class="p-1 rounded transition-colors font-bold text-slate-300">_start:</div>
                            <div id="code-line-6" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">mov rax, 1 <span class="text-slate-500">// Syscall #1: sys_write</span></div>
                            <div id="code-line-7" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">mov rdi, 1 <span class="text-slate-500">// FD #1: stdout</span></div>
                            <div id="code-line-8" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">mov rsi, msg <span class="text-slate-500">// Buffer memory address</span></div>
                            <div id="code-line-9" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">mov rdx, len <span class="text-slate-500">// Buffer length (14)</span></div>
                            <div id="code-line-10" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">syscall <span class="text-amber-400">// Trigger Ring 0 write</span></div>
                            <div id="code-line-11" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold mt-2">mov rax, 60 <span class="text-slate-500">// Syscall #60: sys_exit</span></div>
                            <div id="code-line-12" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">xor rdi, rdi <span class="text-slate-500">// Status code 0 (Success)</span></div>
                            <div id="code-line-13" class="code-exec-line p-1.5 rounded transition-all text-slate-300 pl-4 font-semibold">syscall <span class="text-amber-400">// Terminate process</span></div>
                        </div>
                    </div>

                    <!-- Column 2: Live CPU Register View & Hardware State -->
                    <div class="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs flex flex-col justify-between">
                        <div>
                            <div class="text-slate-500 pb-2 mb-3 border-b border-slate-800 flex justify-between items-center">
                                <span>64-BIT CPU REGISTERS</span>
                                <span class="text-[10px] bg-slate-800 text-teal-400 px-1.5 py-0.5 rounded">User Mode (Ring 3)</span>
                            </div>

                            <div class="space-y-2">
                                <!-- RAX -->
                                <div id="reg-box-rax" class="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between items-center transition-all">
                                    <span class="text-amber-400 font-bold">RAX (Syscall ID)</span>
                                    <span id="reg-val-rax" class="text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">0x0000000000000000</span>
                                </div>
                                <!-- RDI -->
                                <div id="reg-box-rdi" class="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between items-center transition-all">
                                    <span class="text-sky-400 font-bold">RDI (Arg 1: FD/Status)</span>
                                    <span id="reg-val-rdi" class="text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">0x0000000000000000</span>
                                </div>
                                <!-- RSI -->
                                <div id="reg-box-rsi" class="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between items-center transition-all">
                                    <span class="text-teal-400 font-bold">RSI (Arg 2: Buffer Pt)</span>
                                    <span id="reg-val-rsi" class="text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">0x0000000000000000</span>
                                </div>
                                <!-- RDX -->
                                <div id="reg-box-rdx" class="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between items-center transition-all">
                                    <span class="text-purple-400 font-bold">RDX (Arg 3: Count)</span>
                                    <span id="reg-val-rdx" class="text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">0x0000000000000000</span>
                                </div>
                                <!-- RIP -->
                                <div id="reg-box-rip" class="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between items-center transition-all">
                                    <span class="text-slate-400 font-bold">RIP (Instruction Pt)</span>
                                    <span id="reg-val-rip" class="text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">0x0000000000401000</span>
                                </div>
                            </div>
                        </div>

                        <!-- Kernel / CPU Ring State Indicator -->
                        <div id="privilege-level-indicator" class="mt-4 p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-center text-slate-400">
                            Current Mode: <strong class="text-emerald-400">Ring 3 (User Execution)</strong>
                        </div>
                    </div>

                    <!-- Column 3: Contextual Explanation & Virtual Terminal Output -->
                    <div class="lg:col-span-3 flex flex-col justify-between space-y-4">
                        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs flex-1 flex flex-col justify-between">
                            <div>
                                <div class="text-slate-500 pb-2 mb-2 border-b border-slate-800">HARDWARE EXPLANATION</div>
                                <p id="execution-step-desc" class="text-slate-300 leading-relaxed text-[11px]">
                                    Click "Step Instruction" to begin loading register parameters for the Linux System V ABI write system call.
                                </p>
                            </div>
                            <div class="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500" id="step-counter-text">
                                Step 0 of 8
                            </div>
                        </div>

                        <!-- Virtual Terminal Stream Output -->
                        <div class="bg-black p-4 rounded-xl border border-slate-800 font-mono text-xs">
                            <div class="text-slate-500 text-[10px] pb-1 border-b border-slate-900 flex justify-between">
                                <span>TERMINAL STDOUT</span>
                                <span class="text-emerald-500">&#9679; bash</span>
                            </div>
                            <div class="pt-2 text-emerald-400 font-bold text-sm min-h-[40px] flex items-center" id="terminal-stdout">
                                <span class="text-slate-600 font-normal">$ ./hello</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D06-M1 | major | KNOW VERIFY | verify | L713-797 | _Claim:_ RIP values 0x401000, +7, +7, +7, +7, +2, +7, +2. _Problem:_ The page assumes that every `mov` is 7 bytes and `xor rdi, rdi` is 2 bytes. In the local GNU `as` build, `mov rsi, msg` is 10 bytes and `xor rdi, rdi` is 3 bytes. Thus the addresses from step 3 are wrong. The exact sizes from NASM can differ. Also, the page shows the address of the current instruction but the register values after that instruction. It mixes two conventions. |
| D06-M2 | major | KNOW | open | L759-781 | _Claim:_ After the write `syscall`, `rax` stays 0x1. _Problem:_ The kernel returns the number of bytes written in `rax`. The correct value is 14 (0xE). The `syscall` instruction also overwrites `rcx` and `r11`. The simulator hides the return value, which is the main debugging signal for a learner. |
| D06-m3 | minor | DOC | open | L415, L713, L1029 | _Claim:_ RIP display. _Problem:_ The first value has 16 hex digits. The steps use 8 digits. The reset value `0x000000000401000` has 15 digits. |
| D06-m9 | minor | DOC | open | L142, L218, L293, L320, L336, L464 | _Claim:_ Formatting. _Problem:_ The text `$W \oplus X$` needs a math library, but the page loads none. The raw LaTeX shows on screen. Backticks around `sys_write` and `NASM` also show as raw characters. |

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
