#include "stdio.h"

int main(int argc, char const *argv[])
{
    /* code */
    int a,b,c;
    //Get number from user 
    printf("Please  enter first integer number : ");
    scanf("%d",&a);
    printf("\n");
    printf("Please  enter seconde integer number : ");
    scanf("%d",&b);

    c = a+b;

    printf("Result for : %d + %d = %d \n" , a,b,c);
    return 0;
}
