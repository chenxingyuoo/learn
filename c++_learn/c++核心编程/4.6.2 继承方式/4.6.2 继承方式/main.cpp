//
//  main.cpp
//  4.6.2 继承方式
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Base1
{
public:
    int m_A;
protected:
    int m_B;
private:
    int m_C;
};

//公共继承
class Son1 :public Base1
{
public:
    void func()
    {
        m_A = 10; //可访问 public权限
        m_B = 20; //可访问 protected权限
        //m_C; //不可访问
    }
};

// 保护继承


void test01(){
    Son1 s1;
    s1.m_A = 100; // 其他类只能访问到公共权限
//    s1.m_B = 200; // 保护权限类外不能访问
    //其他类只能访问到公共权限
    cout << s1.m_A << endl;

}

//保护继承
class Base2
{
public:
    int m_A;
protected:
    int m_B;
private:
    int m_C;
};

class Son2 : protected Base2 {
public:
    void func()
    {
        m_A = 10; //可访问 protected权限
        m_B = 20; //可访问 protected权限
        //m_C; //不可访问
    }
};

void test02(){
    Son2 s2;
//    s2.m_A; //类外不可访问
}

//私有继承
class Base3
{
public:
    int m_A;
protected:
    int m_B;
private:
    int m_C;
};

class Son3 : private Base3{
public:
    void func(){
        m_A = 10; //可访问 private权限
        m_B = 20; //可访问 private权限
//        m_C = 30; //不可访问
    }
};


class GrandSon3 : public Son3 {
public:
    void func(){
        //Son3是私有继承，所以继承Son3的属性在GrandSon3中都无法访问到
//        m_A = 10;
//        m_B = 20;
//        m_C = 30;
    }
};

void test03(){
    Son3 s3;
//    s3.m_A = 100; //类外不可访问
    
    GrandSon3 gs3;
    gs3.func();
}


int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    test03();
    
    return 0;
}
