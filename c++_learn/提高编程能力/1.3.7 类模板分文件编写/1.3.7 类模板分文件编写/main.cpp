//
//  main.cpp
//  1.3.7 类模板分文件编写
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
using namespace std;
#include "person.hpp"

void test01(){
    Person<string, int> p("孙悟空", 99);
    p.showPerson();
}

int main(int argc, const char * argv[]) {
    test01();
    
    return 0;
}
