//
//  main.cpp
//  5.3 二维数组
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;

int main(int argc, const char * argv[]) {
    //5.3.1 二维数组定义方式
//    //方式1
//    //数组类型 数组名 [行数][列数]
//    int arr[2][3];
//    arr[0][0] = 1;
//    arr[0][1] = 2;
//    arr[0][2] = 3;
//    arr[1][0] = 4;
//    arr[1][1] = 5;
//    arr[1][2] = 6;
//
//    for (int i = 0; i < 2; i++)
//    {
//        for (int j = 0; j < 3; j++)
//        {
//            cout << arr[i][j] << " ";
//        }
//        cout << endl;
//    }
//
//    //方式2
//    //数据类型 数组名[行数][列数] = { {数据1，数据2 } ，{数据3，数据4 } };
//    int arr2[2][3] =
//    {
//        {1,2,3},
//        {4,5,6}
//    };
//
//    //方式3
//    //数据类型 数组名[行数][列数] = { 数据1，数据2 ,数据3，数据4  };
//    int arr3[2][3] = { 1,2,3,4,5,6 };
//
//    //方式4
//    //数据类型 数组名[][列数] = { 数据1，数据2 ,数据3，数据4  };
//    int arr4[][3] = { 1,2,3,4,5,6 };
    
    //5.3.2 二维数组数组名
//    //二维数组数组名
//    int arr[2][3] =
//    {
//        {1,2,3},
//        {4,5,6}
//    };
//
//    cout << "二维数组大小： " << sizeof(arr) << endl;
//    cout << "二维数组一行大小： " << sizeof(arr[0]) << endl;
//    cout << "二维数组元素大小： " << sizeof(arr[0][0]) << endl;
//
//    cout << "二维数组行数： " << sizeof(arr) / sizeof(arr[0]) << endl;
//    cout << "二维数组列数： " << sizeof(arr[0]) / sizeof(arr[0][0]) << endl;
//
//    //地址
//    cout << "二维数组首地址：" << arr << endl;
//    cout << "二维数组第一行地址：" << arr[0] << endl;
//    cout << "二维数组第二行地址：" << arr[1] << endl;
//
//    cout << "二维数组第一个元素地址：" << &arr[0][0] << endl;
//    cout << "二维数组第二个元素地址：" << &arr[0][1] << endl;
    
    // 5.3.3 二维数组应用案例
    int scores[3][3] =
    {
        {100,100,100},
        {90,50,100},
        {60,70,80},
    };

    string names[3] = { "张三","李四","王五" };

    for (int i = 0; i < 3; i++)
    {
        int sum = 0;
        for (int j = 0; j < 3; j++)
        {
            sum += scores[i][j];
        }
        cout << names[i] << "同学总成绩为： " << sum << endl;
    }

    return 0;
}
