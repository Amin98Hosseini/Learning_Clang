# 1 - Hello World in C

## Overview

This is a simple introductory project in the C programming language.

The program displays the message `Hello World!` in the console using the `printf()` function.

This is usually the first program written when learning a new programming language. It introduces the basic structure of a C program and demonstrates how to display text in the terminal.

## Learning Objectives

By studying this example, you will learn:

- The basic structure of a C program.
- How to include standard libraries.
- How to define the `main()` function.
- How to use the `printf()` function.
- How to display text in the console.
- How to terminate a program using `return 0`.

## Source Code Explanation

### 1. Include Standard I/O Library

```c
#include "stdio.h"
```

Includes the Standard Input/Output library, which provides functions for input and output operations.

For example:
- `printf()` - Displays information.
- `scanf()` - Receives input from the user.

**Note:** The conventional syntax for including standard C libraries is:

```c
#include <stdio.h>
```

### 2. Main Function

```c
int main()
{
    // Program instructions
}
```

The `main()` function is the entry point of a C program.

When the program runs, execution starts from this function.

- `int` specifies the return type.
- `main()` is the main function.
- `{ }` define the function body.

### 3. Display Text Using printf()

```c
printf("Hello World!\r\n");
```

The `printf()` function displays text in the console.

The string contains:

- `Hello World!` - The message displayed to the user.
- `\r` - Carriage Return (moves the cursor to the beginning of the current line).
- `\n` - Line Feed (moves the cursor to the next line).

Together, `\r\n` represent a Windows-style newline.

### 4. Return Statement

```c
return 0;
```

Terminates the `main()` function and returns an exit status to the operating system.

A return value of `0` conventionally indicates that the program executed successfully.

## Example Output

```text
Hello World!
```

## Important C Programming Concepts

| Concept | Description |
|---|---|
| `#include` | Includes a library or header file. |
| `stdio.h` | Standard Input/Output library. |
| `main()` | Entry point of the program. |
| `printf()` | Displays text in the console. |
| `\r` | Carriage Return. |
| `\n` | New Line (Line Feed). |
| `return 0` | Indicates successful program termination. |

## Practice Exercises

Try modifying the program to improve your understanding:

1. Change `Hello World!` to your own name.
2. Display multiple lines of text using `\n`.
3. Print your name, age, and programming language.
4. Display two messages using separate `printf()` statements.
5. Replace `\r\n` with `\n` and compare the output.

## Summary

This project introduces the basic structure of a C program and demonstrates how to display text using the `printf()` function.

The main concepts covered are:

- Including standard libraries.
- Defining the `main()` function.
- Displaying output using `printf()`.
- Understanding escape sequences.
- Returning an exit status using `return 0`.

**Next Step:** Learn about variables, data types, and basic input/output operations in C.