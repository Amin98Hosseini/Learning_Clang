# 31-Displaying Error Messages Using `strerror()` in C

## 1. Introduction

When developing C programs, errors can occur during operations such as opening files, accessing resources, allocating memory, or performing input/output operations.

The C standard library provides a function called `strerror()` that converts an error code into a human-readable error message.

For example, instead of displaying only an error number:

```text
Error Code: 2
```

we can display a descriptive message:

```text
No such file or directory
```

The `strerror()` function is useful when we want to understand what an error code represents.

In this tutorial, we will learn:

- How to use the `strerror()` function.
- How error codes are represented in C.
- How to display error messages using `puts()` and `printf()`.
- How to use the `errno.h` header and predefined error constants.
- How to handle invalid user input.
- How to use `strerror()` in practical C applications.

## 2. Required Header Files

The original program contains:

```c
#include <stdio.h>
#include <stdlib.h>
#define TRUE 1
```

However, it uses the `strerror()` function without including its required header.

The correct header is:

```c
#include <string.h>
```

A more complete set of headers for working with error codes is:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
```

### `stdio.h`

Provides standard input/output functions:

- `printf()` – Displays formatted output.
- `scanf()` – Reads formatted input.
- `puts()` – Displays a string followed by a newline.
- `fgets()` – Reads a line of text from an input stream.

### `stdlib.h`

Provides general-purpose utility functions, including:

- `strtol()` – Converts a string into a long integer.
- `malloc()` – Allocates memory.
- `free()` – Releases allocated memory.
- `exit()` – Terminates a program.

The original program does not use any function from this header, but the improved version later in this tutorial uses `strtol()`.

### `string.h`

Provides string-handling functions, including:

- `strlen()`
- `strcpy()`
- `strcmp()`
- `strcat()`
- `strerror()`

The `strerror()` function is declared in this header.

### `errno.h`

Provides macros and declarations related to error reporting.

It includes predefined error constants such as:

- `EINVAL` – Invalid argument.
- `ENOENT` – No such file or directory.
- `ERANGE` – Result out of range.
- `ENOMEM` – Not enough memory.
- `EACCES` – Permission denied.

The numeric values assigned to these error constants can differ between operating systems and C library implementations.

## 3. Complete Original Source Code

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1

int main()
{
    int e;

    while (TRUE)
    {
        printf("Please enter an error code: ");
        scanf("%d", &e);
        printf("\n");

        if (e < 0)
            break;

        printf("Error message for Error Code #%d:\n", e);
        puts(strerror(e));
        printf("\n");
    }

    return 0;
}
```

The important correction compared with the original code is the addition of:

```c
#include <string.h>
```

Without this header, the program does not have the proper declaration of `strerror()`.

## 4. Understanding the Code

### 4.1. Defining the `TRUE` Macro

```c
#define TRUE 1
```

The `#define` directive creates a preprocessor macro.

Whenever the preprocessor encounters `TRUE`, it replaces it with `1`.

For example:

```c
while (TRUE)
```

is effectively processed as:

```c
while (1)
```

In C, a condition is considered true when its value is nonzero and false when its value is zero.

Therefore:

- `1` means true.
- `0` means false.

This macro allows us to write a loop that continues indefinitely until we explicitly stop it.

An alternative is:

```c
while (1)
{
    // Statements
}
```

Both approaches create an infinite loop.

### 4.2. Declaring the Error Code Variable

```c
int e;
```

Here, we declare an integer variable named `e`.

This variable stores the error code entered by the user.

For example, the user might enter:

```text
2
```

The variable then contains:

```c
e = 2;
```

### 4.3. Creating an Infinite Loop

```c
while (TRUE)
{
    // Statements
}
```

The `while` loop repeatedly executes its body because `TRUE` is equal to `1`.

The loop continues until a `break` statement is executed.

This approach is useful when a program needs to repeatedly request input from the user.

### 4.4. Requesting an Error Code

```c
printf("Please enter an error code: ");
```

This statement displays a message asking the user to enter an error code.

### 4.5. Reading the Error Code with `scanf()`

```c
scanf("%d", &e);
```

The `scanf()` function reads formatted input from the standard input, usually the keyboard.

The format specifier:

```c
%d
```

indicates that the program expects an integer.

The address operator:

```c
&e
```

provides the memory address of the variable where the entered value will be stored.

For example, if the user enters:

```text
5
```

the following assignment effectively occurs through `scanf()`:

```c
e = 5;
```

**Important:** The original program does not check whether `scanf()` successfully reads an integer. This can cause problems when the user enters invalid input. We will improve this later.

### 4.6. Checking for a Negative Error Code

```c
if (e < 0)
    break;
```

This condition checks whether the entered error code is negative.

If the condition is true, the `break` statement immediately terminates the nearest enclosing loop.

For example:

| Entered value | Result |
|---:|---|
| `0` | Continue and display a message |
| `1` | Continue and display a message |
| `2` | Continue and display a message |
| `10` | Continue and display a message |
| `-1` | Exit the loop |
| `-5` | Exit the loop |

In this program, a negative number is used as a termination signal.

It is important to understand that a negative number is not necessarily a valid error code for `strerror()`. Here, negative values are simply reserved to stop the program.

### 4.7. Displaying the Error Code

```c
printf("Error message for Error Code #%d:\n", e);
```

This statement displays the error code entered by the user.

The `%d` format specifier is used to display an integer.

For example, if:

```c
e = 2;
```

the output will be:

```text
Error message for Error Code #2:
```

### 4.8. Understanding the `strerror()` Function

```c
puts(strerror(e));
```

This is the most important statement in the program.

The `strerror()` function converts an error number into a human-readable string.

Its general syntax is:

```c
strerror(error_code);
```

The function receives an integer representing an error code and returns a pointer to a string describing that error.

For example:

```c
strerror(2);
```

On many systems, this may return:

```text
No such file or directory
```

However, the exact message and numeric error-code mapping depend on the operating system and C library implementation.

In our program:

```c
puts(strerror(e));
```

two functions are used together:

1. `strerror(e)` obtains the error description.
2. `puts()` displays the returned string.

The `puts()` function automatically adds a newline after displaying the message.

The following statements are conceptually similar:

```c
puts(strerror(e));
```

and:

```c
printf("%s\n", strerror(e));
```

### 4.9. Adding an Empty Line

```c
printf("\n");
```

This statement prints a newline character to separate the output of different iterations.

It makes the terminal output easier to read.

### 4.10. Returning from `main()`

```c
return 0;
```

This statement terminates the program and indicates successful execution.

By convention, returning `0` from `main()` indicates that the program completed successfully.

## 5. What Is `strerror()`?

The `strerror()` function is part of the C standard library.

It is declared in:

```c
#include <string.h>
```

Its function prototype is:

```c
char *strerror(int errnum);
```

### Parameter

| Parameter | Description |
|---|---|
| `errnum` | Integer error code whose description is requested |

### Return Value

The function returns a pointer to a string containing a description of the specified error code.

For example:

```c
printf("%s\n", strerror(2));
```

Possible output on a common system:

```text
No such file or directory
```

**Important notes:**

- The returned message is implementation-dependent and may be localized.
- Do not assume that a particular numeric error code has the same meaning on every operating system.
- The returned string should not be modified.
- The returned pointer may refer to internal storage managed by the C library. Copy the text if you need to keep it independently.
- In multithreaded programs, consult the platform's documentation for thread-safety guarantees. Some systems provide `strerror_r()` as an alternative, but its interface differs between implementations.

## 6. Understanding Common Error Codes

The `errno.h` header defines symbolic error constants.

Some commonly available constants include:

| Constant | Meaning |
|---|---|
| `EINVAL` | Invalid argument |
| `ENOENT` | No such file or directory |
| `ERANGE` | Result out of range |
| `ENOMEM` | Not enough memory |
| `EACCES` | Permission denied |
| `EBADF` | Bad file descriptor |
| `EEXIST` | File already exists |
| `EIO` | Input/output error |
| `ENOSPC` | No space left on device |

These constants are more portable and readable than hardcoding numeric error codes.

For example, instead of writing:

```c
strerror(2);
```

we can write:

```c
strerror(ENOENT);
```

The second approach communicates the intended error more clearly.

**Note:** The exact set of available error constants and their numeric values depends on the implementation. Use the constants defined by your target system.

## 7. Improved Version Using Standard Error Constants

The following example demonstrates how to use `strerror()` with predefined error constants:

```c
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main(void)
{
    printf("Common error messages:\n\n");

    printf("EINVAL: %s\n", strerror(EINVAL));
    printf("ENOENT: %s\n", strerror(ENOENT));
    printf("ERANGE: %s\n", strerror(ERANGE));
    printf("ENOMEM: %s\n", strerror(ENOMEM));
    printf("EACCES: %s\n", strerror(EACCES));

    return 0;
}
```

This program does not ask the user to enter an error code.

Instead, it displays messages associated with predefined error constants.

The output will depend on the operating system and C library.

## 8. Improved Interactive Version

The original program has two important limitations:

1. It does not check whether `scanf()` successfully reads an integer.
2. If the user enters text instead of a number, `scanf()` fails without consuming the invalid input. The loop may then repeatedly process the same invalid input.

We can improve the program by using `fgets()` and `strtol()` to read and convert input safely.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <ctype.h>
#include <limits.h>

int main(void)
{
    char input[100];
    char *endptr;

    while (1)
    {
        printf("Please enter an error code (negative number to exit): ");

        if (fgets(input, sizeof(input), stdin) == NULL)
        {
            printf("\nInput ended.\n");
            break;
        }

        errno = 0;

        long value = strtol(input, &endptr, 10);

        if (endptr == input)
        {
            printf("Invalid input: Please enter an integer.\n\n");
            continue;
        }

        while (isspace((unsigned char)*endptr))
        {
            endptr++;
        }

        if (*endptr != '\0')
        {
            printf("Invalid input: Unexpected characters found.\n\n");
            continue;
        }

        if (errno == ERANGE || value < INT_MIN || value > INT_MAX)
        {
            printf("Error: Integer value is out of range.\n\n");
            continue;
        }

        int e = (int)value;

        if (e < 0)
        {
            printf("Exiting program...\n");
            break;
        }

        printf("\nError message for Error Code #%d:\n", e);
        puts(strerror(e));
        printf("\n");
    }

    return 0;
}
```

### Understanding the Improved Version

**Step 1 – Read a complete line**

```c
fgets(input, sizeof(input), stdin);
```

Instead of reading an integer directly, we first read a complete line into a character array.

This allows us to inspect the input before converting it.

**Step 2 – Reset `errno`**

```c
errno = 0;
```

The `errno` variable is used by many library functions to report certain errors.

We reset it before calling `strtol()` so that an old error value does not interfere with checking the current conversion.

**Step 3 – Convert the string into an integer**

```c
long value = strtol(input, &endptr, 10);
```

The `strtol()` function converts a string into a `long` integer.

Its general syntax is:

```c
strtol(string, endptr, base);
```

| Parameter | Description |
|---|---|
| `string` | String containing the numeric value |
| `endptr` | Receives the address of the first character that was not converted |
| `base` | Numeric base; `10` means decimal |

For example:

```c
char input[] = "123abc";
char *endptr;

long value = strtol(input, &endptr, 10);
```

After conversion:

```text
value = 123
```

And `endptr` points to:

```text
abc
```

**Step 4 – Check whether conversion occurred**

```c
if (endptr == input)
```

If `endptr` still points to the beginning of the input, no numeric conversion occurred.

For example, this input is invalid:

```text
hello
```

**Step 5 – Ignore trailing whitespace**

```c
while (isspace((unsigned char)*endptr))
{
    endptr++;
}
```

The `isspace()` function checks whether a character is whitespace, such as a space, tab, or newline.

We use it to allow harmless whitespace after the number.

The cast to `unsigned char` ensures that the argument is valid for `isspace()`.

**Step 6 – Reject unexpected characters**

```c
if (*endptr != '\0')
```

After skipping whitespace, the program checks whether any additional characters remain.

For example:

```text
123abc
```

is rejected because `abc` remains after the numeric value.

**Step 7 – Check the integer range**

```c
if (errno == ERANGE || value < INT_MIN || value > INT_MAX)
```

`strtol()` returns a `long`, while the original program uses an `int`.

Therefore, we must ensure that the converted value fits inside the range of an `int`.

**Step 8 – Convert to `int`**

```c
int e = (int)value;
```

After validating the range, we safely convert the value to `int`.

**Step 9 – Check the exit condition**

```c
if (e < 0)
{
    printf("Exiting program...\n");
    break;
}
```

A negative value terminates the loop.

Otherwise, the program displays the corresponding error description.

## 9. Practical Application: Displaying Errors When Opening Files

One of the most common applications of `strerror()` is displaying a meaningful message when a file operation fails.

Consider the following program:

```c
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main(void)
{
    FILE *file = fopen("data.txt", "r");

    if (file == NULL)
    {
        printf("Failed to open file!\n");
        printf("Reason: %s\n", strerror(errno));

        return 1;
    }

    printf("File opened successfully.\n");

    fclose(file);

    return 0;
}
```

### Explanation

The program attempts to open a file named `data.txt` in read mode.

```c
FILE *file = fopen("data.txt", "r");
```

If the file cannot be opened, `fopen()` returns `NULL`.

We then display the error description:

```c
strerror(errno)
```

The `errno` variable is provided through `errno.h`.

It is commonly set by library functions when an operation fails and an error code is available.

**Important:** Check `errno` only when the function's documented failure behavior makes it meaningful. A successful function call does not necessarily reset `errno`, so do not use an old `errno` value to describe a successful operation.

## 10. Difference Between `strerror()` and `perror()`

C provides another useful function called `perror()`.

Both functions help display error descriptions, but their behavior is different.

| Function | Purpose |
|---|---|
| `strerror()` | Returns a string describing an error code |
| `perror()` | Displays a user-defined prefix followed by the message associated with the current `errno` |

### Using `strerror()`

```c
printf("Error: %s\n", strerror(errno));
```

### Using `perror()`

```c
perror("File operation failed");
```

Example output:

```text
File operation failed: No such file or directory
```

The `perror()` function is useful when you want to display an error message directly without manually formatting it.

Use `strerror()` when you need the error description as a string, for example, when preparing a log message or storing it in a buffer.

## 11. Common Mistakes

### Mistake 1: Forgetting `string.h`

Incorrect:

```c
#include <stdio.h>

int main(void)
{
    puts(strerror(2));
    return 0;
}
```

Correct:

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    puts(strerror(2));
    return 0;
}
```

The declaration of `strerror()` is provided by `string.h`.

### Mistake 2: Assuming Error Numbers Are Identical on All Systems

Do not assume that an error number always represents the same error on every platform.

Prefer:

```c
strerror(ENOENT);
```

Instead of hardcoding a number:

```c
strerror(2);
```

### Mistake 3: Not Checking `scanf()`

Incorrect:

```c
scanf("%d", &e);
```

Better:

```c
if (scanf("%d", &e) != 1)
{
    printf("Invalid input!\n");
}
```

However, a program using `scanf()` must also handle invalid characters remaining in the input stream. The `fgets()` and `strtol()` approach shown earlier provides better control.

### Mistake 4: Assuming `strerror()` Detects an Actual Error

The `strerror()` function only translates an error number into a message.

It does not detect errors or determine whether an operation failed.

For example:

```c
strerror(ENOENT);
```

simply requests the description associated with `ENOENT`.

To detect a real file-opening failure, you must first check the return value of `fopen()`.

### Mistake 5: Assuming the Message Is Always in English

The returned message may depend on the implementation and the system's localization settings.

Do not rely on exact message text for program logic. Use error constants and return values for decisions.

## 12. Compilation and Execution

Save the source code as:

```text
main.c
```

Compile using GCC:

```bash
gcc main.c -o strerror_example
```

Run on Linux or macOS:

```bash
./strerror_example
```

Run on Windows:

```powershell
gcc main.c -o strerror_example.exe
.\strerror_example.exe
```

No additional external library is required.

## 13. Exercises

Try the following exercises to improve your understanding.

**Exercise 1 – Display Common Error Messages**

Write a program that displays the messages for:

- `EINVAL`
- `ENOENT`
- `ENOMEM`
- `EACCES`
- `ERANGE`

Use `strerror()` for each error constant.

**Exercise 2 – Interactive Error Lookup**

Modify the original program so that the user can enter multiple error codes.

The program should stop when the user enters a negative number.

**Exercise 3 – Handle Invalid Input**

Modify the interactive program to handle:

```text
hello
```

```text
12abc
```

```text
999999999999999999999999
```

The program should display an appropriate error message instead of terminating unexpectedly or repeatedly processing invalid input.

**Exercise 4 – File Error Handling**

Write a program that attempts to open a file named `example.txt`.

If the file cannot be opened, display the corresponding error message using `strerror(errno)`.

**Exercise 5 – Compare `strerror()` and `perror()`**

Write a program that attempts to open a nonexistent file.

Display the error once using `strerror()` and once using `perror()`.

Compare their outputs.

**Exercise 6 – Create a Simple Error Lookup Table**

Create a program that displays several predefined error constants and their corresponding descriptions.

For example:

```text
ENOENT: No such file or directory
EINVAL: Invalid argument
ENOMEM: Not enough memory
```

## 14. Learning Objectives

After completing this tutorial, you should understand:

- How to use `strerror()` to obtain human-readable error messages.
- Why `string.h` is required for `strerror()`.
- How error codes are represented in C.
- How to use predefined error constants from `errno.h`.
- How to display strings returned by library functions.
- How to use `while` loops and `break` statements.
- How to validate user input.
- How `strtol()` converts strings into integers.
- The purpose of the `errno` variable.
- The difference between `strerror()` and `perror()`.
- How to display useful error messages when file operations fail.
