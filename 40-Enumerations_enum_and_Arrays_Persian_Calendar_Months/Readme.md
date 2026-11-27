# 40-C Programming – Enumerations (`enum`) and Arrays: Persian Calendar Months

## 1. Introduction

In C, an **enumeration (`enum`)** is a user-defined data type that allows us to assign meaningful names to integer constants.

Instead of working with numbers such as `1`, `2`, `3`, and so on, we can define readable names such as:

- `FAR` for Farvardin
- `ORD` for Ordibehesht
- `KHR` for Khordad
- `ESF` for Esfand

In this example, we define an enumeration named `Month` containing the twelve months of the Persian calendar.

We also create an array of strings containing the full names of those months. The enumeration values are used as array indexes to print each month's number and name.

### Learning objectives

After studying this program, you will understand:

- What an enumeration (`enum`) is.
- How to define an enumeration using `typedef`.
- How to assign specific integer values to enumeration members.
- How automatic enumeration values are assigned.
- How to use an enumeration variable in a `for` loop.
- How to create and use an array of strings.
- How to use enumeration values as array indexes.
- How to connect symbolic constants with array elements.

---

## 2. Complete Source Code

```c
#include <stdio.h>
#include <stdlib.h>

typedef enum months {
    FAR=1, ORD, KHR, TIR, MOR, SHR,
    MHR, ABN, AZR, DAY, BAH, ESF
} Month;

int main()
{
    Month m;

    char *MonthNames[] = {
        "",
        "Farvardin",
        "Ordibehesht",
        "Khordad",
        "Tir",
        "Mordad",
        "Shahrivar",
        "Mehr",
        "Aban",
        "Azar",
        "Day",
        "Bahman",
        "Esfand"
    };

    for(m=FAR; m<=ESF; m++)
    {
        printf("%3d %s\n", m, MonthNames[m]);
    }

    return 0;
}
```

---

## 3. Understanding the Header Files

```c
#include <stdio.h>
#include <stdlib.h>
```

### `stdio.h`

The `stdio.h` header provides standard input/output functions.

This program uses:

```c
printf();
```

The `printf()` function displays formatted text on the console.

### `stdlib.h`

The `stdlib.h` header provides general-purpose functions such as:

- `malloc()`
- `calloc()`
- `realloc()`
- `free()`
- `exit()`
- `atoi()`

However, this program does not use any function from `stdlib.h`.

Therefore, we can remove it without affecting the program.

The simplified header section is:

```c
#include <stdio.h>
```

---

## 4. Understanding Enumeration (`enum`)

The most important part of this program is:

```c
typedef enum months {
    FAR=1, ORD, KHR, TIR, MOR, SHR,
    MHR, ABN, AZR, DAY, BAH, ESF
} Month;
```

Let's examine this declaration step by step.

### 4.1. What is an enumeration?

An enumeration is a user-defined type that represents a group of named integer constants.

For example:

```c
enum Days {
    SATURDAY,
    SUNDAY,
    MONDAY,
    TUESDAY
};
```

By default, C assigns integer values starting from zero:

| Enumeration member | Integer value |
|---|---:|
| SATURDAY | 0 |
| SUNDAY | 1 |
| MONDAY | 2 |
| TUESDAY | 3 |

This makes the code easier to read because we can use meaningful names instead of unexplained numbers.

For example:

```c
int day = MONDAY;
```

Instead of:

```c
int day = 2;
```

Both represent the same integer value in this example, but the first version is more readable.

### 4.2. Assigning a starting value

In our program:

```c
FAR=1
```

We explicitly assign the value `1` to the first enumeration member.

The remaining members receive consecutive integer values automatically.

Therefore:

| Enumeration member | Month name | Integer value |
|---|---|---:|
| FAR | Farvardin | 1 |
| ORD | Ordibehesht | 2 |
| KHR | Khordad | 3 |
| TIR | Tir | 4 |
| MOR | Mordad | 5 |
| SHR | Shahrivar | 6 |
| MHR | Mehr | 7 |
| ABN | Aban | 8 |
| AZR | Azar | 9 |
| DAY | Day | 10 |
| BAH | Bahman | 11 |
| ESF | Esfand | 12 |

**Important:** When an enumeration member does not have an explicitly assigned value, its value is one greater than the previous member.

For example:

```c
enum Example {
    A = 5,
    B,
    C,
    D
};
```

The values will be:

```text
A = 5
B = 6
C = 7
D = 8
```

### 4.3. Understanding `typedef`

Notice that the declaration starts with:

```c
typedef enum months
```

And ends with:

```c
} Month;
```

The `typedef` keyword creates an alternative type name.

Without `typedef`, we could declare the enumeration as:

```c
enum months {
    FAR = 1,
    ORD,
    KHR,
    TIR,
    MOR,
    SHR,
    MHR,
    ABN,
    AZR,
    DAY,
    BAH,
    ESF
};
```

To declare a variable, we would write:

```c
enum months m;
```

But with `typedef`, we can simply write:

```c
Month m;
```

This makes the code shorter and cleaner.

The two names have different purposes:

- `months` is the enumeration tag.
- `Month` is the type alias created by `typedef`.

### 4.4. Can enum values be used as integers?

Yes.

In C, enumeration constants have integer values and can be used in integer expressions.

For example:

```c
printf("%d\n", FAR);
printf("%d\n", ESF);
```

Output:

```text
1
12
```

This is why we can use enumeration values as array indexes and loop boundaries.

---

## 5. Declaring an Enumeration Variable

Inside `main()`:

```c
Month m;
```

This declares a variable named `m` whose type is `Month`.

It can hold one of the enumeration values:

```c
m = FAR;
m = ORD;
m = ESF;
```

Since the enumeration values correspond to integers, the variable can also be used in integer comparisons and arithmetic expressions.

For example:

```c
m = FAR;

if(m == FAR)
{
    printf("The month is Farvardin.\n");
}
```

---

## 6. Understanding the Array of Strings

The next important section is:

```c
char *MonthNames[] = {
    "",
    "Farvardin",
    "Ordibehesht",
    "Khordad",
    "Tir",
    "Mordad",
    "Shahrivar",
    "Mehr",
    "Aban",
    "Azar",
    "Day",
    "Bahman",
    "Esfand"
};
```

This declaration creates an array of pointers to characters.

Each element points to a string containing the name of a Persian calendar month.

### 6.1. What does `char *` mean?

In C:

```c
char *name;
```

Declares a pointer to a character.

A pointer can store the address of a character. When it points to a null-terminated character sequence, it can be used to access a string.

For example:

```c
char *name = "Farvardin";

printf("%s\n", name);
```

Output:

```text
Farvardin
```

### 6.2. What does `MonthNames[]` mean?

The declaration:

```c
char *MonthNames[];
```

Defines an array whose elements are character pointers.

Each element refers to one month name.

For example:

```c
MonthNames[1]
```

Refers to:

```text
Farvardin
```

And:

```c
MonthNames[12]
```

Refers to:

```text
Esfand
```

### 6.3. Why is the first element an empty string?

Notice this element:

```c
""
```

It occupies index zero.

The reason is that our enumeration starts at `1`:

```c
FAR = 1
```

Therefore, the month numbers and array indexes match directly.

The array is organized like this:

| Array index | Array value |
|---:|---|
| 0 | Empty string |
| 1 | Farvardin |
| 2 | Ordibehesht |
| 3 | Khordad |
| 4 | Tir |
| 5 | Mordad |
| 6 | Shahrivar |
| 7 | Mehr |
| 8 | Aban |
| 9 | Azar |
| 10 | Day |
| 11 | Bahman |
| 12 | Esfand |

The empty string at index zero is not a month. It is simply a placeholder.

This technique allows us to access the correct month name directly using its enumeration value.

For example:

```c
Month m = FAR;

printf("%s\n", MonthNames[m]);
```

Since `FAR` equals `1`, this is equivalent to:

```c
printf("%s\n", MonthNames[1]);
```

Output:

```text
Farvardin
```

**Important:** C arrays use zero-based indexing. The first element is at index `0`, not index `1`.

---

## 7. Understanding the `for` Loop

The next section is:

```c
for(m=FAR; m<=ESF; m++)
{
    printf("%3d %s\n", m, MonthNames[m]);
}
```

This loop displays all twelve months.

Let's analyze its three parts.

### 7.1. Initialization

```c
m = FAR;
```

The loop starts with the first month.

Because:

```c
FAR = 1;
```

The initial value of `m` is `1`.

### 7.2. Loop condition

```c
m <= ESF;
```

The loop continues as long as `m` is less than or equal to `ESF`.

Since:

```c
ESF = 12;
```

The loop executes for values from `1` through `12`.

### 7.3. Increment

```c
m++;
```

After each iteration, the value of `m` increases by one.

The loop therefore follows this sequence:

```text
1
2
3
4
5
6
7
8
9
10
11
12
```

After printing the twelfth month, `m` becomes `13`.

The condition:

```c
13 <= 12
```

is false, so the loop terminates.

### 7.4. Displaying each month

Inside the loop:

```c
printf("%3d %s\n", m, MonthNames[m]);
```

Two values are printed:

1. The numeric month value.
2. The corresponding month name.

Let's understand the format specifiers.

**`%3d`**

- `%d` displays an integer.
- `3` specifies a minimum field width of three characters.
- It right-aligns the number within that field by default.

For example:

```text
  1
  2
 10
 12
```

**`%s`**

Displays a null-terminated string.

For example:

```c
printf("%s", MonthNames[1]);
```

Displays:

```text
Farvardin
```

**`\n`**

Moves the cursor to the next line.

---

## 8. Understanding the Program Execution

Let's follow the program execution.

Initially:

```c
m = FAR;
```

Therefore:

```text
m = 1
```

The first loop iteration executes:

```c
printf("%3d %s\n", m, MonthNames[m]);
```

This is equivalent to:

```c
printf("%3d %s\n", 1, MonthNames[1]);
```

The output is:

```text
  1 Farvardin
```

In the next iteration:

```text
m = 2
```

The program accesses:

```c
MonthNames[2]
```

And prints:

```text
  2 Ordibehesht
```

This process continues until:

```text
m = 12
```

The final output is:

```text
 12 Esfand
```

---

## 9. Expected Output

```text
  1 Farvardin
  2 Ordibehesht
  3 Khordad
  4 Tir
  5 Mordad
  6 Shahrivar
  7 Mehr
  8 Aban
  9 Azar
 10 Day
 11 Bahman
 12 Esfand
```

---

## 10. Why Use `enum` Instead of Normal Integer Variables?

Consider two approaches.

### Approach 1: Using integers

```c
int month = 1;

if(month == 1)
{
    printf("Farvardin");
}
```

The number `1` does not explain its meaning by itself.

### Approach 2: Using an enumeration

```c
Month month = FAR;

if(month == FAR)
{
    printf("Farvardin");
}
```

This version is easier to understand because the constant name describes its meaning.

### Advantages of enumerations

1. **Readability:** Code becomes easier to understand.
2. **Maintainability:** Named constants are easier to update.
3. **Organization:** Related constants are grouped into one type.
4. **Fewer unexplained numbers:** You do not need to remember what each integer represents.
5. **Convenience:** Enumeration values can be used in conditions, loops, and array indexes.

---

## 11. Important Technical Notes

### 11.1. Enumeration values are not automatically restricted to valid members

Although `Month` is an enumeration type, C does not automatically guarantee that a variable always contains one of the twelve defined month values.

For example:

```c
Month m = 20;
```

This is permitted by the C language's rules for enumeration types, although `20` is not one of the named months.

Therefore, when a value comes from user input or an external source, validate it before using it as an array index.

### 11.2. Array indexes must be valid

This is safe:

```c
MonthNames[1];
MonthNames[12];
```

But this is unsafe:

```c
MonthNames[20];
```

The array contains only thirteen elements, with valid indexes from `0` to `12`.

Accessing an element outside the array bounds causes undefined behavior.

### 11.3. `char *MonthNames[]` versus `char MonthNames[][20]`

There are multiple ways to store strings in an array.

**Array of character pointers:**

```c
char *MonthNames[] = {
    "",
    "Farvardin",
    "Ordibehesht",
    "Khordad"
};
```

Each array element is a pointer to a string.

**Two-dimensional character array:**

```c
char MonthNames[][20] = {
    "",
    "Farvardin",
    "Ordibehesht",
    "Khordad"
};
```

Each row provides space for up to 19 characters plus the terminating `'\0'`.

The first approach is suitable when the strings do not need to be modified.

The second approach stores the character arrays directly and allows their contents to be modified.

### 11.4. Why can we use `%d` with an enum?

Enumeration constants are integer constants, and enumeration values can be passed to `printf()` using `%d` after the required integer argument conversion.

Therefore:

```c
printf("%d", m);
```

is appropriate for displaying the numeric value.

### 11.5. Is `Month` an integer type?

`Month` is an enumeration type.

In C, its compatible integer type is implementation-defined, but enumeration values are integer values and can be used in integer expressions.

Do not assume that every enumeration always has a particular storage size.

---

## 12. Improved Version with Input Validation

The original program is correct for displaying all twelve months.

However, we can improve it by allowing the user to enter a month number and then displaying the corresponding name.

```c
#include <stdio.h>

typedef enum months {
    FAR = 1,
    ORD,
    KHR,
    TIR,
    MOR,
    SHR,
    MHR,
    ABN,
    AZR,
    DAY,
    BAH,
    ESF
} Month;

int main()
{
    Month m;

    const char *MonthNames[] = {
        "",
        "Farvardin",
        "Ordibehesht",
        "Khordad",
        "Tir",
        "Mordad",
        "Shahrivar",
        "Mehr",
        "Aban",
        "Azar",
        "Day",
        "Bahman",
        "Esfand"
    };

    int number;

    printf("Enter month number (1-12): ");

    if(scanf("%d", &number) != 1)
    {
        printf("Invalid input!\n");
        return 1;
    }

    if(number >= FAR && number <= ESF)
    {
        m = (Month)number;

        printf("Month number: %d\n", m);
        printf("Month name: %s\n", MonthNames[m]);
    }
    else
    {
        printf("Invalid month number!\n");
    }

    return 0;
}
```

### What has changed?

**1. Using `const char *`**

```c
const char *MonthNames[];
```

The strings are string literals, which should not be modified.

Using `const` helps prevent accidental modification through these pointers.

**2. Getting input from the user**

```c
scanf("%d", &number);
```

The user enters a number between 1 and 12.

**3. Checking whether input is valid**

```c
if(number >= FAR && number <= ESF)
```

This checks that the entered number is within the valid month range.

**4. Converting the integer into an enumeration value**

```c
m = (Month)number;
```

This is an explicit type conversion, also called a cast.

**5. Displaying the month name**

```c
printf("Month name: %s\n", MonthNames[m]);
```

The entered month number is used as the array index.

### Example execution

Input:

```text
Enter month number (1-12): 7
```

Output:

```text
Month number: 7
Month name: Mehr
```

Another example:

Input:

```text
Enter month number (1-12): 15
```

Output:

```text
Invalid month number!
```

---

## 13. Compilation and Execution

If you use GCC, save the source file as:

```text
main.c
```

Compile:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o months
```

Run on Linux:

```bash
./months
```

Run on Windows PowerShell:

```powershell
.\months.exe
```

Note: The program only uses `stdio.h`, so no additional math or other libraries are required.

---

## 14. Practice Exercises

Try completing these exercises to improve your understanding.

### Exercise 1: Display the month number

Write a program that asks the user for a month number and displays its corresponding name.

### Exercise 2: Display the previous month

Ask the user for a month number and display the previous month.

For example:

```text
Input: 5
Output: Tir
```

### Exercise 3: Display the next month

Ask the user for a month number and display the next month.

For example:

```text
Input: 5
Output: Shahrivar
```

Decide how your program should handle Esfand, the last month.

### Exercise 4: Use `enum` for weekdays

Create an enumeration for the seven days of the week and use an array of strings to display their names.

### Exercise 5: Display months in reverse order

Modify the original `for` loop so that the months are printed from Esfand to Farvardin.

### Exercise 6: Create a month selection menu

Display a menu containing all twelve months. Let the user enter a number and print the selected month.

---

## 15. Summary

In this program, we learned how to combine enumerations and arrays in C.

The most important declaration is:

```c
typedef enum months {
    FAR = 1, ORD, KHR, TIR, MOR, SHR,
    MHR, ABN, AZR, DAY, BAH, ESF
} Month;
```

It defines twelve named integer constants and creates the type alias `Month`.

The array:

```c
char *MonthNames[];
```

stores the names of the twelve months.

Finally:

```c
for(m = FAR; m <= ESF; m++)
{
    printf("%3d %s\n", m, MonthNames[m]);
}
```

uses enumeration values as array indexes to display all month names.

**The main concept to remember:**

An enumeration provides meaningful names for integer constants, while an array allows us to associate each integer value with its corresponding string.

These techniques are useful when developing menus, state machines, communication protocols, embedded systems, and other C applications.
