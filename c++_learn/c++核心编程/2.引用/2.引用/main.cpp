//
//  main.cpp
//  2.引用
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

//1. 值传递
void mySwap01(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

//2. 地址传递
void mySwap02(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

//3. 引用传递
void mySwap03(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

//返回局部变量引用
int& test01() {
    int a = 10; //局部变量
    return a;
}

//返回静态变量引用
int& test02() {
    static int a = 20;
    return a;
}

//发现是引用，转换为 int* const ref = &a;
void func(int& ref){
    ref = 100; // ref是引用，转换为*ref = 100
}

//引用使用的场景，通常用来修饰形参
void showValue(const int& v) {
    //v += 10;
    cout << v << endl;
}



int main(int argc, const char * argv[]) {
    // 2.1 引用的基本使用
//    int a = 10;
//    int &b = a;
//
//    cout << "a = " << a << endl;
//    cout << "b = " << b << endl;
//
//    b = 100;
//
//    cout << "a = " << a << endl;
//    cout << "b = " << b << endl;
    
    // 2.2引用注意事项
//    int a = 10;
//    int b = 20;
//    //int &c; //错误，引用必须初始化
//    int &c = a; //一旦初始化后，就不可以更改
//    c = b; //这是赋值操作，不是更改引用
//
//    cout << "a = " << a << endl;
//    cout << "b = " << b << endl;
//    cout << "c = " << c << endl;
    
    // 2.3 引用做函数参数
//    int a = 10;
//    int b = 20;
//
//    mySwap01(a, b);
//    cout << "a:" << a << " b:" << b << endl;
//
//    mySwap02(&a, &b);
//    cout << "a:" << a << " b:" << b << endl;
//
//    mySwap03(a, b);
//    cout << "a:" << a << " b:" << b << endl;
    
    // 2.4 引用做函数返回值
    //不能返回局部变量的引用
//    int& ref = test01();
//    cout << "ref = " << ref << endl;
//    cout << "ref = " << ref << endl;
//
//    //如果函数做左值，那么必须返回引用
//    int& ref2 = test02();
//    cout << "ref2 = " << ref2 << endl;
//    cout << "ref2 = " << ref2 << endl;
//
//    test02() = 1000;
//
//    cout << "ref2 = " << ref2 << endl;
//    cout << "ref2 = " << ref2 << endl;
    
    // 2.5 引用的本质
//    int a = 10;
//
//    //自动转换为 int* const ref = &a; 指针常量是指针指向不可改，也说明为什么引用不可更改
//    int& ref = a;
//    ref = 20; //内部发现ref是引用，自动帮我们转换为: *ref = 20;
//
//    cout << "a:" << a << endl;
//    cout << "ref:" << ref << endl;
//
//    func(a);
    
    //2.6 常量引用
    //int& ref = 10;  引用本身需要一个合法的内存空间，因此这行错误
    //加入const就可以了，编译器优化代码，int temp = 10; const int& ref = temp;
    const int& ref = 10;

    //ref = 100;  //加入const后不可以修改变量
    cout << ref << endl;

    //函数中利用常量引用防止误操作修改实参
    int a = 10;
    showValue(a);
    return 0;
}
