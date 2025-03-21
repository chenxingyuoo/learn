//
//  circle.cpp
//  4.1.5 点和圆的关系
//
//  Created by xingyu chen on 27/12/2023.
//

#include "circle.h"


void Circle::setR(int v) {
    m_R = v;
}
int Circle::getR(){
    return m_R;
}
void Circle::setCenter(Point center) {
    m_Center = center;
}
Point Circle::getCenter(){
    return m_Center;
}
