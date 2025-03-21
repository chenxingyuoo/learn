//
//  main.cpp
//  2.4字符型
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

int main(int argc, const char * argv[]) {
    char ch = 'A';
    cout << ch << endl;
    cout << sizeof(char) << endl;

    //ch = "abcde"; //错误，不可以用双引号
    //ch = 'abcde'; //错误，单引号内只能引用一个字符

    cout << (int)ch << endl;  //查看字符a对应的ASCII码
    ch = 97; //可以直接用ASCII给字符型变量赋值
    cout << ch << endl;
    
    return 0;
}
