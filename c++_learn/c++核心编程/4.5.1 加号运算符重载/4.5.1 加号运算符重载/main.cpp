//
//  main.cpp
//  4.5.1 加号运算符重载
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Person {
public:
    Person() {};
    Person(int a, int b)
    {
        this->m_A = a;
        this->m_B = b;
    }
    //成员函数实现 + 号运算符重载
//    Person operator+(Person& p2) {
//        Person temp;
//        temp.m_A = this->m_A + p2.m_A;
//        temp.m_B = this->m_B + p2.m_B;
//        return temp;
//    }
public:
    int m_A;
    int m_B;
};

//全局函数实现 + 号运算符重载
Person operator+(Person& p1, Person& p2) {
    Person temp(0, 0);
    temp.m_A = p1.m_A + p2.m_A;
    temp.m_B = p1.m_B + p2.m_B;
    return temp;
};

//全局函数实现 - 号运算符重载
Person operator-(Person& p1, Person& p2) {
    Person temp(0, 0);
    temp.m_A = p1.m_A - p2.m_A;
    temp.m_B = p1.m_B - p2.m_B;
    return temp;
};

//运算符重载 可以发生函数重载
Person operator+(Person& p1, int val) {
    Person temp(0, 0);
    temp.m_A = p1.m_A + val;
    temp.m_B = p1.m_B + val;
    return temp;
};

void test01(){
    Person p1(10,20);
    Person p2(40,50);
    
    //成员函数方式
//    Person p3 = p2 + p1;  //相当于 p2.operaor+(p1)
//    Person p3 = p2.operator+(p1);
//    cout << "mA:" << p3.m_A << " mB:" << p3.m_B << endl;
    
    Person p4 = p1 + p2; //相当于 operator+(p1,p2)
    cout << "p4mA:" << p4.m_A << " mB:" << p4.m_B << endl;

    Person p5 = p1 + 50; //相当于 operator+(p1,50)
    cout << "p5mA:" << p5.m_A << " mB:" << p5.m_B << endl;
    
    Person p6 = p1 - p2; //相当于 operator-(p1,p2)
    cout << "p6mA:" << p6.m_A << " mB:" << p6.m_B << endl;

}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
