# 14-Quadratic Equation Solver in C

## 1. Introduction

This project is a simple **Quadratic Equation Solver** written in the C programming language.

It receives three coefficients (`a`, `b`, and `c`) from the user and solves the equation:

\[
ax^2 + bx + c = 0
\]

The program can identify and calculate:

- One real root for a first-order (linear) equation.
- One repeated real root.
- Two distinct real roots.
- Two imaginary roots.
- Two complex roots.
- An invalid equation when both `a` and `b` are zero.

This project introduces mathematical problem-solving with C, functions, conditional statements, floating-point calculations, and the `math.h` library.

## 2. Source Code

```c
#include <stdio.h>
#include <math.h>

void SolveQuad();

int main()
{
    SolveQuad();
    return 0;
}

void SolveQuad()
{
    float a, b, c;

    printf("We are going to solve a quadratic equation in the form of:\n\n");
    printf("ax%c + bx + c = 0\n\n", 0xFD);
    printf("Please enter coefficients of this equation.\n");
    printf("a = ");
    scanf("%f", &a);
    printf("b = ");
    scanf("%f", &b);
    printf("c = ");
    scanf("%f", &c);
    printf("\n");

    float x1, x2;

    if(a == 0)
    {
        if(b == 0)
        {
            printf("Error: The equation can not be solved.\n");
        }
        else
        {
            x1 = -c / b;
            printf("This equation if of the first-order and has a real root:\n");
            printf("x = %f\n", x1);
        }
    }
    else
    {
        float delta = b*b - 4*a*c;

        if(delta == 0)
        {
            printf("This equation has a real double root:\n");
            x1 = -b / (2*a);
            printf("x1 = x2 = %f\n", x1);
        }
        else if(delta > 0)
        {
            printf("This equation has two distinct real roots:\n");
            x1 = (-b + sqrt(delta)) / (2*a);
            x2 = (-b - sqrt(delta)) / (2*a);
            printf("x1 = %f\n", x1);
            printf("x2 = %f\n", x2);
        }
        else
        {
            if(b == 0)
            {
                printf("This equation has two imaginary roots.\n");
                printf("x1 =  %fi\n", sqrt(-delta) / (2*a));
                printf("x2 = -%fi\n", sqrt(-delta) / (2*a));
            }
            else
            {
                printf("This equation has two complex roots.\n");
                printf("x1 =  %f + %fi\n", -b/(2*a), sqrt(-delta)/(2*a));
                printf("x2 =  %f - %fi\n", -b/(2*a), sqrt(-delta)/(2*a));
            }
        }
    }

    printf("\n-----------------------------------\n");
}
```

> **Note:** The original code uses `0xFD` to print the superscript character in `ax²`. Its appearance depends on the terminal's character encoding. For more portable output, you can replace that line with:
>
> ```c
> printf("ax^2 + bx + c = 0\n\n");
> ```

## 3. Mathematical Background

A quadratic equation has the general form:

\[
ax^2 + bx + c = 0
\]

Where:

- `a` is the coefficient of \(x^2\).
- `b` is the coefficient of \(x\).
- `c` is the constant term.
- `a` must not be zero for the equation to be quadratic.

The discriminant, usually represented by the Greek letter delta (\(\Delta\)), determines the type of roots.

\[
\Delta = b^2 - 4ac
\]

<LearningViz type_id="QUADRATIC_FORMULA" initial_values={{"a":1,"b":-5,"c":6}} />

### 3.1. When the Discriminant Is Zero

If:

\[
\Delta = 0
\]

The equation has one repeated real root:

\[
x_1 = x_2 = \frac{-b}{2a}
\]

Example:

\[
x^2 - 4x + 4 = 0
\]

The root is:

\[
x_1 = x_2 = 2
\]

### 3.2. When the Discriminant Is Positive

If:

\[
\Delta > 0
\]

The equation has two distinct real roots:

\[
x_1 = \frac{-b+\sqrt{\Delta}}{2a}
\]

\[
x_2 = \frac{-b-\sqrt{\Delta}}{2a}
\]

Example:

\[
x^2 - 5x + 6 = 0
\]

The roots are:

\[
x_1 = 3,\qquad x_2 = 2
\]

### 3.3. When the Discriminant Is Negative

If:

\[
\Delta < 0
\]

The equation has two complex conjugate roots.

\[
x_1 = \frac{-b}{2a} + \frac{\sqrt{-\Delta}}{2a}i
\]

\[
x_2 = \frac{-b}{2a} - \frac{\sqrt{-\Delta}}{2a}i
\]

Where \(i\) is the imaginary unit:

\[
i^2 = -1
\]

Example:

\[
x^2 + 4 = 0
\]

The roots are:

\[
x_1 = 2i,\qquad x_2 = -2i
\]

### 3.4. When a Is Zero

If:

\[
a = 0
\]

The equation is no longer quadratic. It becomes:

\[
bx+c=0
\]

If \(b\neq0\), its root is:

\[
x = \frac{-c}{b}
\]

If both `a` and `b` are zero, the program reports an error. More precisely, if `c` is also zero, every real number is a solution; if `c` is nonzero, there is no solution.

## 4. Understanding the Code

### 4.1. Header Files

```c
#include <stdio.h>
#include <math.h>
```

- `stdio.h`: Provides input and output functions such as `printf()` and `scanf()`.
- `math.h`: Provides mathematical functions such as `sqrt()`.

### 4.2. Function Prototype

```c
void SolveQuad();
```

This declares a function named `SolveQuad`.

- `void` means the function does not return a value.
- `SolveQuad` is the function name.
- `()` indicates that the function has no parameters in this declaration.

A clearer modern C prototype would be:

```c
void SolveQuad(void);
```

### 4.3. Main Function

```c
int main()
{
    SolveQuad();
    return 0;
}
```

The program starts from `main()`.

It calls `SolveQuad()` to perform the calculations and then returns `0` to indicate successful execution.

### 4.4. Reading the Coefficients

```c
float a, b, c;

scanf("%f", &a);
scanf("%f", &b);
scanf("%f", &c);
```

Three floating-point variables store the equation coefficients.

The `%f` format specifier is used to read a `float` value with `scanf()`.

The `&` operator provides the memory address of each variable so that `scanf()` can store the entered value there.

### 4.5. Checking Whether the Equation Is Linear

```c
if(a == 0)
{
    if(b == 0)
    {
        printf("Error: The equation can not be solved.\n");
    }
    else
    {
        x1 = -c / b;
    }
}
```

This section checks whether the coefficient of \(x^2\) is zero.

If `a` is zero, the equation becomes linear. If `b` is also zero, the program reports an error.

### 4.6. Calculating the Discriminant

```c
float delta = b*b - 4*a*c;
```

This calculates the discriminant:

\[
\Delta = b^2 - 4ac
\]

The result determines which root-calculation branch should execute.

### 4.7. Calculating the Roots

For a positive discriminant:

```c
x1 = (-b + sqrt(delta)) / (2*a);
x2 = (-b - sqrt(delta)) / (2*a);
```

The `sqrt()` function calculates the square root of the discriminant.

For a negative discriminant, the program calculates the real and imaginary parts separately using `sqrt(-delta)`.

## 5. Example Input and Output

### Example 1: Two Distinct Real Roots

Input:

```text
a = 1
b = -5
c = 6
```

Output:

```text
This equation has two distinct real roots:
x1 = 3.000000
x2 = 2.000000
```

### Example 2: One Repeated Root

Input:

```text
a = 1
b = -4
c = 4
```

Output:

```text
This equation has a real double root:
x1 = x2 = 2.000000
```

### Example 3: Two Imaginary Roots

Input:

```text
a = 1
b = 0
c = 4
```

Output:

```text
This equation has two imaginary roots.
x1 = 2.000000i
x2 = -2.000000i
```

### Example 4: Two Complex Roots

Input:

```text
a = 1
b = 2
c = 5
```

Output:

```text
This equation has two complex roots.
x1 = -1.000000 + 2.000000i
x2 = -1.000000 - 2.000000i
```

### Example 5: First-Order Equation

Input:

```text
a = 0
b = 2
c = -6
```

Output:

```text
This equation if of the first-order and has a real root:
x = 3.000000
```

## 6. Important C Programming Concepts

By studying this project, you will learn:

| Concept | Description |
|---|---|
| `float` | Stores floating-point numbers |
| `scanf()` | Reads input from the user |
| `printf()` | Displays output |
| Functions | Divides a program into reusable parts |
| Function prototype | Declares a function before its definition |
| `if / else` | Implements conditional logic |
| `sqrt()` | Calculates square roots |
| `math.h` | Provides mathematical functions |
| Arithmetic operators | Performs mathematical calculations |
| Nested conditions | Handles multiple decision levels |

## 7. Compilation and Execution

If you use GCC, compile the program with:

```bash
gcc main.c -o quadratic -lm
```

Run it on Linux:

```bash
./quadratic
```

On Windows:

```powershell
gcc main.c -o quadratic.exe -lm
.\quadratic.exe
```

The `-lm` option links the mathematical library required by `sqrt()` on typical GCC environments.

## 8. Important Notes and Possible Improvements

This project is suitable for learning, but there are some improvements worth considering:

1. **Check input validity:** The program should verify whether each `scanf()` call successfully reads a number.
2. **Floating-point comparison:** Comparing floating-point values directly with `== 0` can be unreliable because of rounding errors. A tolerance such as `fabs(delta) < EPSILON` can be used when appropriate.
3. **Handle special cases accurately:** When `a == 0` and `b == 0`, the result depends on `c`. The equation may have infinitely many solutions or no solution.
4. **Use `double`:** For more precise calculations, consider replacing `float` with `double` and using `%lf` with `scanf()`.
5. **Improve complex-number output:** The sign of the imaginary component should be handled separately, especially when `a` is negative.
6. **Use a more stable quadratic formula:** For equations with coefficients of very different magnitudes, the standard formula can lose numerical precision. A numerically stable implementation can improve reliability.

## 9. Practice Exercises

Try these exercises to improve your understanding:

1. Modify the program to use `double` instead of `float`.
2. Add input validation to all three `scanf()` calls.
3. Improve the handling of the case where `a = 0` and `b = 0`.
4. Display the discriminant value before calculating the roots.
5. Ask the user whether they want to solve another equation.
6. Separate the calculation into smaller functions:
   - `CalculateDelta()`
   - `CalculateRealRoots()`
   - `CalculateComplexRoots()`
7. Implement a more numerically stable quadratic formula.

## 10. Learning Objective

The main objective of this project is to understand how mathematical equations can be translated into C code.

It combines mathematical formulas, functions, user input, conditional statements, and the standard mathematical library into one practical program.

It is a useful exercise for learning how to design a program that handles multiple possible outcomes based on mathematical conditions.