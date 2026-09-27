# Adversarial review, pass 1: summary across the four documents

**Date:** 2026-09-27
**Method:** I read all four documents in full, including the embedded salary images and the page scripts. I ran a rough automated count of which listed sources are actually cited. The findings come from internal consistency checks and domain knowledge. **No cited sources were fetched in this pass.** Items tagged [VERIFY] are queued for pass 2.

## How the four documents relate

| Report (Markdown) | Interactive page (HTML) | Question it answers |
|---|---|---|
| 01 `Assembly-Fortran-Comparison.md` | 03 `assembly_vs_fortran_learning_advisor.html` | Which language to learn in 90 days for **career and skills**? |
| 02 `Assembly-Versus-Fortran-Comparison.md` | 04 `retro_game_dev_language_advisor.html` | Which language to learn in 90 days to **build an 80s/90s-constrained game**? |

## Scorecard

| Document | Goal met? | Confidence | Critical | Major | Headline problem |
|---|---|---|---|---|---|
| 01 Career report | Partly | Medium-low | 3 | 9 | Broken salary data; a LANL claim cited to a Freelancer page; milestones not like-for-like |
| 02 Retro game report | **No** | Low | 5 | 10 | The Fortran advantages it claims (array syntax, SIMD, fast floating point) don't exist on 80s/90s DOS; history contradicts the genre mapping |
| 03 Career advisor page | No (quiz) / Partly (summary) | Low | 4 | 4 | The quiz is tautological and gives a verdict after one click; the salary chart contradicts its own source; invented radar scores |
| 04 Retro advisor page | No | Low | 5 | 5 | Fixed- and free-form FORTRAN 77 are mixed up; impossible "locked 60 fps" claims; invented genre and CPU charts |

## Problems that run across documents

1. **Weak sourcing throughout.**
   - Report 01 cites only about 28 of its 56 listed sources.
   - Report 02 cites only about 10 of 27, and **42 of its ~81 citations point to one Reddit thread**.
   - Report 02's bibliography appears to be **copied from report 01**: it includes malware-salary and Freelancer pages that have nothing to do with retro games.
   - The most-cited sources are listicles, Quora, Reddit, Medium and job-board pages.
2. **Citations don't match their sentences.** Numbers are attached to claims the source can't support. For example, the LANL study is cited to a hiring page, and assembler error behaviour is cited to an LFortran blog post. Pass 2 should check every high-stakes sentence against its citation.
3. **Invented "quantitative" visuals.** Both HTML pages present made-up radar and bar scores as analytics. Where a number has a source (salary), the chart changes it.
4. **Built-in bias in the quizzes.** Both quizzes put Assembly as option A every time and show a 100% verdict after one answer (the `answeredCount` variable is computed but never used). Neither asks about the user's baseline (prior C experience, hours per week, hardware, goal).
5. **False dichotomy.** Neither report seriously considers **C**, which gives most of Assembly's literacy benefits, was the dominant early-90s PC game language, and is the realistic bridge to both targets.
6. **The two reports reach opposite conclusions.**
   - Report 01 leans toward **Fortran** ("highest probability of shipping").
   - Report 02 ends on **Assembly** ("the essential foundation"), overriding its own decision tree.
   
   The user's real goal (career? retro game? curiosity?) decides which report is relevant. Neither report asks.
7. **Overclaimed 90-day outcomes.** "Production-ready PDE solver", "HPC cluster deployment" and "locked 60/70 fps bare-metal raycaster" are all unsupported for a learner starting from scratch.

## What holds up

- Report 01's framing, Assembly = *reading literacy* versus Fortran = *numerical delivery*, is broadly reasonable.
- Report 01's ISA section (x86-64 for RE, AArch64 for Apple/cloud, RISC-V for teaching) is broadly accurate.
- Report 02's input-latency section (hooking INT 09h instead of polling INT 16h) is correct.
- The toolchain lists (NASM, GDB, Ghidra, Compiler Explorer; gfortran, fpm, fortls; OpenWatcom, DOSBox-X, 86Box) name real, appropriate tools.

## Pass-2 plan

1. Fetch and check the high-stakes citations: the LANL Fortran report, coarrays/OpenCoarrays, LFortran status, the Microsoft FORTRAN graphics library, and the implementation language of Elite, Frontier and M.U.L.E.
2. Go through the per-segment worksheets in `../segments/` and fill in the claims tables from these reviews.
3. Decide with the user: **which goal is primary** (career or retro game), so the surviving document can be revised against that goal.

## Files

- `01-Assembly-Fortran-Comparison.review.md`
- `02-Assembly-Versus-Fortran-Comparison.review.md`
- `03-assembly_vs_fortran_learning_advisor.review.md`
- `04-retro_game_dev_language_advisor.review.md`
