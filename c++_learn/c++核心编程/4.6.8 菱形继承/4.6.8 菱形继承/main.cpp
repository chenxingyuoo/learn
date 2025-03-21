//
//  main.cpp
//  4.6.8 菱形继承
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Animal{
public:
    int m_Age;
};

//继承前加virtual关键字后，变为虚继承
//此时公共的父类Animal称为虚基类
class Sheep:virtual public Animal{
    
};

class Tuo:virtual public Animal{};

class SheepTuo: public Sheep, public Tuo{
    
};

void test01(){
    SheepTuo st;
    st.Sheep::m_Age = 10;
    st.Tuo::m_Age = 20;
    
    cout << "st.Sheep::m_Age =" << st.Sheep::m_Age << endl;
    cout << "st.Tuo::m_Age =" << st.Tuo::m_Age << endl;
    
    cout << "st.m_Age =" << st.m_Age << endl;
    
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
