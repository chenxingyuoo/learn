package com.springBoot.learn1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.springBoot.learn1.mapper")
public class Learn1Application {

    public static void main(String[] args) {
        SpringApplication.run(Learn1Application.class, args);
    }
}
