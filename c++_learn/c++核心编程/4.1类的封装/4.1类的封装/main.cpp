//
//  main.cpp
//  4.1类的封装
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

//圆周率
const double PI = 3.14;

// 类
class Circle {
public:
    // 半径
    int m_r;
    
    //获取到圆的周长
    double calculateZC() {
        return 2 * PI * m_r;
    }
};

class Student{
public:
    void setName(string name) {
        m_name = name;
    }
    void setId(int id) {
        m_id = id;
    }
    void showStudent(){
        cout << "name:" << m_name << " ID:" << m_id << endl;
    }
public:
    string m_name;
    int m_id;
};


//三种权限
//公共权限  public     类内可以访问  类外可以访问
//保护权限  protected  类内可以访问  类外不可以访问
//私有权限  private    类内可以访问  类外不可以访问

class Person
{
    //姓名  公共权限
public:
    string m_Name;

    //汽车  保护权限
protected:
    string m_Car;

    //银行卡密码  私有权限
private:
    int m_Password;

public:
    void func()
    {
        m_Name = "张三";
        m_Car = "拖拉机";
        m_Password = 123456;
    }
    
    void showPerson(){
        cout << "name:" << m_Name << " m_Car:" << m_Car << " m_Password:" << m_Password << endl;
    }
};


// 在C++中 struct和class唯一的区别就在于 默认的访问权限不同
class C1
{
    int  m_A; //默认是私有权限
};

struct C2
{
    int m_A;  //默认是公共权限
};


// 4.1.3 成员属性设置为私有
// **优点1：**将所有成员属性设置为私有，可以自己控制读写权限

// **优点2：**对于写权限，我们可以检测数据的有效性
class Person2 {
public:

    //姓名设置可读可写
    void setName(string name) {
        m_Name = name;
    }
    string getName()
    {
        return m_Name;
    }


    //获取年龄
    int getAge() {
        return m_Age;
    }
    //设置年龄
    void setAge(int age) {
        if (age < 0 || age > 150) {
            cout << "你个老妖精!" << endl;
            return;
        }
        m_Age = age;
    }

    //情人设置为只写
    void setLover(string lover) {
        m_Lover = lover;
    }

private:
    string m_Name; //可读可写  姓名
    
    int m_Age; //只读  年龄

    string m_Lover; //只写  情人
};


int main(int argc, const char * argv[]) {
    Circle circle;
    
    circle.m_r = 10; //给圆对象的半径 进行赋值操作
    //2 * pi * 10 = = 62.8
    cout << "圆的周长为： " << circle.calculateZC() << endl;
    
    
    Student s1;
    s1.setId(1);
    s1.setName("s1");
    s1.showStudent();
    
    
    Person p;
    p.func();
    p.m_Name = "李四";
    //p.m_Car = "奔驰";  //保护权限类外访问不到
    //p.m_Password = 123; //私有权限类外访问不到
    p.showPerson();
    
    
    C1 c1;
//    c1.m_A = 10; //错误，访问权限是私有

    C2 c2;
    c2.m_A = 10; //正确，访问权限是公共
    
    
    Person2 p2;
    //姓名设置
    p2.setName("张三");
    cout << "姓名： " << p2.getName() << endl;

    //年龄设置
    p2.setAge(50);
    cout << "年龄： " << p2.getAge() << endl;

    //情人设置
    p2.setLover("苍井");
    //cout << "情人： " << p2.m_Lover << endl;  //只写属性，不可以读取

    
    return 0;
}
