//
//  main.cpp
//  4.3.2 this指针概念
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
using namespace std;

class Person{
public:
    Person(int age){
        this->age = age;
    }
    Person& PersonAddPerson(Person p){
        this->age += p.age;
        return *this;
    }
    
    int age;
};

void test01(){
    Person p1(10);
    cout << "p1.age = " << p1.age << endl;
    
    Person p2(10);
    p2.PersonAddPerson(p1).PersonAddPerson(p1).PersonAddPerson(p1);
    cout << "p2.age = " << p2.age << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
