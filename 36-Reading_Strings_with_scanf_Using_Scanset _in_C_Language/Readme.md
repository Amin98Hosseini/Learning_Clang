# 36-Reading Strings with `scanf()` Using a Scanset in C

## 1. Introduction

In this project, we learn how to use the **scanset feature of `scanf()`** to read characters from standard input according to a specified set of characters.

Unlike the common `%s` format specifier, which reads characters until it encounters whitespace, a scanset lets us define exactly which characters should be accepted or where input reading should stop.

The program uses this format:

```c
scanf("%[^aeiou]", str);
```

This scanset tells `scanf()` to read characters until it encounters one of the following lowercase vowels:

- `a`
- `e`
- `i`
- `o`
- `u`

In other words, it reads all characters that are **not lowercase vowels**.

This is an example of a negated scanset.

## 2. Complete Source Code

Here is the original program:

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char str[10];

    printf("Enter the string: ");
    scanf("%[^aeiou]", str);
    printf("\n");

    printf("Result:\n");
    puts(str);
    printf("\n");

    return 0;
}
```

**Important:** The original code has two potential problems:

1. `str` can store at most 9 input characters plus the terminating null character. The scanset has no width limit, so a longer input can cause a buffer overflow.
2. If the first input character is a lowercase vowel, `scanf()` does not assign anything to `str`. Calling `puts(str)` afterward would then use an uninitialized array.

We will fix these problems in the safer version later in this tutorial.

## 3. Required Header Files

### `stdio.h`

Provides standard input and output functions.

This program uses:

- `printf()` to display messages.
- `scanf()` to read input.
- `puts()` to display a string followed by a newline.

### `stdlib.h`

Provides general-purpose utility functions.

The original program does not use any function from this library, so this header can be removed.

## 4. Understanding the Scanset in `scanf()`

The most important part of this program is:

```c
scanf("%[^aeiou]", str);
```

To understand it, we need to examine how a scanset works.

A scanset is a feature of the `scanf()` family of functions that allows us to specify a set of characters to be accepted during input.

Its general format is:

```c
%[characters]
```

For example:

```c
scanf("%[abc]", str);
```

This reads consecutive characters as long as each character is `a`, `b`, or `c`.

### What does `^` mean?

When the caret character `^` appears immediately after the opening square bracket, it negates the scanset.

For example:

```c
%[^abc]
```

means:

Read characters until a character belonging to the set `a`, `b`, or `c` is encountered.

The caret does not mean that the program searches for the literal `^` character. It means that the specified set is excluded.

### Understanding `%[^aeiou]`

In our program:

```c
scanf("%[^aeiou]", str);
```

The scanset excludes these characters:

| Character | Description |
|---|---|
| `a` | Lowercase a |
| `e` | Lowercase e |
| `i` | Lowercase i |
| `o` | Lowercase o |
| `u` | Lowercase u |

Therefore, the function reads characters until it finds one of these lowercase vowels.

For example, if the user enters:

```text
Hello World
```

The input is processed as follows:

- `H` is accepted.
- `e` is a lowercase vowel, so input reading stops.
- The remaining characters are not consumed by this conversion.

The result stored in `str` is:

```text
H
```

## 5. Understanding the Program Step by Step

### Step 1: Declare the character array

```c
char str[10];
```

This creates an array capable of storing 10 characters.

However, a C string must end with the null character `'\0'`.

Therefore, the array can hold:

- Up to 9 ordinary characters.
- 1 terminating null character.

For example:

```text
Hello\0
```

uses 6 array elements.

### Step 2: Display the input message

```c
printf("Enter the string: ");
```

This displays a message asking the user to enter a string.

### Step 3: Read characters using the scanset

```c
scanf("%[^aeiou]", str);
```

This is the central instruction.

The function reads consecutive characters until it encounters a lowercase vowel.

Unlike `%s`, the scanset does not automatically stop at spaces.

For example, if the input is:

```text
BCD Hello 123
```

all characters are accepted because none of them is a lowercase vowel.

The resulting string is:

```text
BCD Hello 123
```

However, the original array has only 10 elements, so this example would overflow the buffer. The safe version must specify a maximum input width.

### Step 4: Print a newline

```c
printf("\n");
```

This moves the cursor to the next line.

### Step 5: Display the result

```c
printf("Result:\n");
puts(str);
```

`printf()` displays the result heading.

`puts()` prints the string and automatically adds a newline at the end.

## 6. Expected Output Examples

### Example 1: Input starts with a consonant

Input:

```text
Enter the string: Hello
```

The first character is `H`, which is accepted.

The next character is `e`, which is excluded.

Output:

```text
Result:
H
```

### Example 2: Input contains no lowercase vowels

Input:

```text
Enter the string: BCDXYZ
```

All characters are accepted.

Output:

```text
Result:
BCDXYZ
```

### Example 3: Input contains spaces

Input:

```text
Enter the string: BCD XYZ 123
```

Spaces are not part of the excluded set, so they are accepted.

Output:

```text
Result:
BCD XYZ 123
```

This is an important difference between `%s` and `%[^aeiou]`.

### Example 4: Input starts with a lowercase vowel

Input:

```text
Enter the string: apple
```

The first character is `a`, which belongs to the excluded set.

Therefore, the scanset matches zero characters.

The `scanf()` conversion fails to assign a string to `str`. The original program then attempts to print an uninitialized array, which causes undefined behavior.

We must check the return value of `scanf()` before using the array.

## 7. Difference Between `%s` and `%[^aeiou]`

These two format specifiers behave differently.

| Feature | `%s` | `%[^aeiou]` |
|---|---|---|
| Reads characters | Until whitespace | Until a lowercase vowel |
| Accepts spaces | No | Yes |
| Accepts digits | Yes | Yes |
| Accepts punctuation | Yes | Yes |
| Can use a field width | Yes | Yes |
| Can be used with a scanset | No | Yes |

For example, consider this input:

```text
BCD XYZ
```

Using:

```c
scanf("%s", str);
```

The result is:

```text
BCD
```

Using:

```c
scanf("%[^aeiou]", str);
```

The result is:

```text
BCD XYZ
```

The scanset continues reading across spaces because a space is not excluded.

## 8. Important: Prevent Buffer Overflow

The original code uses:

```c
char str[10];

scanf("%[^aeiou]", str);
```

This is unsafe because the scanset has no maximum field width.

If the user enters more than 9 accepted characters, `scanf()` can write beyond the array boundaries.

This causes a **buffer overflow**, which can lead to unpredictable behavior or program crashes.

For a 10-character array, we should limit the input to 9 characters:

```c
scanf("%9[^aeiou]", str);
```

The number `9` specifies the maximum number of input characters to store.

The remaining array element is reserved for `'\0'`, which `scanf()` automatically appends after a successful scanset conversion.

**Important:** A field width prevents writing beyond the array, but it does not guarantee that the entire input line has been consumed. Any remaining input stays in the input stream.

## 9. Safer Complete Version

The following version fixes the buffer overflow problem and checks whether the scanset successfully reads any characters.

```c
#include <stdio.h>

int main()
{
    char str[10];

    printf("Enter the string: ");

    if (scanf("%9[^aeiou]", str) == 1)
    {
        printf("\nResult:\n");
        puts(str);
    }
    else
    {
        printf("\nNo valid characters were read.\n");
    }

    return 0;
}
```

### What has changed?

**1. Removed the unnecessary header**

```c
#include <stdio.h>
```

The program only needs standard input/output functions.

**2. Added a field width**

```c
scanf("%9[^aeiou]", str);
```

This prevents the function from storing more than 9 input characters in the 10-element array.

**3. Checked the return value**

```c
if (scanf("%9[^aeiou]", str) == 1)
```

`scanf()` returns the number of successfully assigned input items.

For this program:

- `1` means the scanset successfully read and assigned a string.
- `0` means no characters matched the scanset.
- `EOF` means an input failure or end-of-file occurred before the conversion could begin.

The program only prints `str` when the conversion succeeds.

## 10. Important Behavior: Input Is Not Automatically Consumed Completely

Suppose the user enters:

```text
BCD123456789XYZ
```

With:

```c
char str[10];
scanf("%9[^aeiou]", str);
```

The first call reads only the first 9 characters:

```text
BCD123456
```

The remaining characters:

```text
789XYZ
```

stay in the input stream.

This matters if you plan to read more input afterward.

If your goal is to process a complete input line safely, `fgets()` is often a better choice because it provides a clear buffer-size limit. You can then process the received string yourself.

## 11. More Scanset Examples

### Example 1: Read only digits

```c
scanf("%[0123456789]", str);
```

Reads consecutive digits.

Input:

```text
12345ABC
```

Result:

```text
12345
```

### Example 2: Read only lowercase letters

```c
scanf("%[abcdefghijklmnopqrstuvwxyz]", str);
```

Reads consecutive lowercase English letters.

Input:

```text
hello123
```

Result:

```text
hello
```

### Example 3: Read everything except digits

```c
scanf("%[^0123456789]", str);
```

Reads characters until a digit is encountered.

Input:

```text
Hello123
```

Result:

```text
Hello
```

### Example 4: Read everything except spaces

```c
scanf("%[^ ]", str);
```

Reads characters until a space is encountered.

This behaves similarly to `%s` for ordinary input, although the handling of other whitespace characters differs.

### Example 5: Read letters and spaces

```c
scanf("%[a-zA-Z ]", str);
```

Reads consecutive uppercase letters, lowercase letters, and spaces.

Input:

```text
Hello World123
```

Result:

```text
Hello World
```

Remember to specify a field width based on the destination array size.

For example, for `char str[50]`:

```c
scanf("%49[a-zA-Z ]", str);
```

## 12. Compile and Run

Save the source code as:

```text
main.c
```

Compile using GCC:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o scanset_example
```

Run on Linux:

```bash
./scanset_example
```

Run on Windows:

```powershell
scanset_example.exe
```

## 13. Practice Exercises

Try completing these exercises:

1. Change the scanset to read everything except uppercase vowels (`AEIOU`).
2. Write a program that reads only numeric digits.
3. Write a program that reads only lowercase English letters.
4. Read characters until a comma is encountered.
5. Read everything except digits and spaces.
6. Change the array size to 50 and use the correct field width.
7. Count how many characters were successfully read.
8. Use `fgets()` to read a complete line and then process it to remove lowercase vowels.

## 14. What You Will Learn

After completing this project, you should understand:

- How `scanf()` works with scansets.
- The meaning of `%[...]` in a format string.
- How the `^` character negates a scanset.
- How to read characters until a specific character is encountered.
- The difference between `%s` and `%[^...]`.
- How to limit input width to prevent buffer overflow.
- Why checking the return value of `scanf()` is important.
- How to process strings using character arrays.

