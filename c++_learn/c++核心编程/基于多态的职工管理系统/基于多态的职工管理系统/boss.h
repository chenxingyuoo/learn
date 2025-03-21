//
//  boss.h
//  基于多态的职工管理系统
//
//  Created by xingyu chen on 5/1/2024.
//

#include "worker.h"

//老板类
class Boss :public Worker
{
public:

    //构造函数
    Boss(int id, string name, int dId);

    //显示个人信息
    virtual void showInfo();

    //获取职工岗位名称
    virtual string getDeptName();
};

#ifndef boss_h
#define boss_h


#endif /* boss_h */
