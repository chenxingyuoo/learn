//
//  myArray.hpp
//  1.3.9 类模板案例
//
//  Created by xingyu chen on 8/1/2024.
//
#pragma once
#include <iostream>
using namespace std;

template<class T>
class MyArray{
public:
    // 构造函数
    MyArray(int capacity){
        this->m_Capacity = capacity;
        this->m_Size = 0;
        this->pAddress = new T[this->m_Capacity];
    }
    
    //拷贝构造
    MyArray(const MyArray & arr){
        this->m_Capacity = arr.m_Capacity;
        this->m_Size = arr.m_Size;
        this->pAddress = new T[this->m_Capacity];
        for (int i = 0; i < this->m_Size; i++)
        {
            //如果T为对象，而且还包含指针，必须需要重载 = 操作符，因为这个等号不是 构造 而是赋值，
            // 普通类型可以直接= 但是指针类型需要深拷贝
            this->pAddress[i] = arr.pAddress[i];
        }
    }
    
    //重载[] 操作符  arr[0]
    T& operator[] (int index) {
        return this->pAddress[index];
    }
    
    //重载= 操作符  防止浅拷贝问题
    MyArray& operator= (const MyArray& newArray) {
        if(this->pAddress != NULL){
            delete[] this->pAddress;
            this->pAddress = NULL;
            this->m_Capacity = 0;
            this->m_Size = 0;
        }
        
        this->m_Capacity = newArray.m_Capacity;
        this->m_Size = newArray.m_Size;
        this->pAddress = new T[this->m_Capacity];
        for(int i = 0; i< newArray.m_Size; i++){
            this->pAddress[i] = newArray.pAddress[i];
        }
        return *this;
    }
    
    //尾插法
    void Push_back(const T &val){
        if (this->m_Capacity == this->m_Size) {
            cout << "容量已满" << endl;
            return;
        }
        this->pAddress[this->m_Size] = val;
        this->m_Size++;
    }
    //尾删法
    void Pop_back(){
        if (this->m_Size == 0)
        {
            return;
        }
        this->m_Size--;
    }
    
    //获取数组容量
    int getCapacity()
    {
        return this->m_Capacity;
    }

    //获取数组大小
    int getSize()
    {
        return this->m_Size;
    }
    
    // 通过索引获取值
    T& getAddressValByIndex(int index){
        return this->pAddress[index];
    }
    
    // 析构
    ~MyArray(){
        if(this->pAddress != NULL){
            delete[] this->pAddress;
            this->pAddress = NULL;
            this->m_Capacity = 0;
            this->m_Size = 0;
        }
    }
private:
    T *pAddress;
    int m_Capacity;
    int m_Size;
};

#ifndef myArray_h
#define myArray_h


#endif /* myArray_h */
