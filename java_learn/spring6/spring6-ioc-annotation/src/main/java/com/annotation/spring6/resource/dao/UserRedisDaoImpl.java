package com.annotation.spring6.resource.dao;

import com.annotation.spring6.autowired.dao.UserDao;
import org.springframework.stereotype.Repository;

@Repository("myUserRedisDaoImpl")
public class UserRedisDaoImpl implements UserDao {

    @Override
    public void addUserDao() {
        System.out.println("addUserDao redis 执行了");
    }
}
