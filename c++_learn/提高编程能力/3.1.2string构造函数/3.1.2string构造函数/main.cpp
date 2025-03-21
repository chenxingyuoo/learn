//
//  main.cpp
//  3.1.2string构造函数
//
//  Created by xingyu chen on 9/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//string构造
void test01(){
    string s1; //创建空字符串，调用无参构造函数
    cout << "str1 = " << s1 << endl;
    
    const char* str = "hello world";
    string s2(str); //把c_string转换成了string
    cout << "str2 = " << s2 << endl;

    string s3(s2); //调用拷贝构造函数
    s3 = s3 + "!!!";
    cout << "str3 = " << s3 << endl;
    
    string s4(10, 'a');
    cout << "str4 = " << s4 << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
