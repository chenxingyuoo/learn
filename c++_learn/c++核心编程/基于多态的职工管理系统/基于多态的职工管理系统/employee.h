//
//  employee.h
//  基于多态的职工管理系统
//
//  Created by xingyu chen on 5/1/2024.
//
#pragma once
#include<iostream>
using namespace std;
#include "worker.h"

//员工类
class Employee :public Worker
{
public:

    //构造函数
    Employee(int id, string name, int dId);

    //显示个人信息
    virtual void showInfo();

    //获取职工岗位名称
    virtual string getDeptName();
};

#ifndef employee_h
#define employee_h


#endif /* employee_h */
