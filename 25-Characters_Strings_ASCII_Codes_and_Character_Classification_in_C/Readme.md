# 25-Characters, Strings, ASCII Codes, and Character Classification in C

## 1. Introduction

In this project, we begin learning about **characters and strings in the C programming language**.

Characters and strings are fundamental concepts in C. They are used in almost every application, including:

- Reading user input.
- Processing text.
- Handling commands.
- Working with communication protocols.
- Validating input.
- Processing files.
- Developing embedded systems.

This project introduces the following concepts:

1. Difference between a character and a string.
2. Character variables using `char`.
3. How C stores strings.
4. ASCII character codes.
5. Reading characters using `getchar()`.
6. Detecting the end of input using `EOF`.
7. Character classification using `<ctype.h>`.
8. Digits, letters, uppercase and lowercase characters.
9. Punctuation and whitespace characters.
10. Conditional expressions using the ternary operator.

The program reads characters from standard input, displays their character codes, and determines what type of character each input represents.

## 2. What Is a Character in C?

A character is a single symbol, such as:

```text
A
b
7
?
@
+
```

In C, a character variable is declared using the `char` data type.

Example:

```c
char ch = 'A';
```

Here:

- `char` is the data type.
- `ch` is the variable name.
- `'A'` is the character value.

A character constant uses single quotation marks.

```c
char letter = 'A';
char digit = '5';
char symbol = '#';
```

**Important:** Single quotation marks are used for individual character constants, not for string literals.

## 3. What Is a String in C?

A string is a sequence of characters terminated by a special character called the **null character** (`'\0'`).

Unlike some programming languages, C does not have a separate built-in `string` data type.

Strings are usually represented using arrays of `char`.

Example:

```c
char name[] = "Amin";
```

The compiler stores this string as:

```text
Index:      0    1    2    3    4
Value:     'A'  'm'  'i'  'n' '\0'
```

The string contains four visible characters, but the array requires five elements because it must also store the null terminator.

Another example:

```c
char text[] = "Hello";
```

Memory representation:

```text
'H'  'e'  'l'  'l'  'o'  '\0'
```

### 3.1. Character vs. String

Compare these declarations:

```c
char ch = 'A';

char text[] = "A";
```

The first variable stores one character.

The second variable stores a string containing one visible character and a null terminator.

| Character | String |
|---|---|
| `char ch = 'A';` | `char text[] = "A";` |
| One character | A sequence of characters |
| Uses single quotes | Uses double quotes |
| Does not require a null terminator | Requires a null terminator when represented as a C string |

### 3.2. Accessing String Characters

You can access individual characters using array indexing.

```c
char name[] = "Amin";

printf("%c\n", name[0]);
printf("%c\n", name[1]);
printf("%c\n", name[2]);
printf("%c\n", name[3]);
```

Output:

```text
A
m
i
n
```

The null terminator is stored at:

```c
name[4]
```

You can check it using:

```c
if (name[4] == '\0')
{
    printf("End of string\n");
}
```

## 4. ASCII Character Codes

Computers store character data as numeric values.

In ASCII, each supported character has a corresponding numeric code.

For example:

| Character | Decimal ASCII code |
|---|---:|
| `A` | 65 |
| `B` | 66 |
| `C` | 67 |
| `a` | 97 |
| `b` | 98 |
| `c` | 99 |
| `0` | 48 |
| `1` | 49 |
| `2` | 50 |
| ` ` (space) | 32 |
| `!` | 33 |
| `?` | 63 |

For example:

```c
char ch = 'A';

printf("%c\n", ch);
printf("%d\n", ch);
```

Output on an ASCII-compatible system:

```text
A
65
```

The `%c` format specifier displays a character.

The `%d` format specifier displays its integer value.

**Important:** The C language does not require every implementation to use ASCII internally. The numeric values above describe ASCII and are correct on common ASCII-compatible systems. C guarantees that the basic decimal digits are consecutive and that the letters in each alphabetic range are consecutive, but code should not assume every character encoding is ASCII.

## 5. Understanding the Program

### 5.1. Header Files

```c
#include <stdio.h>
#include <ctype.h>
```

The program uses two standard C libraries.

**stdio.h**

Provides input and output functions, including:

- `printf()`
- `getchar()`

**ctype.h**

Provides functions for classifying and converting characters.

Examples:

- `isdigit()`
- `isalpha()`
- `islower()`
- `isupper()`
- `ispunct()`
- `isspace()`

### 5.2. The Main Function

```c
int main()
{
    char ch;
```

The original program declares `ch` as a `char`.

However, this should be changed to:

```c
int ch;
```

Why?

Because `getchar()` returns an `int`, not a `char`.

It must be able to return:

- A character value.
- The special value `EOF`, which indicates that no more input is available or that an input error occurred.

A `char` variable might not be able to represent `EOF` correctly.

Therefore, the correct declaration is:

```c
int ch;
```

## 6. Reading Characters Using getchar()

The original program uses:

```c
while ((ch = getchar()) != EOF)
```

The `getchar()` function reads one character from standard input.

For example, if the user enters:

```text
Hello
```

The program receives the characters one at a time:

```text
H
e
l
l
o
```

After the user presses Enter, the input stream also contains a newline character, unless the environment handles the input differently.

The loop continues until `getchar()` returns `EOF`.

### 6.1. What Is EOF?

`EOF` means End Of File.

It is a special value defined in `<stdio.h>`.

It indicates that no more input is available or that an input error occurred.

On common systems, you can send EOF from the keyboard using:

**Linux/macOS:**

```text
Ctrl + D
```

**Windows terminal:**

```text
Ctrl + Z
```

Usually, press Enter after the Windows key combination.

The exact behavior can depend on the terminal and input environment.

### 6.2. Why Use a While Loop?

```c
while ((ch = getchar()) != EOF)
```

This loop performs two operations:

1. Reads one character using `getchar()`.
2. Checks whether the returned value is different from `EOF`.

If it is not `EOF`, the program processes the character.

This makes it possible to read an entire input stream one character at a time.

## 7. Understanding Newline Characters

Your original program contains:

```c
if (ch == 10) continue;
```

The value `10` is the ASCII code for the line feed character (`LF`), which is represented in C by:

```c
'\n'
```

A clearer and more portable expression is:

```c
if (ch == '\n')
{
    continue;
}
```

The `continue` statement skips the remaining statements in the current loop iteration and starts the next iteration.

This means the program does not display information about newline characters.

For example, when the user enters:

```text
ABC
```

The program processes `A`, `B`, and `C`, but skips the newline generated when Enter is pressed.

## 8. Displaying the Character and Its Code

```c
printf("ASCII code of %c is %d.\n", ch, ch);
```

This statement displays the character and its numeric value.

The format specifiers are:

| Format | Meaning |
|---|---|
| `%c` | Display a character |
| `%d` | Display an integer |

Example:

```text
ASCII code of A is 65.
```

The original message says ASCII code. This is accurate on ASCII-compatible systems. More generally, the program displays the character's numeric value in the implementation's character encoding.

## 9. Character Classification Using ctype.h

The `<ctype.h>` library provides functions for checking character categories.

These functions return zero if the character does not belong to the requested category, and a nonzero value if it does.

The program uses five classification functions.

### 9.1. isdigit()

```c
isdigit(ch)
```

This function checks whether a character is a decimal digit.

Examples:

```c
isdigit('5');  // Nonzero
isdigit('9');  // Nonzero
isdigit('A');  // Zero
isdigit('?');  // Zero
```

The basic decimal digits are:

```text
0 1 2 3 4 5 6 7 8 9
```

Example:

```c
if (isdigit(ch))
{
    printf("%c is a digit.\n", ch);
}
else
{
    printf("%c is not a digit.\n", ch);
}
```

### 9.2. isalpha()

```c
isalpha(ch)
```

This function checks whether a character is an alphabetic letter in the current C locale.

Examples:

```c
isalpha('A');  // Nonzero
isalpha('z');  // Nonzero
isalpha('5');  // Zero
isalpha('#');  // Zero
```

Example:

```c
if (isalpha(ch))
{
    printf("%c is a letter.\n", ch);
}
```

### 9.3. islower()

```c
islower(ch)
```

This function checks whether a character is a lowercase letter.

Examples:

```c
islower('a');  // Nonzero
islower('z');  // Nonzero
islower('A');  // Zero
islower('7');  // Zero
```

### 9.4. isupper()

Although your program uses `islower()`, the `<ctype.h>` library also provides:

```c
isupper(ch)
```

It checks whether a character is an uppercase letter.

Examples:

```c
isupper('A');  // Nonzero
isupper('Z');  // Nonzero
isupper('a');  // Zero
```

The program uses this logic:

```c
if (isalpha(ch))
{
    if (islower(ch))
    {
        printf("%c is lowercase.\n", ch);
    }
    else
    {
        printf("%c is uppercase.\n", ch);
    }
}
```

The `isalpha()` condition is important. Without it, a digit or punctuation character would incorrectly be described as uppercase merely because `islower()` returned zero.

### 9.5. ispunct()

```c
ispunct(ch)
```

This function checks whether a character is a punctuation character in the current locale.

Examples:

```c
ispunct('!');  // Nonzero
ispunct('?');  // Nonzero
ispunct(',');  // Nonzero
ispunct('.');  // Nonzero
ispunct('A');  // Zero
```

Examples of punctuation:

```text
! ? . , ; : ' " ( ) [ ] { } -
```

The exact classification depends on the active locale.

### 9.6. isspace()

```c
isspace(ch)
```

This function checks whether a character is a whitespace character.

Whitespace characters include:

- Space (`' '`)
- Horizontal tab (`'\t'`)
- Newline (`'\n'`)
- Vertical tab (`'\v'`)
- Form feed (`'\f'`)
- Carriage return (`'\r'`)

Examples:

```c
isspace(' ');   // Nonzero
isspace('\t');  // Nonzero
isspace('\n');  // Nonzero
isspace('A');   // Zero
```

Your program skips `'\n'` before performing the classification. Therefore, it will not display the whitespace result for newline characters.

However, it can still classify spaces and tabs entered by the user.

## 10. Understanding the Ternary Operator

Your program uses this expression:

```c
printf(
    isdigit(ch) ? "%c is a digit.\n" : "%c is not a digit.\n",
    ch
);
```

This is an example of the **conditional operator**, also called the ternary operator.

Its general structure is:

```c
condition ? expression_if_true : expression_if_false;
```

It works as follows:

- If the condition is true, the first expression is selected.
- If the condition is false, the second expression is selected.

For example:

```c
int x = 10;

printf("%s", x > 5 ? "Greater than 5\n" : "Not greater than 5\n");
```

Output:

```text
Greater than 5
```

In your program:

```c
isdigit(ch) ? "%c is a digit.\n" : "%c is not a digit.\n"
```

Selects the appropriate format string.

The same approach is used for:

```c
printf(
    isalpha(ch) ? "%c is a letter.\n" : "%c is not a letter.\n",
    ch
);
```

And:

```c
printf(
    ispunct(ch) ? "%c is a punctuation.\n" : "%c is not a punctuation.\n",
    ch
);
```

The ternary operator can make short conditional expressions more compact.

For longer operations, a normal `if/else` statement is usually easier to read.

## 11. Corrected Complete Program

The following code keeps the original program's behavior but corrects the input variable type and safely calls the character classification functions.

It also uses `'\n'` instead of the numeric value `10`.

```c
#include <stdio.h>
#include <ctype.h>

int main(void)
{
    int ch;

    while ((ch = getchar()) != EOF)
    {
        if (ch == '\n')
        {
            continue;
        }

        printf("Character: %c\n", ch);
        printf("Character code: %d\n", ch);

        unsigned char c = (unsigned char)ch;

        printf(
            isdigit(c) ? "%c is a digit.\n" : "%c is not a digit.\n",
            ch
        );

        printf(
            isalpha(c) ? "%c is a letter.\n" : "%c is not a letter.\n",
            ch
        );

        if (isalpha(c))
        {
            printf(
                islower(c) ? "%c is lowercase.\n" : "%c is uppercase.\n",
                ch
            );
        }

        printf(
            ispunct(c) ? "%c is a punctuation character.\n"
                       : "%c is not a punctuation character.\n",
            ch
        );

        printf(
            isspace(c) ? "%c is a whitespace character.\n"
                       : "%c is not a whitespace character.\n",
            ch
        );

        printf("\n");
    }

    return 0;
}
```

### Why Do We Convert ch to unsigned char?

The classification functions in `<ctype.h>` require an argument whose value is either:

- `EOF`, or
- Representable as an `unsigned char`.

A plain `char` may be signed on some systems. If it contains a negative value, passing it directly to functions such as `isdigit()` can cause undefined behavior.

This line solves the issue:

```c
unsigned char c = (unsigned char)ch;
```

The original `ch` is still an `int`, so it can safely store `EOF`.

The converted value `c` is used with the classification functions.

## 12. Understanding the Original Commented Code

Your original program includes:

```c
/*
if (isdigit(ch))
    printf("%c is a digit.\n", ch);
else
    printf("%c is not a digit.\n", ch);
*/
```

This is a normal `if/else` implementation.

It can be replaced with the ternary expression:

```c
isdigit(ch)
    ? printf("%c is a digit.\n", ch)
    : printf("%c is not a digit.\n", ch);
```

Or with the format-string selection used in your program:

```c
printf(
    isdigit(c) ? "%c is a digit.\n" : "%c is not a digit.\n",
    ch
);
```

All three approaches can produce the same classification result when the character argument is valid.

## 13. Example Input and Output

Suppose the user enters:

```text
A5?
```

The program processes each character separately.

Expected output on an ASCII-compatible system:

```text
Character: A
Character code: 65
A is not a digit.
A is a letter.
A is uppercase.
A is not a punctuation character.
A is not a whitespace character.

Character: 5
Character code: 53
5 is a digit.
5 is not a letter.
5 is not a punctuation character.
5 is not a whitespace character.

Character: ?
Character code: 63
? is not a digit.
? is not a letter.
? is a punctuation character.
? is not a whitespace character.
```

The newline produced by pressing Enter is skipped.

To stop the program, send EOF using the appropriate terminal key combination.

## 14. Important Character Classification Functions

The following table summarizes useful functions from `<ctype.h>`.

| Function | Purpose | Example |
|---|---|---|
| `isdigit(c)` | Checks decimal digits | `'5'` |
| `isalpha(c)` | Checks alphabetic letters | `'A'` |
| `islower(c)` | Checks lowercase letters | `'a'` |
| `isupper(c)` | Checks uppercase letters | `'Z'` |
| `isalnum(c)` | Checks letters or digits | `'A'`, `'5'` |
| `ispunct(c)` | Checks punctuation | `'!'` |
| `isspace(c)` | Checks whitespace | `' '` |
| `isxdigit(c)` | Checks hexadecimal digits | `'F'`, `'9'` |
| `isprint(c)` | Checks printable characters, including space | `'A'` |
| `isgraph(c)` | Checks printable characters except space | `'A'` |
| `iscntrl(c)` | Checks control characters | `'\n'` |

Remember that these functions return zero or a nonzero value, not necessarily exactly `1`.

## 15. ASCII Ranges

On ASCII-compatible systems, the following ranges are commonly used:

| Character category | Decimal range |
|---|---|
| Digits | 48–57 |
| Uppercase letters | 65–90 |
| Lowercase letters | 97–122 |

For example:

```c
'A' = 65
'Z' = 90

'a' = 97
'z' = 122

'0' = 48
'9' = 57
```

You can use these ranges to understand how ASCII classification works.

However, for general C programs, prefer `<ctype.h>` functions instead of manually checking numeric ranges. The library functions are designed to follow the active locale and avoid assumptions about character encoding.

## 16. Strings and Character Classification

The classification functions can also be used to process strings.

For example:

```c
#include <stdio.h>
#include <ctype.h>

int main(void)
{
    char text[] = "Hello123";

    int i = 0;

    while (text[i] != '\0')
    {
        unsigned char c = (unsigned char)text[i];

        if (isalpha(c))
        {
            printf("%c is a letter.\n", c);
        }
        else if (isdigit(c))
        {
            printf("%c is a digit.\n", c);
        }

        i++;
    }

    return 0;
}
```

Output:

```text
H is a letter.
e is a letter.
l is a letter.
l is a letter.
o is a letter.
1 is a digit.
2 is a digit.
3 is a digit.
```

Notice the difference:

- Your original program reads characters from an input stream using `getchar()`.
- This example reads characters from a string stored in a character array.

Both approaches process one character at a time.

## 17. Useful String Functions

The standard C library provides several functions for working with strings through `<string.h>`.

| Function | Purpose |
|---|---|
| `strlen()` | Calculates string length, excluding `'\0'` |
| `strcpy()` | Copies a string |
| `strncpy()` | Copies up to a specified number of characters |
| `strcat()` | Appends one string to another |
| `strcmp()` | Compares two strings |
| `strchr()` | Finds a character in a string |
| `strstr()` | Finds a substring |

Example:

```c
#include <stdio.h>
#include <string.h>

int main(void)
{
    char name[] = "Amin";

    printf("Name: %s\n", name);
    printf("Length: %zu\n", strlen(name));

    return 0;
}
```

Output:

```text
Name: Amin
Length: 4
```

`strlen()` does not count the null terminator.

## 18. Compile and Run

Using GCC:

```bash
gcc main.c -o character_analyzer
```

For compiler warnings:

```bash
gcc -Wall -Wextra -std=c11 main.c -o character_analyzer
```

Run on Linux or macOS:

```bash
./character_analyzer
```

Run on Windows:

```powershell
.\character_analyzer.exe
```

Enter characters and observe their classifications.

To terminate input, use EOF:

- Linux/macOS: `Ctrl + D`
- Windows terminal: `Ctrl + Z`, usually followed by Enter.

## 19. Exercises

### Exercise 1 — Count Characters

Modify the program to count the number of characters entered before EOF.

### Exercise 2 — Count Digits

Count how many numeric digits the user enters.

Example:

```text
Input:
Amin1234

Digits:
4
```

### Exercise 3 — Count Letters

Count the number of alphabetic characters.

### Exercise 4 — Count Uppercase and Lowercase Letters

Display separate counts for uppercase and lowercase letters.

### Exercise 5 — Count Whitespace Characters

Count spaces, tabs, and other whitespace characters.

For this exercise, do not skip newline characters before classification.

### Exercise 6 — Convert Lowercase to Uppercase

Use:

```c
toupper(ch);
```

Example:

```text
Input:
hello

Output:
HELLO
```

### Exercise 7 — Convert Uppercase to Lowercase

Use:

```c
tolower(ch);
```

Example:

```text
Input:
HELLO

Output:
hello
```

### Exercise 8 — Analyze a Complete String

Instead of reading characters with `getchar()`, read a string into a character array and analyze every element until `'\0'`.

### Exercise 9 — Validate a Password

Write a program that checks whether a password contains:

- At least one uppercase letter.
- At least one lowercase letter.
- At least one digit.
- At least one punctuation character.

## 20. Learning Objectives

After completing this project, you should understand:

- The difference between a character and a string.
- How C represents strings using character arrays.
- The purpose of the null terminator.
- How character codes work.
- How to read characters using `getchar()`.
- Why `getchar()` returns `int`.
- How `EOF` works.
- How to classify characters using `<ctype.h>`.
- How to use `isdigit()`, `isalpha()`, `islower()`, `ispunct()`, and `isspace()`.
- How the ternary operator works.
- How to process strings one character at a time.

## 21. Next Step

The next recommended project is **String Input and String Manipulation in C**.

It should cover:

1. Reading strings using `scanf()`.
2. Reading complete lines using `fgets()`.
3. String arrays and null termination.
4. Calculating string length.
5. Copying and comparing strings.
6. Concatenating strings.
7. Searching inside strings.
8. Converting uppercase and lowercase letters.
9. Implementing string functions manually.

These concepts are especially useful when processing commands, serial communication messages, TCP data, and text-based protocols in embedded systems.