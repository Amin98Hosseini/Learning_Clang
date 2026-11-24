# 17-Character Array and String Length in C

## Introduction

This program demonstrates how to read a name from the user, store it in a character array, and calculate its actual string length.

It also explains an important concept in C programming: **the size of a character array is not necessarily equal to the length of the string stored inside it.**

The program calculates two values:

- **Array Length:** The total number of elements allocated in the character array.
- **String Length:** The number of characters entered by the user, excluding the null terminator (`'\0'`).

## Source Code

```c
#include <stdio.h>

int main()
{
    printf("Please enter your name:\n");

    char name[10];
    scanf("%9s", name);

    printf("\nYour name is: %s.\n", name);

    int N = sizeof(name) / sizeof(name[0]);
    printf("Length of array = %d\n", N);

    int M = 0;
    int i;

    for(i = 0; i < N; i++)
    {
        if(name[i] == '\0') break;
        M++;
    }

    printf("Length of string = %d\n", M);

    return 0;
}
```

## 1. Understanding Character Arrays

In C, a string is stored as an array of characters.

For example:

```c
char name[10];
```

This declaration creates an array containing 10 character elements.

Each element can store one character:

| Index | Content (example: "Amin") |
|---|---|
| name[0] | 'A' |
| name[1] | 'm' |
| name[2] | 'i' |
| name[3] | 'n' |
| name[4] | '\0' |
| name[5] | Unused |
| ... | ... |
| name[9] | Unused |

C strings use a special character called the **null terminator**, represented by `'\0'`, to indicate where the string ends.

For the string `"Amin"`, the null terminator is stored immediately after the last character.

## 2. Reading a String from the User

```c
printf("Please enter your name:\n");

char name[10];
scanf("%9s", name);
```

Explanation:

- `printf()` displays a message asking the user to enter their name.
- `char name[10]` creates a character array with 10 elements.
- `scanf("%9s", name)` reads a string from standard input.

### Why `%9s` instead of `%s`?

The array has 10 elements, but one element must be reserved for the null terminator.

Therefore, `%9s` limits the input to a maximum of 9 characters, leaving space for `'\0'`.

This prevents the input from overflowing the array.

**Important:** `%s` stops reading at whitespace. Therefore, this program reads only the first word of a full name.

## 3. Calculating the Array Length

```c
int N = sizeof(name) / sizeof(name[0]);
printf("Length of array = %d\n", N);
```

The `sizeof` operator returns the size of an object in bytes.

- `sizeof(name)` returns the total size of the array in bytes.
- `sizeof(name[0])` returns the size of one array element in bytes.

Since each `char` occupies one byte in C:

```c
N = 10 / 1;
N = 10;
```

Therefore, the array length is always 10, regardless of how many characters the user enters.

## 4. Calculating the Actual String Length

```c
int M = 0;
int i;

for(i = 0; i < N; i++)
{
    if(name[i] == '\0') break;
    M++;
}
```

This loop counts the characters until it reaches the null terminator.

Step-by-step:

1. `M = 0` initializes the string length counter.
2. The `for` loop checks each array element.
3. `if(name[i] == '\0')` checks whether the current element is the end of the string.
4. `break` stops the loop when the null terminator is found.
5. `M++` increases the counter for every normal character.

For example, if the user enters:

```text
Amin
```

The array contains:

```text
'A'  'm'  'i'  'n'  '\0'
```

The loop counts four characters and stops at `'\0'`.

Therefore:

```text
M = 4
```

## 5. Example Input and Output

**Input:**

```text
Please enter your name:
Amin
```

**Output:**

```text
Your name is: Amin.
Length of array = 10
Length of string = 4
```

## 6. Difference Between Array Length and String Length

| Feature | Array Length | String Length |
|---|---|---|
| Meaning | Total allocated elements | Actual characters |
| Calculation | `sizeof(name) / sizeof(name[0])` | Count until `'\0'` |
| Includes null terminator? | The array has space for it | No |
| Example | 10 | 4 |

The array size is fixed at 10, while the string length depends on the user's input.

## 7. Important C Concepts

### Null Terminator (`'\0'`)

The null terminator marks the end of a C string. It is different from the character `'0'`.

### `sizeof()` Operator

Returns the size of an object in bytes. It can be used to calculate the number of elements in an actual array when its full array type is available.

### `scanf()` with `%s`

Reads a sequence of non-whitespace characters. A field width such as `%9s` helps prevent writing beyond the destination array.

### `break` Statement

Terminates the nearest enclosing loop immediately.

### Increment Operator (`++`)

Increases a variable by one:

```c
M++;
```

is equivalent to:

```c
M = M + 1;
```

## 8. Time and Space Complexity

Let `N` be the size of the character array.

- **Time Complexity:** O(N) in the worst case, because the loop may inspect every array element.
- **Space Complexity:** O(1) auxiliary space, because the program uses a fixed-size array and a few integer variables.

## 9. Important Notes

1. `char name[10]` can store at most 9 input characters plus the null terminator.
2. `%9s` prevents this particular input operation from exceeding the array capacity.
3. `%s` does not read spaces. For example, entering `Amin Hosseini` stores only `Amin`.
4. The array length remains 10 even if the user enters only one character.
5. The actual string length does not include `'\0'`.
6. This program assumes that `scanf()` successfully reads input. In production code, check its return value before using the array.

## 10. Suggested Exercises

1. Change the array size from 10 to 20 and observe the output.
2. Enter a one-character name and compare the two lengths.
3. Enter a name containing more than 9 characters and observe the input limit.
4. Modify the program to use `fgets()` so that names containing spaces can be read.
5. Write a program that counts vowels in a string.
6. Write a program that reverses a string without using a library function.


## Learning Objective

After completing this example, you should understand:

- How character arrays store strings in C.
- How to read a string using `scanf()`.
- Why strings require a null terminator.
- How to calculate the size of an array using `sizeof()`.
- How to calculate the actual length of a string using a loop.
- The difference between allocated memory and the data stored in it.