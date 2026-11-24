# 16-Statistical Analysis and Histogram Using C

## 1. Introduction

This project demonstrates how to perform basic statistical calculations using the C programming language.

The program processes an array of integer values and calculates several statistical properties:

- Sum of all values
- Arithmetic mean (average)
- Sample standard deviation
- Frequency of each value from 0 to 9
- Histogram representing the frequency distribution

The dataset contains 60 integer values ranging from 0 to 9.

The program uses arrays, loops, counters, mathematical operations, and the `math.h` library to analyze the data.

This project is a practical introduction to data processing and basic statistics in C.

## 2. Source Code

```c
#include <stdio.h>
#include <math.h>

int main()
{
    int i, j, k;

    int p[] = {
        1,2,3,4,5,6,7,8,9,0,
        1,4,7,2,8,6,0,2,4,3,
        8,9,7,6,8,0,3,4,2,5,
        6,7,3,7,8,9,2,3,6,8,
        4,4,6,7,8,4,9,2,3,4,
        5,6,7,8,8,3,4,7,8,9
    };

    int N = sizeof(p) / sizeof(p[0]);

    int f[10];

    for(i = 0; i < 10; i++)
    {
        f[i] = 0;
    }

    int sum = 0;
    float mean;

    for(j = 0; j < N; j++)
    {
        f[p[j]]++;
        sum += p[j];
    }

    mean = (float)sum / N;

    float stdev = 0;

    for(j = 0; j < N; j++)
    {
        stdev += (p[j] - mean) * (p[j] - mean);
    }

    stdev = sqrt(stdev / (N - 1));

    printf("Sum   = %d\n", sum);
    printf("Mean  = %f\n", mean);
    printf("StDev = %f\n", stdev);
    printf("\n");

    printf("Poll\tFreq.\tHistogram\n");

    for(i = 0; i < 10; i++)
    {
        printf("%d\t%d\t", i, f[i]);

        for(k = 0; k < f[i]; k++)
        {
            printf("*");
        }

        printf("\n");
    }

    return 0;
}
```

## 3. Mathematical Background

This program calculates three important statistical properties: sum, mean, and standard deviation.

### 3.1. Sum

The sum represents the total of all values in the dataset.

\[
S = \sum_{i=0}^{N-1}p_i
\]

Where:

- \(p_i\) is an individual data value.
- \(N\) is the number of elements.
- \(S\) is the total sum.

For this dataset:

\[
S = 282
\]

### 3.2. Arithmetic Mean

The arithmetic mean represents the average value of the dataset.

\[
\mu = \frac{1}{N}\sum_{i=0}^{N-1}p_i
\]

Where:

- \(\mu\) is the arithmetic mean.
- \(N\) is the number of data elements.
- \(p_i\) represents each individual value.

For this dataset:

\[
\mu = \frac{282}{60}=4.7
\]

### 3.3. Sample Standard Deviation

Standard deviation measures how much the data values are spread around the mean.

This program calculates the **sample standard deviation** using:

\[
s = \sqrt{\frac{\sum_{i=0}^{N-1}(p_i-\mu)^2}{N-1}}
\]

Where:

- \(s\) is the sample standard deviation.
- \(p_i\) is each data value.
- \(\mu\) is the arithmetic mean.
- \(N\) is the number of observations.

The denominator is \(N-1\), because the program uses the sample standard deviation formula.

For this dataset:

\[
s \approx 2.685
\]

If the dataset represents the entire population rather than a sample, the population standard deviation formula uses \(N\) instead of \(N-1\).

### 3.4. Frequency Distribution

Frequency indicates how many times a particular value appears in a dataset.

For example, if the number 4 appears 10 times, its frequency is 10.

The program stores these counts in an array:

\[
f[0],f[1],\ldots,f[9]
\]

The frequency of each value \(x\) can be represented as:

\[
f[x] = \text{Number of occurrences of }x
\]

### 3.5. Histogram

A histogram is a graphical representation of the frequency distribution.

In this program, each asterisk (`*`) represents one occurrence of a value.

For example:

```text
4    10    **********
```

This means that the number 4 appears 10 times.

## 4. Understanding the Code

### 4.1. Header Files

```c
#include <stdio.h>
#include <math.h>
```

Two standard libraries are included.

- `stdio.h`: Provides input/output functions such as `printf()`.
- `math.h`: Provides mathematical functions such as `sqrt()`.

The `sqrt()` function is used to calculate the square root when computing standard deviation.

### 4.2. Declaring Loop Variables

```c
int i, j, k;
```

Three integer variables are declared for controlling the loops.

- `i`: Used for initializing and displaying the frequency array.
- `j`: Used for processing the dataset.
- `k`: Used for printing the histogram symbols.

Using separate loop variables makes the different operations easier to follow.

### 4.3. Defining the Dataset

```c
int p[] = {
    1,2,3,4,5,6,7,8,9,0,
    1,4,7,2,8,6,0,2,4,3,
    8,9,7,6,8,0,3,4,2,5,
    6,7,3,7,8,9,2,3,6,8,
    4,4,6,7,8,4,9,2,3,4,
    5,6,7,8,8,3,4,7,8,9
};
```

An integer array named `p` stores the dataset.

The array contains 60 elements, and each element is an integer between 0 and 9.

The array is initialized directly when it is declared.

### 4.4. Calculating the Number of Elements

```c
int N = sizeof(p) / sizeof(p[0]);
```

This statement calculates the number of elements in the array automatically.

- `sizeof(p)` returns the total memory size of the array in bytes.
- `sizeof(p[0])` returns the memory size of one array element.

Therefore:

\[
N = \frac{\text{Total array size}}{\text{Size of one element}}
\]

For this dataset, assuming each `int` occupies 4 bytes:

\[
N = \frac{240}{4}=60
\]

This approach is useful because the program does not need to manually specify the array length.

### 4.5. Declaring the Frequency Array

```c
int f[10];
```

The frequency array contains 10 elements.

Each element stores the number of occurrences of one digit:

| Index | Stored frequency |
|---:|---|
| `f[0]` | Frequency of 0 |
| `f[1]` | Frequency of 1 |
| `f[2]` | Frequency of 2 |
| ... | ... |
| `f[9]` | Frequency of 9 |

### 4.6. Initializing the Frequency Array

```c
for(i = 0; i < 10; i++)
{
    f[i] = 0;
}
```

All frequency counters are initialized to zero.

This is important because the array is not automatically initialized to zero when it is declared as a local variable.

Without initialization, its elements contain indeterminate values.

### 4.7. Calculating Frequency and Sum

```c
int sum = 0;

for(j = 0; j < N; j++)
{
    f[p[j]]++;
    sum += p[j];
}
```

This loop processes every element in the dataset.

Two operations happen during each iteration.

**Operation 1: Counting frequency**

```c
f[p[j]]++;
```

This statement increases the frequency counter corresponding to the current value.

For example, if:

```c
p[j] = 4;
```

Then:

```c
f[4]++;
```

The frequency of number 4 increases by one.

**Operation 2: Calculating the sum**

```c
sum += p[j];
```

This is a shorthand form of:

```c
sum = sum + p[j];
```

It adds the current element to the total sum.

After the loop finishes, the program has calculated the sum and the frequency of every digit.

### 4.8. Calculating the Mean

```c
mean = (float)sum / N;
```

The sum is divided by the number of elements to calculate the average.

The cast:

```c
(float)sum
```

converts `sum` from an integer to a floating-point value.

This is important because integer division would discard the fractional part.

For example:

```c
282 / 60
```

with integer operands produces `4`.

But:

```c
(float)282 / 60
```

produces approximately `4.7`.

### 4.9. Calculating Standard Deviation

```c
float stdev = 0;

for(j = 0; j < N; j++)
{
    stdev += (p[j] - mean) * (p[j] - mean);
}
```

This loop calculates the sum of squared differences between each data value and the mean.

For each element:

1. Subtract the mean from the current value.
2. Multiply the result by itself.
3. Add the squared difference to `stdev`.

Mathematically:

\[
stdev = \sum_{i=0}^{N-1}(p_i-\mu)^2
\]

The next statement completes the calculation:

```c
stdev = sqrt(stdev / (N - 1));
```

It divides the sum of squared differences by \(N-1\), then calculates the square root.

The final result is the sample standard deviation.

### 4.10. Displaying Statistical Results

```c
printf("Sum   = %d\n", sum);
printf("Mean  = %f\n", mean);
printf("StDev = %f\n", stdev);
```

These statements display the three statistical results.

- `%d` displays an integer.
- `%f` displays a floating-point number.
- `\n` moves the output to the next line.

### 4.11. Displaying the Frequency Table

```c
printf("Poll\tFreq.\tHistogram\n");

for(i = 0; i < 10; i++)
{
    printf("%d\t%d\t", i, f[i]);
    for(k = 0; k < f[i]; k++)
    {
        printf("*");
    }
    printf("\n");
}
```

This section displays the frequency of each digit and its corresponding histogram.

The outer loop processes digits from 0 to 9.

The inner loop prints one asterisk for every occurrence of the current digit.

For example, if:

```c
f[5] = 6;
```

The inner loop executes six times and prints:

```text
******
```

The `\t` escape sequence inserts a tab character to separate the columns.

## 5. Example Output

The program produces the following statistical results:

```text
Sum   = 282
Mean  = 4.700000
StDev = 2.685...
```

The frequency table is:

```text
Poll    Freq.   Histogram
0       3       ***
1       3       ***
2       6       ******
3       7       *******
4       9       *********
5       5       *****
6       7       *******
7       7       *******
8       9       *********
9       4       ****
```

The frequency counts add up to 60, which is the total number of elements in the dataset.

## 6. Important C Programming Concepts

| Concept | Description |
|---|---|
| `#include` | Includes standard library headers |
| Array | Stores multiple values of the same data type |
| `sizeof()` | Returns the size of an object in bytes |
| Array indexing | Accesses individual array elements |
| `for` loop | Repeats instructions |
| Counter | Tracks how many times an event occurs |
| `f[p[j]]++` | Increments the counter for the current value |
| `sum += p[j]` | Adds the current element to the sum |
| Type casting | Converts a value from one data type to another |
| `sqrt()` | Calculates a square root |
| Nested loops | Uses one loop inside another |
| `\t` | Inserts a tab character |
| `*` | Represents a frequency visually in the histogram |

## 7. Time and Space Complexity

Let `N` represent the number of elements in the dataset.

### Time Complexity

The program performs:

- One loop to initialize the frequency array: 10 iterations.
- One loop to calculate the sum and frequencies: N iterations.
- One loop to calculate standard deviation: N iterations.
- One outer loop and inner loops to print the histogram.

The total number of histogram asterisks is N because every dataset element contributes to exactly one frequency count.

Therefore, the overall time complexity is:

\[
\boxed{O(N)}
\]

The number of categories is fixed at 10.

### Space Complexity

The program stores:

- N dataset elements.
- 10 frequency counters.
- A fixed number of additional variables.

Therefore:

\[
\boxed{O(N)}
\]

The dataset array is the main contributor to memory usage.

## 8. Important Notes and Possible Improvements

1. **The dataset must contain values from 0 to 9.** The expression `f[p[j]]` uses each data value as an array index. A value outside this range would cause an out-of-bounds array access.

2. **The standard deviation is a sample standard deviation.** The denominator is `N - 1`. If the dataset represents an entire population, use `N` instead.

3. **The program assumes that the dataset is not empty.** Otherwise, calculating the mean and standard deviation would involve division by zero.

4. **Use `double` for greater precision.** Statistical calculations can benefit from double-precision floating-point variables.

5. **The variable name `Poll` could be improved.** Since the program is displaying digit values, `Value` or `Digit` would be more descriptive.

6. **The frequency array size is fixed.** For a dataset with a different value range, the frequency array and its indexing logic must be adjusted.

## 9. Practice Exercises

Try these exercises to improve your understanding:

1. Add a function to calculate the mean.
2. Add a separate function to calculate the sample standard deviation.
3. Allow the user to enter the dataset instead of using predefined values.
4. Find and display the minimum and maximum values.
5. Calculate the percentage frequency of each digit.
6. Display the histogram using a different symbol, such as `#`.
7. Sort the dataset in ascending order.
8. Calculate the median.
9. Modify the program to support values from 0 to 100.
10. Display the frequency distribution as percentages instead of raw counts.


## 10. Learning Objective

The main objective of this project is to learn how to process a dataset and extract useful statistical information using C.

By completing this exercise, you will understand:

- How to process array-based datasets.
- How to calculate statistical properties.
- How to use arrays as frequency counters.
- How to apply nested loops.
- How to use mathematical functions from `math.h`.
- How to represent numerical data using a text-based histogram.

This project is a practical introduction to statistical data processing and simple data visualization in C.