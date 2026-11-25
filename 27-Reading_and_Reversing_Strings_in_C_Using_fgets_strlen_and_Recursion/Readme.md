# 27-Reading and Reversing Strings in C Using `fgets()`, `strlen()`, and Recursion

## 1. Introduction

In C programming, strings are sequences of characters stored in character arrays.

In this lesson, we will learn how to:

- Read a complete line of text from the user.
- Store the input in a character array.
- Use `fgets()` to safely read strings.
- Calculate string length using `strlen()`.
- Understand the null terminator (`'\0'`).
- Reverse a string using recursion.
- Understand how recursive function calls work.

Our program asks the user to enter a line of text, displays the entered text, calculates its length, and then prints the text in reverse order.

For example, if the user enters:

```text
Hello World
```

The program displays:

```text
Entered text is:
Hello World

Length of entered text: 11

Reversed text:
dlroW olleH
```

## 2. Required Header Files

The program uses the following header:

```c
#include <stdio.h>
#include <string.h>
```

### `<stdio.h>`

This header provides standard input/output functions, including:

- `printf()` – Displays formatted output.
- `fgets()` – Reads a line of text.
- `putchar()` – Prints a single character.
- `stdin` – Represents the standard input stream.

### `<string.h>`

This header provides string-handling functions, including:

- `strlen()` – Calculates the length of a string.
- `strcpy()` – Copies a string.
- `strcat()` – Concatenates strings.
- `strcmp()` – Compares strings.
- `strchr()` – Searches for a character.
- `strcspn()` – Finds the length of the initial segment containing none of the specified characters.

The original program uses `strlen()` but does not include `<string.h>`. This should be corrected.

## 3. Understanding the Source Code

Let's first examine the original program:

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char str[50];

    printf("Enter a line of text:\n");
    fgets(str, 50, stdin);

    printf("\nEntered text is:\n%s\n", str);

    printf("Length of entered text: %d\n", strlen(str) - 1);

    printf("\nReversed text:\n");
    ReverseString(str);
    printf("\n");

    return 0;
}

void ReverseString(const char *s)
{
    if (s[0] == '\0')
    {
        return;
    }
    else
    {
        ReverseString(&s[1]);

        if (s[0] != '\n')
        {
            putchar(s[0]);
        }
    }
}
```

We will examine each part and then build a corrected version.

## 4. Understanding Character Arrays

```c
char str[50];
```

This statement creates an array capable of storing 50 characters.

In C, a string is stored as a character array ending with a special character called the null terminator:

```c
'\0'
```

For example:

```c
char name[] = "Amin";
```

The array contains:

| Index | Character |
|---:|:---:|
| 0 | `A` |
| 1 | `m` |
| 2 | `i` |
| 3 | `n` |
| 4 | `\0` |

Although `"Amin"` contains four visible characters, the array needs five elements to store the null terminator.

This is essential because C uses `'\0'` to determine where a string ends.

## 5. Reading a Line Using `fgets()`

The original program uses:

```c
fgets(str, 50, stdin);
```

The function prototype is:

```c
char *fgets(char *str, int size, FILE *stream);
```

It receives three arguments:

| Argument | Description |
|---|---|
| `str` | Destination character array |
| `size` | Maximum number of characters to store, including the null terminator |
| `stream` | Input stream from which data is read |

### 5.1. Understanding `str`

```c
fgets(str, 50, stdin);
```

The first argument is the destination array.

The characters entered by the user are stored inside `str`.

### 5.2. Understanding `50`

The second argument specifies the maximum number of characters that `fgets()` can store, including the terminating `'\0'`.

For an array of 50 characters, the function can store at most 49 input characters plus the null terminator.

This prevents writing beyond the end of the array.

### 5.3. Understanding `stdin`

`stdin` represents the standard input stream.

Normally, this is the keyboard.

Therefore:

```c
fgets(str, 50, stdin);
```

means:

Read a line from standard input and store it in `str`, reading no more than 49 input characters.

### 5.4. Does `fgets()` Store the Newline?

Yes.

If the user enters:

```text
Hello World
```

and presses Enter, `fgets()` normally stores the newline character `'\n'` as part of the string, provided there is room for it.

The array will conceptually contain:

```text
H e l l o   W o r l d \n \0
```

The newline is different from the null terminator:

- `'\n'` represents the newline entered when the user presses Enter.
- `'\0'` marks the end of the C string.

This distinction is important when calculating string length and reversing strings.

## 6. Understanding `strlen()`

The original program contains:

```c
strlen(str) - 1
```

The `strlen()` function calculates the number of characters in a string, excluding the null terminator.

Its prototype is:

```c
size_t strlen(const char *str);
```

For example:

```c
char text[] = "Hello";

printf("Length = %zu\n", strlen(text));
```

Output:

```text
Length = 5
```

The null terminator is not included in the result.

### 6.1. Why Does the Original Code Subtract One?

The original program uses:

```c
strlen(str) - 1
```

This is because `fgets()` normally stores the newline character `'\n'` when the user presses Enter.

For example, the stored string may be:

```text
Hello\n\0
```

The length is 6:

- `H`
- `e`
- `l`
- `l`
- `o`
- `\n`

Therefore:

```c
strlen(str) - 1
```

produces 5.

However, this method is not always safe.

If the user enters more characters than the array can hold, `fgets()` may fill the buffer without reading the newline. In that situation, subtracting one would incorrectly reduce the length.

It is better to explicitly remove the newline before calculating the string length.

## 7. Understanding Recursion

The most interesting part of this program is the following function:

```c
void ReverseString(const char *s)
{
    if (s[0] == '\0')
    {
        return;
    }
    else
    {
        ReverseString(&s[1]);

        if (s[0] != '\n')
        {
            putchar(s[0]);
        }
    }
}
```

This function reverses the displayed order of the characters using recursion.

### 7.1. What Is Recursion?

Recursion is a programming technique in which a function calls itself.

For example:

```c
void CountDown(int n)
{
    if (n == 0)
    {
        return;
    }

    printf("%d\n", n);

    CountDown(n - 1);
}
```

Calling:

```c
CountDown(5);
```

produces:

```text
5
4
3
2
1
```

Every recursive function needs a termination condition. Without one, the function may continue calling itself until the program runs out of stack space.

### 7.2. Understanding the Function Parameter

```c
void ReverseString(const char *s)
```

The parameter is a pointer to a constant character.

It means:

- `s` points to a character or the beginning of a string.
- The function can read the characters.
- The function cannot modify the characters through this pointer.

The keyword `const` protects the original string from accidental modification through `s`.

### 7.3. The Base Case

```c
if (s[0] == '\0')
{
    return;
}
```

This condition checks whether the current character is the null terminator.

If it is, the function returns without making another recursive call.

This is called the base case.

The base case prevents infinite recursion.

### 7.4. Moving to the Next Character

```c
ReverseString(&s[1]);
```

This is the key instruction.

Let's understand it carefully.

- `s` points to the current character.
- `s[1]` represents the next character.
- `&s[1]` represents the address of the next character.

Therefore:

```c
ReverseString(&s[1]);
```

calls the same function using the next character as its starting point.

For example, if the string is:

```text
ABC
```

The recursive calls work as follows:

```text
ReverseString(&s[0])  // A
    ReverseString(&s[1])  // B
        ReverseString(&s[2])  // C
            ReverseString(&s[3])  // '\0'
```

When the null terminator is reached, recursion stops.

### 7.5. Printing Characters After the Recursive Call

```c
putchar(s[0]);
```

Notice that this instruction appears after the recursive call.

This is the reason the characters are printed in reverse order.

The function first moves to the end of the string. Then, as the recursive calls return, it prints each character.

For the string:

```text
ABC
```

The execution order is:

```text
1. Call with A
2. Call with B
3. Call with C
4. Reach '\0' and return
5. Print C
6. Print B
7. Print A
```

Final output:

```text
CBA
```

This is an important property of recursion: statements after a recursive call execute while the previous function calls are returning.

## 8. Understanding `putchar()`

The function:

```c
putchar(s[0]);
```

prints one character to standard output.

For example:

```c
putchar('A');
putchar('B');
putchar('C');
```

Output:

```text
ABC
```

Unlike `printf()`, `putchar()` is designed to output a single character.

In our recursive function, it prints one character at a time in reverse order.

## 9. Corrected and Improved Program

There are several improvements we should make to the original program:

1. Include `<string.h>` because we use string functions.
2. Add a function prototype before `main()`.
3. Check whether `fgets()` successfully reads input.
4. Remove the newline safely instead of assuming it is always present.
5. Use `%zu` to display the return value of `strlen()`, because its type is `size_t`.
6. Remove the unnecessary `<stdlib.h>` header.

Here is the complete corrected program:

```c
#include <stdio.h>
#include <string.h>

void ReverseString(const char *s);

int main(void)
{
    char str[50];

    printf("Enter a line of text:\n");

    if (fgets(str, sizeof(str), stdin) == NULL)
    {
        printf("Error: Unable to read input.\n");
        return 1;
    }

    /* Remove the newline character, if present */
    str[strcspn(str, "\r\n")] = '\0';

    printf("\nEntered text is:\n%s\n", str);

    printf("Length of entered text: %zu\n", strlen(str));

    printf("\nReversed text:\n");
    ReverseString(str);
    printf("\n");

    return 0;
}

void ReverseString(const char *s)
{
    if (s[0] == '\0')
    {
        return;
    }

    ReverseString(&s[1]);

    putchar(s[0]);
}
```

### 9.1. Understanding the Improvements

**Using `sizeof(str)`**

```c
fgets(str, sizeof(str), stdin);
```

Instead of writing `50` directly, we use `sizeof(str)`.

This makes the code easier to maintain if the array size changes later.

**Checking the return value of `fgets()`**

```c
if (fgets(str, sizeof(str), stdin) == NULL)
```

`fgets()` returns `NULL` if it cannot read any characters because of an error or because the end of the input stream is reached before reading any characters.

Checking its return value prevents using an uninitialized string.

**Removing the newline**

```c
str[strcspn(str, "\r\n")] = '\0';
```

The function `strcspn()` finds the position of the first character that matches either `'\r'` or `'\n'`.

We replace that character with `'\0'`.

This removes the line ending when present.

If neither character exists, `strcspn()` returns the length of the string, and assigning `'\0'` at that position leaves the string unchanged.

**Calculating the length**

```c
strlen(str)
```

Now the newline has been removed, so the returned length is exactly the number of text characters.

**Printing the length**

```c
printf("Length of entered text: %zu\n", strlen(str));
```

The `%zu` format specifier is appropriate for `size_t`, the type returned by `strlen()`.

## 10. Program Output

Example 1:

Input:

```text
Hello World
```

Output:

```text
Enter a line of text:

Entered text is:
Hello World
Length of entered text: 11

Reversed text:
dlroW olleH
```

Example 2:

Input:

```text
Embedded Systems
```

Output:

```text
Enter a line of text:

Entered text is:
Embedded Systems
Length of entered text: 16

Reversed text:
smetsyS deddebmE
```

Example 3:

Input:

```text
12345
```

Output:

```text
Enter a line of text:

Entered text is:
12345
Length of entered text: 5

Reversed text:
54321
```

## 11. How Recursion Reverses a String

Consider this string:

```text
CODE
```

The recursive function first moves through the characters:

```text
C → O → D → E → '\0'
```

Then it returns through the function calls:

```text
E → D → O → C
```

The result is:

```text
EDOC
```

The important point is that the function does not modify the original character array. It only changes the order in which characters are printed.

## 12. Recursive Reversal vs. In-Place Reversal

There are different ways to reverse a string.

### Method 1: Recursive Printing

Our current method:

```c
void ReverseString(const char *s)
{
    if (*s == '\0')
    {
        return;
    }

    ReverseString(s + 1);
    putchar(*s);
}
```

Characteristics:

- Does not modify the original string.
- Uses recursive function calls.
- Requires additional call-stack memory proportional to the string length.
- Prints the reversed characters directly.

### Method 2: Reversing the Array Itself

Another approach is to swap characters inside the array.

```c
#include <stdio.h>
#include <string.h>

void ReverseString(char *s)
{
    size_t left = 0;
    size_t right = strlen(s);

    if (right == 0)
    {
        return;
    }

    right--;

    while (left < right)
    {
        char temp = s[left];

        s[left] = s[right];
        s[right] = temp;

        left++;
        right--;
    }
}

int main(void)
{
    char str[] = "Hello World";

    ReverseString(str);

    printf("Reversed string: %s\n", str);

    return 0;
}
```

Output:

```text
Reversed string: dlroW olleH
```

This second method modifies the original string.

Comparison:

| Feature | Recursive printing | In-place reversal |
|---|---|---|
| Uses recursion | Yes | No |
| Modifies original string | No | Yes |
| Additional memory | O(N) call stack | O(1) |
| Time complexity | O(N) | O(N) |
| Output | Prints reversed characters | Stores reversed string |

Both approaches are useful for learning different programming concepts.

## 13. Important Notes

- A C string must end with `'\0'`.
- `fgets()` reads a line and limits the number of characters stored.
- `fgets()` normally retains the newline if it reads one and has enough space.
- `strlen()` does not count the null terminator.
- The return type of `strlen()` is `size_t`.
- Use `%zu` to print a `size_t` value.
- `putchar()` prints one character.
- A recursive function calls itself.
- Every recursive function needs a base case.
- `ReverseString()` prints the characters in reverse order but does not modify the original array.
- Recursive functions consume stack space. For very long strings, an iterative approach is generally safer.
- This example reverses bytes, not necessarily complete Unicode characters. UTF-8 characters may occupy multiple bytes.

**Important buffer limitation:** `fgets()` can read at most 49 input characters into `str[50]`. If the user enters a longer line, the remaining characters stay in the input stream and may be read by a later operation. The program above processes the portion that fits in the array.

## 14. Compilation and Execution

Using GCC:

```bash
gcc main.c -o reverse_string
```

Run on Linux:

```bash
./reverse_string
```

Run on Windows:

```powershell
gcc main.c -o reverse_string.exe
.\reverse_string.exe
```

## 15. Exercises

Try the following exercises to improve your understanding.

**Exercise 1:**

Modify the program so that the user can enter a string containing spaces, numbers, and special characters.

**Exercise 2:**

Write a recursive function that counts the number of characters in a string without using `strlen()`.

Suggested function prototype:

```c
size_t StringLength(const char *s);
```

**Exercise 3:**

Write a recursive function that counts the number of vowels in a string.

**Exercise 4:**

Write a recursive function that prints a string in reverse order without using `putchar()`. Use `printf()` instead.

**Exercise 5:**

Write a function that checks whether a string is a palindrome.

Examples:

```text
madam  → Palindrome
level  → Palindrome
hello  → Not a palindrome
```

**Exercise 6:**

Implement both recursive and iterative string reversal. Compare their behavior and memory usage.

## 16. Learning Objectives

After completing this lesson, you should understand:

- How to declare and initialize character arrays.
- How to read text using `fgets()`.
- The difference between `'\n'` and `'\0'`.
- How to calculate string length using `strlen()`.
- How to use `strcspn()` to remove line endings.
- How to use `putchar()` to print individual characters.
- How recursion works.
- How to reverse a string using recursive function calls.
- The difference between printing a reversed string and modifying the original array.
