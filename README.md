# 000-111-learn: two languages, one alphabet

This project learns two computer languages as real languages, with words, grammar and sentences:

- **A side: Assembly.** The first language of the machine.
- **B side: Fortran.** The language that speaks maths.

The owner is not a developer. The starting point is one skill: reading English. The final project is a small retro game that you can play in a web browser.

- **Website:** https://kairin.github.io/000-111-learn/
- **Start here:** [learn/start-here.md](learn/start-here.md)
- **Plan:** [review/plan/PLAN.md](review/plan/PLAN.md)
- **Decisions:** [review/plan/DECISIONS.md](review/plan/DECISIONS.md)
- **Session records:** [review/plan/sessions/](review/plan/sessions/)

## Folders

| Folder | Content |
|---|---|
| `learn/` | The learning content: the A-side and B-side pages, the seven segments, the parts of speech, and the two dictionaries |
| `review/` | Background research: four AI-written guides, their parts, the review and its findings, and the plan |
| `game/` | The game: 8086 Assembly (A side) and the Fortran laboratory (B side), with the build and the check |
| `site/` | The website (Astro with Starlight). It reads `learn/`, `review/` and the game build. |
| `.github/workflows/` | GitHub Actions builds and publishes the website after each push |

## Writing rule

All documents use ASD-STE100 Simplified Technical English. Short sentences, active verbs and one name for one thing make the text easy to read. The rules and the checker are in the separate ASD-STE100 project.
