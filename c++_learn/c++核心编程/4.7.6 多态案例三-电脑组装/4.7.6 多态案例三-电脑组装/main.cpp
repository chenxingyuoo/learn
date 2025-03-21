//
//  main.cpp
//  4.7.6 多态案例三-电脑组装
//
//  Created by xingyu chen on 2/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//抽象CPU类
class CPU
{
public:
    //抽象的计算函数
    virtual void calculate() = 0;
};

//抽象显卡类
class VideoCard
{
public:
    //抽象的显示函数
    virtual void display() = 0;
};

//抽象内存条类
class Memory
{
public:
    //抽象的存储函数
    virtual void storage() = 0;
};

// 电脑类
class Computer{
public:
    Computer(CPU * cpu, VideoCard * videoCard, Memory * memory){
        m_cpu = cpu;
        m_videoCard = videoCard;
        m_memory =memory;
    }
    //提供析构函数 释放3个电脑零件
    ~Computer(){
        if (m_cpu != NULL) {
            delete m_cpu;
            m_cpu = NULL;
        }
        if (m_videoCard != NULL) {
            delete m_videoCard;
            m_videoCard = NULL;
        }
        if (m_memory != NULL) {
            delete m_memory;
            m_memory = NULL;
        }
    };
    
    void work(){
        m_cpu->calculate();
        
        m_videoCard->display();
        
        m_memory->storage();
    }
private:
    CPU * m_cpu; //CPU的零件指针
    VideoCard * m_videoCard; //显卡零件指针
    Memory * m_memory; //内存条零件指针
};


//具体厂商
//Intel厂商
class IntelCPU :public CPU
{
public:
    virtual void calculate(){
        cout << "Intel CPU计算" << endl;
    }
};

class IntelVideoCard : public VideoCard{
public:
    virtual void display(){
        cout << "Intel 显卡显示" << endl;
    }
};

class IntelMemory : public Memory{
public:
    virtual void storage(){
        cout << "Intel 内存存储" << endl;
    }
};

//Lenovo厂商
class LenovoCPU :public CPU
{
public:
    virtual void calculate()
    {
        cout << "Lenovo的CPU开始计算了！" << endl;
    }
};

class LenovoVideoCard :public VideoCard
{
public:
    virtual void display()
    {
        cout << "Lenovo的显卡开始显示了！" << endl;
    }
};

class LenovoMemory :public Memory
{
public:
    virtual void storage()
    {
        cout << "Lenovo的内存条开始存储了！" << endl;
    }
};

void test01(){
    //第一台电脑零件
    CPU * intelCpu = new IntelCPU;
    VideoCard * intelCard = new IntelVideoCard;
    Memory * intelMem = new IntelMemory;

    cout << "第一台电脑开始工作：" << endl;
    //创建第一台电脑
    Computer * computer1 = new Computer(intelCpu, intelCard, intelMem);
    computer1->work();
    delete computer1;
    
    cout << "-----------------------" << endl;
    cout << "第二台电脑开始工作：" << endl;
    //第二台电脑组装
    Computer * computer2 = new Computer(new LenovoCPU, new LenovoVideoCard, new LenovoMemory);;
    computer2->work();
    delete computer2;
    
    cout << "-----------------------" << endl;
    cout << "第三台电脑开始工作：" << endl;
    //第三台电脑组装
    Computer * computer3 = new Computer(new LenovoCPU, new IntelVideoCard, new LenovoMemory);;
    computer3->work();
    delete computer3;
}

int main(int argc, const char * argv[]) {
    test01();
    return 0;
}
