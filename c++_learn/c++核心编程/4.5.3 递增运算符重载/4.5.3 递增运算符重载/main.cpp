//
//  main.cpp
//  4.5.3 递增运算符重载
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class MyInteger {
    friend ostream& operator<<(ostream &out, MyInteger myInteger);
public:
    MyInteger() {
        m_Num = 0;
    }
    
    //重置 前置++
    MyInteger& operator++(){
        m_Num++;
        return *this;
    }
    
    // 重置 后置++
    MyInteger operator++(int) {
        //记录当前本身的值，然后让本身的值加1，但是返回的是以前的值，达到先返回后++；
        MyInteger temp = *this;
        m_Num++;
        return temp;
    }
    
private:
    int m_Num;
};


ostream& operator<<(ostream &out, MyInteger myInteger) {
    out << myInteger.m_Num;
    return out;
}

//前置++ 先++ 再返回
void test01() {
    MyInteger myInt;
    cout << ++(++myInt) << endl;
    cout << myInt << endl;
}

//后置++ 先返回 再++
void test02() {

    MyInteger myInt;
    cout << myInt++ << endl;
    cout << myInt << endl;
}

int main(int argc, const char * argv[]) {
//    test01();
    
    test02();
    return 0;
}
