---
source: ../assembly_vs_fortran_learning_advisor.html
document: "Assembly vs. Modern Fortran: Strategic Learning Advisor"
kind: html-section
section_id: wizard
lines: 176-268, 536-593
findings: [D03-C1, D03-C2, D03-M3, D03-m3]
---

# Interactive Recommendation Engine

#### Interactive Recommendation Engine

Answer 4 quick questions to compute your personalized affinity match score.

1. What is your primary educational or career objective?

A. Vulnerability research, reverse engineering, or firmware development.

B. High-Performance Computing (HPC), mathematical physics, or climate modeling.

2. What type of project do you expect to build by the end of 90 days?

A. Auditing compiled C code, analyzing disassembly, or micro-optimizing assembly loops.

B. A standalone, parallelized simulation program (e.g., fluid dynamics or matrix engine).

3. How do you prefer to interact with hardware and memory?

A. Direct register control, stack frames, physical pointers, and byte alignment.

B. High-level multidimensional arrays, non-aliasing parameters, and built-in SIMD.

4. What toolchain environment fits your current workflow?

A. Disassemblers (Ghidra), low-level debuggers (GDB), and online syntax translators.

B. Package managers (`fpm`), modern language servers (`fortls`), and Conda environments.

##### Recommendation Output

Select all options above

Complete the diagnostic questions to unlock your customized learning strategy.

Assembly Affinity 50%

Modern Fortran Affinity 50%

## Linked script: Quiz scoring logic (lines 536-593)

The recommendation logic / numbers below are claims too; review them.

```js
        // Quiz State Management
        const quizAnswers = { q1: null, q2: null, q3: null, q4: null };

        function setAnswer(question, choice) {
            quizAnswers[question] = choice;
            
            // Update UI selected styling
            document.querySelectorAll(`.quiz-${question}`).forEach(btn => {
                btn.classList.remove('selected', 'border-teal-500', 'bg-teal-900/40');
            });
            event.currentTarget.classList.add('selected', 'border-teal-500', 'bg-teal-900/40');

            calculateRecommendation();
        }

        function calculateRecommendation() {
            const keys = Object.keys(quizAnswers);
            const answeredCount = keys.filter(k => quizAnswers[k] !== null).length;
            
            document.getElementById('quiz-result').classList.remove('hidden');

            let assemblyCount = 0;
            let fortranCount = 0;

            keys.forEach(k => {
                if (quizAnswers[k] === 'assembly') assemblyCount++;
                if (quizAnswers[k] === 'fortran') fortranCount++;
            });

            const total = assemblyCount + fortranCount;
            if (total === 0) return;

            const assemblyScore = Math.round((assemblyCount / total) * 100);
            const fortranScore = Math.round((fortranCount / total) * 100);

            document.getElementById('score-assembly').innerText = `${assemblyScore}%`;
            document.getElementById('score-fortran').innerText = `${fortranScore}%`;
            document.getElementById('bar-assembly').style.width = `${assemblyScore}%`;
            document.getElementById('bar-fortran').style.width = `${fortranScore}%`;

            const title = document.getElementById('recommendation-title');
            const desc = document.getElementById('recommendation-desc');

            if (assemblyCount > fortranCount) {
                title.innerText = "Recommended Choice: Assembly Language";
                title.className = "text-2xl font-bold text-blue-400 mb-2";
                desc.innerText = "Your answers highlight a strong preference for low-level systems literacy, hardware reverse engineering, and understanding CPU microarchitecture.";
            } else if (fortranCount > assemblyCount) {
                title.innerText = "Recommended Choice: Modern Fortran";
                title.className = "text-2xl font-bold text-teal-400 mb-2";
                desc.innerText = "Your answers show a strong alignment with shipping production scientific software, array-oriented parallel computing, and numerical simulation.";
            } else {
                title.innerText = "Balanced Strategic Fit";
                title.className = "text-2xl font-bold text-amber-400 mb-2";
                desc.innerText = "You have equal interest in systems security and mathematical modeling. Consider Assembly if your main language is C/Rust, or Fortran if working in STEM.";
            }
        }
```

<details><summary>Raw HTML (lines 176-268)</summary>

```html
        <section id="wizard" class="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <div class="mb-6">
                <h3 class="text-xl font-bold text-white mb-2">Interactive Recommendation Engine</h3>
                <p class="text-slate-400 text-sm">Answer 4 quick questions to compute your personalized affinity match score.</p>
            </div>

            <div id="quiz-container" class="space-y-6">
                <!-- Question 1 -->
                <div class="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                    <p class="text-sm font-semibold text-slate-300 mb-3">1. What is your primary educational or career objective?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q1', 'assembly')" class="quiz-q1 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            A. Vulnerability research, reverse engineering, or firmware development.
                        </button>
                        <button onclick="setAnswer('q1', 'fortran')" class="quiz-q1 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            B. High-Performance Computing (HPC), mathematical physics, or climate modeling.
                        </button>
                    </div>
                </div>

                <!-- Question 2 -->
                <div class="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                    <p class="text-sm font-semibold text-slate-300 mb-3">2. What type of project do you expect to build by the end of 90 days?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q2', 'assembly')" class="quiz-q2 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            A. Auditing compiled C code, analyzing disassembly, or micro-optimizing assembly loops.
                        </button>
                        <button onclick="setAnswer('q2', 'fortran')" class="quiz-q2 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            B. A standalone, parallelized simulation program (e.g., fluid dynamics or matrix engine).
                        </button>
                    </div>
                </div>

                <!-- Question 3 -->
                <div class="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                    <p class="text-sm font-semibold text-slate-300 mb-3">3. How do you prefer to interact with hardware and memory?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q3', 'assembly')" class="quiz-q3 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            A. Direct register control, stack frames, physical pointers, and byte alignment.
                        </button>
                        <button onclick="setAnswer('q3', 'fortran')" class="quiz-q3 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            B. High-level multidimensional arrays, non-aliasing parameters, and built-in SIMD.
                        </button>
                    </div>
                </div>

                <!-- Question 4 -->
                <div class="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                    <p class="text-sm font-semibold text-slate-300 mb-3">4. What toolchain environment fits your current workflow?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q4', 'assembly')" class="quiz-q4 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            A. Disassemblers (Ghidra), low-level debuggers (GDB), and online syntax translators.
                        </button>
                        <button onclick="setAnswer('q4', 'fortran')" class="quiz-q4 quiz-option border border-slate-600 rounded-lg p-3 text-left text-sm font-medium text-slate-200 transition">
                            B. Package managers (`fpm`), modern language servers (`fortls`), and Conda environments.
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quiz Output Dashboard -->
            <div id="quiz-result" class="mt-6 p-6 bg-slate-800 rounded-xl border border-slate-700 hidden">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="w-full md:w-1/2">
                        <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">Recommendation Output</h4>
                        <div id="recommendation-title" class="text-2xl font-bold text-white mb-2">Select all options above</div>
                        <p id="recommendation-desc" class="text-sm text-slate-300">Complete the diagnostic questions to unlock your customized learning strategy.</p>
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col items-center">
                        <div class="w-full space-y-3">
                            <div>
                                <div class="flex justify-between text-xs font-mono mb-1">
                                    <span class="text-blue-400">Assembly Affinity</span>
                                    <span id="score-assembly" class="text-blue-400 font-bold">50%</span>
                                </div>
                                <div class="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                    <div id="bar-assembly" class="bg-blue-500 h-full transition-all duration-500" style="width: 50%;"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs font-mono mb-1">
                                    <span class="text-teal-400">Modern Fortran Affinity</span>
                                    <span id="score-fortran" class="text-teal-400 font-bold">50%</span>
                                </div>
                                <div class="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                    <div id="bar-fortran" class="bg-teal-500 h-full transition-all duration-500" style="width: 50%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
```
</details>

---

## Review findings mapped to this segment

Source of truth: `../../findings/` (pass 1). Mapped by source line range.

| ID | Severity | Evidence | Status | Location | Problem |
|---|---|---|---|---|---|
| D03-C1 | critical | DOC | open | Quiz, L176–268; logic L551–593 | **The quiz is tautological.** All four questions ask the same thing ("Assembly-flavoured or Fortran-flavoured?"). Option **A is always Assembly, B always Fortran**, so answer-position bias pushes toward Assembly. No question measures anything independent, such as prior languages, available time per week, owned hardware, or career stage. The output is an "affinity score" that just restates the user's choices. |
| D03-C2 | critical | DOC | open | L553 | `answeredCount` is computed but **never used**. After **one** click the result panel appears with *"Recommended Choice: Assembly Language — 100%"*, even though the placeholder says "Select all options above". |
| D03-M3 | major | DOC | open | L590 | The tie-break text brings in new criteria ("Assembly if your main language is C/Rust, Fortran if in STEM") that the quiz never asked about. They are the *right* questions, and they should be quiz questions. |
| D03-m3 | minor | — | open | L540–547 | `setAnswer` uses the implicit global `event`, which is deprecated. Pass the event explicitly. |

---

## Review worksheet

### 1. Goal / objective of this segment
_What is this segment trying to establish or help the reader decide?_

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
