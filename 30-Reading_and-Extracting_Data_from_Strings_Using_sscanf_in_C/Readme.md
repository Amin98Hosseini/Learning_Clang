# 30-Reading and Extracting Data from Strings Using `sscanf()` in C

## 1. Introduction

In C programming, sometimes we have data stored inside a character array (string), and we need to extract numeric values or other information from that string.

For example, consider the following string:

```c
char str[] = "(x = -5.45, y = 10.67)";
```

This string contains two floating-point values:

- `x = -5.45`
- `y = 10.67`

How can we extract these values and store them in separate variables?

C provides a function called `sscanf()` that allows us to read formatted data directly from a string.

The `sscanf()` function works similarly to `scanf()`, but instead of reading input from the keyboard, it reads data from an existing character array.

In this tutorial, we will learn:

- How to read formatted data from a string.
- How to extract floating-point numbers using `sscanf()`.
- How format specifiers work.
- How to check whether data was extracted successfully.
- How to handle invalid or unexpected input safely.

## 2. Required Header Files

```c
#include <stdio.h>
#include <stdlib.h>
```

### `stdio.h`

The `stdio.h` header provides standard input/output functions, including:

- `printf()` – Displays formatted output.
- `puts()` – Displays a string followed by a newline.
- `scanf()` – Reads formatted input from standard input.
- `sscanf()` – Reads formatted data from a string.

### `stdlib.h`

The `stdlib.h` header provides general-purpose utility functions, such as:

- `malloc()`
- `free()`
- `atoi()`
- `strtod()`
- `exit()`

**Note:** This example does not use any function from `stdlib.h`, so the header can be removed without affecting the program.

## 3. Complete Source Code

Here is the original program:

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char str[] = "(x = -5.45, y = 10.67)";

    printf("Input string is:\n");
    puts(str);
    printf("\n\n");

    float x, y;

    sscanf(str, "(x = %f, y = %f)", &x, &y);

    printf("Results of sscanf:\n");
    printf("x = %.2f\n", x);
    printf("y = %.2f\n", y);

    return 0;
}
```

## 4. Understanding the Code

### 4.1. Declaring and Initializing a String

```c
char str[] = "(x = -5.45, y = 10.67)";
```

Here, we declare a character array named `str` and initialize it with a string.

The string contains ordinary characters, labels, punctuation marks, and two numeric values.

Its content is:

```text
(x = -5.45, y = 10.67)
```

In C, strings are stored as character arrays and terminated with a special null character:

```c
'\0'
```

The compiler automatically allocates enough space for the characters and the terminating null character when the array is initialized this way.

### 4.2. Displaying the Input String

```c
printf("Input string is:\n");
puts(str);
printf("\n\n");
```

The first statement displays a heading:

```text
Input string is:
```

The second statement:

```c
puts(str);
```

prints the complete string stored in `str`.

The `puts()` function automatically adds a newline after displaying the string.

The last statement:

```c
printf("\n\n");
```

prints two newline characters to create some space before the next section.

### 4.3. Declaring Variables for Extracted Values

```c
float x, y;
```

We declare two floating-point variables:

- `x` will store the first extracted number.
- `y` will store the second extracted number.

After successful conversion, the expected values are:

```text
x = -5.45
y = 10.67
```

### 4.4. Understanding the `sscanf()` Function

```c
sscanf(str, "(x = %f, y = %f)", &x, &y);
```

This is the most important statement in the program.

The `sscanf()` function reads formatted data from a string and stores the extracted values in the variables provided.

Its general syntax is:

```c
sscanf(source_string, format, argument1, argument2, ...);
```

| Parameter | Description |
|---|---|
| `source_string` | The string from which data is read |
| `format` | The expected pattern of the input string |
| `argument1`, `argument2`, ... | Addresses of variables where extracted values are stored |

In our example:

```c
sscanf(str, "(x = %f, y = %f)", &x, &y);
```

The function receives two main inputs:

**First argument:**

```c
str
```

This is the source string containing the data.

**Second argument:**

```c
"(x = %f, y = %f)"
```

This is the format string describing the expected input structure.

**Third and fourth arguments:**

```c
&x, &y
```

These are the memory addresses of the variables where the converted values will be stored.

### 4.5. Understanding the Format String

Let's examine this format string:

```c
"(x = %f, y = %f)"
```

The format string contains two types of elements:

1. Ordinary characters that must match the input.
2. Format specifiers that indicate where values should be extracted.

| Format element | Meaning |
|---|---|
| `(` | Matches an opening parenthesis |
| `x = ` | Matches the literal text `x = ` |
| `%f` | Reads a floating-point number |
| `, y = ` | Matches the literal text `, y = ` |
| `%f` | Reads another floating-point number |
| `)` | Matches a closing parenthesis |

The function processes the input from left to right.

For the input:

```text
(x = -5.45, y = 10.67)
```

The conversion works as follows:

1. Matches the opening parenthesis `(`.
2. Matches the text `x = `.
3. Reads `-5.45` using `%f` and stores it in `x`.
4. Matches the text `, y = `.
5. Reads `10.67` using `%f` and stores it in `y`.
6. Matches the closing parenthesis `)`.

After successful extraction:

```c
x = -5.45f;
y = 10.67f;
```

**Important:** The format string must describe the structure of the input. If the input does not match the expected pattern, the function may stop before extracting all the values.

### 4.6. Why Do We Use `&x` and `&y`?

```c
sscanf(str, "(x = %f, y = %f)", &x, &y);
```

The `&` operator returns the memory address of a variable.

The `sscanf()` function needs these addresses because it must write the converted values into the variables.

For example:

```c
float x;

sscanf("12.5", "%f", &x);
```

After successful conversion, `x` contains:

```text
12.5
```

**Important:** For `sscanf()`, the `%f` conversion specifier expects a pointer to `float`, so we pass `&x` when `x` is declared as `float`.

If the destination variable is `double`, use `%lf` instead:

```c
double x;

sscanf("12.5", "%lf", &x);
```

This distinction is important:

| Variable type | `sscanf()` format specifier | Argument |
|---|---|---|
| `float` | `%f` | `&x` |
| `double` | `%lf` | `&x` |

For comparison, in `printf()`, `%f` is used to print both `float` and `double` values because a `float` argument is promoted to `double`.

### 4.7. Displaying the Extracted Values

```c
printf("Results of sscanf:\n");
printf("x = %.2f\n", x);
printf("y = %.2f\n", y);
```

After extracting the numbers, we display their values.

The format specifier:

```c
%.2f
```

means that the floating-point value should be displayed with two digits after the decimal point.

The output is:

```text
x = -5.45
y = 10.67
```

## 5. Expected Output

When the original program runs successfully, the output will be:

```text
Input string is:
(x = -5.45, y = 10.67)


Results of sscanf:
x = -5.45
y = 10.67
```

The first section displays the original string, while the second section displays the extracted numeric values.

## 6. Understanding the Return Value of `sscanf()`

One important detail about `sscanf()` is that it returns the number of input items successfully converted and assigned.

For example:

```c
int result;

result = sscanf(str, "(x = %f, y = %f)", &x, &y);
```

In this example, there are two floating-point conversions.

If both conversions succeed:

```text
result = 2
```

If only the first conversion succeeds:

```text
result = 1
```

If no conversion succeeds:

```text
result = 0
```

The function can also return `EOF` if an input failure occurs before the first conversion is completed.

For robust programs, always check the return value before using the extracted variables.

## 7. Improved and Safer Version

The original program does not check whether `sscanf()` successfully extracts both numbers.

If the input string is malformed, one or both variables may remain uninitialized. Printing an uninitialized variable can result in undefined behavior.

The following version checks the return value:

```c
#include <stdio.h>

int main(void)
{
    char str[] = "(x = -5.45, y = 10.67)";

    float x, y;

    printf("Input string is:\n");
    puts(str);

    int result = sscanf(
        str,
        "(x = %f, y = %f)",
        &x,
        &y
    );

    if (result == 2)
    {
        printf("\nResults of sscanf:\n");
        printf("x = %.2f\n", x);
        printf("y = %.2f\n", y);
    }
    else
    {
        printf("\nError: Could not extract both values!\n");
        printf("Successfully converted values: %d\n", result);
    }

    return 0;
}
```

### Why is this version better?

The program checks:

```c
if (result == 2)
```

This condition verifies that both floating-point values were successfully converted and assigned.

If the result is not 2, the program reports an error instead of printing potentially uninitialized variables.

**Note:** This check confirms that both numeric conversions succeeded. It does not necessarily guarantee that the entire input string was consumed. For example, extra characters after the closing parenthesis may remain unread.

## 8. Testing with Different Input Strings

Let's examine how `sscanf()` behaves with different strings.

### Example 1: Valid Input

```c
char str[] = "(x = -5.45, y = 10.67)";
```

Result:

```text
x = -5.45
y = 10.67
```

Both conversions succeed, so the return value is `2`.

### Example 2: Invalid Second Number

```c
char str[] = "(x = -5.45, y = ABC)";
```

The first number can be converted, but the second number cannot.

Return value:

```text
1
```

The value of `x` is assigned, but `y` remains unchanged.

### Example 3: Invalid First Number

```c
char str[] = "(x = ABC, y = 10.67)";
```

The first floating-point conversion fails.

Return value:

```text
0
```

Neither variable receives a new value.

### Example 4: Missing Closing Parenthesis

```c
char str[] = "(x = -5.45, y = 10.67";
```

Both floating-point conversions can succeed before the function reaches the missing closing parenthesis.

The return value can still be:

```text
2
```

This demonstrates an important point: `sscanf()` counts successful conversions, not successful matches of every literal character in the format string.

## 9. Difference Between `scanf()` and `sscanf()`

Both functions read formatted data, but their input sources are different.

| Function | Input source | Typical application |
|---|---|---|
| `scanf()` | Standard input, usually keyboard | Reading values entered by the user |
| `sscanf()` | Existing character string | Extracting values from stored text |

### Using `scanf()`

```c
float x;

printf("Enter a number: ");
scanf("%f", &x);

printf("Value = %.2f\n", x);
```

Here, the user enters a number through the keyboard.

### Using `sscanf()`

```c
char str[] = "25.75";

float x;

sscanf(str, "%f", &x);

printf("Value = %.2f\n", x);
```

Here, the number is already stored in a string, and `sscanf()` extracts it.

## 10. Practical Applications

The `sscanf()` function is useful when working with text-based data formats.

### 10.1. Extracting Sensor Values

Imagine receiving this message from a microcontroller:

```text
TEMP=28.65,HUM=45.20
```

We can extract temperature and humidity:

```c
#include <stdio.h>

int main(void)
{
    char message[] = "TEMP=28.65,HUM=45.20";

    float temperature;
    float humidity;

    int result = sscanf(
        message,
        "TEMP=%f,HUM=%f",
        &temperature,
        &humidity
    );

    if (result == 2)
    {
        printf("Temperature: %.2f C\n", temperature);
        printf("Humidity: %.2f %%\n", humidity);
    }
    else
    {
        printf("Invalid sensor message!\n");
    }

    return 0;
}
```

Output:

```text
Temperature: 28.65 C
Humidity: 45.20 %
```

### 10.2. Extracting Coordinates

Consider a string containing two coordinates:

```text
X=12.50,Y=45.75
```

We can extract them as follows:

```c
#include <stdio.h>

int main(void)
{
    char data[] = "X=12.50,Y=45.75";

    float x, y;

    int result = sscanf(data, "X=%f,Y=%f", &x, &y);

    if (result == 2)
    {
        printf("X = %.2f\n", x);
        printf("Y = %.2f\n", y);
    }

    return 0;
}
```

Output:

```text
X = 12.50
Y = 45.75
```

### 10.3. Parsing a Simple Command

Suppose a device receives a command:

```text
SET,25.5,100
```

We can extract the numeric parameters:

```c
#include <stdio.h>

int main(void)
{
    char command[] = "SET,25.5,100";

    float temperature;
    int duration;

    int result = sscanf(
        command,
        "SET,%f,%d",
        &temperature,
        &duration
    );

    if (result == 2)
    {
        printf("Temperature = %.2f\n", temperature);
        printf("Duration = %d\n", duration);
    }
    else
    {
        printf("Invalid command!\n");
    }

    return 0;
}
```

Output:

```text
Temperature = 25.50
Duration = 100
```

**Embedded systems note:** `sscanf()` is convenient for simple text protocols, but it can require considerable code size and stack space in small microcontrollers. For performance-critical or memory-constrained applications, a dedicated parser may be preferable. Also, `sscanf()` alone does not validate every protocol rule or guarantee that the entire message was consumed.

## 11. Common Mistakes

### Mistake 1: Forgetting the Address Operator `&`

Incorrect:

```c
float x;

sscanf(str, "%f", x);
```

Correct:

```c
float x;

sscanf(str, "%f", &x);
```

The function needs the variable's address so it can store the converted value.

### Mistake 2: Using the Wrong Format Specifier

Incorrect for a `double` destination:

```c
double x;

sscanf(str, "%f", &x);
```

Correct:

```c
double x;

sscanf(str, "%lf", &x);
```

For `sscanf()`, `%f` expects `float *`, while `%lf` expects `double *`.

### Mistake 3: Not Checking the Return Value

Incorrect:

```c
sscanf(str, "%f,%f", &x, &y);

printf("%f %f\n", x, y);
```

If conversion fails, one or both variables may not have been assigned.

Better:

```c
if (sscanf(str, "%f,%f", &x, &y) == 2)
{
    printf("%f %f\n", x, y);
}
else
{
    printf("Invalid input!\n");
}
```

### Mistake 4: Assuming All Input Characters Were Consumed

A successful conversion count does not always mean that the entire input string matches the format.

For strict validation, additional parsing or checks are required.

### Mistake 5: Confusing `sscanf()` with `sprintf()`

These functions have different purposes:

- `sprintf()` formats values and writes the result into a string.
- `sscanf()` reads formatted values from a string and stores them in variables.

## 12. Compilation and Execution

Save the source code as:

```text
main.c
```

Compile using GCC:

```bash
gcc main.c -o sscanf_example
```

Run on Linux or macOS:

```bash
./sscanf_example
```

Run on Windows:

```powershell
gcc main.c -o sscanf_example.exe
.\sscanf_example.exe
```

No additional library is required for this example.

## 13. Exercises

Try the following exercises to improve your understanding.

**Exercise 1 – Extract Three Floating-Point Values**

Create this string:

```c
char str[] = "A=12.5,B=25.7,C=30.9";
```

Use `sscanf()` to extract all three values into separate variables.

**Exercise 2 – Extract Integer and Floating-Point Values**

Create this string:

```c
char str[] = "ID=125,TEMP=28.75";
```

Extract:

- `ID` as an integer.
- `TEMP` as a floating-point value.

**Exercise 3 – Parse Sensor Data**

Create a program that reads the following string:

```text
TEMP=27.5,HUM=60.2,VOLT=12.8
```

Extract temperature, humidity, and voltage.

**Exercise 4 – Test Invalid Input**

Modify the original program so that the input string contains an invalid second value:

```c
char str[] = "(x = -5.45, y = ABC)";
```

Check the return value of `sscanf()` and explain why only one conversion succeeds.

**Exercise 5 – Compare `scanf()` and `sscanf()`**

Write a program that:

1. Reads a floating-point value from the keyboard using `scanf()`.
2. Stores a formatted message in a character array.
3. Uses `sscanf()` to extract the number from that message.
4. Displays the extracted value.

## 14. Learning Objectives

After completing this tutorial, you should understand:

- How to use `sscanf()` to read formatted data from a string.
- How to extract floating-point values from text.
- How format strings describe the expected input structure.
- Why the address operator `&` is needed for destination variables.
- The difference between `%f` and `%lf` in `sscanf()`.
- How to check the return value of `sscanf()`.
- The differences between `scanf()`, `sscanf()`, and `sprintf()`.
- How to parse simple sensor messages and text-based commands.
- Why successful conversions do not necessarily guarantee complete input validation.
