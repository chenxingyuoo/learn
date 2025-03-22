package com.springBoot.learn1;

import com.springBoot.learn1.mapper.UserMapper;
import com.springBoot.learn1.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@MapperScan("com.springBoot.learn1.mapper")
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    @Transactional
    public void addUserTest() {
        User user = new User("testUser", "testPassword", "testPhone");
        userMapper.add(user);
        assert userMapper.queryAll().size() != 0;
    }

    @Test
    public void queryTest() {
        List<User> users = userMapper.queryAll();
        assert users.size() != 0;
        for (User user: users) {
            System.out.println(user.toString());
        }
    }

    @Test
    @Transactional
    public void updateTest() {
        User user = new User("testUser", "testPassword", "testPhone");
        userMapper.add(user);
        System.out.println(user.toString());

        User newUser = userMapper.queryOne(user.getId());
        System.out.println(newUser.toString());

        newUser.setName("updateUser");
        System.out.println(newUser.toString());

        userMapper.update(newUser);
        System.out.println(newUser.toString());

        User queryUser = userMapper.queryOne(user.getId());
        assert queryUser.getName().equals("updateUser");
    }
}