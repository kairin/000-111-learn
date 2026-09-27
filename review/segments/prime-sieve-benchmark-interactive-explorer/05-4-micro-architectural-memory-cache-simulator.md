---
source: ../prime_sieve_benchmark_interactive_explorer.html
document: "Comparative Analysis: Prime Sieve Benchmark Dynamics"
kind: html-section
section_id: cache-simulator
lines: 320-412, 638-640, 641-655, 656-703
video: https://www.youtube.com/watch?v=tQtFdsEcK_s
findings: [D12-M1, D12-M2, D12-M3, D12-M7, D12-m6, D12-m7]
---

# 4. Micro-Architectural Memory & Cache Simulator

> **Source video:** [E01: What is the FASTEST Computer Language? 45 Languages Tested!](https://www.youtube.com/watch?v=tQtFdsEcK_s) (Dave's Garage, 22:26) · [at 11:11](https://www.youtube.com/watch?v=tQtFdsEcK_s&t=671s). Dave shows that Pascal packs the flags into bits to save memory.

### 4. Micro-Architectural Memory & Cache Simulator

A key trade-off highlighted in Episode 01 is data representation density. A packed bit array drastically reduces memory footprint to fit inside high-speed L1/L2 CPU cache, but requires extra bitwise shift (`SHR`/`SHL`) and mask (`AND`/`OR`) instructions per operation. A byte-boolean array allows single byte writes, but expands the working set 8-fold.

Upper Sieve Limit ($N$): 1,000,000
100K 1.0M (Standard) 5.0M

Data Representation Mode

Packed Bit Array (1 bit / odd)

Byte Boolean (1 byte / odd)

Candidate Odd Integers: 500,000

Calculated Buffer Footprint: 61.04 KiB

CPU Ops Per Factor Clear: 4 Ops (SHR, AND, OR, Write)

#### CPU Cache Level Alignment Map

L1 Data Cache (32 KiB Target Limit) 100%+ (Exceeded)

L2 Cache (512 KiB Target Limit) 11.9% (Fits Comfortably)

⚡
L2 Cache Resident: Buffer fits entirely in high-speed CPU L2 cache, eliminating DRAM latency bottlenecks during inner loop traversal.

Formula applied: Footprint = $\frac{N}{2 \times 8 \text{ bits/byte}}$ for packed bitwise arrays vs $\frac{N}{2 \text{ bytes}}$ for byte arrays. Small footprints prevent external DRAM bus stalls, but trade off against ALU cycle costs for bitwise masking.

## Linked script: `currentSimMode` (lines 638-640)

The recommendation logic / numbers below are claims too; review them.

```js
        // Memory & Cache Simulator Logic
        let currentSimMode = 'bit';
```

## Linked script: `setSimMode` (lines 641-655)

The recommendation logic / numbers below are claims too; review them.

```js
        function setSimMode(mode) {
            currentSimMode = mode;
            const btnBit = document.getElementById('btn-mode-bit');
            const btnByte = document.getElementById('btn-mode-byte');

            if (mode === 'bit') {
                btnBit.className = "p-2.5 text-xs font-semibold rounded-lg bg-stone-800 text-white border border-stone-800 transition";
                btnByte.className = "p-2.5 text-xs font-semibold rounded-lg bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition";
            } else {
                btnByte.className = "p-2.5 text-xs font-semibold rounded-lg bg-stone-800 text-white border border-stone-800 transition";
                btnBit.className = "p-2.5 text-xs font-semibold rounded-lg bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition";
            }
            updateMemorySim();
        }
```

## Linked script: `updateMemorySim` (lines 656-703)

The recommendation logic / numbers below are claims too; review them.

```js
        function updateMemorySim() {
            const limit = parseInt(document.getElementById('limit-slider').value);
            document.getElementById('limit-val').innerText = limit.toLocaleString();

            const oddCount = Math.floor(limit / 2);
            document.getElementById('stat-odds').innerText = oddCount.toLocaleString();

            let bytes = 0;
            let opsDesc = "";

            if (currentSimMode === 'bit') {
                bytes = Math.ceil(oddCount / 8);
                opsDesc = "4 Ops (SHR, AND, OR, Mask Write)";
            } else {
                bytes = oddCount; // 1 byte per odd number
                opsDesc = "1 Op (Direct Byte Write)";
            }

            const kib = (bytes / 1024).toFixed(2);
            document.getElementById('stat-footprint').innerText = `${kib} KiB (${bytes.toLocaleString()} Bytes)`;
            document.getElementById('stat-ops').innerText = opsDesc;

            // Cache Limits: L1 = 32 KiB, L2 = 512 KiB
            const l1Max = 32;
            const l2Max = 512;

            const l1Pct = Math.min(Math.round((kib / l1Max) * 100), 100);
            const l2Pct = Math.min(Math.round((kib / l2Max) * 100), 100);

            document.getElementById('l1-bar').style.width = `${l1Pct}%`;
            document.getElementById('l2-bar').style.width = `${l2Pct}%`;

            document.getElementById('l1-pct').innerText = kib > l1Max ? `100%+ (${(kib/l1Max).toFixed(1)}x Limit)` : `${l1Pct}%`;
            document.getElementById('l2-pct').innerText = kib > l2Max ? `100%+ (${(kib/l2Max).toFixed(1)}x Limit)` : `${l2Pct}%`;

            const badge = document.getElementById('cache-badge');
            if (kib <= l1Max) {
                badge.className = "p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-3 text-emerald-800 text-xs";
                badge.innerHTML = `<span class="text-lg">⚡</span><div><span class="font-bold">L1 Cache Resident:</span> Maximum execution speed. Buffer fits inside highest-speed 32 KiB CPU L1 data cache.</div>`;
            } else if (kib <= l2Max) {
                badge.className = "p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center space-x-3 text-amber-800 text-xs";
                badge.innerHTML = `<span class="text-lg">⚙️</span><div><span class="font-bold">L2 Cache Resident:</span> Buffer fits inside L2 cache (512 KiB). Zero DRAM latency stalls, moderate ALU instruction cost.</div>`;
            } else {
                badge.className = "p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-3 text-rose-800 text-xs";
                badge.innerHTML = `<span class="text-lg">⚠️</span><div><span class="font-bold">L3 / DRAM Spillover:</span> Working set exceeds L2 cache boundaries. CPU memory pipeline will experience cache line evictions.</div>`;
            }
        }
```

<details><summary>Raw HTML (lines 320-412)</summary>

```html
        <section id="cache-simulator" class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-stone-900 mb-2">4. Micro-Architectural Memory & Cache Simulator</h2>
                <p class="text-stone-600 text-sm md:text-base leading-relaxed">
                    A key trade-off highlighted in Episode 01 is data representation density. A <strong>packed bit array</strong> drastically reduces memory footprint to fit inside high-speed L1/L2 CPU cache, but requires extra bitwise shift (`SHR`/`SHL`) and mask (`AND`/`OR`) instructions per operation. A <strong>byte-boolean array</strong> allows single byte writes, but expands the working set 8-fold.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <!-- Calculator Controls -->
                <div class="lg:col-span-5 bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-5">
                    <div>
                        <label for="limit-slider" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            Upper Sieve Limit ($N$): <span id="limit-val" class="text-amber-700 font-mono text-sm">1,000,000</span>
                        </label>
                        <input id="limit-slider" type="range" min="100000" max="5000000" step="100000" value="1000000" oninput="updateMemorySim()" class="w-full accent-amber-600 cursor-pointer">
                        <div class="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                            <span>100K</span>
                            <span>1.0M (Standard)</span>
                            <span>5.0M</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Data Representation Mode</label>
                        <div class="grid grid-cols-2 gap-2">
                            <button id="btn-mode-bit" onclick="setSimMode('bit')" class="p-2.5 text-xs font-semibold rounded-lg bg-stone-800 text-white border border-stone-800 transition">
                                Packed Bit Array (1 bit / odd)
                            </button>
                            <button id="btn-mode-byte" onclick="setSimMode('byte')" class="p-2.5 text-xs font-semibold rounded-lg bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition">
                                Byte Boolean (1 byte / odd)
                            </button>
                        </div>
                    </div>

                    <div class="p-4 bg-white rounded-lg border border-stone-200 space-y-2 text-xs">
                        <div class="flex justify-between">
                            <span class="text-stone-500">Candidate Odd Integers:</span>
                            <span id="stat-odds" class="font-mono font-bold text-stone-800">500,000</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-500">Calculated Buffer Footprint:</span>
                            <span id="stat-footprint" class="font-mono font-bold text-amber-700">61.04 KiB</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-500">CPU Ops Per Factor Clear:</span>
                            <span id="stat-ops" class="font-mono font-bold text-stone-800">4 Ops (SHR, AND, OR, Write)</span>
                        </div>
                    </div>
                </div>

                <!-- Visual Cache Fit Gauge & Analysis -->
                <div class="lg:col-span-7 space-y-6">
                    <div class="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
                        <h3 class="font-bold text-stone-900 text-sm tracking-tight uppercase">CPU Cache Level Alignment Map</h3>
                        
                        <!-- L1 Data Cache Progress -->
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="font-semibold text-stone-700">L1 Data Cache (32 KiB Target Limit)</span>
                                <span id="l1-pct" class="font-mono text-stone-600">100%+ (Exceeded)</span>
                            </div>
                            <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                                <div id="l1-bar" class="bg-amber-600 h-full transition-all duration-300" style="width: 100%;"></div>
                            </div>
                        </div>

                        <!-- L2 Cache Progress -->
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="font-semibold text-stone-700">L2 Cache (512 KiB Target Limit)</span>
                                <span id="l2-pct" class="font-mono text-stone-600">11.9% (Fits Comfortably)</span>
                            </div>
                            <div class="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                                <div id="l2-bar" class="bg-emerald-600 h-full transition-all duration-300" style="width: 11.9%;"></div>
                            </div>
                        </div>

                        <!-- Cache Status Indicator Badge -->
                        <div id="cache-badge" class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-3 text-emerald-800 text-xs">
                            <span class="text-lg">⚡</span>
                            <div>
                                <span class="font-bold">L2 Cache Resident:</span> Buffer fits entirely in high-speed CPU L2 cache, eliminating DRAM latency bottlenecks during inner loop traversal.
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-stone-500 leading-relaxed italic">
                        Formula applied: Footprint = $\frac{N}{2 \times 8 \text{ bits/byte}}$ for packed bitwise arrays vs $\frac{N}{2 \text{ bytes}}$ for byte arrays. Small footprints prevent external DRAM bus stalls, but trade off against ALU cycle costs for bitwise masking.
                    </p>
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
| D12-M1 | major | DOC | open | L324 vs L679-701 | _Claim:_ The bit array fits "inside high-speed L1/L2 CPU cache".. _Problem:_ The page calculator itself shows 61.04 KiB against an L1 limit of 32 KiB, so "1.9x Limit" (L688). The text and the calculator do not agree. |
| D12-M2 | major | KNOW DOC | open | L44, L678-701 | _Claim:_ L1 is 32 KiB, L2 is 512 KiB. Above L2 the badge says "L3 / DRAM Spillover".. _Problem:_ The sizes are fixed. Many current CPUs have 32 to 48 KiB L1 data cache and 1 to 2 MiB L2. Apple M-series performance cores have 128 KiB L1. The comment at L44 promises an L3 check, but the code has none. L3 cache and DRAM (main memory) are different levels with very different speed. L697 says "Zero DRAM latency stalls" as a fact. |
| D12-M3 | major | KNOW | open | L366, L668, L671 | _Claim:_ A bit write costs "4 Ops (SHR, AND, OR, Mask Write)". A byte write costs "1 Op".. _Problem:_ To clear a bit you use AND with an inverted mask. To set a bit you use OR. One write does not need the two. A bit update is a read, a change and a write. The byte case also needs address work. The counts are not measured and do not predict speed. |
| D12-M7 | major | DOC | open | L85, L94, L143, L147, L156, L333, L408 | _Claim:_ Math such as $N = 1,000,000$ and $\sqrt{N}$ and \frac.. _Problem:_ The page loads no math library. The reader sees raw dollar signs and backslashes. L169 shows raw ** marks and L324 shows raw backticks, because the page is HTML, not Markdown. |
| D12-m6 | minor | DOC | open | L674, L682-692 | _Claim:_ The cache code compares kib with numbers.. _Problem:_ kib is a text string from toFixed. JavaScript converts it, so the result is correct, but the code is fragile. L568 uses substr, which is deprecated. |
| D12-m7 | minor | DOC | open | L366 vs L668, L380, L399-404 | _Claim:_ Start values in the HTML.. _Problem:_ The HTML says "Write", the script says "Mask Write". The start badge is green "L2 Cache Resident" and the script makes it amber. The script replaces them at load, so a reader sees a flash of different text. |

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
