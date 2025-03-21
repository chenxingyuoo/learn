//
//  main.cpp
//  4.1.4 立方体类实践
//
//  Created by xingyu chen on 26/12/2023.
//

#include <iostream>
using namespace std;

// 立方体
class Club{
public:
    void setW(int v) {
        m_W = v;
    }
    int getW() {
        return m_W;
    }

    void setL(int v) {
        m_L = v;
    }
    int getL() {
        return m_L;
    }

    void setH(int v) {
        m_H = v;
    }
    int getH() {
        return m_H;
    }
    
    // 计算面积
    int calculateS(){
        return 2*m_W*m_L + 2*m_W*m_H + 2*m_L*m_H;
    }
    
    // 计算体积
    int calculateV(){
        return m_W * m_L * m_H;
    }
    
    bool isSameByClass(Club & c){
        if(getL() == c.getL() && getW() == c.getW() && getH() == c.getH()) {
            return true;
        }
        return false;
    }
    
    
private:
    int m_W;
    int m_L;
    int m_H;
};

bool isSame(Club &c1, Club &c2){
    if(c1.getL() == c2.getL() && c1.getW() == c2.getW() && c1.getH() == c2.getH()) {
        return true;
    }
    return false;
};

int main(int argc, const char * argv[]) {
    
    Club c1;
    
    c1.setH(10);
    c1.setL(10);
    c1.setW(10);
    
    int s = c1.calculateS();
    int v = c1.calculateV();
    
    cout << "c1.calculateS = " << s << endl;
    cout << "c1.calculateV = " << v << endl;
    
    
    Club c2;
    
    c2.setH(10);
    c2.setL(10);
    c2.setW(10);
    
    bool ret = isSame(c1, c2);
    cout << "ret = " << ret << endl;
    
    
    bool ret2 = c2.isSameByClass(c1);
    cout << "ret2 = " << ret2 << endl;
    
    return 0;
}
