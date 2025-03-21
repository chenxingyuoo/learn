//
//  main.cpp
//  4.5.2 左移运算符重载
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Person {
    friend ostream& operator<<(ostream &out, Person &p);
public:

    Person(int a, int b)
    {
        this->m_A = a;
        this->m_B = b;
    }

    //成员函数 实现不了  p << cout 不是我们想要的效果
    //void operator<<(Person& p){
    //}

private:
    int m_A;
    int m_B;
};

ostream& operator<<(ostream &out, Person &p){
    out << "m_A = " << p.m_A << "m_B= " << p.m_B;
    
    return out;
};


void test01(){
    Person p1(10, 20);

    cout << p1 << "hello world" << endl; //链式编程
    
};

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
