# 37-Reading and Parsing Dates Using `scanf()` in C

## 1. Introduction

In this project, we learn how to read a date entered by the user and separate it into three integer values:

- Year
- Month
- Day

The program expects the user to enter a date in the following format:

```text
YYYY-MM-DD
```

For example:

```text
2026-11-27
```

The program uses the `scanf()` function with the `%*c` format specifier to read the numbers while skipping the separator characters.

This project introduces several important concepts in C:

- Reading multiple values using `scanf()`.
- Using format specifiers.
- Suppressing input assignments with `*`.
- Reading and skipping individual characters.
- Parsing structured input.
- Understanding the limitations of `scanf()` when validating dates.

## 2. Complete Source Code

Here is the original program:

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int y, m, d;

    printf("Please enter the date as YYYY-MM-DD: ");

    // scanf("%4d-%2d-%2d", &y, &m, &d);
    scanf("%d%*c%d%*c%d", &y, &m, &d);

    printf("\n");

    printf("Result:\n");
    printf(" Year: %d\n", y);
    printf("Month: %d\n", m);
    printf("  Day: %d\n", d);

    return 0;
}
```

The program reads three integer values and skips the characters between them.

For example, when the user enters:

```text
2026-11-27
```

The program stores:

```text
y = 2026
m = 11
d = 27
```

**Important:** The original code does not fully validate the input format or check whether the entered date exists. We will examine these limitations and improve the program later.

## 3. Required Header Files

### `stdio.h`

This header provides standard input and output functions.

The program uses:

- `printf()` to display messages and results.
- `scanf()` to read the date entered by the user.

### `stdlib.h`

This header provides general-purpose utility functions.

The original program does not use any function from this library, so it can be removed.

The program only needs:

```c
#include <stdio.h>
```

## 4. Understanding the Variables

```c
int y, m, d;
```

Three integer variables are declared.

| Variable | Meaning | Example |
|---|---|---:|
| `y` | Year | 2026 |
| `m` | Month | 11 |
| `d` | Day | 27 |

These variables store the three numeric components of the date separately.

For example, the date:

```text
2026-11-27
```

is divided into:

```text
Year  = 2026
Month = 11
Day   = 27
```

## 5. Understanding the `scanf()` Function

The most important instruction in this program is:

```c
scanf("%d%*c%d%*c%d", &y, &m, &d);
```

To understand it, we need to examine each part of the format string.

### 5.1. `%d`

The `%d` format specifier reads a signed decimal integer.

For example:

```c
scanf("%d", &y);
```

If the user enters:

```text
2026
```

the value `2026` is stored in the variable `y`.

The `&` operator provides the address of the variable so that `scanf()` can store the input value in it.

### 5.2. `%*c`

The `%c` format specifier reads one character.

Normally, we could use:

```c
scanf("%c", &separator);
```

to read a character and store it in a variable.

However, the asterisk (`*`) changes its behavior.

```c
%*c
```

means:

**Read one character, but do not assign it to any variable.**

This is called assignment suppression.

In our program, `%*c` is used to skip the separator between the date components.

For example:

```text
2026-11-27
    ^  ^
    |  |
    -  -
```

The two hyphens are consumed by the two `%*c` conversion specifications.

### 5.3. Breaking Down the Complete Format String

Consider:

```c
"%d%*c%d%*c%d"
```

It contains five conversion specifications:

| Format | Operation | Destination |
|---|---|---|
| `%d` | Read an integer | `y` |
| `%*c` | Read and discard one character | None |
| `%d` | Read an integer | `m` |
| `%*c` | Read and discard one character | None |
| `%d` | Read an integer | `d` |

The input is processed in this order:

```text
2026-11-27
```

1. `%d` reads `2026` and stores it in `y`.
2. `%*c` reads and discards `-`.
3. `%d` reads `11` and stores it in `m`.
4. `%*c` reads and discards `-`.
5. `%d` reads `27` and stores it in `d`.

The final values are:

```text
y = 2026
m = 11
d = 27
```

## 6. Understanding the Alternative `scanf()` Format

The original program also contains this commented instruction:

```c
// scanf("%4d-%2d-%2d", &y, &m, &d);
```

This is another way to read a date.

Let's examine it:

```c
scanf("%4d-%2d-%2d", &y, &m, &d);
```

| Format | Description |
|---|---|
| `%4d` | Read an integer using at most 4 input characters |
| `-` | Match a literal hyphen |
| `%2d` | Read an integer using at most 2 input characters |
| `-` | Match another literal hyphen |
| `%2d` | Read an integer using at most 2 input characters |

For the input:

```text
2026-11-27
```

the function reads:

- `2026` into `y`.
- The first literal `-` must match the input.
- `11` into `m`.
- The second literal `-` must match the input.
- `27` into `d`.

### Difference Between the Two Approaches

| Feature | `%d%*c%d%*c%d` | `%4d-%2d-%2d` |
|---|---|---|
| Reads year, month, and day | Yes | Yes |
| Skips separators | Reads and discards any character | Matches literal hyphens |
| Checks for hyphens | No | Yes |
| Limits field width | No | Yes |
| Enforces exact date layout | No | More closely, but not completely |

**Recommendation:** For the specific `YYYY-MM-DD` format, the second approach is generally better because it explicitly expects hyphens.

However, neither approach alone guarantees that the input is a valid calendar date.

## 7. Understanding Assignment Suppression (`*`)

Assignment suppression is useful when you need to consume part of an input without storing it.

For example:

```c
scanf("%d%*c%d", &a, &b);
```

If the user enters:

```text
25,50
```

the function:

1. Reads `25` into `a`.
2. Reads and discards `,`.
3. Reads `50` into `b`.

The result is:

```text
a = 25
b = 50
```

Another example:

```c
scanf("%d%*c%d%*c%d", &a, &b, &c);
```

Input:

```text
10-20-30
```

Result:

```text
a = 10
b = 20
c = 30
```

Remember that `%*c` discards exactly one character. It does not specifically check whether that character is a comma, hyphen, or another separator.

## 8. Displaying the Result

After reading the date, the program displays:

```c
printf("Result:\n");
printf(" Year: %d\n", y);
printf("Month: %d\n", m);
printf("  Day: %d\n", d);
```

Each variable is printed separately.

The `%d` format specifier is used because all three variables have the `int` data type.

For the input:

```text
2026-11-27
```

the output is:

```text
Result:
 Year: 2026
Month: 11
  Day: 27
```

## 9. Expected Output

Example:

```text
Please enter the date as YYYY-MM-DD: 2026-11-27

Result:
 Year: 2026
Month: 11
  Day: 27
```

Another example:

```text
Please enter the date as YYYY-MM-DD: 2000-01-05

Result:
 Year: 2000
Month: 1
  Day: 5
```

Notice that the integer variables do not preserve leading zeros.

For example, the input month `01` is stored as the integer `1`.

If you need to display the month with two digits, use:

```c
printf("Month: %02d\n", m);
```

The `0` flag pads the number with leading zeros to reach the specified width.

## 10. Important Limitation: The Original Program Does Not Validate Input

Consider the following input:

```text
2026/11/27
```

The original format:

```c
scanf("%d%*c%d%*c%d", &y, &m, &d);
```

will accept the slash characters because `%*c` discards any character.

The program can therefore produce:

```text
Year: 2026
Month: 11
Day: 27
```

even though the user did not enter the requested hyphen-separated format.

The original program also does not reject impossible dates such as:

```text
2026-15-40
```

The values can be read successfully as integers, but they do not represent a valid calendar date.

This is why input parsing and date validation should be treated as two separate tasks:

1. **Parsing:** Extract the year, month, and day.
2. **Validation:** Check whether the extracted values form a valid date.

## 11. Safer Version Using `scanf()` and Return-Value Checking

The following version uses the literal-hyphen format and checks whether all three integer values were successfully read.

```c
#include <stdio.h>

int main()
{
    int y, m, d;

    printf("Please enter the date as YYYY-MM-DD: ");

    if (scanf("%4d-%2d-%2d", &y, &m, &d) != 3)
    {
        printf("Invalid input format.\n");
        return 1;
    }

    printf("\nResult:\n");
    printf(" Year: %04d\n", y);
    printf("Month: %02d\n", m);
    printf("  Day: %02d\n", d);

    return 0;
}
```

### What has changed?

**1. Removed the unnecessary header**

```c
#include <stdio.h>
```

Only standard input/output functions are required.

**2. Used literal hyphens**

```c
scanf("%4d-%2d-%2d", &y, &m, &d);
```

This requires hyphens between the numeric fields.

**3. Checked the return value**

```c
if (scanf("%4d-%2d-%2d", &y, &m, &d) != 3)
```

`scanf()` returns the number of successfully assigned input items.

In this case:

- `3` means all three integers were successfully read.
- A smaller value means that parsing stopped before all three assignments were completed.
- `EOF` means input failure or end-of-file occurred before the first conversion could be completed.

This check prevents the program from using variables that were not successfully assigned.

**Important:** This version checks the three conversions, but it does not guarantee that the entire input line contains only a date. For strict validation, use a line-based parser.

## 12. Complete Version with Calendar-Date Validation

The following example reads a complete line using `fgets()`, parses the date with `sscanf()`, checks the separators and verifies that the date is valid.

It also handles leap years.

```c
#include <stdio.h>

int IsLeapYear(int year)
{
    return (year % 400 == 0) ||
           (year % 4 == 0 && year % 100 != 0);
}

int IsValidDate(int year, int month, int day)
{
    int daysInMonth[] =
    {
        31, 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    };

    if (year < 1 || month < 1 || month > 12)
    {
        return 0;
    }

    if (IsLeapYear(year))
    {
        daysInMonth[1] = 29;
    }

    if (day < 1 || day > daysInMonth[month - 1])
    {
        return 0;
    }

    return 1;
}

int main()
{
    char input[100];
    int y, m, d;
    char extra;

    printf("Please enter the date as YYYY-MM-DD: ");

    if (fgets(input, sizeof(input), stdin) == NULL)
    {
        printf("Input error.\n");
        return 1;
    }

    if (sscanf(input, "%4d-%2d-%2d %c", &y, &m, &d, &extra) != 3)
    {
        printf("Invalid date format.\n");
        return 1;
    }

    if (!IsValidDate(y, m, d))
    {
        printf("Invalid calendar date.\n");
        return 1;
    }

    printf("\nValid date:\n");
    printf(" Year: %04d\n", y);
    printf("Month: %02d\n", m);
    printf("  Day: %02d\n", d);

    return 0;
}
```

### Understanding the additional functions

#### `IsLeapYear()`

```c
int IsLeapYear(int year)
{
    return (year % 400 == 0) ||
           (year % 4 == 0 && year % 100 != 0);
}
```

A year is a leap year if:

- It is divisible by 400, or
- It is divisible by 4 but not divisible by 100.

Examples:

| Year | Leap year? |
|---:|---|
| 2024 | Yes |
| 2025 | No |
| 1900 | No |
| 2000 | Yes |
| 2028 | Yes |

A leap year has 29 days in February instead of 28.

#### `IsValidDate()`

This function checks:

1. The year must be greater than zero.
2. The month must be between 1 and 12.
3. The day must be at least 1.
4. The day must not exceed the number of days in the specified month.
5. February must have 29 days in a leap year.

For example:

| Date | Result | Explanation |
|---|---|---|
| `2026-11-27` | Valid | Normal date |
| `2024-02-29` | Valid | Leap-year date |
| `2025-02-29` | Invalid | 2025 is not a leap year |
| `2026-04-31` | Invalid | April has 30 days |
| `2026-13-10` | Invalid | Month 13 does not exist |
| `2026-00-10` | Invalid | Month 0 does not exist |

#### Understanding the `sscanf()` format

```c
sscanf(input, "%4d-%2d-%2d %c", &y, &m, &d, &extra)
```

The format reads:

- Up to four characters for the year.
- A literal hyphen.
- Up to two characters for the month.
- Another literal hyphen.
- Up to two characters for the day.
- Optional whitespace.
- One additional character, if present.

The extra `%c` helps detect non-whitespace characters after the date.

If the return value is exactly `3`, the three date fields were successfully read and no additional non-whitespace character was found.

For example:

```text
2026-11-27
```

is accepted, while:

```text
2026-11-27abc
```

is rejected.

This example checks the calendar date, but it does not enforce exactly four, two, and two digit characters in every possible malformed input. For strict character-by-character format validation, additional checks can be added.

## 13. Compile and Run

Save the source code as:

```text
main.c
```

Compile using GCC:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o date_parser
```

Run on Linux:

```bash
./date_parser
```

Run on Windows:

```powershell
date_parser.exe
```

No additional libraries are required.

## 14. Practice Exercises

Try modifying the program to complete these exercises:

1. Read a date in the format `DD-MM-YYYY`.
2. Read a date in the format `YYYY/MM/DD`.
3. Display the month using its name, such as `November`.
4. Check whether the entered year is a leap year.
5. Calculate the number of days in the entered month.
6. Reject dates with invalid separators.
7. Modify the program to accept multiple dates.
8. Write a function that converts the date into the format `27 November 2026`.
9. Calculate the number of days between two valid dates.

## 15. What You Will Learn

After completing this project, you should understand:

- How to read multiple integer values using `scanf()`.
- How `%d` reads decimal integers.
- How `%*c` reads and discards a character.
- What assignment suppression means.
- How literal characters in a `scanf()` format string work.
- The difference between `%d%*c%d` and `%d-%d`.
- How field widths limit the number of characters consumed by a conversion.
- Why checking the return value of `scanf()` is important.
- The difference between parsing input and validating a calendar date.
- How to use `fgets()` and `sscanf()` for safer line-based input processing.
