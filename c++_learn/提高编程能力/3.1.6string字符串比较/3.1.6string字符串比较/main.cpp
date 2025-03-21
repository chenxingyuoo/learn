//
//  main.cpp
//  3.1.6string字符串比较
//
//  Created by xingyu chen on 9/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//**功能描述：**
//
//* 字符串之间的比较
//
//**比较方式：**
//
//* 字符串比较是按字符的ASCII码进行对比
//
//= 返回   0
//
//\> 返回   1
//
//< 返回  -1
//
//
//
//**函数原型：**
//
//* `int compare(const string &s) const; `  //与字符串s比较
//* `int compare(const char *s) const;`      //与字符串s比较

void test01(){
    string s1 = "hello";
    string s2 = "aello";
    
    int ret = s1.compare(s2);
    
    if (ret == 0) {
        cout << "s1 等于 s2" << endl;
    }
    else if (ret > 0)
    {
        cout << "s1 大于 s2" << endl;
    }
    else
    {
        cout << "s1 小于 s2" << endl;
    }
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
