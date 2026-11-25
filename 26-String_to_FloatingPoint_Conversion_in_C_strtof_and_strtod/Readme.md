# 26-String to Floating-Point Conversion in C (`strtof` and `strtod`)

## 1. Introduction

In C programming, data is sometimes received as text rather than as numeric values.

For example, a program might receive the following string:

```c
char s[] = "1.2 -3.5 10.8";
```

Although this string contains three numbers, C stores it as an array of characters.

To perform mathematical calculations with these values, we must convert the text into numeric data types such as `float` or `double`.

The C standard library provides several conversion functions:

| Function | Return type | Purpose |
|---|---|---|
| `atoi()` | `int` | Converts a string to an integer |
| `atof()` | `double` | Converts a string to a floating-point value |
| `strtol()` | `long` | Converts a string to a long integer |
| `strtof()` | `float` | Converts a string to a float |
| `strtod()` | `double` | Converts a string to a double |
| `strtold()` | `long double` | Converts a string to a long double |

In this lesson, we will focus on `strtof()` and `strtod()`.

## 2. Required Header Files

Our program uses two header files:

```c
#include <stdio.h>
#include <stdlib.h>
```

- `<stdio.h>` provides `printf()` for displaying output.
- `<stdlib.h>` provides `strtof()` and `strtod()`.

## 3. Understanding the Source Code

Here is the original program:

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char s[] = "1.2 -3.5 10.8";
    char *pEnd;

    double x = strtof(s, &pEnd);
    double y = strtof(pEnd, &pEnd);
    double z = strtof(pEnd, NULL);

    printf("x = %f\n", x);
    printf("y = %f\n", y);
    printf("z = %f\n", z);

    return 0;
}
```

Let's examine each part.

### 3.1. Creating a String

```c
char s[] = "1.2 -3.5 10.8";
```

This statement creates a character array containing the following text:

```text
1.2 -3.5 10.8
```

The string contains three floating-point numbers separated by spaces.

Conceptually, its contents are:

| Index | Character |
|---:|:---:|
| 0 | `1` |
| 1 | `.` |
| 2 | `2` |
| 3 | ` ` |
| 4 | `-` |
| 5 | `3` |
| 6 | `.` |
| 7 | `5` |
| 8 | ` ` |
| 9 | `1` |
| 10 | `0` |
| 11 | `.` |
| 12 | `8` |
| 13 | `\0` |

The final character `'\0'` is the null terminator. It marks the end of a C string.

### 3.2. Declaring a Pointer

```c
char *pEnd;
```

This declares a pointer to a character.

The pointer will be used by `strtof()` to identify where the numeric conversion stopped.

It is important to understand that `pEnd` does not contain the converted number. It contains an address pointing to a character inside the original string.

### 3.3. Understanding `strtof()`

The function prototype is:

```c
float strtof(const char *str, char **endptr);
```

It has two parameters:

1. `str`: A pointer to the beginning of the text to convert.
2. `endptr`: A pointer to a character pointer. The function stores the address of the first character that was not part of the converted number.

The function returns the converted value as a `float`.

For example:

```c
char text[] = "25.75";
char *end;

float value = strtof(text, &end);

printf("Value = %f\n", value);
```

Output:

```text
Value = 25.750000
```

After conversion, `end` points to the null terminator because the entire string was a valid floating-point number.

### 3.4. Understanding `char **endptr`

This is an important pointer concept.

Consider:

```c
char *pEnd;
strtof(s, &pEnd);
```

- `pEnd` is a pointer to a character.
- `&pEnd` is the address of that pointer.
- `strtof()` receives `&pEnd` so that it can modify the pointer itself.

The second parameter is therefore a pointer to a pointer.

This allows `strtof()` to return two pieces of information:

- The converted floating-point value.
- The location where conversion stopped.

### 3.5. Converting the First Number

```c
double x = strtof(s, &pEnd);
```

The function starts reading from the beginning of `s`.

The first number is:

```text
1.2
```

The conversion stops when the function encounters the space character.

After this statement:

```text
x    = 1.2
pEnd = address of the space after 1.2
```

Conceptually:

```text
s:
1 . 2 _ - 3 . 5 _ 1 0 . 8 \0
      ^
      |
     pEnd
```

Here `_` represents a space.

### 3.6. Converting the Second Number

```c
double y = strtof(pEnd, &pEnd);
```

This statement starts the next conversion from the position stored in `pEnd`.

The input begins with a space:

```text
 -3.5 10.8
```

`strtof()` automatically skips leading whitespace characters.

It then converts:

```text
-3.5
```

After conversion, `pEnd` points to the space after `-3.5`.

Therefore:

```text
y = -3.5
```

Notice that the same pointer is used as both the starting position and the destination for the new ending position.

This is valid because the function reads the original pointer value and then stores the new ending address through the supplied pointer-to-pointer.

### 3.7. Converting the Third Number

```c
double z = strtof(pEnd, NULL);
```

The final conversion starts from the position stored in `pEnd`.

The remaining text is:

```text
 10.8
```

The function skips the leading space and converts:

```text
10.8
```

The second argument is `NULL` because we do not need to know where the conversion stopped.

Therefore:

```text
z = 10.8
```

## 4. Program Output

The program produces:

```text
x = 1.200000
y = -3.500000
z = 10.800000
```

The `%f` format specifier displays floating-point values with six digits after the decimal point by default.

## 5. Important Difference Between `strtof()` and `strtod()`

Your original program declares the variables as `double`:

```c
double x = strtof(s, &pEnd);
```

However, `strtof()` returns a `float`.

C automatically converts the returned `float` to `double` when assigning it to `x`, but this does not restore any precision that might have been lost during the original `float` conversion.

If you want to work with `double`, use `strtod()`:

```c
double x = strtod(s, &pEnd);
```

The function prototype is:

```c
double strtod(const char *str, char **endptr);
```

Comparison:

| Feature | `strtof()` | `strtod()` |
|---|---|---|
| Return type | `float` | `double` |
| Typical precision | About 6–7 decimal digits | About 15–16 decimal digits |
| Memory size | Usually 4 bytes | Usually 8 bytes |
| Appropriate variable | `float` | `double` |

The exact precision and sizes depend on the implementation.

## 6. Improved Version Using `strtod()`

Since our variables are declared as `double`, this is the recommended version:

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    char s[] = "1.2 -3.5 10.8";
    char *pEnd;

    double x = strtod(s, &pEnd);
    double y = strtod(pEnd, &pEnd);
    double z = strtod(pEnd, NULL);

    printf("x = %f\n", x);
    printf("y = %f\n", y);
    printf("z = %f\n", z);

    return 0;
}
```

Output:

```text
x = 1.200000
y = -3.500000
z = 10.800000
```

## 7. A More Robust Version With Error Checking

The original example assumes that all three numbers are valid.

In real applications, input should be checked before using converted values.

For example:

```c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <errno.h>

int main(void)
{
    char s[] = "1.2 -3.5 10.8";
    char *pEnd;
    double values[3];

    char *p = s;

    for (int i = 0; i < 3; i++)
    {
        while (isspace((unsigned char)*p))
        {
            p++;
        }

        if (*p == '\0')
        {
            printf("Error: Not enough numbers.\n");
            return 1;
        }

        errno = 0;
        values[i] = strtod(p, &pEnd);

        if (p == pEnd)
        {
            printf("Error: Invalid number at position %d.\n", i + 1);
            return 1;
        }

        if (errno == ERANGE)
        {
            printf("Error: Number is outside the representable range.\n");
            return 1;
        }

        p = pEnd;
    }

    while (isspace((unsigned char)*p))
    {
        p++;
    }

    if (*p != '\0')
    {
        printf("Error: Unexpected extra characters: %s\n", p);
        return 1;
    }

    printf("First number  = %f\n", values[0]);
    printf("Second number = %f\n", values[1]);
    printf("Third number  = %f\n", values[2]);

    return 0;
}
```

This version:

1. Skips whitespace before each number.
2. Converts the next number using `strtod()`.
3. Checks whether any characters were converted.
4. Checks `errno` for range errors.
5. Rejects unexpected additional characters after the three numbers.

The check `p == pEnd` is particularly important: it means that the conversion did not consume any characters.

For production code, you should also decide whether special values such as `NaN` and infinity are acceptable, and whether the input format should allow them.

## 8. Understanding the Conversion Process Visually

For the original input:

```text
1.2 -3.5 10.8
```

The conversion proceeds as follows:

```text
Step 1:
strtod(s, &pEnd)

Converted value: 1.2
Remaining text:  -3.5 10.8

Step 2:
strtod(pEnd, &pEnd)

Converted value: -3.5
Remaining text:   10.8

Step 3:
strtod(pEnd, NULL)

Converted value: 10.8
Remaining text:  Not requested
```

The important idea is that we do not need to create a separate string for each number. We can move through the original string using a pointer.

## 9. Other Examples

### Example 1: Positive and Negative Values

```c
char s[] = "100 -25 3.14159";
char *end;

double a = strtod(s, &end);
double b = strtod(end, &end);
double c = strtod(end, NULL);
```

Results:

```text
a = 100
b = -25
c = 3.14159
```

### Example 2: Scientific Notation

```c
char s[] = "1.5e3 -2.5e-2";
char *end;

double a = strtod(s, &end);
double b = strtod(end, NULL);
```

Results:

```text
a = 1500
b = -0.025
```

`strtod()` supports scientific notation.

### Example 3: Conversion Stops at Invalid Text

```c
char s[] = "123.45ABC";
char *end;

double value = strtod(s, &end);

printf("Value = %f\n", value);
printf("Remaining text = %s\n", end);
```

Output:

```text
Value = 123.450000
Remaining text = ABC
```

This demonstrates why the `endptr` parameter is useful.

## 10. Important Notes

- `strtof()` converts text to `float`.
- `strtod()` converts text to `double`.
- `strtold()` converts text to `long double`.
- `endptr` identifies where conversion stopped.
- `NULL` can be used when the ending position is not needed.
- Leading whitespace is automatically skipped.
- A conversion can stop before the end of the string.
- Always check whether conversion succeeded when processing untrusted input.
- `strtof()` and `strtod()` may recognize decimal and scientific notation.
- The decimal separator is affected by the active C locale. In the usual `"C"` locale, a period is used.
- These functions do not automatically split or validate an entire list of numbers. Your program must handle the remaining text.

## 11. Compilation and Execution

Using GCC:

```bash
gcc main.c -o string_conversion
```

Run on Linux:

```bash
./string_conversion
```

Run on Windows:

```powershell
gcc main.c -o string_conversion.exe
.\string_conversion.exe
```

## 12. Exercises

Try these exercises to improve your understanding.

**Exercise 1:**
Change the string to:

```c
char s[] = "12.5 20.75 30.25";
```

Convert all three values and calculate their sum.

**Exercise 2:**
Use the following input:

```c
char s[] = "-10.5 5.25 -2.75";
```

Calculate the average of the three numbers.

**Exercise 3:**
Create a program that converts four numbers from a single string.

**Exercise 4:**
Use `strtof()` instead of `strtod()` and compare the result types.

**Exercise 5:**
Create a function with this prototype:

```c
int ParseNumbers(const char *text, double values[], int count);
```

The function should extract `count` numbers from a string and return whether the conversion succeeded.

## 13. What You Will Learn

After completing this lesson, you should understand:

- How C strings store text.
- How to convert strings into floating-point numbers.
- How `strtof()` and `strtod()` work.
- How to use a pointer to track the conversion position.
- What a pointer to a pointer (`char **`) means.
- How to parse multiple numbers from one string.
- How to check conversion errors.

## 14. Suggested Next Lesson

**String Parsing in C: `strtok()`, `strchr()`, `strstr()`, and `sscanf()`**

In the next lesson, you can explore how to split strings into separate tokens, search for characters and substrings, and extract multiple values from structured text.