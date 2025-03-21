//
//  main.cpp
//  2.3浮点型
//
//  Created by xingyu chen on 25/12/2023.
//

#include <iostream>
using namespace std;


int main(int argc, const char * argv[]) {
    float f1 = 3.14f;
    double d1 = 3.14;

    cout << f1 << endl;
    cout << d1<< endl;

    cout << "float  sizeof = " << sizeof(f1) << endl;
    cout << "double sizeof = " << sizeof(d1) << endl;

    //科学计数法
    float f2 = 3e2; // 3 * 10 ^ 2
    cout << "f2 = " << f2 << endl;

    float f3 = 3e-2;  // 3 * 0.1 ^ 2
    cout << "f3 = " << f3 << endl;
    
    return 0;
}
