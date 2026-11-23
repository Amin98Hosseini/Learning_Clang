#include <stdio.h>

int main()
{
    float a, d;
    int n;

    // Get a
    printf("Enter first element of series (a): ");
    scanf("%f",&a);
    printf("\n");

    // Get d
    printf("Enter step size of series (d): ");
    scanf("%f",&d);
    printf("\n");

    // Get n
    printf("Enter number of elements (n): ");
    scanf("%d",&n);
    printf("\n");


    float S=0;
    float ai;

    printf("i\ta(i)\t\tS(i)\n");

    int i = 0;
    while(i < n)
    {
        ai = a + i * d;     // calculate the i-th element
        S += ai;
        printf("%d\t%f\t%f\n", i, ai, S);
        i++;
    }
}