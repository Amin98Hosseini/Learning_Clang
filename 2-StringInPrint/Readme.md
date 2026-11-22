# 2 - Escape Sequences and Special Characters in C

## Overview

This project demonstrates how to use **Escape Sequences** in the C programming language to control text formatting and display special characters using the `printf()` function.

Escape sequences are special character combinations that begin with a backslash (`\`). They allow programmers to insert tabs, new lines, quotation marks, and other special characters into output text.

This example demonstrates the following escape sequences:

- `\n` - New Line
- `\t` - Horizontal Tab
- `\a` - Alert (Bell)
- `\"` - Double Quotation Mark

## Learning Objectives

By studying this example, you will learn:

- What escape sequences are.
- How to use `\n` to create new lines.
- How to use `\t` to organize output into columns.
- How to use `\a` to generate an alert character.
- How to print double quotation marks inside a string.
- How to format console output using `printf()`.

## Source Code Explanation

### 1. Include Standard I/O Library

```c
#include <stdio.h>
```

Includes the Standard Input/Output library, which provides functions such as `printf()` for displaying information.

### 2. New Line (`\n`)

```c
printf("A\tB\tC\t\n");
```

The `\n` escape sequence moves the cursor to the beginning of the next line.

It is commonly used to separate output lines and improve readability.

Example:

```c
printf("Hello\nWorld!\n");
```

Output:

```text
Hello
World!
```

### 3. Horizontal Tab (`\t`)

```c
printf("A\tB\tC\t\n");
printf("Apple\tOrange\tBennana\t\n");
```

The `\t` escape sequence inserts a horizontal tab between text elements.

It is useful for organizing information into columns.

Example output:

```text
A       B       C
Apple   Orange  Bennana
```

**Note:** The actual spacing depends on the console's tab-stop settings.

### 4. Alert / Bell (`\a`)

```c
printf("Cow\tSheep\tLion\t\a\n");
```

The `\a` escape sequence represents the alert or bell character.

It sends an alert signal to the output device. Depending on the terminal and operating system, it may produce a notification sound.

**Note:** Modern terminals may ignore this character or disable its sound.

### 5. Double Quotation Marks (`\"`)

```c
printf("Hello \"world\" !\n");
```

In C, double quotation marks (`"`) are used to define the beginning and end of a string.

If you want to display quotation marks inside a string, you must use the escape sequence `\"`.

Example:

```c
printf("He said: \"Hello World!\"\n");
```

Output:

```text
He said: "Hello World!"
```

## Example Output

```text
A       B       C
Apple   Orange  Bennana
Cow     Sheep   Lion
Hello "world" !
```

The `\a` character may also generate an alert sound, depending on the terminal environment.

## Important C Programming Concepts

| Escape Sequence | Description |
|---|---|
| `\n` | Moves the cursor to the next line. |
| `\t` | Inserts a horizontal tab. |
| `\a` | Generates an alert or bell character. |
| `\"` | Displays a double quotation mark. |
| `\\` | Displays a backslash character. |
| `\r` | Moves the cursor to the beginning of the current line. |
| `\b` | Moves the cursor one position backward. |
| `\'` | Displays a single quotation mark. |
| `\0` | Null character used to terminate C strings. |

## Practice Exercises

Try modifying the program to improve your understanding:

1. Display your name and age on separate lines using `\n`.
2. Create a table with three columns using `\t`.
3. Display a sentence containing multiple double quotation marks.
4. Print a Windows file path using the `\\` escape sequence.
5. Experiment with `\r` and `\b` and observe their behavior.
6. Create a simple formatted table containing names, ages, and scores.

## Summary

This project introduces Escape Sequences in C programming.

The main concepts demonstrated are:

- New Line (`\n`).
- Horizontal Tab (`\t`).
- Alert / Bell (`\a`).
- Double Quotation Marks (`\"`).
- Formatting console output using `printf()`.

**Next Step:** Learn about variables, data types, format specifiers, and user input using `scanf()` in C.