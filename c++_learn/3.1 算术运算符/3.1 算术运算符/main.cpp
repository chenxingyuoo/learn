//
//  main.cpp
//  3.1 算术运算符
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

int main(int argc, const char * argv[]) {
    // 运算
//    int a1 = 10;
//    int b1 = 3;
//
//    cout << a1 + b1 << endl;
//    cout << a1 - b1 << endl;
//    cout << a1 * b1 << endl;
//    cout << a1 / b1 << endl;  //两个整数相除结果依然是整数
//
//    int a2 = 10;
//    int b2 = 20;
//    cout << a2 / b2 << endl;
//
////    int a3 = 10;
////    int b3 = 0;
//    //cout << a3 / b3 << endl; //报错，除数不可以为0
//
//
//    //两个小数可以相除
//    double d1 = 0.5;
//    double d2 = 0.25;
//    cout << d1 / d2 << endl;
    
    //取模
//    int a1 = 10;
//    int b1 = 3;
//
//    cout << a1 % b1 << endl;
//
//    int a2 = 10;
//    int b2 = 20;
//
//    cout << a2 % b2 << endl;
//
////    int a3 = 10;
////    int b3 = 0;
//
//    //cout << a3 % b3 << endl; //取模运算时，除数也不能为0
//
//    //两个小数不可以取模
////    double d1 = 3.14;
////    double d2 = 1.1;
//
//    //cout << d1 % d2 << endl;
    
    //递增递减
    //后置递增
    int a = 10;
    a++; //等价于a = a + 1
    cout << a << endl; // 11

    //前置递增
    int b = 10;
    ++b;
    cout << b << endl; // 11

    //区别
    //前置递增先对变量进行++，再计算表达式
    int a2 = 10;
    int b2 = ++a2 * 10;
    cout << b2 << endl;

    //后置递增先计算表达式，后对变量进行++
    int a3 = 10;
    int b3 = a3++ * 10;
    cout << b3 << endl;
    
    
    return 0;
}
