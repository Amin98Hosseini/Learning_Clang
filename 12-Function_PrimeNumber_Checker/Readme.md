# 12-Prime Number Checker in C

## 1. Introduction

This program checks whether an integer number is a prime number or not.

A prime number is a positive integer greater than 1 that has exactly two positive divisors:

- 1
- The number itself

For example:

- 2 is a prime number.
- 3 is a prime number.
- 7 is a prime number.
- 9 is not a prime number because it is divisible by 3.
- 15 is not a prime number because it is divisible by 3 and 5.

The program repeatedly asks the user to enter an integer and checks whether it is prime.

The program uses a separate function called `IsPrime()` to perform the prime-number calculation.

The input process continues while the entered number is greater than zero.

---

## 2. Source Code

```c
#include <stdio.h>
#include <math.h>

#define TRUE 1
#define FALSE 0

int IsPrime(int a);

int main()
{
    int a;

    do
    {
        printf("Enter an integer: ");
        scanf("%d", &a);

        if(IsPrime(a))
        {
            printf("%d is a PRIME number.\n", a);
        }
        else
        {
            printf("%d is a NOT PRIME number.\n", a);
        }

        printf("\n");

    } while (a > 0);

    return 0;
}

int IsPrime(int a)
{
    int prime = TRUE;
    int i;

    for(i = 2; i <= sqrt(a); i++)
    {
        if(a % i == 0)
        {
            prime = FALSE;
            break;
        }
    }

    return prime;
}
```

---

## 3. Mathematical Background

### 3.1. What Is a Prime Number?

A prime number is an integer greater than 1 that is divisible only by 1 and itself.

Mathematically, an integer \(a\) is prime if:

\[
a>1
\]

and its only positive divisors are:

\[
1 \quad \text{and} \quad a
\]

Examples:

| Number | Divisors | Result |
|---|---|---|
| 2 | 1, 2 | Prime |
| 3 | 1, 3 | Prime |
| 4 | 1, 2, 4 | Not Prime |
| 5 | 1, 5 | Prime |
| 9 | 1, 3, 9 | Not Prime |
| 11 | 1, 11 | Prime |

**Important:** The number 1 is not a prime number because it has only one positive divisor.

Zero and negative integers are also not prime numbers.

### 3.2. Checking Divisibility Using Modulo

The modulo operator `%` returns the remainder of an integer division.

For example:

```c
10 % 2 = 0
10 % 3 = 1
15 % 5 = 0
```

If:

\[
a \bmod i=0
\]

then `a` is divisible by `i`.

Therefore, if a number has a divisor other than 1 and itself, it is not prime.

### 3.3. Why Do We Check Only Up to the Square Root?

A simple prime-checking algorithm could test every integer from 2 to `a - 1`.

However, this is unnecessary.

If a number \(a\) has a divisor greater than its square root, it must also have a corresponding divisor smaller than its square root.

Therefore, it is sufficient to check:

\[
2\leq i\leq\sqrt{a}
\]

For example, consider 36:

\[
36=6\times6
\]

Its divisors can be examined in pairs:

\[
2\times18,\quad 3\times12,\quad 4\times9,\quad 6\times6
\]

Once we reach the square root, all possible divisor pairs have been covered.

This optimization reduces the number of iterations significantly.

---

## 4. Understanding the C Program

### 4.1. Including Header Files

```c
#include <stdio.h>
#include <math.h>
```

The program uses two standard libraries.

**stdio.h**

Provides input and output functions:

- `printf()`
- `scanf()`

**math.h**

Provides mathematical functions.

In this program, the following function is used:

```c
sqrt(a)
```

The `sqrt()` function calculates the square root of a number.

For example:

```c
sqrt(25) = 5
sqrt(36) = 6
sqrt(49) = 7
```

### 4.2. Defining TRUE and FALSE

```c
#define TRUE 1
#define FALSE 0
```

These are preprocessor macros.

They make the program easier to read by replacing numeric values with meaningful names.

- `TRUE` represents 1.
- `FALSE` represents 0.

In C, zero is interpreted as false, while any nonzero value is interpreted as true.

### 4.3. Function Prototype

```c
int IsPrime(int a);
```

This line is called a function prototype.

It informs the compiler that a function named `IsPrime` exists.

The function:

- Receives one integer argument called `a`.
- Returns an integer value.

The return value represents the result:

- `1`: Prime
- `0`: Not prime

A function prototype allows us to define the actual function after `main()`.

### 4.4. Main Function

```c
int main()
{
    int a;
```

The `main()` function is the entry point of the program.

The variable `a` stores the integer entered by the user.

### 4.5. Using the do-while Loop

```c
do
{
    printf("Enter an integer: ");
    scanf("%d", &a);

    /* Prime checking */

} while (a > 0);
```

The `do-while` loop executes its body first and checks the condition afterward.

This means the program asks for at least one input, even if the first number is zero or negative.

The loop continues while:

\[
a>0
\]

If the user enters zero or a negative number, the loop terminates after processing that input.

**Important:** The original program still calls `IsPrime()` for zero and negative numbers before exiting the loop. This creates a logical issue that will be discussed in the improvement section.

### 4.6. Reading an Integer with scanf()

```c
scanf("%d", &a);
```

The `scanf()` function reads an integer from the user.

- `%d` specifies an integer input.
- `&a` provides the memory address of variable `a`.

The `&` operator is called the address-of operator.

### 4.7. Calling the IsPrime() Function

```c
if(IsPrime(a))
{
    printf("%d is a PRIME number.\n", a);
}
else
{
    printf("%d is a NOT PRIME number.\n", a);
}
```

Here, the program calls the `IsPrime()` function and passes the entered number as an argument.

If the function returns a nonzero value, the `if` condition is true.

If it returns zero, the `else` block executes.

This is an example of using a function's return value directly in a conditional statement.

### 4.8. Implementing the IsPrime() Function

```c
int IsPrime(int a)
{
    int prime = TRUE;
    int i;

    for(i = 2; i <= sqrt(a); i++)
    {
        if(a % i == 0)
        {
            prime = FALSE;
            break;
        }
    }

    return prime;
}
```

This function contains the main prime-number algorithm.

Let's examine it step by step.

**Step 1: Initialize the result**

```c
int prime = TRUE;
```

At the beginning, the program assumes that the number is prime.

If a divisor is found, this value changes to `FALSE`.

**Step 2: Declare the loop variable**

```c
int i;
```

The variable `i` is used to test possible divisors.

**Step 3: Check possible divisors**

```c
for(i = 2; i <= sqrt(a); i++)
```

The loop starts at 2 and continues up to the square root of `a`.

It checks whether any integer in this range divides the number exactly.

**Step 4: Check the remainder**

```c
if(a % i == 0)
```

If the remainder is zero, the number is divisible by `i`.

Therefore, the number is not prime.

**Step 5: Change the result**

```c
prime = FALSE;
```

The program marks the number as not prime.

**Step 6: Exit the loop**

```c
break;
```

Once a divisor has been found, there is no need to continue checking other values.

The `break` statement immediately terminates the loop.

**Step 7: Return the result**

```c
return prime;
```

The function returns the final result to the caller.

- `TRUE` means prime.
- `FALSE` means not prime.

---

## 5. Example Execution

### Example Input

```text
Enter an integer: 7
Enter an integer: 10
Enter an integer: 13
Enter an integer: 21
Enter an integer: 0
```

### Expected Output

```text
Enter an integer: 7
7 is a PRIME number.

Enter an integer: 10
10 is a NOT PRIME number.

Enter an integer: 13
13 is a PRIME number.

Enter an integer: 21
21 is a NOT PRIME number.

Enter an integer: 0
0 is a PRIME number.
```

**Important:** The final output above demonstrates a bug in the original program. The function returns `TRUE` for 0 because its loop never executes. The same problem occurs for 1 and negative numbers.

The corrected program should identify all numbers less than or equal to 1 as not prime.

---

## 6. Important Programming Concepts Learned

This exercise introduces several important C programming concepts:

1. **Functions:** Dividing a program into reusable parts.
2. **Function prototype:** Declaring a function before using it.
3. **Function arguments:** Passing values to a function.
4. **Return values:** Returning a result from a function.
5. **Macros:** Defining constants with `#define`.
6. **do-while loop:** Executing a loop at least once.
7. **for loop:** Repeating operations with a controlled iteration variable.
8. **Modulo operator:** Checking whether a number is divisible by another number.
9. **Conditional statements:** Using `if` and `else`.
10. **Break statement:** Exiting a loop early.
11. **Math library:** Using `sqrt()` from `math.h`.
12. **Algorithm optimization:** Reducing the number of divisor checks.

---

## 7. Important Notes and Possible Improvements

The original code is a useful learning example, but it has several issues that should be corrected for reliable behavior.

### 7.1. Handle Numbers Less Than or Equal to 1

The current function initializes:

```c
int prime = TRUE;
```

For values such as 0, 1, and negative numbers, the `for` loop does not execute.

Consequently, the function incorrectly returns `TRUE`.

The solution is to add an initial condition:

```c
int IsPrime(int a)
{
    if(a <= 1)
    {
        return FALSE;
    }

    int i;

    for(i = 2; i <= sqrt(a); i++)
    {
        if(a % i == 0)
        {
            return FALSE;
        }
    }

    return TRUE;
}
```

Now, all numbers less than or equal to 1 are correctly classified as not prime.

### 7.2. Avoid Calling IsPrime() for the Exit Value

The original `do-while` loop checks the number before evaluating the termination condition.

A better approach is:

```c
do
{
    printf("Enter an integer: ");
    scanf("%d", &a);

    if(a <= 0)
    {
        break;
    }

    if(IsPrime(a))
    {
        printf("%d is a PRIME number.\n", a);
    }
    else
    {
        printf("%d is NOT a PRIME number.\n", a);
    }

} while(a > 0);
```

This version uses zero or a negative number as an exit command and does not perform prime checking on the exit value.

### 7.3. Avoid Unnecessary Square Root Calculations

The original loop uses:

```c
for(i = 2; i <= sqrt(a); i++)
```

A more efficient alternative is:

```c
for(i = 2; i <= a / i; i++)
```

For positive integers, this condition is equivalent to checking up to the square root, without repeatedly calling `sqrt()`.

It also avoids multiplication overflow that could occur in an expression such as `i * i <= a`.

### 7.4. Check scanf() Return Value

The original program assumes that the user always enters a valid integer.

A safer input statement is:

```c
if(scanf("%d", &a) != 1)
{
    printf("Invalid input.\n");
    return 1;
}
```

This checks whether `scanf()` successfully read an integer.

### 7.5. Linking the Math Library

When using GCC on Linux, the `math.h` functions may require linking with the math library:

```bash
gcc main.c -o prime_checker -lm
```

The `-lm` option links the mathematical library.

---

## 8. Improved Complete Version

The following version includes the main improvements:

```c
#include <stdio.h>

#define TRUE 1
#define FALSE 0

int IsPrime(int a);

int main()
{
    int a;

    do
    {
        printf("Enter an integer (0 or negative to exit): ");

        if(scanf("%d", &a) != 1)
        {
            printf("Invalid input.\n");
            return 1;
        }

        if(a <= 0)
        {
            break;
        }

        if(IsPrime(a))
        {
            printf("%d is a PRIME number.\n", a);
        }
        else
        {
            printf("%d is NOT a PRIME number.\n", a);
        }

        printf("\n");

    } while(a > 0);

    printf("Program terminated.\n");

    return 0;
}

int IsPrime(int a)
{
    if(a <= 1)
    {
        return FALSE;
    }

    for(int i = 2; i <= a / i; i++)
    {
        if(a % i == 0)
        {
            return FALSE;
        }
    }

    return TRUE;
}
```

This version:

- Correctly handles numbers less than or equal to 1.
- Uses zero or negative input to exit.
- Checks whether integer input was successful.
- Avoids unnecessary calls to `sqrt()`.
- Returns immediately when a divisor is found.

---

## 9. Compile and Run

### Using GCC

For the original program:

```bash
gcc main.c -o prime_checker -lm
```

Run on Linux/macOS:

```bash
./prime_checker
```

Run on Windows:

```powershell
.\prime_checker.exe
```

For the improved version above, the `math.h` library is no longer needed, so compile it without `-lm`:

```bash
gcc main.c -o prime_checker
```

### Using Visual Studio Code

1. Open the project folder.
2. Open `main.c`.
3. Open the integrated terminal.
4. Compile the program using GCC.
5. Run the executable.
6. Enter positive integers to test them.
7. Enter zero or a negative integer to exit.

---

## 10. Practice Exercises

Try these exercises to improve your understanding.

### Exercise 1: Check Even and Odd Numbers

Write a function called `IsEven()` that returns `TRUE` if a number is even and `FALSE` otherwise.

### Exercise 2: Count Prime Numbers

Modify the program to count how many prime numbers the user enters before exiting.

### Exercise 3: Print Prime Numbers in a Range

Write a program that receives two integers and prints all prime numbers between them.

### Exercise 4: Find the Next Prime Number

Write a function that receives an integer and returns the next prime number greater than it.

### Exercise 5: Calculate the Number of Divisors

Modify `IsPrime()` or create another function that counts the positive divisors of a given integer.

### Exercise 6: Optimize Prime Checking

Compare these two conditions:

```c
i <= sqrt(a)
```

and:

```c
i <= a / i
```

Understand why they allow the algorithm to avoid checking every number up to `a - 1`.

---

## 11. Learning Objective

The main objective of this exercise is to understand how to create and use functions in C to solve a mathematical problem.

By completing this exercise, you learn how to:

- Separate a calculation into a reusable function.
- Pass arguments to functions.
- Return results using `return`.
- Use loops to test mathematical conditions.
- Apply the modulo operator to check divisibility.
- Optimize an algorithm using the square-root property.
- Combine functions, loops, and conditional statements.

These concepts are fundamental to developing structured, reusable, and efficient C programs.

---
