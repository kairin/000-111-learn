# Adversarial review, pass 1: summary of the three SNES video guides

The owner gave one YouTube video to two AI tools. The video is "It Took Every SNES Hardware Trick To Make My Game" by [Inkbox](https://www.youtube.com/watch?v=j_2bo7ng65E) (51:14). Inkbox finishes a game for the Super Nintendo in pure assembly. The tools wrote two reports and one interactive page. This review checks the three documents against the captions of the video. The purpose is the same as in the two earlier reviews: to show errors and areas that the owner did not think about. The learning of the two languages stays the primary goal.

**Method.** Three reviewers read one document each, with its document parts and the English captions of the video. Each finding has a line location and an evidence tag. The tag **[VIDEO]** means that the reviewer checked the claim against the captions, with a timestamp. The captions stay on the computer of the owner (decision D25). The reviews quote no more than 10 words from the video at one time. The reviewers also fetched a few web pages: the itch.io page of the game, the GitHub repository of the sound engine, the two news articles that the documents cite, and the SNESdev wiki. Their findings say so. A fourth pass consolidated the three reviews into learning units and challenged each unit (section 6).

## The documents and their video

| # | Document | Type | Made from | Document parts |
|---|---|---|---|---|
| 13 | deep-research-report | Report. It says that it could not get the captions, so it works from a news article | none | 11 |
| 14 | Video_Breakdown_and_Concepts | Report. It gives nine "stages" of the video | none | 25 |
| 15 | snes_hardware_breakdown | Interactive page. Four simulators, three charts, a matrix | 14 | 5 |

Each document part on the website shows the video. If the reviewer found the idea in the video, the link opens the video at that moment. 34 of the 41 new document parts have a moment. The other 7 parts say that the video does not cover the idea.

## Scorecard

| # | Goal met? | Confidence | Critical | Major | Minor | Headline |
|---|---|---|---|---|---|---|
| 13 | Partly | Medium-low | 3 | 11 | 12 | The hardware facts hold up, but the segment map puts the audio section 28 minutes late, and the two headline corrections correct a news article, not the video. |
| 14 | No | Low | 6 | 10 | 11 | The report reverses the sprite fix, the sound design and the parallax, invents a wrong address formula, and cites a news article for the video. |
| 15 | No | Low | 5 | 13 | 9 | The simulators teach designs that the developer rejected, the address calculator halves every address, and every chart number is invented. |

In total: 80 findings (14 critical, 34 major, 32 minor). The findings data is `../findings/pass1-snes-video-guides.json`.

## Problems that repeat in the three documents

1. **The documents say the opposite of the video.** The video says that transparent sprites on tile zero still count toward the limit of 32 sprites per line (28:34), so the fix moves them off the screen. Documents 14 and 15 give tile zero as the fix. The video says that five voices play music and three voices wait for sound effects (18:18). Documents 14 and 15 say that effects steal music voices, and the page has a simulator for the stolen voices. The developer names the registers that rotate sprite priority and then says that he leaves it as is (30:21). The documents give the rotation as his fix.
2. **The documents put the facts in the wrong place.** Document 13 puts the audio section at 36:15. It starts at 08:40. Documents 14 and 15 put the parallax in the game world on layer 3. The video puts it on the title screen, on layer 2 (34:28).
3. **The documents invent numbers and formulas.** The tile address formula of documents 14 and 15 joins two shifts with OR. The shifts must be added: for Y = 3, (3 << 7) OR (3 << 6) is 448, but 3 x 192 is 576. The page also uses one byte for each tile. The video says that 192 x 168 tiles fill 63 K (06:53), so each tile takes two bytes. The cycle counts of the charts (320, 480, 14, 12) and the band lines of the HDMA slider are in no source.
4. **The documents deny hardware that exists.** Documents 14 and 15 say that the CPU has no hardware multiply or divide. The 5A22 has both, at the registers $4202 to $4206. The video says only that packed decimal makes the maths easier (31:44).
5. **The documents invent a hardware test.** Documents 14 and 15 describe cartridges tested on retail consoles, boot-clearing loops and emulator differences. The video shows resin shells and solder paste (45:36 to 46:18). The cartridge is not finished at the end of the video (46:55).
6. **The citations do not point at the video.** Document 14 cites a news article (techeblog) for almost every sentence and the video only three times. Document 13 cites a copy of the same article on a different site. Document 15 has no citations. The 107 `citeturn` markers of document 13 are generation artifacts.
7. **The simulators do not compute what they say.** The BCD counter of page 15 adds a decimal string and clamps at 9999. A real packed decimal counter wraps to 0000 with a carry. The page also repeats the delivery faults of the earlier pages: the development version of Tailwind from a CDN, Chart.js with no version, raw asterisks on the screen, and weak keyboard and screen-reader support.

## What holds up

- The hardware rows of document 13 are correct: the 65C816, the three memories (128 K for the CPU, 64 K for the PPU, 64 K for the APU), the SPC700 at 1.024 MHz, eight voices, BRR blocks of nine bytes, 128 sprites and 544 bytes of OAM.
- Document 13 is honest. It says what it could not get, invents no quotation, and marks each timestamp as an estimate.
- The split 192 = 128 + 64 is correct arithmetic, and the idea of a table lookup for collision is in the video (05:50, 06:11).
- The packed decimal counter with the decimal flag, where INC and DEC ignore the flag (32:05), is a true fact of the video. Document 13 reports it, and document 14 omits the trap.
- The credits are mostly right: Mouse Bite Labs for the open-source cartridge design (45:58) and Dr. Matt for the music (19:07).

## What this means for the learning journey

The SNES is a different country. Its processor (65C816) and its sound processor (SPC700) are two dialects that this project does not learn. The game of this project is 8086 Assembly on DOS with VGA Mode 13h, and modern Fortran is the laboratory (decision D19). The VGA has no sprites, no HDMA, no color math and no windows. Thus, the video is a source of ideas, not of words. Each idea stays only if it serves the 8086 lander or the Fortran laboratory.

The consolidation found eleven candidate units and six Fortran ideas. The concept review kept eight units, merged three, and dropped three. The dropped ideas: sound from samples (the PC speaker plays one square wave), a maze with a flood-fill check (the lander has no maze), and the idea "read the source, not the summary" as a language unit (it is a review rule, and it stays in this summary).

## The eight learning units and where they live

Each unit lives on an existing segment page of the site, as a new strength or limit, with "Watch out" notes from these reviews. No new page and no SNES page. The plan weeks are the weeks of the 12-week course (PLAN.md, Phase 6).

| # | Unit | Segment page | Weeks | Why there |
|---|---|---|---|---|
| U1 | Budget first: one frame at 70 Hz is about 68,000 cycles on a 4.77 MHz 8086 | Controlling the hardware (A) | 1 to 2 | The frame budget is a hardware limit. The page already has the vertical retrace example. |
| U2 | Look it up: the sine table, the row-start table, the terrain height | Doing arithmetic (A), Working with many values (A) | 3 to 8 | A table replaces a slow verb (arithmetic). The terrain table replaces a search (many values). |
| U3 | Digits on the screen: ADD and DAA on the A side, I4.4 and I0 on the B side | Showing text and reading keys (A and B), Doing arithmetic (A) | 3 to 4 | The "talk" page said "no number formatting". The decimal counter is the smallest answer. |
| U4 | The table is the contract: size, byte order, kind, rounding rule, and a wrong twin for each table | Organizing a program (A and B) | 1 to 2 | The format is an agreement between two programs. That is organization. |
| U5 | What you cannot see still costs: REP MOVSW copies every byte | Working with many values (A) | 5 to 8 | The page praises REP. The limit belongs next to the praise. |
| U6 | Segment:offset is not bank:offset | Keeping values (A) | 1 to 2 | The four segment registers are already on this page. |
| U7 | The beam and the ports: Mode X pages, the line compare, the PIT note protocol | Controlling the hardware (A and B) | 7 to 10 | Ports and the retrace are already on this page. The B side makes the note table. |
| U8 | Wrap for free, or say MODULO | Doing arithmetic (A and B) | 3 to 4 | A true, small difference between the two languages, in the arithmetic of the quarter turn. |

The "Watch out" notes that these units use: D13-M4 (the data bank register is the SNES parallel of the segment registers), D14-C3 (the OR formula is wrong), D14-M3 (the CPU has division, and INC ignores the decimal flag), D14-C2 and D14-M9 (transparent sprites still count, and the sliver rule), D15-C4 (invented chart numbers: no chart without a measured file), D13-M11 and D15-M7 (the real decimal counter and the fake one), D15-C3 and D14-M5 (what HDMA is, and the eight port registers).

## The Fortran side: what the review adds to the laboratory

The laboratory pattern stays the same: a Fortran program makes a table or checks a file from DOSBox, and a program with one wrong word must fail the check. The review adds three planned tests and one rule (PLAN.md, Phase 4d):

- **Test 4, the decimal counter.** The A side counts from 0000 to 9999 with ADD, ADC and DAA, and writes each value. The B side checks all 10,000 values against MOD and ISHFT. The wrong twin has no DAA, and the check must find 9,990 wrong values.
- **Test 5, the row-start table.** The B side writes 200 row starts (y x 320) as 16-bit words. The A side compares MUL, the two shifts and the table lookup for all 200 rows.
- **Test 6, the terrain.** The B side makes 320 ground heights with one flat landing pad and checks them: inside the screen, pad flat, pad wide enough. The wrong twin has no pad.
- **The note table.** The B side writes one PIT divisor for each semitone and reports the error in cents. An octave up is the divisor divided by two.
- **The rule.** When a routine has few inputs, the check runs all of them. Each table gets a wrong twin.

The review also found that the dictionaries lag the laboratory code. The lab programs already use SHIFTA, IAND, MERGE, MODULO, ERROR STOP, NEWUNIT, ACCESS='STREAM', INT16, REAL64 and GET_COMMAND_ARGUMENT, and the A-side programs use XLAT, INCBIN and ADC. These words are now in the dictionaries, with DAA, DAS, AAM, SBB, CBW, CWD, BTEST, RANDOM_NUMBER and the two number formats.

## A review rule from this batch

Read the source, not the summary. The three documents reverse facts that the video states clearly, with a timestamp. A "Watch out" note from these documents must cite a timestamp, as decision D21 requires. Do not use the three documents as a timeline of the video.

## Pass-2 plan

- [ ] Watch the credit roll (47:35 to 50:10) for the Hornests credit (D13-M7, D14-m3).
- [ ] Open the game in an emulator and read the counter limit: 9999 or 10,000 (D14-M1, D15-M1).
- [ ] Confirm the register of the BG2 horizontal scroll ($210F) and the HDMA transfer mode on the SNESdev wiki (D14-C1, D15-C3).
- [ ] Confirm the hardware divider timing of the 5A22 (D14-M3, D15-C4).
- [ ] Confirm the V-blank length for the display mode of the game (D15-M8).
- [ ] Confirm the origin and the date of the two news articles (D13-M8, D13-m3).
- [ ] Record the results in `review/findings/status.json`.

## Files

- `13-deep-research-report.review.md`
- `14-Video_Breakdown_and_Concepts.review.md`
- `15-snes_hardware_breakdown.review.md`
- Findings data: `../findings/pass1-snes-video-guides.json`
- Video moments: `../findings/video-moments/deep-research-report.json`, `video-breakdown-and-concepts.json`, `snes-hardware-breakdown.json`
