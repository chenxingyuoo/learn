package com.atguigu.spring6.iocxml.ditest;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestEmp {
    @Test
    public void testEmp3() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean-ditest.xml");
        Emp emp = context.getBean("emp3", Emp.class);
        emp.work();
    }
    @Test
    public void testEmp2() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean-ditest.xml");
        Emp emp = context.getBean("emp2", Emp.class);
        emp.work();
    }
    @Test
    public  void testEmp1() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean-ditest.xml");
        Emp emp = context.getBean("emp", Emp.class);
        emp.work();
    }
}
