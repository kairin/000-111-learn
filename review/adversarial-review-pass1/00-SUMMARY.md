# Adversarial review, pass 1: summary of the four documents

This project is about learning two languages: Assembly (the A side, the native language of the machine) and Fortran (the B side, the language of mathematics). The four Gemini documents and this adversarial review are background research. Their job is to show areas that the owner did not think about.

**Date:** 2026-09-27
**Method:** I read all four documents in full, with the embedded salary images and the page scripts. I ran a rough automated count to find which listed sources the documents actually cite. The findings come from internal consistency checks and domain knowledge. **I did not fetch any cited sources in this pass.** Items with the tag [VERIFY] wait in the queue for pass 2.

## How the four documents relate

| Report (Markdown) | Interactive page (HTML) | Question it answers |
|---|---|---|
| 01 `Assembly-Fortran-Comparison.md` | 03 `assembly_vs_fortran_learning_advisor.html` | Which language to learn in 90 days for **career and skills**? |
| 02 `Assembly-Versus-Fortran-Comparison.md` | 04 `retro_game_dev_language_advisor.html` | Which language to learn in 90 days to **build an 80s/90s-constrained game**? |

## Scorecard

| Document | Goal met? | Confidence | Critical | Major | Headline problem |
|---|---|---|---|---|---|
| 01 Career report | Partly | Medium-low | 3 | 9 | Broken salary data. A LANL claim cites a Freelancer page. The milestones do not compare like with like. |
| 02 Retro game report | **No** | Low | 5 | 10 | It claims Fortran advantages: array syntax, SIMD, fast floating point. These do not exist on 80s/90s DOS. The history contradicts the genre mapping. |
| 03 Career advisor page | No (quiz) / Partly (summary) | Low | 4 | 4 | The quiz is tautological. It gives a verdict after one click. The salary chart contradicts its own source. It invents radar scores. |
| 04 Retro advisor page | No | Low | 5 | 5 | It confuses fixed-form and free-form FORTRAN 77. It makes impossible "locked 60 fps" claims. It invents genre and CPU charts. |

## Problems that run across documents

1. **Weak sourcing in all documents.**
   - Report 01 cites only about 28 of its 56 listed sources.
   - Report 02 cites only about 10 of 27. Also, **42 of its ~81 citations point to one Reddit thread**.
   - Report 02 appears to **copy its bibliography from report 01**. It includes malware-salary and Freelancer pages that have no relation to retro games.
   - The most-cited sources are listicles, Quora, Reddit, Medium and job-board pages.
2. **Citations do not match their sentences.** The documents attach numbers to claims that the source cannot support. For example, the citation for the LANL study is a hiring page. The citation for assembler error behavior is an LFortran blog post. Pass 2 should compare every high-stakes sentence with its citation.
3. **Invented "quantitative" visuals.** The two HTML pages show made-up radar and bar scores as analytics. Where a number has a source (salary), the chart changes it.
4. **Built-in bias in the quizzes.** The two quizzes put Assembly as option A every time. They show a 100% verdict after one answer. The code computes the `answeredCount` variable but never uses it. Neither quiz asks about the baseline of the user (prior C experience, hours per week, hardware, goal).
5. **False dichotomy.** Neither report seriously considers **C**. C gives most of the literacy benefits of Assembly. It was the dominant language for early-90s PC games. It is also the realistic bridge to the two targets.
6. **The two reports reach opposite conclusions.**
   - Report 01 leans toward **Fortran** ("highest probability of shipping").
   - Report 02 ends on **Assembly** ("the essential foundation"). This overrides its own decision tree.

   The real goal of the user (career? retro game? curiosity?) decides which report is relevant. Neither report asks.
7. **Overclaimed 90-day outcomes.** The reports claim a "Production-ready PDE solver", "HPC cluster deployment" and a "locked 60/70 fps bare-metal raycaster". None of these has support for a learner who starts from scratch.

## What holds up

- The framing of report 01, Assembly = *reading literacy* versus Fortran = *numerical delivery*, is broadly reasonable.
- The ISA section of report 01 (x86-64 for RE, AArch64 for Apple/cloud, RISC-V for teaching) is broadly accurate.
- The input-latency section of report 02 (hook INT 09h, do not poll INT 16h) is correct.
- The toolchain lists (NASM, GDB, Ghidra, Compiler Explorer, gfortran, fpm, fortls, OpenWatcom, DOSBox-X, 86Box) name real, appropriate tools.

## Pass-2 plan

1. Fetch and check the high-stakes citations. These are the LANL Fortran report, coarrays/OpenCoarrays, LFortran status and the Microsoft FORTRAN graphics library. Also check the implementation language of Elite, Frontier and M.U.L.E.
2. Use these reviews to complete the claims tables in the per-segment worksheets in `../segments/`.
3. Decide with the user **which goal is primary** (career or retro game). Then revise the surviving document against that goal.

## Files

- `01-Assembly-Fortran-Comparison.review.md`
- `02-Assembly-Versus-Fortran-Comparison.review.md`
- `03-assembly_vs_fortran_learning_advisor.review.md`
- `04-retro_game_dev_language_advisor.review.md`
