package com.springBoot.learn1.mapper;

import com.springBoot.learn1.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author lw
 */
@Repository
public interface UserMapper {

    List<User> queryAll();
    User queryOne(Long id);
    void add(User user);
    void update(User user);
}