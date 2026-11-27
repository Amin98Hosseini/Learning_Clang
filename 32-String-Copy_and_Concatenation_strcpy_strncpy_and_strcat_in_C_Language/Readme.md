# 32-C Programming – String Copy and Concatenation (`strcpy`, `strncpy`, and `strcat`)

## 1. Introduction

In C programming, strings are character arrays terminated by a special character called the **null terminator (`'\0'`)**.

The `<string.h>` library provides several useful functions for manipulating strings. In this lesson, we will learn three important functions:

- `strcpy()` – Copies one string into another.
- `strncpy()` – Copies a specified number of characters from one string to another.
- `strcat()` – Appends one string to the end of another string.

These functions are commonly used when working with character arrays and text data in C.

## 2. Required Header Files

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
```

| Header | Purpose |
|---|---|
| `stdio.h` | Provides input/output functions such as `printf()`. |
| `stdlib.h` | Provides general-purpose functions. It is not required by this particular program. |
| `string.h` | Provides string manipulation functions such as `strcpy()`, `strncpy()`, and `strcat()`. |

For this example, `stdio.h` and `string.h` are sufficient.

## 3. Complete Source Code

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char s1[] = "Hello World!";
    char s2[40];
    char s3[40];

    printf("Using strcpy:\n");

    strcpy(s2, s1);

    printf("s1 = %s\n", s1);
    printf("s2 = %s\n", s2);
    printf("\n");

    printf("Using strncpy:\n");

    strncpy(s3, s1, 5);
    s3[5] = '\0';

    printf("s1 = %s\n", s1);
    printf("s3 = %s\n", s3);
    printf("\n");

    char s4[] = "World!";
    char s5[50];

    strcpy(s5, "Hello ");
    s5[6] = '\0';

    printf("Before strcat:\n");

    printf("s4 = %s\n", s4);
    printf("s5 = %s\n", s5);

    strcat(s5, s4);

    printf("After strcat:\n");

    printf("s4 = %s\n", s4);
    printf("s5 = %s\n", s5);

    return 0;
}
```

## 4. Understanding the Code

### 4.1. Declaring String Variables

```c
char s1[] = "Hello World!";
char s2[40];
char s3[40];
```

Here, three character arrays are declared.

- `s1` contains the string `"Hello World!"`.
- `s2` is an empty character array with a capacity of 40 characters.
- `s3` is another character array with a capacity of 40 characters.

When a string is initialized using double quotation marks, C automatically adds a null terminator (`'\0'`) at the end.

For example, the string `"Hello"` is stored as:

```text
H  e  l  l  o  \0
```

The null terminator tells C where the string ends.

### 4.2. Using `strcpy()`

```c
strcpy(s2, s1);
```

The `strcpy()` function copies the complete source string into the destination array.

**Syntax:**

```c
strcpy(destination, source);
```

In this example:

- Destination: `s2`
- Source: `s1`

After executing the function, `s2` contains a copy of `s1`.

```text
s1 = Hello World!
s2 = Hello World!
```

Important: `strcpy()` also copies the null terminator.

The destination array must have enough space for all characters and the terminating `'\0'`.

For `"Hello World!"`, 13 bytes are required:

- 12 characters
- 1 null terminator

Since `s2` has 40 bytes, the copy is safe.

### 4.3. Using `strncpy()`

```c
strncpy(s3, s1, 5);
s3[5] = '\0';
```

The `strncpy()` function copies up to a specified number of characters from the source string.

**Syntax:**

```c
strncpy(destination, source, number_of_characters);
```

In this example:

- Destination: `s3`
- Source: `s1`
- Number of characters: `5`

Therefore, the first five characters of `s1` are copied into `s3`.

```text
s1 = Hello World!
s3 = Hello
```

**Important difference between `strcpy()` and `strncpy()`:**

Unlike `strcpy()`, `strncpy()` does not always append a null terminator.

When the source string contains at least as many characters as the specified copy limit, the destination may not be null-terminated.

That is why this line is necessary:

```c
s3[5] = '\0';
```

It explicitly adds the null terminator after the five copied characters.

Without this line, printing `s3` using `%s` could read beyond the valid string and cause undefined behavior.

### 4.4. Understanding String Concatenation

Before learning `strcat()`, we declare two more strings:

```c
char s4[] = "World!";
char s5[50];
```

- `s4` contains `"World!"`.
- `s5` is an empty character array with a capacity of 50 bytes.

Next:

```c
strcpy(s5, "Hello ");
```

This copies `"Hello "` into `s5`.

The content of `s5` is now:

```text
Hello \0
```

Then:

```c
s5[6] = '\0';
```

This line explicitly places a null terminator at index 6.

However, this assignment is redundant in this specific program because `strcpy()` has already placed a null terminator at that position.

The character indexes are:

| Index | Character |
|---:|:---:|
| 0 | H |
| 1 | e |
| 2 | l |
| 3 | l |
| 4 | o |
| 5 | Space |
| 6 | `'\0'` |

### 4.5. Using `strcat()`

```c
strcat(s5, s4);
```

The `strcat()` function appends the source string to the end of the destination string.

**Syntax:**

```c
strcat(destination, source);
```

In this example:

- Destination: `s5`, containing `"Hello "`
- Source: `s4`, containing `"World!"`

After concatenation, `s5` contains:

```text
Hello World!
```

The resulting memory layout is:

```text
H  e  l  l  o     W  o  r  l  d  !  \0
```

Notice that the original space at the end of `"Hello "` is preserved.

The original `s4` string remains unchanged because `strcat()` appends its contents to the destination rather than modifying the source.

**Important:** The destination array must have enough available space for both strings and the final null terminator.

In this example, `s5` has 50 bytes, which is more than enough.

## 5. Program Output

When you run the program, the output will be:

```text
Using strcpy:
s1 = Hello World!
s2 = Hello World!

Using strncpy:
s1 = Hello World!
s3 = Hello

Before strcat:
s4 = World!
s5 = Hello
After strcat:
s4 = World!
s5 = Hello World!
```

## 6. Comparison of String Functions

| Function | Purpose | Copies null terminator? |
|---|---|---|
| `strcpy()` | Copies the complete source string. | Yes |
| `strncpy()` | Copies up to a specified number of characters. | Not always |
| `strcat()` | Appends one string to another. | Writes a new terminator at the end |

### Important Differences

**`strcpy()`**

```c
strcpy(destination, source);
```

Copies the entire string, including its null terminator.

**`strncpy()`**

```c
strncpy(destination, source, n);
```

Copies at most `n` characters. It may not null-terminate the destination if the source has `n` or more characters.

**`strcat()`**

```c
strcat(destination, source);
```

Finds the end of the destination string and appends the source string there.

## 7. Important Safety Considerations

The standard functions `strcpy()`, `strncpy()`, and `strcat()` do not know the actual capacity of the destination array.

You must ensure that enough memory is available before calling them.

### 7.1. Safer Alternative to `strcpy()`

For bounded copying, you can use `snprintf()`:

```c
char destination[20];
const char source[] = "Hello World!";

snprintf(destination, sizeof(destination), "%s", source);

printf("%s\n", destination);
```

`snprintf()` limits the number of bytes written, including the null terminator.

### 7.2. Safer Alternative to `strcat()`

You can also use `snprintf()` to concatenate strings:

```c
char destination[30] = "Hello ";
const char source[] = "World!";

size_t used = strlen(destination);

snprintf(destination + used,
         sizeof(destination) - used,
         "%s",
         source);

printf("%s\n", destination);
```

This example calculates the current string length and uses only the remaining buffer space.

For production code, also check the return value of `snprintf()` to determine whether the output was truncated.

## 8. Common Mistakes

1. **Destination array is too small**

   Calling `strcpy()` or `strcat()` without enough destination space causes undefined behavior.

2. **Forgetting the null terminator**

   `strncpy()` may not add `'\0'` when the source is at least as long as the requested copy length.

3. **Using an uninitialized destination string with `strcat()`**

   `strcat()` requires the destination to already contain a valid null-terminated string.

   Incorrect:

   ```c
   char s[30];
   strcat(s, "Hello");
   ```

   Correct:

   ```c
   char s[30] = "";
   strcat(s, "Hello");
   ```

4. **Confusing copying and concatenation**

   - `strcpy()` replaces the destination contents.
   - `strcat()` adds characters to the end of the existing destination string.

5. **Ignoring buffer capacity**

   Always calculate the required space, including the null terminator.

## 9. Compilation and Execution

If you are using GCC, save the source file as:

```text
main.c
```

Compile:

```bash
gcc main.c -o string_operations
```

Run on Linux:

```bash
./string_operations
```

Run on Windows:

```powershell
.\string_operations.exe
```

You can also use Visual Studio Code, Code::Blocks, or another C development environment.

## 10. Practice Exercises

Try completing these exercises to improve your understanding.

**Exercise 1 – Copy a String**

Create two character arrays and use `strcpy()` to copy the first string into the second.

**Exercise 2 – Copy a Limited Number of Characters**

Ask the user to enter a string and copy only its first five characters using `strncpy()`.

Make sure the destination is null-terminated.

**Exercise 3 – Concatenate Two Strings**

Create two strings:

```c
char first[50] = "Embedded ";
char second[] = "Systems";
```

Use `strcat()` to produce:

```text
Embedded Systems
```

**Exercise 4 – Combine Three Strings**

Create three strings:

```c
char s1[] = "STM32";
char s2[] = " ";
char s3[] = "Programming";
```

Use `strcpy()` and `strcat()` to generate:

```text
STM32 Programming
```

**Exercise 5 – Build a Safe Concatenation Program**

Write a program that:

1. Reads two strings from the user.
2. Stores them in separate character arrays.
3. Combines them into a third array.
4. Checks that the resulting string fits in the destination buffer.
5. Prints the final result.

## 11. Learning Objectives

After completing this lesson, you should understand:

- How strings are stored in character arrays.
- Why the null terminator is necessary.
- How to copy strings using `strcpy()`.
- How to copy a limited number of characters using `strncpy()`.
- Why `strncpy()` does not always terminate a string.
- How to concatenate strings using `strcat()`.
- How to calculate string length using `strlen()`.
- Why destination buffer capacity is important.
- How to use `snprintf()` for safer string formatting and concatenation.
