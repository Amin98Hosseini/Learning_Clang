# 9-C Programming – Arithmetic Progression Using For Loop

## 1. Introduction

In this example, we implement an arithmetic progression (AP) using the C programming language and calculate the sum of its elements using a `for` loop.

An arithmetic progression is a sequence of numbers in which the difference between consecutive elements is constant.

The program receives three values from the user:

- `a`: First element of the series.
- `d`: Common difference (step size).
- `n`: Number of elements.

The program then:

1. Calculates each element of the arithmetic progression.
2. Adds each element to the cumulative sum.
3. Displays the index, current element, and cumulative sum in a table.
4. Displays the final sum after the loop finishes.

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

    int i;

    for (i = 0; i < n; i++)
    {
        ai = a + i * d;     // calculate the i-th element
        S += ai;
        printf("%d\t%f\t%f\n", i, ai, S);
    }

    printf("\n\nFinal Sum of Series (S) = %f\n", S);

    return 0;
}
```

## 3. Mathematical Background

An arithmetic progression is calculated using the following formula:

\[
a_i = a + i \times d
\]

Where:

- \(a_i\): Current element.
- \(a\): First element.
- \(i\): Element index, starting from zero.
- \(d\): Common difference.

The sum of all elements is:

\[
S_n = \sum_{i=0}^{n-1}(a+i\times d)
\]

The mathematical formula for the final sum is:

\[
S_n = \frac{n}{2}[2a+(n-1)d]
\]

### Example

Consider the following input:

```text
a = 2
d = 3
n = 5
```

The resulting series is:

```text
2, 5, 8, 11, 14
```

The final sum is:

\[
S = 2+5+8+11+14 = 40
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

### 4.3. Receiving User Input

```c
printf("Enter first element of series (a): ");
scanf("%f", &a);
```

The program asks the user to enter the first element.

The `scanf()` function reads the input and stores it in variable `a`.

Format specifiers:

- `%f`: Used for floating-point input.
- `%d`: Used for integer input.

The same process is repeated for variables `d` and `n`.

### 4.4. Initializing the Sum

```c
float S = 0;
float ai;
```

Two variables are declared:

- `S`: Stores the cumulative sum of the series.
- `ai`: Stores the current calculated element.

The variable `S` is initialized to zero because no elements have been added yet.

### 4.5. Displaying the Table Header

```c
printf("i\ta(i)\t\tS(i)\n");
```

This statement displays the column headings.

- `\t`: Inserts a horizontal tab.
- `\n`: Moves to the next line.

The table contains three columns:

| Column | Description |
|---|---|
| `i` | Element index |
| `a(i)` | Current element |
| `S(i)` | Cumulative sum |

### 4.6. Understanding the For Loop

```c
for (i = 0; i < n; i++)
{
    // Statements
}
```

The `for` loop is used to repeat a block of code a specific number of times.

It contains three main parts:

```c
for (initialization; condition; update)
```

**1. Initialization**

```c
i = 0;
```

The loop counter starts at zero.

**2. Condition**

```c
i < n;
```

The loop continues as long as `i` is less than `n`.

**3. Update**

```c
i++
```

After each iteration, the counter increases by one.

For example, if `n = 5`, the loop executes with the following values:

```text
i = 0
i = 1
i = 2
i = 3
i = 4
```

Therefore, the loop executes five times.

### 4.7. Calculating the Current Element

```c
ai = a + i * d;
```

This statement calculates the current element using the arithmetic progression formula.

For example:

```text
a = 2
d = 3
```

| i | Calculation | ai |
|---|---|---|
| 0 | 2 + 0 × 3 | 2 |
| 1 | 2 + 1 × 3 | 5 |
| 2 | 2 + 2 × 3 | 8 |
| 3 | 2 + 3 × 3 | 11 |
| 4 | 2 + 4 × 3 | 14 |

### 4.8. Calculating the Cumulative Sum

```c
S += ai;
```

This is a compound assignment operator.

It is equivalent to:

```c
S = S + ai;
```

At every iteration, the current element is added to the previous sum.

### 4.9. Displaying Each Iteration

```c
printf("%d\t%f\t%f\n", i, ai, S);
```

This statement displays:

- Current index.
- Current element.
- Cumulative sum.

The output is updated after every iteration.

### 4.10. Displaying the Final Sum

```c
printf("\n\nFinal Sum of Series (S) = %f\n", S);
```

This statement executes after the `for` loop finishes.

It displays the final sum of all elements in the arithmetic progression.

Unlike the previous example, this version explicitly displays the final result separately.

### 4.11. Returning from Main

```c
return 0;
```

This statement terminates the program and indicates successful execution.

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


Final Sum of Series (S) = 40.000000
```

## 6. Difference Between While and For Loops

In the previous example, we used a `while` loop. In this example, we use a `for` loop.

Both loops can perform the same calculation.

**While loop:**

```c
int i = 0;

while (i < n)
{
    ai = a + i * d;
    S += ai;

    printf("%d\t%f\t%f\n", i, ai, S);

    i++;
}
```

**For loop:**

```c
for (i = 0; i < n; i++)
{
    ai = a + i * d;
    S += ai;

    printf("%d\t%f\t%f\n", i, ai, S);
}
```

The main difference is that the initialization, condition, and update operations are grouped together in the `for` loop.

A `for` loop is generally convenient when the number of iterations is known in advance.

## 7. C Programming Concepts Learned

1. Floating-point variables (`float`).
2. Integer variables (`int`).
3. User input using `scanf()`.
4. Format specifiers (`%f` and `%d`).
5. Arithmetic operators (`+` and `*`).
6. The `for` loop.
7. Loop initialization and conditions.
8. Increment operator (`++`).
9. Compound assignment operator (`+=`).
10. Cumulative summation.
11. Formatted output using `printf()`.
12. Implementing mathematical formulas in C.

## 8. Compile and Run

Compile using GCC:

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

## 9. Practice Exercises

- Exercise 1: Replace the `for` loop with a `while` loop.
- Exercise 2: Calculate a decreasing arithmetic progression using a negative `d`.
- Exercise 3: Calculate and display the average of all elements.
- Exercise 4: Display the series in reverse order.
- Exercise 5: Display only even elements.
- Exercise 6: Compare the loop-based sum with the mathematical summation formula.
- Exercise 7: Modify the output to display only two decimal places using `%.2f`.
- Exercise 8: Add input validation to prevent zero or negative values for `n`.

## 10. Important Notes

- The program uses zero-based indexing, so the first element has index zero.
- The loop executes exactly `n` times when `n` is positive.
- The `%f` format specifier displays six decimal places by default in `printf()`.
- `S += ai` updates the cumulative sum during every iteration.
- The final sum is displayed after the loop terminates.
- The current implementation assumes valid numeric input.

---

**Learning Objective:** Understand arithmetic progressions, for loops, loop control, cumulative summation, and formatted output in the C programming language.