//
//  main.cpp
//  2.5.1vector存放内置数据类型
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void MyPrint(int val)
{
    cout << val << endl;
}

void test01(){
    //创建vector容器对象，并且通过模板参数指定容器中存放的数据的类型
    vector<int> v;
    
    //向容器中放数据
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.push_back(40);
    
    vector<int>::iterator pBegin = v.begin();
    vector<int>::iterator pEnd = v.end();
    
    //第一种遍历方式：
    while (pBegin != pEnd) {
        cout << *pBegin << endl;
        pBegin++;
    }
    
    //第二种遍历方式：
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
        cout << *it << endl;;

    }
    
    //第三种遍历方式：
    //使用STL提供标准遍历算法  头文件 algorithm
    for_each(v.begin(), v.end(), MyPrint);
    // 传递匿名函数
//    for_each(v.begin(), v.end(), [&](int val) {
//        cout << val << endl;
//
//    });
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
