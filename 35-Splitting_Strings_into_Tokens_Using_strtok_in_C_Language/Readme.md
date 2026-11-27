# 35-Splitting Strings into Tokens Using `strtok()` in C

## 1. Introduction

In this project, we learn how to split a string into smaller parts, called **tokens**, using the standard C library function `strtok()`.

A token is a section of a string separated from other sections by one or more delimiter characters.

For example, consider this string:

```c
char str[] = "1.2 2.5 -5.6,7,8,10 1.41 -6.5,-17";
```

The string contains numbers separated by spaces and commas.

We can use `strtok()` to extract each number separately without writing our own character-by-character parsing algorithm.

The program uses both a space and a comma as delimiters.

## 2. Complete Source Code

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char str[] = "1.2 2.5 -5.6,7,8,10 1.41 -6.5,-17";
    char del[] = " ,";

    char *pt;

    pt = strtok(str, del);

    while (pt != NULL)
    {
        printf("%s\n", pt);
        pt = strtok(NULL, del);
    }

    return 0;
}
```

## 3. Required Header Files

### `stdio.h`

Provides standard input and output functions.

This program uses:

- `printf()` to display each extracted token.

### `stdlib.h`

Provides general-purpose utility functions.

It is not required by the current program because none of its functions are used. You can remove this header.

### `string.h`

Provides string manipulation functions.

This program uses:

- `strtok()` to split the string into tokens.

## 4. Understanding the `strtok()` Function

The `strtok()` function divides a string into smaller sections based on specified delimiter characters.

Its declaration is:

```c
char *strtok(char *str, const char *delim);
```

### Parameters

| Parameter | Description |
|---|---|
| `str` | The string to split. |
| `delim` | A string containing the delimiter characters. |

### Return value

`strtok()` returns a pointer to the next token.

- If a token is found, it returns a pointer to the beginning of that token.
- If no more tokens are available, it returns `NULL`.

**Important:** `strtok()` modifies the original string. It replaces delimiter characters that separate tokens with the null character `'\0'`.

Therefore, the input string must be writable. A character array such as `char str[]` is suitable, but a string literal accessed through a modifiable pointer is not.

## 5. Understanding the Delimiter String

```c
char del[] = " ,";
```

This string contains two delimiter characters:

1. A space (`' '`).
2. A comma (`','`).

Every occurrence of either character can separate tokens.

For example:

```text
1.2 2.5 -5.6,7,8,10 1.41 -6.5,-17
```

The delimiters divide the original string into:

```text
1.2
2.5
-5.6
7
8
10
1.41
-6.5
-17
```

**Important:** The delimiter argument is not treated as one complete separator. Each character inside it is considered an independent delimiter.

For example:

```c
char del[] = ",;";
```

means that both commas and semicolons can separate tokens.

## 6. Understanding the First `strtok()` Call

```c
char *pt;

pt = strtok(str, del);
```

The first call receives:

- `str`: The original string.
- `del`: The delimiter characters.

The function searches for the first token and returns a pointer to its beginning.

After this call:

```c
pt
```

points to the first token:

```text
1.2
```

Internally, `strtok()` replaces the delimiter after the token with `'\0'`.

Conceptually, the original string begins to look like this in memory:

```text
1.2\0 2.5 -5.6,7,8,10 1.41 -6.5,-17
```

The actual delimiter character is overwritten, allowing `pt` to be used as a normal C string.

## 7. Understanding the `while` Loop

```c
while (pt != NULL)
{
    printf("%s\n", pt);
    pt = strtok(NULL, del);
}
```

This loop extracts and displays tokens until no more tokens remain.

### Step 1: Check the pointer

```c
while (pt != NULL)
```

The loop continues as long as `pt` points to a valid token.

When `strtok()` cannot find another token, it returns `NULL`, and the loop terminates.

### Step 2: Print the current token

```c
printf("%s\n", pt);
```

The `%s` format specifier prints the token as a string.

For example, if `pt` points to `"1.2"`, the output is:

```text
1.2
```

### Step 3: Extract the next token

```c
pt = strtok(NULL, del);
```

This is an important part of using `strtok()`.

The first call uses the original string:

```c
strtok(str, del);
```

Subsequent calls use:

```c
strtok(NULL, del);
```

Passing `NULL` tells `strtok()` to continue searching from where its previous call stopped.

Each call returns the next token until all tokens have been extracted.

## 8. Expected Output

When you run the program, the output is:

```text
1.2
2.5
-5.6
7
8
10
1.41
-6.5
-17
```

Each token is printed on a separate line.

## 9. Important Characteristics of `strtok()`

### 9.1. It modifies the original string

Consider:

```c
char str[] = "Hello,World";
char *pt = strtok(str, ",");
```

After tokenization, the comma is replaced with `'\0'`.

The original array is modified. If you need to preserve the original string, make a copy before calling `strtok()`.

### 9.2. Consecutive delimiters are treated as one separator

Consider:

```c
char str[] = "Hello,,,World";
char *pt = strtok(str, ",");
```

The tokens are:

```text
Hello
World
```

Empty tokens are not returned. Multiple consecutive delimiters are skipped.

The same behavior applies to leading and trailing delimiters.

### 9.3. Delimiters can contain multiple characters

For example:

```c
char del[] = ",; ";
```

The function treats comma, semicolon, and space as independent delimiters.

### 9.4. Tokenization is case-sensitive only when token contents are compared

`strtok()` itself does not compare token letters or change their case. It only identifies delimiters.

### 9.5. `strtok()` maintains internal state

The function remembers its position between calls. This means that nested tokenization or simultaneous tokenization of multiple strings can interfere with each other.

In environments that provide it, `strtok_r()` is a reentrant alternative that uses a caller-provided state pointer. It is commonly available on POSIX systems, but it is not part of the ISO C standard.

## 10. Converting Extracted Tokens into Numbers

The current program extracts numbers as strings.

For example:

```c
pt = "1.2";
```

This is text, not a floating-point value.

If you want to perform mathematical operations, you must convert each token into a numeric type.

One option is `strtod()`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char str[] = "1.2 2.5 -5.6,7,8,10 1.41 -6.5,-17";
    const char del[] = " ,";

    char *pt = strtok(str, del);

    while (pt != NULL)
    {
        char *endptr;
        double value = strtod(pt, &endptr);

        if (endptr != pt && *endptr == '\0')
        {
            printf("Token: %-8s Value: %.2f\n", pt, value);
        }
        else
        {
            printf("Invalid number: %s\n", pt);
        }

        pt = strtok(NULL, del);
    }

    return 0;
}
```

Here:

- `strtod()` converts a string into a `double`.
- `endptr` points to the first character that was not converted.
- `endptr != pt` checks that at least one character was converted.
- `*endptr == '\0'` checks that the entire token was a valid number.

Example output:

```text
Token: 1.2      Value: 1.20
Token: 2.5      Value: 2.50
Token: -5.6     Value: -5.60
Token: 7        Value: 7.00
Token: 8        Value: 8.00
Token: 10       Value: 10.00
Token: 1.41     Value: 1.41
Token: -6.5     Value: -6.50
Token: -17      Value: -17.00
```

This is useful when processing sensor data, configuration strings, CSV-like input, and numeric data received through UART, TCP, or other communication interfaces.

## 11. Important Limitations and Best Practices

- Do not pass a string literal directly to `strtok()` because the function modifies its input.
- Always check whether the returned pointer is `NULL` before using it.
- Remember that consecutive delimiters do not produce empty tokens.
- If you need to preserve the original string, copy it before tokenization.
- Avoid using `strtok()` when multiple strings must be tokenized independently at the same time. Consider `strtok_r()` on POSIX systems or a custom parser.
- If your input represents CSV data with quoted fields, commas inside quotation marks require a more advanced parser. Basic `strtok()` is not a complete CSV parser.

## 12. Compile and Run

Save the source code as:

```text
main.c
```

Compile using GCC:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o strtok_example
```

Run on Linux:

```bash
./strtok_example
```

Run on Windows:

```powershell
strtok_example.exe
```

## 13. Practice Exercises

Try modifying the program to complete these exercises:

1. Change the input string to `"Red,Green,Blue"` and use comma as the only delimiter.
2. Use spaces, commas, and semicolons as delimiters.
3. Count the total number of tokens.
4. Convert every extracted token into a `double` using `strtod()`.
5. Calculate the sum and average of all valid numeric tokens.
6. Make a copy of the original string and print it after tokenization to understand how `strtok()` modifies the input.
7. Write a program that splits a string containing sensor values separated by commas and spaces.

## 14. What You Will Learn

After completing this project, you should understand:

- How to use `strtok()` from `<string.h>`.
- How to split a string into smaller tokens.
- How delimiter characters work.
- How pointers can refer to parts of a character array.
- Why `NULL` is used to indicate that no more tokens are available.
- How a string function can modify its input.
- How to convert extracted numeric strings into `double` values using `strtod()`.
