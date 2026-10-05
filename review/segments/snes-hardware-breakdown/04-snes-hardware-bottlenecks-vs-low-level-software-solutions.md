---
source: ../snes_hardware_breakdown.html
document: "Zero Star: SNES Hardware Architecture Deconstruction"
kind: html-section
section_id: tab-matrix
lines: 471-499, 678-710, 1140-1159
findings: []
---

# SNES Hardware Bottlenecks vs Low-Level Software Solutions

###  📊 SNES Hardware Bottlenecks vs Low-Level Software Solutions

A comprehensive matrix detailing how physical hardware limits were bypassed through custom assembly engineering and mechanical sympathy for the console's architecture.

| Hardware Subsystem  | Physical Silicon Bottleneck  | Software Assembly Solution  | Engineering Impact

## Linked script: `matrixData` (lines 678-710)

The recommendation logic / numbers below are claims too; review them.

```js
        const matrixData = [
            {
                subsystem: "Main CPU (Ricoh 5A22)",
                bottleneck: "Slow 3.58 MHz speed; no hardware division or multiplication unit.",
                solution: "Packed BCD arithmetic via SED flag; bitwise spatial hashing for collisions.",
                impact: "Reduces cycle consumption by >90% during HUD updates and terrain physics."
            },
            {
                subsystem: "Work RAM (WRAM)",
                bottleneck: "128 kB split into isolated 64 kB Bank $7E and Bank $7F.",
                solution: "Dedicated Bank $7F to uncompressed 63 kB dungeon map grid.",
                impact: "Prevents memory fragmentation and supports 9,999 procedurally generated floors."
            },
            {
                subsystem: "PPU Scanline Buffers",
                bottleneck: "Strict limit of 32 sprite tiles per single horizontal scanline.",
                solution: "Viewport entity sorting; dynamic OAM priority table cycling.",
                impact: "Eliminates game-breaking sprite dropouts during intense multi-enemy combat."
            },
            {
                subsystem: "Display Parallax",
                bottleneck: "V-Blank window (1.3 ms) is too brief for multi-plane background shifts.",
                solution: "HDMA transfers to scroll register $2111 during 15µs scanline gaps.",
                impact: "Achieves smooth 60 FPS multi-plane mountain parallax with 0% CPU overhead."
            },
            {
                subsystem: "Audio Subsystem",
                bottleneck: "SPC700 APU is physically isolated from main CPU bus.",
                solution: "Custom 8-voice assembly sound driver with 4-port I/O handshake ($2140-$2143).",
                impact: "Enables independent BRR music playback and dynamic SFX voice stealing."
            }
        ];
```

## Linked script: `renderMatrixTable` (lines 1140-1159)

The recommendation logic / numbers below are claims too; review them.

```js
        function renderMatrixTable() {
            const tbody = document.getElementById('matrixTableBody');
            tbody.innerHTML = '';

            matrixData.forEach((row, idx) => {
                const tr = document.createElement('tr');
                tr.className = idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60';
                tr.innerHTML = `
                    <td class="p-3 font-mono font-bold text-amber-900 border-b border-stone-200">${row.subsystem}</td>
                    <td class="p-3 border-b border-stone-200">${row.bottleneck}</td>
                    <td class="p-3 font-mono text-teal-800 font-semibold border-b border-stone-200">${row.solution}</td>
                    <td class="p-3 border-b border-stone-200 text-slate-600">${row.impact}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        /* ====================================================================
           8. APPLICATION INITIALIZATION
           ==================================================================== */
```

<details><summary>Raw HTML (lines 471-499)</summary>

```html
        <section id="tab-matrix" class="space-y-6 hidden">
            <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>📊</span> SNES Hardware Bottlenecks vs Low-Level Software Solutions
                </h2>
                <p class="text-sm text-slate-600 mt-1">
                    A comprehensive matrix detailing how physical hardware limits were bypassed through custom assembly engineering and mechanical sympathy for the console's architecture.
                </p>
            </div>

            <!-- COMPARATIVE MATRIX TABLE -->
            <div class="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-900 text-slate-100 font-mono">
                                <th class="p-3 font-bold border-b border-slate-800">Hardware Subsystem</th>
                                <th class="p-3 font-bold border-b border-slate-800">Physical Silicon Bottleneck</th>
                                <th class="p-3 font-bold border-b border-slate-800">Software Assembly Solution</th>
                                <th class="p-3 font-bold border-b border-slate-800">Engineering Impact</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-200 font-sans text-slate-700" id="matrixTableBody">
                            <!-- Populated dynamically via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings for this part

_Pass 1 found nothing in this part. This does not mean that the part is correct. Nobody challenged it yet._

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
