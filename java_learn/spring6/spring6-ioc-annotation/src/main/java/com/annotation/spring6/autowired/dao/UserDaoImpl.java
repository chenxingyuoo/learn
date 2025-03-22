package com.annotation.spring6.autowired.dao;

import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{
    @Override
    public void addUserDao() {
        System.out.println("dao方法执行了");
    }
}
