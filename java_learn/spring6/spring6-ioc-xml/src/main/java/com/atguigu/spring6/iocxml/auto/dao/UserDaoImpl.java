package com.atguigu.spring6.iocxml.auto.dao;

public class UserDaoImpl implements UserDao{
    @Override
    public void addUserDao() {
        System.out.println("dao方法执行了");
    }
}
