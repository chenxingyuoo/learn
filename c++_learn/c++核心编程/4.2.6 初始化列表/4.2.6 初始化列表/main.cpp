//
//  main.cpp
//  4.2.6 初始化列表
//
//  Created by xingyu chen on 27/12/2023.
//

#include <iostream>
using namespace std;

class Person {
public:

    ////传统方式初始化
    //Person(int a, int b, int c) {
    //    m_A = a;
    //    m_B = b;
    //    m_C = c;
    //}

    //初始化列表方式初始化
    Person(int a, int b, int c) :m_A(a), m_B(b), m_C(c) {}
    
    void PrintPerson() {
        cout << "mA:" << m_A << endl;
        cout << "mB:" << m_B << endl;
        cout << "mC:" << m_C << endl;
    }
private:
    int m_A;
    int m_B;
    int m_C;
};

int main(int argc, const char * argv[]) {
    Person p(1, 2, 3);
    p.PrintPerson();
    
    return 0;
}
