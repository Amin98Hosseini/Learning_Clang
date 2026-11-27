# 39-Complex Numbers and Mathematical Operations Using Structures in C

## 1. Introduction

In mathematics, a complex number is a number that consists of two parts:

- A real part.
- An imaginary part.

A complex number is generally represented as:

\[
z = a + bi
\]

Where:

- \(a\) is the real part.
- \(b\) is the imaginary part.
- \(i\) is the imaginary unit.
- \(i^2 = -1\).

For example:

\[
z = 3 + 4i
\]

In this example:

- Real part = 3
- Imaginary part = 4

C does not require us to use a custom structure to represent complex numbers, but defining our own structure is an excellent way to understand structures, functions, and mathematical operations.

This program defines a `Complex` structure and implements the following operations:

1. Displaying a complex number.
2. Calculating the complex conjugate.
3. Calculating the absolute value (magnitude).
4. Adding two complex numbers.
5. Subtracting two complex numbers.
6. Multiplying two complex numbers.
7. Dividing two complex numbers.

It also demonstrates how a function can receive a structure as an argument and return a structure as its result.

---

## 2. Complete Source Code

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct
{
    float real;
    float imag;
} Complex;

void DispComplex(Complex z);
Complex Conj(Complex z);
float Abs(Complex z);
Complex Add(Complex z1, Complex z2);
Complex Subtract(Complex z1, Complex z2);
Complex Product(Complex z1, Complex z2);
Complex Division(Complex z1, Complex z2);

int main()
{

    Complex z1={3,4};
    printf("z1 = ");
    DispComplex(z1);
    printf("\n\n");

    Complex z2={1,-5};
    printf("z2 = ");
    DispComplex(z2);
    printf("\n\n");

    Complex z3={0,0};
    printf("z3 = ");
    DispComplex(z3);
    printf("\n\n");

    Complex z4={-1,0};
    printf("z4 = ");
    DispComplex(z4);
    printf("\n\n");

    Complex z5={0,7};
    printf("z5 = ");
    DispComplex(z5);
    printf("\n\n");

    printf("Conj(z1) = ");
    DispComplex(Conj(z1));
    printf("\n\n");

    printf("Abs(z1) = %f\n\n",Abs(z1));

    printf("z1 + z2 = ");
    DispComplex(Add(z1,z2));
    printf("\n\n");

    printf("z1 - z2 = ");
    DispComplex(Subtract(z1,z2));
    printf("\n\n");

    printf("z1 * z2 = ");
    DispComplex(Product(z1,z2));
    printf("\n\n");

    printf("z1 / z2 = ");
    DispComplex(Division(z1,z2));
    printf("\n\n");

    printf("z1 / z1 = ");
    DispComplex(Division(z1,z1));
    printf("\n\n");

    return 0;
}

void DispComplex(Complex z)
{
    float x=z.real;
    float y=z.imag;

    if(x==0)
    {
        if(y==0)
            printf("0");
        else
            printf("%fi",y);
    }
    else
    {
        if(y==0)
            printf("%f",x);
        else
        {
            if(y>0)
                printf("%f + %fi",x,y);
            else
                printf("%f - %fi",x,-y);
        }
    }
}

Complex Conj(Complex z)
{
    Complex zc={z.real, -z.imag};
    return zc;
}

float Abs(Complex z)
{
    return sqrt(z.real*z.real+z.imag*z.imag);
}

Complex Add(Complex z1, Complex z2)
{
    Complex z={z1.real + z2.real,z1.imag + z2.imag};
    return z;
}

Complex Subtract(Complex z1, Complex z2)
{
    Complex z={z1.real - z2.real,z1.imag - z2.imag};
    return z;
}

Complex Product(Complex z1, Complex z2)
{
    Complex z;
    z.real = z1.real*z2.real-z1.imag*z2.imag;
    z.imag = z1.real*z2.imag+z1.imag*z2.real;
    return z;
}

Complex Division(Complex z1, Complex z2)
{
    Complex z;
    float den = z2.real*z2.real + z2.imag*z2.imag;
    z.real = (z1.real*z2.real+z1.imag*z2.imag)/den;
    z.imag = (z1.imag*z2.real-z1.real*z2.imag)/den;
    return z;
}
```

---

## 3. Header Files

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
```

The program includes three standard C header files.

### `stdio.h`

This header provides standard input and output functions.

The program uses:

- `printf()` – Displays text and numerical results.

### `stdlib.h`

This header provides general-purpose functions, including memory allocation, conversions, and sorting.

However, the current program does not use any function from `stdlib.h`.

Therefore, this header can be removed.

### `math.h`

This header provides mathematical functions.

The program uses:

```c
sqrt()
```

The `sqrt()` function calculates the square root of a number.

It is used when calculating the magnitude of a complex number.

The simplified header section is:

```c
#include <stdio.h>
#include <math.h>
```

---

## 4. Defining the Complex Structure

```c
typedef struct
{
    float real;
    float imag;
} Complex;
```

This structure is the foundation of the program.

It represents a complex number using two floating-point variables.

### Understanding the members

| Member | Data type | Description |
|---|---|---|
| `real` | `float` | Real component |
| `imag` | `float` | Imaginary component |

For example, consider:

\[
z = 3 + 4i
\]

We can represent this number using:

```c
Complex z1 = {3, 4};
```

The structure contains:

```text
z1.real = 3
z1.imag = 4
```

The first value is assigned to `real`, and the second value is assigned to `imag`.

### Why use `typedef`?

The `typedef` keyword creates an alias for a data type.

Without `typedef`, we could write:

```c
struct Complex
{
    float real;
    float imag;
};
```

To declare a variable, we would need:

```c
struct Complex z1;
```

With `typedef`, we can simply write:

```c
Complex z1;
```

This makes the code shorter and easier to understand.

---

## 5. Understanding Complex Numbers

A complex number has the general form:

\[
z = a + bi
\]

Where:

- \(a\) is the real component.
- \(b\) is the imaginary component.
- \(i\) is the imaginary unit.

The imaginary unit has the following property:

\[
i^2 = -1
\]

For example:

\[
z_1 = 3 + 4i
\]

\[
z_2 = 1 - 5i
\]

Their corresponding C structures are:

```c
Complex z1 = {3, 4};
Complex z2 = {1, -5};
```

The program also defines three additional complex numbers:

```c
Complex z3 = {0, 0};
Complex z4 = {-1, 0};
Complex z5 = {0, 7};
```

These represent:

| Variable | Mathematical representation |
|---|---|
| `z1` | \(3 + 4i\) |
| `z2` | \(1 - 5i\) |
| `z3` | \(0\) |
| `z4` | \(-1\) |
| `z5` | \(7i\) |

These examples are useful because they demonstrate different combinations of real and imaginary components.

---

## 6. Function Prototypes

```c
void DispComplex(Complex z);
Complex Conj(Complex z);
float Abs(Complex z);
Complex Add(Complex z1, Complex z2);
Complex Subtract(Complex z1, Complex z2);
Complex Product(Complex z1, Complex z2);
Complex Division(Complex z1, Complex z2);
```

These declarations inform the compiler about the functions before `main()`.

Let's examine each function.

| Function | Return type | Purpose |
|---|---|---|
| `DispComplex()` | `void` | Displays a complex number |
| `Conj()` | `Complex` | Calculates the conjugate |
| `Abs()` | `float` | Calculates the magnitude |
| `Add()` | `Complex` | Adds two complex numbers |
| `Subtract()` | `Complex` | Subtracts two complex numbers |
| `Product()` | `Complex` | Multiplies two complex numbers |
| `Division()` | `Complex` | Divides two complex numbers |

Notice that most functions return a `Complex` structure.

This is possible because C allows functions to return structures by value.

For example:

```c
Complex Add(Complex z1, Complex z2);
```

This function receives two complex numbers and returns a new complex number.

---

## 7. Creating Complex Number Variables

Inside `main()`, the program creates five complex numbers.

### First complex number

```c
Complex z1={3,4};
```

This represents:

\[
z_1 = 3 + 4i
\]

### Second complex number

```c
Complex z2={1,-5};
```

This represents:

\[
z_2 = 1 - 5i
\]

### Third complex number

```c
Complex z3={0,0};
```

This represents:

\[
z_3 = 0 + 0i = 0
\]

It is the zero complex number.

### Fourth complex number

```c
Complex z4={-1,0};
```

This represents:

\[
z_4 = -1 + 0i = -1
\]

It is a purely real number.

### Fifth complex number

```c
Complex z5={0,7};
```

This represents:

\[
z_5 = 0 + 7i = 7i
\]

It is a purely imaginary number.

---

## 8. Displaying Complex Numbers

The program uses:

```c
DispComplex(z1);
```

The function is defined as:

```c
void DispComplex(Complex z)
{
    float x=z.real;
    float y=z.imag;

    if(x==0)
    {
        if(y==0)
            printf("0");
        else
            printf("%fi",y);
    }
    else
    {
        if(y==0)
            printf("%f",x);
        else
        {
            if(y>0)
                printf("%f + %fi",x,y);
            else
                printf("%f - %fi",x,-y);
        }
    }
}
```

This function displays a complex number in a readable mathematical format.

The general representation is:

\[
z = x + yi
\]

Where:

```c
float x=z.real;
float y=z.imag;
```

The local variable `x` stores the real part, and `y` stores the imaginary part.

The function then checks four different cases.

### Case 1: Both real and imaginary parts are zero

```c
if(x==0)
{
    if(y==0)
        printf("0");
}
```

If:

\[
x=0,\quad y=0
\]

The complex number is:

\[
z=0
\]

The output is:

```text
0
```

### Case 2: Real part is zero

```c
else
    printf("%fi",y);
```

When the real component is zero but the imaginary component is not zero, the number is purely imaginary.

For example:

\[
z=7i
\]

The output is:

```text
7.000000i
```

### Case 3: Imaginary part is zero

```c
if(y==0)
    printf("%f",x);
```

When the imaginary component is zero, the number is purely real.

For example:

\[
z=-1
\]

The output is:

```text
-1.000000
```

### Case 4: Both components are nonzero

```c
if(y>0)
    printf("%f + %fi",x,y);
else
    printf("%f - %fi",x,-y);
```

If the imaginary component is positive, the function prints a plus sign.

For example:

\[
z=3+4i
\]

Output:

```text
3.000000 + 4.000000i
```

If the imaginary component is negative, the function prints a minus sign.

For example:

\[
z=1-5i
\]

Output:

```text
1.000000 - 5.000000i
```

Notice the use of `-y` in the negative case.

If `y` is `-5`, then `-y` becomes `5`, allowing the function to display:

```text
1.000000 - 5.000000i
```

instead of:

```text
1.000000 + -5.000000i
```

### Important floating-point note

The function uses comparisons such as:

```c
if(x==0)
```

Exact floating-point comparisons can be unreliable when values result from calculations because of rounding errors.

For a more general implementation, we can use a small tolerance:

```c
#define EPSILON 0.000001f

if (fabsf(x) < EPSILON)
```

However, the original comparisons work for the simple values used in this program.

---

## 9. Complex Conjugate

The program calculates the conjugate using:

```c
Conj(z1);
```

The function is:

```c
Complex Conj(Complex z)
{
    Complex zc={z.real, -z.imag};
    return zc;
}
```

### What is a complex conjugate?

The complex conjugate of:

\[
z=a+bi
\]

is:

\[
\overline{z}=a-bi
\]

In other words:

- The real component remains unchanged.
- The imaginary component changes its sign.

For example:

\[
z=3+4i
\]

Its conjugate is:

\[
\overline{z}=3-4i
\]

### Understanding the code

```c
Complex zc={z.real, -z.imag};
```

This creates a new complex structure.

Its real component is copied directly:

```c
z.real
```

Its imaginary component is negated:

```c
-z.imag
```

Finally:

```c
return zc;
```

The function returns the new structure.

### Important property

The product of a complex number and its conjugate is always a nonnegative real number:

\[
z\overline{z}=a^2+b^2
\]

For example:

\[
(3+4i)(3-4i)=9+16=25
\]

This property is useful when calculating complex magnitudes and divisions.

---

## 10. Absolute Value or Magnitude of a Complex Number

The program uses:

```c
Abs(z1);
```

The function is:

```c
float Abs(Complex z)
{
    return sqrt(z.real*z.real+z.imag*z.imag);
}
```

### What is the magnitude?

The magnitude of a complex number represents its distance from the origin in the complex plane.

For:

\[
z=a+bi
\]

The magnitude is:

\[
|z|=\sqrt{a^2+b^2}
\]

This is based on the Pythagorean theorem.

### Example

Consider:

\[
z_1=3+4i
\]

Its magnitude is:

\[
|z_1|=\sqrt{3^2+4^2}
\]

\[
|z_1|=\sqrt{9+16}
\]

\[
|z_1|=\sqrt{25}
\]

\[
|z_1|=5
\]

### Understanding the code

```c
sqrt(z.real*z.real+z.imag*z.imag)
```

The expression calculates:

1. The square of the real component.
2. The square of the imaginary component.
3. The sum of both squares.
4. The square root of the result.

The `sqrt()` function is provided by `math.h`.

The function returns a `float` because the magnitude is a real number.

---

## 11. Addition of Complex Numbers

The program performs addition using:

```c
Add(z1,z2);
```

The function is:

```c
Complex Add(Complex z1, Complex z2)
{
    Complex z={z1.real + z2.real,z1.imag + z2.imag};
    return z;
}
```

### Mathematical formula

Consider two complex numbers:

\[
z_1=a+bi
\]

\[
z_2=c+di
\]

Their sum is:

\[
z_1+z_2=(a+c)+(b+d)i
\]

This means:

- Add the real components.
- Add the imaginary components.

### Example

Given:

\[
z_1=3+4i
\]

\[
z_2=1-5i
\]

The addition is:

\[
z_1+z_2=(3+1)+(4-5)i
\]

\[
z_1+z_2=4-i
\]

### Understanding the code

```c
Complex z={z1.real + z2.real,z1.imag + z2.imag};
```

The new structure receives:

```text
real = 3 + 1 = 4
imag = 4 + (-5) = -1
```

Finally:

```c
return z;
```

The function returns:

\[
4-i
\]

---

## 12. Subtraction of Complex Numbers

The program performs subtraction using:

```c
Subtract(z1,z2);
```

The function is:

```c
Complex Subtract(Complex z1, Complex z2)
{
    Complex z={z1.real - z2.real,z1.imag - z2.imag};
    return z;
}
```

### Mathematical formula

For two complex numbers:

\[
z_1=a+bi
\]

\[
z_2=c+di
\]

Their difference is:

\[
z_1-z_2=(a-c)+(b-d)i
\]

This means:

- Subtract the real components.
- Subtract the imaginary components.

### Example

Given:

\[
z_1=3+4i
\]

\[
z_2=1-5i
\]

We calculate:

\[
z_1-z_2=(3-1)+(4-(-5))i
\]

\[
z_1-z_2=2+9i
\]

### Understanding the code

```c
Complex z={z1.real - z2.real,z1.imag - z2.imag};
```

The result is:

```text
real = 3 - 1 = 2
imag = 4 - (-5) = 9
```

The function returns:

\[
2+9i
\]

---

## 13. Multiplication of Complex Numbers

The program performs multiplication using:

```c
Product(z1,z2);
```

The function is:

```c
Complex Product(Complex z1, Complex z2)
{
    Complex z;

    z.real = z1.real*z2.real-z1.imag*z2.imag;
    z.imag = z1.real*z2.imag+z1.imag*z2.real;

    return z;
}
```

### Mathematical formula

Consider:

\[
z_1=a+bi
\]

\[
z_2=c+di
\]

Their product is:

\[
z_1z_2=(a+bi)(c+di)
\]

Using the distributive property:

\[
z_1z_2=ac+adi+bci+bdi^2
\]

Because:

\[
i^2=-1
\]

We obtain:

\[
z_1z_2=ac+adi+bci-bd
\]

Separating real and imaginary components:

\[
z_1z_2=(ac-bd)+(ad+bc)i
\]

Therefore:

\[
Real=ac-bd
\]

\[
Imag=ad+bc
\]

### Understanding the code

The real component is calculated using:

```c
z.real = z1.real*z2.real-z1.imag*z2.imag;
```

This implements:

\[
Real=ac-bd
\]

The imaginary component is calculated using:

```c
z.imag = z1.real*z2.imag+z1.imag*z2.real;
```

This implements:

\[
Imag=ad+bc
\]

### Example

Given:

\[
z_1=3+4i
\]

\[
z_2=1-5i
\]

The multiplication is:

\[
z_1z_2=(3+4i)(1-5i)
\]

Expanding:

\[
=3-15i+4i-20i^2
\]

Since \(i^2=-1\):

\[
=3-11i+20
\]

Therefore:

\[
z_1z_2=23-11i
\]

The function returns:

```text
23.000000 - 11.000000i
```

---

## 14. Division of Complex Numbers

The program performs division using:

```c
Division(z1,z2);
```

The function is:

```c
Complex Division(Complex z1, Complex z2)
{
    Complex z;
    float den = z2.real*z2.real + z2.imag*z2.imag;

    z.real = (z1.real*z2.real+z1.imag*z2.imag)/den;
    z.imag = (z1.imag*z2.real-z1.real*z2.imag)/den;

    return z;
}
```

This is the most mathematically involved operation in the program.

### Mathematical formula

Consider:

\[
z_1=a+bi
\]

\[
z_2=c+di
\]

We want to calculate:

\[
\frac{z_1}{z_2}=\frac{a+bi}{c+di}
\]

To simplify the denominator, multiply both numerator and denominator by the conjugate of the denominator:

\[
\frac{a+bi}{c+di}
\times
\frac{c-di}{c-di}
\]

Therefore:

\[
\frac{z_1}{z_2}
=
\frac{(a+bi)(c-di)}{(c+di)(c-di)}
\]

The denominator becomes:

\[
(c+di)(c-di)=c^2+d^2
\]

The numerator becomes:

\[
(a+bi)(c-di)
\]

Expanding:

\[
=ac-adi+bci-bdi^2
\]

Because \(i^2=-1\):

\[
=ac+bd+(bc-ad)i
\]

Therefore:

\[
\frac{z_1}{z_2}
=
\frac{ac+bd}{c^2+d^2}
+
\frac{bc-ad}{c^2+d^2}i
\]

The final formulas are:

\[
Real=\frac{ac+bd}{c^2+d^2}
\]

\[
Imag=\frac{bc-ad}{c^2+d^2}
\]

### Understanding the denominator

```c
float den = z2.real*z2.real + z2.imag*z2.imag;
```

This calculates:

\[
den=c^2+d^2
\]

It is the square of the magnitude of the divisor.

### Calculating the real component

```c
z.real = (z1.real*z2.real+z1.imag*z2.imag)/den;
```

This implements:

\[
Real=\frac{ac+bd}{c^2+d^2}
\]

### Calculating the imaginary component

```c
z.imag = (z1.imag*z2.real-z1.real*z2.imag)/den;
```

This implements:

\[
Imag=\frac{bc-ad}{c^2+d^2}
\]

### Example

Given:

\[
z_1=3+4i
\]

\[
z_2=1-5i
\]

First, calculate the denominator:

\[
den=1^2+(-5)^2
\]

\[
den=1+25=26
\]

Calculate the real component:

\[
Real=\frac{3(1)+4(-5)}{26}
\]

\[
Real=\frac{3-20}{26}
\]

\[
Real=-\frac{17}{26}
\]

Calculate the imaginary component:

\[
Imag=\frac{4(1)-3(-5)}{26}
\]

\[
Imag=\frac{4+15}{26}
\]

\[
Imag=\frac{19}{26}
\]

Therefore:

\[
\frac{3+4i}{1-5i}
=
-\frac{17}{26}+\frac{19}{26}i
\]

Approximately:

\[
=-0.653846+0.730769i
\]

---

## 15. Important Problem: Division by Zero

The original division function has an important limitation.

Consider:

```c
Complex z3 = {0, 0};
```

If we try:

```c
Division(z1, z3);
```

The denominator becomes:

\[
den=0^2+0^2=0
\]

The program then attempts to divide by zero.

Mathematically, division by zero is undefined.

Therefore, the function must check whether the divisor is zero before performing the division.

A simple improvement is:

```c
#include <stdbool.h>

bool Division(Complex z1, Complex z2, Complex *result)
{
    float den = z2.real*z2.real + z2.imag*z2.imag;

    if (den == 0.0f)
        return false;

    result->real =
        (z1.real*z2.real + z1.imag*z2.imag) / den;

    result->imag =
        (z1.imag*z2.real - z1.real*z2.imag) / den;

    return true;
}
```

This version:

- Returns `true` when division succeeds.
- Returns `false` when the divisor is zero.
- Stores the result through a pointer.

For more general floating-point calculations, a more numerically robust division algorithm is preferable because squaring very large or very small components can overflow or underflow.

---

## 16. Understanding Structure Return Values

One of the important C programming concepts in this example is returning a structure from a function.

For example:

```c
Complex Add(Complex z1, Complex z2)
{
    Complex z={z1.real + z2.real,z1.imag + z2.imag};
    return z;
}
```

The function creates a local structure:

```c
Complex z;
```

It calculates the result and returns the structure:

```c
return z;
```

This is valid in C.

The returned structure value is available to the calling function.

For example:

```c
DispComplex(Add(z1,z2));
```

This statement performs two operations:

1. `Add(z1,z2)` calculates and returns a new complex number.
2. `DispComplex()` receives that returned structure and displays it.

We do not need to create a separate variable for every calculation.

The same technique is used for:

```c
DispComplex(Conj(z1));
DispComplex(Subtract(z1,z2));
DispComplex(Product(z1,z2));
DispComplex(Division(z1,z2));
```

This makes the program shorter and more readable.

---

## 17. Expected Output

The expected output for the original program is approximately:

```text
z1 = 3.000000 + 4.000000i

z2 = 1.000000 - 5.000000i

z3 = 0

z4 = -1.000000

z5 = 7.000000i

Conj(z1) = 3.000000 - 4.000000i

Abs(z1) = 5.000000

z1 + z2 = 4.000000 - 1.000000i

z1 - z2 = 2.000000 + 9.000000i

z1 * z2 = 23.000000 - 11.000000i

z1 / z2 = -0.653846 + 0.730769i

z1 / z1 = 1.000000
```

The last operation is:

\[
\frac{3+4i}{3+4i}=1+0i
\]

This is why the display function prints:

```text
1.000000
```

The imaginary component is zero, so it is omitted.

---

## 18. Improving the Display Function

The original display function works for the values used in this example, but it can be improved.

For example, it always displays six decimal places, and it does not handle negative zero or tiny floating-point values particularly well.

A more flexible version is:

```c
#include <stdio.h>
#include <math.h>

#define EPSILON 0.000001f

void DispComplex(Complex z)
{
    float x = z.real;
    float y = z.imag;

    if (fabsf(x) < EPSILON)
        x = 0.0f;

    if (fabsf(y) < EPSILON)
        y = 0.0f;

    if (x == 0.0f && y == 0.0f)
    {
        printf("0");
    }
    else if (y == 0.0f)
    {
        printf("%.2f", x);
    }
    else if (x == 0.0f)
    {
        printf("%.2fi", y);
    }
    else
    {
        printf("%.2f %c %.2fi", x, (y >= 0.0f) ? '+' : '-', fabsf(y));
    }
}
```

This version:

- Uses a tolerance when checking for zero.
- Displays two decimal places.
- Handles positive and negative imaginary parts.
- Avoids displaying negative zero.

The conditional operator:

```c
(y >= 0.0f) ? '+' : '-'
```

selects the appropriate sign.

The function `fabsf()` returns the absolute value of a `float`.

---

## 19. A Note About the Standard C Complex Type

C also provides built-in support for complex arithmetic through the C99 complex-number facility.

For example:

```c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex z1 = 3.0 + 4.0 * I;
    double complex z2 = 1.0 - 5.0 * I;

    double complex sum = z1 + z2;
    double complex product = z1 * z2;
    double complex quotient = z1 / z2;

    printf("z1 = %.2f %+.2fi\n", creal(z1), cimag(z1));
    printf("z2 = %.2f %+.2fi\n", creal(z2), cimag(z2));

    printf("Sum = %.2f %+.2fi\n", creal(sum), cimag(sum));
    printf("Product = %.2f %+.2fi\n", creal(product), cimag(product));
    printf("Division = %.2f %+.2fi\n", creal(quotient), cimag(quotient));

    return 0;
}
```

Here:

- `double complex` declares a complex number.
- `I` represents the imaginary unit.
- `creal()` extracts the real component.
- `cimag()` extracts the imaginary component.

This feature is available in C99 and later implementations that support the complex arithmetic facility.

However, implementing complex numbers manually using a structure is an excellent learning exercise because it helps you understand structures, function arguments, return values, and mathematical formulas.

---

## 20. Compilation and Execution

Because the program uses `sqrt()` from `math.h`, GCC may require linking against the math library.

Compile using:

```bash
gcc -std=c11 -Wall -Wextra -pedantic main.c -o complex -lm
```

Run on Linux:

```bash
./complex
```

Run on Windows:

```powershell
.\complex.exe
```

Some Windows GCC toolchains handle the math library differently, but the same source code can generally be compiled with GCC-based environments.

---

## 21. Practice Exercises

Try these exercises to improve your understanding.

### Exercise 1 – Create a new complex number

Create another variable:

```c
Complex z6 = {-2, 3};
```

Display its real and imaginary components.

### Exercise 2 – Calculate the conjugate

Calculate the conjugate of:

\[
z=5-7i
\]

Verify that the result is:

\[
\overline{z}=5+7i
\]

### Exercise 3 – Calculate the magnitude

Calculate the magnitude of:

\[
z=5+12i
\]

Expected result:

\[
|z|=13
\]

### Exercise 4 – Test multiplication

Calculate:

\[
(2+3i)(4-2i)
\]

Check your result against the `Product()` function.

### Exercise 5 – Test division

Calculate:

\[
\frac{5+2i}{1+3i}
\]

Modify the program to display the result.

### Exercise 6 – Add a subtraction test

Calculate:

\[
(7-4i)-(2+6i)
\]

### Exercise 7 – Handle division by zero

Modify `Division()` so that it detects a zero divisor and reports an error instead of dividing by zero.

### Exercise 8 – Add a function for the square

Write a function:

```c
Complex Square(Complex z);
```

It should calculate:

\[
z^2=(a+bi)^2
\]

Expected formula:

\[
z^2=(a^2-b^2)+2abi
\]

### Exercise 9 – Calculate the distance between two complex numbers

Write a function that calculates the distance between two complex numbers:

\[
d=|z_1-z_2|
\]

You can reuse the `Subtract()` and `Abs()` functions.

---

## 22. Learning Outcomes

After studying this program, you should understand:

- What complex numbers are.
- How to represent complex numbers using structures.
- How to use `typedef` to define a structure type.
- How to initialize structure variables.
- How to pass structures to functions.
- How to return structures from functions.
- How to separate mathematical operations into reusable functions.
- How to implement complex conjugation.
- How to calculate the magnitude of a complex number.
- How to implement complex addition and subtraction.
- How to implement complex multiplication.
- How to implement complex division using the conjugate.
- How to use mathematical functions from `math.h`.
- Why division by zero must be handled.
- How C99 provides built-in complex-number support.

