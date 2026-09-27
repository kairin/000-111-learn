---
source: ../assembly_language_architectural_explorer.html
document: "Assembly Language: Architectural Analysis & Systems Explorer"
kind: html-section
section_id: tab-content-memory
lines: 210-325, 676-708, 962-980
video: https://www.youtube.com/watch?v=4gwYkEK0gOk
findings: [D06-M4, D06-M6, D06-m8, D06-m9, D06-m10]
---

# Virtual Memory Layout & Sectional Topology

> **Source video:** [Assembly Language in 100 Seconds](https://www.youtube.com/watch?v=4gwYkEK0gOk) (Fireship, 2:43) · [at 00:58](https://www.youtube.com/watch?v=4gwYkEK0gOk&t=58s). The video divides the program into three sections, but it calls data constants.

###   Virtual Memory Layout & Sectional Topology

When an Executable and Linkable Format (ELF) binary is loaded into virtual memory by the Linux kernel, the memory manager allocates structured virtual memory pages. To prevent security exploits like arbitrary shellcode execution, modern operating systems strictly enforce the Write XOR Execute ($W \oplus X$) security model. Select any segment in the virtual memory diagram below to explore its runtime access permissions, binary footprint impact, and operational utility.

#### Virtual Memory Address Space Map
High Address (0x7FFF...)

Kernel Space (Protected Ring 0 Memory)

↓ Stack / Heap (Dynamic Memory Allocations) ↑

.bss Section

Uninitialized Static & Global Variables

RW-

.data Section

Initialized Static Constants & Strings

RW-

.text Section

Executable Machine Opcodes & Entry Point (_start)

R-X

Low Address (0x0040...) Click a section to inspect architectural parameters

Executable Code Segment

#### .text Section

Access Permissions

Read / Execute (R-X)

Architectural Utility & ELF Allocation:
Houses the executable machine instructions. Operating system page tables enforce read and execute permissions while strictly denying write access to enforce $W \oplus X$ memory protection rules.

DISK BINARY IMPACT Stores Machine Opcodes

RUNTIME PAGE STATE Mapped Read-Only Exec

NASM Assembly Syntax Declaration:  section .text global _start _start: mov rax, 1 ; sys_write syscall

Security Principle: Write XOR Execute ($W \oplus X$) ✓ Memory Enforced

## Linked script: `memorySections` (lines 676-708)

The recommendation logic / numbers below are claims too; review them.

```js
        const memorySections = {
            text: {
                title: ".text Section",
                badge: "Executable Code Segment",
                badgeClass: "bg-sky-100 text-sky-800",
                permissions: "Read / Execute (R-X)",
                desc: "Contains physical binary instruction opcodes executed by the CPU instruction pointer (RIP). Modern OS page tables strictly configure .text as non-writable to enforce W ^ X memory security protections.",
                diskImpact: "Contains Machine Code Opcodes",
                runtimeState: "Mapped Read-Only Executable Page",
                syntax: "section .text\n    global _start\n_start:\n    mov rax, 1 ; sys_write"
            },
            data: {
                title: ".data Section",
                badge: "Initialized Static Data",
                badgeClass: "bg-amber-100 text-amber-800",
                permissions: "Read / Write (RW-)",
                desc: "Allocates memory space for global variables and constants initialized prior to execution (e.g., string literals). Because initial values are defined beforehand, they directly increase compiled binary file size on disk.",
                diskImpact: "Inflates Storage Footprint",
                runtimeState: "Copied to Writable Memory Pages",
                syntax: "section .data\n    msg db \"Hello, World!\", 0x0a\n    len equ $ - msg"
            },
            bss: {
                title: ".bss Section",
                badge: "Uninitialized Dynamic Data",
                badgeClass: "bg-teal-100 text-teal-800",
                permissions: "Read / Write (RW-)",
                desc: "Reserves virtual address space for uninitialized mutable runtime variables. Instead of inflating binary disk storage, the OS kernel dynamically zero-fills these virtual memory pages upon process creation.",
                diskImpact: "Zero Disk Storage Overhead",
                runtimeState: "Zero-Filled by OS Loader on Exec",
                syntax: "section .bss\n    buffer resb 64 ; Reserves 64 bytes"
            }
        };
```

## Linked script: `inspectSection` (lines 962-980)

The recommendation logic / numbers below are claims too; review them.

```js
        // Memory Section Visualizer Selection
        function inspectSection(key) {
            const data = memorySections[key];
            if (!data) return;

            document.querySelectorAll('.mem-block').forEach(el => el.classList.remove('ring-2', 'ring-amber-400'));
            const selectedBlock = document.getElementById(`mem-block-${key}`);
            if (selectedBlock) selectedBlock.classList.add('ring-2', 'ring-amber-400');

            document.getElementById('section-title').innerText = data.title;
            document.getElementById('section-badge').innerText = data.badge;
            document.getElementById('section-badge').className = `text-xs font-mono font-bold px-2 py-0.5 rounded ${data.badgeClass}`;
            document.getElementById('section-permissions').innerText = data.permissions;
            document.getElementById('section-desc').innerText = data.desc;
            document.getElementById('section-disk-impact').innerText = data.diskImpact;
            document.getElementById('section-runtime-state').innerText = data.runtimeState;
            document.getElementById('section-syntax').innerText = data.syntax;
        }
```

<details><summary>Raw HTML (lines 210-325)</summary>

```html
        <section id="tab-content-memory" class="tab-pane hidden space-y-6">
            <!-- Section Introductory Paragraph -->
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
                    Virtual Memory Layout & Sectional Topology
                </h2>
                <p class="text-slate-600 leading-relaxed text-sm">
                    When an Executable and Linkable Format (ELF) binary is loaded into virtual memory by the Linux kernel, the memory manager allocates structured virtual memory pages. To prevent security exploits like arbitrary shellcode execution, modern operating systems strictly enforce the <strong>Write XOR Execute ($W \oplus X$)</strong> security model. Select any segment in the virtual memory diagram below to explore its runtime access permissions, binary footprint impact, and operational utility.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Virtual Address Space Explorer Visualizer -->
                <div class="lg:col-span-6 bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-sm font-bold font-mono text-amber-400">Virtual Memory Address Space Map</h3>
                            <span class="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">High Address (0x7FFF...)</span>
                        </div>

                        <!-- Stacked Virtual Memory Visual Blocks -->
                        <div class="space-y-2 font-mono text-xs">
                            <div class="p-3 bg-slate-800 border border-slate-700 rounded text-slate-400 text-center opacity-75">
                                Kernel Space (Protected Ring 0 Memory)
                            </div>
                            <div class="p-2 border-dashed border border-slate-700 rounded text-slate-500 text-center text-[11px]">
                                &#8595; Stack / Heap (Dynamic Memory Allocations) &#8593;
                            </div>

                            <!-- Interactive Clickable Assembly Sections -->
                            <div onclick="inspectSection('bss')" id="mem-block-bss" class="mem-block p-4 bg-teal-900/40 border-2 border-teal-500/80 hover:bg-teal-900/70 rounded cursor-pointer transition-all flex justify-between items-center">
                                <div>
                                    <div class="font-bold text-teal-300">.bss Section</div>
                                    <div class="text-[10px] text-teal-200/70">Uninitialized Static & Global Variables</div>
                                </div>
                                <span class="bg-teal-950 text-teal-300 px-2 py-1 rounded text-[10px] border border-teal-800 font-bold">RW-</span>
                            </div>

                            <div onclick="inspectSection('data')" id="mem-block-data" class="mem-block p-4 bg-amber-900/40 border-2 border-amber-500/80 hover:bg-amber-900/70 rounded cursor-pointer transition-all flex justify-between items-center">
                                <div>
                                    <div class="font-bold text-amber-300">.data Section</div>
                                    <div class="text-[10px] text-amber-200/70">Initialized Static Constants & Strings</div>
                                </div>
                                <span class="bg-amber-950 text-amber-300 px-2 py-1 rounded text-[10px] border border-amber-800 font-bold">RW-</span>
                            </div>

                            <div onclick="inspectSection('text')" id="mem-block-text" class="mem-block p-4 bg-sky-900/40 border-2 border-sky-500/80 hover:bg-sky-900/70 rounded cursor-pointer transition-all flex justify-between items-center">
                                <div>
                                    <div class="font-bold text-sky-300">.text Section</div>
                                    <div class="text-[10px] text-sky-200/70">Executable Machine Opcodes & Entry Point (_start)</div>
                                </div>
                                <span class="bg-sky-950 text-sky-300 px-2 py-1 rounded text-[10px] border border-sky-800 font-bold">R-X</span>
                            </div>
                        </div>

                        <div class="mt-4 flex justify-between items-center">
                            <span class="text-[10px] font-mono text-slate-400">Low Address (0x0040...)</span>
                            <span class="text-[10px] text-amber-400 font-mono">Click a section to inspect architectural parameters</span>
                        </div>
                    </div>
                </div>

                <!-- Section Details & Security Analysis Card -->
                <div class="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-3 border-b border-slate-200 pb-3">
                            <div>
                                <span id="section-badge" class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                                    Executable Code Segment
                                </span>
                                <h3 id="section-title" class="text-xl font-bold text-slate-900 mt-1">.text Section</h3>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-slate-500">Access Permissions</div>
                                <div id="section-permissions" class="font-mono font-bold text-slate-800 text-sm">Read / Execute (R-X)</div>
                            </div>
                        </div>

                        <div class="space-y-4 text-xs text-slate-600">
                            <div>
                                <strong class="text-slate-800 block mb-1">Architectural Utility & ELF Allocation:</strong>
                                <p id="section-desc" class="leading-relaxed">
                                    Houses the executable machine instructions. Operating system page tables enforce read and execute permissions while strictly denying write access to enforce $W \oplus X$ memory protection rules.
                                </p>
                            </div>

                            <div class="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono">
                                <div>
                                    <span class="text-slate-400 block text-[10px]">DISK BINARY IMPACT</span>
                                    <span id="section-disk-impact" class="font-bold text-slate-800">Stores Machine Opcodes</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[10px]">RUNTIME PAGE STATE</span>
                                    <span id="section-runtime-state" class="font-bold text-slate-800">Mapped Read-Only Exec</span>
                                </div>
                            </div>

                            <div>
                                <strong class="text-slate-800 block mb-1">NASM Assembly Syntax Declaration:</strong>
                                <pre id="section-syntax" class="bg-slate-900 text-amber-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
section .text
    global _start
_start:
    mov rax, 1 ; sys_write syscall</pre>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                        <span>Security Principle: <strong class="text-slate-700">Write XOR Execute ($W \oplus X$)</strong></span>
                        <span class="text-emerald-600 font-semibold">&#10003; Memory Enforced</span>
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
| D06-M4 | major | DOC VIDEO | open | L252, L692, L699 | _Claim:_ `.data` holds "Initialized Static Constants", `.bss` is "Uninitialized Dynamic Data". _Problem:_ The page repeats the error of the video: "data section is where we can initialize constants" (01:16). But the page also marks `.data` as RW- (writable). Constants belong in `.rodata`. The `.bss` badge "Dynamic" contradicts report 05, which says "Uninitialized Static Data" (report L51). |
| D06-M6 | major | KNOW | open | L218, L293, L682 | _Claim:_ Modern systems "strictly enforce" W XOR X to "prevent" shellcode. _Problem:_ W XOR X (a page is writable or executable, never both) blocks injected code in data pages. It does not stop code-reuse attacks such as ROP. Linux also lets a program ask for writable and executable memory, for example for a JIT compiler. "Strictly" is an overclaim. |
| D06-m10 | minor | DOC | open | L241-257, L477-507, L103-117 | _Claim:_ Clickable items. _Problem:_ The memory blocks and toolchain steps are `div` elements with `onclick`. A keyboard user cannot reach them. The tabs have no ARIA roles. Emoji icons have no text alternative. Much text is 10 px. |
| D06-m8 | minor | KNOW | open | L228, L233-237 | _Claim:_ Kernel space near "High Address (0x7FFF...)". _Problem:_ On x86-64 Linux, user space ends near 0x00007FFFFFFFFFFF. Kernel space starts at 0xFFFF800000000000. The map also joins the stack and the heap in one band. |
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
