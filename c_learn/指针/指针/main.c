//
//  main.c
//  指针
//
//  Created by xingyu chen on 25/12/2023.
//

#include <stdio.h>
 
int main ()
{
    int var_runoob = 10;
    int *p;              // 定义指针变量
    p = &var_runoob;
    
    printf("&p = %p\n", &p);

    *p = 100;
 
   printf("var_runoob 变量的地址： %p，%d\n", p,*p);
    
    
    double *head = NULL;
    double salary = 8000.75;
    
    head = &salary;
    
    printf("&salary = %p\n", &salary);

    printf("head = %p\n", head);
    
    printf("salary = %.2lf\n", salary);
    
    printf("*head = %.2lf\n", *head);
    
    double *tail = NULL;
    
    tail = head;

    printf("tail = %p\n", tail);

    printf("*tail = %.2lf\n", *tail);
    
    *tail = 3023.25;
    
    printf("*head = %.2lf\n", *head);


//    int age = 900;
    
//    head = (double*)&age;

    *tail += 100;

    printf("salary = %.2lf\n", salary);

    printf("sizeof salary = %ld\n", sizeof(salary));
    
    printf("sizeof tail = %ld\n", sizeof(tail));
    
    printf("sizeof head = %ld\n", sizeof(head));

    
   return 0;
}
