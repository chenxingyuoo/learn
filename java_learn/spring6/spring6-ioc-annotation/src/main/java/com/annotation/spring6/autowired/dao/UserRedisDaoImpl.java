package com.annotation.spring6.autowired.dao;

import org.springframework.stereotype.Repository;

@Repository
public class UserRedisDaoImpl implements UserDao{

    @Override
    public void addUserDao() {
        System.out.println("addUserDao redis 执行了");
    }
}
