---
name: ste-writing
description: Rewrite prose (docs, READMEs, PR descriptions, error messages, release notes, comments, tool descriptions, system prompts — never code) into ASD-STE100 Simplified Technical English to remove "AI slop". Use when asked to make writing not sound like AI, make docs clear or plain, enforce a controlled writing style, review text for STE violations, or write technical documentation that reads human. Two modes — strict (procedures/safety) and STE-flavored (general prose).
metadata:
  spec: ASD-STE100 Issue 9 (January 2025)
---

# ste-writing

Write prose in ASD-STE100 Simplified Technical English (Issue 9: 53 rules in 9 sections, 875 approved words). This applies to documentation, READMEs, pull-request text, error messages, release notes, comments, tool descriptions, system prompts, and agent-to-agent messages. It does not apply to code, identifiers, or command syntax. It is not for marketing copy, essays, or anything that needs a voice — STE strips voice on purpose.

Three ways to use it:

- **write** — produce new text in STE.
- **rewrite** — convert existing text to STE. Keep every fact.
- **review** — do not rewrite. Output a table (`Rule | Original | Simplified`), one row per violation, then one line on anything you left alone and why.

## Rules

Six slop habits and the rule that stops each one:

- Synonym rotation: rule 1.11, one name for one thing.
- Hedging stacks: rule 3.4, no stacked auxiliaries.
- Nominalization: rule 3.7, use a verb for an action.
- Marketing adjectives: the controlled dictionary.
- Run-on sentences: rules 5.1 and 6.3, the length caps.
- Phrasal verbs: rule 9.3, no phrasal verbs.

When a case is not on this list, find its habit. Apply the rule that stops that habit.

Numbers in parentheses are rule numbers in ASD-STE100 Issue 9.

WORDS
- Use one name for one thing (1.11, 9.4). Do not rotate check / verify / validate / confirm for the same action — pick one and reuse it. Certified STE uses "make sure" or "examine".
- Use the short common word: start (not begin/commence/initiate), use (not utilize/leverage), help (not facilitate), make sure (not ensure/verify), do (not perform/conduct), give or supply (not provide), before (not prior to), after (not subsequent to), about (not regarding/concerning), get (not obtain/acquire), show (not demonstrate), also (not additionally/furthermore/moreover).
- Give each word one meaning (1.3). "fall" means to move down, not to decrease.
- No marketing adjectives: seamless, robust, powerful, cutting-edge, effortless, world-class, next-generation, revolutionary, streamlined. Test any other word this way: if you cannot measure or test the praise, delete it.
- American spelling (1.14).

VERBS
- Active voice. "the parser reads the file", not "the file is read by the parser". Procedures: always. Descriptive text: passive is permitted only when the actor is unknown or irrelevant (3.6).
- A past participle used as an adjective is not passive and is correct (3.3): "the valve is closed", "the field is required".
- Only simple tenses (3.2): infinitive, imperative, simple present, simple past, simple future. No present perfect: "we received the report", never "we have received the report".
- No stacked auxiliaries (3.4) and no hedge phrase: "it is important to note", "it should be noted", "it is worth noting", "please note that", "as mentioned", "as noted above", "worth stating plainly", "crucial to understand". Write "this improves X", not "it is important to note that this may help to improve".
- Use a verb for an action (3.7): "analyze the log", not "perform an analysis of the log". Watch a noun that ends in -tion, -ment, -ance, or -ence before "of": change "the completion of the task" to "complete the task".
- No "-ing" main verb where a simple tense works (3.5).
- No phrasal verbs (9.3): spin up, dive into, kick off, roll out, look into.

SENTENCES
- One instruction per sentence, unless two actions happen at the same time (5.2). Max 20 words (instruction, 5.1), max 25 (descriptive, 6.3). Note: the checker in this skill flags any sentence over 20 words in both modes. It is stricter than the 25-word descriptive cap.
- When a condition comes before its command, divide them with a comma (5.4): "If the test fails, read the log."
- Do not drop words to compress (4.2): "Remove the bolts from the panel", never "Remove bolts from panel". No contractions.
- When applicable, use an article (a, an, the) or a demonstrative adjective (this, these) before a noun (4.5) — the standard's qualifier included. Do not add articles to general statements or abstract concepts ("Solvents can cause damage to paint"). In a series of items, the article before the first noun is enough.
- Connect related sentences with plain connectors — then, but, thus, as a result (4.4). STE is short sentences, not disconnected ones.

NOUNS
- Multi-word nouns have at most three words (2.1). Unpack "the agent task queue priority handler" into "the handler that sets task-queue priority", or hyphenate.
- Define an abbreviation at first use, then use the abbreviation.

PUNCTUATION
- No semicolons (8.1). Write two sentences.
- No em dash. This skill adds that rule. ASD-STE100 itself does not ban the em dash. Use a period, or a connector such as "then", "but", "thus", "as a result" (4.4).

STRUCTURE
- One topic per paragraph (6.5), max six sentences (6.6). For steps, use a numbered vertical list, one action per item, imperative form. Put a condition before its command.
- A list item can be a label, not a sentence (a flow list, a changelog line, a feature bullet). Keep a label in its short form ("Frontend receives session JWT"). Do not expand a label into a sentence only to give it an article.
- Safety text (strict mode): WARNING = risk of injury, CAUTION = risk of damage, NOTE = information only, never an instruction (7.1, 5.5). Start with the command or condition, then give the risk (7.2, 7.3). Put it directly before the step it protects, not at the top of the procedure.

## Guards

- Never drop a fact, number, condition, or scope qualifier to satisfy a length cap. Keep the longer sentence and flag it.
- Preserve code identifiers, part numbers, units, error strings, and safety wording exactly.
- Change the smallest span that fixes a violation. Do not restyle text a rule does not touch.
- If the input already complies, return it unchanged and say so.
- Write only the requested text. No preamble, no summary, no closing remarks.

## Modes

- **strict** — procedures, runbooks, safety text, error messages: apply every rule and both length caps, plus the strict word set: but (not however), because (not since, for causes), can (not may), must (not should/shall), use or with (not using), obey (not follow, for instructions), push (not press, for physical controls). The spec's own list of the 39 most frequent writer errors is in [ste-recurring-errors.md](ste-recurring-errors.md).
- **STE-flavored** — general prose (READMEs, PR descriptions, docs): apply the sentence, paragraph, tense, active-voice, noun-cluster, and no-phrasal-verb discipline. Relax the dictionary lockdown and the strict word set so the text keeps enough range to read naturally.

## Verify

If you can run commands, lint the draft with the script that ships next to this skill:

```
uv run ste-lint.py draft.md            # flavored target: under 2.5 per 100 words
uv run ste-lint.py --strict draft.md   # strict target: under 1.5 per 100 words
```

Fix the reported categories and lint again — at most two passes. Report the final score with the text. Do not present text as clean without a lint run.

If you cannot run commands, use this checklist:

1. Any instruction over 20 words, or any other sentence over 25? Split it.
2. Any semicolon? Replace with a period.
3. Any contraction? Expand it.
4. Any present perfect ("has/have received") or modal stack? Use a simple tense.
5. Any passive voice with a known actor? Make it active.
6. Any "-ing" main verb, nominalization ("perform an analysis"), or phrasal verb ("spin up")? Replace with a plain verb.
7. Any multi-word noun of four or more words? Unpack it.
8. Any dropped article ("Remove bolts from panel")? Restore it.
9. Same thing named two ways? Pick one name.
10. Any label expanded into a sentence only to add an article? Make it a label again.

## Scope

The mechanical rules above are lintable and are what removes slop. Full STE also needs human judgment (the right technical noun, whether a sentence "makes good sense") — a checker cannot certify that, and slop is not about that. This skill fixes the FORM of slop. It cannot make a hollow paragraph true.

The checker is an anti-slop denylist. A lint pass is not ASD-STE100 Issue 9 conformance. The checker does not load the approved dictionary.

The full standard is free at https://asd-ste100.org (do not paste it in full; it is copyrighted). This skill is unofficial and not affiliated with ASD. ASD-STE100 is a registered EU trademark (No. 017966390).
