# 13-Fibonacci Sequence in C — Iterative vs Recursive

## 1. Introduction

This program calculates and displays the Fibonacci sequence using two different approaches:

1. **Iterative approach:** Uses a `for` loop to calculate Fibonacci numbers.
2. **Recursive approach:** Uses a function that calls itself to calculate Fibonacci numbers.

The program displays the first 45 Fibonacci numbers using both methods.

It also includes a commented-out section for estimating the Golden Ratio using the ratio of consecutive Fibonacci numbers.

This exercise introduces important programming concepts such as:

- Functions
- Function prototypes
- Iteration
- Recursion
- Base cases
- Algorithm efficiency
- Integer overflow
- Golden Ratio

---

## 2. Source Code

```c
#include <stdio.h>

int Fibo1(int n);
int Fibo(int n);

int main()
{
    int n;
    int N = 45;

    printf("Using Function: Fibo1\n");

    for(n = 0; n < N; n++)
    {
        printf("F(%d) = %d\n", n, Fibo1(n));
    }

    printf("\n");

    printf("Using Function: Fibo\n");

    for(n = 0; n < N; n++)
    {
        printf("F(%d) = %d\n", n, Fibo(n));
    }

    printf("\n");

    /*
    printf("Estimating Golden Ratio:\n");

    for(n = 1; n < N; n++)
    {
        float r = (float)Fibo1(n + 1) / Fibo1(n);

        printf("R(%d) = F(%d)/F(%d) = %f\n",
               n, n + 1, n, r);
    }

    printf("\n");
    */

    return 0;
}

int Fibo1(int n)
{
    if(n == 0) return 0;
    if(n == 1) return 1;

    int a = 0;
    int b = 1;
    int i;
    int c;

    for(i = 2; i <= n; i++)
    {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
}

int Fibo(int n)
{
    if(n == 0) return 0;
    if(n == 1) return 1;

    return Fibo(n - 1) + Fibo(n - 2);
}
```

---

## 3. Mathematical Background

### 3.1. What Is the Fibonacci Sequence?

The Fibonacci sequence is a sequence of integers in which each number is the sum of the two previous numbers.

The sequence starts with:

\[
F(0)=0
\]

\[
F(1)=1
\]

Every subsequent number is calculated using:

\[
F(n)=F(n-1)+F(n-2)
\]

For example:

\[
F(2)=F(1)+F(0)=1
\]

\[
F(3)=F(2)+F(1)=2
\]

\[
F(4)=F(3)+F(2)=3
\]

The beginning of the sequence is:

\[
0,1,1,2,3,5,8,13,21,34,55,89,\ldots
\]

### 3.2. Fibonacci Sequence Table

| n | F(n) |
|---:|---:|
| 0 | 0 |
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 5 |
| 6 | 8 |
| 7 | 13 |
| 8 | 21 |
| 9 | 34 |
| 10 | 55 |

### 3.3. Recursive Mathematical Definition

The Fibonacci sequence is defined by two base conditions and one recursive relationship:

\[
F(n)=
\begin{cases}
0 & n=0\\
1 & n=1\\
F(n-1)+F(n-2) & n\geq2
\end{cases}
\]

The first two conditions are called **base cases**.

The third condition defines how each new Fibonacci number is calculated.

---

## 4. Understanding the C Program

### 4.1. Including the Standard Library

```c
#include <stdio.h>
```

The `stdio.h` library provides standard input and output functions.

This program uses `printf()` to display the Fibonacci numbers.

### 4.2. Function Prototypes

```c
int Fibo1(int n);
int Fibo(int n);
```

These lines are function prototypes.

They inform the compiler that two functions exist:

| Function | Purpose |
|---|---|
| `Fibo1()` | Calculates Fibonacci numbers iteratively |
| `Fibo()` | Calculates Fibonacci numbers recursively |

Both functions:

- Receive an integer argument `n`.
- Return an integer result.

### 4.3. Main Function

```c
int main()
{
    int n;
    int N = 45;
```

The variable `n` is used as a loop counter.

The variable `N` determines how many Fibonacci numbers will be displayed.

Since:

```c
int N = 45;
```

and the loops use:

```c
for(n = 0; n < N; n++)
```

the program displays Fibonacci numbers from index 0 through index 44.

### 4.4. Calculating Fibonacci Numbers Using Fibo1()

```c
printf("Using Function: Fibo1\n");

for(n = 0; n < N; n++)
{
    printf("F(%d) = %d\n", n, Fibo1(n));
}
```

This loop calls `Fibo1()` for every index from 0 to 44.

For each iteration:

1. The current value of `n` is passed to `Fibo1()`.
2. The function calculates the corresponding Fibonacci number.
3. `printf()` displays the index and result.

For example:

```c
Fibo1(5)
```

returns:

```text
5
```

### 4.5. Calculating Fibonacci Numbers Using Fibo()

```c
printf("Using Function: Fibo\n");

for(n = 0; n < N; n++)
{
    printf("F(%d) = %d\n", n, Fibo(n));
}
```

This loop performs the same calculation using the recursive function.

The output should match the results produced by `Fibo1()` for values that can be represented correctly by the return type.

However, the recursive method requires significantly more function calls.

---

## 5. Understanding the Iterative Function — Fibo1()

```c
int Fibo1(int n)
{
    if(n == 0) return 0;
    if(n == 1) return 1;

    int a = 0;
    int b = 1;
    int i;
    int c;

    for(i = 2; i <= n; i++)
    {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
}
```

This function calculates Fibonacci numbers using iteration.

### Step 1: Handle the First Two Numbers

```c
if(n == 0) return 0;
if(n == 1) return 1;
```

These conditions handle the first two elements of the Fibonacci sequence.

There is no need to execute the loop for these values.

### Step 2: Initialize Variables

```c
int a = 0;
int b = 1;
int i;
int c;
```

The variables have the following roles:

| Variable | Purpose |
|---|---|
| `a` | Previous Fibonacci number |
| `b` | Current Fibonacci number |
| `c` | Newly calculated Fibonacci number |
| `i` | Loop counter |

Initially:

\[
a=0,\quad b=1
\]

### Step 3: Calculate the Next Number

```c
for(i = 2; i <= n; i++)
{
    c = a + b;
    a = b;
    b = c;
}
```

At each iteration, the program performs three operations:

**1. Calculate the next Fibonacci number**

```c
c = a + b;
```

**2. Move the current value into the previous variable**

```c
a = b;
```

**3. Update the current Fibonacci number**

```c
b = c;
```

For example, calculating `Fibo1(5)`:

| i | a | b | c |
|---:|---:|---:|---:|
| Initial | 0 | 1 | - |
| 2 | 1 | 1 | 1 |
| 3 | 1 | 2 | 2 |
| 4 | 2 | 3 | 3 |
| 5 | 3 | 5 | 5 |

Therefore:

\[
F(5)=5
\]

### Step 4: Return the Result

```c
return c;
```

After completing the loop, `c` contains the requested Fibonacci number.

The function returns this value to the caller.

---

## 6. Understanding the Recursive Function — Fibo()

```c
int Fibo(int n)
{
    if(n == 0) return 0;
    if(n == 1) return 1;

    return Fibo(n - 1) + Fibo(n - 2);
}
```

This function calculates Fibonacci numbers using recursion.

### 6.1. What Is Recursion?

Recursion is a programming technique in which a function calls itself.

Instead of using a loop to calculate the next Fibonacci number, the function calls itself with smaller arguments.

For example:

```c
Fibo(5)
```

is equivalent to:

\[
F(5)=F(4)+F(3)
\]

And:

\[
F(4)=F(3)+F(2)
\]

\[
F(3)=F(2)+F(1)
\]

The function continues calling itself until it reaches the base cases.

### 6.2. Base Cases

```c
if(n == 0) return 0;
if(n == 1) return 1;
```

These are the stopping conditions of recursion.

Without base cases, the function would continue calling itself indefinitely until the program runs out of stack space.

### 6.3. Recursive Case

```c
return Fibo(n - 1) + Fibo(n - 2);
```

This statement calculates the current Fibonacci number by adding the previous two Fibonacci numbers.

For example:

\[
F(5)=F(4)+F(3)
\]

\[
=3+2=5
\]

### 6.4. Recursive Call Tree

The calculation of `Fibo(5)` can be represented as:

```text
                    Fibo(5)
                   /       \
              Fibo(4)     Fibo(3)
              /    \       /    \
         Fibo(3) Fibo(2) Fibo(2) Fibo(1)
          /   \
      Fibo(2) Fibo(1)
       /   \
   Fibo(1) Fibo(0)
```

Each function call creates additional function calls until the base cases are reached.

Notice that some values, such as `Fibo(3)` and `Fibo(2)`, are calculated multiple times.

This repeated work is the main performance problem of the simple recursive implementation.

---

## 7. Comparing Iteration and Recursion

Both functions calculate the same mathematical sequence, but their implementation and performance are different.

| Feature | Fibo1() | Fibo() |
|---|---|---|
| Method | Iterative | Recursive |
| Main technique | `for` loop | Function calls |
| Base cases | Yes | Yes |
| Repeated calculations | No | Yes |
| Time complexity | O(n) | O(2ⁿ) approximately |
| Auxiliary space | O(1) | O(n) stack depth |
| Performance | Fast | Slow for large n |
| Code structure | More procedural | More mathematical |

### 7.1. Time Complexity of Fibo1()

The iterative implementation executes the loop approximately `n - 1` times.

Therefore:

\[
T(n)=O(n)
\]

This means execution time increases approximately linearly with the input.

### 7.2. Time Complexity of Fibo()

The recursive implementation calls itself twice for most values of `n`.

Its time complexity follows:

\[
T(n)=T(n-1)+T(n-2)+O(1)
\]

The resulting time complexity is exponential:

\[
T(n)=O(\varphi^n)
\]

where:

\[
\varphi=\frac{1+\sqrt{5}}{2}
\]

It is also commonly described using the looser upper bound \(O(2^n)\).

This makes the simple recursive approach inefficient for large values of `n`.

---

## 8. Estimating the Golden Ratio

The program contains a commented-out section for estimating the Golden Ratio.

```c
/*
printf("Estimating Golden Ratio:\n");

for(n = 1; n < N; n++)
{
    float r = (float)Fibo1(n + 1) / Fibo1(n);

    printf("R(%d) = F(%d)/F(%d) = %f\n",
           n, n + 1, n, r);
}

printf("\n");
*/
```

### 8.1. What Is the Golden Ratio?

The Golden Ratio is a mathematical constant represented by the Greek letter:

\[
\varphi
\]

Its value is approximately:

\[
\varphi\approx1.6180339887
\]

It can be calculated using:

\[
\varphi=\frac{1+\sqrt{5}}{2}
\]

### 8.2. Relationship Between Fibonacci Numbers and the Golden Ratio

As Fibonacci numbers become larger, the ratio of two consecutive numbers approaches the Golden Ratio.

\[
\lim_{n\to\infty}\frac{F(n+1)}{F(n)}=\varphi
\]

For example:

| n | F(n) | F(n+1) | Ratio |
|---:|---:|---:|---:|
| 1 | 1 | 1 | 1.000000 |
| 2 | 1 | 2 | 2.000000 |
| 3 | 2 | 3 | 1.500000 |
| 4 | 3 | 5 | 1.666667 |
| 5 | 5 | 8 | 1.600000 |
| 6 | 8 | 13 | 1.625000 |
| 7 | 13 | 21 | 1.615385 |
| 8 | 21 | 34 | 1.619048 |
| 9 | 34 | 55 | 1.617647 |

The ratio gets closer to approximately 1.618 as `n` increases.

### 8.3. Understanding the Type Conversion

```c
float r = (float)Fibo1(n + 1) / Fibo1(n);
```

The expression:

```c
(float)Fibo1(n + 1)
```

converts the first Fibonacci result into a floating-point value.

This is important because integer division would discard the fractional part.

For example:

```c
5 / 3
```

produces:

```text
1
```

But:

```c
(float)5 / 3
```

produces approximately:

```text
1.666667
```

**Important:** The original Golden Ratio loop uses `Fibo1(n + 1)` while `n < N`. With `N = 45`, the last iteration requests `Fibo1(45)`, which exceeds the range of a typical 32-bit signed `int`. The calculation can therefore overflow.

---

## 9. Integer Overflow and Data Types

The original functions return:

```c
int
```

On common systems, a signed 32-bit integer can represent values from:

\[
-2^{31}\text{ to }2^{31}-1
\]

The Fibonacci sequence eventually exceeds this range.

Some relevant values are:

| n | F(n) |
|---:|---:|
| 45 | 1,134,903,170 |
| 46 | 1,836,311,903 |
| 47 | 2,971,215,073 |
| 48 | 4,807,526,976 |

A typical 32-bit signed `int` can represent `F(46)`, but cannot represent `F(47)`.

Therefore, calculating Fibonacci numbers beyond this range using `int` causes signed integer overflow, which is undefined behavior in C.

For larger values, consider:

- `long long` for a larger integer range.
- Arbitrary-precision integer libraries for very large Fibonacci numbers.

Changing the return type to `long long` allows the sequence to be calculated up to `F(92)` on common systems with 64-bit `long long`.

---

## 10. Improved Recursive Implementation Using Memoization

The simple recursive implementation repeatedly calculates the same values.

One way to improve it is memoization: storing previously calculated results and reusing them.

Example:

```c
#include <stdio.h>

#define N 45

long long memo[N];

long long FiboMemo(int n)
{
    if(n == 0) return 0;
    if(n == 1) return 1;

    if(memo[n] != -1)
    {
        return memo[n];
    }

    memo[n] = FiboMemo(n - 1) + FiboMemo(n - 2);

    return memo[n];
}

int main()
{
    for(int i = 0; i < N; i++)
    {
        memo[i] = -1;
    }

    for(int n = 0; n < N; n++)
    {
        printf("F(%d) = %lld\n", n, FiboMemo(n));
    }

    return 0;
}
```

This approach avoids repeated calculations.

Its time complexity becomes:

\[
O(n)
\]

However, it still uses recursive function calls and additional memory for the memoization array.

---

## 11. Example Output

For the first 10 Fibonacci numbers, the expected output is:

```text
Using Function: Fibo1
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

Using Function: Fibo
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34
```

The complete original program prints 45 entries for each function.

For the original `int` implementation, results from `F(47)` onward cannot be relied upon on typical 32-bit `int` systems because of signed integer overflow.

---

## 12. Important Programming Concepts Learned

This exercise introduces the following concepts:

1. **Functions:** Creating reusable blocks of code.
2. **Function prototypes:** Declaring functions before their definitions.
3. **Iteration:** Repeating calculations using a loop.
4. **Recursion:** A function calling itself.
5. **Base cases:** Conditions that terminate recursive calls.
6. **Recursive cases:** Breaking a problem into smaller problems.
7. **Variable updates:** Maintaining previous and current values.
8. **Algorithm complexity:** Understanding time and memory requirements.
9. **Memoization:** Storing previously calculated results.
10. **Type conversion:** Converting integer results to floating-point values.
11. **Integer overflow:** Understanding the limitations of fixed-width integer types.
12. **Golden Ratio:** Exploring the mathematical relationship between Fibonacci numbers and the Golden Ratio.

---

## 13. Practice Exercises

### Exercise 1: Change the Number of Fibonacci Elements

Modify the program so the user can enter the number of Fibonacci elements to display.

### Exercise 2: Compare Execution Time

Measure the execution time of `Fibo1()` and `Fibo()` for different values of `n`.

Observe how quickly the recursive implementation becomes slower.

### Exercise 3: Calculate Fibonacci Using while

Rewrite `Fibo1()` using a `while` loop instead of a `for` loop.

### Exercise 4: Implement Memoization

Modify the recursive function to store previously calculated Fibonacci values.

### Exercise 5: Calculate the Golden Ratio

Enable the Golden Ratio section and display the ratio of consecutive Fibonacci numbers.

### Exercise 6: Use long long

Change the return types and variables from `int` to `long long`.

Determine the largest Fibonacci index that can be represented safely.

### Exercise 7: Print Fibonacci Numbers in Reverse

Display the first N Fibonacci numbers in reverse order.

---

## 14. Compile and Run

Using GCC:

```bash
gcc main.c -o fibonacci
```

Run on Linux/macOS:

```bash
./fibonacci
```

Run on Windows:

```powershell
.\fibonacci.exe
```

No additional math library is required for the main program because the Golden Ratio section uses no `math.h` functions.

---

## 15. Learning Objective

The main objective of this exercise is to understand two fundamental approaches to solving problems in programming: iteration and recursion.

By completing this exercise, you will learn how to:

- Implement a mathematical sequence using a loop.
- Implement the same sequence using recursion.
- Understand recursive function calls and base cases.
- Compare algorithm performance.
- Recognize repeated calculations.
- Improve recursive algorithms using memoization.
- Understand integer limitations and overflow.
- Explore the relationship between Fibonacci numbers and the Golden Ratio.

These concepts are fundamental to algorithm design, data structures, mathematical programming, and software optimization.

---
