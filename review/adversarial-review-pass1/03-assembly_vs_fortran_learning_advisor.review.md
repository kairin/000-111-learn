---
target: ../segments/assembly_vs_fortran_learning_advisor.html
derived_from: ../segments/Assembly-Fortran-Comparison.md (see review 01)
segments: ../segments/assembly-vs-fortran-learning-advisor/
pass: 1 (adversarial, desk review)
date: 2026-09-27
---

# Adversarial review — "Assembly vs. Modern Fortran: Strategic Learning Advisor" (HTML)

This page is an interactive summary of report 01, so **every content finding in review 01 applies here too**. This review covers only what the page *adds or changes*: the quiz logic, the charts, drift from the source, and delivery.

## 1. Goals and objectives

1. Give a personalised recommendation through a 4-question quiz.
2. Show the 12-week roadmap, pedagogical yield, the market and ecosystem, and the ISA choice at a glance.
3. Send the user to a starting toolchain (the Compiler Explorer and fortran-lang links).

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Personalised recommendation | **No** | The quiz is tautological and leading, and it issues a verdict after one answer (C1, C2). |
| 2. At-a-glance summary | **Partly** | It faithfully condenses report 01 except that the charts **misstate or invent numbers** (C3, C4), and it drops every citation. |
| 3. Starting point | **Yes** | The links are relevant. |

## 3. Findings

### Critical

| # | Location | Problem | Tag |
|---|---|---|---|
| C1 | Quiz, L176–268; logic L551–593 | **The quiz is tautological.** All four questions ask the same thing ("Assembly-flavoured or Fortran-flavoured?"). Option **A is always Assembly, B always Fortran**, so answer-position bias pushes toward Assembly. No question measures anything independent, such as prior languages, available time per week, owned hardware, or career stage. The output is an "affinity score" that just restates the user's choices. | [DOC] |
| C2 | L553 | `answeredCount` is computed but **never used**. After **one** click the result panel appears with *"Recommended Choice: Assembly Language — 100%"*, even though the placeholder says "Select all options above". | [DOC] (code) |
| C3 | L684–696 vs report L144 | **The salary chart contradicts its source.** The Assembly maximum is plotted as **$180k**, while report 01 says senior defense positions exceed **$200k** (image5). The Fortran maximum ($245k) is kept. The chart therefore *visually* favours Fortran more than the source does. The minimums (112k, 105k) come from the broken, truncated ranges in report 01 (review 01, C1). | [DOC] |
| C4 | L730–756 | The **"Developer Experience & Toolchain Friction Score"** radar chart uses invented numbers (Assembly 20/40/15/10/10/30 vs Fortran 85/80/75/90/85/80). There is no method and no source, yet the section is titled "**Quantitative analysis**". | [DOC] |

### Major

| # | Location | Problem | Tag |
|---|---|---|---|
| M1 | L635 | Roadmap weeks 9–12 adds "**Deploying parallel PDE solvers on HPC clusters**", which is not in the source report. This goes further than the report's already optimistic milestone: cluster access, schedulers and MPI are not covered. | [DOC] drift |
| M2 | L627 | Roadmap adds "control-flow hijacking concepts" (exploit development), which is not in the source. This is a scope change: exploitation is a separate discipline. | [DOC] drift |
| M3 | L590 | The tie-break text brings in new criteria ("Assembly if your main language is C/Rust, Fortran if in STEM") that the quiz never asked about. They are the *right* questions, and they should be quiz questions. | [DOC] |
| M4 | whole page | **No citations or data provenance.** The footer says "Based on the Comparative Strategic Analysis", but a reader can't trace any number. | [DOC] |

### Minor / technical

| # | Location | Issue |
|---|---|---|
| m1 | L8 | `cdn.tailwindcss.com` is Tailwind's **development-only** Play CDN, which is not meant for production. It requires a network connection and won't work offline. |
| m2 | L10 | `cdn.jsdelivr.net/npm/chart.js` is **unpinned** (always the latest version), so a future major release could break the charts. |
| m3 | L540–547 | `setAnswer` uses the implicit global `event`, which is deprecated. Pass the event explicitly. |
| m4 | L488 | Grammar: "Strict load/store model require adjusting" should be "requires". |
| m5 | salary chart | "Min/Max US base" for a *language* makes no sense; salary belongs to the *role* (review 01, M9). |

## 4. Suggested fixes (for a later pass)

1. Replace the quiz with questions that aren't about the answer: prior C experience, hours per week, owned CPU (x86/ARM), end goal (job, hobby, curiosity), and preference for building versus analysing. Randomise the option order, and require all answers before showing a result.
2. Delete the salary and radar charts, or source every number and label the radar as "author's opinion".
3. Add source footnotes, or link each panel to its segment in `segments/`.
