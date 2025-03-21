//
//  main.cpp
//  4.1.5 点和圆的关系
//
//  Created by xingyu chen on 27/12/2023.
//

#include <iostream>
using namespace std;
#include "point.h"
#include "circle.h"

//class Point{
//public:
//    void setX(int v) {
//        m_X = v;
//    }
//    int getX(){
//        return m_X;
//    }
//    void setY(int v) {
//        m_Y = v;
//    }
//    int getY(){
//        return m_Y;
//    }
//
//private:
//    int m_X;
//    int m_Y;
//};

//class Circle{
//public:
//    void setR(int v) {
//        m_R = v;
//    }
//    int getR(){
//        return m_R;
//    }
//    void setCenter(Point center) {
//        m_Center = center;
//    }
//    Point getCenter(){
//        return m_Center;
//    }
//private:
//    int m_R; // 半径
//    Point m_Center; // 圆心
//};

void isInCircle(Circle &c, Point &p) {
    // 计算两点之间距离 平方
    int distance = (c.getCenter().getX() - p.getX()) * (c.getCenter().getX() - p.getX()) + (c.getCenter().getY() - p.getY()) * (c.getCenter().getY() - p.getY());
    // 计算半径的平方
    int rDistance = c.getR() * c.getR();
    
    if (distance == rDistance) {
        cout << "点在圆上" << endl;
    } else if (distance > rDistance) {
        cout << "点在圆外" << endl;

    } else {
        cout << "点在圆内" << endl;

    }
}

int main(int argc, const char * argv[]) {
    Circle c;
    c.setR(10);
    Point center;
    center.setX(10);
    center.setY(0);
    c.setCenter(center);
    
    Point p;
    p.setX(10);
    p.setY(10);
    
    isInCircle(c, p);
    
    return 0;
}
