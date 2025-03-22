package com.annotation.spring6.resource.service;


import com.annotation.spring6.resource.dao.UserDao;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("myUserService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao myUserDao;

    @Override
    public void addUserService() {

        System.out.println("service 方法执行了");
        myUserDao.addUserDao();
    }
}
