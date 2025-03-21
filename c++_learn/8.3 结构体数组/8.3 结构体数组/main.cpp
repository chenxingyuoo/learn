//
//  main.cpp
//  8.3 结构体数组
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

//结构体定义
struct student
{
    //成员列表
    string name;  //姓名
    int age;      //年龄
    int score;    //分数
};

int main(int argc, const char * argv[]) {
    //结构体数组
    struct student arr[3]=
    {
        {"张三",18,80 },
        {"李四",19,60 },
        {"王五",20,70 }
    };

    for (int i = 0; i < 3; i++)
    {
        cout << "姓名：" << arr[i].name << " 年龄：" << arr[i].age << " 分数：" << arr[i].score << endl;
    }
    return 0;
}
