//
//  main.cpp
//  5.1.1写文件
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <fstream>
using namespace std;

void test01(){
    ofstream ofs;
    
    ofs.open("/Users/xingyuchen/my_learn/c++_learn/c++核心编程/5.1.1写文件/asset/test.txt", ios::out);
    
    ofs << "姓名：张三" << endl;
    ofs << "年龄：18" << endl;
    ofs << "性别：男" << endl;
    
    ofs.close();
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
