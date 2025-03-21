//
//  main.cpp
//  5.1.2读文件
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <fstream>
using namespace std;

void test01(){
    ifstream ifs;
    ifs.open("/Users/xingyuchen/my_learn/c++_learn/c++核心编程/5.1.1写文件/asset/test.txt", ios::in);
    
    if (!ifs.is_open())
    {
        cout << "文件打开失败" << endl;
        return;
    }
    
    //第一种方式
//    char buf[1024] = { 0 };
//    while (ifs >> buf)
//    {
//        cout << buf << endl;
//    }
    
    //第二种
//    char buf[1024] = { 0 };
//    while (ifs.getline(buf, sizeof(buf)))
//    {
//        cout << buf << endl;
//    }
    
    //第三种
    string buf;
    while (getline(ifs, buf))
    {
        cout << buf << endl;
    }
    
    // 第四种，一个一个字符读取，不推荐
//    char c;
//    while ((c = ifs.get()) != EOF)
//    {
//        cout << c;
//    }
    
    ifs.close();
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
