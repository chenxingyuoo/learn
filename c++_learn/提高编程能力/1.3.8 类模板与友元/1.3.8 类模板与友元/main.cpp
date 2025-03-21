//
//  main.cpp
//  1.3.8 类模板与友元
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;
#include "person.hpp"

//template<class T1, class T2>
//class Person{
//    //1、全局函数配合友元   类内实现
//    friend void printPerson(Person<T1, T2> &p){
//        cout << "姓名： " << p.mName << " 年龄：" << p.mAge << endl;
//    }
//
//    //全局函数配合友元  类外实现
//    friend void printPerson2<>(Person<T1, T2> & p);
//public:
//    Person(T1 name, T2 age){
//        this->mName = name;
//        this->mAge = age;
//    }
//private:
//    T1 mName;
//    T2 mAge;
//};
//

//1、全局函数在类内实现
void test01()
{
    Person <string, int >p("Tom", 20);
    printPerson(p);
}


//2、全局函数在类外实现
void test02()
{
    Person <string, int >p("Jerry", 30);
    printPerson2(p);
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    return 0;
}
