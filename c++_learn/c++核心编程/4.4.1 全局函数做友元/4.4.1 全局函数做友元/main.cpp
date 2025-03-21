//
//  main.cpp
//  4.4.1 全局函数做友元
//
//  Created by xingyu chen on 1/1/2024.
//

#include <iostream>
using namespace std;
#include <string>

class Building{
    //告诉编译器 goodGay全局函数 是 Building类的好朋友，可以访问类中的私有内容
    friend void goodGay(Building *b);
    
public:
    Building(){
        this->m_SittingRoom = "客厅";
        this->m_BedRoom = "卧室";
    }
public:
    string m_SittingRoom; // 客厅
private:
    string m_BedRoom; // 卧室
};

void goodGay(Building *building){
    cout << "好基友正在访问： " << building->m_SittingRoom << endl;
    
    cout << "好基友正在访问： " << building->m_BedRoom << endl;
};


int main(int argc, const char * argv[]) {
    Building b;
    goodGay(&b);
    return 0;
}
