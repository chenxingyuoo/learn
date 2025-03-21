//
//  main.cpp
//  3.2.2vector构造函数
//
//  Created by xingyu chen on 9/1/2024.
//

#include <iostream>
#include <string>
using namespace std;
#include <vector>

void printVector(vector<int>& v){
    for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
        cout << *it << " ";
    }
    
    cout << endl;
}

void test01(){
    //默认构造，无参构造
    vector<int> v1;
    
    for (int i = 0; i < 10; i++) {
        v1.push_back(i + 1);
    }
    
    printVector(v1);
    
    
    //将v[begin(), end())区间中的元素拷贝给本身。
    vector<int> v2(v1.begin(), v1.end());
    printVector(v2);

    //构造函数将n个elem拷贝给本身。
    vector<int> v3(10, 100);
    printVector(v3);
    
    //拷贝构造函数。
    vector<int> v4(v3);
    printVector(v4);
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
