//
//  main.cpp
//  6.函数
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

#include "swap.h"

//函数定义
int add(int num1, int num2) //定义中的num1,num2称为形式参数，简称形参
{
    int sum = num1 + num2;
    return sum;
}


//void swap2(int* num1, int* num2);
//
//void swap2(int* num1, int* num2)
//{
//    cout << "交换前：" << endl;
//    cout << "num1 = " << num1 << endl;
//    cout << "num2 = " << num2 << endl;
//
//    int temp = *num1;
//    *num1 = *num2;
//    *num2 = temp;
//
//    cout << "交换后：" << endl;
//    cout << "num1 = " << *num1 << endl;
//    cout << "num2 = " << *num2 << endl;
//}


int main(int argc, const char * argv[]) {
    int a = 10;
    int b = 20;
    
    int sum = add(a, b);
    cout << "sum = " << sum << endl;
    
    a = 100;
    b = 200;

    sum = add(a, b);
    cout << "sum = " << sum << endl;
    
    
    swap(a, b);

    cout << "mian中的 a = " << a << endl;
    cout << "mian中的 b = " << b << endl;

    
//    swap2(&a, &b);
//
//    cout << "mian中的 a = " << a << endl;
//    cout << "mian中的 b = " << b << endl;

    return 0;
}
