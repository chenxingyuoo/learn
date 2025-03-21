//
//  main.cpp
//  3.2.3vector赋值操作
//
//  Created by xingyu chen on 14/1/2024.
//

#include <iostream>
#include <string>
using namespace std;
#include <vector>

//**函数原型：**
//
//* `vector& operator=(const vector &vec);`//重载等号操作符
//
//
//* `assign(beg, end);`       //将[beg, end)区间中的数据拷贝赋值给本身。
//* `assign(n, elem);`        //将n个elem拷贝赋值给本身。

void printVector(vector<int>& v){
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
        cout << *it << " ";
    }
    
    cout << endl;
}

//赋值操作
void test01(){
    vector<int> v1; //无参构造
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);
    
    vector<int>v2;
    v2 = v1;
    v2[0] = 10;
    printVector(v2);
    
    vector<int>v3;
    v3.assign(v2.begin(), v2.end());
    printVector(v3);

    vector<int>v4;
    v4.assign(10, 100);
    printVector(v4);
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
