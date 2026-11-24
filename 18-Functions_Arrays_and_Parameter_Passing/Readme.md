# 18-Functions, Arrays, and Parameter Passing in C

## 1. Introduction

This program demonstrates how to define and use functions in the C programming language.

It introduces several important C concepts:

- Function declarations (prototypes)
- Function definitions
- Function calls
- Function parameters and arguments
- Returning values from functions
- Passing arrays to functions
- The `const` keyword
- Modifying array elements inside a function
- Pass by Value
- Understanding the difference between arrays and ordinary variables when passed to functions

The program defines four functions:

| Function | Purpose |
|---|---|
| `PrintArray()` | Displays all elements of an array |
| `Mean()` | Calculates and returns the arithmetic mean |
| `MakeDouble()` | Multiplies every array element by two |
| `MakeDouble2()` | Multiplies a local copy of an integer by two |

The main purpose of this example is to understand how functions interact with arrays and variables in C.

## 2. Complete Source Code

```c
#include <stdio.h>

void PrintArray(const int a[], int N);
float Mean(const int a[], int N);
void MakeDouble(int a[], int N);
void MakeDouble2(int s);

int main()
{
    int p[]={1,2,3,4,5,6,7,8,9,0};

    int N=sizeof(p)/sizeof(p[0]);

    PrintArray(p,N);

    float m = Mean(p,N);
    printf("Mean of Array Elements = %f\n\n",m);

    printf("Calling MakeDouble function ...\n\n");
    MakeDouble(p,N);

    PrintArray(p,N);

    int s = 10;
    printf("Before MakeDouble2: s = %d\n",s);
    MakeDouble2(s);
    printf("After MakeDouble2: s = %d\n",s);

    return 0;
}

void PrintArray(const int a[], int N)
{
    printf("List of array members:\n");

    int i;
    for(i=0; i<N; i++)
    {
        printf("%d",a[i]);

        if(i<N-1)
        {
            printf(", ");
        }
    }

    printf("\n\n");
}

float Mean(const int a[], int N)
{
    int sum = 0;
    int i;

    for(i=0; i<N; i++)
    {
        sum += a[i];
    }

    return (float)sum/N;
}

void MakeDouble(int a[], int N)
{
    int i;

    for(i=0; i<N; i++)
    {
        a[i]*=2;
    }
}

void MakeDouble2(int s)
{
    s*=2;
}
```

## 3. Understanding Function Prototypes

At the beginning of the program, four function prototypes are declared:

```c
void PrintArray(const int a[], int N);
float Mean(const int a[], int N);
void MakeDouble(int a[], int N);
void MakeDouble2(int s);
```

A function prototype informs the compiler about a function before its actual definition.

It specifies:

1. The function's return type.
2. The function's name.
3. The number of parameters.
4. The data types of its parameters.

### Understanding the Return Types

| Return Type | Meaning |
|---|---|
| `void` | The function does not return a value |
| `float` | The function returns a floating-point value |
| `int` | The function returns an integer |

For example:

```c
float Mean(const int a[], int N);
```

This declaration means:

- Function name: `Mean`
- Return type: `float`
- First parameter: an integer array
- Second parameter: an integer representing the array size

The function returns the calculated mean as a floating-point number.

### Why Do We Use Function Prototypes?

The compiler must know a function's interface before it is called.

In this program, the function prototypes appear before `main()`, while the actual function definitions appear after `main()`.

This organization allows the program to call functions before their definitions appear in the source file.

## 4. Understanding the Main Function

### 4.1 Creating an Array

```c
int p[]={1,2,3,4,5,6,7,8,9,0};
```

This statement creates an integer array containing ten elements.

The array is stored in memory as consecutive integer elements.

| Index | Value |
|---|---:|
| p[0] | 1 |
| p[1] | 2 |
| p[2] | 3 |
| p[3] | 4 |
| p[4] | 5 |
| p[5] | 6 |
| p[6] | 7 |
| p[7] | 8 |
| p[8] | 9 |
| p[9] | 0 |

### 4.2 Calculating the Array Size

```c
int N=sizeof(p)/sizeof(p[0]);
```

The `sizeof` operator returns the size of an object in bytes.

- `sizeof(p)` returns the total size of the array.
- `sizeof(p[0])` returns the size of one array element.

Assuming an `int` occupies 4 bytes:

\[
N=\frac{40}{4}=10
\]

Therefore, `N` contains the number of elements in the array.

This technique works here because `p` is an actual array in the scope of `main()`.

**Important:** When an array is passed to a function, it is treated as a pointer parameter. Therefore, `sizeof(a)` inside a function does not give the original array's total size. This is why the program passes `N` separately.

### 4.3 Calling PrintArray()

```c
PrintArray(p,N);
```

This statement calls the `PrintArray()` function.

Two arguments are passed:

- `p`: the array.
- `N`: the number of elements.

The function displays all array elements.

### 4.4 Calling Mean()

```c
float m = Mean(p,N);
printf("Mean of Array Elements = %f\n\n",m);
```

The `Mean()` function receives the array and its size, calculates the average, and returns the result.

The returned value is stored in the variable `m`.

## 5. Understanding the PrintArray() Function

```c
void PrintArray(const int a[], int N)
{
    printf("List of array members:\n");

    int i;
    for(i=0; i<N; i++)
    {
        printf("%d",a[i]);

        if(i<N-1)
        {
            printf(", ");
        }
    }

    printf("\n\n");
}
```

This function displays the contents of an integer array.

### Function Parameters

```c
const int a[], int N
```

- `a[]`: the array whose elements must be displayed.
- `N`: the number of elements in the array.
- `const`: prevents this function from modifying the array elements through this parameter.

### Understanding const

The `const` keyword makes the elements read-only through the parameter `a`.

For example, this is allowed:

```c
printf("%d",a[i]);
```

But this is not allowed:

```c
a[i] = 100;
```

The compiler will report an error because the array elements are treated as constant through this parameter.

This is useful when a function only needs to read data.

### Understanding the for Loop

```c
for(i=0; i<N; i++)
```

The loop starts from index zero and continues until it reaches the last array element.

For an array with ten elements:

```text
i = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

### Understanding the if Statement

```c
if(i<N-1)
{
    printf(", ");
}
```

This condition prints a comma after each element except the last one.

Without this condition, the output would contain an unnecessary comma after the final element.

## 6. Understanding the Mean() Function

```c
float Mean(const int a[], int N)
{
    int sum = 0;
    int i;

    for(i=0; i<N; i++)
    {
        sum += a[i];
    }

    return (float)sum/N;
}
```

This function calculates the arithmetic mean of the array elements.

### Mathematical Background

The arithmetic mean is calculated using:

\[
\text{Mean}=\frac{\sum_{i=0}^{N-1}a[i]}{N}
\]

Where:

- \(a[i]\) represents an array element.
- \(N\) represents the number of elements.
- \(\sum a[i]\) represents the sum of all elements.

For this program:

\[
1+2+3+4+5+6+7+8+9+0=45
\]

The number of elements is:

\[
N=10
\]

Therefore:

\[
\text{Mean}=\frac{45}{10}=4.5
\]

### Understanding the Sum Calculation

```c
int sum = 0;
```

Creates an integer variable to store the sum.

```c
for(i=0; i<N; i++)
{
    sum += a[i];
}
```

Adds each array element to `sum`.

The statement:

```c
sum += a[i];
```

is equivalent to:

```c
sum = sum + a[i];
```

### Understanding Type Casting

```c
return (float)sum/N;
```

This is an important part of the program.

The expression `(float)sum` converts the integer value of `sum` into a floating-point value before division.

Without this conversion:

```c
return sum/N;
```

both operands would be integers, so C would perform integer division.

For example:

\[
45/10=4
\]

With floating-point conversion:

\[
45.0/10=4.5
\]

The result preserves the fractional part.

## 7. Understanding the MakeDouble() Function

```c
void MakeDouble(int a[], int N)
{
    int i;

    for(i=0; i<N; i++)
    {
        a[i]*=2;
    }
}
```

This function multiplies every element of the array by two.

### Function Parameters

```c
int a[], int N
```

Unlike `PrintArray()` and `Mean()`, the array parameter does not have `const`.

This is intentional because the function must modify the original array elements.

### Understanding the Multiplication

```c
a[i]*=2;
```

This statement is equivalent to:

```c
a[i] = a[i] * 2;
```

Each array element is multiplied by two.

### Example

Before calling `MakeDouble()`:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 0
```

After calling `MakeDouble()`:

```text
2, 4, 6, 8, 10, 12, 14, 16, 18, 0
```

### Why Does the Original Array Change?

In C, when an array is passed to a function, the array parameter is adjusted to a pointer to its first element.

The function receives access to the original array's elements.

Therefore, modifying `a[i]` changes the corresponding element in `p`.

The function does not receive an independent copy of the entire array.

**Important:** C technically passes all function arguments by value. In the case of an array parameter, the value being passed is a pointer to the original array's first element. The pointer itself is copied, but it still points to the original elements.

## 8. Understanding MakeDouble2() and Pass by Value

```c
void MakeDouble2(int s)
{
    s*=2;
}
```

This function receives an ordinary integer variable.

Unlike the array example, the function receives a copy of the integer value.

Consider the following statements in `main()`:

```c
int s = 10;

printf("Before MakeDouble2: s = %d\n",s);

MakeDouble2(s);

printf("After MakeDouble2: s = %d\n",s);
```

The function call:

```c
MakeDouble2(s);
```

passes the value `10` to the function.

Inside the function, the local parameter `s` is multiplied by two:

```c
s*=2;
```

The local copy becomes 20, but the original variable in `main()` remains unchanged.

Therefore, the output is:

```text
Before MakeDouble2: s = 10
After MakeDouble2: s = 10
```

### Why Does the Value Not Change?

C uses **Pass by Value** for function arguments.

This means that the function receives a copy of the argument's value.

Changing the parameter inside the function does not modify the original variable.

### How Can We Modify the Original Variable?

To modify an ordinary variable inside a function, we can pass its address using a pointer.

For example:

```c
void MakeDouble2(int *s)
{
    *s *= 2;
}
```

Call it like this:

```c
int s = 10;

MakeDouble2(&s);

printf("s = %d\n",s);
```

Output:

```text
s = 20
```

Here:

- `&s` obtains the address of the original variable.
- `int *s` declares a pointer parameter.
- `*s` accesses the value stored at that address.

This allows the function to modify the original variable.

## 9. Pass by Value vs. Array Parameters

This example demonstrates an important distinction.

| Feature | Ordinary Integer | Array Parameter |
|---|---|---|
| Example | `int s` | `int a[]` |
| What is passed? | A copy of the integer value | A copy of a pointer to the first element |
| Can the function modify the original data? | Not through the copied integer parameter | Yes, through the pointer |
| Does the original change? | No | Yes, if elements are modified |
| How to modify original data? | Pass its address using a pointer | Modify the pointed-to elements |

Remember: C does not have true pass-by-reference parameters. Array parameters are adjusted to pointer parameters, and the pointer is passed by value.

## 10. Understanding void and Return Values

The program uses two different return types.

### Functions with void

```c
void PrintArray(const int a[], int N);
void MakeDouble(int a[], int N);
void MakeDouble2(int s);
```

These functions do not return a value.

They perform operations such as displaying data or modifying array elements.

### Function Returning float

```c
float Mean(const int a[], int N);
```

This function returns a floating-point value.

The `return` statement sends the calculated result back to the calling function.

```c
return (float)sum/N;
```

## 11. Complete Program Execution

The program executes the following steps:

1. Creates an integer array with ten elements.
2. Calculates the number of elements.
3. Calls `PrintArray()` to display the original array.
4. Calls `Mean()` to calculate the average.
5. Prints the average.
6. Calls `MakeDouble()` to multiply all array elements by two.
7. Calls `PrintArray()` again to display the modified array.
8. Creates an integer variable `s` with the value 10.
9. Calls `MakeDouble2()` with `s`.
10. Displays `s` again to demonstrate that its original value has not changed.

## 12. Expected Output

```text
List of array members:
1, 2, 3, 4, 5, 6, 7, 8, 9, 0

Mean of Array Elements = 4.500000

Calling MakeDouble function ...

List of array members:
2, 4, 6, 8, 10, 12, 14, 16, 18, 0

Before MakeDouble2: s = 10
After MakeDouble2: s = 10
```

## 13. Function Summary

| Function | Input | Return | Operation |
|---|---|---|---|
| `PrintArray()` | Array, size | `void` | Displays array elements |
| `Mean()` | Array, size | `float` | Calculates the mean |
| `MakeDouble()` | Array, size | `void` | Doubles each array element |
| `MakeDouble2()` | Integer | `void` | Doubles a local copy of an integer |

## 14. Time and Space Complexity

Let \(N\) be the number of array elements.

| Function | Time Complexity | Auxiliary Space |
|---|---|---|
| `PrintArray()` | O(N) | O(1) |
| `Mean()` | O(N) | O(1) |
| `MakeDouble()` | O(N) | O(1) |
| `MakeDouble2()` | O(1) | O(1) |

The complete program has O(N) time complexity because it performs several linear operations over the array.

The functions use only a fixed number of additional variables, so their auxiliary space complexity is O(1).

## 15. Important Notes

1. A function prototype must match the corresponding function definition.
2. The `void` return type means that the function does not return a value.
3. The `return` statement sends a result back to the calling function.
4. The `const` keyword prevents modification of array elements through that parameter.
5. An array parameter is adjusted to a pointer parameter in a function declaration or definition.
6. Modifying array elements through that pointer changes the original array.
7. Ordinary integer arguments are passed by value.
8. Changing a local parameter does not change the original integer variable.
9. Use pointers when a function needs to modify an ordinary variable in the caller.
10. Pass the array size separately because an array parameter does not retain the original array length.

## 16. Suggested Exercises

### Exercise 1: Calculate the Maximum

Create a function named `Maximum()` that receives an integer array and returns its largest element.

### Exercise 2: Calculate the Minimum

Create a function named `Minimum()` that returns the smallest element of an array.

### Exercise 3: Calculate the Sum

Create a function named `SumArray()` that calculates and returns the sum of all array elements.

### Exercise 4: Reverse an Array

Create a function named `ReverseArray()` that reverses the order of array elements.

### Exercise 5: Modify an Integer Using a Pointer

Rewrite `MakeDouble2()` using a pointer so that the original integer changes.

### Exercise 6: Create a Copy of an Array

Write a function that copies all elements from one array into another array.

### Exercise 7: Find an Element

Create a function named `SearchArray()` that receives an array and a number, then returns the index of the number if it exists.


## 17. Compile and Run

Using GCC:

```bash
gcc main.c -o functions
```

Run on Linux:

```bash
./functions
```

Run on Windows:

```bash
functions.exe
```

## Learning Objectives

After studying this program, you should understand:

- How to declare, define, and call functions in C.
- How function prototypes work.
- How to pass arguments to functions.
- How to return values from functions.
- How to pass arrays to functions.
- How to use `const` with array parameters.
- How to modify original array elements inside a function.
- Why ordinary integer variables do not change when passed by value.
- How pointers allow functions to modify original variables.
- The difference between array parameters and ordinary variable parameters.