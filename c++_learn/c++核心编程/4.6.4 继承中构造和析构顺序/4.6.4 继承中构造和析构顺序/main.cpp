//
//  main.cpp
//  4.6.4 继承中构造和析构顺序
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Base
{
public:
    Base()
    {
        cout << "Base构造函数!" << endl;
    }
    ~Base()
    {
        cout << "Base析构函数!" << endl;
    }
};

class Son : public Base
{
public:
    Son()
    {
        cout << "Son构造函数!" << endl;
    }
    ~Son()
    {
        cout << "Son析构函数!" << endl;
    }

};


void test01()
{
    //继承中 先调用父类构造函数，再调用子类构造函数，析构顺序与构造相反
    Son s;
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
