//
//  main.cpp
//  5.2.2二进制文件读文件
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

// 写文件
void test01(){
    //1、包含头文件

    //2、创建输出流对象
    ofstream ofs;
//    ofstream ofs("person.txt", ios::out | ios::binary);
    
    //3、打开文件
    ofs.open("/Users/xingyuchen/my_learn/c++_learn/c++核心编程/5.2.2二进制文件读文件/asset/person.txt", ios::out | ios::binary);
    
    Person p = {"张三"  , 18};
    
    //4、写文件
    ofs.write((const char *)&p, sizeof(Person));
    
    ofs.close();
};

// 读文件
void test02(){
    ifstream ifs;
    
    ifs.open("/Users/xingyuchen/my_learn/c++_learn/c++核心编程/5.2.2二进制文件读文件/asset/person.txt", ios::in | ios::binary);
    
    if (!ifs.is_open()) {
        cout << "打不开文件" << endl;
        return;
    };
    
    Person p;
    
    ifs.read((char *)&p, sizeof(p));
    
    cout << "m_Name = " << p.m_Name << "m_Age = " << p.m_Age << endl;

    
    ifs.close();
};


int main(int argc, const char * argv[]) {
//    test01();
    
    test02();
    
    return 0;
}
