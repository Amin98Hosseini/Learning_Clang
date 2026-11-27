# Learning C

A progressive, hands-on C course kept as a single repository. The material is split into **40 numbered lesson folders**. Each folder is a small, self-contained program plus its own documentation (`Readme.md` and `Readme_Fa.md`), and the numbering follows the order the topics are meant to be studied in — from printing a line of text to structures, function pointers and enumerations.

Every lesson builds on the ones before it, so reading the folders in order gives a complete beginner-to-intermediate path through the language.

## Table of Contents

- [What is in this repository](#what-is-in-this-repository)
- [Requirements](#requirements)
- [Repository Layout](#repository-layout)
- [Building the Programs](#building-the-programs)
- [Running a Program](#running-a-program)
- [All 40 Lessons at a Glance](#all-40-lessons-at-a-glance)
- [Curriculum in Detail](#curriculum-in-detail)
  - [Part 1 — First Programs (1–4)](#part-1--first-programs-14)
  - [Part 2 — Decisions, Operators and Loops (5–11)](#part-2--decisions-operators-and-loops-511)
  - [Part 3 — Functions, Recursion and Mathematics (12–14)](#part-3--functions-recursion-and-mathematics-1214)
  - [Part 4 — Arrays, Data Analysis and Sorting (15–21)](#part-4--arrays-data-analysis-and-sorting-1521)
  - [Part 5 — Pointers (22–24)](#part-5--pointers-2224)
  - [Part 6 — Characters and Strings (25–37)](#part-6--characters-and-strings-2537)
  - [Part 7 — Structures and Enumerations (38–40)](#part-7--structures-and-enumerations-3840)
- [Documentation Inside Each Folder](#documentation-inside-each-folder)
- [Known Quirks and Intentionally Unpolished Code](#known-quirks-and-intentionally-unpolished-code)
- [License](#license)

## What is in this repository

- **40 lessons**, one folder each, named `<number>-<Topic>`.
- **One `main.c` per lesson** (the first lesson uses `helloworld.c`, the twenty-fifth uses the misspelled `mian.c`).
- **A `Readme.md` (English) and `Readme_Fa.md` (Persian) in every lesson folder**, explaining the concept, the code and the expected output.
- **Pre-built Windows binaries** (`*.exe`) next to the sources, produced by GCC from MinGW-w64.
- **A VS Code build task** that compiles the currently open file.

## Requirements

- A C compiler. The included VS Code task is configured for **GCC from MinGW-w64** at `C:\mingw64\bin\gcc.exe` (Windows). Any GCC or Clang works; only the path in the task needs changing.
- Optional: [Visual Studio Code](https://code.visualstudio.com/) with the [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools), for the provided build and debug configurations.

Check your compiler:

```bash
gcc --version
```

## Repository Layout

```text
Learning_Clang/
├── .vscode/
│   └── tasks.json          # Build the active .c file with gcc
├── 1-HelloWorld/
│   ├── helloworld.c
│   ├── helloworld.exe
│   ├── Readme.md
│   ├── Readme_Fa.md
│   └── .vscode/            # Per-folder build + gdb launch configs
│       ├── launch.json
│       └── tasks.json
├── 2-StringInPrint/
├── 3-GetInputUser/
├── ...
├── 40-Enumerations_enum_and_Arrays_Persian_Calendar_Months/
├── LICENSE                 # GNU GPL v3.0
├── README.md               # This file
└── Readme_Fa.md            # Persian version of this file
```

Each lesson folder follows the same shape: a source file, its compiled `.exe`, and the two documentation files.

## Building the Programs

### With GCC from the terminal

Compile a single lesson by pointing GCC at its source file. The output goes next to the source:

```bash
gcc -Wall -g 5-EvenOdd_PositiveNegative_Zero/main.c -o 5-EvenOdd_PositiveNegative_Zero/main.exe
```

On Linux and macOS the output normally has no `.exe` suffix:

```bash
gcc -Wall -g 5-EvenOdd_PositiveNegative_Zero/main.c -o evenodd
```

**Lessons that use `<math.h>`** — 10, 12, 14, 16 and 39 — need the math library linked on Linux and macOS:

```bash
gcc -Wall 14-Quadratic_Equation_Solver/main.c -o quad -lm
```

Compile every lesson at once from the repository root (the quoting is required because one folder name contains a space):

```bash
for src in */main.c */helloworld.c; do
    gcc -Wall -std=c11 "$src" -o "${src%.c}.exe" || echo "failed: $src"
done
```

### With Visual Studio Code

1. Open the repository folder in VS Code.
2. Open the `.c` file you want to compile.
3. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> to run the default build task, **C/C++: gcc.exe build active file**.
4. The binary is written next to the source, named after the source file.

If your compiler is not at `C:\mingw64\bin\gcc.exe`, update the `command` field in [`.vscode/tasks.json`](.vscode/tasks.json). In `1-HelloWorld` there is also a `launch.json` with a gdb configuration, so <kbd>F5</kbd> builds and starts a debugging session there; its `miDebuggerPath` must point at your `gdb.exe`.

## Running a Program

Run the compiled binary directly:

```bash
./1-HelloWorld/helloworld.exe
```

```text
Hello World!
```

Interactive lessons ask for input before printing results. For example, lesson 3:

```bash
./3-GetInputUser/main.exe
```

```text
Please an entern integer number : 42

User enter This  number : 42
```

Lesson 40 needs no input and prints a table:

```bash
./40-Enumerations_enum_and_Arrays_Persian_Calendar_Months/main.exe
```

```text
  1 Farvardin
  2 Ordibehesht
  3 Khordad
  4 Tir
  5 Mordad
  6 Shahrivar
  7 Mehr
  8 Aban
  9 Azar
 10 Day
 11 Bahman
 12 Esfand
```

## All 40 Lessons at a Glance

| # | Folder | What it demonstrates |
|---:|--------|----------------------|
| 1 | `1-HelloWorld` | Program structure, `main`, `printf`, exit status |
| 2 | `2-StringInPrint` | Escape sequences `\n`, `\t`, `\a`, `\"` |
| 3 | `3-GetInputUser` | `scanf`, format specifiers, `&` address-of |
| 4 | `4-SimppleAdder_Scanf` | Reading two integers and adding them |
| 5 | `5-EvenOdd_PositiveNegative_Zero` | `if`/`else if`/`else`, `%` operator, sign tests |
| 6 | `6-PreIncrementandPostIncrement` | `++a` versus `a++` |
| 7 | `7-WhileLoop_SumMean_Break` | Sentinel-controlled loop, `break`, running sum and mean |
| 8 | `8-Arithmetic_sequence_WithWhile` | Arithmetic progression printed with a `while` loop |
| 9 | `9-Arithmetic_sequence_WithFor` | The same progression with a `for` loop |
| 10 | `10-Arithmetic_Progression_and_Power_Series_Using_For_Loop` | Series and power series with `pow()` from `math.h` |
| 11 | `11-Grade_Statistics_Analyzer` | `getchar` loop, `switch`, counts, percentages, cumulative percentages |
| 12 | `12-Function_PrimeNumber_Checker` | User-defined function, `sqrt()` trial division, `do`/`while` |
| 13 | `13-Function_FibonacciSequence_inC_IterativeVsRecursive` | Iterative versus recursive Fibonacci |
| 14 | `14-Quadratic_Equation_Solver` | `if`/`else` chains, discriminant, real/complex roots |
| 15 | `15-Fibonacci_Sequence_Using_an_Array` | Filling and printing an array |
| 16 | `16-Statistical_Analysis_and_Histogram` | Frequencies, mean, standard deviation, text histogram |
| 17 | `17-Character_Array_and_String_Length` | `char` arrays, `%9s`, `sizeof`, `'\0'`, manual `strlen` |
| 18 | `18-Functions_Arrays_and_Parameter_Passing` | Arrays as arguments, `const`, by-value vs by-reference effects |
| 19 | `19-Bubble_Sort_Algorithm_Using_Functions` | Bubble sort split into `PrintArray` / `Swap` / `BubbleSort` |
| 20 | `20-Array_Size_and_Variable_Length_Arrays` | `sizeof` on arrays, variable-length arrays (VLA) |
| 21 | `21-Finding_Integer_Divisors_Using_Functions_and_Arrays` | Two-pass design: count first, then fill; `NULL` argument |
| 22 | `22-Pointers_in_C_Memory_Addresses_Dereferencing_and_Function_Arguments` | Addresses, `*` and `&`, call by value vs call by reference, `%p` |
| 23 | `23-Bubble_Sort_in_C_Using_Pointers` | Sorting and swapping through pointers |
| 24 | `24-Bubble_Sort_Using_Function_Pointers_in_C` | Comparators passed as function pointers, array of function pointers |
| 25 | `25-Characters_Strings_ASCII_Codes_and_Character_Classification_in_C` | `getchar`, ASCII codes, `ctype.h` predicates |
| 26 | `26-String_to_FloatingPoint_Conversion_in_C_strtof_and_strtod` | `strtof` / `strtod` and the `endptr` out-parameter |
| 27 | `27-Reading_and_Reversing_Strings_in_C_Using_fgets_strlen_and_Recursion` | `fgets`, `strlen`, recursive string reversal |
| 28 | `28-Reading_String_Character_by_Character_in_C_Using_getchar` | Building a string one `getchar` at a time, manual `'\0'` |
| 29 | `29-Formatting_FloatingPoint_Numbers-Using_printf_and_sprintf_in_C` | `printf` vs `sprintf`, field precision |
| 30 | `30-Reading_and-Extracting_Data_from_Strings_Using_sscanf_in_C` | Parsing a formatted string with `sscanf` |
| 31 | `31-Displaying_Error_Messages_Using_strerror_in_C` | `errno` codes and human-readable messages via `strerror` |
| 32 | `32-String-Copy_and_Concatenation_strcpy_strncpy_and_strcat_in_C_Language` | `strcpy`, `strncpy`, `strcat`, manual termination |
| 33 | `33-ComparingStrings_Using_strcmp_in_C_Language` | Lexicographic comparison, result sign |
| 34 | `34-Searching_for_Characters-and_Substrings_Using_strchr_and_strstr_In_C_Clanguage` | Finding all occurrences of a character, first occurrence of a substring |
| 35 | `35-Splitting_Strings_into_Tokens_Using_strtok_in_C_Language` | Tokenizing with `strtok` and a delimiter set |
| 36 | `36-Reading_Strings_with_scanf_Using_Scanset _in_C_Language` | Scansets: `%[^aeiou]` |
| 37 | `37-Reading_and_Parsing_Dates_Using_scanf_in_C_Language` | Parsing `YYYY-MM-DD` with `%*c` assignment suppression |
| 38 | `38-Structures_and_Passing_Structures_to_Functions_in_C_Language` | `struct` + `typedef`, `->`, passing by value vs by pointer |
| 39 | `39-Complex_Numbers_and_Mathematical_Operations_Using_Structures_in_C_Language` | A `Complex` type with add, subtract, multiply, divide, conjugate, modulus |
| 40 | `40-Enumerations_enum_and_Arrays_Persian_Calendar_Months` | `enum` with `typedef`, enums as array indexes |

## Curriculum in Detail

### Part 1 — First Programs (1–4)

- **1-HelloWorld** — the smallest complete C program: `#include`, `int main()`, one `printf`, `return 0`. Introduces the Windows `\r\n` line ending.
- **2-StringInPrint** — four `printf` calls showing tabs, newlines, the audible alert `\a` and escaped quotes.
- **3-GetInputUser** — declares `int n`, prompts, reads with `scanf("%d", &n)` and echoes the value. The `&` is the first contact with addresses.
- **4-SimppleAdder_Scanf** — reads two integers into `a` and `b`, computes `c = a + b` and prints the full equation.

### Part 2 — Decisions, Operators and Loops (5–11)

- **5** — tests an integer for even/odd with `%`, then for positive/negative/zero with an `if`/`else if`/`else` chain.
- **6** — `b1 = ++a1;` versus `b2 = a2++;` and why the printed pairs differ.
- **7** — accumulates numbers until the sentinel `-1`, then prints the sum and the mean; also uses `#define` constants for `TRUE`.
- **8** — reads `a` (first term), `d` (step) and `n` (count), then prints `i`, `a(i)` and the running sum with a `while` loop.
- **9** — the same arithmetic progression rewritten as a `for` loop, ending with the total sum.
- **10** — extends the progression into a power series: for each term it also accumulates `pow(a(i), p)`, printing both running sums in a table.
- **11** — counts the letters A, B, C, D and F read from standard input until `EOF`, using `switch` with fallthrough for upper/lower case, then reports each grade's count, percentage and cumulative percentage.

### Part 3 — Functions, Recursion and Mathematics (12–14)

- **12** — `IsPrime()` tests divisors from 2 up to `sqrt(a)`; `main` keeps asking until a non-positive number is entered.
- **13** — `Fibo1()` computes Fibonacci iteratively in O(n); `Fibo()` does it recursively in O(2ⁿ). Both print `F(0)`…`F(44)` so the huge difference in running time is visible; the golden-ratio experiment is left commented out.
- **14** — solves `ax² + bx + c = 0`, handling `a == 0` (linear or unsolvable), a zero discriminant (double root), a positive discriminant (two real roots) and a negative one (imaginary or complex roots).

### Part 4 — Arrays, Data Analysis and Sorting (15–21)

- **15** — builds Fibonacci numbers 0…24 in an `int F[25]` array and prints them with their indices.
- **16** — computes sum, mean, sample standard deviation and a 0–9 frequency histogram over a hard-coded set of 60 digits, drawing each bar with `*`.
- **17** — stores a name in `char name[10]` using `scanf("%9s", ...)` (bounded to avoid overflow), then compares `sizeof` (the array capacity) with a hand-written length scan that stops at `'\0'`.
- **18** — four functions on the same array: `PrintArray`, `Mean`, `MakeDouble` (modifies the caller's array because arrays decay to pointers) and `MakeDouble2` (changes only its local copy of a scalar).
- **19** — bubble sort with an early-exit `swapped` flag, delegating printing and swapping to separate functions.
- **20** — reads `N` and declares `int a[2*N]`, a variable-length array, then reports its element count through `sizeof`.
- **21** — `GetDivisors(n, NULL)` counts the divisors first; the caller then allocates `int D[nd]` and calls it again to fill the array — the classic "ask for the size, then ask for the data" pattern.
- **All of 15–21** use `sizeof(a) / sizeof(a[0])` to derive element counts instead of hard-coding lengths.

### Part 5 — Pointers (22–24)

- **22** — `Func1(int)` and `Func2(int)` receive copies and cannot change `a`; `Func3(int *)` receives `&a` and does. Ends by printing the variable's address with `%p`.
- **23** — the same bubble sort written with pointer parameters (`int *const a`), `&a[j]` arguments and a pointer-based `Swap`.
- **24** — `BubbleSort` takes a comparator `int (*compare)(int, int)`. Three comparators — ascending, descending and ascending by remainder modulo 3 — are stored in an array of function pointers and applied one after another to the same array.

### Part 6 — Characters and Strings (25–37)

- **25** — reads characters until `EOF`, prints each one's ASCII code and classifies it with `isdigit`, `isalpha`, `islower`, `ispunct` and `isspace`.
- **26** — extracts three numbers from `"1.2 -3.5 10.8"` by calling `strtof` repeatedly and feeding its `pEnd` back in; the last call passes `NULL` because nothing follows.
- **27** — reads a line with `fgets`, prints `strlen(str) - 1` (excluding the trailing newline) and reverses the text by recursing to the end of the string before printing each character on the way back.
- **28** — fills a `char str[50]` in a `while ((c = getchar()) != '\n')` loop, guards the buffer bound and appends `'\0'` itself.
- **29** — formats two `double`s with `%.2f` twice: once straight to the screen with `printf`, once into a buffer with `sprintf` and then `puts`.
- **30** — parses `"(x = -5.45, y = 10.67)"` with the matching `sscanf` format, pulling out `x` and `y`.
- **31** — loops reading error codes and prints `strerror(e)` for each; a negative code ends the program.
- **32** — `strcpy` copies a whole string, `strncpy` copies five characters and the terminator is added by hand, and `strcat` appends one string to another.
- **33** — compares `"abc"` with itself, with `"abd"` and with `"abb"`, mapping the sign of `strcmp` to `=`, `>` and `<`.
- **34** — walks the Shakespeare sentence with `strchr` to report every position of a character (1-based, via pointer subtraction), then uses `strstr` to locate the first occurrence of a word.
- **35** — splits `"1.2 2.5 -5.6,7,8,10 1.41 -6.5,-17"` on spaces and commas with `strtok`, printing one token per line.
- **36** — uses the scanset `%[^aeiou]`, which reads everything up to the first vowel — so `"hello"` yields `"h"`.
- **37** — reads `YYYY-MM-DD` with `%d%*c%d%*c%d`: `%*c` consumes and discards the separators, so any single character works as one.

### Part 7 — Structures and Enumerations (38–40)

- **38** — defines `Student` (`id`, `firstName`, `lastName`, `gpa`) with `typedef struct`. `DisplayStudentInformation` receives a copy, so its `id += 1000` is lost; `DisplayStudentInformation2` takes a pointer, uses `->`, and the change persists — visible when the same student is printed twice.
- **39** — defines `Complex { float real, imag; }` and implements `Conj`, `Abs`, `Add`, `Subtract`, `Product` and `Division`, with a `DispComplex` formatter that handles pure real, pure imaginary and negative imaginary values.
- **40** — `typedef enum months { FAR = 1, ..., ESF } Month` followed by a `char *MonthNames[]` array whose index 0 is an empty placeholder, so `MonthNames[m]` works directly for months 1–12; a `for` loop over the enum prints the calendar.

## Documentation Inside Each Folder

Every lesson ships two documents:

| File | Language | Contents |
|------|----------|----------|
| `Readme.md` | English | Concept, full source, line-by-line explanation, expected output, exercises |
| `Readme_Fa.md` | Persian (فارسی) | The same material in Persian |

Start with the folder's `Readme.md` before reading the code; it explains the new syntax and the reasoning behind the example. A few documentation files in older lessons are short, while later ones (for example lesson 40) are extensive.

## Known Quirks and Intentionally Unpolished Code

These are part of the repository as it stands and are kept so that earlier lessons stay exactly as they were written:

- **Lesson 5 has a real bug worth fixing.** The positive, negative and zero branches print `"%d is Positive.\n"` without passing `a`, so the number is missing (or garbage). Adding the missing argument is a good first exercise.
- **`25-.../mian.c`** — the source file is misspelled (`mian` instead of `main`), and its binary is therefore `mian.exe`. The folder's `.exe` and any local build command must use that name.
- **`30-.../Readmem_Fa.md`** — the Persian document in this folder has an extra `m` in its filename.
- **`36-Reading_Strings_with_scanf_Using_Scanset _in_C_Language`** — the folder name contains a space before `_in`, so unquoted shell commands and links need quoting.
- **`4-SimppleAdder_Scanf`** — "Simpple" is the original spelling; paths and build commands must match it.
- **`#include "stdio.h"`** in lessons 1–4 uses quotes instead of angle brackets. It compiles because the compiler falls back to the system include path, but `#include <stdio.h>` is the portable form. Lessons from 5 onward use angle brackets.
- **Committed binaries.** All 40 folders contain a Windows `.exe` built by MinGW; they are not needed to build from source and can be deleted or regenerated.
- **Lesson 13 is deliberately slow.** Printing `F(0)`…`F(44)` with the recursive implementation performs billions of calls; interrupt it or lower `N` if you only want the comparison.
- **Windows line endings.** Sources are stored with CRLF, and lesson 1 prints an explicit `\r\n`, which can produce a double carriage return in some terminals.

## License

This project is licensed under the **GNU General Public License v3.0**. See [LICENSE](LICENSE) for the full text.

---

Persian version of this document: [Readme_Fa.md](Readme_Fa.md)
