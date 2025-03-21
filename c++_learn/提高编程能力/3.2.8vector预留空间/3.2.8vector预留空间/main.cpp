//
//  main.cpp
//  3.2.8vector预留空间
//
//  Created by xingyu chen on 14/1/2024.
//

#include <iostream>
#include <string>
#include <vector>
using namespace std;

//**函数原型：**
//
//* `reserve(int len);`//容器预留len个元素长度，预留位置不初始化，元素不可访问。

void test01(){
    vector<int> v;

    //预留空间
    v.reserve(100000);
    
    int num = 0;
    int* p = NULL;
    for (int i = 0; i < 100000; i++) {
        v.push_back(i);
        if (p != &v[0]) {
            p = &v[0];
            num++;
        }
    }

    cout << "num:" << num << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
