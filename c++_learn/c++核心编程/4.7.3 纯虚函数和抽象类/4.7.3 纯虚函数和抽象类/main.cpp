//
//  main.cpp
//  4.7.3 纯虚函数和抽象类
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Base
{
public:
    //纯虚函数
    //类中只要有一个纯虚函数就称为抽象类
    //抽象类无法实例化对象
    //子类必须重写父类中的纯虚函数，否则也属于抽象类
    virtual void func() = 0;
};

class Son :public Base{
public:
    virtual void func(){
        cout << "func调用" << endl;
    }
};

void test01(){
    Base * base = NULL;
//    base = new Base; // 错误，抽象类无法实例化对象
    
    base = new Son;
    base->func();
    delete base;//记得销毁
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
