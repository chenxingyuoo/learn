//
//  main.cpp
//  4.3.1 成员变量和成员函数分开存储
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
using namespace std;

class Person {
    //非静态成员变量占对象空间
    int mA;
    //静态成员变量不占对象空间
    static int mB;
    //函数也不占对象空间，所有函数共享一个函数实例
    void func() {
        cout << "mA:" << this->mA << endl;
    }
    //静态成员函数也不占对象空间
    static void sfunc() {
    }
};

void test01(){
    Person p;
    cout << sizeof(p) << endl;
}

void test02(){
    Person p;
    cout << sizeof(p) << endl;
}


int main(int argc, const char * argv[]) {
//    test01();
    
    test02();
    
    return 0;
}
