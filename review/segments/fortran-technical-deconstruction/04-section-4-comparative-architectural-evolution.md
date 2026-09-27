---
source: ../fortran_technical_deconstruction.html
document: "Fortran Technical Deconstruction & Interactive Analysis"
kind: html-section
section_id: sec-evolution
lines: 324-357, 686-725, 726-743, 744-755
video: https://www.youtube.com/watch?v=NMWzgy8FsKs
findings: [D08-M6, D08-m8]
---

# Section 4: Comparative Architectural Evolution

> **Source video:** [FORTRAN in 100 Seconds](https://www.youtube.com/watch?v=NMWzgy8FsKs) (Fireship, 2:38) · [at 00:37](https://www.youtube.com/watch?v=NMWzgy8FsKs&t=37s). The video says only that the language has many versions. It does not compare old and new standards.

###  📊 Section 4: Comparative Architectural Evolution

Fortran has undergone continuous transformation across six decades. Explore how legacy specifications (FORTRAN 66/77) compare with modern HPC standards (Fortran 90 through Fortran 2018+).

All Domains

Memory & Arrays

Syntax & Formatting

Control & Parallelism

| Architectural Domain  | Classical FORTRAN (66 / 77)  | Modern Fortran (90 through 2018+)

## Linked script: `evolutionData` (lines 686-725)

The recommendation logic / numbers below are claims too; review them.

```js
    // SECTION 4: Comparative Evolution Matrix Data
    const evolutionData = [
      {
        domain: "syntax",
        domainName: "Source Formatting",
        legacy: "Strict 80-column fixed format; punch-card layout constraints.",
        modern: "Free source form; up to 132 chars/line; case-insensitive; inline '!' comments."
      },
      {
        domain: "memory",
        domainName: "Typing Discipline",
        legacy: "Implicit type mapping based on initial letters (I–N = Integer convention).",
        modern: "Strict type checking enforced via explicit declarations and mandatory 'implicit none'."
      },
      {
        domain: "memory",
        domainName: "Memory Management",
        legacy: "Static partitions; no dynamic heap support; shared global COMMON blocks.",
        modern: "Dynamic heap management via allocatable arrays and type-safe pointers (=>)."
      },
      {
        domain: "memory",
        domainName: "Array Processing",
        legacy: "Element-by-element iterative loops (DO loops).",
        modern: "Native matrix slicing, vectorization, and whole-array algebraic operators."
      },
      {
        domain: "control",
        domainName: "Control Flow",
        legacy: "Reliance on line numbers, computed GOTO, and arithmetic IF.",
        modern: "Structured blocks (do ... end do, select case, if ... then ... else)."
      },
      {
        domain: "control",
        domainName: "Parallel Computing",
        legacy: "External hardware pragmas or platform-dependent libraries.",
        modern: "Native Single Program, Multiple Data (SPMD) parallelism via built-in Coarrays."
      }
    ];
```

## Linked script: `populateEvolutionTable` (lines 726-743)

The recommendation logic / numbers below are claims too; review them.

```js
    function populateEvolutionTable(filter) {
      const tbody = document.getElementById('evolution-table-body');
      tbody.innerHTML = '';

      evolutionData.forEach(row => {
        if (filter === 'all' || row.domain === filter) {
          const tr = document.createElement('tr');
          tr.className = "hover:bg-stone-50 transition";
          tr.innerHTML = `
            <td class="p-3.5 sm:p-4 font-bold text-stone-900 border-r border-stone-100">${row.domainName}</td>
            <td class="p-3.5 sm:p-4 text-stone-600 border-r border-stone-100 bg-amber-50/20">${row.legacy}</td>
            <td class="p-3.5 sm:p-4 text-stone-800 font-medium">${row.modern}</td>
          `;
          tbody.appendChild(tr);
        }
      });
    }
```

## Linked script: `filterEvolution` (lines 744-755)

The recommendation logic / numbers below are claims too; review them.

```js
    function filterEvolution(type) {
      ['all', 'memory', 'syntax', 'control'].forEach(t => {
        const btn = document.getElementById(`filter-btn-${t}`);
        if (t === type) {
          btn.className = "px-3 py-1.5 rounded-full bg-amber-700 text-white font-semibold";
        } else {
          btn.className = "px-3 py-1.5 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300 font-semibold";
        }
      });
      populateEvolutionTable(type);
    }
```

<details><summary>Raw HTML (lines 324-357)</summary>

```html
    <section id="sec-evolution" class="hidden space-y-8">
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
        <h2 class="text-2xl font-bold text-stone-900 mb-3 flex items-center gap-2">
          <span>📊</span> Section 4: Comparative Architectural Evolution
        </h2>
        <p class="text-stone-600 leading-relaxed mb-6">
          Fortran has undergone continuous transformation across six decades. Explore how legacy specifications (FORTRAN 66/77) compare with modern HPC standards (Fortran 90 through Fortran 2018+).
        </p>

        <!-- Filter Controls -->
        <div class="flex gap-2 mb-4 overflow-x-auto pb-2 text-xs font-semibold">
          <button onclick="filterEvolution('all')" id="filter-btn-all" class="px-3 py-1.5 rounded-full bg-amber-700 text-white">All Domains</button>
          <button onclick="filterEvolution('memory')" id="filter-btn-memory" class="px-3 py-1.5 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300">Memory & Arrays</button>
          <button onclick="filterEvolution('syntax')" id="filter-btn-syntax" class="px-3 py-1.5 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300">Syntax & Formatting</button>
          <button onclick="filterEvolution('control')" id="filter-btn-control" class="px-3 py-1.5 rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300">Control & Parallelism</button>
        </div>

        <!-- Comparison Table -->
        <div class="overflow-x-auto border border-stone-200 rounded-xl">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-stone-900 text-stone-200 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="p-3.5 sm:p-4">Architectural Domain</th>
                <th class="p-3.5 sm:p-4">Classical FORTRAN (66 / 77)</th>
                <th class="p-3.5 sm:p-4">Modern Fortran (90 through 2018+)</th>
              </tr>
            </thead>
            <tbody id="evolution-table-body" class="divide-y divide-stone-200 bg-white">
              <!-- Dynamically populated via JS -->
            </tbody>
          </table>
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
| D08-M6 | major | DOC KNOW | open | L696-698, L719-723 | _Claim:_ The evolution table: "mandatory implicit none", and coarrays as the modern parallel model. _Problem:_ The same errors as review 07, M1 and M2. Also, the row "Typing Discipline" has the domain "memory", so the filter "Memory and Arrays" shows it, and "Syntax" shows only one row. |
| D08-m8 | minor | VERIFY | verify | L240, L601, L692 | _Claim:_ Free form permits up to 132 characters per line.. _Problem:_ Fortran 2023 increased the limit to 10,000 characters. See review 07, m2. |

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
