package com.annotation.spring6.autowired.service;


import com.annotation.spring6.autowired.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
//    @Autowired
//    private UserDao userDao;

//    private UserDao userDao;

//    @Autowired
//    public UserServiceImpl(UserDao userDao) {
//        this.userDao = userDao;
//    }

//    public UserDao getUserDao() {
//        return userDao;
//    }
//
//    @Autowired
//    public void setUserDao(UserDao userDao) {
//        this.userDao = userDao;
//    }

    @Autowired
    @Qualifier(value = "userRedisDaoImpl")
    private UserDao userDao;

    @Override
    public void addUserService() {

        System.out.println("service 方法执行了");
        userDao.addUserDao();
    }
}
