# 000-111-learn: two languages, one alphabet

<!-- key-information:start -->
## Key information

- **Goal:** Write very small, fast programs that run close to the hardware.
- **Objective:** Learn Assembly and Fortran as real languages, through small game tutorials.
- **Tier:** `111`. Learning. Practice and learning projects. They follow the core rules.
- **Needs:** The core rules, especially the STE writing rules. Later, the knowledge database of 000-0-tables.
- **Gives:** Tutorials and a small retro game on its website.
- **On a new computer:** set it up after the six core folders.

This folder is part of the `~/Apps` SOP (Standard Operating Procedure). The
number in the name of each folder is its tier. The SOP map is at
<https://claude.ai/artifact/W1ajTT5RGF5ZmKuJ4cRAwa>. It is a private claude.ai page. Log in to open it, and then select
the **learn** tab.

| Folder | Tier | Goal | GitHub |
|---|---|---|---|
| `000-0-dotfiles` | 0 | Every computer works the same way | [000-dotfiles](https://github.com/kairin/000-dotfiles) |
| `000-0-ASD-STE100` | 0 | Every document is clear to a reader who is not a developer | [ASD-STE100](https://github.com/kairin/ASD-STE100) |
| `000-0-password` | 0 | No key gets to a program that does not need it | [000-0-password](https://github.com/kairin/000-0-password) |
| `000-0-ai` | 0 | AI tools work the same way on every computer and follow the SOP | [000-0-ai](https://github.com/kairin/000-0-ai) |
| `000-0-workspace` | 0 | All repositories in `~/Apps` stay healthy and consistent | [000-0-workspace](https://github.com/kairin/000-0-workspace) |
| `000-0-tables` | 0 | You never research the same database question twice, and what you know links across repositories | [000-tables](https://github.com/kairin/000-tables) |
| **000-111-learn** | 111 | Write very small, fast programs that run close to the hardware | [000-111-learn](https://github.com/kairin/000-111-learn) |
<!-- key-information:end -->

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
