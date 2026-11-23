# 8-C Programming – Arithmetic Progression and Series Summation

## 1. Introduction

In this example, we implement an arithmetic progression (AP) using the C programming language.

An arithmetic progression is a sequence of numbers in which the difference between two consecutive elements is constant.

The program receives three values from the user:

- `a`: The first element of the series.
- `d`: The common difference (step size).
- `n`: The number of elements.

It then calculates each element of the series, adds the elements together, and displays a table containing the index, current element, and cumulative sum.

## 2. Source Code

```c
#include <stdio.h>

int main()
{
    float a, d;
    int n;

    // Get a
    printf("Enter first element of series (a): ");
    scanf("%f", &a);
    printf("\n");

    // Get d
    printf("Enter step size of series (d): ");
    scanf("%f", &d);
    printf("\n");

    // Get n
    printf("Enter number of elements (n): ");
    scanf("%d", &n);
    printf("\n");

    float S = 0;
    float ai;

    printf("i\ta(i)\t\tS(i)\n");

    int i = 0;

    while (i < n)
    {
        ai = a + i * d;     // calculate the i-th element
        S += ai;
        printf("%d\t%f\t%f\n", i, ai, S);
        i++;
    }
}
```

## 3. Mathematical Background

An arithmetic progression is defined by the following formula:

\[
a_i = a + i \times d
\]

Where:

- \(a_i\): The current element.
- \(a\): The first element.
- \(i\): The element index, starting from zero.
- \(d\): The common difference.

The cumulative sum is calculated using:

\[
S_n = \sum_{i=0}^{n-1}(a+i\times d)
\]

The simplified formula is:

\[
S_n = \frac{n}{2}[2a+(n-1)d]
\]

### Example

Consider the following values:

```text
a = 2
d = 3
n = 5
```

The resulting arithmetic progression is:

```text
2, 5, 8, 11, 14
```

The total sum is:

\[
S = 2+5+8+11+14=40
\]

## 4. Code Explanation

### 4.1. Including the Standard I/O Library

```c
#include <stdio.h>
```

This header file provides standard input and output functions.

- `printf()`: Displays information on the screen.
- `scanf()`: Receives input from the user.

### 4.2. Declaring Variables

```c
float a, d;
int n;
```

Three variables are declared:

| Variable | Data Type | Description |
|---|---|---|
| `a` | float | First element of the series |
| `d` | float | Common difference |
| `n` | int | Number of elements |

We use `float` because the first element and common difference can contain decimal values.

### 4.3. Receiving Input from the User

```c
printf("Enter first element of series (a): ");
scanf("%f", &a);
```

The `scanf()` function receives a floating-point number and stores it in variable `a`.

Format specifiers:

- `%f`: Used for reading a `float`.
- `%d`: Used for reading an `int`.

The same process is repeated for `d` and `n`.

### 4.4. Initializing the Sum

```c
float S = 0;
float ai;
```

Two additional variables are declared:

- `S`: Stores the cumulative sum of the series. It starts at zero.
- `ai`: Stores the current element being calculated.

Initializing `S` to zero is important because it provides the correct starting point for addition.

### 4.5. Displaying the Table Header

```c
printf("i\ta(i)\t\tS(i)\n");
```

This statement displays the column headings.

- `\t`: Inserts a horizontal tab.
- `\n`: Moves the cursor to a new line.

The columns represent:

| Column | Description |
|---|---|
| `i` | Element index |
| `a(i)` | Current element |
| `S(i)` | Cumulative sum up to the current element |

### 4.6. Initializing the Loop Counter

```c
int i = 0;
```

The variable `i` represents the index of the current element.

It starts at zero because the first element is calculated using:

\[
a_0 = a + 0 \times d = a
\]

### 4.7. Understanding the While Loop

```c
while (i < n)
{
    // Statements
}
```

The `while` loop executes its statements as long as the condition `i < n` is true.

For example, if `n = 5`, the loop executes five times with these index values:

```text
0, 1, 2, 3, 4
```

### 4.8. Calculating the Current Element

```c
ai = a + i * d;
```

This statement calculates the current element using the arithmetic progression formula.

For example, if:

```text
a = 2
d = 3
```

The calculations are:

| i | Calculation | ai |
|---|---|---|
| 0 | 2 + 0 × 3 | 2 |
| 1 | 2 + 1 × 3 | 5 |
| 2 | 2 + 2 × 3 | 8 |
| 3 | 2 + 3 × 3 | 11 |
| 4 | 2 + 4 × 3 | 14 |

### 4.9. Calculating the Cumulative Sum

```c
S += ai;
```

This is a shorthand assignment operator.

It is equivalent to:

```c
S = S + ai;
```

Every new element is added to the previous sum.

### 4.10. Displaying Each Iteration

```c
printf("%d\t%f\t%f\n", i, ai, S);
```

This statement displays the current index, calculated element, and cumulative sum.

### 4.11. Incrementing the Counter

```c
i++;
```

This increases the value of `i` by one.

It is equivalent to:

```c
i = i + 1;
```

Without incrementing `i`, the loop would never reach its termination condition.

## 5. Program Execution Example

**Input:**

```text
Enter first element of series (a): 2

Enter step size of series (d): 3

Enter number of elements (n): 5
```

**Output:**

```text
i       a(i)            S(i)
0       2.000000        2.000000
1       5.000000        7.000000
2       8.000000        15.000000
3       11.000000       26.000000
4       14.000000       40.000000
```

## 6. Important C Programming Concepts

This example introduces the following concepts:

1. Floating-point variables (`float`).
2. Integer variables (`int`).
3. User input using `scanf()`.
4. Floating-point format specifier (`%f`).
5. Arithmetic operators (`+` and `*`).
6. The `while` loop.
7. Loop counters.
8. Increment operator (`++`).
9. Compound assignment operator (`+=`).
10. Cumulative summation.
11. Formatted output using `printf()`.
12. Mathematical implementation in C.

## 7. Compile and Run

Compile the program using GCC:

```bash
gcc main.c -o series
```

Run on Windows:

```powershell
.\series.exe
```

Run on Linux:

```bash
./series
```

## 8. Practice Exercises

Try the following exercises to improve your understanding:

- Exercise 1: Modify the program to calculate a decreasing arithmetic progression using a negative value for `d`.
- Exercise 2: Display the elements in reverse order.
- Exercise 3: Calculate the average of all elements.
- Exercise 4: Replace the `while` loop with a `for` loop.
- Exercise 5: Display only elements that are divisible by 2.
- Exercise 6: Compare the calculated sum with the mathematical summation formula.
- Exercise 7: Modify the output to display only two decimal places using `%.2f`.

## 9. Important Notes

- The program currently assumes that the user enters valid numeric values.
- It is recommended to check that `n` is greater than zero.
- The `%f` format specifier displays six digits after the decimal point by default.
- The current loop uses zero-based indexing, meaning the first element has index `0`.
- The program can be improved by returning `0` at the end of `main()` to explicitly indicate successful execution.

---

**Learning Objective:** Understand arithmetic progressions, floating-point variables, iterative calculations, while loops, and cumulative summation in the C programming language.