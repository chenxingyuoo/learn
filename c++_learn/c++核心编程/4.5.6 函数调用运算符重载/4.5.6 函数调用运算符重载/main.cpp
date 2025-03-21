//
//  main.cpp
//  4.5.6 函数调用运算符重载
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class MyPrint{
public:
    void operator()(string text) {
        cout << text << endl;
    }
};

void test01(){
    MyPrint myFunc;
    
    myFunc("hello world");
}

class MyAdd
{
public:
    int operator()(int v1, int v2)
    {
        return v1 + v2;
    }
};

void test02(){
    MyAdd add;
 
    int num = add(10, 20);
    
    cout << "num = " << num << endl;
    
    //匿名对象调用
    cout << "MyAdd()(100,100) = " << MyAdd()(100, 100) << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    return 0;
}
