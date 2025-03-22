package com.annotation.spring6.autowired.controller;


import com.annotation.spring6.autowired.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
//    @Autowired
//    private UserService userService;

    private UserService userService;

//    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }

    public UserController(@Autowired UserService userService) {
        this.userService = userService;
    }

//    public UserService getUserService() {
//        return userService;
//    }
//
//    @Autowired
//    public void setUserService(UserService userService) {
//        this.userService = userService;
//    }

    public void addUser() {
        System.out.println("controller方法执行了");
        userService.addUserService();
    }
}
