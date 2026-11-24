# 19-Bubble Sort Algorithm Using Functions in C

## 1. Introduction

This program demonstrates how to sort an integer array in ascending order using the **Bubble Sort algorithm**.

Bubble Sort is a simple sorting algorithm that repeatedly compares adjacent elements and swaps them when they are in the wrong order.

The algorithm continues making passes through the array until all elements are sorted.

This example also introduces several important C programming concepts:

- Sorting algorithms
- Bubble Sort
- Arrays and array indexing
- Function declarations and definitions
- Passing arrays to functions
- The `const` keyword
- Nested `for` loops
- Conditional statements
- Swapping two variables
- Temporary variables
- The `break` statement
- Algorithm time complexity
- In-place sorting

The program uses three functions:

| Function | Purpose |
|---|---|
| `PrintArray()` | Displays the elements of an array |
| `BubbleSort()` | Sorts the array in ascending order |
| `Swap()` | Exchanges the positions of two array elements |

## 2. Original Source Code

The supplied code is:

```c
#include <stdio.h>

void PrintArray(int a[], int N);
void BubbleSort(const int a[], int N);
void Swap(int a[], int j1, int j2);

int main()
{
    int a[]={23,53,12,10,17,56,78,34,29,37,45,12,19,20,40,90,43,48,62};

    int N=sizeof(a)/sizeof(a[0]);

    printf("Array before sorting:\n");
    PrintArray(a,N);
    printf("\n\n");

    BubbleSort(a,N);

    printf("Array after sorting:\n");
    PrintArray(a,N);
    printf("\n\n");

    return 0;
}

void BubbleSort(const int a[], int N)
{
    int i, j;
    int swapped;

    for(i=0; i<N; i++)
    {
        swapped = 0;

        for(j=0; j<N-1; j++)
        {
            if(a[j]>a[j+1])
            {
                Swap(a,j,j+1);
                swapped = 1;
            }
        }

        if(!swapped) break;
    }
}

void Swap(int a[], int j1, int j2)
{
    int temp;

    temp = a[j1];
    a[j1] = a[j2];
    a[j2] = temp;
}

void PrintArray(int a[], int N)
{
    int i;

    for(i=0; i<N; i++)
    {
        printf("%d",a[i]);

        if(i<N-1)
        {
            printf(", ");
        }
    }
}
```

## 3. Important Correction: The const Keyword

There is a problem in the original function declaration:

```c
void BubbleSort(const int a[], int N);
```

And in its definition:

```c
void BubbleSort(const int a[], int N)
```

The `const` keyword means that the function cannot modify array elements through the parameter `a`.

However, inside `BubbleSort()`, the following function is called:

```c
Swap(a,j,j+1);
```

The `Swap()` function is declared as:

```c
void Swap(int a[], int j1, int j2);
```

It requires a modifiable integer array because it changes the values of its elements.

Passing a pointer to `const int` to a parameter expecting `int *` discards the `const` qualifier. This is not valid in standard C and requires a diagnostic from the compiler.

### Correct solution

Remove `const` from the `BubbleSort()` declaration and definition:

```c
void BubbleSort(int a[], int N);
```

And:

```c
void BubbleSort(int a[], int N)
```

The sorting function must be allowed to modify the original array.

**Important:** `PrintArray()` could use `const int a[]` because it only displays elements and does not modify them.

## 4. Corrected Complete Source Code

```c
#include <stdio.h>

void PrintArray(const int a[], int N);
void BubbleSort(int a[], int N);
void Swap(int a[], int j1, int j2);

int main()
{
    int a[]={23,53,12,10,17,56,78,34,29,37,45,12,19,20,40,90,43,48,62};

    int N=sizeof(a)/sizeof(a[0]);

    printf("Array before sorting:\n");
    PrintArray(a,N);
    printf("\n\n");

    BubbleSort(a,N);

    printf("Array after sorting:\n");
    PrintArray(a,N);
    printf("\n\n");

    return 0;
}

void BubbleSort(int a[], int N)
{
    int i, j;
    int swapped;

    for(i=0; i<N; i++)
    {
        swapped = 0;

        for(j=0; j<N-1; j++)
        {
            if(a[j]>a[j+1])
            {
                Swap(a,j,j+1);
                swapped = 1;
            }
        }

        if(!swapped) break;
    }
}

void Swap(int a[], int j1, int j2)
{
    int temp;

    temp = a[j1];
    a[j1] = a[j2];
    a[j2] = temp;
}

void PrintArray(const int a[], int N)
{
    int i;

    for(i=0; i<N; i++)
    {
        printf("%d",a[i]);

        if(i<N-1)
        {
            printf(", ");
        }
    }
}
```

The main algorithm is unchanged. Only the parameter of `BubbleSort()` has been corrected, and `PrintArray()` has been declared with `const` because it only reads the array.

## 5. Understanding the Bubble Sort Algorithm

Bubble Sort works by comparing two neighboring elements.

If the left element is greater than the right element, their positions are exchanged.

For ascending order:

```c
if(a[j] > a[j+1])
{
    Swap(a,j,j+1);
}
```

The algorithm moves through the array and repeatedly pushes larger values toward the right side.

After a complete pass, the largest element among the unsorted elements reaches its correct position at the end.

This process is repeated until the array is sorted.

### Example

Consider this small array:

```text
5, 3, 8, 2
```

The first comparison is:

```text
5 > 3
```

The condition is true, so the values are exchanged:

```text
3, 5, 8, 2
```

The next comparison is:

```text
5 > 8
```

The condition is false, so nothing changes.

The next comparison is:

```text
8 > 2
```

The condition is true, so the values are exchanged:

```text
3, 5, 2, 8
```

At the end of the first pass, the largest element (`8`) is in its correct final position.

The algorithm continues with additional passes until the array is sorted:

```text
2, 3, 5, 8
```

## 6. Understanding the Main Function

### 6.1. Creating the Array

```c
int a[]={23,53,12,10,17,56,78,34,29,37,45,12,19,20,40,90,43,48,62};
```

This statement creates an integer array containing 19 elements.

The array is initially unsorted.

### 6.2. Calculating the Number of Elements

```c
int N=sizeof(a)/sizeof(a[0]);
```

The `sizeof` operator returns the size of an object in bytes.

- `sizeof(a)` returns the total size of the array.
- `sizeof(a[0])` returns the size of one array element.

Therefore:

\[
N=\frac{\text{Total Array Size}}{\text{Size of One Element}}
\]

Assuming each integer occupies 4 bytes:

\[
N=\frac{76}{4}=19
\]

The variable `N` stores the number of array elements.

### 6.3. Displaying the Original Array

```c
printf("Array before sorting:\n");
PrintArray(a,N);
```

First, a message is printed.

Then `PrintArray()` is called to display the original array.

### 6.4. Sorting the Array

```c
BubbleSort(a,N);
```

This function call starts the sorting process.

Two arguments are passed:

- `a`: the array to be sorted.
- `N`: the number of array elements.

Because the function receives access to the original array elements through its pointer parameter, the sorting operations modify the original array.

### 6.5. Displaying the Sorted Array

```c
printf("Array after sorting:\n");
PrintArray(a,N);
```

After sorting is complete, the same `PrintArray()` function displays the updated array.

## 7. Understanding the BubbleSort() Function

```c
void BubbleSort(int a[], int N)
{
    int i, j;
    int swapped;

    for(i=0; i<N; i++)
    {
        swapped = 0;

        for(j=0; j<N-1; j++)
        {
            if(a[j]>a[j+1])
            {
                Swap(a,j,j+1);
                swapped = 1;
            }
        }

        if(!swapped) break;
    }
}
```

This is the main sorting function.

It uses:

- Two `for` loops
- One `if` statement
- One flag variable
- The `Swap()` function
- The `break` statement

### 7.1. Function Parameters

```c
void BubbleSort(int a[], int N)
```

The function receives:

- `a[]`: the array that must be sorted.
- `N`: the number of array elements.

The return type is `void` because the function modifies the original array directly and does not need to return a separate array.

### 7.2. Declaring Variables

```c
int i, j;
int swapped;
```

- `i`: controls the outer loop.
- `j`: controls the inner loop.
- `swapped`: indicates whether at least one exchange happened during the current pass.

The `swapped` variable is important for improving the algorithm's performance when the array is already sorted.

### 7.3. Understanding the Outer Loop

```c
for(i=0; i<N; i++)
```

The outer loop controls the number of passes through the array.

In the worst case, the algorithm may need up to `N` passes with this implementation.

Each pass attempts to move larger elements toward the end of the array.

### 7.4. Understanding the swapped Variable

```c
swapped = 0;
```

At the beginning of every pass, `swapped` is reset to zero.

The meaning is:

- `0`: No exchange has happened yet.
- `1`: At least one exchange has happened.

Whenever two elements are exchanged, the following statement executes:

```c
swapped = 1;
```

### 7.5. Understanding the Inner Loop

```c
for(j=0; j<N-1; j++)
```

The inner loop compares adjacent elements.

The comparison uses:

```c
a[j]
a[j+1]
```

For example:

| j | First Element | Second Element |
|---:|---|---|
| 0 | a[0] | a[1] |
| 1 | a[1] | a[2] |
| 2 | a[2] | a[3] |
| 3 | a[3] | a[4] |

The loop stops at `N-2`, because the second element of the final comparison is `a[N-1]`.

### 7.6. Comparing Adjacent Elements

```c
if(a[j]>a[j+1])
```

This condition checks whether two neighboring elements are in the wrong order.

For ascending sorting:

- If the left element is greater, they must be exchanged.
- If the left element is smaller or equal, their positions remain unchanged.

For example:

```text
23, 12
```

Because:

\[
23>12
\]

The elements must be exchanged.

After the exchange:

```text
12, 23
```

### 7.7. Calling the Swap Function

```c
Swap(a,j,j+1);
```

This statement calls the `Swap()` function.

It passes:

- The array.
- The index of the first element.
- The index of the second element.

The function exchanges the values stored at those two positions.

### 7.8. Understanding the Break Condition

```c
if(!swapped) break;
```

The `!` operator is the logical NOT operator.

Therefore:

```c
!swapped
```

is true when `swapped` equals zero.

If no exchange happens during an entire pass, the array is already sorted.

There is no need to perform additional passes, so `break` terminates the outer loop.

This optimization is called the **early-exit optimization**.

Without this optimization, the algorithm would continue executing unnecessary passes even when the array was already sorted.

## 8. Understanding the Swap() Function

```c
void Swap(int a[], int j1, int j2)
{
    int temp;

    temp = a[j1];
    a[j1] = a[j2];
    a[j2] = temp;
}
```

The purpose of this function is to exchange two array elements.

It receives three parameters:

- `a[]`: the original array.
- `j1`: the index of the first element.
- `j2`: the index of the second element.

### 8.1. Why Do We Need a Temporary Variable?

Suppose we want to exchange these two values:

```text
a[j1] = 10
a[j2] = 20
```

A direct assignment like this would not work:

```c
a[j1] = a[j2];
a[j2] = a[j1];
```

After the first statement, both elements would contain 20. The original value of the first element would be lost.

We therefore use a temporary variable.

### 8.2. Step-by-Step Swapping

**Step 1: Save the first value**

```c
temp = a[j1];
```

Now:

```text
temp = 10
a[j1] = 10
a[j2] = 20
```

**Step 2: Copy the second value into the first position**

```c
a[j1] = a[j2];
```

Now:

```text
temp = 10
a[j1] = 20
a[j2] = 20
```

**Step 3: Copy the saved value into the second position**

```c
a[j2] = temp;
```

Final result:

```text
a[j1] = 20
a[j2] = 10
```

The two values have been exchanged successfully.

## 9. Understanding the PrintArray() Function

```c
void PrintArray(const int a[], int N)
{
    int i;

    for(i=0; i<N; i++)
    {
        printf("%d",a[i]);

        if(i<N-1)
        {
            printf(", ");
        }
    }
}
```

This function displays all elements of the array.

### Function Parameters

```c
const int a[], int N
```

- `a[]`: the array to display.
- `N`: the number of elements.
- `const`: prevents the function from modifying the array elements through this parameter.

The array is declared with `const` because printing does not require modifying its contents.

### Understanding the Loop

```c
for(i=0; i<N; i++)
```

The loop visits every array element.

The statement:

```c
printf("%d",a[i]);
```

prints the current element.

### Avoiding an Extra Comma

```c
if(i<N-1)
{
    printf(", ");
}
```

This condition ensures that a comma is printed only between elements, not after the last element.

## 10. Understanding the Complete Sorting Process

The original array contains:

```text
23, 53, 12, 10, 17, 56, 78, 34, 29, 37, 45, 12, 19, 20, 40, 90, 43, 48, 62
```

The algorithm repeatedly compares neighboring elements.

For example, the first few comparisons of the first pass are:

| Comparison | Condition | Result |
|---|---|---|
| 23 and 53 | 23 > 53? | No swap |
| 53 and 12 | 53 > 12? | Swap |
| 53 and 10 | 53 > 10? | Swap |
| 53 and 17 | 53 > 17? | Swap |
| 53 and 56 | 53 > 56? | No swap |
| 56 and 78 | 56 > 78? | No swap |
| 78 and 34 | 78 > 34? | Swap |

The process continues until the end of the array.

At the end of the first complete pass, the largest element (`90`) reaches the final position.

Subsequent passes move the remaining elements into their correct positions.

### Important Detail About This Implementation

The inner loop always uses:

```c
j<N-1
```

It does not reduce its comparison range after each pass.

This is correct, but it performs some unnecessary comparisons.

A more optimized version can use:

```c
for(j=0; j<N-i-1; j++)
```

This avoids comparing elements that are already in their final positions.

The supplied implementation is useful for learning the basic algorithm and the early-exit optimization.

## 11. Expected Output

**Array before sorting:**

```text
23, 53, 12, 10, 17, 56, 78, 34, 29, 37, 45, 12, 19, 20, 40, 90, 43, 48, 62
```

**Array after sorting:**

```text
10, 12, 12, 17, 19, 20, 23, 29, 34, 37, 40, 43, 45, 48, 53, 56, 62, 78, 90
```

The array is sorted in ascending order, from the smallest element to the largest element.

## 12. Bubble Sort in Descending Order

The current program sorts the array in ascending order.

To sort in descending order, change:

```c
if(a[j]>a[j+1])
```

to:

```c
if(a[j]<a[j+1])
```

Now, smaller elements move toward the right side of the array.

For example:

```text
Original:
5, 3, 8, 2

Descending:
8, 5, 3, 2
```

## 13. Optimized Bubble Sort

The original implementation uses a fixed inner-loop limit.

We can improve it by reducing the comparison range after every pass.

```c
void BubbleSort(int a[], int N)
{
    int i, j;
    int swapped;

    for(i=0; i<N-1; i++)
    {
        swapped = 0;

        for(j=0; j<N-i-1; j++)
        {
            if(a[j]>a[j+1])
            {
                Swap(a,j,j+1);
                swapped = 1;
            }
        }

        if(!swapped)
            break;
    }
}
```

Why does this work?

After each complete pass, the largest remaining element is placed at the end of the unsorted section.

Therefore, it does not need to be compared again.

The expression:

```c
N-i-1
```

reduces the number of comparisons in subsequent passes.

Both implementations sort correctly. The optimized version avoids unnecessary comparisons.

## 14. Time and Space Complexity

Let `N` represent the number of elements in the array.

### Original Implementation

| Case | Time Complexity | Explanation |
|---|---|---|
| Best case | O(N) | One pass with no swaps, then early exit |
| Average case | O(N²) | Multiple passes and comparisons |
| Worst case | O(N²) | Many passes and swaps |

The inner loop performs `N-1` comparisons per pass.

In the worst case, the outer loop can execute `N` times.

Therefore, the total number of comparisons is bounded by:

\[
N(N-1)
\]

This gives:

\[
O(N^2)
\]

### Optimized Implementation

The optimized implementation has:

- Best case: O(N)
- Average case: O(N²)
- Worst case: O(N²)

### Space Complexity

Bubble Sort is an in-place sorting algorithm.

It does not create another array.

The `Swap()` function uses only one temporary integer variable.

Therefore, auxiliary space complexity is:

\[
O(1)
\]

## 15. Important Characteristics of Bubble Sort

| Characteristic | Description |
|---|---|
| Algorithm type | Comparison-based sorting |
| Sorting direction | Ascending in this program |
| In-place | Yes |
| Stable | Yes |
| Best-case complexity | O(N) with early exit |
| Average-case complexity | O(N²) |
| Worst-case complexity | O(N²) |
| Auxiliary space | O(1) |

### What Does Stable Sorting Mean?

A stable sorting algorithm preserves the relative order of elements that have equal values.

This implementation is stable because it swaps elements only when:

```c
a[j] > a[j+1]
```

Equal elements are not exchanged.

For example, if two equal values originally appear in a particular order, Bubble Sort preserves their relative order.

## 16. Important C Programming Concepts

### Array Parameters

```c
void BubbleSort(int a[], int N);
```

An array parameter provides access to the original array elements through a pointer.

### const Keyword

```c
void PrintArray(const int a[], int N);
```

The `const` keyword prevents modification of the elements through this parameter.

### Nested Loops

Bubble Sort uses an outer loop and an inner loop.

The outer loop controls passes, while the inner loop performs adjacent comparisons.

### Logical NOT Operator

```c
if(!swapped)
```

The `!` operator reverses a logical value.

When `swapped` is zero, `!swapped` is true.

### Temporary Variables

A temporary variable allows two values to be exchanged without losing either original value.

### break Statement

The `break` statement immediately exits the nearest enclosing loop.

## 17. Suggested Exercises

### Exercise 1: Descending Order

Modify the program to sort the array from largest to smallest.

### Exercise 2: User Input

Instead of using fixed array values, receive the array elements from the user using `scanf()`.

### Exercise 3: Find the Minimum and Maximum

After sorting, display the smallest and largest elements.

### Exercise 4: Count Swaps

Modify `BubbleSort()` to count the total number of swaps.

### Exercise 5: Count Comparisons

Add a counter to calculate how many comparisons are performed during sorting.

### Exercise 6: Optimize the Algorithm

Use `j<N-i-1` instead of `j<N-1` and compare the number of operations.

### Exercise 7: Search After Sorting

After sorting the array, implement a function that searches for a specific number.

### Exercise 8: Sort Floating-Point Numbers

Modify the program to sort an array of `float` values.


## 18. Compile and Run

Using GCC:

```bash
gcc main.c -o bubble_sort
```

Run on Linux:

```bash
./bubble_sort
```

Run on Windows:

```bash
bubble_sort.exe
```

## Learning Objectives

After completing this example, you should understand:

- What a sorting algorithm is.
- How Bubble Sort works.
- How to compare adjacent array elements.
- How to exchange two values using a temporary variable.
- How to organize a sorting algorithm into separate functions.
- How to pass arrays to functions.
- Why a sorting function must be allowed to modify its array.
- How nested loops work.
- How the `swapped` flag improves performance.
- How the `break` statement terminates a loop.
- How to calculate time and space complexity.
- The difference between stable and unstable sorting algorithms.