package com.atguigu.aop.example;

public class TestCal {
    public static void main(String[] args) {
        //创建代理对象（动态）
        ProxyFactory proxyFactory = new ProxyFactory(new CalculatorImpl());
        Calculator proxy = (Calculator)proxyFactory.getProxy();
        //proxy.add(1,2);
        proxy.mul(2,4);
    }
//    public static void main2(String[] args) {
//        Calculator calculator = new CalculatorImpl();
//
//        CalculatorStaticProxy calculatorStaticProxy = new CalculatorStaticProxy(calculator);
//
//        calculatorStaticProxy.add(1, 2);
//    }
//    public static void main1(String[] args) {
//        Calculator calculator = new CalculatorLogImpl();
//        calculator.add(1, 2);
//    }
}
