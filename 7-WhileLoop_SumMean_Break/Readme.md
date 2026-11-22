# 7 - While Loop, Break, Sum & Mean in C

## Overview

This project demonstrates how to use the `while` loop, `break` statement, and arithmetic operations in C programming.

The program continuously receives integer numbers from the user, calculates their sum, and finally calculates the mean (average) of the entered numbers.

The input process terminates when the user enters `-1`.

## Learning Objectives

By studying this example, you will learn:

- How to use the `while` loop.
- How to create an infinite loop.
- How to use the `break` statement to exit a loop.
- How to receive multiple inputs using `scanf()`.
- How to calculate the sum of numbers.
- How to calculate the arithmetic mean.
- How to use type casting in C.
- How to use a counter variable to track the number of inputs.

## Source Code Explanation

### 1. Header File

```c
#include <stdio.h>
```

Includes the Standard Input/Output library, which provides functions such as `printf()` and `scanf()`.

### 2. Define Constants

```c
#define TRUE -1
#define FALSE 0
```

Defines two symbolic constants:

- `TRUE`: Represents a true condition.
- `FALSE`: Represents a false condition.

In C, any non-zero integer is considered true, while zero is considered false.

**Note:** Using `1` for `TRUE` is more conventional, but `-1` also works.

### 3. Variable Declaration

```c
int n = 10;
int a, S, i;
```

| Variable | Description |
|---|---|
| `n` | Maximum number of inputs (not currently used). |
| `a` | Stores the number entered by the user. |
| `S` | Stores the sum of entered numbers. |
| `i` | Counts the number of entered numbers. |

### 4. Initialize Variables

```c
i = 0;
S = 0;
```

- `i = 0`: Initializes the counter.
- `S = 0`: Initializes the sum.

### 5. While Loop

```c
while(TRUE)
{
    printf("Enter a number: ");
    scanf("%d", &a);

    if(a == -1)
        break;

    S += a;
    i++;
}
```

The `while(TRUE)` statement creates an infinite loop because `TRUE` is defined as `-1`, which is non-zero.

Inside the loop:

1. The program asks the user to enter a number.
2. `scanf()` reads the entered number.
3. If the number is `-1`, the `break` statement terminates the loop.
4. Otherwise, the number is added to `S`.
5. The counter `i` increases by one.

**Important:** The termination value `-1` is not included in the sum or the number of inputs.

### 6. Calculate the Sum

```c
printf("\nSum of numbers = %d\n\n", S);
```

Displays the total sum of all entered numbers.

### 7. Calculate the Mean

```c
float m = (float)S / i;
```

Calculates the arithmetic mean:

\[
Mean = \frac{Sum}{Number\ of\ Inputs}
\]

The `(float)` operation is called **type casting**.

It converts `S` from an integer to a floating-point number, allowing the division to produce a decimal result.

### 8. Display the Mean

```c
printf("Mean of numbers = %.2f", m);
```

Displays the calculated mean with two digits after the decimal point.

## Example Output

```text
Enter a number: 10
Enter a number: 20
Enter a number: 30
Enter a number: 40
Enter a number: -1

Sum of numbers = 100

Mean of numbers = 25.00
```

## Important C Programming Concepts

| Concept | Description |
|---|---|
| `while()` | Repeats a block of code while a condition is true. |
| `break` | Immediately terminates the current loop. |
| `#define` | Creates a preprocessor macro. |
| `scanf()` | Reads input from the user. |
| `S += a` | Adds `a` to `S` and stores the result in `S`. |
| `i++` | Increments the counter by one. |
| `(float)` | Converts a value to floating-point type. |
| `%.2f` | Prints a floating-point value with two decimal places. |

## Practice Exercises

Try modifying the program to improve your understanding:

1. Replace `while(TRUE)` with `while(i < n)` to limit the number of inputs to 10.
2. Change the termination value from `-1` to `0`.
3. Calculate the maximum and minimum entered numbers.
4. Calculate the sum of only positive numbers.
5. Calculate the average of only even numbers.
6. Prevent division by zero when the user enters `-1` immediately.

## Important Note: Division by Zero

The original program has a potential problem:

```c
float m = (float)S / i;
```

If the user enters `-1` immediately, `i` remains zero, resulting in division by zero.

A safer implementation is:

```c
if(i > 0)
{
    float m = (float)S / i;
    printf("Mean of numbers = %.2f\n", m);
}
else
{
    printf("No numbers were entered.\n");
}
```

## Summary

This example is a practical introduction to loops and basic mathematical operations in C.

The main concepts demonstrated are:

- Repetition using `while`.
- Loop termination using `break`.
- Accumulation using `S += a`.
- Counting using `i++`.
- Average calculation using floating-point division.

**Next Step:** Practice modifying the program and experiment with different loop conditions and termination values.