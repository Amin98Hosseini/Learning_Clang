# 38-Structures and Passing Structures to Functions in C

## 1. Introduction

In C programming, a structure (`struct`) is a user-defined data type that allows us to group multiple variables of different data types under one name.

For example, information about a student may include:

- Student ID (`int`)
- First name (`char *`)
- Last name (`char *`)
- GPA (`float`)

Instead of declaring four separate variables for every student, we can define a structure called `Student` and store all related information together.

This program demonstrates:

1. Defining a structure using `typedef`.
2. Declaring structure variables.
3. Initializing structure members.
4. Accessing structure members using the dot (`.`) operator.
5. Passing a structure to a function by value.
6. Passing a structure to a function using a pointer.
7. Accessing structure members using the arrow (`->`) operator.
8. Understanding the difference between modifying a structure copy and modifying the original structure.

---

## 2. Complete Source Code

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
} Student;

void DisplayStudentInformation(Student stu);
void DisplayStudentInformation2(Student *pstu);

int main()
{

    Student stu1;
    stu1.id=101;
    stu1.firstName="Ali";
    stu1.lastName="Alavi";
    stu1.gpa=18;

    Student stu2={102,"Reza","Razavi",19};

    printf("Using First Function (By Value):\n");
    DisplayStudentInformation(stu1);
    DisplayStudentInformation(stu2);
    DisplayStudentInformation(stu1);

    printf("------------------------------------------------\n");

    printf("Using Second Function (By Reference):\n");
    DisplayStudentInformation2(&stu1);
    DisplayStudentInformation2(&stu2);
    DisplayStudentInformation2(&stu1);

    return 0;
}

void DisplayStudentInformation(Student stu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n",stu.id);
    printf("First Name: %s\n",stu.firstName);
    printf(" Last Name: %s\n",stu.lastName);
    printf("       GPA: %.2f\n",stu.gpa);
    stu.id+=1000;
    printf("    New ID: %d\n",stu.id);
    printf("\n");
}

void DisplayStudentInformation2(Student *pstu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n",pstu->id);
    printf("First Name: %s\n",pstu->firstName);
    printf(" Last Name: %s\n",pstu->lastName);
    printf("       GPA: %.2f\n",pstu->gpa);
    pstu->id+=1000;
    printf("    New ID: %d\n",pstu->id);
    printf("\n");
}
```

---

## 3. Header Files

```c
#include <stdio.h>
#include <stdlib.h>
```

### `stdio.h`

The Standard Input/Output library provides functions for displaying information.

This program uses:

- `printf()` – Prints formatted information to the console.

### `stdlib.h`

The Standard Library header provides functions for memory management, conversions, sorting, and other general-purpose operations.

However, this particular program does not use any function from `stdlib.h`, so this header is unnecessary.

You can simplify the beginning of the program to:

```c
#include <stdio.h>
```

---

## 4. Defining a Structure Using `typedef`

```c
typedef struct
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
} Student;
```

This is one of the most important parts of the program.

### What is a structure?

A structure is a collection of variables, potentially with different data types, grouped under one data type.

Here, we define a structure that stores student information.

Let's examine each member.

| Member | Data type | Description |
|---|---|---|
| `id` | `int` | Student identification number |
| `firstName` | `char *` | Pointer to the first name |
| `lastName` | `char *` | Pointer to the last name |
| `gpa` | `float` | Student grade point average |

### What is `typedef`?

The `typedef` keyword creates an alias for an existing data type.

Without `typedef`, we could define the structure like this:

```c
struct Student
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
};
```

To declare a variable, we would write:

```c
struct Student stu1;
```

However, using `typedef` allows us to write:

```c
typedef struct
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
} Student;
```

Now, we can declare a variable more simply:

```c
Student stu1;
```

**Important:** `typedef` does not create a new structure variable. It creates a type alias that makes declarations shorter and easier to read.

### Understanding `char *`

The following members are pointers:

```c
char *firstName;
char *lastName;
```

They store addresses of characters rather than character arrays directly inside the structure.

In this program, they point to string literals:

```c
stu1.firstName = "Ali";
stu1.lastName = "Alavi";
```

String literals should not be modified. If you need to change a student's name, use writable character arrays or dynamically allocated memory with appropriate size management.

For example:

```c
char firstName[] = "Ali";
char lastName[] = "Alavi";
```

The structure could instead contain fixed-size arrays:

```c
typedef struct
{
    int id;
    char firstName[30];
    char lastName[30];
    float gpa;
} Student;
```

This version stores the character arrays directly inside each structure.

---

## 5. Function Prototypes

```c
void DisplayStudentInformation(Student stu);
void DisplayStudentInformation2(Student *pstu);
```

These lines declare two functions before `main()`.

A function prototype informs the compiler about:

- The function name.
- Its return type.
- The number and types of its parameters.

Both functions return `void`, which means they do not return a value.

However, their parameters are different.

### First function

```c
void DisplayStudentInformation(Student stu);
```

This function receives a `Student` structure directly.

The structure is passed by value, meaning the function receives its own copy.

### Second function

```c
void DisplayStudentInformation2(Student *pstu);
```

This function receives a pointer to a `Student` structure.

The pointer contains the address of an existing structure variable.

Therefore, the function can access and modify the original structure through that pointer.

---

## 6. Creating the First Student

```c
Student stu1;

stu1.id=101;
stu1.firstName="Ali";
stu1.lastName="Alavi";
stu1.gpa=18;
```

First, we declare a variable:

```c
Student stu1;
```

This creates a structure variable named `stu1`.

Next, we assign values to its members.

### Accessing members using the dot operator

The dot operator (`.`) is used when accessing a structure variable directly.

For example:

```c
stu1.id = 101;
```

This means:

- Access the structure named `stu1`.
- Select its member named `id`.
- Assign the value `101`.

The remaining assignments work in the same way:

```c
stu1.firstName = "Ali";
stu1.lastName = "Alavi";
stu1.gpa = 18;
```

After these statements, the structure contains:

| Member | Value |
|---|---|
| `id` | `101` |
| `firstName` | `"Ali"` |
| `lastName` | `"Alavi"` |
| `gpa` | `18.0` |

---

## 7. Initializing the Second Student

```c
Student stu2={102,"Reza","Razavi",19};
```

C allows us to initialize all structure members when declaring a structure variable.

The values are assigned in the order in which the members were defined.

Our structure definition is:

```c
typedef struct
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
} Student;
```

Therefore, the initialization is equivalent to:

```c
Student stu2;

stu2.id = 102;
stu2.firstName = "Reza";
stu2.lastName = "Razavi";
stu2.gpa = 19;
```

The second student contains:

| Member | Value |
|---|---|
| `id` | `102` |
| `firstName` | `"Reza"` |
| `lastName` | `"Razavi"` |
| `gpa` | `19.0` |

This initialization technique is called **aggregate initialization**.

You can also use designated initializers in C:

```c
Student stu2 = {
    .id = 102,
    .firstName = "Reza",
    .lastName = "Razavi",
    .gpa = 19
};
```

Designated initializers make the code easier to understand because each value is associated with its member name.

---

## 8. Calling the First Function – Passing by Value

```c
printf("Using First Function (By Value):\n");

DisplayStudentInformation(stu1);
DisplayStudentInformation(stu2);
DisplayStudentInformation(stu1);
```

Here, we call the first function three times.

Each call passes a structure variable directly.

For example:

```c
DisplayStudentInformation(stu1);
```

The function receives a copy of `stu1`.

Conceptually, the function behaves as if it has its own independent structure:

```c
Student localCopy = stu1;
```

This is an illustration of the behavior, not code that must be written explicitly.

The original `stu1` remains unchanged when the function modifies its parameter.

Let's understand why.

---

## 9. Understanding the First Function

```c
void DisplayStudentInformation(Student stu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n",stu.id);
    printf("First Name: %s\n",stu.firstName);
    printf(" Last Name: %s\n",stu.lastName);
    printf("       GPA: %.2f\n",stu.gpa);

    stu.id+=1000;

    printf("    New ID: %d\n",stu.id);
    printf("\n");
}
```

### Function parameter

```c
Student stu
```

The function receives a complete structure object by value.

The parameter `stu` is a separate local structure object.

### Displaying structure members

```c
printf("        ID: %d\n",stu.id);
printf("First Name: %s\n",stu.firstName);
printf(" Last Name: %s\n",stu.lastName);
printf("       GPA: %.2f\n",stu.gpa);
```

These statements display the student's information.

Notice that we use the dot operator (`.`), because `stu` is a structure variable, not a pointer.

### Increasing the ID

```c
stu.id+=1000;
```

This statement is equivalent to:

```c
stu.id = stu.id + 1000;
```

If the original ID is `101`, the function's local copy becomes:

```text
101 + 1000 = 1101
```

The next statement prints the modified ID:

```c
printf("    New ID: %d\n",stu.id);
```

However, the original structure is not changed.

Why?

Because `stu` is a copy of the original structure.

The modification affects only the local parameter.

### Example

Suppose we call:

```c
DisplayStudentInformation(stu1);
```

The original structure is:

```text
stu1.id = 101
```

Inside the function:

```text
stu.id = 101
stu.id = 101 + 1000
stu.id = 1101
```

After the function finishes:

```text
stu1.id = 101
```

The original ID remains `101`.

This is the main characteristic of passing a structure by value.

---

## 10. Calling the Second Function – Passing a Pointer

```c
printf("Using Second Function (By Reference):\n");

DisplayStudentInformation2(&stu1);
DisplayStudentInformation2(&stu2);
DisplayStudentInformation2(&stu1);
```

This time, notice the ampersand (`&`) before each structure variable.

For example:

```c
DisplayStudentInformation2(&stu1);
```

The `&` operator returns the memory address of the variable.

Therefore:

```c
&stu1
```

means the address of the structure `stu1`.

The function receives that address through a pointer.

This allows it to access the original structure instead of creating a separate structure copy.

**Important C language concept:** C always passes function arguments by value. In this example, the pointer itself is passed by value, but it contains the address of the original structure. This allows the function to modify the original structure through that address. This technique is commonly called passing by reference, although technically C does not have true reference parameters like C++.

---

## 11. Understanding the Second Function

```c
void DisplayStudentInformation2(Student *pstu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n",pstu->id);
    printf("First Name: %s\n",pstu->firstName);
    printf(" Last Name: %s\n",pstu->lastName);
    printf("       GPA: %.2f\n",pstu->gpa);

    pstu->id+=1000;

    printf("    New ID: %d\n",pstu->id);
    printf("\n");
}
```

### Function parameter

```c
Student *pstu
```

This declares a pointer named `pstu` that points to a `Student` structure.

Unlike the first function, this function does not receive a complete structure copy.

It receives the address of an existing structure.

### Understanding the arrow operator

In the first function, we accessed structure members using:

```c
stu.id
```

In the second function, we use:

```c
pstu->id
```

Why?

Because `pstu` is a pointer to a structure.

The arrow operator (`->`) is used to access a structure member through a pointer.

The following expressions are equivalent:

```c
pstu->id
```

and:

```c
(*pstu).id
```

The parentheses are necessary in the second expression because the dot operator has higher precedence than the dereference operator.

### Displaying student information

```c
printf("        ID: %d\n",pstu->id);
printf("First Name: %s\n",pstu->firstName);
printf(" Last Name: %s\n",pstu->lastName);
printf("       GPA: %.2f\n",pstu->gpa);
```

These statements access the members of the original structure through its address.

### Modifying the original ID

```c
pstu->id+=1000;
```

This statement increases the ID of the original structure by 1000.

For example, if:

```c
stu1.id = 101;
```

After calling:

```c
DisplayStudentInformation2(&stu1);
```

The original structure becomes:

```c
stu1.id = 1101;
```

Unlike the first function, this modification remains after the function finishes.

---

## 12. Understanding the Difference Between `.` and `->`

These two operators are important when working with structures.

| Operator | Purpose | Example |
|---|---|---|
| `.` | Access a member directly through a structure variable | `stu1.id` |
| `->` | Access a member through a structure pointer | `pstu->id` |

Consider the following example:

```c
Student stu1;
Student *pstu = &stu1;
```

Accessing the ID directly:

```c
stu1.id = 101;
```

Accessing the same ID through a pointer:

```c
pstu->id = 101;
```

Both statements modify the same structure member.

The following are also equivalent:

```c
pstu->id = 101;
```

```c
(*pstu).id = 101;
```

---

## 13. Understanding the Program Execution Step by Step

This is the most important part of the example.

Initially, the two structures contain:

| Structure | ID | First Name | Last Name | GPA |
|---|---:|---|---|---:|
| `stu1` | 101 | Ali | Alavi | 18 |
| `stu2` | 102 | Reza | Razavi | 19 |

### Part A: First function – By Value

The program executes:

```c
DisplayStudentInformation(stu1);
DisplayStudentInformation(stu2);
DisplayStudentInformation(stu1);
```

Each function call receives a separate copy.

The IDs displayed by the function are:

| Function call | Original ID | Local ID after adding 1000 |
|---|---:|---:|
| First call with `stu1` | 101 | 1101 |
| Second call with `stu2` | 102 | 1102 |
| Third call with `stu1` | 101 | 1101 |

Notice that the third call still starts with ID `101`.

The first call did not change the original `stu1`.

After all three calls, the original structures remain:

```text
stu1.id = 101
stu2.id = 102
```

### Part B: Second function – By Pointer

Next, the program executes:

```c
DisplayStudentInformation2(&stu1);
DisplayStudentInformation2(&stu2);
DisplayStudentInformation2(&stu1);
```

This time, each function call receives the address of the original structure.

Let's follow the changes.

**First call:**

```c
DisplayStudentInformation2(&stu1);
```

Initially:

```text
stu1.id = 101
```

After adding 1000:

```text
stu1.id = 1101
```

**Second call:**

```c
DisplayStudentInformation2(&stu2);
```

Initially:

```text
stu2.id = 102
```

After adding 1000:

```text
stu2.id = 1102
```

**Third call:**

```c
DisplayStudentInformation2(&stu1);
```

Remember that `stu1.id` is already `1101`.

Therefore:

```text
stu1.id = 1101 + 1000
stu1.id = 2101
```

At the end of the program:

```text
stu1.id = 2101
stu2.id = 1102
```

This clearly demonstrates the difference between passing by value and passing a pointer.

---

## 14. Expected Output

```text
Using First Function (By Value):
Student Information:
        ID: 101
First Name: Ali
 Last Name: Alavi
       GPA: 18.00
    New ID: 1101

Student Information:
        ID: 102
First Name: Reza
 Last Name: Razavi
       GPA: 19.00
    New ID: 1102

Student Information:
        ID: 101
First Name: Ali
 Last Name: Alavi
       GPA: 18.00
    New ID: 1101

------------------------------------------------
Using Second Function (By Reference):
Student Information:
        ID: 101
First Name: Ali
 Last Name: Alavi
       GPA: 18.00
    New ID: 1101

Student Information:
        ID: 102
First Name: Reza
 Last Name: Razavi
       GPA: 19.00
    New ID: 1102

Student Information:
        ID: 1101
First Name: Ali
 Last Name: Alavi
       GPA: 18.00
    New ID: 2101
```

The important observation is the last function call.

The second function displays `1101` as the starting ID because the previous pointer-based call modified the original `stu1`.

---

## 15. Memory Concept: Structure Copy vs Structure Pointer

A simplified illustration helps explain the difference.

### Passing by value

```c
DisplayStudentInformation(stu1);
```

Conceptually:

```text
Original structure                  Function parameter
+------------------+                +------------------+
| ID: 101          |  ------------> | ID: 101          |
| First: Ali       |     Copy       | First: Ali       |
| Last: Alavi      |                | Last: Alavi      |
| GPA: 18.0        |                | GPA: 18.0        |
+------------------+                +------------------+
```

The function modifies its own structure object.

Changing the local ID does not change the original ID.

### Passing a pointer

```c
DisplayStudentInformation2(&stu1);
```

Conceptually:

```text
Original structure
+------------------+
| ID: 101          |
| First: Ali       |
| Last: Alavi      |
| GPA: 18.0        |
+------------------+
         ^
         |
         | Address
         |
+------------------+
| pstu             |
| Pointer to stu1  |
+------------------+
```

The pointer allows the function to access the original structure.

When the function executes:

```c
pstu->id += 1000;
```

It modifies the original `stu1.id`.

**Note:** A structure copy copies the pointer values in `firstName` and `lastName`, not the characters they point to. In this example, those pointers refer to string literals, and neither function modifies the strings.

---

## 16. Why Pass a Structure Using a Pointer?

Passing a structure by value is useful when a function needs an independent copy.

However, passing a structure by pointer has several advantages:

1. It avoids copying the entire structure.
2. It allows a function to modify the original structure.
3. It is often more efficient for large structures.
4. It allows multiple functions to work with the same structure object.
5. It is useful when working with arrays, linked lists, and other data structures.

For example, imagine a structure containing:

```c
typedef struct
{
    int id;
    char name[100];
    float grades[1000];
    int numberOfGrades;
} Student;
```

Copying this entire structure every time a function is called can be unnecessary.

Passing a pointer is generally more efficient when the function only needs to access or modify the existing object.

---

## 17. Improving the Program: Use `const` for Read-Only Functions

There is one important improvement we can make.

Both functions display student information, but they also increase the ID.

If a function should only display information, it should not modify the original data.

A better design separates displaying information from modifying information.

For example:

```c
void DisplayStudent(const Student *pstu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n", pstu->id);
    printf("First Name: %s\n", pstu->firstName);
    printf(" Last Name: %s\n", pstu->lastName);
    printf("       GPA: %.2f\n", pstu->gpa);
    printf("\n");
}
```

Here:

```c
const Student *pstu
```

means that the function cannot modify the structure members through this pointer.

For example, this is not allowed:

```c
pstu->id += 1000;
```

The compiler will report an error.

If we want to modify the ID, we can create another function:

```c
void IncreaseStudentID(Student *pstu)
{
    pstu->id += 1000;
}
```

Now the responsibilities are separated:

- `DisplayStudent()` displays information.
- `IncreaseStudentID()` modifies the student's ID.

This is a cleaner programming design.

---

## 18. A Complete Improved Example

```c
#include <stdio.h>

typedef struct
{
    int id;
    char *firstName;
    char *lastName;
    float gpa;
} Student;

void DisplayStudent(const Student *pstu);
void IncreaseStudentID(Student *pstu);

int main(void)
{
    Student stu1 = {101, "Ali", "Alavi", 18.0f};
    Student stu2 = {102, "Reza", "Razavi", 19.0f};

    printf("Initial student information:\n\n");

    DisplayStudent(&stu1);
    DisplayStudent(&stu2);

    printf("Increasing student IDs...\n\n");

    IncreaseStudentID(&stu1);
    IncreaseStudentID(&stu2);

    printf("Updated student information:\n\n");

    DisplayStudent(&stu1);
    DisplayStudent(&stu2);

    return 0;
}

void DisplayStudent(const Student *pstu)
{
    printf("Student Information:\n");
    printf("        ID: %d\n", pstu->id);
    printf("First Name: %s\n", pstu->firstName);
    printf(" Last Name: %s\n", pstu->lastName);
    printf("       GPA: %.2f\n", pstu->gpa);
    printf("\n");
}

void IncreaseStudentID(Student *pstu)
{
    pstu->id += 1000;
}
```

This version is easier to maintain because displaying information and modifying information are handled by separate functions.

It also uses `const` to protect the structure from accidental modification inside the display function.

---

## 19. Important Technical Notes

### 1. C does not have true pass-by-reference parameters

C always passes arguments by value.

When passing a pointer, the pointer value (the address) is copied into the function parameter. Both the original pointer and the copied pointer refer to the same structure object.

### 2. Structure copying and pointers

When a structure containing pointers is copied, the pointer addresses are copied too.

This is a shallow copy, not a deep copy.

For example:

```c
Student copy = stu1;
```

Both structures will contain pointers to the same name strings.

### 3. Check pointers before using them

The second function expects a valid pointer.

A safer implementation can check for `NULL`:

```c
void DisplayStudentInformation2(Student *pstu)
{
    if (pstu == NULL)
    {
        printf("Invalid student pointer!\n");
        return;
    }

    printf("ID: %d\n", pstu->id);
}
```

### 4. Use `float` values carefully

The structure defines:

```c
float gpa;
```

You can initialize it with:

```c
stu1.gpa = 18.0f;
```

The `f` suffix indicates a `float` literal.

### 5. Structure parameters can be large

Passing large structures by value can require additional copying.

For large structures, a pointer is often a better choice.

---

## 20. Compilation and Execution

You can compile this program using GCC:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o student
```

Run on Linux:

```bash
./student
```

Run on Windows:

```powershell
.\student.exe
```

---

## 21. Practice Exercises

Try the following exercises to improve your understanding.

### Exercise 1 – Add a new student

Create a third structure variable:

```c
Student stu3 = {103, "Sara", "Ahmadi", 17.5f};
```

Display its information using both functions.

### Exercise 2 – Modify the GPA

Create a function that receives a pointer to a student and increases the GPA by `1.0`.

```c
void IncreaseGPA(Student *pstu);
```

Test whether the original structure changes.

### Exercise 3 – Compare two students

Write a function that receives two student pointers and determines which student has the higher GPA.

```c
void CompareStudents(const Student *s1, const Student *s2);
```

### Exercise 4 – Use an array of structures

Create an array containing five students:

```c
Student students[5];
```

Use a loop to display all student information.

### Exercise 5 – Calculate the average GPA

Write a function that receives an array of students and calculates the average GPA.

### Exercise 6 – Test pass by value

Create a function that receives a structure by value and changes all its members.

After calling the function, print the original structure and observe whether it has changed.

---

## 22. Learning Outcomes

After studying this example, you should understand:

- What a structure is in C.
- How to define a structure using `typedef`.
- How to declare and initialize structure variables.
- How to access structure members using the dot operator.
- How to pass a structure to a function by value.
- How to pass a structure pointer to a function.
- How to access members using the arrow operator.
- Why pointer-based functions can modify original structures.
- Why C technically uses pass-by-value for all function arguments.
- How to use `const` with structure pointers.
- The difference between shallow and deep copying.
