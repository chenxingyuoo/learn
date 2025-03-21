//
//  workerManager.h
//  基于多态的职工管理系统
//
//  Created by xingyu chen on 5/1/2024.
//

#pragma once
#include<iostream>
#include <fstream>
using namespace std;
#include "worker.h"

#define  FILENAME "/Users/xingyuchen/my_learn/c++_learn/empFile.txt"

class WorkerManager
{
public:

    //构造函数
    WorkerManager();
    
    // 显示菜单
    void Show_Menu();
    
    // 退出系统
    void exitSystem();
    
    //增加职工
    void Add_Emp();
    
    //保存文件
    void save();
    
    // 从文件获取职工数
    int get_EmpNum();
    
    //初始化员工
    void init_Emp();
    
    //显示职工
    void Show_Emp();
    
    // 删除职工
    void Del_Emp();
    
    //按照职工编号判断职工是否存在,若存在返回职工在数组中位置，不存在返回-1
    int IsExist(int id);
    
    //按照职工名称判断职工是否存
    int IsExistByName(string name);
    
    //修改职工
    void Mod_Emp();
    
    //查找职工
    void Find_Emp();
    
    //排序职工
    void Sort_Emp();
    
    //清空文件
    void Clean_File();

    //析构函数
    ~WorkerManager();
    
    //记录文件中的人数个数
    int m_EmpNum;

    //员工数组的指针
    Worker ** m_EmpArray;

    //标志文件是否为空
    bool m_FileIsEmpty;
};

#ifndef workerManager_h
#define workerManager_h


#endif /* workerManager_h */
