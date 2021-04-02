//int a, b, c;         // 声明三个int型整数：a、 b、c
//int d = 3, e = 4, f = 5; // 声明三个整数并赋予初值
//byte z = 22;         // 声明并初始化 z
//String s = "runoob";  // 声明并初始化字符串 s
//double pi = 3.14159; // 声明了双精度浮点型变量 pi
//char x = 'x';        // 声明变量 x 的值是字符 'x'。

//Java语言支持的变量类型有：

// 局部变量
// 成员变量
// 类变量

//package com.runoob.test;

public class Type {

    public Type() {

    }

    public void pupAge() {
        // 局部变量
        int age = 0;
        age = age + 7;
        System.out.println("小狗的年龄是: " + age);
    }

    public static void main(String args[]) {
        Type type = new Type();
        type.pupAge();
    }
}

//小狗的年龄是: 7