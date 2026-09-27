# B side: Fortran, the language that speaks maths

Fortran lets you write maths in a form that a machine can run. The name comes from FORmula TRANslation. A program called the compiler translates your formulas into the machine tongue.

## A long history, one language

Fortran started in 1957. It is one of the oldest languages that people still use. It changed over time, as English changed from the time of Shakespeare to today.

| Dialect | Year | What it added |
|---|---|---|
| FORTRAN 77 | 1978 | The form of old programs: fixed columns, capital letters |
| Fortran 90 | 1991 | Free-form text, arithmetic on full arrays, modules |
| Fortran 2008 | 2010 | Coarrays for parallel work, DO CONCURRENT |
| Fortran 2018 and 2023 | 2018, 2023 | More parallel features and more built-in procedures |

We learn modern Fortran (2008 to 2023). The old FORTRAN 77 dialect does not have many of the words on this site.

## The parts of speech on the B side

- **Verbs** are statements that do something. `PRINT` shows values. `CALL` runs a subroutine. `ALLOCATE` makes space for an array.
- **Nouns** are types of value. `INTEGER` is a whole number. `REAL` is a number with a decimal point. `CHARACTER` is text.
- **Adjectives** are attributes. They describe a noun. `PARAMETER` means "this value never changes". `ALLOCATABLE` means "the program sets the size when it runs".
- **Adverbs** change a verb. `CONCURRENT` in `DO CONCURRENT` tells the compiler that the steps can happen in any order.
- **Idioms** are built-in procedures: ready-made maths phrases. `SQRT` gives a square root. `SUM` adds a full list. `MATMUL` multiplies two tables of numbers.
- **Grammar marks** are the maths signs: `+ - * / **`. The `=` sign means "put the value on the right into the name on the left".
- **Notes to the translator** are structure words. `PROGRAM`, `MODULE` and `CONTAINS` give the compiler the structure of the text.

## The shape of one sentence

A line of Fortran looks like a line of maths:

```fortran
energy = 0.5 * mass * speed**2   ! kinetic energy
```

| Part | In the example | Meaning |
|---|---|---|
| Name | `energy` | The noun that gets the result |
| Assignment mark | `=` | Put the result into the name |
| Formula | `0.5 * mass * speed**2` | Maths, written almost as on paper |
| Comment | `! kinetic energy` | A note for people. The compiler ignores it. |

## What the B side says well

- You write formulas as maths.
- A full array is one noun. One line can do arithmetic on thousands of values.
- The compiler finds many mistakes before the program runs.
- The same text works on many different machines.

## What the B side cannot say easily

- Fortran has no words for the screen, the keyboard chip or sound.
- To control the hardware, Fortran needs help from C or from Assembly.

## Fortran has no reserved words

In most programming languages, a keyword cannot be a name. Fortran is different. It has no reserved words. You can name a variable `real` or `if`. This is legal, but it makes the text hard to read. Do not do it.

## The segments

Each segment below has a B page. Open a segment to see its strengths and its words.
