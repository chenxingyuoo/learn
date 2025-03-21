//
//  main.cpp
//  2.5.3Vector容器嵌套容器二维
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
using namespace std;
#include <vector>

//容器嵌套容器
void test01() {
    vector<vector<int>> v;
    
    vector<int> v1;
    vector<int> v2;
    vector<int> v3;
    vector<int> v4;
    
    for (int i = 0; i < 4; i++) {
        v1.push_back(i + 1);
        v2.push_back(i + 2);
        v3.push_back(i + 3);
        v4.push_back(i + 4);
    }
    
    //将容器元素插入到vector v中
    v.push_back(v1);
    v.push_back(v2);
    v.push_back(v3);
    v.push_back(v4);
    
    for (vector<vector<int>>::iterator it = v.begin(); it != v.end(); it++) {
        // 使用指针方式
        for (vector<int>::iterator it2 = it->begin(); it2 != it->end(); it2++) {
            cout << *it2 << " ";
        }
        
        // 解构指针
        for (vector<int>::iterator vit = (*it).begin(); vit != (*it).end(); vit++) {
            cout << *vit << " ";
        }
        
        cout << endl;
    }
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
