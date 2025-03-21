//
//  main.cpp
//  1.2 函数模板
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;


//交换整型函数
void swapInt(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

//交换浮点型函数
void swapDouble(double& a, double& b) {
    double temp = a;
    a = b;
    b = temp;
}

//利用模板提供通用的交换函数
template<typename T>
void mySwap(T &a, T &b){
    T temp = a;
    a = b;
    b = temp;
}

void test01(){
    int a = 10;
    int b = 20;
    
    //swapInt(a, b);

    //利用模板实现交换
    //1、自动类型推导
//    mySwap(a, b);

    //2、显示指定类型
    mySwap<int>(a, b);
    
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
