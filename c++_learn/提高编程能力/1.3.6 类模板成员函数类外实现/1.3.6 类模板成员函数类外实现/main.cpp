//
//  main.cpp
//  1.3.6 类模板成员函数类外实现
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//类模板中成员函数类外实现
template<class T1, class T2>
class Person {
public:
    //成员函数类内声明
    Person(T1 name, T2 age);
    void showPerson();
public:
    T1 m_Name;
    T2 m_Age;
};

//构造函数 类外实现
template<class T1, class T2>
Person<T1, T2>::Person(T1 name, T2 age) {
    this->m_Name = name;
    this->m_Age = age;
}

//成员函数 类外实现
template<class T1, class T2>
void Person<T1, T2>::showPerson(){
    cout << "姓名: " << this->m_Name << " 年龄:" << this->m_Age << endl;
}

void test01(){
    Person<string, int> p("孙悟空", 88);
    p.showPerson();
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
