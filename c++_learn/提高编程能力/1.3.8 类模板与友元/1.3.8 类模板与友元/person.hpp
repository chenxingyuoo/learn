//
//  person.hpp
//  1.3.8 类模板与友元
//
//  Created by xingyu chen on 8/1/2024.
//
#pragma once
#include <iostream>
using namespace std;
#include <string>

//2、全局函数配合友元  类外实现 - 先做函数模板声明，下方在做函数模板定义，在做友元
template<class T1, class T2> class Person;

//全局函数配合友元  类外实现
template<class T1, class T2>
void printPerson2(Person<T1, T2> & p)
{
    cout << "类外实现 ---- 姓名： " << p.mName << " 年龄：" << p.mAge << endl;
}


template<class T1, class T2>
class Person{
    //1、全局函数配合友元   类内实现
    friend void printPerson(Person<T1, T2> &p){
        cout << "姓名： " << p.mName << " 年龄：" << p.mAge << endl;
    }
    
    //全局函数配合友元  类外实现
    friend void printPerson2<>(Person<T1, T2> & p);
public:
    Person(T1 name, T2 age){
        this->mName = name;
        this->mAge = age;
    }
private:
    T1 mName;
    T2 mAge;
};



#ifndef person_h
#define person_h


#endif /* person_h */
