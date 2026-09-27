---
target: ../segments/assembly_vs_fortran_learning_advisor.html
derived_from: ../segments/Assembly-Fortran-Comparison.md (see review 01)
segments: ../segments/assembly-vs-fortran-learning-advisor/
pass: 1 (adversarial, desk review)
date: 2026-09-27
---

# Adversarial review: "Assembly vs. Modern Fortran: Strategic Learning Advisor" (HTML)

This page is an interactive summary of report 01. Thus **every content finding in review 01 applies here too**. This review covers only what the page *adds or changes*: the quiz logic, the charts, drift from the source, and delivery.

## 1. Goals and objectives

1. Give a personalised recommendation through a 4-question quiz.
2. Show the 12-week roadmap, pedagogical yield, the market and ecosystem, and the ISA choice at a glance.
3. Send the user to a starting toolchain (the Compiler Explorer and fortran-lang links).

## 2. Verdict (pass 1)

| Objective | Met? | Why |
|---|---|---|
| 1. Personalised recommendation | **No** | The quiz is tautological and leading. It gives a verdict after one answer (C1, C2). |
| 2. At-a-glance summary | **Partly** | It condenses report 01 correctly, but the charts **misstate or invent numbers** (C3, C4). It also drops every citation. |
| 3. Starting point | **Yes** | The links are relevant. |

## 3. Findings

### Critical

| # | Location | Problem | Tag |
|---|---|---|---|
| C1 | Quiz, L176–268; logic L551–593 | **The quiz is tautological.** All four questions ask the same thing ("Assembly-flavoured or Fortran-flavoured?"). Option **A is always Assembly, B always Fortran**. As a result, answer-position bias pushes the user toward Assembly. No question measures an independent factor, such as prior languages, available time per week, owned hardware, or career stage. The output is an "affinity score" that only repeats the choices of the user. | [DOC] |
| C2 | L553 | The code calculates `answeredCount` but **never uses it**. After **one** click, the result panel shows `"Recommended Choice: Assembly Language — 100%"`. But the placeholder says "Select all options above". | [DOC] (code) |
| C3 | L684–696 vs report L144 | **The salary chart contradicts its source.** The chart shows the Assembly maximum as **$180k**. But report 01 says that senior defense positions go above **$200k** (image5). The chart keeps the Fortran maximum ($245k). Thus the chart *visually* favours Fortran more than the source does. The minimums (112k, 105k) come from the broken, truncated ranges in report 01 (review 01, C1). | [DOC] |
| C4 | L730–756 | The **"Developer Experience & Toolchain Friction Score"** radar chart uses invented numbers (Assembly 20/40/15/10/10/30 vs Fortran 85/80/75/90/85/80). The chart has no method and no source. But the section title is "**Quantitative analysis**". | [DOC] |

### Major

| # | Location | Problem | Tag |
|---|---|---|---|
| M1 | L635 | The roadmap for weeks 9 to 12 adds "**Deploying parallel PDE solvers on HPC clusters**". This item is not in the source report. It goes past the milestone of the report, which is already optimistic. The page does not cover cluster access, schedulers, or MPI. | [DOC] drift |
| M2 | L627 | The roadmap adds "control-flow hijacking concepts" (exploit development), which is not in the source. This is a change of scope, because exploitation is a separate discipline. | [DOC] drift |
| M3 | L590 | The tie-break text adds new criteria ("Assembly if your main language is C/Rust, Fortran if in STEM"). The quiz never asks about these criteria. They are the *right* questions, and the quiz must include them. | [DOC] |
| M4 | whole page | **No citations or data provenance.** The footer says "Based on the Comparative Strategic Analysis". But a reader cannot trace any number to a source. | [DOC] |

### Minor / technical

| # | Location | Issue |
|---|---|---|
| m1 | L8 | `cdn.tailwindcss.com` is the Tailwind **development-only** Play CDN, which is not for production. It needs a network connection and does not work offline. |
| m2 | L10 | `cdn.jsdelivr.net/npm/chart.js` is **unpinned** (always the latest version). Thus a future major release can break the charts. |
| m3 | L540–547 | `setAnswer` uses the implicit global `event`, which is deprecated. Give the event to the function explicitly. |
| m4 | L488 | Grammar: "Strict load/store model require adjusting" must be "requires". |
| m5 | salary chart | "Min/Max US base" for a *language* makes no sense. Salary belongs to the *role* (review 01, M9). |

## 4. Suggested fixes (for a later pass)

1. Replace the quiz with questions that do not point to the answer. Ask about prior C experience, hours per week, owned CPU (x86/ARM), and end goal (job, hobby, curiosity). Also ask about the preference for building or analysing. Randomise the option order. Require all answers before the page shows a result.
2. Delete the salary and radar charts. Or give a source for every number, and label the radar as "author's opinion".
3. Add source footnotes, or link each panel to its segment in `segments/`.
