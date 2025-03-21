//
//  main.cpp
//  4.3.3 空指针访问成员函数
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
using namespace std;

//空指针访问成员函数
class Person {
public:

    void ShowClassName() {
        cout << "我是Person类!" << endl;
    }

    void ShowPerson() {
        if (this == NULL) {
            return;
        }
        cout << this->mAge << endl;
    }

public:
    int mAge;
};

void test01(){
    Person *p = NULL;
    p->ShowClassName();
    p->ShowPerson();
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
