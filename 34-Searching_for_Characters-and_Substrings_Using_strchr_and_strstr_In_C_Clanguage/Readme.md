# 34-C Programming – Searching for Characters and Substrings Using `strchr()` and `strstr()`

## 1. Introduction

In C programming, the `<string.h>` library provides several functions for searching and manipulating strings.

Sometimes we need to find a specific character inside a string. In other situations, we need to search for a complete word or a smaller string (substring) inside a larger string.

In this lesson, we will learn two important string-searching functions:

- `strchr()` – Finds the first occurrence of a specified character in a string.
- `strstr()` – Finds the first occurrence of a substring inside another string.

We will also learn how to use pointers to find the positions of characters and words, count repeated characters, and search for multiple occurrences.

## 2. Required Header Files

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
```

| Header | Purpose |
|---|---|
| `stdio.h` | Provides input/output functions such as `printf()` and `puts()`. |
| `stdlib.h` | Provides general-purpose functions. It is not required in this example. |
| `string.h` | Provides string functions such as `strchr()` and `strstr()`. |

For this program, only `stdio.h` and `string.h` are necessary.

## 3. Complete Source Code

The following version preserves the functionality of the original program and includes a few improvements:

- Uses `const char *` for pointers to read-only strings.
- Uses `size_t` for string positions and occurrence counts.
- Uses zero-based indexes in the output, matching normal C array indexing.
- Searches for all occurrences of a character and the first occurrence of a substring.

```c
#include <stdio.h>
#include <string.h>

void FindCharacter(const char *str, char c);
void FindWord(const char *str, const char *w);

int main()
{
    char str[] = "To be, or not to be. That's the question.";

    FindCharacter(str, 'b');

    // FindCharacter(str, 'e');
    // FindCharacter(str, 'a');
    // FindCharacter(str, 'w');

    FindWord(str, "not");
    FindWord(str, "This");

    return 0;
}

void FindCharacter(const char *str, char c)
{
    printf("Finding all occurrences of character '%c' "
           "in the following string:\n", c);

    puts(str);
    printf("\n");

    const char *pc;
    size_t i, n = 0;

    pc = strchr(str, c);

    while (pc != NULL)
    {
        i = (size_t)(pc - str);

        printf("Found '%c' at index %zu\n", c, i);

        n++;

        pc = strchr(pc + 1, c);
    }

    printf("\n");

    if (n > 0)
    {
        printf("%zu occurrences of character '%c' found.\n", n, c);
    }
    else
    {
        printf("Nothing found.\n");
    }

    printf("---------------------------------------\n");
}

void FindWord(const char *str, const char *w)
{
    printf("Finding first occurrence of word '%s' "
           "in the following sentence:\n", w);

    puts(str);
    printf("\n");

    const char *pw = strstr(str, w);

    if (pw == NULL)
    {
        printf("Nothing found.\n");
    }
    else
    {
        size_t i = (size_t)(pw - str);

        printf("Found at index %zu.\n", i);
    }

    printf("\n---------------------------------------\n");
}
```

## 4. Understanding the Code

### 4.1. Declaring the Functions

```c
void FindCharacter(const char *str, char c);
void FindWord(const char *str, const char *w);
```

Two functions are declared before `main()`.

**Function 1: `FindCharacter()`**

```c
void FindCharacter(const char *str, char c);
```

This function receives:

- `str`: The string in which we want to search.
- `c`: The character we want to find.

It searches for all occurrences of the specified character and displays their positions.

**Function 2: `FindWord()`**

```c
void FindWord(const char *str, const char *w);
```

This function receives:

- `str`: The original string.
- `w`: The substring we want to find.

It searches for the first occurrence of the specified substring.

Both functions have a `void` return type, meaning they display their results instead of returning a value.

### 4.2. Understanding `const char *`

The parameters are declared as:

```c
const char *str
```

This means that `str` is a pointer to characters that must not be modified through this pointer.

For example, the following operation is not allowed:

```c
str[0] = 'A';
```

This is useful because our searching functions only need to read the original string.

The pointer itself can still be changed. For example:

```c
pc = strchr(pc + 1, c);
```

Here, `pc` is moved to another position, but the characters it points to are not modified.

### 4.3. Declaring the Main String

```c
char str[] = "To be, or not to be. That's the question.";
```

This statement creates a character array containing the sentence:

```text
To be, or not to be. That's the question.
```

The compiler automatically adds a null terminator (`'\0'`) at the end.

The string is stored as a sequence of characters in memory:

```text
T o   b e ,   o r   n o t   t o   b e .   T h a t ' s   t h e   q u e s t i o n . \0
```

The null terminator indicates where the string ends.

### 4.4. Calling the Search Functions

```c
FindCharacter(str, 'b');

FindWord(str, "not");
FindWord(str, "This");
```

The first call searches for every occurrence of the character `'b'`.

The second call searches for the substring `"not"`.

The third call searches for the substring `"This"`.

Notice the difference between the arguments:

- A single character uses single quotation marks: `'b'`.
- A string uses double quotation marks: `"not"`.

The commented statements:

```c
// FindCharacter(str, 'e');
// FindCharacter(str, 'a');
// FindCharacter(str, 'w');
```

are examples of additional searches. They are ignored by the compiler because they begin with `//`.

You can remove the comment markers to search for those characters as well.

## 5. Searching for a Character Using `strchr()`

The `strchr()` function searches for the first occurrence of a specified character in a string.

It is declared in `<string.h>`.

**Syntax:**

```c
strchr(string, character);
```

Example:

```c
char str[] = "Hello World!";

char *p = strchr(str, 'o');
```

The function searches the string from left to right.

For `"Hello World!"`, the first `'o'` appears at index 4.

The returned pointer points directly to that character.

### 5.1. Understanding the Return Value

The function returns:

- A pointer to the first matching character if the character is found.
- `NULL` if the character does not exist in the string.

For example:

```c
char str[] = "Hello";

char *p1 = strchr(str, 'e');
char *p2 = strchr(str, 'x');
```

The results are:

```text
p1 -> points to 'e'
p2 -> NULL
```

**Important:** `strchr()` can also search for the null terminator itself:

```c
strchr(str, '\0');
```

This returns a pointer to the terminating null character.

## 6. Understanding `FindCharacter()`

Let's examine the function step by step.

### 6.1. Displaying the Search Information

```c
printf("Finding all occurrences of character '%c' "
       "in the following string:\n", c);

puts(str);
printf("\n");
```

The `%c` format specifier displays a single character.

The `puts()` function prints the complete string and automatically adds a newline at the end.

### 6.2. Declaring Variables

```c
const char *pc;
size_t i, n = 0;
```

We declare three variables:

| Variable | Type | Purpose |
|---|---|---|
| `pc` | `const char *` | Points to the character found by `strchr()`. |
| `i` | `size_t` | Stores the zero-based character index. |
| `n` | `size_t` | Counts the number of occurrences. |

Why use `size_t` instead of `int`?

String positions and sizes are naturally represented by `size_t`, the unsigned integer type used by C for object sizes and array indexing.

The `%zu` format specifier is used to print a `size_t` value.

### 6.3. Finding the First Occurrence

```c
pc = strchr(str, c);
```

This statement searches for the first occurrence of character `c` in `str`.

For the function call:

```c
FindCharacter(str, 'b');
```

the statement becomes logically equivalent to:

```c
pc = strchr(str, 'b');
```

The first `'b'` in the sentence is found at index 3.

Therefore, `pc` points to the character `'b'` at that location.

### 6.4. Understanding the `while` Loop

```c
while (pc != NULL)
{
    /* Search results */
}
```

The loop continues as long as `pc` does not equal `NULL`.

This means that the character was found.

If `strchr()` cannot find another occurrence, it returns `NULL`, and the loop terminates.

### 6.5. Calculating the Character Position

```c
i = (size_t)(pc - str);
```

This is one of the most important concepts in this example.

Both `pc` and `str` are pointers into the same character array.

Subtracting them gives the number of character positions between the beginning of the string and the found character.

For example:

```text
Index:   0  1  2  3  4  5
String:  T  o     b  e  ,
                  ^
                  pc
```

Here:

```c
pc - str
```

equals:

```text
3
```

Therefore, the character is located at index 3.

The result is converted to `size_t` for storage.

**Important:** Pointer subtraction is valid here because both pointers refer to elements of the same array (or its one-past-the-end position). The result is measured in elements, not bytes.

### 6.6. Displaying the Position

```c
printf("Found '%c' at index %zu\n", c, i);
```

This prints the character and its position.

For example:

```text
Found 'b' at index 3
```

### 6.7. Counting Occurrences

```c
n++;
```

Every time the character is found, the occurrence counter increases by one.

The `++` operator increments the value of `n` by one.

### 6.8. Searching for the Next Occurrence

```c
pc = strchr(pc + 1, c);
```

This is the key statement that allows the program to find multiple occurrences.

Instead of searching again from the beginning of the original string, we start searching from the character immediately after the current match.

Let's examine it:

- `pc` points to the currently found character.
- `pc + 1` points to the next character.
- `strchr(pc + 1, c)` searches from that position onward.

For example, suppose we search for `'b'` in:

```text
To be, or not to be.
```

The first occurrence is found at index 3.

The next search begins at index 4, so the same occurrence is not found again.

The next `'b'` is found at index 16.

When there are no more occurrences, `strchr()` returns `NULL`.

This prevents an infinite loop and allows the function to count all matches.

### 6.9. Displaying the Final Count

```c
if (n > 0)
{
    printf("%zu occurrences of character '%c' found.\n", n, c);
}
else
{
    printf("Nothing found.\n");
}
```

If `n` is greater than zero, at least one occurrence was found.

Otherwise, the character does not exist in the string.

## 7. Searching for a Substring Using `strstr()`

The `strstr()` function searches for the first occurrence of one string inside another string.

It is also declared in `<string.h>`.

**Syntax:**

```c
strstr(main_string, substring);
```

Example:

```c
char str[] = "Hello World!";

char *p = strstr(str, "World");
```

The function searches for `"World"` inside `"Hello World!"`.

It returns a pointer to the first character of the matching substring.

If the substring does not exist, the function returns `NULL`.

### 7.1. Understanding the Return Value

Example:

```c
char str[] = "Embedded Systems";

char *p1 = strstr(str, "Systems");
char *p2 = strstr(str, "Hardware");
```

The results are:

```text
p1 -> points to the beginning of "Systems"
p2 -> NULL
```

**Important:** If the substring is an empty string (`""`), `strstr()` returns a pointer to the beginning of the main string.

## 8. Understanding `FindWord()`

Now let's examine the second function.

### 8.1. Displaying the Search Information

```c
printf("Finding first occurrence of word '%s' "
       "in the following sentence:\n", w);

puts(str);
printf("\n");
```

The `%s` format specifier displays a string.

The function prints the substring being searched for and the original sentence.

### 8.2. Searching for the Substring

```c
const char *pw = strstr(str, w);
```

This statement searches for the first occurrence of `w` inside `str`.

For example:

```c
FindWord(str, "not");
```

The function searches for `"not"` inside:

```text
To be, or not to be. That's the question.
```

The substring is found.

The pointer `pw` points to the first character of `"not"`.

### 8.3. Checking Whether the Substring Exists

```c
if (pw == NULL)
{
    printf("Nothing found.\n");
}
```

If `strstr()` returns `NULL`, the requested substring does not exist.

Otherwise, the function executes the `else` block.

### 8.4. Calculating the Substring Position

```c
size_t i = (size_t)(pw - str);
```

Just like in the character-searching function, pointer subtraction calculates the position of the match relative to the beginning of the original string.

For the substring `"not"`:

```text
To be, or not to be.
           ^
           |
           First character of "not"
```

The zero-based index is 11.

Therefore, the program prints:

```text
Found at index 11.
```

**Important:** The original code uses:

```c
int i = pw - str + 1;
```

This produces a one-based position, not a zero-based index.

For the substring `"not"`, the original program displays position 12.

Both conventions are valid, but they mean different things:

- Zero-based index: starts counting at 0.
- One-based position: starts counting at 1.

In this README, we use zero-based indexing because it matches C array indexing.

### 8.5. Does `strstr()` Find a Complete Word?

No. `strstr()` searches for a sequence of characters, not necessarily a complete word.

For example:

```c
strstr("notebook", "not");
```

This finds `"not"` at the beginning of `"notebook"`.

Similarly:

```c
strstr("another", "not");
```

can find `"not"` inside `"another"`.

Therefore, the original function name `FindWord()` is convenient for this example, but technically it searches for a **substring**, not necessarily a complete word.

If you need to find complete words, you must additionally check the characters immediately before and after the match.

## 9. Program Output

With the original function calls:

```c
FindCharacter(str, 'b');

FindWord(str, "not");
FindWord(str, "This");
```

the output of the improved version is:

```text
Finding all occurrences of character 'b' in the following string:
To be, or not to be. That's the question.

Found 'b' at index 3
Found 'b' at index 16

2 occurrences of character 'b' found.
---------------------------------------
Finding first occurrence of word 'not' in the following sentence:
To be, or not to be. That's the question.

Found at index 11.

---------------------------------------
Finding first occurrence of word 'This' in the following sentence:
To be, or not to be. That's the question.

Nothing found.

---------------------------------------
```

## 10. Important Differences Between `strchr()` and `strstr()`

| Function | Purpose | Search argument |
|---|---|---|
| `strchr()` | Searches for a character. | A single character |
| `strstr()` | Searches for a substring. | A string |

Examples:

```c
strchr(str, 'a');
```

Searches for the character `'a'`.

```c
strstr(str, "abc");
```

Searches for the substring `"abc"`.

Both functions return a pointer to the first match or `NULL` if no match is found.

## 11. Important Notes and Common Mistakes

### 11.1. Case Sensitivity

Both `strchr()` and `strstr()` perform case-sensitive searches.

For example:

```c
strstr("Hello World", "hello");
```

does not find a match because uppercase `'H'` and lowercase `'h'` are different characters.

### 11.2. Searching for Multiple Occurrences

`strchr()` returns only the first match in each call.

To find every occurrence, search again starting from the character after the previous match:

```c
pc = strchr(pc + 1, c);
```

### 11.3. Pointer Arithmetic

The expression:

```c
pc - str
```

calculates the number of elements between two pointers into the same array.

It does not calculate a byte offset in the general sense. For a `char` array, each element occupies one byte, so the numerical values happen to correspond to byte positions as well.

### 11.4. Use the Correct Format Specifier

If a position is stored in `size_t`, use:

```c
printf("%zu", i);
```

Do not use `%d` for a `size_t` value.

### 11.5. `strstr()` Searches for Substrings, Not Complete Words

If you search for `"cat"` inside `"concatenate"`, the function can find a match.

It does not automatically check word boundaries.

### 11.6. Empty Search Strings

- `strchr(str, '\0')` finds the terminating null character.
- `strstr(str, "")` returns the beginning of the original string.

These are valid behaviors defined by the C standard.

## 12. Optional Improvement – Finding Complete Words

If you want to search for complete words rather than arbitrary substrings, you need to check word boundaries.

For example, searching for `"cat"` should match:

```text
The cat is sleeping.
```

But it should not match:

```text
The concatenate function.
```

A simple implementation for text where words are separated by whitespace or punctuation is:

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void FindWholeWord(const char *str, const char *word)
{
    size_t len = strlen(word);
    const char *p = str;

    while ((p = strstr(p, word)) != NULL)
    {
        int left_ok = (p == str || !isalnum((unsigned char)p[-1]));
        int right_ok = (p[len] == '\0' ||
                        !isalnum((unsigned char)p[len]));

        if (left_ok && right_ok)
        {
            printf("Whole word found at index %zu\n",
                   (size_t)(p - str));
            return;
        }

        p++;
    }

    printf("Whole word not found.\n");
}

int main()
{
    FindWholeWord("The cat is sleeping.", "cat");
    FindWholeWord("The concatenate function.", "cat");

    return 0;
}
```

This example treats letters and digits as word characters. It is a simple ASCII-oriented approach; more advanced text processing may need additional rules for Unicode and language-specific word boundaries.

## 13. Compilation and Execution

Save your source code in a file named:

```text
main.c
```

Compile using GCC:

```bash
gcc main.c -o string_search
```

Run on Linux:

```bash
./string_search
```

Run on Windows PowerShell:

```powershell
.\string_search.exe
```

You can also use Visual Studio Code, Code::Blocks, or another C development environment.

## 14. Practice Exercises

**Exercise 1 – Find All Occurrences of a Character**

Write a program that searches for the character `'a'` in:

```c
char str[] = "banana";
```

Display every occurrence and its index.

Expected indexes:

```text
1, 3, 5
```

**Exercise 2 – Search for a Substring**

Search for `"System"` inside:

```c
char str[] = "Embedded Systems Programming";
```

Display the index where the substring begins.

**Exercise 3 – Search for a Missing Character**

Search for `'z'` inside:

```c
char str[] = "Hello World";
```

Display an appropriate message if the character is not found.

**Exercise 4 – Count All Occurrences of a Substring**

Modify `FindWord()` so that it finds and counts every occurrence of a substring instead of stopping at the first one.

For example:

```c
char str[] = "one two one three one";
```

Search for:

```text
one
```

Expected number of occurrences: `3`.

**Exercise 5 – Search for a Complete Word**

Modify the program so that searching for `"cat"` finds complete words only, not occurrences inside longer words.

**Exercise 6 – Case-Insensitive Search**

Create a program that searches for a word without distinguishing between uppercase and lowercase letters.

For example, searching for `"hello"` should also find `"Hello"`.

## 15. Learning Objectives

After completing this lesson, you should understand:

- How to search for a character using `strchr()`.
- How to search for a substring using `strstr()`.
- How to check whether a search was successful using `NULL`.
- How to find multiple occurrences of a character.
- How to calculate a string position using pointer subtraction.
- How pointer arithmetic works with character arrays.
- The difference between a character and a string.
- The difference between searching for a substring and searching for a complete word.
- Why `size_t` and `%zu` are useful for string positions and counts.

