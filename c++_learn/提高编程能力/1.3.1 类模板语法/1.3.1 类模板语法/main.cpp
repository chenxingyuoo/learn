//
//  main.cpp
//  1.3.1 类模板语法
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//类模板
template<class NameType, class AgeType>
class Person{
public:
    Person(NameType name, AgeType age){
        this->mName = name;
        this->mAge = age;
    }
    void showPerson(){
        cout << "mName = " << this->mName << "mAge = " << this->mAge << endl;
    }
public:
    NameType mName;
    AgeType mAge;
};

void test01(){
    Person<string, int> p1("孙悟空", 18);
    p1.showPerson();
};

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
