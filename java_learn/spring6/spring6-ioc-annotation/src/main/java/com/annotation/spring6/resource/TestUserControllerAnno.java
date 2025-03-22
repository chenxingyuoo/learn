package com.annotation.spring6.resource;

import com.annotation.spring6.config.SpringConfig;
import com.annotation.spring6.resource.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUserControllerAnno {
    @Test
    public void testAddUser() {

    }

    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        UserController userController = context.getBean("myUserController", UserController.class);
        userController.addUser();

    }
}
