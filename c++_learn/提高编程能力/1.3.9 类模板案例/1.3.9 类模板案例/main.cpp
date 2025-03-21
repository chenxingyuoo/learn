//
//  main.cpp
//  1.3.9 类模板案例
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
using namespace std;
#include "myArray.hpp"



template<class T>
void printArray(MyArray<T>& arr) {
    for (int i = 0; i < arr.getSize(); i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

//测试内置数据类型
void test01()
{
    MyArray<int> array1(10);
    array1.Push_back(1);
    array1.Push_back(2);
    
    cout << "array1打印输出：" << endl;
    printArray(array1);
    cout << "array1的大小：" << array1.getSize() << endl;
    cout << "array1的容量：" << array1.getCapacity() << endl;
    
    // operator= 深拷贝
    MyArray<int> array11(10);
    array11 = array1;
    
    // 拷贝构造 深拷贝
    MyArray<int> array12(array1);
    
    cout << "array11的大小：" << array11.getSize() << endl;
}

//测试内置数据类型
void test02(){
    MyArray<string> array2(20);
    array2.Push_back("hello");
    array2.Push_back("c++");
    array2.Pop_back();
    
    cout << "array2打印输出：" << endl;
    printArray(array2);
    cout << "array2的大小：" << array2.getSize() << endl;
    cout << "array2的容量：" << array2.getCapacity() << endl;
    
}

//测试自定义数据类型
class Person {
public:
    Person() {}
        Person(string name, int age) {
        this->m_Name = name;
        this->m_Age = age;
    }
public:
    string m_Name;
    int m_Age;
};

// 打印自定义数据类型
void printPersonArray(MyArray<Person> &arr){
    for (int i = 0; i < arr.getSize(); i++) {
        cout << "name: " << arr[i].m_Name << "age: " << arr[i].m_Age << endl;
    }
}

void test03(){
    //创建数组
    MyArray<Person> pArray(10);
    
    Person p1("孙悟空", 30);
    Person p2("韩信", 20);
    Person p3("妲己", 18);
    Person p4("王昭君", 15);
    Person p5("赵云", 24);
    
    //插入数据
    pArray.Push_back(p1);
    pArray.Push_back(p2);
    pArray.Push_back(p3);
    pArray.Push_back(p4);
    pArray.Push_back(p5);
    
    printPersonArray(pArray);
    cout << "pArray的大小：" << pArray.getSize() << endl;
    cout << "pArray的容量：" << pArray.getCapacity() << endl;
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    test03();
    
    return 0;
}
