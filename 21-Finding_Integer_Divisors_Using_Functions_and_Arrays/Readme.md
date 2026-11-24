# 21-Finding Integer Divisors Using Functions and Arrays in C

## Overview

This project demonstrates how to find all positive divisors of an integer using a custom function in C.

The program receives an integer from the user, calculates how many divisors it has, creates an array to store those divisors, and finally displays them.

One interesting feature of this implementation is that the `GetDivisors()` function can work in two different modes:

1. **Counting mode:** When the array parameter is `NULL`, the function only counts the divisors.
2. **Storage mode:** When a valid array is provided, the function stores the divisors inside that array.

This example introduces several important C programming concepts:

- Functions and function prototypes
- Returning values from functions
- Passing arrays to functions
- The `NULL` pointer
- Array initialization
- Variable Length Arrays (VLAs)
- Finding integer divisors using the modulo operator
- Using a function for multiple purposes

---

## Source Code

```c
#include <stdio.h>

void PrintArray(const int a[], int N);
int GetDivisors(int n, int D[]);

int main()
{
    int n;
    int i;

    printf("Enter an integer: ");
    scanf("%d", &n);
    printf("\n");

    int nd = GetDivisors(n, NULL);

    printf("%d has %d divisors.\n", n, nd);

    int D[nd];

    for(i = 0; i < nd; i++)
    {
        D[i] = 0;
    }

    GetDivisors(n, D);

    printf("Divisors of %d = {", n);
    PrintArray(D, nd);
    printf("}\n");

    return 0;
}

int GetDivisors(int n, int D[])
{
    if(n == 0) return 0;

    if(n < 0) n = -n;

    int j = 0;
    int i;

    for(i = 1; i <= n; i++)
    {
        if(n % i == 0)
        {
            if(D != NULL) D[j] = i;
            j++;
        }
    }

    return j;
}

void PrintArray(const int a[], int N)
{
    int i;

    for(i = 0; i < N; i++)
    {
        printf("%d", a[i]);

        if(i < N - 1)
        {
            printf(", ");
        }
    }
}
```

---

## 1. Understanding the Code

### 1.1 Including the Standard Library

```c
#include <stdio.h>
```

This header file provides standard input/output functions.

In this project, we use:

- `printf()` to display messages and results.
- `scanf()` to receive an integer from the user.

### 1.2 Function Prototypes

```c
void PrintArray(const int a[], int N);
int GetDivisors(int n, int D[]);
```

These are function prototypes.

They tell the compiler the names, parameters, and return types of functions before their actual definitions appear.

**First function:**

```c
void PrintArray(const int a[], int N);
```

This function displays the elements of an array.

Parameters:

- `const int a[]`: An array of integers that the function can read but cannot modify.
- `int N`: The number of elements in the array.

The return type is `void`, which means that this function does not return a value.

**Second function:**

```c
int GetDivisors(int n, int D[]);
```

This function finds the positive divisors of an integer.

Parameters:

- `int n`: The integer whose divisors we want to find.
- `int D[]`: An array used to store the divisors.

The return type is `int`, because the function returns the number of divisors found.

### 1.3 Declaring Variables

```c
int n;
int i;
```

We declare two integer variables:

- `n`: Stores the integer entered by the user.
- `i`: Used as a loop counter.

### 1.4 Receiving an Integer from the User

```c
printf("Enter an integer: ");
scanf("%d", &n);
printf("\n");
```

The program asks the user to enter an integer.

The `%d` format specifier is used to receive an integer, and `&n` provides the address where the input value should be stored.

For example:

```text
Enter an integer: 12
```

After this statement, `n` contains the value `12`.

### 1.5 Calling GetDivisors() with NULL

```c
int nd = GetDivisors(n, NULL);
```

This is one of the most interesting parts of the program.

We call `GetDivisors()` and pass two arguments:

- `n`: The input integer.
- `NULL`: Indicates that no destination array is provided.

The function uses this call to count the divisors without storing them.

For example, if:

```c
n = 12;
```

The positive divisors are:

```text
1, 2, 3, 4, 6, 12
```

Therefore:

```c
nd = 6;
```

The variable `nd` stores the total number of divisors.

**What is NULL?**

`NULL` is a null pointer constant. It represents a pointer that does not point to a valid object.

In this program, it tells `GetDivisors()` that it should count divisors without writing them into an array.

### 1.6 Displaying the Number of Divisors

```c
printf("%d has %d divisors.\n", n, nd);
```

This statement displays the input integer and the number of positive divisors found.

For example:

```text
12 has 6 divisors.
```

### 1.7 Declaring an Array with a Variable Size

```c
int D[nd];
```

Now that we know the number of divisors, we can declare an array with exactly enough elements to store them.

For example, if:

```c
nd = 6;
```

The declaration becomes equivalent to:

```c
int D[6];
```

This is another example of a **Variable Length Array (VLA)**.

The size is determined at runtime.

**Important:** A VLA must have a positive size. Since the original function returns zero for input zero, `int D[nd]` is invalid when `nd` is zero.

VLAs are supported in C99, while support in C11 and C17 is optional.

### 1.8 Initializing the Array

```c
for(i = 0; i < nd; i++)
{
    D[i] = 0;
}
```

This loop initializes every element of the array to zero.

For example, if `nd` is 6, the array becomes:

```text
D = {0, 0, 0, 0, 0, 0}
```

In this particular program, initializing the array is not strictly necessary because `GetDivisors()` writes every element before it is printed.

However, initialization is useful when learning how arrays work and can prevent accidental use of uninitialized values in other situations.

### 1.9 Calling GetDivisors() Again

```c
GetDivisors(n, D);
```

This time, we pass the actual array `D` instead of `NULL`.

The function now stores the divisors in the array.

For `n = 12`, the array becomes:

```text
D = {1, 2, 3, 4, 6, 12}
```

Notice that the return value is not used in this second call because we already know the number of divisors from the first call.

### 1.10 Displaying the Divisors

```c
printf("Divisors of %d = {", n);
PrintArray(D, nd);
printf("}\n");
```

First, the program prints the beginning of the result.

Then `PrintArray()` displays the array elements separated by commas.

Finally, the closing brace is printed.

Example:

```text
Divisors of 12 = {1, 2, 3, 4, 6, 12}
```

---

## 2. Understanding the GetDivisors() Function

This function is responsible for finding all positive divisors of an integer.

```c
int GetDivisors(int n, int D[])
{
    if(n == 0) return 0;

    if(n < 0) n = -n;

    int j = 0;
    int i;

    for(i = 1; i <= n; i++)
    {
        if(n % i == 0)
        {
            if(D != NULL) D[j] = i;
            j++;
        }
    }

    return j;
}
```

Let's examine its logic.

### 2.1 Handling Zero

```c
if(n == 0) return 0;
```

The function returns zero when the input is zero.

Mathematically, zero has infinitely many positive divisors because every positive integer divides zero.

For example:

\[
0 \bmod 1 = 0
\]

\[
0 \bmod 2 = 0
\]

\[
0 \bmod 3 = 0
\]

Therefore, this program defines zero as a special case and returns zero divisors for it.

This is a programming convention, not the mathematical number of divisors of zero.

### 2.2 Handling Negative Numbers

```c
if(n < 0) n = -n;
```

If the input is negative, the function converts it to its positive magnitude.

For example:

```text
n = -12
```

becomes:

```text
n = 12
```

The program then finds the positive divisors of 12.

As a result:

```text
Divisors of -12 = {1, 2, 3, 4, 6, 12}
```

**Important limitation:** Negating the smallest possible `int` value causes signed integer overflow because its positive magnitude cannot be represented by the same `int` type. A safer implementation must handle this case separately.

### 2.3 Initializing the Divisor Counter

```c
int j = 0;
```

The variable `j` counts the number of divisors found.

It also determines the next position in the destination array.

### 2.4 Searching for Divisors

```c
for(i = 1; i <= n; i++)
```

This loop checks every integer from 1 through `n`.

For each value of `i`, the program checks whether it divides `n` without a remainder.

### 2.5 Using the Modulo Operator

```c
if(n % i == 0)
```

The modulo operator `%` returns the remainder of an integer division.

If the remainder is zero, `i` is a divisor of `n`.

For example:

\[
12 \bmod 3 = 0
\]

Therefore, 3 is a divisor of 12.

But:

\[
12 \bmod 5 = 2
\]

Therefore, 5 is not a divisor of 12.

### 2.6 Checking the Destination Array

```c
if(D != NULL) D[j] = i;
```

This statement is responsible for the two different operating modes of the function.

If `D` is `NULL`, the function skips the array assignment.

If `D` points to a valid array, the divisor is stored at position `j`.

This makes it possible to use the same function for counting and storing divisors.

### 2.7 Increasing the Counter

```c
j++;
```

Every time a divisor is found, the counter increases by one.

This ensures that the next divisor is stored in the next available array position.

### 2.8 Returning the Number of Divisors

```c
return j;
```

At the end of the function, `j` contains the total number of divisors found.

The function returns this value to the calling function.

---

## 3. Understanding the PrintArray() Function

```c
void PrintArray(const int a[], int N)
{
    int i;

    for(i = 0; i < N; i++)
    {
        printf("%d", a[i]);

        if(i < N - 1)
        {
            printf(", ");
        }
    }
}
```

This function displays all elements of an integer array.

Parameters:

- `const int a[]`: The array to display.
- `int N`: The number of elements.

The `const` keyword indicates that this function is not allowed to modify the array elements through `a`.

The condition:

```c
if(i < N - 1)
```

prevents the program from printing an unnecessary comma after the last element.

For example:

```text
1, 2, 3, 4, 6, 12
```

---

## 4. Example Execution

### Example 1: Positive Integer

**Input:**

```text
Enter an integer: 12
```

**Output:**

```text
12 has 6 divisors.
Divisors of 12 = {1, 2, 3, 4, 6, 12}
```

### Example 2: Prime Number

**Input:**

```text
Enter an integer: 13
```

**Output:**

```text
13 has 2 divisors.
Divisors of 13 = {1, 13}
```

A prime number has exactly two positive divisors: 1 and itself.

### Example 3: Negative Integer

**Input:**

```text
Enter an integer: -20
```

**Output:**

```text
-20 has 6 divisors.
Divisors of -20 = {1, 2, 4, 5, 10, 20}
```

The program finds the positive divisors of the absolute value of the input.

### Example 4: Zero

**Input:**

```text
Enter an integer: 0
```

The original function returns zero divisors. However, the subsequent declaration `int D[nd]` has an invalid zero-length VLA.

This case must be handled before declaring the array.

---

## 5. Improved and Safer Version

The original implementation is useful for understanding functions, arrays, and `NULL`, but it has several limitations:

1. It does not check whether `scanf()` successfully receives an integer.
2. It attempts to declare a zero-length VLA when the input is zero.
3. Negating the minimum possible `int` value can cause signed integer overflow.
4. Its loop checks every integer from 1 to `n`, which can be slow for large inputs.
5. Very large arrays may exceed available stack memory.

The following version handles these issues and uses a more efficient divisor-search algorithm.

It uses `long long` for the magnitude so that the minimum `int` value can be handled safely. The divisor array also uses `long long`.

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

void PrintArray(const long long a[], int N);
int GetDivisors(long long n, long long D[]);

int main(void)
{
    int input;
    long long n;
    int nd;

    printf("Enter an integer: ");

    if(scanf("%d", &input) != 1)
    {
        printf("Invalid input!\n");
        return 1;
    }

    if(input == 0)
    {
        printf("Zero has infinitely many positive divisors.\n");
        return 0;
    }

    n = input;

    if(n < 0)
    {
        n = -n;
    }

    nd = GetDivisors(n, NULL);

    printf("%d has %d positive divisors.\n", input, nd);

    long long *D = malloc((size_t)nd * sizeof(*D));

    if(D == NULL)
    {
        printf("Memory allocation failed!\n");
        return 1;
    }

    GetDivisors(n, D);

    printf("Divisors of %d = {", input);
    PrintArray(D, nd);
    printf("}\n");

    free(D);

    return 0;
}

int GetDivisors(long long n, long long D[])
{
    if(n <= 0)
    {
        return 0;
    }

    int count = 0;

    for(long long i = 1; i <= n / i; i++)
    {
        if(n % i == 0)
        {
            if(D != NULL)
            {
                D[count] = i;
            }

            count++;

            long long other = n / i;

            if(other != i)
            {
                if(D != NULL)
                {
                    D[count] = other;
                }

                count++;
            }
        }
    }

    if(D != NULL)
    {
        // Sort the divisors in ascending order.
        for(int i = 0; i < count - 1; i++)
        {
            for(int j = 0; j < count - i - 1; j++)
            {
                if(D[j] > D[j + 1])
                {
                    long long temp = D[j];
                    D[j] = D[j + 1];
                    D[j + 1] = temp;
                }
            }
        }
    }

    return count;
}

void PrintArray(const long long a[], int N)
{
    for(int i = 0; i < N; i++)
    {
        printf("%lld", a[i]);

        if(i < N - 1)
        {
            printf(", ");
        }
    }
}
```

### Improvements in This Version

**1. Input validation**

```c
if(scanf("%d", &input) != 1)
```

Checks whether the user entered a valid integer.

**2. Handling zero**

```c
if(input == 0)
{
    printf("Zero has infinitely many positive divisors.\n");
    return 0;
}
```

Handles zero separately because it has infinitely many positive divisors.

**3. Safe negative-number handling**

```c
n = input;

if(n < 0)
{
    n = -n;
}
```

The value is first converted to `long long`, which can represent the positive magnitude of every `int` value.

**4. Dynamic memory allocation**

```c
long long *D = malloc((size_t)nd * sizeof(*D));
```

Instead of using a VLA, this version dynamically allocates enough memory to store the divisors.

**5. Checking memory allocation**

```c
if(D == NULL)
```

Checks whether memory allocation succeeded.

**6. More efficient divisor search**

```c
for(long long i = 1; i <= n / i; i++)
```

Instead of checking all integers from 1 to `n`, this version only searches up to the square root of `n`.

When a divisor is found, its corresponding pair is also found:

\[
i \times \frac{n}{i} = n
\]

For example, the divisors of 36 can be found in pairs:

```text
1 × 36
2 × 18
3 × 12
4 × 9
6 × 6
```

This reduces the search complexity from O(n) to O(√n).

**7. Sorting the results**

The divisor pairs are discovered from the smallest divisor upward, but their corresponding partners are larger. The sorting section arranges all divisors in ascending order.

**8. Releasing allocated memory**

```c
free(D);
```

Releases the dynamically allocated memory when it is no longer needed.

---

## 6. Important C Programming Concepts

| Concept | Explanation |
|---|---|
| Function prototype | Declares a function before its definition |
| `NULL` | Represents a null pointer |
| `int D[]` | Array parameter used to receive an array |
| `const int a[]` | Read-only array parameter |
| `return j` | Returns the number of divisors |
| `%` | Calculates the remainder of integer division |
| `sizeof()` | Calculates the size of a data type or object |
| VLA | Array whose size is determined at runtime |
| `malloc()` | Dynamically allocates memory |
| `free()` | Releases dynamically allocated memory |

---

## 7. Time and Space Complexity

### Original Implementation

The original function checks every integer from 1 to `n`.

| Property | Complexity |
|---|---|
| Time Complexity | O(n) per function call |
| Auxiliary Space | O(1) in counting mode |
| Divisor Storage | O(d) |

Here, `d` represents the number of divisors.

Since the original program calls `GetDivisors()` twice, its total search time is still O(n).

### Improved Implementation

The improved version checks divisors only up to the square root of `n`.

| Operation | Complexity |
|---|---|
| Finding divisor pairs | O(√n) |
| Sorting divisors | O(d²) |
| Total time | O(√n + d²) |
| Divisor storage | O(d) |

The sorting step can be replaced with a more efficient method if necessary.

---

## 8. Exercises

Try modifying the program to practice these concepts:

1. Write a function that returns only the number of divisors of an integer.
2. Write a function that calculates the sum of all positive divisors.
3. Find the largest divisor of an integer other than itself.
4. Determine whether a number is prime using `GetDivisors()`.
5. Find all divisors of a number in descending order.
6. Calculate the sum of all proper divisors (excluding the number itself).
7. Find all integers between 1 and 100 that have exactly six positive divisors.
8. Modify `GetDivisors()` to return the divisors through dynamic memory allocation.
9. Compare the execution time of the original O(n) algorithm and the improved O(√n) algorithm.

---

## 9. Learning Objectives

After completing this project, you should understand:

- How to define and call functions in C.
- How to return values from functions.
- How to pass arrays to functions.
- How to use `NULL` to indicate that no destination array is provided.
- How to use one function for counting and storing data.
- How to use the modulo operator to find divisors.
- How to declare arrays with runtime-determined sizes.
- How to allocate and release memory using `malloc()` and `free()`.
- How to improve an algorithm using mathematical properties.

---


## Conclusion

This project demonstrates how functions and arrays can work together to solve a mathematical problem.

The most interesting part is the use of `NULL` in `GetDivisors()`.

By passing `NULL`, the function counts divisors without storing them. By passing a valid array, the same function stores the divisors.

This technique is useful in C programming when a function needs to support different operations depending on whether the caller provides a destination array.

The project also introduces more efficient divisor searching using the mathematical relationship between divisor pairs.