---
source: ../prime_sieve_benchmark_interactive_explorer.html
document: "Comparative Analysis: Prime Sieve Benchmark Dynamics"
kind: html-section
section_id: systems-matrix
lines: 230-317, 512-513, 615-637
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
findings: [D12-C3, D12-C4, D12-M9, D12-m8]
---

# 3. Systems Systems Deep Dive: Ada, Pascal, and Delphi

> **Source video:** [E01: What is the FASTEST Computer Language? 45 Languages Tested!](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage, 22:26) · [at 08:14](https://www.youtube.com/watch?v=tQtFdsEcK_s&t=494s). Dave names Pascal, Delphi and Ada as the first group.

### 3. Systems Systems Deep Dive: Ada, Pascal, and Delphi

While modern benchmarking discussions often focus on C++ vs. Rust, standard structured languages like Ada, Pascal, and Delphi share a rich heritage of high performance. This section explores how their safety profiles, compiler backends, and array representations impact machine code generation.

#### Interactive Safety Flag Simulator

Toggle runtime safety checks (array bounds verification, range checks, and invariant assertions) to observe their effect on compiled native code throughput.

Runtime Safety Checks:
ENABLED (Default Defensive)

Branch Instruction Density
High (Check on every write)

Inserts comparison branches inside tight loops, disturbing pipeline speculation.

Compiler Directives Applied
Ada default assertions / {$R+} {$Q+}

Ensures safety against buffer overflows and type range violations.

Estimated Throughput Penalty
-60% to -65% vs Unrestricted C

Suppression under -O3 brings performance back to parity with C/C++.

| Language / Dialect  | Compiler Infrastructure  | Type & Safety Profile  | Memory Strategy  | Primary Code Generation Vector

|  Ada (GNAT)   | GNAT Backend built upon GCC optimization pipeline  | Strict subtype ranges & invariant validation checks  | Packed bit array or dynamic boolean buffer  | Scalar evolution, dead-code elimination, aggressive interprocedural inlining

|  Pascal (Free Pascal)   | Free Pascal Compiler (FPC) native code generator  | Strongly typed procedural paradigm with modular units  | Dynamic continuous byte-boolean array  | Register variable allocation, loop invariant hoisting, suppressible range checking

|  Delphi (Embarcadero)   | Proprietary Embarcadero Delphi Object Pascal Compiler  | Object Pascal with component encapsulation  | Heap-allocated dynamic buffer wrappers  | Whole-program link-time code generation, fastcall register passing convention

## Linked script: `isSafetyEnabled` (lines 512-513)

The recommendation logic / numbers below are claims too; review them.

```js
        let isSafetyEnabled = true;
```

## Linked script: `toggleSafetyMode` (lines 615-637)

The recommendation logic / numbers below are claims too; review them.

```js
        // Safety Flag Simulator Logic
        function toggleSafetyMode() {
            isSafetyEnabled = !isSafetyEnabled;
            const btn = document.getElementById('safety-toggle-btn');
            const branch = document.getElementById('sim-branch');
            const flags = document.getElementById('sim-flags');
            const penalty = document.getElementById('sim-penalty');

            if (isSafetyEnabled) {
                btn.innerText = "ENABLED (Default Defensive)";
                btn.className = "px-3 py-1 rounded text-xs font-bold bg-amber-600 text-white transition";
                branch.innerText = "High (Check on every write)";
                flags.innerText = "Ada default assertions / {$R+} {$Q+}";
                penalty.innerText = "-60% to -65% vs Unrestricted C";
            } else {
                btn.innerText = "DISABLED (Optimized Release)";
                btn.className = "px-3 py-1 rounded text-xs font-bold bg-emerald-700 text-white transition";
                branch.innerText = "Zero Overhead (Vectorized)";
                flags.innerText = "GNAT pragma Suppress / {$R-} {$Q-} -O3";
                penalty.innerText = "Parity with C/C++ (~1.0x Baseline)";
            }
        }
```

<details><summary>Raw HTML (lines 230-317)</summary>

```html
        <section id="systems-matrix" class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-stone-900 mb-2">3. Systems Systems Deep Dive: Ada, Pascal, and Delphi</h2>
                <p class="text-stone-600 text-sm md:text-base leading-relaxed">
                    While modern benchmarking discussions often focus on C++ vs. Rust, standard structured languages like Ada, Pascal, and Delphi share a rich heritage of high performance. This section explores how their safety profiles, compiler backends, and array representations impact machine code generation.
                </p>
            </div>

            <!-- Compiler Safety Check Toggle Simulator -->
            <div class="mb-8 p-5 bg-amber-50/60 rounded-xl border border-amber-200/80">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 class="font-bold text-stone-900 text-base">Interactive Safety Flag Simulator</h3>
                        <p class="text-xs text-stone-600 mt-1">
                            Toggle runtime safety checks (array bounds verification, range checks, and invariant assertions) to observe their effect on compiled native code throughput.
                        </p>
                    </div>
                    <div class="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-sm self-start">
                        <span class="text-xs font-medium text-stone-600">Runtime Safety Checks:</span>
                        <button id="safety-toggle-btn" onclick="toggleSafetyMode()" class="px-3 py-1 rounded text-xs font-bold bg-amber-600 text-white transition">
                            ENABLED (Default Defensive)
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-amber-200/60 text-xs">
                    <div class="bg-white p-3 rounded border border-stone-200">
                        <span class="text-stone-500 font-medium">Branch Instruction Density</span>
                        <div id="sim-branch" class="text-base font-bold text-stone-800 mt-0.5">High (Check on every write)</div>
                        <p class="text-[11px] text-stone-500 mt-1">Inserts comparison branches inside tight loops, disturbing pipeline speculation.</p>
                    </div>
                    <div class="bg-white p-3 rounded border border-stone-200">
                        <span class="text-stone-500 font-medium">Compiler Directives Applied</span>
                        <div id="sim-flags" class="text-base font-mono font-bold text-amber-800 mt-0.5">Ada default assertions / {$R+} {$Q+}</div>
                        <p class="text-[11px] text-stone-500 mt-1">Ensures safety against buffer overflows and type range violations.</p>
                    </div>
                    <div class="bg-white p-3 rounded border border-stone-200">
                        <span class="text-stone-500 font-medium">Estimated Throughput Penalty</span>
                        <div id="sim-penalty" class="text-base font-bold text-amber-700 mt-0.5">-60% to -65% vs Unrestricted C</div>
                        <p class="text-[11px] text-stone-500 mt-1">Suppression under -O3 brings performance back to parity with C/C++.</p>
                    </div>
                </div>
            </div>

            <!-- Architectural Comparison Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                    <thead>
                        <tr class="bg-stone-100 text-stone-700 uppercase font-semibold border-b border-stone-200">
                            <th class="p-3">Language / Dialect</th>
                            <th class="p-3">Compiler Infrastructure</th>
                            <th class="p-3">Type & Safety Profile</th>
                            <th class="p-3">Memory Strategy</th>
                            <th class="p-3">Primary Code Generation Vector</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-stone-200 text-stone-700">
                        <tr class="hover:bg-stone-50 transition">
                            <td class="p-3 font-bold text-stone-900">
                                Ada (GNAT)
                            </td>
                            <td class="p-3">GNAT Backend built upon GCC optimization pipeline</td>
                            <td class="p-3">Strict subtype ranges & invariant validation checks</td>
                            <td class="p-3 font-mono">Packed bit array or dynamic boolean buffer</td>
                            <td class="p-3">Scalar evolution, dead-code elimination, aggressive interprocedural inlining</td>
                        </tr>
                        <tr class="hover:bg-stone-50 transition">
                            <td class="p-3 font-bold text-stone-900">
                                Pascal (Free Pascal)
                            </td>
                            <td class="p-3">Free Pascal Compiler (FPC) native code generator</td>
                            <td class="p-3">Strongly typed procedural paradigm with modular units</td>
                            <td class="p-3 font-mono">Dynamic continuous byte-boolean array</td>
                            <td class="p-3">Register variable allocation, loop invariant hoisting, suppressible range checking</td>
                        </tr>
                        <tr class="hover:bg-stone-50 transition">
                            <td class="p-3 font-bold text-stone-900">
                                Delphi (Embarcadero)
                            </td>
                            <td class="p-3">Proprietary Embarcadero Delphi Object Pascal Compiler</td>
                            <td class="p-3">Object Pascal with component encapsulation</td>
                            <td class="p-3 font-mono">Heap-allocated dynamic buffer wrappers</td>
                            <td class="p-3">Whole-program link-time code generation, fastcall register passing convention</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
```
</details>

---

## Review findings for this part

The findings come from `../../findings/` (pass 1). The script matches them to this part by source line.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D12-C3 | critical | VIDEO | open | L498, L305-313 | _Claim:_ Delphi scores 2180 passes per second (0.85x).. _Problem:_ Dave says the Delphi score "cannot be counted" [16:48] because it uses ByteBool bytes [16:36]. He also names the commercial license [16:56]. The page invents a score for a language that the video did not race. |
| D12-C4 | critical | DOC KNOW | open | L239-271, L616-636 | _Claim:_ Safety simulator: checks on give "-60% to -65% vs Unrestricted C". Checks off give "Parity with C/C++" and "Zero Overhead (Vectorized)".. _Problem:_ The toggle changes only four text labels. It computes nothing and does not change the chart. The penalty numbers have no source. -O3 does not turn checks off (L269, L633). In Ada you use pragma Suppress or -gnatp. {$R+} {$Q+} are not the Free Pascal default (L263, L627), so "Default Defensive" is wrong for Pascal. A strided sieve loop (a loop with a fixed step larger than one) seldom vectorizes. |
| D12-M9 | major | DOC | open | L59, L200-202, L249, L578-583 | _Claim:_ Accessibility.. _Problem:_ The chart canvas has no text alternative and no data table. The detail card opens only with a mouse click on a bar, not with a keyboard. The navigation is hidden on small screens (hidden md:flex) and has no replacement. The toggle buttons have no aria-pressed state. Category shows only by color. Much text is 10 to 11 pixels. |
| D12-m8 | minor | DOC | open | L232 | _Claim:_ "Systems Systems Deep Dive".. _Problem:_ The word is doubled. |

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
