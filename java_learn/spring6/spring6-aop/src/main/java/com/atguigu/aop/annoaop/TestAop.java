package com.atguigu.aop.annoaop;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestAop {
    @Test
    public void testAop() {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("bean.xml");

        CalculatorNew calculator = context.getBean(CalculatorNew.class);

        calculator.add(2, 3);
    }
}
