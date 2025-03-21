//
//  main.cpp
//  4.7.5 虚析构和纯虚析构
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

class Animal{
public:
    Animal(){
        cout << "Animal 构造函数" << endl;
    }
    //析构函数加上virtual关键字，变成虚析构函数
//    virtual ~Animal(){
//        cout << "Animal 虚析构函数" << endl;
//    }
    // 纯虚析构
    virtual ~Animal() = 0;
    
    virtual void speak() = 0;
};

Animal::~Animal(){
    cout << "Animal 纯虚析构函数" << endl;
}

class Cat : public Animal{
public:
    Cat(string name){
        m_NAme = new string(name);
        cout << "Cat 构造函数" << endl;
    }
    ~Cat(){
        if (m_NAme != NULL) {
            cout << "Cat 析构函数" << endl;
            delete m_NAme;
            m_NAme = NULL;
        }
        
    }
    virtual void speak(){
        cout << *m_NAme << "小猫在喵喵" << endl;
    }
    string * m_NAme;
};

void test01(){
    Animal * animal = new Cat("Tom");
    
    animal->speak();
    delete animal;
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
