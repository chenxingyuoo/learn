//
//  main.cpp
//  3.3 函数重载
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

//函数重载需要函数都在同一个作用域下
void func()
{
    cout << "func 的调用！" << endl;
}
void func(int a)
{
    cout << "func (int a) 的调用！" << endl;
}
void func(double a)
{
    cout << "func (double a)的调用！" << endl;
}
void func(int a ,double b)
{
    cout << "func (int a ,double b) 的调用！" << endl;
}
void func(double a ,int b)
{
    cout << "func (double a ,int b)的调用！" << endl;
}

//函数返回值不可以作为函数重载条件
//int func(double a, int b)
//{
//    cout << "func (double a ,int b)的调用！" << endl;
//}


//函数重载注意事项
//1、引用作为重载条件

void func2(int &a)
{
    cout << "func2 (int &a) 调用 " << endl;
}

void func2(const int &a)
{
    cout << "func2 (const int &a) 调用 " << endl;
}

//2、函数重载碰到函数默认参数

void func3(int a, int b = 10)
{
    cout << "func3(int a, int b = 10) 调用" << endl;
}

void func3(int a)
{
    cout << "func3(int a) 调用" << endl;
}

int main(int argc, const char * argv[]) {
    // 3.3.1 函数重载
    func();
    func(10);
    func(3.14);
    func(10,3.14);
    func(3.14 , 10);
    
    // 3.3.2 函数重载注意事项
    int a = 10;
    func2(a); //调用无const
    func2(10);//调用有const
    
//    func3(10); //碰到默认参数产生歧义，需要避免
    
    
    return 0;
}
