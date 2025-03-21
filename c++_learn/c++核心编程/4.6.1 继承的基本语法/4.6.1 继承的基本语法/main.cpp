//
//  main.cpp
//  4.6.1 继承的基本语法
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//公共页面
class BasePage
{
public:
    BasePage(){
        m_A = 10;
        m_B = 20;
    }
    void header()
    {
        cout << "首页、公开课、登录、注册...（公共头部）" << endl;
    }

    void footer()
    {
        cout << "帮助中心、交流合作、站内地图...(公共底部)" << endl;
    }
    void left()
    {
        cout << "Java,Python,C++...(公共分类列表)" << endl;
    }
public:
    int m_A;
private:
    int m_B;
};

// JAVA页面
class Java : public BasePage{
public:
    void content(){
        cout << "Java 内容" << endl;
    }
};

// Python页面
class Python : public BasePage{
public:
    void content(){
        cout << "Python 内容" << endl;
    }
};

// Cpp页面
class Cpp : public BasePage{
public:
    void content(){
        cout << "Cpp 内容" << endl;
    }
};

void test01(){
    //Java页面
    cout << "Java下载视频页面如下： " << endl;
    Java ja;
    ja.header();
    ja.footer();
    ja.left();
    ja.content();
    cout << ja.m_A << endl;
    cout << "--------------------" << endl;

    //Python页面
    cout << "Python下载视频页面如下： " << endl;
    Python py;
    py.header();
    py.footer();
    py.left();
    py.content();
    cout << "--------------------" << endl;

    //C++页面
    cout << "C++下载视频页面如下： " << endl;
    Cpp cp;
    cp.header();
    cp.footer();
    cp.left();
    cp.content();
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
