---
source: ../assembly_language_architectural_explorer.html
document: "Assembly Language: Architectural Analysis & Systems Explorer"
kind: html-section
section_id: summary
lines: 123-146
video: https://www.youtube.com/watch?v=4gwYkEK0gOk
findings: [D06-m9]
---

# Summary strip (no heading)

> **Source video:** [Assembly Language in 100 Seconds](https://www.youtube.com/watch?v=4gwYkEK0gOk) (Fireship, 2:43) · [at 00:11](https://www.youtube.com/watch?v=4gwYkEK0gOk&t=11s). The video names Kathleen Booth, but it does not cover the ABI or W XOR X.

Pioneer Genesis

Kathleen Booth (1947)

ARC & APEC Calculators

ISA Paradigm

CISC vs RISC vs Stack

Hardware Specific Encodings

ABI Standard

Linux System V AMD64

RAX, RDI, RSI, RDX Syscalls

Memory Model

W ⊕ X Security Rule

Isolated Text & Data Pages

<details><summary>Raw HTML (lines 123-146)</summary>

```html
    <section class="bg-slate-900 text-slate-200 border-b border-slate-800 py-3 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="border-l-2 border-amber-500 pl-3">
                <div class="text-slate-400 uppercase tracking-wider font-mono text-[10px]">Pioneer Genesis</div>
                <div class="font-bold text-slate-100 text-sm">Kathleen Booth (1947)</div>
                <div class="text-[11px] text-slate-400">ARC & APEC Calculators</div>
            </div>
            <div class="border-l-2 border-teal-500 pl-3">
                <div class="text-slate-400 uppercase tracking-wider font-mono text-[10px]">ISA Paradigm</div>
                <div class="font-bold text-slate-100 text-sm">CISC vs RISC vs Stack</div>
                <div class="text-[11px] text-slate-400">Hardware Specific Encodings</div>
            </div>
            <div class="border-l-2 border-sky-500 pl-3">
                <div class="text-slate-400 uppercase tracking-wider font-mono text-[10px]">ABI Standard</div>
                <div class="font-bold text-slate-100 text-sm">Linux System V AMD64</div>
                <div class="text-[11px] text-slate-400">RAX, RDI, RSI, RDX Syscalls</div>
            </div>
            <div class="border-l-2 border-indigo-500 pl-3">
                <div class="text-slate-400 uppercase tracking-wider font-mono text-[10px]">Memory Model</div>
                <div class="font-bold text-slate-100 text-sm">W &#8853; X Security Rule</div>
                <div class="text-[11px] text-slate-400">Isolated Text & Data Pages</div>
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
