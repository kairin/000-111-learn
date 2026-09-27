---
source: ../fortran_technical_deconstruction.html
document: "Fortran Technical Deconstruction & Interactive Analysis"
kind: html-section
section_id: sec-punchcard
lines: 182-245, 589-608, 609-613
video: https://www.youtube.com/watch?v=NMWzgy8FsKs
findings: [D08-M7, D08-m5, D08-m6, D08-m7, D08-m8]
---

# Section 2: Electromechanical Constraints & Fixed Source Form

> **Source video:** [FORTRAN in 100 Seconds](https://www.youtube.com/watch?v=NMWzgy8FsKs) (Fireship, 2:38) · [at 00:45](https://www.youtube.com/watch?v=NMWzgy8FsKs&t=45s). The video shows punch cards and capital keywords. It does not give the column layout.

###  ⚙ Section 2: Electromechanical Constraints & Fixed Source Form

Early Fortran syntax was heavily governed by the physical substrate of the 80-column Hollerith punch card fed into IBM card readers. Modern free-form Fortran (introduced in Fortran 90) eliminated these bounds, but legacy fixed-form formatting dictated programming for nearly four decades.

Interactive Hollerith Card Inspector (80-Column Layout) Click on a card section below to inspect its functional significance

Cols 1-5 Label/C

Col 6 Cont

Columns 7 through 72 Executable Code Field (Statements & Expressions)

Cols 73-80 Card ID

####  Select a column field above

Click any of the highlighted column regions on the physical punch card above to inspect how mid-century electromechanical card readers enforced structural constraints on FORTRAN 66/77 programs.

##### Uppercase Typography Origin

Keypunches such as the IBM 026 and 029 lacked lowercase character sets and shift keys entirely. Uppercase coding was a strict hardware constraint, not a stylistic decision. Modern Fortran is fully case-insensitive.

##### Free Source Form (Fortran 90+)

Fortran 90 discarded physical card layout constraints entirely. Modern code allows up to 132 characters per line, dynamic inline comments using exclamation marks (!), and free indentation.

## Linked script: `cardData` (lines 589-608)

The recommendation logic / numbers below are claims too; review them.

```js
    // SECTION 2: Punchcard Segment Selector
    const cardData = {
      label: {
        title: "Columns 1–5: Statement Label / Comment Marker",
        desc: "Reserved strictly for numeric statement labels referenced by GOTO or FORMAT statements. Placed in Column 1, an 'C' or '*' marked the entire punch card as a non-executable comment."
      },
      cont: {
        title: "Column 6: Continuation Indicator",
        desc: "Any non-blank, non-zero punched character in column 6 signaled to the IBM card reader that this card was a direct continuation of the statement on the preceding card."
      },
      body: {
        title: "Columns 7–72: Executable Statement Body",
        desc: "The core field where variable declarations, math expressions, DO loops, and function calls were typed. Modern Fortran free source form expands this up to 132 characters and removes column alignment rules."
      },
      id: {
        title: "Columns 73–80: Card Sequence Identifier",
        desc: "Ignored by the compiler parser. Used by physical card sorting machinery to assign line numbers to decks, ensuring cards could be re-ordered if a physical deck was accidentally dropped."
      }
    };
```

## Linked script: `selectCardSegment` (lines 609-613)

The recommendation logic / numbers below are claims too; review them.

```js
    function selectCardSegment(seg) {
      document.getElementById('punchcard-info-title').innerText = cardData[seg].title;
      document.getElementById('punchcard-info-desc').innerText = cardData[seg].desc;
    }
```

<details><summary>Raw HTML (lines 182-245)</summary>

```html
    <section id="sec-punchcard" class="hidden space-y-8">
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
        <h2 class="text-2xl font-bold text-stone-900 mb-3 flex items-center gap-2">
          <span>⚙</span> Section 2: Electromechanical Constraints & Fixed Source Form
        </h2>
        <p class="text-stone-600 leading-relaxed mb-6">
          Early Fortran syntax was heavily governed by the physical substrate of the 80-column Hollerith punch card fed into IBM card readers. Modern free-form Fortran (introduced in Fortran 90) eliminated these bounds, but legacy fixed-form formatting dictated programming for nearly four decades.
        </p>

        <!-- Interactive Punchcard Simulator -->
        <div class="bg-amber-100/60 p-6 rounded-2xl border border-amber-200 shadow-inner">
          <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-900">Interactive Hollerith Card Inspector (80-Column Layout)</span>
            <span class="text-xs text-amber-800 italic">Click on a card section below to inspect its functional significance</span>
          </div>

          <!-- Card Graphic Blocks -->
          <div class="grid grid-cols-12 gap-1 bg-stone-800 p-2 rounded-lg text-center text-xs code-font font-bold text-white select-none">
            <div onclick="selectCardSegment('label')" id="card-seg-label" class="col-span-2 sm:col-span-1 bg-rose-600 hover:bg-rose-500 cursor-pointer p-3 rounded transition flex flex-col justify-center">
              <span>Cols 1-5</span>
              <span class="text-[10px] font-normal opacity-80">Label/C</span>
            </div>
            <div onclick="selectCardSegment('cont')" id="card-seg-cont" class="col-span-2 sm:col-span-1 bg-amber-600 hover:bg-amber-500 cursor-pointer p-3 rounded transition flex flex-col justify-center">
              <span>Col 6</span>
              <span class="text-[10px] font-normal opacity-80">Cont</span>
            </div>
            <div onclick="selectCardSegment('body')" id="card-seg-body" class="col-span-5 sm:col-span-8 bg-emerald-600 hover:bg-emerald-500 cursor-pointer p-3 rounded transition flex flex-col justify-center">
              <span>Columns 7 through 72</span>
              <span class="text-[10px] font-normal opacity-80">Executable Code Field (Statements & Expressions)</span>
            </div>
            <div onclick="selectCardSegment('id')" id="card-seg-id" class="col-span-3 sm:col-span-2 bg-sky-600 hover:bg-sky-500 cursor-pointer p-3 rounded transition flex flex-col justify-center">
              <span>Cols 73-80</span>
              <span class="text-[10px] font-normal opacity-80">Card ID</span>
            </div>
          </div>

          <!-- Segment Info Display Box -->
          <div id="punchcard-info-box" class="mt-5 bg-white p-5 rounded-xl border border-stone-200">
            <h3 id="punchcard-info-title" class="text-lg font-bold text-stone-900 flex items-center gap-2">
              Select a column field above
            </h3>
            <p id="punchcard-info-desc" class="text-sm text-stone-600 mt-2 leading-relaxed">
              Click any of the highlighted column regions on the physical punch card above to inspect how mid-century electromechanical card readers enforced structural constraints on FORTRAN 66/77 programs.
            </p>
          </div>
        </div>

        <!-- Additional Typography Notes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
            <h4 class="font-bold text-stone-900 text-sm mb-2">Uppercase Typography Origin</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Keypunches such as the IBM 026 and 029 lacked lowercase character sets and shift keys entirely. Uppercase coding was a strict hardware constraint, not a stylistic decision. Modern Fortran is fully case-insensitive.
            </p>
          </div>
          <div class="bg-stone-50 p-5 rounded-xl border border-stone-200">
            <h4 class="font-bold text-stone-900 text-sm mb-2">Free Source Form (Fortran 90+)</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Fortran 90 discarded physical card layout constraints entirely. Modern code allows up to 132 characters per line, dynamic inline comments using exclamation marks (<code class="bg-stone-200 px-1 rounded">!</code>), and free indentation.
            </p>
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
| D08-M7 | major | VERIFY | verify | L234 | _Claim:_ The IBM 026 and 029 "lacked lowercase character sets and shift keys entirely".. _Problem:_ This is stronger than the report. The keypunches had a numeric shift. See review 07, M4. |
| D08-m5 | minor | KNOW | open | L593 | _Claim:_ "'C' or '*'" in column 1 marks a comment. _Problem:_ This is correct for FORTRAN 77 and better than report L15. `*` was not valid in FORTRAN 66. |
| D08-m6 | minor | KNOW | open | L597 | _Claim:_ Column 6 "signaled to the IBM card reader". _Problem:_ The compiler reads column 6, not the card reader. The card reader only reads holes. |
| D08-m7 | minor | KNOW | open | L605 | _Claim:_ Card sorting machines "assign line numbers to decks". _Problem:_ A sorter reads the sequence numbers. It does not assign them. People or keypunch programs punched them. |
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
