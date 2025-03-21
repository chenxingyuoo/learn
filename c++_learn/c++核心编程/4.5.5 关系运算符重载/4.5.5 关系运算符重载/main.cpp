//
//  main.cpp
//  4.5.5 关系运算符重载
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Person
{
public:
    Person(string name, int age)
    {
        this->m_Name = name;
        this->m_Age = age;
    };
    
    bool operator==(Person &p){
        if (this->m_Name == p.m_Name && this->m_Age == p.m_Age) {
            return true;
        }
        return false;
    }
    
    bool operator!=(Person &p){
        if (this->m_Name == p.m_Name && this->m_Age == p.m_Age) {
            return false;
        }
        return true;
    }
private:
    string m_Name;
    int m_Age;
};

void test01(){
    Person p1("tom",20);
    Person p2("tom",20);
    
    if (p1 == p2) {
        cout << "p1 == p2" << endl;

    } else {
        cout << "p1 != p2" << endl;

    }
    
    if (p1 != p2) {
        cout << "p1 != p2" << endl;

    } else {
        cout << "p1 == p2" << endl;

    }
    
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
