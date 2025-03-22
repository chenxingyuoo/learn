package com.atguigu.spring6;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class TestUser {
    private Logger logger = LoggerFactory.getLogger(Test.class);
    @Test
    public void testUserObject(){
        ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");

        User user = (User)context.getBean("user");
        System.out.println(user);
        System.out.println("testUserObject");

        user.add();

        logger.info("zzz user.add 执行成功");
    }
}
