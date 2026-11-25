# 23-Bubble Sort in C Using Pointers

## 1. Introduction

This project demonstrates how to sort an integer array in ascending order using the **Bubble Sort algorithm** in the C programming language.

It also introduces several important C programming concepts:

- Arrays and array elements
- Pointers and pointer parameters
- Passing pointers to functions
- Modifying array elements through pointers
- Swapping two values using a function
- `const` pointers and pointers to `const` data
- Sorting algorithms and time complexity

The program starts with an unsorted array, sorts its elements from smallest to largest, and prints the array before and after sorting.

## 2. Project Structure

A suggested folder structure:

```text
23_Bubble_Sort_Using_Pointers/
│
├── main.c
└── README.md
```

## 3. Complete Source Code

The following version preserves your original program's behavior and improves the Bubble Sort loop by reducing the number of comparisons after each pass.

```c
#include <stdio.h>

void PrintArray(const int *const a, int N);
void BubbleSort(int *const a, int N);
void Swap(int *p1, int *p2);

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

    BubbleSort(a, N);

    printf("Array after sorting:\n");
    PrintArray(a, N);
    printf("\n\n");

    return 0;
}

void BubbleSort(int *const a, int N)
{
    int i, j;
    int swapped;

    for (i = 0; i < N - 1; i++)
    {
        swapped = 0;

        for (j = 0; j < N - i - 1; j++)
        {
            if (a[j] > a[j + 1])
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

### 4.1 Including the Standard Input/Output Library

```c
#include <stdio.h>
```

This header provides standard input/output functions, including:

- `printf()` for displaying information.
- `scanf()` for receiving input from the user.

This program uses `printf()` to display the array.

### 4.2 Function Prototypes

```c
void PrintArray(const int *const a, int N);
void BubbleSort(int *const a, int N);
void Swap(int *p1, int *p2);
```

Function prototypes tell the compiler about the functions before they are used in `main()`.

| Function | Purpose |
|---|---|
| `PrintArray()` | Prints array elements |
| `BubbleSort()` | Sorts the array |
| `Swap()` | Exchanges two integer values |

Notice that the functions use pointers to access and modify array elements.

### 4.3 Defining the Array

```c
int a[] = {
    23, 53, 12, 10, 17, 56, 78, 34, 29,
    37, 45, 12, 19, 20, 40, 90, 43, 48, 62
};
```

This statement creates an integer array containing 19 elements.

Each element has an index:

| Index | Value |
|---:|---:|
| 0 | 23 |
| 1 | 53 |
| 2 | 12 |
| 3 | 10 |
| 4 | 17 |
| 5 | 56 |
| 6 | 78 |
| 7 | 34 |
| 8 | 29 |
| 9 | 37 |
| 10 | 45 |
| 11 | 12 |
| 12 | 19 |
| 13 | 20 |
| 14 | 40 |
| 15 | 90 |
| 16 | 43 |
| 17 | 48 |
| 18 | 62 |

Array indexing in C starts from zero.

Therefore, the first element is `a[0]`, and the last element is `a[18]`.

### 4.4 Calculating the Array Size

```c
int N = sizeof(a) / sizeof(a[0]);
```

The `sizeof` operator returns the size of an object in bytes.

For this array:

- `sizeof(a)` is the total size of the array.
- `sizeof(a[0])` is the size of one integer element.

If an integer occupies 4 bytes:

```text
sizeof(a)    = 19 × 4 = 76 bytes
sizeof(a[0]) = 4 bytes

N = 76 / 4 = 19
```

This is a common technique for calculating the number of elements in an actual array.

**Important:** This technique works here because `a` is an array in `main()`. When an array is passed to a function, its parameter is adjusted to a pointer. Inside that function, `sizeof(a)` gives the size of the pointer, not the original array.

### 4.5 Printing the Original Array

```c
printf("Array before sorting:\n");
PrintArray(a, N);
```

The program calls `PrintArray()` and passes:

- `a`: the address of the first array element.
- `N`: the number of elements.

The function prints all elements without changing them.

### 4.6 Calling Bubble Sort

```c
BubbleSort(a, N);
```

This function receives a pointer to the original array.

Because it accesses the original array elements, it can change their values directly.

This is why the sorted result is still available in `main()` after the function returns.

## 5. Understanding Pointers in Function Parameters

Pointers are an important part of this program.

Consider:

```c
void BubbleSort(int *const a, int N);
```

The declaration:

```c
int *const a
```

means:

- `a` is a pointer to an integer.
- The pointer itself cannot be changed to point somewhere else inside the function.
- The integer values addressed by the pointer can be modified.

For example:

```c
a[0] = 100;
```

is allowed.

But:

```c
a++;
```

is not allowed because `a` is a constant pointer.

### Understanding the Different Pointer Declarations

| Declaration | Meaning |
|---|---|
| `int *p` | Pointer to a modifiable integer |
| `const int *p` | Pointer to an integer that cannot be modified through `p` |
| `int *const p` | Constant pointer to a modifiable integer |
| `const int *const p` | Constant pointer to an integer that cannot be modified through `p` |

The `PrintArray()` function uses:

```c
void PrintArray(const int *const a, int N);
```

This means:

1. The function cannot modify array elements through `a`.
2. The pointer `a` cannot be reassigned inside the function.

This is useful when a function should only read data.

## 6. How the Bubble Sort Algorithm Works

Bubble Sort is a simple sorting algorithm.

It repeatedly compares two adjacent elements. If the left element is greater than the right element, it swaps them.

The process continues until the array is sorted.

For ascending order, the comparison is:

```c
if (a[j] > a[j + 1])
```

If this condition is true, the two elements are exchanged.

### Example

Consider this small array:

```text
[5, 3, 8, 1]
```

**Pass 1**

| Comparison | Action | Array |
|---|---|---|
| 5 and 3 | Swap | 3, 5, 8, 1 |
| 5 and 8 | No swap | 3, 5, 8, 1 |
| 8 and 1 | Swap | 3, 5, 1, 8 |

At the end of the first pass, the largest element (`8`) is in its correct final position.

**Pass 2**

| Comparison | Action | Array |
|---|---|---|
| 3 and 5 | No swap | 3, 5, 1, 8 |
| 5 and 1 | Swap | 3, 1, 5, 8 |

**Pass 3**

| Comparison | Action | Array |
|---|---|---|
| 3 and 1 | Swap | 1, 3, 5, 8 |

The array is now sorted.

<LearningViz type_id="BUBBLE_SORT" initial_values={{"initialOrder":"mixed"}} />

## 7. Understanding the BubbleSort() Function

```c
void BubbleSort(int *const a, int N)
```

The function receives:

- `a`: pointer to the first element of the array.
- `N`: number of array elements.

The function returns `void` because it modifies the original array directly.

### Outer Loop

```c
for (i = 0; i < N - 1; i++)
```

The outer loop controls the number of sorting passes.

For an array containing `N` elements, at most `N - 1` passes are needed.

### Resetting the swapped Flag

```c
swapped = 0;
```

This variable tracks whether any elements were exchanged during the current pass.

- `0`: No swap has occurred yet.
- `1`: At least one swap has occurred.

### Inner Loop

```c
for (j = 0; j < N - i - 1; j++)
```

This loop compares adjacent elements.

The expression:

```c
N - i - 1
```

is important.

After every complete pass, the largest remaining element reaches its final position at the end of the unsorted section.

There is no need to compare that sorted element again.

For example, if the array contains 5 elements:

| Pass | Maximum inner-loop comparisons |
|---:|---:|
| 1 | 4 |
| 2 | 3 |
| 3 | 2 |
| 4 | 1 |

This optimization reduces unnecessary comparisons.

### Comparing Adjacent Elements

```c
if (a[j] > a[j + 1])
```

The function compares two neighboring elements.

For example:

```c
a[j] = 9;
a[j + 1] = 4;
```

Since `9 > 4`, the elements must be swapped.

### Calling Swap()

```c
Swap(&a[j], &a[j + 1]);
```

This is one of the most important lines in the program.

The `&` operator obtains the address of a variable.

Therefore:

- `&a[j]` is the address of the first element being exchanged.
- `&a[j + 1]` is the address of the second element.

The function receives these two addresses and modifies the original array elements.

### Setting the swapped Flag

```c
swapped = 1;
```

This indicates that the current pass changed the array.

### Early Termination

```c
if (!swapped)
{
    break;
}
```

If no elements were swapped during a complete pass, the array is already sorted.

The `break` statement immediately terminates the outer loop.

This optimization improves performance when the input array is already sorted or nearly sorted.

## 8. Understanding the Swap() Function

```c
void Swap(int *p1, int *p2)
{
    int temp;

    temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}
```

This function exchanges the values stored at two memory addresses.

It receives two pointers:

- `p1`: address of the first integer.
- `p2`: address of the second integer.

### Understanding the Dereference Operator

The `*` operator is used to access the value stored at a pointer's address.

For example:

```c
int x = 10;
int *p = &x;
```

Here:

| Expression | Meaning |
|---|---|
| `x` | Value of the variable |
| `&x` | Address of the variable |
| `p` | Address stored in the pointer |
| `*p` | Value at the address stored in the pointer |

### Step-by-Step Swap Example

Suppose:

```text
a = 10
b = 20
```

We call:

```c
Swap(&a, &b);
```

Inside the function:

**Step 1**

```c
temp = *p1;
```

The value `10` is copied into `temp`.

**Step 2**

```c
*p1 = *p2;
```

The value `20` is written into the memory location of `a`.

**Step 3**

```c
*p2 = temp;
```

The value `10` is written into the memory location of `b`.

The result is:

```text
a = 20
b = 10
```

The original variables are modified because the function receives their addresses.

## 9. Understanding the PrintArray() Function

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

The function prints every array element.

The loop starts at index `0` and continues until `N - 1`.

This condition:

```c
if (i < N - 1)
```

prevents the program from printing an unnecessary comma after the last element.

The `const` qualifiers ensure that this function does not modify the array.

## 10. Expected Output

```text
Array before sorting:
23, 53, 12, 10, 17, 56, 78, 34, 29, 37, 45, 12, 19, 20, 40, 90, 43, 48, 62

Array after sorting:
10, 12, 12, 17, 19, 20, 23, 29, 34, 37, 40, 43, 45, 48, 53, 56, 62, 78, 90
```

Notice that the two occurrences of `12` are both preserved. Sorting changes the order of elements, not the number of elements or their values.

## 11. Time and Space Complexity

Bubble Sort has the following complexity:

| Case | Time Complexity | Explanation |
|---|---|---|
| Best case | O(N) | Array is already sorted; early termination occurs after one pass |
| Average case | O(N²) | Multiple comparisons and swaps are generally required |
| Worst case | O(N²) | Array is in reverse order |

**Space complexity: O(1)**

The algorithm uses only a few additional variables (`i`, `j`, `swapped`, and the temporary variable inside `Swap()`).

It sorts the original array without creating another array.

### Why Is Bubble Sort O(N²)?

In the worst case, the number of comparisons is approximately:

```text
(N - 1) + (N - 2) + ... + 2 + 1
```

This is:

```text
N × (N - 1) / 2
```

Therefore, the time complexity is O(N²).

## 12. Important C Programming Concepts

### Arrays and Pointers

When an array is passed to a function, the parameter is adjusted to a pointer type.

For example:

```c
void Function(int a[], int N);
```

is equivalent in function parameter declarations to:

```c
void Function(int *a, int N);
```

Both allow the function to access the original array elements.

### Pointer Arithmetic

The following expressions are equivalent:

```c
a[j]
*(a + j)
```

Both access the element at index `j`.

For example:

```c
a[2]
```

is equivalent to:

```c
*(a + 2)
```

### Passing Pointers to Functions

C passes arguments by value, including pointer arguments.

When `Swap()` receives `p1` and `p2`, it receives copies of the addresses. Those addresses still refer to the original variables, so dereferencing them allows the function to modify those variables.

This is how C functions can modify caller-owned data through pointers.

## 13. Compile and Run

### Using GCC

Open a terminal in the project directory.

Compile:

```bash
gcc main.c -o bubble_sort
```

Run on Linux or macOS:

```bash
./bubble_sort
```

Run on Windows:

```powershell
.\bubble_sort.exe
```

You can also enable compiler warnings:

```bash
gcc -Wall -Wextra -std=c11 main.c -o bubble_sort
```

## 14. Exercises

Try these exercises to improve your understanding.

**Exercise 1 — Descending Order**

Modify the program to sort the array from largest to smallest.

Hint: Change the comparison condition.

**Exercise 2 — User Input**

Instead of using a predefined array, receive the array size and its elements from the user.

**Exercise 3 — Swap Two Variables**

Write a small program that receives two integers and exchanges them using the `Swap()` function.

**Exercise 4 — Count Swaps**

Modify `BubbleSort()` to count how many swaps occur during sorting.

**Exercise 5 — Count Comparisons**

Add a counter to calculate how many comparisons the algorithm performs.

**Exercise 6 — Remove Duplicate Values**

After sorting, create a new array containing only unique values.

**Exercise 7 — Pointer-Based Array Access**

Replace:

```c
a[j]
```

with:

```c
*(a + j)
```

and verify that the program still works.

## 15. Learning Objectives

After completing this project, you should understand:

- How Bubble Sort works.
- How to sort an array in ascending order.
- How to pass arrays to functions.
- How pointers allow functions to modify original data.
- How to exchange two values using pointers.
- The difference between `int *`, `const int *`, `int *const`, and `const int *const`.
- How pointer arithmetic relates to array indexing.
- How early termination improves Bubble Sort performance.
- How to analyze time and space complexity.
