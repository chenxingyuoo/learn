//
//  main.cpp
//  3.3.6deque数据存取
//
//  Created by xingyu chen on 14/1/2024.
//

#include <iostream>
#include <string>
#include <deque>
using namespace std;

//**函数原型：**
//
//- `at(int idx); `     //返回索引idx所指的数据
//- `operator[]; `      //返回索引idx所指的数据
//- `front(); `            //返回容器中第一个数据元素
//- `back();`              //返回容器中最后一个数据元素

void printDeque(const deque<int>& d){
    for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
}

//数据存取
void test01(){
    deque<int> d;
    d.push_back(10);
    d.push_back(20);
    d.push_front(100);
    d.push_front(200);
    
    for (int i = 0; i < d.size(); i++) {
        cout << d[i] << " ";
    }
    cout << endl;
    
    for (int i = 0; i < d.size(); i++) {
        cout << d.at(i) << " ";
    }
    cout << endl;
    
    cout << "front:" << d.front() << endl;

    cout << "back:" << d.back() << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
