package com.atguigu.aop.annoaop;

import org.springframework.stereotype.Component;

@Component
public class CalculatorImpl implements CalculatorNew {

    @Override
    public int add(int i, int j) {
        int result = i + j;

        System.out.println("方法内部 result = " + result);
        return result;
    }

    @Override
    public int sub(int i, int j) {
        int result = i - j;

        System.out.println("方法内部 result = " + result);
        return result;
    }

    @Override
    public int mul(int i, int j) {
        int result = i * j;

        System.out.println("方法内部 result = " + result);
        return result;
    }

    @Override
    public int div(int i, int j) {
        int result = i / j;

        System.out.println("方法内部 result = " + result);
        return result;
    }
}
