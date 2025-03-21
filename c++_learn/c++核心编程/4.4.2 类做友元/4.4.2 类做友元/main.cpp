//
//  main.cpp
//  4.4.2 类做友元
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
using namespace std;
#include <string>

class Building;

class GoodGay{
public:
    GoodGay();
    
    void visit();
private:
    Building *building;
};




class Building{
    //告诉编译器 goodGay类是Building类的好朋友，可以访问到Building类中私有内容
    friend class GoodGay;
public:
    Building();
//    Building(){
//        this->m_SittingRoom = "客厅";
//        this->m_BedRoom = "卧室";
//    }
public:
    string m_SittingRoom; // 客厅
private:
    string m_BedRoom; // 卧室
};

Building::Building(){
    this->m_SittingRoom = "客厅";
    this->m_BedRoom = "卧室";
};

GoodGay::GoodGay(){
    building = new Building;
};

void GoodGay::visit(){
    cout << "好基友正在访问" << building->m_SittingRoom << endl;
    cout << "好基友正在访问" << building->m_BedRoom << endl;
}

void test01(){
    GoodGay gg;
    gg.visit();
}


int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
