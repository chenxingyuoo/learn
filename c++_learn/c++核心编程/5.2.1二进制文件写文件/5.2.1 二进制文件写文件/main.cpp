//
//  main.cpp
//  5.2.1 二进制文件写文件
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <fstream>
using namespace std;

class Person
{
public:
    char m_Name[64];
    int m_Age;
};

void test01(){
    //1、包含头文件

    //2、创建输出流对象
    ofstream ofs;
//    ofstream ofs("person.txt", ios::out | ios::binary);
    
    //3、打开文件
    ofs.open("/Users/xingyuchen/my_learn/c++_learn/c++核心编程/5.2.1二进制文件写文件/asset/person.txt", ios::out | ios::binary);
    
    Person p = {"张三"  , 18};
    
    //4、写文件
    ofs.write((const char *)&p, sizeof(Person));
    
    ofs.close();
};

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
