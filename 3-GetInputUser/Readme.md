# 3 - User Input (scanf and printf)

## Overview

This project demonstrates how to receive an integer number from the user through the keyboard using the `scanf()` function and display the entered value using `printf()`.

It is a basic C programming exercise that introduces standard input and output operations.

## Learning Objectives

By completing this project, you will learn:

- How to declare an integer variable.
- How to display messages using `printf()`.
- How to receive user input using `scanf()`.
- What the address-of operator (`&`) does.
- How to use the `%d` format specifier.
- How to display a variable's value.

## Source Code

```c
#include <stdio.h>

int main(int argc, char const *argv[])
{
    /* code */
    int n;

    printf("Please an entern integer number : ");

    // First input for scanf is type of input and second input is variable for save value from user
    scanf("%d", &n);

    printf("\n");

    printf("User enter This number : %d \n", n);

    return 0;
}
```

## Code Explanation

### 1. Include the Standard Input/Output Library

```c
#include <stdio.h>
```

The `stdio.h` library provides standard input and output functions, including:

- `printf()` – Displays information on the screen.
- `scanf()` – Receives input from the user.

### 2. Main Function

```c
int main(int argc, char const *argv[])
```

The `main()` function is the entry point of the program.

- `argc` represents the number of command-line arguments.
- `argv` contains the command-line arguments.

These parameters are not used in this project, but they can be useful in more advanced programs.

### 3. Declare an Integer Variable

```c
int n;
```

This statement declares an integer variable named `n`.

The variable will store the number entered by the user.

### 4. Display an Input Message

```c
printf("Please enter an integer number: ");
```

The `printf()` function displays a message asking the user to enter an integer.

### 5. Receive User Input

```c
scanf("%d", &n);
```

The `scanf()` function reads data entered by the user.

- `%d` specifies that the input must be an integer.
- `&n` provides the memory address of variable `n`, allowing `scanf()` to store the entered value in it.

**Important:** The `&` operator is called the address-of operator.

### 6. Print a New Line

```c
printf("\n");
```

The `\n` escape sequence moves the cursor to the next line.

### 7. Display the Entered Number

```c
printf("User entered this number: %d\n", n);
```

The `%d` format specifier is replaced with the value stored in `n`.

### 8. Return Statement

```c
return 0;
```

Indicates that the program finished successfully.

## Example Output

```text
Please enter an integer number: 25

User entered this number: 25
```

## Important Concepts

| Concept | Description |
|---|---|
| `int` | Integer data type |
| `printf()` | Displays output |
| `scanf()` | Receives user input |
| `%d` | Integer format specifier |
| `&` | Address-of operator |
| `\n` | New line |
| `return 0` | Successful program termination |

## Practice Exercises

1. Modify the program to receive two integer numbers.
2. Display the sum of the two entered numbers.
3. Receive a floating-point number using `float` and `%f`.
4. Receive a character using `char` and `%c`.
5. Display the entered number multiplied by 2.

## Important Notes

- Always use `&` with ordinary variables when reading values using `scanf()`, for example: `scanf("%d", &n);`.
- The format specifier must match the variable type.
- The original prompt contains spelling mistakes. A better version is: `Please enter an integer number:`.
- In a more robust program, check the return value of `scanf()` to ensure that the user entered valid input.

Example:

```c
if (scanf("%d", &n) == 1)
{
    printf("You entered: %d\n", n);
}
else
{
    printf("Invalid input!\n");
}
```

## Summary

This project introduces one of the most important concepts in C programming: **User Input**.

With `scanf()` and `printf()`, you can build interactive programs that receive information from users, process it, and display results.