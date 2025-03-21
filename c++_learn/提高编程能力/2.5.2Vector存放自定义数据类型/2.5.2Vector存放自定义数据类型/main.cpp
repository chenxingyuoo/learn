//
//  main.cpp
//  2.5.2Vector存放自定义数据类型
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
using namespace std;
#include <string>
#include <vector>
#include <algorithm>

//自定义数据类型
class Person {
public:
    Person(string name, int age) {
        mName = name;
        mAge = age;
    }
public:
    string mName;
    int mAge;
};

void printPerson(Person &p){
    cout << "mName:" << p.mName << endl;
}

void test01(){
    vector<Person> v;

    //创建数据
    Person p1("aaa", 10);
    Person p2("bbb", 20);
    Person p3("ccc", 30);
    Person p4("ddd", 40);
    Person p5("eee", 50);

    v.push_back(p1);
    v.push_back(p2);
    v.push_back(p3);
    v.push_back(p4);
    v.push_back(p5);
    
    // it是一个指针
    for (vector<Person>::iterator it = v.begin(); it != v.end(); it++) {
        cout << "mName:" << (*it).mName << endl;
        cout << "mAge:" << it->mAge << endl;
        
    }
    
    for_each(v.begin(), v.end(), printPerson);
}

//放对象指针
void test02() {
    vector<Person *> v;
    
    //创建数据
    Person p1("111", 10);
    Person p2("222", 20);
    Person p3("333", 30);
    Person p4("444", 40);
    Person p5("555", 50);

    v.push_back(&p1);
    v.push_back(&p2);
    v.push_back(&p3);
    v.push_back(&p4);
    v.push_back(&p5);
    
    for (vector<Person *>::iterator it = v.begin(); it != v.end(); it++) {
        Person * p = (*it);
        cout << "mName:" << p->mName << endl;
    }
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    return 0;
}
