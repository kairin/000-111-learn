# Next steps for 000-111-learn

**Status:** to do. Nothing on this page is done yet.
**Source:** the architecture review of 2026-10-07. The full plan is in
`000-0-workspace/docs/alignment-plan-2026-10-07.md`. The index of all
repositories is `000-0-workspace/docs/next-steps.md`.
**Task:** T07. **Work branch:** make a new branch from `main`, for example
`docs/rhel10-followup`, and open a new pull request. The branch names and
pull-request numbers inside the task text below were merged on 2026-10-07.
Do not reuse them.
**Depends on:** nothing. **Needs the owner (user-gated):** no.

When all the steps are done and verified, delete this file in the same pull request.

## The current plan (binding)

- RHEL 10.2 is the primary operating system: GNOME, Ptyxis, `dnf`, Podman, SELinux, bash.
- **bash is the only shell.** fish is retired (review decision N1). bash gets fish-like tools: `ble.sh`, `bash-completion`, `atuin`, `fzf`, `zoxide`, `starship` (amendment A1, below).
- EPEL 10 is required. It gives `pass`, `fzf`, `uv`, `ripgrep`, `podman-compose` and ShellCheck.
- `000-0-dotfiles` and `000-0-workspace` are documentation only. The other core repositories hold documents and product files only. They have no installer, no engine and no tests of removed code.
- Keys are in the `pass` store. A command gets a key only through `with-secret` (`000-0-password`). `~/.dotfiles/` and `~/Apps/.envrc` do not exist.
- One askpass helper: `~/.local/bin/askpass.sh` (zenity). `ksshaskpass` is not used.
- Do not keep a file only because it records the past. Git history keeps it.

## Review findings for this repository

**000-111-learn #12** (1 commit, MERGEABLE, CI passes)
- `game/dev.sh:19` `-v "$repo:/work:Z"` relabelled the whole repo including `.git` (verified `container_file_t`). Fix: T07 (mount `:z`, `restorecon -R`).
- `review/plan/DECISIONS.md:31` `/home/kkk/Apps/ASD-STE100`; `scripts/check-ste-docs.sh:10` needs `rg`. LN-1 open. Fix: T07.

## Task

**T07 — 000-111-learn** (`docs/rhel10-alignment`, PR #12)
Steps: 1. `game/dev.sh:19`: mount only the game folder: `-v "$repo/game:/work/game:z"` and set the container workdir accordingly (read `game/build.sh` to confirm the paths it uses; keep `docker.io/library/ubuntu:24.04`); run `restorecon -R "$HOME/Apps/000-111-learn"` and check `ls -dZ .git` shows `user_home_t`. 2. `review/plan/DECISIONS.md:31` → `/home/kkk/Apps/000-0-ASD-STE100`. 3. `scripts/check-ste-docs.sh:10`: `command -v rg || { echo "needs ripgrep (dnf install ripgrep, EPEL)"; exit 2; }`. 4. README key block: delete the folder table and the map-link sentence (LN-1). 5. `GITIGNORE-REVIEW.md`: "Update 2026-10-07: LN-1 fixed. Status: closed." 6. CHANGELOG if present.
Verification: `bash game/dev.sh` builds (Podman image present) and `ls -Z .git | grep -c container_file_t` → 0; CI `build` green.

## Shared text used by this task

**S9. Commit/PR rules for every worker.** Commit on the named branch only; `git push -u origin <branch>`; open the PR with `gh pr create` if none exists, else `gh pr edit --body` to append a "Follow-up 2026-10-07" section. Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; every PR body ends with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`. Never push to `main`, never merge. Docs in ASD-STE100 style: short sentences, active voice, one idea per sentence. Add a dated CHANGELOG entry where the repo has a CHANGELOG. In 000-0-ASD-STE100 never write the purge words.


## Amendment A1 (owner decision, 2026-10-07): bash with fish-like tools

The owner confirmed decision N1: **bash is the shell.** The owner also said:
"must install the relevant tools that makes bash functionally the same as
fish". This amendment replaces the "Rejected: … ble.sh …" sentence of N1.
Where this amendment and a task disagree, this amendment wins.

| fish feature | bash tool | Source on RHEL 10 |
|---|---|---|
| Suggestions from history while you type | `ble.sh` | Upstream release, user space (`~/.local/share/blesh`) |
| Syntax colours on the command line | `ble.sh` | Same |
| Tab completion with a menu | `bash-completion` + `ble.sh` | `bash-completion` is installed (BaseOS) |
| Abbreviations (`abbr`) | `ble-sabbrev` in `ble.sh` | Same |
| History search (`Ctrl+R`) | `atuin` | EPEL 10 (18.12) |
| File and folder pickers (`Ctrl+T`, `Alt+C`) | `fzf` | EPEL 10 |
| `z` to jump to folders | `zoxide` | Upstream, `~/.local/bin` |
| Prompt | `starship` | Upstream, `~/.local/bin` |
| Per-folder environment | `direnv` | Upstream, `~/.local/bin` |

**Install `ble.sh` (no root):**

```bash
tmp=$(mktemp -d)
curl -fsSL https://github.com/akinomyoga/ble.sh/releases/download/v0.4.0-devel3/ble-0.4.0-devel3.tar.xz | tar -xJf - -C "$tmp"
bash "$tmp/ble-0.4.0-devel3/ble.sh" --install ~/.local/share
rm -rf "$tmp"
```

Expect: `~/.local/share/blesh/ble.sh` exists. Check for a newer release first:
`gh release view --repo akinomyoga/ble.sh --json tagName --jq .tagName`.

**Install `atuin` and `fzf`** (after EPEL, owner runs): `sudo dnf install atuin fzf`.

**`~/.bashrc.d/` snippets: changes to S6.** RHEL's `~/.bashrc` sources
`~/.bashrc.d/*` in name order. `ble.sh` must load first and attach last:

- `01-blesh.sh`: `[[ $- == *i* && -f ~/.local/share/blesh/ble.sh ]] && source ~/.local/share/blesh/ble.sh --noattach`
- `40-fzf.sh` (changed): `if [[ $- == *i* ]] && command -v fzf >/dev/null 2>&1; then eval "$(fzf --bash)"; fi` — keep it; `atuin` takes `Ctrl+R` because it loads later.
- `50-atuin.sh`: `if [[ $- == *i* ]] && command -v atuin >/dev/null 2>&1; then eval "$(atuin init bash)"; fi`
- `60-abbr.sh`: `if [[ ${BLE_VERSION-} ]]; then ble-sabbrev g='git' gs='git status' gd='git diff' gc='git commit' gp='git push'; fi`
- `99-blesh-attach.sh`: `[[ ! ${BLE_VERSION-} ]] || ble-attach`

The other S6 files (`00-local-bin-path.sh`, `10-sudo-askpass.sh`,
`20-direnv.sh`, `30-starship.sh`, `45-zoxide.sh`) stay as they are. Total: ten
files.

**Expect** (new Ptyxis tab): grey suggestions appear while you type; the
command is coloured; `Ctrl+R` opens atuin; `z <name>` jumps; `g` + space
expands to `git`.

**Tasks that change because of A1:**
- **T01** (000-0-dotfiles): `configuration-reference.md` bash section has the
  ten snippets and the `ble.sh` install; `rhel-10-setup.md` tool table adds
  rows `ble.sh` (upstream) and `atuin` (EPEL), and `bash-completion`
  (installed); the README expect row says "ten files"; `decisions.md` records
  A1 with the fish-to-bash table above.
- **T02** (000-0-workspace): the site dotfiles page names the fish-like tools.
- **T26** (machine, user space): also install `ble.sh` and write the ten
  snippets.
- **T27** (owner, root): the `dnf install` line adds `atuin`.
