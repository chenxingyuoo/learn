package com.annotation.spring6.resource.dao;

import org.springframework.stereotype.Repository;

@Repository("myUserDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void addUserDao() {
        System.out.println("dao方法执行了");
    }
}
