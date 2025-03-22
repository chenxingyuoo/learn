package com.annotation.spring6.resource;

import com.annotation.spring6.resource.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUserController {
    @Test
    public void testAddUser() {

    }

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
        UserController userController = context.getBean("myUserController", UserController.class);
        userController.addUser();

    }
}
