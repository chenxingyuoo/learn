//
//  main.cpp
//  4.2.1 构造函数和析构函数
//
//  Created by xingyu chen on 27/12/2023.
//

#include <iostream>
using namespace std;


class Person{
public:
    //构造函数
    Person()
    {
        cout << "Person的构造函数调用" << endl;
    }
    //析构函数
    ~Person()
    {
        cout << "Person的析构函数调用" << endl;
    }
    
};

void test01()
{
    Person p;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
