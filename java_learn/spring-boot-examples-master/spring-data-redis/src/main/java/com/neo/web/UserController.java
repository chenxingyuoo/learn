package com.neo.web;

import com.neo.model.User;
import com.neo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserRepository userDao;

    @RequestMapping("/addUser")
//    @RequestParam(name = "userName", defaultValue = "xxx") String userName
    public User addUser(@RequestBody() User userBody) {
        User user=new User();
        UUID uid = UUID.randomUUID();
        user.setId(uid);

        String userName = userBody.getUserName();
        if (userName != null) {
            user.setUserName(userName);
        } else {
            user.setUserName("小明");
        }

        user.setPassWord("fffooo123");
        userDao.saveUser(user);
        System.out.println("成功");
        return user;
    }

    @RequestMapping("/getUser")
    public User getUser(String userName) {
        User user = userDao.findUserByUserName(userName);
        return user;
    }

}