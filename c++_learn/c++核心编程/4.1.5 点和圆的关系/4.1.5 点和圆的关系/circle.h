//
//  circle.h
//  4.1.5 点和圆的关系
//
//  Created by xingyu chen on 27/12/2023.
//
#pragma onec
#include <iostream>
using namespace std;
#include "point.h"

class Circle{
public:
    void setR(int v);
    int getR();
    void setCenter(Point center);
    Point getCenter();
private:
    int m_R; // 半径
    Point m_Center; // 圆心
};



#ifndef circle_h
#define circle_h


#endif /* circle_h */
