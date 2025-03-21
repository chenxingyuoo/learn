//
//  main.cpp
//  1.内存分区模型
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

// 注意事项：不要返回局部变量的地址，栈区开辟的数据由编译器自动释放
int * func()
{
    int a = 10;
    return &a;
}

// 在C++中主要利用new在堆区开辟内存
int* func2()
{
    int * a = new int(10);
    return a;
}

int main(int argc, const char * argv[]) {
    
    int *p = func();

    cout << *p << endl;
    cout << *p << endl;
    
    // 
    int * p2 = func2();

    cout << *p2 << endl;
    cout << *p2 << endl;
    
    delete p2;
    
    cout << *p2 << endl;
    
    
    // 堆区开辟数组
    int* arr = new int[10];

    for (int i = 0; i < 10; i++)
    {
        arr[i] = i + 100;
    }

    for (int i = 0; i < 10; i++)
    {
        cout << arr[i] << endl;
    }
    //释放数组 delete 后加 []
    delete[] arr;

    
    return 0;
}
