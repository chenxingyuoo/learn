//
//  main.cpp
//  3.2 函数占位参数
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

//函数占位参数 ，占位参数也可以有默认参数
void func(int a, int) {
    cout << "this is func" << endl;
}

int main(int argc, const char * argv[]) {
    func(10,10); //占位参数必须填补
    
    return 0;
}
