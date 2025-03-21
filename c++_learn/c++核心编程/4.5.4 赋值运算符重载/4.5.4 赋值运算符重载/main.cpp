//
//  main.cpp
//  4.5.4 赋值运算符重载
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Person{
public:
    Person(int age){
        //将年龄数据开辟到堆区
        m_Age = new int(age);
    }
    ~Person(){
        if (m_Age != NULL)
        {
            delete m_Age;
            m_Age = NULL;
        }
    }
    
    // 重载赋值运算符
    Person& operator=(Person &p){
        
        if (m_Age != NULL)
        {
            delete m_Age;
            m_Age = NULL;
        }
        
        //编译器提供的代码是浅拷贝
        //m_Age = p.m_Age;
        
        //提供深拷贝 解决浅拷贝的问题
        m_Age = new int(*p.m_Age);
        
        return *this;
    }
    
    //年龄的指针
    int *m_Age;
};

void test01(){
    Person p1(10);
    
    Person p2(20);
    
    Person p3(30);

    
    p3 = p2 = p1;
    
    cout << "p1的年龄为：" << *p1.m_Age << endl;
    
    cout << "p2的年龄为：" << *p2.m_Age << endl;
    
    cout << "p3的年龄为：" << *p3.m_Age << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    int a = 10;
        int b = 20;
        int c = 30;

        c = b = a;
        cout << "a = " << a << endl;
        cout << "b = " << b << endl;
        cout << "c = " << c << endl;
    
    return 0;
}
