# 24-Bubble Sort Using Function Pointers in C

## 1. Introduction

This project demonstrates how to implement a flexible Bubble Sort algorithm using **function pointers** in the C programming language.

Unlike a traditional Bubble Sort implementation, which has a fixed sorting condition, this program receives a comparison function as an argument. This allows the same sorting algorithm to arrange data according to different rules.

The program demonstrates three sorting methods:

1. **Ascending:** Sort numbers from smallest to largest.
2. **Descending:** Sort numbers from largest to smallest.
3. **Ascending by Remainder:** Sort numbers according to their remainder when divided by 3.

The main concepts covered in this project are:

- Function pointers
- Arrays of function pointers
- Passing functions as arguments
- Callback functions
- Pointer declarations and syntax
- Bubble Sort
- Custom comparison rules
- Stable sorting
- Reusable and flexible functions

## 2. Project Structure

A suggested folder structure:

```text
24_Bubble_Sort_Function_Pointers/
│
├── main.c
└── README.md
```

## 3. Complete Source Code

The following version preserves the original program's behavior while improving the Bubble Sort loop by reducing unnecessary comparisons.

```c
#include <stdio.h>

void PrintArray(const int *const a, int N);
void BubbleSort(int *const a, int N, int (*compare)(int a, int b));
void Swap(int *p1, int *p2);

int Ascending(int a, int b);
int Descending(int a, int b);
int AscendingRem3(int a, int b);

int main()
{
    int a[] = {
        23, 53, 12, 10, 17, 56, 78, 34, 29,
        37, 45, 12, 19, 20, 40, 90, 43, 48, 62
    };

    int N = sizeof(a) / sizeof(a[0]);

    printf("Array before sorting:\n");
    PrintArray(a, N);
    printf("\n\n");

    int (*f[3])(int, int) = {
        Ascending,
        Descending,
        AscendingRem3
    };

    int i;

    for (i = 0; i < 3; i++)
    {
        BubbleSort(a, N, f[i]);

        printf("Array after sorting with f[%d]:\n", i);
        PrintArray(a, N);
        printf("\n\n");
    }

    return 0;
}

void BubbleSort(int *const a, int N, int (*compare)(int a, int b))
{
    int i, j;
    int swapped;

    for (i = 0; i < N - 1; i++)
    {
        swapped = 0;

        for (j = 0; j < N - i - 1; j++)
        {
            if (!compare(a[j], a[j + 1]))
            {
                Swap(&a[j], &a[j + 1]);
                swapped = 1;
            }
        }

        if (!swapped)
        {
            break;
        }
    }
}

void Swap(int *p1, int *p2)
{
    int temp;

    temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int Ascending(int a, int b)
{
    return (a <= b);
}

int Descending(int a, int b)
{
    return (a >= b);
}

int AscendingRem3(int a, int b)
{
    return ((a % 3) <= (b % 3));
}

void PrintArray(const int *const a, int N)
{
    int i;

    for (i = 0; i < N; i++)
    {
        printf("%d", a[i]);

        if (i < N - 1)
        {
            printf(", ");
        }
    }
}
```

## 4. Understanding the Program

### 4.1. Header File

```c
#include <stdio.h>
```

This library provides standard input/output functions.

The program uses `printf()` to display the original and sorted arrays.

### 4.2. Function Prototypes

```c
void PrintArray(const int *const a, int N);

void BubbleSort(
    int *const a,
    int N,
    int (*compare)(int a, int b)
);

void Swap(int *p1, int *p2);

int Ascending(int a, int b);
int Descending(int a, int b);
int AscendingRem3(int a, int b);
```

These declarations tell the compiler about the functions before they are called.

The important new declaration is:

```c
int (*compare)(int a, int b);
```

This is a function pointer.

It can point to a function that:

- Receives two `int` arguments.
- Returns an `int` value.

The comparison functions all have this same signature, so they can be passed to `BubbleSort()`.

## 5. What Is a Function Pointer?

A normal pointer stores the memory address of an object or variable.

For example:

```c
int x = 10;
int *p = &x;
```

Here, `p` stores the address of the integer variable `x`.

A function pointer is similar, but instead of storing the address of a variable, it stores the address of a function.

### 5.1. A Simple Function Pointer Example

Consider this function:

```c
int Add(int a, int b)
{
    return a + b;
}
```

We can declare a pointer that can refer to this function:

```c
int (*operation)(int, int);
```

The declaration means:

- `operation` is a pointer.
- It points to a function.
- The function receives two integers.
- The function returns an integer.

We can assign the function to the pointer:

```c
operation = Add;
```

We can now call the function through the pointer:

```c
int result = operation(10, 20);
```

The result is:

```text
result = 30
```

The following call is also valid:

```c
int result = (*operation)(10, 20);
```

Both forms call the function through the function pointer.

### 5.2. Understanding the Syntax

Compare these declarations:

| Declaration | Meaning |
|---|---|
| `int *p` | Pointer to an integer |
| `int (*f)(int, int)` | Pointer to a function receiving two integers and returning an integer |
| `int *f(int, int)` | Function receiving two integers and returning a pointer to an integer |

Parentheses are very important.

For example:

```c
int (*f)(int, int);
```

declares a function pointer.

But:

```c
int *f(int, int);
```

declares a function that returns an integer pointer.

These declarations have different meanings.

## 6. Understanding the Array of Function Pointers

One of the most important lines in this project is:

```c
int (*f[3])(int, int) = {
    Ascending,
    Descending,
    AscendingRem3
};
```

This declaration creates an array containing three function pointers.

Let's break it down:

| Part | Meaning |
|---|---|
| `f` | Name of the array |
| `[3]` | Three elements |
| `*` | Each element is a pointer |
| `(int, int)` | Each function receives two integers |
| `int` | Each function returns an integer |

The array contains the addresses of three functions:

```text
f[0] -> Ascending
f[1] -> Descending
f[2] -> AscendingRem3
```

We can call each function through its corresponding pointer:

```c
f[0](10, 20);
f[1](10, 20);
f[2](10, 20);
```

Each call executes a different comparison rule.

### Why Use an Array of Function Pointers?

Without function pointers, we might need to write separate sorting functions:

```c
BubbleSortAscending();
BubbleSortDescending();
BubbleSortByRemainder();
```

This would duplicate much of the sorting code.

With function pointers, we only need one sorting function:

```c
BubbleSort(a, N, compare);
```

The comparison behavior can change without changing the sorting algorithm itself.

This is a powerful technique for writing reusable C code.

## 7. Understanding the Comparison Functions

All three comparison functions receive two integers and return an integer.

The return value is interpreted as a Boolean-like result:

- Nonzero: The two elements are already in the required order.
- Zero: The two elements are not in the required order and should be swapped.

### 7.1. Ascending()

```c
int Ascending(int a, int b)
{
    return (a <= b);
}
```

This function checks whether the first value is less than or equal to the second value.

If:

```text
a = 10
b = 20
```

Then:

```c
Ascending(10, 20);
```

returns `1`.

The elements are already in ascending order.

But:

```c
Ascending(20, 10);
```

returns `0`.

The elements must be swapped.

Example:

```text
Original: 23, 12, 10, 17
Sorted:   10, 12, 17, 23
```

### 7.2. Descending()

```c
int Descending(int a, int b)
{
    return (a >= b);
}
```

This function checks whether the first value is greater than or equal to the second value.

For example:

```c
Descending(30, 20);
```

returns `1`.

The elements are already in descending order.

However:

```c
Descending(10, 20);
```

returns `0`, so the elements must be swapped.

Example:

```text
Original: 10, 20, 30, 40
Sorted:   40, 30, 20, 10
```

### 7.3. AscendingRem3()

```c
int AscendingRem3(int a, int b)
{
    return ((a % 3) <= (b % 3));
}
```

This function introduces a different sorting rule.

Instead of comparing the actual numbers, it compares their remainders after division by 3.

The `%` operator is called the modulus or remainder operator.

For example:

```c
10 % 3 = 1
20 % 3 = 2
30 % 3 = 0
```

The function compares:

```c
(a % 3) <= (b % 3)
```

This produces three remainder groups:

1. Numbers with remainder 0.
2. Numbers with remainder 1.
3. Numbers with remainder 2.

The numbers are arranged according to the remainder group, not their numerical value.

For example:

```text
Input:
5, 3, 7, 9, 4, 8

Remainders:
5 % 3 = 2
3 % 3 = 0
7 % 3 = 1
9 % 3 = 0
4 % 3 = 1
8 % 3 = 2

Sorted by remainder:
3, 9, 7, 4, 5, 8
```

Notice that the numbers within the same remainder group are not necessarily sorted numerically.

The sorting rule is based only on the remainder.

**Important:** In C, the remainder of a negative number can be negative. For example, `-4 % 3` is `-1`. This comparison function therefore groups negative values according to C's remainder rules, not according to a mathematical modulo operation that always produces a nonnegative result.

## 8. Understanding BubbleSort() with a Function Pointer

The main sorting function is:

```c
void BubbleSort(
    int *const a,
    int N,
    int (*compare)(int a, int b)
)
```

It receives three arguments:

| Parameter | Meaning |
|---|---|
| `a` | Pointer to the original array |
| `N` | Number of elements |
| `compare` | Pointer to a comparison function |

The function does not need to know whether it is sorting in ascending order, descending order, or by remainder.

It simply calls the comparison function it receives.

### 8.1. Outer Loop

```c
for (i = 0; i < N - 1; i++)
```

The outer loop controls the sorting passes.

For an array containing `N` elements, at most `N-1` passes are required.

### 8.2. Resetting the swapped Variable

```c
swapped = 0;
```

This variable indicates whether any elements were exchanged during the current pass.

- `0`: No swaps have occurred.
- `1`: At least one swap has occurred.

### 8.3. Inner Loop

```c
for (j = 0; j < N - i - 1; j++)
```

The inner loop compares adjacent elements.

The comparison range decreases after every pass because the largest remaining element, according to the selected comparison rule, reaches its final position at the end of the unsorted section.

### 8.4. Calling the Comparison Function

```c
if (!compare(a[j], a[j + 1]))
```

This is the key line of the program.

The function pointer `compare` is used to execute the selected comparison function.

For example, if `compare` points to `Ascending`, this expression behaves like:

```c
if (!Ascending(a[j], a[j + 1]))
```

If it points to `Descending`, it behaves like:

```c
if (!Descending(a[j], a[j + 1]))
```

The `!` operator means logical NOT.

Therefore:

- If the comparison function returns nonzero, no swap is required.
- If the comparison function returns zero, the two elements are swapped.

You can also write the function call as:

```c
if (!(*compare)(a[j], a[j + 1]))
```

Both forms are valid in C.

### 8.5. Swapping Elements

```c
Swap(&a[j], &a[j + 1]);
```

The addresses of the two elements are passed to `Swap()`.

This allows the function to exchange the original array values.

### 8.6. Early Termination

```c
if (!swapped)
{
    break;
}
```

If no elements were exchanged during a complete pass, the array is already sorted according to the selected comparison function.

The algorithm can stop immediately.

## 9. Understanding the Swap() Function

```c
void Swap(int *p1, int *p2)
{
    int temp;

    temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}
```

This function exchanges two integer values using pointers.

Suppose:

```c
int a = 10;
int b = 20;
```

We call:

```c
Swap(&a, &b);
```

The function receives the addresses of `a` and `b`.

The operations are:

1. Save the first value in `temp`.
2. Copy the second value into the first variable.
3. Copy the temporary value into the second variable.

Result:

```text
Before:
a = 10
b = 20

After:
a = 20
b = 10
```

This is a common example of using pointers to modify variables inside another function.

## 10. Understanding PrintArray()

```c
void PrintArray(const int *const a, int N)
{
    int i;

    for (i = 0; i < N; i++)
    {
        printf("%d", a[i]);

        if (i < N - 1)
        {
            printf(", ");
        }
    }
}
```

This function displays all array elements.

The declaration:

```c
const int *const a
```

means:

- The function cannot modify the array elements through `a`.
- The pointer itself cannot be reassigned.

This is appropriate because printing an array should not change its contents.

## 11. Understanding the Main Function

### 11.1. Creating the Array

```c
int a[] = {
    23, 53, 12, 10, 17, 56, 78, 34, 29,
    37, 45, 12, 19, 20, 40, 90, 43, 48, 62
};
```

The array contains 19 integers.

### 11.2. Calculating the Number of Elements

```c
int N = sizeof(a) / sizeof(a[0]);
```

This calculates the number of elements automatically.

### 11.3. Creating the Function Pointer Array

```c
int (*f[3])(int, int) = {
    Ascending,
    Descending,
    AscendingRem3
};
```

This creates an array containing the three comparison functions.

### 11.4. Calling Each Sorting Method

```c
for (i = 0; i < 3; i++)
{
    BubbleSort(a, N, f[i]);

    printf("Array after sorting with f[%d]:\n", i);
    PrintArray(a, N);
    printf("\n\n");
}
```

The loop executes three times.

| Iteration | Function pointer | Sorting rule |
|---:|---|---|
| 0 | `f[0]` | Ascending |
| 1 | `f[1]` | Descending |
| 2 | `f[2]` | Ascending by remainder when divided by 3 |

The important detail is that the same array `a` is passed to every sorting operation.

The array is not recreated or reset between iterations.

Therefore:

1. The first operation sorts the original array in ascending order.
2. The second operation takes that already-sorted array and sorts it in descending order.
3. The third operation takes the descending array and sorts it by remainder.

The third operation is not sorting the original input order.

## 12. Expected Output

```text
Array before sorting:
23, 53, 12, 10, 17, 56, 78, 34, 29, 37, 45, 12, 19, 20, 40, 90, 43, 48, 62

Array after sorting with f[0]:
10, 12, 12, 17, 19, 20, 23, 29, 34, 37, 40, 43, 45, 48, 53, 56, 62, 78, 90

Array after sorting with f[1]:
90, 78, 62, 56, 53, 48, 45, 43, 40, 37, 34, 29, 23, 20, 19, 17, 12, 12, 10

Array after sorting with f[2]:
90, 78, 48, 45, 12, 12, 43, 40, 37, 34, 19, 10, 62, 56, 53, 29, 23, 20, 17
```

### Understanding the Third Result

The third sorting function compares only the remainder after division by 3.

The result is divided into three groups:

| Group | Remainder | Values in output order |
|---|---:|---|
| First | 0 | 90, 78, 48, 45, 12, 12 |
| Second | 1 | 43, 40, 37, 34, 19, 10 |
| Third | 2 | 62, 56, 53, 29, 23, 20, 17 |

Why are the values inside each group still in descending order?

Because Bubble Sort is stable with these comparison functions. Equal comparison keys are not swapped, so their relative order is preserved.

The input to the third sorting operation is already in descending numerical order. Therefore, the values within each remainder group retain that descending order.

## 13. What Is a Stable Sorting Algorithm?

A sorting algorithm is called **stable** when it preserves the relative order of elements that have equal sorting keys.

For example, consider:

```text
8, 5, 11
```

Their remainders after division by 3 are:

```text
8 % 3  = 2
5 % 3  = 2
11 % 3 = 2
```

All three elements have the same sorting key.

A stable sorting algorithm preserves their original relative order.

In this program, the comparison functions use `<=` or `>=`. Equal keys therefore do not trigger a swap.

That is why this Bubble Sort implementation is stable.

## 14. Important C Programming Concepts

### 14.1. Function Pointers vs. Normal Pointers

Normal pointer:

```c
int x = 10;
int *p = &x;
```

Function pointer:

```c
int (*f)(int, int);
```

The first stores the address of an integer variable.

The second stores the address of a function.

### 14.2. Passing a Function as an Argument

The following function receives another function through a pointer:

```c
void BubbleSort(
    int *a,
    int N,
    int (*compare)(int, int)
);
```

This is commonly called a callback function technique.

The receiving function can execute the supplied function whenever it needs to perform a comparison.

### 14.3. Why All Comparison Functions Have the Same Signature

These functions:

```c
int Ascending(int a, int b);
int Descending(int a, int b);
int AscendingRem3(int a, int b);
```

all have the same function type:

- Two integer arguments.
- One integer return value.

This makes them compatible with:

```c
int (*compare)(int, int);
```

A function with a different parameter or return type cannot safely be used as this callback.

## 15. Time and Space Complexity

For the optimized Bubble Sort implementation:

| Case | Time complexity | Explanation |
|---|---|---|
| Best | O(N) | Already sorted according to the selected comparison function |
| Average | O(N²) | Multiple passes and swaps are usually required |
| Worst | O(N²) | Reverse order according to the selected comparison rule |

Space complexity:

```text
O(1)
```

The algorithm sorts the original array and uses only a constant amount of additional memory.

Function pointers do not change the asymptotic complexity of Bubble Sort.

They make the sorting behavior configurable without requiring multiple implementations.

## 16. Compile and Run

Using GCC:

```bash
gcc main.c -o function_pointer_sort
```

Enable compiler warnings:

```bash
gcc -Wall -Wextra -std=c11 main.c -o function_pointer_sort
```

Run on Linux or macOS:

```bash
./function_pointer_sort
```

Run on Windows:

```powershell
.\function_pointer_sort.exe
```

## 17. Exercises

### Exercise 1 — Add a New Comparison Function

Create a function that sorts numbers according to their absolute values.

Example:

```text
Input:
-8, 3, -2, 5, 1

Sorted by absolute value:
1, -2, 3, 5, -8
```

Hint: Use `abs()` from `<stdlib.h>`.

### Exercise 2 — Sort by Even and Odd Groups

Create a comparison function that places even numbers before odd numbers.

For example:

```text
Input:
5, 2, 7, 4, 3, 8

Output:
2, 4, 8, 5, 7, 3
```

### Exercise 3 — Sort by Last Digit

Create a comparison function that sorts integers according to their last decimal digit.

Hint:

```c
a % 10
```

### Exercise 4 — Add More Function Pointers

Add two more comparison functions and expand the function pointer array.

### Exercise 5 — Use User Selection

Instead of executing all sorting methods, ask the user to select a sorting method.

For example:

```text
Select sorting method:

1. Ascending
2. Descending
3. Sort by remainder

Your choice:
```

Then call the selected function pointer.

### Exercise 6 — Reset the Array

Modify the program so every sorting method starts with the original unsorted array.

You can use another array or copy the original array before each sorting operation.

### Exercise 7 — Create a Generic Comparison Interface

Try to understand how function pointers can be used to build reusable sorting functions for other data types.

Study the standard library function:

```c
qsort()
```

The `qsort()` function uses a comparison callback, making it a practical example of the same concept.

## 18. Learning Objectives

After completing this project, you should understand:

- What a function pointer is.
- How to declare and use a function pointer.
- How to create an array of function pointers.
- How to pass a function as an argument to another function.
- What callback functions are.
- How to separate sorting logic from comparison logic.
- How to create custom sorting rules.
- How stable sorting works.
- How to reuse one sorting algorithm for different ordering rules.

## 19. Next Step

A useful next project is to implement a reusable sorting interface using `qsort()`.

After that, explore:

- Function pointers in structures.
- Callback functions in embedded systems.
- State machines using function pointers.
- Interrupt callback tables.
- Driver interfaces and hardware abstraction layers.

Function pointers are especially useful in embedded C when different hardware devices or operating modes need to execute different functions through a common interface.