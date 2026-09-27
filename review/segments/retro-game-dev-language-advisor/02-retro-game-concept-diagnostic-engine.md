---
source: ../retro_game_dev_language_advisor.html
document: "Retro Game Dev Advisor: Assembly vs. Fortran (1980s-1990s Constraints)"
kind: html-section
section_id: diagnostic
lines: 157-260, 484-541
findings: [D04-C1]
---

# Retro Game Concept Diagnostic Engine

####   Retro Game Concept Diagnostic Engine

Answer 4 questions about your target game design to calculate your language affinity score for the next 90 days.

1. What is the primary visual presentation of your target game?

A. Pixel-based Real-time Graphics Direct VGA Mode 13h (320x200 256-color), sprite animation, tile scrolling, or raycasting.

B. Grid / Matrix / Terminal Display ANSI/ASCII terminal text graphics, tactical grid maps, or high-level drawing harnesses.

2. What constitutes the heaviest computational load in your game?

A. Framebuffer Blitting & Input Polling Moving 64,000 bytes/frame to VRAM, custom sprite clipping, and zero-latency keyboard IRQs.

B. Mathematical Systems & Simulation Orbital physics vectors, trade economic webs, cellular automata terrain, or procedural galaxies.

3. What player experience metric is most crucial for your design?

A. Zero Input Lag & Fluid 60/70 FPS Twitch Arcade responsiveness without screen tearing or frame pacing hitches.

B. Emergent Systemic Depth & Infinite Replayability Rich tactical choices, deep procedural universe generation, and complex AI state trees.

4. What is your preferred lower-level math approach?

A. Fixed-Point & Shift Operations 16.16 / 8.8 integer scaling, LUT (look-up table) trigonometry, manual register optimization.

B. Native Array Expressions & Formulae Direct mathematical notation, multidimensional array slicing, vector calculations.

Diagnostic Verdict
Select all options above

Complete the diagnostic options to compute your tailored game engine development path.

Assembly Language Fit 50%

Fortran Simulation Fit 50%

## Linked script: Quiz scoring logic (lines 484-541)

The recommendation logic / numbers below are claims too; review them.

```js
        // Quiz State Management
        const quizAnswers = { q1: null, q2: null, q3: null, q4: null };

        function setAnswer(question, choice) {
            quizAnswers[question] = choice;
            
            // Update UI styling for selected options
            document.querySelectorAll(`.quiz-${question}`).forEach(btn => {
                btn.classList.remove('selected');
            });
            event.currentTarget.classList.add('selected');

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
                title.innerText = "Target Path: Assembly Language (Bare-Metal)";
                title.className = "text-xl font-bold font-mono text-indigo-400 mt-1 mb-2";
                desc.innerText = "Your game concept demands direct hardware control, pixel blitting, zero-latency input, and high frame rates. Assembly is mandatory for your retro action/arcade title.";
            } else if (fortranCount > assemblyCount) {
                title.innerText = "Target Path: Modern / FORTRAN 77 (Simulation Engine)";
                title.className = "text-xl font-bold font-mono text-cyan-400 mt-1 mb-2";
                desc.innerText = "Your game design prioritizes complex mathematical systems, cellular automata, orbital physics, or procedural generation. Fortran will allow you to build an extraordinarily deep game.";
            } else {
                title.innerText = "Balanced Design Concept";
                title.className = "text-xl font-bold font-mono text-amber-400 mt-1 mb-2";
                desc.innerText = "Your game shares traits of both action and complex simulation. Consider writing core math in Fortran and linking assembly subroutines for rendering!";
            }
        }
```

<details><summary>Raw HTML (lines 157-260)</summary>

```html
        <section id="diagnostic" class="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
                <h3 class="text-xl font-bold font-mono text-white flex items-center gap-2">
                    <span class="w-3 h-3 bg-amber-500 inline-block rounded-sm"></span>
                    Retro Game Concept Diagnostic Engine
                </h3>
                <p class="text-slate-400 text-sm mt-1">Answer 4 questions about your target game design to calculate your language affinity score for the next 90 days.</p>
            </div>

            <div id="quiz-container" class="space-y-6">
                <!-- Question 1 -->
                <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                    <p class="text-sm font-semibold text-slate-200 mb-3 font-mono">1. What is the primary visual presentation of your target game?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q1', 'assembly')" class="quiz-q1 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">A. Pixel-based Real-time Graphics</strong>
                            Direct VGA Mode 13h (320x200 256-color), sprite animation, tile scrolling, or raycasting.
                        </button>
                        <button onclick="setAnswer('q1', 'fortran')" class="quiz-q1 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">B. Grid / Matrix / Terminal Display</strong>
                            ANSI/ASCII terminal text graphics, tactical grid maps, or high-level drawing harnesses.
                        </button>
                    </div>
                </div>

                <!-- Question 2 -->
                <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                    <p class="text-sm font-semibold text-slate-200 mb-3 font-mono">2. What constitutes the heaviest computational load in your game?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q2', 'assembly')" class="quiz-q2 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">A. Framebuffer Blitting & Input Polling</strong>
                            Moving 64,000 bytes/frame to VRAM, custom sprite clipping, and zero-latency keyboard IRQs.
                        </button>
                        <button onclick="setAnswer('q2', 'fortran')" class="quiz-q2 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">B. Mathematical Systems & Simulation</strong>
                            Orbital physics vectors, trade economic webs, cellular automata terrain, or procedural galaxies.
                        </button>
                    </div>
                </div>

                <!-- Question 3 -->
                <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                    <p class="text-sm font-semibold text-slate-200 mb-3 font-mono">3. What player experience metric is most crucial for your design?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q3', 'assembly')" class="quiz-q3 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">A. Zero Input Lag & Fluid 60/70 FPS</strong>
                            Twitch Arcade responsiveness without screen tearing or frame pacing hitches.
                        </button>
                        <button onclick="setAnswer('q3', 'fortran')" class="quiz-q3 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">B. Emergent Systemic Depth & Infinite Replayability</strong>
                            Rich tactical choices, deep procedural universe generation, and complex AI state trees.
                        </button>
                    </div>
                </div>

                <!-- Question 4 -->
                <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
                    <p class="text-sm font-semibold text-slate-200 mb-3 font-mono">4. What is your preferred lower-level math approach?</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onclick="setAnswer('q4', 'assembly')" class="quiz-q4 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">A. Fixed-Point & Shift Operations</strong>
                            16.16 / 8.8 integer scaling, LUT (look-up table) trigonometry, manual register optimization.
                        </button>
                        <button onclick="setAnswer('q4', 'fortran')" class="quiz-q4 quiz-option border border-slate-700 rounded-lg p-3 text-left text-xs font-medium text-slate-300 transition">
                            <strong class="block text-slate-100 text-sm mb-1">B. Native Array Expressions & Formulae</strong>
                            Direct mathematical notation, multidimensional array slicing, vector calculations.
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quiz Output Dashboard -->
            <div id="quiz-result" class="p-6 bg-slate-800 rounded-xl border border-slate-700 hidden">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="w-full md:w-1/2">
                        <span class="text-xs uppercase tracking-wider font-mono font-semibold text-amber-400">Diagnostic Verdict</span>
                        <div id="recommendation-title" class="text-xl font-bold font-mono text-white mt-1 mb-2">Select all options above</div>
                        <p id="recommendation-desc" class="text-xs text-slate-300 leading-relaxed">Complete the diagnostic options to compute your tailored game engine development path.</p>
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col items-center">
                        <div class="w-full space-y-3">
                            <div>
                                <div class="flex justify-between text-xs font-mono mb-1">
                                    <span class="text-indigo-400 font-bold">Assembly Language Fit</span>
                                    <span id="score-assembly" class="text-indigo-400 font-bold">50%</span>
                                </div>
                                <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
                                    <div id="bar-assembly" class="bg-indigo-500 h-full transition-all duration-500" style="width: 50%;"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs font-mono mb-1">
                                    <span class="text-cyan-400 font-bold">Fortran Simulation Fit</span>
                                    <span id="score-fortran" class="text-cyan-400 font-bold">50%</span>
                                </div>
                                <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700">
                                    <div id="bar-fortran" class="bg-cyan-500 h-full transition-all duration-500" style="width: 50%;"></div>
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
| D04-C1 | critical | DOC KNOW | open | Quiz logic L499–541 | It has the same defects as page 03: `answeredCount` is unused, so one click gives a 100% verdict, and option A is always Assembly. The Assembly result says "**Assembly is mandatory** for your retro action/arcade title" (L530), which is false: plenty of retro action games were written in C with small amounts of assembly. |

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
