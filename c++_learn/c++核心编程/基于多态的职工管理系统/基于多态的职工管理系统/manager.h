//
//  manager.h
//  基于多态的职工管理系统
//
//  Created by xingyu chen on 5/1/2024.
//
#include "worker.h"

//经理类
class Manager :public Worker
{
public:

    //构造函数
    Manager(int id, string name, int dId);

    //显示个人信息
    virtual void showInfo();

    //获取职工岗位名称
    virtual string getDeptName();
};



#ifndef manager_h
#define manager_h


#endif /* manager_h */
