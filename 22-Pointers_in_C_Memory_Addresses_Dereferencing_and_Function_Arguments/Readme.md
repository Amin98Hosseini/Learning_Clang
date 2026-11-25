# Pointers in C – Memory Addresses, Dereferencing, and Function Arguments

## 1. Overview

This project introduces one of the most important concepts in the C programming language: **Pointers**.

A pointer is a variable that stores the memory address of another variable.

Pointers allow programmers to access and modify data through memory addresses. They are also essential for:

- Passing variables to functions by address.
- Modifying original variables inside functions.
- Working with arrays and strings.
- Dynamic memory allocation.
- Implementing linked lists, trees, and other data structures.
- Interacting with hardware registers in embedded systems.
- Working with memory efficiently.

In this project, we compare three different ways of working with a variable through functions:

1. **Call by Value:** A function receives a copy of a variable.
2. **Call by Value + Assignment:** A function receives a copy, modifies it, and returns the result to the caller.
3. **Pointer-Based Modification:** A function receives the variable's address and modifies the original variable through a pointer.

By the end of this lesson, you should understand how pointers work and why they are so important in C programming.

---

## 2. Source Code

```c
#include <stdio.h>

void Func1(int a);
int Func2(int a);
void Func3(int *a);

int main()
{
    int a;

    printf("Please enter an integer: ");
    scanf("%d", &a);
    printf("\n");

    printf("You have entered %d.\n\n", a);

    Func1(a); // Call by Value

    printf("After calling Func1, the value of a is: %d\n\n", a);

    a = Func2(a); // Call by Value + Assignment

    printf("After calling Func2, the value of a is: %d\n\n", a);

    Func3(&a); // Call by Reference

    printf("After calling Func3, the value of a is: %d\n\n", a);

    printf("a = %d, is stored at %p", a, (void *)&a);

    return 0;
}

void Func1(int a)
{
    a *= 2;

    printf("Inside function Func1, a is %d.\n", a);
}

int Func2(int a)
{
    a *= 2;

    printf("Inside function Func2, a is %d.\n", a);

    return a;
}

void Func3(int *aPtr)
{
    *aPtr *= 2;

    printf("Inside function Func3, a is %d.\n", *aPtr);
}
```

**Note:** The code above includes one small correction to the original program: `(void *)&a` is used with `%p` because `%p` expects a `void *` argument.

---

# 3. Understanding Memory in C

Before learning pointers, it is important to understand how variables are stored in memory.

When you declare a variable:

```c
int a = 10;
```

The computer reserves a location in memory to store the value `10`.

Every memory location has an address.

For example, imagine that variable `a` is stored at memory address `0x1000`.

```
+---------------------------+
|       Computer Memory     |
+---------------------------+
| Address  | Value          |
+---------------------------+
| 0x1000   | 10             |
| 0x1004   | ...            |
| 0x1008   | ...            |
+---------------------------+
```

The addresses above are illustrative only. Actual addresses depend on the system, compiler, and execution.

In C, we can access the address of a variable using the **address-of operator (`&`)**.

Example:

```c
int a = 10;

printf("%p", (void *)&a);
```

The expression:

```c
&a
```

means:

**Give me the memory address of variable `a`.**

The `%p` format specifier is used to print a pointer address.

---

# 4. What Is a Pointer?

A pointer is a variable that stores the memory address of another object.

For example:

```c
int a = 10;

int *p;

p = &a;
```

Let's understand these statements.

### Step 1: Declare an integer variable

```c
int a = 10;
```

We create an integer variable named `a` and initialize it with 10.

### Step 2: Declare a pointer

```c
int *p;
```

We declare a pointer named `p`.

The declaration means:

- `int`: The pointer will point to an integer object.
- `*`: Indicates that `p` is a pointer.
- `p`: The pointer variable name.

At this point, `p` has not been initialized. Its value is indeterminate, so it must not be dereferenced.

### Step 3: Store the address of a variable

```c
p = &a;
```

The address of `a` is stored inside pointer `p`.

Now, `p` points to `a`.

We can visualize this relationship as follows:

```
+---------------------+       +---------------------+
| Variable a          |       | Pointer p           |
+---------------------+       +---------------------+
| Value: 10           |       | Stores address of a |
| Address: 0x1000     |<------| Value: 0x1000       |
+---------------------+       +---------------------+
```

The addresses are examples, not actual memory addresses.

---

# 5. Understanding the Two Main Pointer Operators

There are two important operators used with pointers:

1. Address-of operator (`&`)
2. Dereference operator (`*`)

## 5.1 Address-of Operator (&)

The `&` operator returns the memory address of an object.

Example:

```c
int a = 20;

int *p = &a;
```

Here:

```c
&a
```

returns the address of `a`.

That address is stored in `p`.

Another example:

```c
printf("Value of a: %d\n", a);
printf("Address of a: %p\n", (void *)&a);
printf("Value stored in p: %p\n", (void *)p);
```

The last two printed addresses should represent the same address because `p` stores the address of `a`.

## 5.2 Dereference Operator (*)

The `*` operator can be used to access the object pointed to by a pointer.

Example:

```c
int a = 20;

int *p = &a;

printf("%d\n", *p);
```

Output:

```text
20
```

The expression:

```c
*p
```

means:

**Access the value stored at the memory address contained in pointer `p`.**

We can also modify the original variable through the pointer.

```c
*p = 50;
```

Now the value of `a` becomes 50.

Complete example:

```c
#include <stdio.h>

int main(void)
{
    int a = 20;
    int *p = &a;

    printf("Before modification: %d\n", a);

    *p = 50;

    printf("After modification: %d\n", a);

    return 0;
}
```

Output:

```text
Before modification: 20
After modification: 50
```

This demonstrates one of the most important features of pointers: **A pointer can be used to modify the original object it points to.**

---

# 6. Pointer Declaration and Initialization

The general syntax for declaring a pointer is:

```c
data_type *pointer_name;
```

Examples:

```c
int *p;
float *fPtr;
char *cPtr;
double *dPtr;
```

Each pointer type is intended to point to an object of the corresponding type.

| Declaration | Pointer Type | Points to |
|---|---|---|
| `int *p` | Integer pointer | `int` |
| `float *p` | Float pointer | `float` |
| `char *p` | Character pointer | `char` |
| `double *p` | Double pointer | `double` |

Example:

```c
int a = 10;
float b = 3.14f;
char c = 'A';

int *p1 = &a;
float *p2 = &b;
char *p3 = &c;
```

**Important:** The type of a pointer matters because it determines how the pointed-to object is accessed and how pointer arithmetic behaves.

---

# 7. Understanding the Difference Between & and *

These two operators are closely related but have different purposes.

| Expression | Meaning |
|---|---|
| `a` | Value of variable `a` |
| `&a` | Address of variable `a` |
| `p` | Address stored in pointer `p` |
| `*p` | Value of the object pointed to by `p` |
| `&p` | Address of the pointer variable itself |

Consider this example:

```c
int a = 10;
int *p = &a;
```

Then:

```c
a     // 10
&a    // Address of a
p     // Address of a
*p    // 10
&p    // Address of pointer p
```

A common beginner mistake is confusing `p` and `*p`.

Remember:

- `p` gives the address stored in the pointer.
- `*p` accesses the value at that address.

---

# 8. Understanding the Program Step by Step

Now let's examine the original program and understand how pointers work inside functions.

## 8.1 Function Prototypes

```c
void Func1(int a);
int Func2(int a);
void Func3(int *a);
```

These statements declare three functions.

### Func1

```c
void Func1(int a);
```

Receives an integer by value and does not return anything.

### Func2

```c
int Func2(int a);
```

Receives an integer by value and returns an integer.

### Func3

```c
void Func3(int *a);
```

Receives a pointer to an integer.

The pointer allows the function to access and modify the original integer object.

## 8.2 Receiving Input

```c
int a;

printf("Please enter an integer: ");
scanf("%d", &a);
printf("\n");
```

We declare an integer variable named `a`.

The user enters a value, and `scanf()` stores it in `a`.

Notice that we use:

```c
&a
```

because `scanf()` needs the address of the variable where it should store the input.

## 8.3 Displaying the Initial Value

```c
printf("You have entered %d.\n\n", a);
```

This statement displays the original value entered by the user.

For example:

```text
You have entered 10.
```

## 8.4 Calling Func1(): Call by Value

```c
Func1(a);
```

The function receives a copy of the value stored in `a`.

Function definition:

```c
void Func1(int a)
{
    a *= 2;

    printf("Inside function Func1, a is %d.\n", a);
}
```

The statement:

```c
a *= 2;
```

is equivalent to:

```c
a = a * 2;
```

If the original value is 10, the function's local copy becomes 20.

However, the original variable in `main()` remains 10.

Why?

Because C passes function arguments by value. The function receives a separate copy of the integer.

Conceptual illustration:

```
main()                         Func1()

a = 10                         a = 10
  |                               |
  |---- Copy of value ----------->|
                                  |
                               a = a * 2
                                  |
                                a = 20

Original a remains 10.
```

After the function returns, its local parameter no longer exists.

Therefore:

```c
printf("After calling Func1, the value of a is: %d\n\n", a);
```

prints the original value.

## 8.5 Calling Func2(): Call by Value + Assignment

```c
a = Func2(a);
```

This function also receives a copy of the original value.

Function definition:

```c
int Func2(int a)
{
    a *= 2;

    printf("Inside function Func2, a is %d.\n", a);

    return a;
}
```

Let's assume the original value is 10.

Inside the function:

```c
a *= 2;
```

The local copy becomes 20.

Then:

```c
return a;
```

returns 20 to the calling function.

The statement:

```c
a = Func2(a);
```

stores the returned value in the original variable.

Now the original variable becomes 20.

This method does not modify the caller's variable directly. Instead, it returns a result that the caller assigns to the variable.

Conceptual illustration:

```
main()                         Func2()

a = 10                         a = 10
  |                               |
  |---- Copy of value ----------->|
                                  |
                               a = 20
                                  |
                               return 20
  |                               |
  |<----------- 20 ---------------|
  |
a = 20
```

## 8.6 Calling Func3(): Pointer-Based Modification

```c
Func3(&a);
```

This time, we do not pass the value of `a`.

We pass its address.

The function definition is:

```c
void Func3(int *aPtr)
{
    *aPtr *= 2;

    printf("Inside function Func3, a is %d.\n", *aPtr);
}
```

Let's understand this carefully.

### Step 1: Pass the address

```c
Func3(&a);
```

The expression `&a` returns the address of the original variable.

### Step 2: Receive the address using a pointer

```c
void Func3(int *aPtr)
```

The parameter `aPtr` is an integer pointer.

It receives the address passed from `main()`.

Therefore, `aPtr` points to the original variable `a`.

### Step 3: Dereference the pointer

```c
*aPtr *= 2;
```

This statement accesses the original integer through its address and multiplies it by two.

It is equivalent to:

```c
*aPtr = *aPtr * 2;
```

Because `aPtr` points to the original variable, the original value is modified.

### Step 4: Display the modified value

```c
printf("Inside function Func3, a is %d.\n", *aPtr);
```

The expression `*aPtr` accesses the value stored in the original variable.

If `a` was 20 before the function call, it becomes 40.

After returning to `main()`, the original variable is still 40.

Conceptual illustration:

```
main()                         Func3()

a = 20
Address = 0x1000
  |
  |---- Address of a -----------> aPtr
                                  |
                                  | stores 0x1000
                                  |
                               *aPtr = 20
                                  |
                               *aPtr *= 2
                                  |
                               *aPtr = 40

Original a is now 40.
```

This is the fundamental idea behind modifying a variable through a pointer.

---

# 9. Call by Value vs Pointer-Based Modification

This is one of the most important comparisons in C programming.

| Feature | Func1 | Func2 | Func3 |
|---|---|---|---|
| Parameter | `int a` | `int a` | `int *aPtr` |
| Receives | Copy of value | Copy of value | Copy of address |
| Modifies original variable? | No | No, not directly | Yes |
| Returns a value? | No | Yes | No |
| Main technique | Call by value | Return and assignment | Pointer-based modification |

**Important terminology:** C technically uses call by value for every function argument, including pointers. In `Func3`, the pointer value (the address) is copied into the function parameter. The function can nevertheless modify the original object through that copied address.

The term "call by reference" is commonly used informally to describe this pointer-based technique in C, but C does not have true reference parameters like C++.

---

# 10. Understanding the Final printf() Statement

```c
printf("a = %d, is stored at %p", a, (void *)&a);
```

This statement displays the value and memory address of variable `a`.

Let's examine the arguments:

```c
a
```

Displays the value stored in the variable.

```c
&a
```

Returns the address of the variable.

```c
(void *)&a
```

Converts the address to `void *`, which is the required argument type for the `%p` format specifier.

Example output:

```text
a = 40, is stored at 0x7ffd12345678
```

The displayed address is only an example. It will usually be different on another execution or system.

---

# 11. Complete Execution Example

Assume the user enters:

```text
10
```

The program execution is:

| Step | Operation | Value of original `a` |
|---|---|---:|
| 1 | User enters 10 | 10 |
| 2 | Call `Func1(a)` | 10 |
| 3 | `Func1` doubles its local copy | 10 |
| 4 | Call `Func2(a)` | 10 |
| 5 | `Func2` returns 20 and assigns it to `a` | 20 |
| 6 | Call `Func3(&a)` | 40 |

Expected output:

```text
Please enter an integer: 10

You have entered 10.

Inside function Func1, a is 20.
After calling Func1, the value of a is: 10

Inside function Func2, a is 20.
After calling Func2, the value of a is: 20

Inside function Func3, a is 40.
After calling Func3, the value of a is: 40

a = 40, is stored at 0x...
```

The final address depends on the system.

---

# 12. Important Pointer Safety Rules

Pointers provide powerful access to memory, but incorrect pointer usage can cause serious bugs.

### 12.1 Always Initialize Pointers

Incorrect:

```c
int *p;
*p = 10;
```

The pointer is uninitialized. Dereferencing it causes undefined behavior.

Correct:

```c
int a;
int *p = &a;

*p = 10;
```

### 12.2 Check for NULL When Necessary

A pointer may intentionally contain `NULL`.

```c
int *p = NULL;

if(p != NULL)
{
    printf("%d\n", *p);
}
```

Never dereference a null pointer.

### 12.3 Do Not Access Memory After Its Lifetime Ends

A pointer must not be used to access an object after that object's lifetime has ended.

For example, returning the address of a local variable from a function creates a dangling pointer.

Incorrect:

```c
int *GetValue(void)
{
    int a = 10;
    return &a;
}
```

The local variable `a` ceases to exist when the function returns.

### 12.4 Match Pointer Types Correctly

For example:

```c
int a = 10;
int *p = &a;
```

An `int *` should point to an appropriate integer object.

Avoid incompatible pointer conversions because they can cause incorrect memory access and undefined behavior.

### 12.5 Understand Pointer Declaration Syntax

These declarations are equivalent:

```c
int *p;
int* p;
```

However:

```c
int* p1, p2;
```

declares `p1` as a pointer to `int`, but `p2` as a normal integer.

A clearer style is:

```c
int *p1;
int p2;
```

---

# 13. Additional Pointer Examples

## Example 1: Changing a Variable Through a Pointer

```c
#include <stdio.h>

int main(void)
{
    int a = 10;
    int *p = &a;

    printf("Before: %d\n", a);

    *p = 100;

    printf("After: %d\n", a);

    return 0;
}
```

Output:

```text
Before: 10
After: 100
```

## Example 2: Changing Two Variables Using Pointers

One of the most common applications of pointers is swapping two variables.

```c
#include <stdio.h>

void Swap(int *a, int *b);

int main(void)
{
    int x = 10;
    int y = 20;

    printf("Before swapping:\n");
    printf("x = %d, y = %d\n", x, y);

    Swap(&x, &y);

    printf("After swapping:\n");
    printf("x = %d, y = %d\n", x, y);

    return 0;
}

void Swap(int *a, int *b)
{
    int temp = *a;

    *a = *b;
    *b = temp;
}
```

Output:

```text
Before swapping:
x = 10, y = 20

After swapping:
x = 20, y = 10
```

This example demonstrates why pointers are useful when a function needs to modify more than one original variable.

## Example 3: Pointer to a Character

```c
#include <stdio.h>

int main(void)
{
    char c = 'A';
    char *p = &c;

    printf("Character: %c\n", *p);

    *p = 'B';

    printf("Modified character: %c\n", c);

    return 0;
}
```

Output:

```text
Character: A
Modified character: B
```

Pointers can work with different data types, not only integers.

---

# 14. Pointers and Arrays

Pointers and arrays are closely related in C.

Consider:

```c
int a[] = {10, 20, 30, 40};

int *p = a;
```

In most expressions, the array name `a` is converted to a pointer to its first element.

Therefore:

```c
p = &a[0];
```

is equivalent to:

```c
p = a;
```

We can access array elements through pointers:

```c
printf("%d\n", *p);
printf("%d\n", *(p + 1));
printf("%d\n", *(p + 2));
printf("%d\n", *(p + 3));
```

Output:

```text
10
20
30
40
```

The expression:

```c
*(p + 1)
```

accesses the second element of the array.

This is called **pointer arithmetic**.

Pointer arithmetic automatically accounts for the size of the pointed-to data type.

For an `int *`, adding 1 moves to the next `int` element, not necessarily just one byte.

---

# 15. Why Pointers Are Important in Embedded Systems

Pointers are especially important in embedded programming, including STM32 and other microcontroller platforms.

They are used for:

- Accessing hardware registers.
- Working with peripheral memory addresses.
- Passing large buffers to functions without copying the entire data.
- Managing UART, SPI, I2C, CAN, and Ethernet data buffers.
- Working with DMA.
- Implementing drivers and hardware abstraction layers.
- Managing dynamically allocated memory where appropriate.

For example, a hardware register can be accessed through a pointer:

```c
#define GPIO_REGISTER_ADDRESS 0x4001080C

volatile unsigned int *GPIO_REGISTER =
    (volatile unsigned int *)GPIO_REGISTER_ADDRESS;
```

The `volatile` keyword tells the compiler that the value may change independently of ordinary program execution, as can happen with hardware registers.

**Important:** This is only an illustrative example. Actual register addresses, access widths, and required qualifiers must come from the specific microcontroller reference manual. In STM32 projects, the HAL and CMSIS headers normally provide the appropriate register definitions.

---

# 16. Compilation and Execution

Compile the program using GCC:

```bash
gcc main.c -o pointers
```

Run on Linux:

```bash
./pointers
```

Run on Windows:

```powershell
.\pointers.exe
```

For additional compiler warnings:

```bash
gcc -Wall -Wextra -Wpedantic -std=c11 main.c -o pointers
```

---

# 17. Learning Exercises

Try these exercises to improve your understanding of pointers.

### Beginner Level

1. Declare an integer variable and print its value and address.
2. Declare an integer pointer and make it point to the variable.
3. Print the pointer value using `%p`.
4. Print the value of the pointed-to variable using `*`.
5. Change the original variable using the pointer.
6. Create a `float` pointer and a `char` pointer.

### Intermediate Level

7. Write a function that doubles an integer using a pointer.
8. Write a function that triples an integer using a pointer.
9. Write a function that swaps two integers using pointers.
10. Write a function that receives an array and changes all its elements.
11. Write a function that calculates the sum and average of an array using pointer parameters.
12. Compare a function that returns a value with a function that modifies a variable through a pointer.

### Advanced Level

13. Create a pointer to a pointer (`int **p`).
14. Use pointers to traverse an array without using array indexing.
15. Dynamically allocate an array using `malloc()`.
16. Write a function that allocates memory and returns it through a pointer parameter.
17. Explore how pointers are used to access STM32 peripheral registers.

---

# 18. Learning Objectives

After completing this lesson, you should understand:

- What memory addresses are.
- What pointers are and why they are used.
- How to declare and initialize pointers.
- The difference between `&` and `*`.
- How to access a variable through a pointer.
- How to modify the original variable through a pointer.
- The difference between call by value and pointer-based modification.
- How to pass pointers to functions.
- How pointers relate to arrays.
- Basic pointer safety rules.
- Why pointers are essential in embedded systems.

---


# Conclusion

Pointers are one of the most powerful features of the C programming language.

A normal variable stores a value, while a pointer stores the memory address of an object.

The two most important operators are:

```c
&variable
```

Returns the address of a variable.

```c
*pointer
```

Accesses the object stored at the address contained in a pointer.

The most important lesson from this project is that C functions always receive arguments by value. However, when we pass a pointer, the function receives a copy of the address and can use that address to modify the original object.

Understanding pointers is essential before moving on to arrays, strings, dynamic memory allocation, structures, linked lists, and embedded systems programming.