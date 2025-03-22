package com.neo.mapper;

import java.util.List;

import com.neo.model.User;

public interface UserMapper {
	
	List<User> getAll();
	
	User getOne(Long id);


	long insert(User user);

	void update(User user);

	void delete(Long id);

}