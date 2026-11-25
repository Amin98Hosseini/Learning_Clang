# 28-Reading a String Character by Character in C Using `getchar()`

## 1. Introduction

In C programming, there are several ways to receive text from the user.

Some commonly used input functions are:

| Function | Description |
|---|---|
| `scanf()` | Reads formatted input |
| `getchar()` | Reads one character |
| `fgets()` | Reads a line of text |
| `gets()` | Reads a line but is unsafe and removed from modern C standards |

In this lesson, we will focus on `getchar()`.

Unlike `fgets()`, which reads multiple characters into a character array, `getchar()` reads only one character at a time.

We can use a loop to repeatedly call `getchar()` and store each character inside an array until the user presses Enter or the input reaches its maximum capacity.

Our program performs the following operations:

1. Creates a character array.
2. Asks the user to enter a line of text.
3. Reads characters one by one using `getchar()`.
4. Stores the characters inside the array.
5. Adds the null terminator (`'\0'`) to mark the end of the string.
6. Displays the entered text using `puts()`.

## 2. Required Header File

The original program includes:

```c
#include <stdio.h>
#include <stdlib.h>
```

For this program, only the following header is necessary:

```c
#include <stdio.h>
```

The `<stdio.h>` header provides the functions and objects used in this lesson:

- `printf()` – Displays formatted output.
- `getchar()` – Reads one character from standard input.
- `puts()` – Displays a string followed by a newline.
- `stdin` – Represents the standard input stream.
- `EOF` – A macro used to indicate end-of-file or an input error.

The `<stdlib.h>` header is not required by the original program.

## 3. Understanding the Source Code

Here is the original program:

```c
#include <stdio.h>
#include <stdlib.h>

#define LENGTH 50

int main()
{
    char str[LENGTH];

    printf("Enter a line of text:\n");

    char c;
    int i = 0;

    while ((c = getchar()) != '\n')
    {
        str[i++] = c;

        if (i >= LENGTH - 1)
            break;
    }

    str[i] = '\0';

    printf("\nEntered line of text:\n");
    puts(str);
    printf("\n");

    return 0;
}
```

Let's examine each part.

## 4. Understanding `#define`

At the beginning of the program, we have:

```c
#define LENGTH 50
```

The `#define` directive is a preprocessor directive.

It defines a symbolic constant named `LENGTH` with the value `50`.

The preprocessor replaces occurrences of `LENGTH` with `50` before the actual compilation process.

For example:

```c
#define LENGTH 50

char str[LENGTH];
```

is processed as if we had written:

```c
char str[50];
```

### Why Use `#define`?

Instead of writing the number 50 repeatedly throughout the program, we define it once.

This makes the program easier to maintain.

For example, if we later decide to increase the buffer size to 100, we only need to change:

```c
#define LENGTH 100
```

The rest of the program can continue using `LENGTH`.

**Important:** `#define` performs text substitution. It does not create a typed variable.

In modern C, another option is to use a constant expression:

```c
enum { LENGTH = 50 };
```

For this lesson, we will continue using `#define`.

## 5. Creating a Character Array

```c
char str[LENGTH];
```

Since `LENGTH` is 50, this statement creates an array containing 50 elements of type `char`.

The array is used to store the characters entered by the user.

Conceptually:

```text
str[0]
str[1]
str[2]
str[3]
...
str[49]
```

Each element can store one character.

However, a C string must also contain a special character called the null terminator:

```c
'\0'
```

Therefore, although the array has 50 elements, we can store at most 49 input characters if we want to reserve one element for the null terminator.

## 6. Displaying the Input Message

```c
printf("Enter a line of text:\n");
```

This displays a message asking the user to enter a line of text.

The escape sequence `\n` moves the cursor to the next line.

## 7. Declaring Variables

```c
char c;
int i = 0;
```

Two variables are declared.

### 7.1. Variable `c`

```c
char c;
```

The original program uses `c` to temporarily store the character returned by `getchar()`.

However, there is an important issue here.

The correct return type of `getchar()` is `int`, not `char`.

The function returns either:

- The character read, converted to an `unsigned char` and then to `int`.
- `EOF` if the end of the input stream is reached or an input error occurs.

Therefore, the safer declaration is:

```c
int c;
```

This allows the program to distinguish every possible character value from `EOF`.

### 7.2. Variable `i`

```c
int i = 0;
```

The variable `i` is used as an array index.

Initially, its value is zero because we want to store the first character at:

```c
str[0]
```

After storing each character, we increase `i` to move to the next array element.

## 8. Understanding `getchar()`

The function `getchar()` reads a single character from standard input.

Its declaration is:

```c
int getchar(void);
```

For example:

```c
#include <stdio.h>

int main(void)
{
    int c;

    printf("Enter a character: ");

    c = getchar();

    printf("You entered: ");
    putchar(c);

    return 0;
}
```

If the user enters:

```text
A
```

The output is:

```text
Enter a character: A
You entered: A
```

Unlike `scanf("%s", ...)`, `getchar()` reads one character at a time.

This gives us more control over how input is processed.

## 9. Understanding the `while` Loop

The original program uses:

```c
while ((c = getchar()) != '\n')
{
    str[i++] = c;

    if (i >= LENGTH - 1)
        break;
}
```

Let's examine this loop carefully.

### 9.1. Reading a Character

```c
c = getchar();
```

This reads one character from standard input and stores it in `c`.

For example, if the user enters:

```text
HELLO
```

the program receives the characters one by one:

```text
H
E
L
L
O
```

When the user presses Enter, the input stream normally contains a newline character (`'\n'`).

### 9.2. Checking for Newline

```c
while ((c = getchar()) != '\n')
```

This expression performs two operations:

1. Calls `getchar()` and stores its result in `c`.
2. Checks whether the received character is different from `'\n'`.

If the character is not a newline, the loop continues.

When the user presses Enter, `getchar()` reads `'\n'`, the condition becomes false, and the loop stops.

### 9.3. Storing the Character

```c
str[i++] = c;
```

This statement stores the received character inside the array.

It uses the post-increment operator:

```c
i++
```

Post-increment means:

1. Use the current value of `i`.
2. Perform the operation.
3. Increase `i` by one.

For example, suppose:

```c
int i = 0;
str[i++] = 'A';
```

The operation is equivalent to:

```c
str[0] = 'A';
i = i + 1;
```

Afterward:

```text
str[0] = 'A'
i = 1
```

When the next character arrives, it is stored in `str[1]`.

### 9.4. Checking the Array Capacity

```c
if (i >= LENGTH - 1)
    break;
```

This condition prevents the program from writing beyond the array boundary.

Since:

```c
#define LENGTH 50
```

the maximum number of input characters is:

```text
50 - 1 = 49
```

The last array element is reserved for the null terminator.

When `i` becomes 49, the loop stops.

This ensures that the following operation is valid:

```c
str[i] = '\0';
```

Without the capacity check, a long input could cause an out-of-bounds array write.

## 10. Understanding the Null Terminator

After the loop, the original program executes:

```c
str[i] = '\0';
```

This is one of the most important instructions in the program.

The null terminator marks the end of a C string.

For example, suppose the user enters:

```text
ABC
```

The array becomes:

| Index | Character |
|---:|:---:|
| 0 | `A` |
| 1 | `B` |
| 2 | `C` |
| 3 | `\0` |

The null terminator tells string-handling functions where the string ends.

Without it, functions such as `puts()` may continue reading memory beyond the intended string, resulting in undefined behavior.

**Remember:** `'\0'` and `'\n'` are different characters.

- `'\n'` represents a newline.
- `'\0'` marks the end of a C string.

## 11. Displaying the Entered String Using `puts()`

The original program uses:

```c
printf("\nEntered line of text:\n");
puts(str);
printf("\n");
```

The function `puts()` displays a string and automatically adds a newline at the end.

Its declaration is:

```c
int puts(const char *str);
```

For example:

```c
char name[] = "Amin";

puts(name);
```

Output:

```text
Amin
```

Compare `puts()` and `printf()`:

| Function | Purpose |
|---|---|
| `puts(str)` | Displays a string and automatically adds a newline |
| `printf("%s", str)` | Displays a string without automatically adding a newline |
| `putchar(c)` | Displays one character |

For example:

```c
puts("Hello");
printf("World");
putchar('!');
```

Output:

```text
Hello
World!
```

## 12. Complete Corrected Program

The original code has two important limitations:

1. It uses `char` to store the return value of `getchar()`, which makes reliable `EOF` detection impossible.
2. It stops when the array becomes full but does not consume the remaining characters from the input line.

We can improve both issues.

Here is a complete corrected version:

```c
#include <stdio.h>

#define LENGTH 50

int main(void)
{
    char str[LENGTH];

    int c;
    size_t i = 0;
    int input_truncated = 0;

    printf("Enter a line of text:\n");

    while ((c = getchar()) != '\n' && c != EOF)
    {
        if (i < LENGTH - 1)
        {
            str[i++] = (char)c;
        }
        else
        {
            input_truncated = 1;
        }
    }

    str[i] = '\0';

    if (ferror(stdin))
    {
        printf("Error: Failed to read input.\n");
        return 1;
    }

    printf("\nEntered line of text:\n");
    puts(str);

    printf("Length of entered text: %zu\n", i);

    if (input_truncated)
    {
        printf("Warning: Input was too long and was truncated.\n");
    }

    return 0;
}
```

### 12.1. Why Use `int c`?

```c
int c;
```

This is necessary because `getchar()` returns an `int`.

The `EOF` value is a special integer constant. If we store the result in a `char`, we cannot reliably distinguish `EOF` from a valid character value.

### 12.2. Why Check `EOF`?

```c
while ((c = getchar()) != '\n' && c != EOF)
```

This loop stops when either:

- The user presses Enter.
- The input stream reaches the end.
- An input error occurs.

The input error is checked afterward using:

```c
if (ferror(stdin))
```

### 12.3. Why Use `size_t` for `i`?

```c
size_t i = 0;
```

`size_t` is an unsigned integer type commonly used for array sizes and indexes.

It is also the type returned by functions such as `strlen()` and `sizeof`.

### 12.4. Why Continue Reading After the Buffer Is Full?

The original code uses:

```c
if (i >= LENGTH - 1)
    break;
```

This stops reading immediately when the buffer becomes full.

However, the rest of the user's input remains in the input stream.

In the improved version, we continue reading until Enter or `EOF`, but store only the first 49 characters.

```c
if (i < LENGTH - 1)
{
    str[i++] = (char)c;
}
else
{
    input_truncated = 1;
}
```

This ensures that the remainder of the line is consumed instead of being accidentally treated as input for the next operation.

### 12.5. Why Use `'\0'` After the Loop?

```c
str[i] = '\0';
```

Regardless of whether the input ended with Enter, `EOF`, or the buffer limit, this statement guarantees that the stored text is a valid C string.

### 12.6. Why Display `i` Using `%zu`?

```c
printf("Length of entered text: %zu\n", i);
```

Because `i` is declared as `size_t`, the correct format specifier is `%zu`.

## 13. Understanding the Input Process Visually

Suppose the user enters:

```text
HELLO
```

The program receives one character at a time.

<pre>
Input: H E L L O Enter

Step 1:
c = 'H'
str[0] = 'H'
i = 1

Step 2:
c = 'E'
str[1] = 'E'
i = 2

Step 3:
c = 'L'
str[2] = 'L'
i = 3

Step 4:
c = 'L'
str[3] = 'L'
i = 4

Step 5:
c = 'O'
str[4] = 'O'
i = 5

Step 6:
c = '\n'
Loop stops.

Final operation:
str[5] = '\0'
</pre>

The final array is:

```text
H E L L O \0
```

The stored string is:

```text
HELLO
```

## 14. Program Output

Example 1:

Input:

```text
Hello World
```

Output:

```text
Enter a line of text:

Entered line of text:
Hello World

Length of entered text: 11
```

Example 2:

Input:

```text
Embedded Systems
```

Output:

```text
Enter a line of text:

Entered line of text:
Embedded Systems

Length of entered text: 16
```

Example 3: Input longer than the buffer

If the user enters more than 49 characters, the improved program stores only the first 49 characters.

It also displays:

```text
Warning: Input was too long and was truncated.
```

## 15. Comparing `getchar()` and `fgets()`

Both functions can be used to read text, but they work differently.

| Feature | `getchar()` | `fgets()` |
|---|---|---|
| Reads | One character per call | A sequence of characters |
| Input destination | Return value | Character array |
| Requires a loop for a full line | Yes | No |
| Buffer size control | Managed by the programmer | Specified as an argument |
| Can detect `EOF` | Yes, using an `int` result | Yes, using its return value |
| Can retain newline | Yes, as a character read | Yes, when there is space |
| Useful for | Character-by-character processing | Reading lines of text |

### Example Using `getchar()`

```c
int c;

c = getchar();
```

Reads one character.

### Example Using `fgets()`

```c
char str[50];

fgets(str, sizeof(str), stdin);
```

Reads a sequence of characters into an array.

**When should you use each function?**

Use `getchar()` when you need to process input character by character, such as:

- Building a custom input parser.
- Counting characters.
- Detecting specific characters.
- Implementing simple command interpreters.
- Processing text streams.

Use `fgets()` when you simply need to read a line of text.

## 16. Important Notes

- `getchar()` reads one character from standard input.
- Its return type is `int`, not `char`.
- Use `EOF` to detect the end of the input stream.
- `#define` creates a preprocessor macro.
- `LENGTH` represents the capacity of the character array.
- Reserve one array element for the null terminator.
- A C string must end with `'\0'`.
- `'\n'` and `'\0'` have different meanings.
- `puts()` automatically adds a newline.
- `putchar()` prints a single character.
- Always check array boundaries before writing to an array.
- Consider what should happen when the user enters more characters than the buffer can store.

## 17. Compilation and Execution

Using GCC:

```bash
gcc main.c -o getchar_string
```

Run on Linux:

```bash
./getchar_string
```

Run on Windows:

```powershell
gcc main.c -o getchar_string.exe
.\getchar_string.exe
```

## 18. Exercises

Try these exercises to improve your understanding.

**Exercise 1: Count Characters**

Modify the program to count the number of uppercase letters, lowercase letters, and digits entered by the user.

Hint: Use `<ctype.h>` functions:

```c
isupper()
islower()
isdigit()
```

**Exercise 2: Count Spaces**

Write a program that counts the number of spaces in the entered line.

**Exercise 3: Count Vowels**

Count the number of vowels (`a`, `e`, `i`, `o`, `u`) in the input.

**Exercise 4: Convert to Uppercase**

Read a line using `getchar()` and convert all lowercase letters to uppercase.

Hint: Use:

```c
toupper()
```

**Exercise 5: Reverse the Input**

Use the stored character array to print the entered text in reverse order.

**Exercise 6: Dynamic Input**

Improve the program so that it can read a line of arbitrary length using dynamically allocated memory.

Hint: Explore:

```c
malloc()
realloc()
free()
```

## 19. Learning Objectives

After completing this lesson, you should understand:

- How to use `#define` to create symbolic constants.
- How to declare and use character arrays.
- How `getchar()` reads characters.
- How to process input using a `while` loop.
- How the post-increment operator (`i++`) works.
- How to prevent array boundary errors.
- Why the null terminator is necessary.
- How to display strings using `puts()`.
- Why `getchar()` should be stored in an `int`.
- How to detect `EOF` and input errors.

## 20. Suggested Next Lesson

**Character Processing in C Using `<ctype.h>`**

Recommended topics:

1. `isalpha()` – Check whether a character is an alphabetic letter.
2. `isdigit()` – Check whether a character is a digit.
3. `isalnum()` – Check whether a character is alphanumeric.
4. `isspace()` – Check whitespace characters.
5. `isupper()` – Check uppercase letters.
6. `islower()` – Check lowercase letters.
7. `toupper()` – Convert a character to uppercase.
8. `tolower()` – Convert a character to lowercase.

These functions will help you develop more advanced input-processing and text-analysis programs in C.