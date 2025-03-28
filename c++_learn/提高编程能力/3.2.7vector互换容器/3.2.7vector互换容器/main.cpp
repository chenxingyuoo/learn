//
//  main.cpp
//  3.2.7vector互换容器
//
//  Created by xingyu chen on 14/1/2024.
//

#include <iostream>
#include <string>
#include <vector>
using namespace std;

//**函数原型：**
//
//* `swap(vec);`  // 将vec与本身的元素互换

void printVector(vector<int>& v) {

    for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
}

void test01(){
    vector<int>v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);

    vector<int>v2;
    for (int i = 10; i > 0; i--)
    {
        v2.push_back(i);
    }
    printVector(v2);
    
    //互换容器
    cout << "互换后" << endl;
    v1.swap(v2);
    printVector(v1);
    printVector(v2);
}

void test02(){
    vector<int> v;
    for (int i = 0; i < 100000; i++) {
        v.push_back(i);
    }

    cout << "v的容量为：" << v.capacity() << endl;
    cout << "v的大小为：" << v.size() << endl;
    
    v.resize(3);
    
    cout << "v的容量为：" << v.capacity() << endl;
        cout << "v的大小为：" << v.size() << endl;
    
    //收缩内存
        vector<int>(v).swap(v); //匿名对象
    cout << "v的容量为：" << v.capacity() << endl;
        cout << "v的大小为：" << v.size() << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    
    return 0;
}
