# 6 - Pre-Increment and Post-Increment Operators in C

## Overview

This project demonstrates the difference between the **Pre-Increment (`++a`)** and **Post-Increment (`a++`)** operators in C programming.

Both operators increase the value of a variable by one, but they behave differently when used in an assignment or expression.

- **Pre-Increment (`++a`):** Increments the variable first, then uses its updated value.
- **Post-Increment (`a++`):** Uses the current value first, then increments the variable.

## Learning Objectives

By studying this example, you will learn:

- How increment operators work in C.
- The difference between prefix and postfix increment.
- How to use increment operators in assignment expressions.
- How expression evaluation affects variable values.
- How to display multiple variable values using `printf()`.

## Source Code Explanation

### 1. Header File

```c
#include <stdio.h>
```

Includes the Standard Input/Output library, which provides functions such as `printf()`.

### 2. Variable Declaration and Initialization

```c
int a1 = 10;
int a2 = 10;
int b1, b2;
```

Four integer variables are declared:

| Variable | Initial Value | Description |
|---|---:|---|
| `a1` | 10 | Used for pre-increment. |
| `a2` | 10 | Used for post-increment. |
| `b1` | Undefined | Stores the result of pre-increment. |
| `b2` | Undefined | Stores the result of post-increment. |

### 3. Pre-Increment Operator

```c
b1 = ++a1;
```

The `++a1` operator increments `a1` before using its value.

Execution steps:

1. Initial value: `a1 = 10`
2. Increment: `a1 = 11`
3. Assignment: `b1 = 11`

Final values:

```text
a1 = 11
b1 = 11
```

**Important:** The variable is incremented before its value is assigned to `b1`.

### 4. Post-Increment Operator

```c
b2 = a2++;
```

The `a2++` operator uses the current value of `a2` before incrementing it.

Execution steps:

1. Initial value: `a2 = 10`
2. Assignment: `b2 = 10`
3. Increment: `a2 = 11`

Final values:

```text
a2 = 11
b2 = 10
```

**Important:** The original value is assigned to `b2` before `a2` is incremented.

### 5. Display Results

```c
printf("a1 = %d, b1 = %d\n\n", a1, b1);
printf("a2 = %d, b2 = %d\n", a2, b2);
```

Displays the final values of the variables.

## Example Output

```text
a1 = 11, b1 = 11

a2 = 11, b2 = 10
```

## Pre-Increment vs Post-Increment

| Feature | Pre-Increment | Post-Increment |
|---|---|---|
| Operator | `++a` | `a++` |
| Operation | Increment first | Use value first |
| Variable update | Before value is used | After value is used |
| Example | `b = ++a` | `b = a++` |
| If `a = 10` | `a = 11, b = 11` | `a = 11, b = 10` |

## Visual Execution Flow

**Pre-Increment (`++a`)**

```text
a = 10
   |
   v
Increment a
   |
   v
a = 11
   |
   v
Assign b = 11
```

**Post-Increment (`a++`)**

```text
a = 10
   |
   v
Assign b = 10
   |
   v
Increment a
   |
   v
a = 11
```

## Practice Exercises

Try modifying the program to improve your understanding:

1. Change the initial values of `a1` and `a2` to 20.
2. Use pre-decrement (`--a`) instead of pre-increment.
3. Use post-decrement (`a--`) instead of post-increment.
4. Try `a = 5; b = ++a;` and predict the result.
5. Try `a = 5; b = a++;` and predict the result.
6. Use increment operators inside `printf()` and observe the results.

## Important Notes

- `++a` and `a++` both increase the variable by exactly one.
- The main difference is when the updated value is used.
- When used as standalone statements, both operators increment the variable by one.
- Avoid modifying the same variable multiple times within a single expression because it can lead to undefined behavior in C.

## Summary

This example introduces two fundamental increment operators in C:

- **Pre-Increment (`++a`):** Increment first, then use the updated value.
- **Post-Increment (`a++`):** Use the original value, then increment.

Understanding these operators is important when working with loops, counters, arrays, and expressions in C programming.

**Next Step:** Practice using increment and decrement operators inside `for` and `while` loops.