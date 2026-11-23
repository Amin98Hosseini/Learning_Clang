# 11-Grade Statistics Analyzer in C

## 1. Introduction

This program reads a sequence of student grades from the input stream and counts how many times each grade appears.

The supported grades are:

- `A` or `a`
- `B` or `b`
- `C` or `c`
- `D` or `d`
- `F` or `f`

After reading all the input, the program calculates:

1. The number of occurrences of each grade.
2. The percentage of each grade relative to the total number of grades.
3. The cumulative percentage of grades.
4. Whether more than 60% of the grades are `C` or better.

The program uses `getchar()` to read individual characters until it encounters `EOF` (End Of File).

---

## 2. Source Code

```c
#include <stdio.h>
#define TRUE -1

int main()
{
    char g;
    int nA = 0;
    int nB = 0;
    int nC = 0;
    int nD = 0;
    int nF = 0;

    while((g = getchar()) != EOF)
    {
        switch(g)
        {
            case 'A':
            case 'a':
                nA++;
                break;

            case 'B':
            case 'b':
                nB++;
                break;

            case 'C':
            case 'c':
                nC++;
                break;

            case 'D':
            case 'd':
                nD++;
                break;

            case 'F':
            case 'f':
                nF++;
                break;

            case ' ':
            case '\n':
            case '\t':
                break;

            default:
                printf("Incorrect input. Please enter from letters set {A, B, C, D, F}.\n");
                break;
        }
    }

    int n = nA + nB + nC + nD + nF;

    int cA = nA;
    int cB = nB + cA;
    int cC = nC + cB;
    int cD = nD + cC;
    int cF = nF + cD;

    printf("Grade\tCount\tPercent\tCum. Percent\n");
    printf("A\t%d of %d\t%.2f\t%.2f\n", nA, n, (float)nA*100/n, (float)cA*100/n);
    printf("B\t%d of %d\t%.2f\t%.2f\n", nB, n, (float)nB*100/n, (float)cB*100/n);
    printf("C\t%d of %d\t%.2f\t%.2f\n", nC, n, (float)nC*100/n, (float)cC*100/n);
    printf("D\t%d of %d\t%.2f\t%.2f\n", nD, n, (float)nD*100/n, (float)cD*100/n);
    printf("F\t%d of %d\t%.2f\t%.2f\n", nF, n, (float)nF*100/n, (float)cF*100/n);

    if((float)cC/n > 0.6)
    {
        printf("\nCongratulations to Teacher!\n");
    }

    return 0;
}
```

---

## 3. Mathematical Background

The program calculates the distribution of grades using two types of percentages.

### 3.1. Total Number of Grades

The total number of valid grades is:

\[
n = n_A+n_B+n_C+n_D+n_F
\]

Where:

- \(n_A\): Number of A grades.
- \(n_B\): Number of B grades.
- \(n_C\): Number of C grades.
- \(n_D\): Number of D grades.
- \(n_F\): Number of F grades.

### 3.2. Individual Percentage

The percentage of each grade is calculated using:

\[
P_X=\frac{n_X}{n}\times100
\]

For example, if there are 20 grades and 5 of them are A:

\[
P_A=\frac{5}{20}\times100=25\%
\]

### 3.3. Cumulative Percentage

A cumulative percentage represents the percentage of all grades up to and including the current grade.

The cumulative counts are:

\[
c_A=n_A
\]

\[
c_B=n_A+n_B
\]

\[
c_C=n_A+n_B+n_C
\]

\[
c_D=n_A+n_B+n_C+n_D
\]

\[
c_F=n_A+n_B+n_C+n_D+n_F
\]

The cumulative percentage is:

\[
CP_X=\frac{c_X}{n}\times100
\]

For example:

\[
CP_C=\frac{n_A+n_B+n_C}{n}\times100
\]

This means the cumulative percentage for C represents the percentage of students who received A, B, or C.

---

## 4. Understanding the C Program

### 4.1. Including the Standard Input/Output Library

```c
#include <stdio.h>
```

The `stdio.h` library provides standard input and output functions.

This program uses:

- `getchar()` to read characters.
- `printf()` to display messages and results.
- `EOF` to detect the end of the input stream.

### 4.2. Defining a Macro

```c
#define TRUE -1
```

The `#define` directive creates a preprocessor macro.

In this program, `TRUE` is defined as `-1`, but it is never used. Therefore, this definition has no effect on the program's behavior and can be removed.

### 4.3. Declaring Variables

```c
char g;

int nA = 0;
int nB = 0;
int nC = 0;
int nD = 0;
int nF = 0;
```

The variable `g` stores the current input character.

The five integer variables are counters. Each one tracks how many times a particular grade appears.

All counters start at zero because no grades have been read yet.

### 4.4. Reading Characters with getchar()

```c
while((g = getchar()) != EOF)
```

The `getchar()` function reads one character from the standard input stream.

The `while` loop continues as long as the input is not equal to `EOF`.

`EOF` means End Of File. It indicates that no more input is available.

On a typical terminal:

- Linux/macOS: Press `Ctrl + D` to send EOF.
- Windows terminal: Press `Ctrl + Z`, then Enter.

**Important:** `getchar()` returns an `int`, not a `char`, because it must be able to represent every possible unsigned character value as well as the special `EOF` value.

For reliable EOF detection, it is better to declare:

```c
int g;
```

instead of:

```c
char g;
```

### 4.5. Using switch-case

```c
switch(g)
{
    case 'A':
    case 'a':
        nA++;
        break;
}
```

The `switch` statement checks the value of `g` and executes the matching case.

Both uppercase and lowercase letters are accepted.

For example:

```c
case 'A':
case 'a':
    nA++;
    break;
```

Both cases execute the same instruction:

```c
nA++;
```

The `++` operator increases the counter by one.

The `break` statement prevents execution from continuing into the next case.

### 4.6. Ignoring Whitespace

```c
case ' ':
case '\n':
case '\t':
    break;
```

The program ignores three whitespace characters:

| Character | Meaning |
|---|---|
| `' '` | Space |
| `'\n'` | Newline |
| `'\t'` | Horizontal tab |

This allows users to enter grades separated by spaces, tabs, or new lines.

### 4.7. Handling Incorrect Input

```c
default:
    printf("Incorrect input. Please enter from letters set {A, B, C, D, F}.\n");
    break;
```

The `default` branch executes when the input character does not match any supported grade or ignored whitespace character.

For example, entering `X` displays an error message.

The invalid character is not added to any counter.

### 4.8. Calculating the Total

```c
int n = nA + nB + nC + nD + nF;
```

After the input loop finishes, the program calculates the total number of valid grades.

Notice that spaces, tabs, newlines, and invalid characters are not included in this total.

### 4.9. Calculating Cumulative Counts

```c
int cA = nA;
int cB = nB + cA;
int cC = nC + cB;
int cD = nD + cC;
int cF = nF + cD;
```

These variables store cumulative grade counts.

For example:

```c
int cC = nC + cB;
```

Since `cB` already contains the number of A and B grades, `cC` contains the total number of A, B, and C grades.

### 4.10. Displaying the Results

```c
printf("Grade\tCount\tPercent\tCum. Percent\n");
```

The `\t` escape sequence inserts a horizontal tab to help align the output columns.

For example:

```c
printf("A\t%d of %d\t%.2f\t%.2f\n",
       nA, n, (float)nA*100/n, (float)cA*100/n);
```

The format specifiers are:

| Format | Meaning |
|---|---|
| `%d` | Display an integer |
| `%f` | Display a floating-point number |
| `%.2f` | Display a floating-point number with two digits after the decimal point |
| `\t` | Horizontal tab |
| `\n` | Newline |

The expression:

```c
(float)nA * 100 / n
```

converts `nA` to a floating-point value before performing the percentage calculation.

This is important because integer division would otherwise discard the fractional part.

### 4.11. Checking the Teacher's Result

```c
if((float)cC/n > 0.6)
{
    printf("\nCongratulations to Teacher!\n");
}
```

This condition checks whether the cumulative proportion of A, B, and C grades is greater than 60%.

For example:

\[
\frac{c_C}{n}>0.6
\]

If 70% of students received A, B, or C, the condition is true and the congratulations message is printed.

---

## 5. Example Input and Output

### Example Input

Enter the following grades:

```text
A
B
A
C
B
D
C
A
F
B
```

After entering the last grade, send EOF:

- Windows: `Ctrl + Z`, then Enter.
- Linux/macOS: `Ctrl + D`.

### Expected Output

```text
Grade   Count   Percent   Cum. Percent
A       3 of 10 30.00     30.00
B       3 of 10 30.00     60.00
C       2 of 10 20.00     80.00
D       1 of 10 10.00     90.00
F       1 of 10 10.00     100.00

Congratulations to Teacher!
```

The actual spacing depends on terminal tab settings.

### Understanding the Result

There are 10 valid grades:

| Grade | Count | Percentage | Cumulative Percentage |
|---|---:|---:|---:|
| A | 3 | 30% | 30% |
| B | 3 | 30% | 60% |
| C | 2 | 20% | 80% |
| D | 1 | 10% | 90% |
| F | 1 | 10% | 100% |

The cumulative percentage for C is 80%.

Since 80% is greater than 60%, the program displays the congratulations message.

---

## 6. Important Programming Concepts Learned

By studying this program, you will learn:

1. **Character input:** Reading individual characters using `getchar()`.
2. **EOF detection:** Identifying the end of an input stream.
3. **While loop:** Repeating an operation until a condition becomes false.
4. **Switch-case:** Selecting an operation based on a character value.
5. **Counters:** Counting occurrences using integer variables.
6. **Increment operator:** Increasing a variable using `++`.
7. **Break statement:** Exiting a `switch` case.
8. **Default case:** Handling unsupported input.
9. **Type conversion:** Converting an integer to `float`.
10. **Percentage calculation:** Calculating the relative frequency of each grade.
11. **Cumulative statistics:** Calculating cumulative counts and percentages.
12. **Conditional statements:** Using `if` to check a mathematical condition.
13. **Formatted output:** Using `printf()` format specifiers.

---

## 7. Important Notes and Possible Improvements

The supplied program demonstrates useful C concepts, but there are a few issues worth understanding.

### 7.1. Use int for getchar()

Recommended:

```c
int g;

while((g = getchar()) != EOF)
{
    switch(g)
    {
        /* grade cases */
    }
}
```

This ensures that the `EOF` value can be detected reliably.

### 7.2. Prevent Division by Zero

If the user enters no valid grades, then:

```c
int n = 0;
```

The percentage calculations would divide by zero.

A safer approach is:

```c
if(n == 0)
{
    printf("No valid grades were entered.\n");
    return 0;
}
```

Place this check immediately after calculating `n` and before calculating percentages.

### 7.3. Remove Unused Macro

```c
#define TRUE -1
```

This macro is not used anywhere in the program. It can be removed without changing the result.

### 7.4. Understand Cumulative Percentage

The cumulative percentage for C includes A, B, and C.

It does not represent only the percentage of C grades.

For this example:

- A percentage = 30%
- B percentage = 30%
- C percentage = 20%
- Cumulative percentage for C = 80%

### 7.5. Invalid Input Messages

The program prints an error message for every invalid character. For example, entering `ABCX` produces an error for `X`.

You can improve this behavior by counting invalid characters or displaying a single summary message after input finishes.

---

## 8. Compile and Run

### Using GCC

Compile the program:

```bash
gcc main.c -o grade_analyzer
```

Run on Linux/macOS:

```bash
./grade_analyzer
```

Run on Windows:

```powershell
.\grade_analyzer.exe
```

### Using Visual Studio Code

1. Open the project folder.
2. Open `main.c`.
3. Open the integrated terminal.
4. Compile the program using GCC.
5. Run the generated executable.
6. Enter grades and send EOF to finish.

---

## 9. Practice Exercises

Try the following exercises to improve your understanding:

### Exercise 1: Add More Grade Categories

Extend the program to support additional grades such as `E`.

### Exercise 2: Count Invalid Characters

Create an integer variable called `invalidCount` and increase it whenever an unsupported character is entered.

### Exercise 3: Calculate the Average Grade

Assign numerical values to grades:

- A = 5
- B = 4
- C = 3
- D = 2
- F = 0

Calculate the average numerical grade.

### Exercise 4: Display Only Nonzero Grades

Modify the output so that grades with a count of zero are not displayed.

### Exercise 5: Improve Input Handling

Modify the program to use `int` for the input character and prevent division by zero.

---

## 10. Learning Objective

The main objective of this exercise is to understand how a C program can process a continuous stream of character input, classify each character, count its occurrences, and generate statistical results.

This program is a practical introduction to:

- Input processing
- Character classification
- Counters and loops
- Conditional logic
- Basic statistical calculations

These concepts are useful in text processing, data analysis, input validation, and many other C programming applications.

---


