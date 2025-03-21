//
//  main.cpp
//  3.3.7deque排序
//
//  Created by xingyu chen on 14/1/2024.
//

#include <iostream>
#include <string>
#include <deque>
#include <algorithm>
using namespace std;

//**算法：**
//
//* `sort(iterator beg, iterator end)`  //对beg和end区间内元素进行排序

void printDeque(const deque<int>& d){
    for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++) {
        cout << *it << " ";
    }
    cout << endl;
}

void test01(){
    deque<int> d;
    d.push_back(10);
    d.push_back(20);
    d.push_front(100);
    d.push_front(200);

    printDeque(d);
    
    sort(d.begin(), d.end());
    printDeque(d);

}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
