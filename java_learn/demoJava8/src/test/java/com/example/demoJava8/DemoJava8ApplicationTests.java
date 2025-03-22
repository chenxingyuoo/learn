package com.example.demoJava8;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@SpringBootTest
class DemoJava8ApplicationTests {

	@Autowired
	DataSource dataSource;
	@Test
	void contextLoads() throws SQLException {

	}
}
