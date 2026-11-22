# 5 - Even/Odd and Positive/Negative Number Checker in C

## Overview

This project demonstrates how to use conditional statements (`if`, `else if`, and `else`) in C programming.

The program receives an integer from the user and performs two checks:

1. Determines whether the number is **Even or Odd**.
2. Determines whether the number is **Positive, Negative, or Zero**.

This example is useful for understanding decision-making and conditional logic in C.

## Learning Objectives

By studying this example, you will learn:

- How to use `if` statements.
- How to use `if-else` statements.
- How to use `if-else if-else` statements.
- How to use the modulo (`%`) operator.
- How to compare integer values.
- How to receive user input using `scanf()`.
- How to implement multiple independent conditions.

## Source Code Explanation

### 1. Header File

```c
#include <stdio.h>
```

Includes the Standard Input/Output library, which provides functions such as `printf()` and `scanf()`.

### 2. Variable Declaration

```c
int a;
```

Declares an integer variable named `a`.

This variable stores the number entered by the user.

### 3. Receive User Input

```c
printf("Enter an integer:\n");
scanf("%d", &a);
```

- `printf()` displays a message asking the user to enter an integer.
- `scanf()` reads the entered integer and stores it in variable `a`.
- `&a` provides the memory address of the variable.

### 4. Check Even or Odd

```c
if(a % 2 == 0)
{
    printf("%d is Even.\n", a);
}
else
{
    printf("%d is Odd.\n", a);
}
```

This condition checks whether the entered number is even or odd.

The `%` operator is called the **Modulo Operator**. It returns the remainder of an integer division.

For example:

```text
10 % 2 = 0
11 % 2 = 1
```

**Logic:**

- If `a % 2 == 0`, the number is Even.
- Otherwise, the number is Odd.

Examples:

| Input | Remainder | Result |
|---:|---:|---|
| 10 | 0 | Even |
| 7 | 1 | Odd |
| 0 | 0 | Even |
| -4 | 0 | Even |
| -5 | -1 | Odd |

### 5. Check Positive, Negative, or Zero

```c
if(a > 0)
{
    printf("%d is Positive.\n", a);
}
else if(a < 0)
{
    printf("%d is Negative.\n", a);
}
else
{
    printf("%d is Zero.\n", a);
}
```

This conditional structure checks the value of the entered integer.

**Conditions:**

| Condition | Description |
|---|---|
| `a > 0` | Number is Positive. |
| `a < 0` | Number is Negative. |
| Otherwise | Number is Zero. |

The program uses three possible branches:

- `if`: Executes when the first condition is true.
- `else if`: Checks another condition if the previous condition is false.
- `else`: Executes when all previous conditions are false.

## Example Outputs

### Example 1: Positive Even Number

```text
Enter an integer:
10
10 is Even.
10 is Positive.
```

### Example 2: Positive Odd Number

```text
Enter an integer:
7
7 is Odd.
7 is Positive.
```

### Example 3: Negative Even Number

```text
Enter an integer:
-4
-4 is Even.
-4 is Negative.
```

### Example 4: Negative Odd Number

```text
Enter an integer:
-5
-5 is Odd.
-5 is Negative.
```

### Example 5: Zero

```text
Enter an integer:
0
0 is Even.
0 is Zero.
```

## Important C Programming Concepts

| Concept | Description |
|---|---|
| `if` | Executes code when a condition is true. |
| `else` | Executes code when the `if` condition is false. |
| `else if` | Checks another condition. |
| `%` | Returns the remainder of division. |
| `==` | Checks whether two values are equal. |
| `>` | Checks whether one value is greater than another. |
| `<` | Checks whether one value is less than another. |
| `scanf()` | Receives input from the user. |
| `printf()` | Displays output. |

## Important Note: Two Independent Conditions

This program uses two separate conditional structures:

```c
if(a % 2 == 0)
{
    // Even or Odd
}

if(a > 0)
{
    // Positive, Negative or Zero
}
```

These are independent checks.

This means both conditions are evaluated, allowing the program to determine both the parity and the sign of the number.

For example, the number `10` is both Even and Positive.

## Practice Exercises

Try modifying the program to improve your understanding:

1. Check whether a number is divisible by 3.
2. Check whether a number is divisible by both 2 and 5.
3. Find the largest of two integers using `if-else`.
4. Find the largest of three integers using `if-else if-else`.
5. Check whether a year is a leap year.
6. Check whether a number is within the range of 1 to 100.
7. Determine whether a number is positive and even, negative and odd, or another combination.

## Summary

This project introduces fundamental decision-making concepts in C programming.

The main concepts demonstrated are:

- Conditional statements: `if`, `else if`, and `else`.
- Modulo operator: `%`.
- Comparison operators: `==`, `>`, and `<`.
- User input using `scanf()`.
- Multiple independent conditional checks.

**Next Step:** Practice combining multiple conditions using logical operators such as `&&` (AND), `||` (OR), and `!` (NOT).