package com.atguigu.service.impl;

import com.atguigu.anno.Bean;
import com.atguigu.anno.Di;
import com.atguigu.dao.UserDao;
import com.atguigu.service.UserService;

@Bean
public class UserServiceImpl implements UserService {
    @Di
    private UserDao userDao;

    @Override
    public void add() {
        System.out.println("UserService add ...");

        userDao.add();
    }
}
