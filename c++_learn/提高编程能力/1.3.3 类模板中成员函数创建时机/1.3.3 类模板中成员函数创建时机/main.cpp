//
//  main.cpp
//  1.3.3 类模板中成员函数创建时机
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Person1
{
public:
    void showPerson1()
    {
        cout << "Person1 show" << endl;
    }
};

class Person2
{
public:
    void showPerson2()
    {
        cout << "Person2 show" << endl;
    }
};

template<class T>
class MyClass
{
public:
    void fun1() {
        obj.showPerson1();
    }
    void fun2() {
        obj.showPerson2();
    }
public:
    T obj;
};

void test01()
{
    MyClass<Person1> m;
    
    m.fun1();

//    m.fun2();//编译会出错，说明函数调用才会去创建成员函数
    
    MyClass<Person2> m2;
    
    m2.fun2();
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
