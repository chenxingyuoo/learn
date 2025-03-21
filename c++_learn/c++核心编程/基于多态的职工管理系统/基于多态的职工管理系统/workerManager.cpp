//
//  workerManager.cpp
//  基于多态的职工管理系统
//
//  Created by xingyu chen on 5/1/2024.
//

#include "workerManager.h"
#include "worker.h"
#include "employee.h"
#include "manager.h"
#include "boss.h"


WorkerManager::WorkerManager(){
    ifstream ifs;
    
    ifs.open(FILENAME, ios::in);
    
    if (!ifs.is_open()){
        cout << "文件不存在" << endl; //测试输出
        this->m_EmpNum = 0;  //初始化人数
        this->m_FileIsEmpty = true; //初始化文件为空标志
        this->m_EmpArray = NULL; //初始化数组
        ifs.close(); //关闭文件
        return;
    }
    
    //文件存在，并且没有记录
    char ch;
    ifs >> ch;
    if (ifs.eof()) {
        cout << "文件为空!" << endl;
        this->m_EmpNum = 0;
        this->m_FileIsEmpty = true;
        this->m_EmpArray = NULL;
        ifs.close();
        return;
    }
    
    int num =  this->get_EmpNum();
    cout << "职工个数为：" << num << endl;  //测试代码
    this->m_EmpNum = num;
    
    //根据职工数创建数组
    if (this->m_EmpNum != 0) {
        this->m_EmpArray = new Worker *[this->m_EmpNum];
        //初始化职工
        this->init_Emp();
        
        //测试代码
        for (int i = 0; i < m_EmpNum; i++)
        {
            cout << "职工号： " << this->m_EmpArray[i]->m_Id
                << " 职工姓名： " << this->m_EmpArray[i]->m_Name
                << " 部门： " << this->m_EmpArray[i]->getDeptName() << endl;
        }
    }
    
}

void WorkerManager::Show_Menu(){
    cout << "********************************************" << endl;
    cout << "*********  欢迎使用职工管理系统！ **********" << endl;
    cout << "*************  0.退出管理程序  *************" << endl;
    cout << "*************  1.增加职工信息  *************" << endl;
    cout << "*************  2.显示职工信息  *************" << endl;
    cout << "*************  3.删除离职职工  *************" << endl;
    cout << "*************  4.修改职工信息  *************" << endl;
    cout << "*************  5.查找职工信息  *************" << endl;
    cout << "*************  6.按照编号排序  *************" << endl;
    cout << "*************  7.清空所有文档  *************" << endl;
    cout << "********************************************" << endl;
    cout << endl;
}

void WorkerManager::exitSystem()
{
    cout << "欢迎下次使用" << endl;
    exit(0);
}


void WorkerManager::Add_Emp()
{
    cout << "请输入增加职工数量： " << endl;
    
    int addNum = 0;
    cin >> addNum;
    
    if (addNum > 0){
        //计算新空间大小
        int newSize = this->m_EmpNum + addNum;
        
        //开辟新空间
        Worker ** newSpace = new Worker*[newSize];
        
        //将原空间下内容存放到新空间下
        if (this->m_EmpArray != NULL)
        {
            for (int i = 0; i < this->m_EmpNum; i++)
            {
                newSpace[i] = this->m_EmpArray[i];
            }
        }
        
        //输入新数据
        for (int i = 0; i < addNum; i++)
        {
            int id;
            string name;
            int dSelect;
            
            cout << "请输入第 " << i + 1 << " 个新职工编号：" << endl;
            cin >> id;
            
            cout << "请输入第 " << i + 1 << " 个新职工姓名：" << endl;
            cin >> name;
            
            cout << "请选择该职工的岗位：" << endl;
            cout << "1、普通职工" << endl;
            cout << "2、经理" << endl;
            cout << "3、老板" << endl;
            cin >> dSelect;
            
            Worker * worker = NULL;
            switch(dSelect){
                case 1: //普通员工
                    worker = new Employee(id, name, dSelect);
                    break;
                case 2: //经理
                    worker = new Manager(id, name, dSelect);
                    break;
                case 3: //老板
                    worker = new Boss(id, name, dSelect);
                    break;
                default:
                    break;
            }
            newSpace[this->m_EmpNum + i] = worker;
            
        }
        
        //释放原有空间
        delete [] this->m_EmpArray;
        
        //更改新空间的指向
        this->m_EmpArray = newSpace;
        
        //更新新的个数
        this->m_EmpNum = newSize;
        
        // 文件不为空
        this->m_FileIsEmpty = false;
        
        // 保存文件
        this->save();
        
        //提示信息
        cout << "成功添加" << addNum << "名新职工！" << endl;

    }else {
        cout << "输入有误" << endl;
    }
}

// 保存文件功能实现
void WorkerManager::save(){
    ofstream ofs;
    ofs.open(FILENAME, ios::out);
    
    for (int i = 0; i < this->m_EmpNum; i++){
        ofs << this->m_EmpArray[i]->m_Id << " "
            << this->m_EmpArray[i]->m_Name << " "
            << this->m_EmpArray[i]->m_DeptId << " " << endl;
    }
    
    ofs.close();
}

int WorkerManager::get_EmpNum(){
    ifstream ifs;
    ifs.open(FILENAME, ios::in);
    
    int id;
    string name;
    int dId;
    
    int num = 0;
    
    while (ifs >> id && ifs >> name && ifs >> dId) {
             //记录人数
        num++;
    }
    ifs.close();
    
    return num;
}

void WorkerManager::init_Emp(){
    ifstream ifs;
    ifs.open(FILENAME, ios::in);
    
    int id;
    string name;
    int dId;
    
    int index = 0;
    
    Worker * worker = NULL;
    while (ifs >> id && ifs >> name && ifs >> dId) {
        if(dId == 1) {
            worker = new Employee(id, name, dId);
        } else if(dId == 2) {
            worker = new Manager(id, name, dId);
        } else if(dId == 3) {
            worker = new Boss(id, name, dId);
        }
        //存放在数组中
        this->m_EmpArray[index] = worker;
        
        index++;
    }
}

//显示职工
void WorkerManager::Show_Emp(){
    if (this->m_FileIsEmpty)
    {
        cout << "文件不存在或记录为空！" << endl;
    } else {
        for (int index = 0; index < this->m_EmpNum; index++) {
            this->m_EmpArray[index]->showInfo();
        }
    }
}

// 是否存在
int WorkerManager::IsExist(int id){
    for (int index = 0; index < this->m_EmpNum; index++) {
        if (this->m_EmpArray[index]->m_Id == id) {
            return index;
        }
    }
    return -1;
}

// 是否存在
int WorkerManager::IsExistByName(string name){
    for (int index = 0; index < this->m_EmpNum; index++) {
        if (this->m_EmpArray[index]->m_Name == name) {
            return index;
        }
    }
    return -1;
}

// 删除职工
void WorkerManager::Del_Emp(){
    if (this->m_FileIsEmpty)
    {
        cout << "文件不存在或记录为空！" << endl;
    }
    else
    {
        //按职工编号删除
        cout << "请输入想要删除的职工号：" << endl;
        int id = 0;
        cin >> id;
        
        int index = this->IsExist(id);
        
        if (index != -1)  //说明index上位置数据需要删除
        {
            for (int i = index; i < this->m_EmpNum - 1; i++){
                this->m_EmpArray[i] = this->m_EmpArray[i + 1];
            }
            this->m_EmpNum--;
            
            this->save(); //删除后数据同步到文件中
            cout << "删除成功！" << endl;
        }
        else
        {
            cout << "删除失败，未找到该职工" << endl;
        }
    }
}

//修改职工
void WorkerManager::Mod_Emp(){
    if (this->m_FileIsEmpty)
    {
        cout << "文件不存在或记录为空！" << endl;
    }
    else
    {
        cout << "请输入修改职工的编号：" << endl;
        int id;
        cin >> id;
        
        int index = this->IsExist(id);
        
        if (index != -1)  //说明index上位置数据
        {
            //查找到编号的职工

//            delete this->m_EmpArray[index];
            
            int newId = 0;
            string newName = "";
            int dSelect = 0;
            
            cout << "查到： " << id << "号职工，请输入新职工号： " << endl;
            cin >> newId;

            cout << "请输入新姓名： " << endl;
            cin >> newName;

            cout << "请输入岗位： " << endl;
            cout << "1、普通职工" << endl;
            cout << "2、经理" << endl;
            cout << "3、老板" << endl;
            cin >> dSelect;
            
            Worker * worker = NULL;
            switch (dSelect) {
                case 1:
                    worker = new Employee(newId, newName, dSelect);
                    break;
                case 2:
                    worker = new Manager(newId, newName, dSelect);
                    break;
                case 3:
                    worker = new Boss(newId, newName, dSelect);
                    break;
                    
                default:
                    break;
            }
            
            //更改数据 到数组中
            this->m_EmpArray[index] = worker;
            
            
            this->save(); //数据同步到文件中
            
            cout << "修改成功！" << endl;
        }
        else
        {
            cout << "删除失败，未找到该职工" << endl;
        }
    }
}

//查找职工
void WorkerManager::Find_Emp(){
    if (this->m_FileIsEmpty)
    {
        cout << "文件不存在或记录为空！" << endl;
    }
    else
    {
        cout << "请输入查找的方式：" << endl;
        cout << "1、按职工编号查找" << endl;
        cout << "2、按姓名查找" << endl;

        int select = 0;
        cin >> select;
        
        int index = -1;
        
        if (select == 1) //按职工号查找
        {
            int id;
            cout << "请输入查找的职工编号：" << endl;
            cin >> id;
            
            index = this->IsExist(id);
        } else if(select == 2){
            string name;
            cout << "请输入查找的姓名：" << endl;
            cin >> name;
            
            index = this->IsExistByName(name);
        }
        
        if (index != -1)  //说明index上位置数据
        {
            this->m_EmpArray[index]->showInfo();
            
            cout << "查询成功！" << endl;
        }
        else
        {
            cout << "查询失败，未找到该职工" << endl;
        }
        
        
    }
}

//排序职工
void WorkerManager::Sort_Emp(){
    if (this->m_FileIsEmpty)
    {
        cout << "文件不存在或记录为空！" << endl;
    }
    else
    {
        cout << "请选择排序方式： " << endl;
        cout << "1、按职工号进行升序" << endl;
        cout << "2、按职工号进行降序" << endl;
        
        int select = 0;
        cin >> select;
        
        for (int i = 0; i < m_EmpNum; i++)
        {
            int minOrMax = i;
            for (int j = i + 1; j < m_EmpNum; j++)
            {
                if (select == 1) //升序
                {
                    if (m_EmpArray[minOrMax]->m_Id > m_EmpArray[j]->m_Id)
                    {
                        minOrMax = j;
                    }
                }
                else  //降序
                {
                    if (m_EmpArray[minOrMax]->m_Id < m_EmpArray[j]->m_Id)
                    {
                        minOrMax = j;
                    }
                }
            }
            
            if (i != minOrMax)
            {
                Worker * temp = m_EmpArray[i];
                m_EmpArray[i] = m_EmpArray[minOrMax];
                m_EmpArray[minOrMax] = temp;
            }
        }
        
        cout << "排序成功,排序后结果为：" << endl;
        this->save();
        this->Show_Emp();

    }
}

//清空文件
void WorkerManager::Clean_File(){
    cout << "确认清空？" << endl;
    cout << "1、确认" << endl;
    cout << "2、返回" << endl;
    
    int select = 0;
        cin >> select;

    if (select == 1)
    {
        ofstream ofs;
        //打开模式 ios::trunc 如果存在删除文件并重新创建
        ofs.open(FILENAME, ios::trunc);
        ofs.close();
        
        if (this->m_EmpArray != NULL)
        {
            for (int i = 0; i < this->m_EmpNum; i++)
            {
                if (this->m_EmpArray[i] != NULL)
                {
                    this->m_EmpArray[i] = NULL;
//                    delete this->m_EmpArray[i];
                }
            }
            this->m_EmpNum = 0;
            delete[] this->m_EmpArray;
            this->m_EmpArray = NULL;
            this->m_FileIsEmpty = true;
        }
        
        cout << "清空成功！" << endl;
    }
}

WorkerManager::~WorkerManager(){
    if (this->m_EmpArray != NULL)
    {
        delete[] this->m_EmpArray;
    }
}

