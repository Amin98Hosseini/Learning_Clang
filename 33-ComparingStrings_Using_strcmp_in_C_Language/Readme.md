# 33-C Programming – Comparing Strings Using `strcmp()`

## 1. Introduction

In C programming, strings are character arrays terminated by a special character called the **null terminator (`'\0'`)**.

Sometimes we need to compare two strings to determine whether they are equal or which one comes first in lexicographical (dictionary-like) order.

The C standard library provides the `strcmp()` function in the `<string.h>` header file for this purpose.

In this lesson, we will learn:

- How to compare two strings using `strcmp()`.
- How to check whether two strings are equal.
- How to determine which string is lexicographically greater or smaller.
- How to use a custom function to compare strings.
- Why comparing strings with `==` is different from using `strcmp()`.

## 2. Required Header Files

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
```

| Header | Purpose |
|---|---|
| `stdio.h` | Provides input/output functions such as `printf()`. |
| `stdlib.h` | Provides general-purpose functions. It is not required in this example. |
| `string.h` | Provides string manipulation functions, including `strcmp()`. |

For this program, only `stdio.h` and `string.h` are necessary.

## 3. Complete Source Code

```c
#include <stdio.h>
#include <string.h>

void CompareString(const char *str1, const char *str2);

int main()
{
    char s1[] = "abc";
    char s2[] = "abc";
    char s3[] = "abd";
    char s4[] = "abb";

    printf("Input strings:\n");

    printf("s1 = %s\n", s1);
    printf("s2 = %s\n", s2);
    printf("s3 = %s\n", s3);
    printf("s4 = %s\n", s4);

    printf("\n");

    printf("Comparing s1 and s2:\n");
    CompareString(s1, s2);

    printf("\n");

    printf("Comparing s1 and s3:\n");
    CompareString(s1, s3);

    printf("\n");

    printf("Comparing s1 and s4:\n");
    CompareString(s1, s4);

    return 0;
}

void CompareString(const char *str1, const char *str2)
{
    int result = strcmp(str1, str2);

    if (result == 0)
    {
        printf("%s = %s\n", str1, str2);
    }
    else if (result > 0)
    {
        printf("%s > %s\n", str1, str2);
    }
    else
    {
        printf("%s < %s\n", str1, str2);
    }
}
```

This version preserves the original program's behavior but improves the comparison function by calling `strcmp()` only once and storing its result.

## 4. Understanding the Code

### 4.1. Function Declaration (Prototype)

```c
void CompareString(const char *str1, const char *str2);
```

This line declares a function named `CompareString()`.

The function receives two string arguments:

- `str1`: Pointer to the first string.
- `str2`: Pointer to the second string.

The return type is `void`, which means the function does not return a value.

Instead, it compares the strings and displays the result using `printf()`.

**Why do we use `const char *`?**

The keyword `const` indicates that the function should not modify the characters of the strings through these pointers.

For example, this is not allowed inside the function:

```c
str1[0] = 'A';
```

Because `str1` points to characters that the function promises not to modify.

This is useful when a function only needs to read string data.

### 4.2. Declaring the Strings

```c
char s1[] = "abc";
char s2[] = "abc";
char s3[] = "abd";
char s4[] = "abb";
```

Here, four character arrays are initialized.

| Variable | String | Description |
|---|---|---|
| `s1` | `"abc"` | First string |
| `s2` | `"abc"` | Same as `s1` |
| `s3` | `"abd"` | Different from `s1` |
| `s4` | `"abb"` | Different from `s1` |

Each string is stored in memory with a null terminator.

For example:

```text
s1:  a  b  c  \0
s2:  a  b  c  \0
s3:  a  b  d  \0
s4:  a  b  b  \0
```

### 4.3. Displaying the Input Strings

```c
printf("Input strings:\n");

printf("s1 = %s\n", s1);
printf("s2 = %s\n", s2);
printf("s3 = %s\n", s3);
printf("s4 = %s\n", s4);
```

The `%s` format specifier is used to print a null-terminated string.

The output is:

```text
Input strings:
s1 = abc
s2 = abc
s3 = abd
s4 = abb
```

### 4.4. Calling the Comparison Function

```c
CompareString(s1, s2);
CompareString(s1, s3);
CompareString(s1, s4);
```

These statements call the `CompareString()` function three times.

Each call passes two strings to the function.

| Function call | First argument | Second argument |
|---|---|---|
| `CompareString(s1, s2)` | `"abc"` | `"abc"` |
| `CompareString(s1, s3)` | `"abc"` | `"abd"` |
| `CompareString(s1, s4)` | `"abc"` | `"abb"` |

When the function is called, the addresses of the first characters of these arrays are passed to its pointer parameters.

The function can then access the strings through `str1` and `str2`.

## 5. Understanding the `strcmp()` Function

The `strcmp()` function compares two null-terminated strings.

It is declared in:

```c
#include <string.h>
```

**Syntax:**

```c
strcmp(string1, string2);
```

The function compares the strings character by character using the values of their characters.

It returns an integer with one of three possible sign results:

| Return value | Meaning |
|---|---|
| `0` | Both strings are equal. |
| A negative value | The first string is lexicographically smaller. |
| A positive value | The first string is lexicographically greater. |

**Important:** The C standard guarantees the sign of the result, not a specific positive or negative number.

For example, you must not assume that `strcmp()` always returns `-1`, `0`, or `1`.

### 5.1. Comparing Equal Strings

```c
strcmp("abc", "abc");
```

The function compares the characters:

```text
First string:  a  b  c
Second string: a  b  c
               |  |  |
               ✓  ✓  ✓
```

All corresponding characters are equal, and both strings end at the same position.

Therefore, the result is:

```text
strcmp("abc", "abc") == 0
```

In the program:

```c
if (result == 0)
{
    printf("%s = %s\n", str1, str2);
}
```

The condition is true, so the program prints:

```text
abc = abc
```

### 5.2. Comparing `"abc"` and `"abd"`

```c
strcmp("abc", "abd");
```

The function compares the strings from left to right:

| Position | First string | Second string | Comparison |
|---:|:---:|:---:|---|
| 1 | a | a | Equal |
| 2 | b | b | Equal |
| 3 | c | d | Different |

The first two characters are equal.

At the third position, `c` has a smaller character value than `d` in the basic execution character set.

Therefore:

```text
abc < abd
```

The return value of `strcmp()` is negative.

The program checks:

```c
else
{
    printf("%s < %s\n", str1, str2);
}
```

And prints:

```text
abc < abd
```

### 5.3. Comparing `"abc"` and `"abb"`

```c
strcmp("abc", "abb");
```

The comparison is:

| Position | First string | Second string | Comparison |
|---:|:---:|:---:|---|
| 1 | a | a | Equal |
| 2 | b | b | Equal |
| 3 | c | b | Different |

At the third position, `c` is greater than `b`.

Therefore:

```text
abc > abb
```

The return value of `strcmp()` is positive.

The program prints:

```text
abc > abb
```

## 6. Understanding the Comparison Function

The original program contains:

```c
void CompareString(const char* str1, const char *str2)
{
    if(strcmp(str1,str2)==0)
    {
        printf("%s = %s\n",str1,str2);
    }

    if(strcmp(str1,str2)>0)
    {
        printf("%s > %s\n",str1,str2);
    }

    if(strcmp(str1,str2)<0)
    {
        printf("%s < %s\n",str1,str2);
    }
}
```

This function works correctly for valid null-terminated strings.

However, it calls `strcmp()` three times.

A better approach is to call it once and save the result:

```c
int result = strcmp(str1, str2);
```

Then use:

```c
if (result == 0)
{
    /* Strings are equal */
}
else if (result > 0)
{
    /* First string is greater */
}
else
{
    /* First string is smaller */
}
```

This is more efficient and easier to read.

The `else if` structure also ensures that only one comparison result is handled.

## 7. Program Output

The output of the program is:

```text
Input strings:
s1 = abc
s2 = abc
s3 = abd
s4 = abb

Comparing s1 and s2:
abc = abc

Comparing s1 and s3:
abc < abd

Comparing s1 and s4:
abc > abb
```

## 8. Important Concepts and Common Mistakes

### 8.1. Do Not Compare String Contents Using `==`

A common mistake for beginners is:

```c
if (s1 == s2)
{
    printf("Strings are equal");
}
```

This does not compare the contents of the strings.

In this expression, array names are converted to pointers in this context, and the comparison checks whether the pointers refer to the same location.

Even if two separate arrays contain identical text, their addresses are generally different.

Correct:

```c
if (strcmp(s1, s2) == 0)
{
    printf("Strings are equal");
}
```

### 8.2. `strcmp()` Is Case-Sensitive

The function distinguishes between uppercase and lowercase letters.

For example:

```c
strcmp("Hello", "hello");
```

These strings are not equal because `'H'` and `'h'` are different characters.

Therefore:

```text
"Hello" != "hello"
```

If you need case-insensitive comparison, some systems provide functions such as `strcasecmp()` or `_stricmp()`, but these are not part of the ISO C standard.

### 8.3. String Comparison Is Not the Same as Numeric Comparison

Consider:

```c
strcmp("10", "2");
```

This compares the strings character by character, not their numeric values.

The first characters are `'1'` and `'2'`. Since `'1'` is smaller, the first string is lexicographically smaller.

Therefore:

```text
"10" < "2"
```

But numerically:

```text
10 > 2
```

If you want to compare numbers, convert the strings to numeric values first, for example with `strtol()`.

### 8.4. Different String Lengths

Consider:

```c
strcmp("abc", "abcd");
```

The first three characters are equal, but the first string ends before the second.

The shorter string is lexicographically smaller when it is a prefix of the longer string.

Therefore:

```text
"abc" < "abcd"
```

### 8.5. Always Use Null-Terminated Strings

`strcmp()` expects both inputs to be valid null-terminated strings.

Passing an array that does not contain a valid terminating `'\0'` can cause the function to read outside the array, resulting in undefined behavior.

## 9. Difference Between `strcmp()` and `strncmp()`

The `<string.h>` library also provides `strncmp()`.

Unlike `strcmp()`, it compares at most a specified number of characters.

**Syntax:**

```c
strncmp(string1, string2, number_of_characters);
```

Example:

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char s1[] = "abcdef";
    char s2[] = "abcxyz";

    printf("strcmp result: %d\n", strcmp(s1, s2));
    printf("strncmp result: %d\n", strncmp(s1, s2, 3));

    return 0;
}
```

The first three characters are identical:

```text
s1 = abcdef
s2 = abcxyz
     abc
```

Therefore, `strncmp()` returns zero because it compares only the first three characters.

However, `strcmp()` continues comparing until it finds a difference.

| Function | Comparison |
|---|---|
| `strcmp(s1, s2)` | Compares strings until a difference or the end of a string. |
| `strncmp(s1, s2, n)` | Compares at most the first `n` characters. |

Remember that `strncmp()` is not a substitute for validating that arbitrary input buffers are properly terminated. It compares up to `n` characters, but both pointers must still refer to valid memory for the characters it reads.

## 10. Compilation and Execution

Save the source code in a file named:

```text
main.c
```

Compile using GCC:

```bash
gcc main.c -o string_compare
```

Run on Linux:

```bash
./string_compare
```

Run on Windows PowerShell:

```powershell
.\string_compare.exe
```

You can also use Visual Studio Code, Code::Blocks, or another C development environment.

## 11. Practice Exercises

**Exercise 1 – Compare Two User Strings**

Write a program that reads two strings from the user and checks whether they are equal using `strcmp()`.

**Exercise 2 – Find the Greater String**

Read two strings and display which one is lexicographically greater.

**Exercise 3 – Compare Three Strings**

Create three strings and determine which one comes first in lexicographical order.

**Exercise 4 – Case-Sensitive Comparison**

Compare:

```c
char s1[] = "Embedded";
char s2[] = "embedded";
```

Determine whether the strings are equal.

**Exercise 5 – Compare Only the First Three Characters**

Use `strncmp()` to compare only the first three characters of:

```c
char s1[] = "STM32F103";
char s2[] = "STM32F407";
```

**Exercise 6 – Sort Strings**

Create an array of five strings and sort them alphabetically using `strcmp()` and Bubble Sort.

Hint: Use `strcmp()` to decide whether two adjacent strings need to be swapped.

## 12. Learning Objectives

After completing this lesson, you should understand:

- How strings are represented in C.
- How to compare strings using `strcmp()`.
- What the return value of `strcmp()` means.
- How lexicographical string comparison works.
- How to write a function that accepts strings through pointers.
- Why `const char *` is useful for read-only string parameters.
- Why `==` should not be used to compare string contents.
- How case-sensitive comparison works.
- The difference between `strcmp()` and `strncmp()`.

