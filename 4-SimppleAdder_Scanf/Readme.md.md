# 4- C Programming – Adding Two Integer Numbers

## 1. Introduction

This is a simple C programming example that demonstrates how to receive two integer numbers from the user, add them together, and display the result.

This program is designed for beginners who are learning the fundamentals of C programming.

## 2. Source Code

```c
#include "stdio.h"

int main(int argc, char const *argv[])
{
    int a, b, c;

    // Get first number from user
    printf("Please enter first integer number: ");
    scanf("%d", &a);

    printf("\n");

    // Get second number from user
    printf("Please enter second integer number: ");
    scanf("%d", &b);

    // Add two numbers
    c = a + b;

    // Display the result
    printf("Result: %d + %d = %d\n", a, b, c);

    return 0;
}
```

## 3. Code Explanation

### 3.1. Including the Standard I/O Library

```c
#include "stdio.h"
```

The `stdio.h` header file provides standard input and output functions.

Some commonly used functions are:

- `printf()` – Displays information on the screen.
- `scanf()` – Receives input from the user.

**Note:** The standard syntax is `#include <stdio.h>`.

### 3.2. Main Function

```c
int main(int argc, char const *argv[])
```

The `main()` function is the entry point of a C program. Program execution starts here.

- `int`: Specifies that the function returns an integer.
- `argc`: Represents the number of command-line arguments.
- `argv`: Contains the command-line arguments.

### 3.3. Declaring Variables

```c
int a, b, c;
```

Three integer variables are declared:

| Variable | Description |
|---|---|
| `a` | Stores the first number |
| `b` | Stores the second number |
| `c` | Stores the sum of both numbers |

The `int` data type is used for storing whole numbers.

### 3.4. Receiving User Input

```c
printf("Please enter first integer number: ");
scanf("%d", &a);
```

`printf()` displays a message asking the user to enter a number.

`scanf()` reads the user's input and stores it in variable `a`.

**Understanding `%d` and `&`:**

- `%d`: Specifies that the input is an integer.
- `&a`: Provides the memory address of variable `a`, allowing `scanf()` to store the entered value there.

The same process is repeated for variable `b`.

### 3.5. Adding Two Numbers

```c
c = a + b;
```

The `+` operator performs addition.

The values stored in `a` and `b` are added together, and the result is stored in `c`.

For example:

```c
a = 10;
b = 20;
c = a + b;
```

The result is `30`.

### 3.6. Displaying the Result

```c
printf("Result: %d + %d = %d\n", a, b, c);
```

This statement displays the calculation and its result.

The three `%d` format specifiers are replaced with the values of `a`, `b`, and `c`, respectively.

### 3.7. Returning from Main

```c
return 0;
```

This statement terminates the program and returns `0` to the operating system, indicating successful execution.

## 4. Program Execution Example

**Input:**

```text
Please enter first integer number: 10

Please enter second integer number: 20
```

**Output:**

```text
Result: 10 + 20 = 30
```

## 5. C Programming Concepts Learned

By studying this example, you will learn:

1. Including header files.
2. Understanding the `main()` function.
3. Declaring integer variables.
4. Using `printf()` for output.
5. Using `scanf()` for input.
6. Understanding format specifiers such as `%d`.
7. Understanding the address operator `&`.
8. Performing arithmetic operations.
9. Displaying calculated results.
10. Using `return 0`.

## 6. Compile and Run

If you have GCC installed, you can compile the program using:

```bash
gcc main.c -o addition
```

Run on Windows:

```powershell
.\addition.exe
```

Run on Linux:

```bash
./addition
```

## 7. Practice Exercises

Try modifying the program to improve your understanding:

- Exercise 1: Change the program to subtract two numbers.
- Exercise 2: Add multiplication and division operations.
- Exercise 3: Receive three integer numbers and calculate their sum.
- Exercise 4: Display the average of two numbers.
- Exercise 5: Use `float` instead of `int` to work with decimal numbers.

---

**Learning Objective:** Understand basic input/output operations, integer variables, arithmetic operators, and the execution flow of a simple C program.