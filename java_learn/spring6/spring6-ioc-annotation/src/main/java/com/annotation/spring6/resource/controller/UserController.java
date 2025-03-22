package com.annotation.spring6.resource.controller;


import com.annotation.spring6.resource.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;

@Controller("myUserController")
public class UserController {
    // 根据名称注入
//    @Resource(name = "myUserService")
//    private UserService userService;

    // 根据类型注入
    @Resource
    private UserService userService;

    public void addUser() {
        System.out.println("controller方法执行了");
        userService.addUserService();
    }
}
