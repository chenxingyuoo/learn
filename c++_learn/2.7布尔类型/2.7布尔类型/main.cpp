//
//  main.cpp
//  2.7布尔类型
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

int main(int argc, const char * argv[]) {
    bool flag = true;
    cout << flag << endl; // 1

    flag = false;
    cout << flag << endl; // 0

    cout << "size of bool = " << sizeof(bool) << endl; //1
    
    return 0;
}
