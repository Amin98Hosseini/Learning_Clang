# 15-Fibonacci Sequence Using an Array in C

## 1. Introduction

This project demonstrates how to generate and store the Fibonacci sequence using an array in the C programming language.

The program calculates the first 25 Fibonacci numbers and stores them in an integer array named `F`.

The Fibonacci sequence is a mathematical sequence in which each number is calculated by adding the two previous numbers.

The sequence starts with:

\[
F(0)=0,\qquad F(1)=1
\]

The general recurrence relation is:

\[
F(n)=F(n-1)+F(n-2)
\]

This project introduces several important C programming concepts:

- Arrays
- Array indexing
- `#define` preprocessor directives
- `for` loops
- Initializing array elements
- Accessing previously calculated values
- Storing and displaying a sequence of numbers

## 2. Source Code

```c
#include <stdio.h>
#define N 25

int main()
{
    int F[N];

    // Initial Conditions
    F[0] = 0;
    F[1] = 1;

    int i;
    for(i = 2; i < N; i++)
    {
        F[i] = F[i-1] + F[i-2];
    }

    for(i = 0; i < N; i++)
    {
        printf("F[%d] = %d\n", i, F[i]);
    }

    printf("\n");

    return 0;
}
```

## 3. Mathematical Background

The Fibonacci sequence is defined by two initial values and a recurrence relation.

### 3.1. Initial Conditions

The first two values are:

\[
F(0)=0
\]

\[
F(1)=1
\]

These values are necessary because every subsequent number depends on the two previous numbers.

### 3.2. Recurrence Relation

For every index greater than or equal to 2:

\[
F(n)=F(n-1)+F(n-2)
\]

For example:

\[
F(2)=F(1)+F(0)=1+0=1
\]

\[
F(3)=F(2)+F(1)=1+1=2
\]

\[
F(4)=F(3)+F(2)=2+1=3
\]

\[
F(5)=F(4)+F(3)=3+2=5
\]

The beginning of the sequence is:

\[
0,\ 1,\ 1,\ 2,\ 3,\ 5,\ 8,\ 13,\ 21,\ 34,\ldots
\]

## 4. Understanding the Code

### 4.1. Including the Standard Input/Output Library

```c
#include <stdio.h>
```

This header file provides standard input and output functions.

In this program, `printf()` is used to display the Fibonacci numbers.

### 4.2. Defining a Constant Using `#define`

```c
#define N 25
```

The `#define` directive creates a preprocessor macro named `N` with the value `25`.

Before compilation, the preprocessor replaces occurrences of `N` with `25`.

This constant determines how many Fibonacci numbers the program generates.

For example, changing it to:

```c
#define N 40
```

makes the program calculate and display 40 sequence elements, subject to the integer type's range.

### 4.3. Declaring the Array

```c
int F[N];
```

This statement declares an integer array named `F` containing 25 elements.

An array allows multiple values of the same data type to be stored under one variable name.

The valid indexes are:

\[
0,\ 1,\ 2,\ldots,\ 24
\]

Important: C arrays use zero-based indexing. Therefore, an array with 25 elements has indexes from 0 to 24, not 1 to 25.

### 4.4. Setting the Initial Conditions

```c
F[0] = 0;
F[1] = 1;
```

These statements initialize the first two elements of the array.

| Array element | Value |
|---|---:|
| `F[0]` | 0 |
| `F[1]` | 1 |

The remaining elements will be calculated using these two initial values.

### 4.5. Declaring the Loop Variable

```c
int i;
```

The variable `i` is used as the array index inside the loops.

### 4.6. Generating the Fibonacci Sequence

```c
for(i = 2; i < N; i++)
{
    F[i] = F[i-1] + F[i-2];
}
```

This is the main calculation section.

The loop starts at index 2 because the first two elements have already been initialized.

For each iteration:

1. Access the previous element using `F[i-1]`.
2. Access the element before it using `F[i-2]`.
3. Add the two values.
4. Store the result in `F[i]`.

For example, when `i = 2`:

```c
F[2] = F[1] + F[0];
```

The result is:

```text
F[2] = 1
```

When `i = 3`:

```c
F[3] = F[2] + F[1];
```

The result is:

```text
F[3] = 2
```

The loop continues until all 25 elements have been calculated.

### 4.7. Displaying the Array Elements

```c
for(i = 0; i < N; i++)
{
    printf("F[%d] = %d\n", i, F[i]);
}
```

The second `for` loop displays every calculated Fibonacci number.

The format specifiers are:

- First `%d`: Displays the array index.
- Second `%d`: Displays the Fibonacci number stored at that index.
- `\n`: Moves the output cursor to the next line.

### 4.8. Ending the Program

```c
return 0;
```

This statement indicates that the program has completed successfully.

## 5. Example Output

Since `N` is defined as 25, the program generates 25 Fibonacci numbers, from index 0 through index 24.

```text
F[0] = 0
F[1] = 1
F[2] = 1
F[3] = 2
F[4] = 3
F[5] = 5
F[6] = 8
F[7] = 13
F[8] = 21
F[9] = 34
F[10] = 55
F[11] = 89
F[12] = 144
F[13] = 233
F[14] = 377
F[15] = 610
F[16] = 987
F[17] = 1597
F[18] = 2584
F[19] = 4181
F[20] = 6765
F[21] = 10946
F[22] = 17711
F[23] = 28657
F[24] = 46368
```

## 6. Understanding the Array Calculation

The following table shows how the program calculates the first several elements.

| Index (`i`) | Previous value (`F[i-1]`) | Earlier value (`F[i-2]`) | Result (`F[i]`) |
|---:|---:|---:|---:|
| 2 | 1 | 0 | 1 |
| 3 | 1 | 1 | 2 |
| 4 | 2 | 1 | 3 |
| 5 | 3 | 2 | 5 |
| 6 | 5 | 3 | 8 |
| 7 | 8 | 5 | 13 |
| 8 | 13 | 8 | 21 |

Each new element depends on the two elements immediately before it.

## 7. Important C Programming Concepts

| Concept | Description |
|---|---|
| `#include` | Includes a header file |
| `#define` | Defines a preprocessor macro |
| `int` | Declares an integer variable |
| Array | Stores multiple values of the same type |
| Array index | Identifies an element's position |
| Zero-based indexing | The first array element has index 0 |
| `for` loop | Repeats instructions a specified number of times |
| `F[i]` | Accesses an array element |
| `printf()` | Displays calculated values |
| Recurrence relation | Defines a value using previous values |

## 8. Time and Space Complexity

Let `N` represent the number of Fibonacci elements.

### Time Complexity

The first loop calculates each element once.

The second loop displays each element once.

Therefore:

\[
T(N)=O(N)+O(N)=O(N)
\]

The overall time complexity is:

\[
\boxed{O(N)}
\]

### Space Complexity

The program stores `N` integers in the array.

Therefore, its space complexity is:

\[
\boxed{O(N)}
\]

This implementation uses more memory than an iterative implementation that stores only the previous two Fibonacci values, but it keeps the entire sequence available for later access.

## 9. Compilation and Execution

Compile using GCC:

```bash
gcc main.c -o fibonacci
```

Run on Linux:

```bash
./fibonacci
```

Run on Windows PowerShell:

```powershell
gcc main.c -o fibonacci.exe
.\fibonacci.exe
```

## 10. Important Notes

### 10.1. Integer Overflow

The program uses the `int` data type.

On systems with a 32-bit signed `int`, the maximum positive value is:

\[
2^{31}-1=2,147,483,647
\]

The Fibonacci values around this limit are:

\[
F(46)=1,836,311,903
\]

\[
F(47)=2,971,215,073
\]

Therefore, `F(47)` cannot be represented by a signed 32-bit `int`.

The current program calculates only through `F(24)`, so it is safely within this range.

If you want to generate more Fibonacci numbers, consider using `long long`:

```c
long long F[N];
```

Use `%lld` with `printf()` to display a `long long` value:

```c
printf("F[%d] = %lld\n", i, F[i]);
```

However, even `long long` has a finite range, so sufficiently large Fibonacci numbers will eventually overflow.

### 10.2. Array Initialization

Every array element must be assigned a value before it is read.

In this program, `F[0]` and `F[1]` are initialized first, and the loop calculates all remaining elements in order.

## 11. Practice Exercises

Try these exercises to improve your understanding:

1. Change `N` to 10 and observe the output.
2. Change `N` to 40 and replace `int` with `long long`.
3. Display only the even Fibonacci numbers.
4. Calculate the sum of all generated Fibonacci numbers.
5. Find the largest Fibonacci number smaller than a user-entered limit.
6. Ask the user to enter the number of elements instead of using a fixed `#define N`.
7. Display the sequence in a single line, separated by commas.
8. Compare this array implementation with the recursive and iterative implementations from the previous Fibonacci exercise.


## 12. Learning Objective

The main objective of this project is to understand how arrays can be used to store and process a mathematical sequence.

By completing this exercise, you will learn how to:

- Declare and initialize arrays.
- Access array elements using indexes.
- Use `for` loops to process array data.
- Calculate new values from previously stored values.
- Understand the relationship between arrays, algorithms, and mathematical recurrence relations.

This project is a practical introduction to array-based algorithms in C.