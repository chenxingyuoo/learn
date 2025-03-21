//
//  main.cpp
//  1.2.3 函数模板案例
//
//  Created by xingyu chen on 8/1/2024.
//

#include <iostream>
#include <string>
using namespace std;

//交换的函数模板
template<typename T>
void mySwap(T &a, T&b)
{
    T temp = a;
    a = b;
    b = temp;
}


template<class T>
void mySort(T arr[], int len){
    for (int i = 0; i < len; i++) {
        int max = i;
        for (int j = i + 1; j < len; j++) {
            if (arr[max]  < arr[j]) {
                max = j;
            }
        }
        //如果最大数的下标不是i，交换两者
        if (max != i) {
            mySwap(arr[max], arr[i]);
        }
    }
}

template<class T>
void printArray(T arr[], int len){
    for (int i = 0; i < len; i++) {
        cout << arr[i] << endl;
    }
}


void test01(){
    //测试char数组
    char charArr[] = "bdcfeagh";
    int num = sizeof(charArr) / sizeof(char);
    mySort(charArr, num);
    printArray(charArr, num);
}

void test02(){
    //测试int数组
    int intArr[] = { 7, 5, 8, 1, 3, 9, 2, 4, 6 };
    int num = sizeof(intArr) / sizeof(int);
    mySort(intArr, num);
    printArray(intArr, num);
}

int main(int argc, const char * argv[]) {
    test01();
    
    test02();
    
    return 0;
}
