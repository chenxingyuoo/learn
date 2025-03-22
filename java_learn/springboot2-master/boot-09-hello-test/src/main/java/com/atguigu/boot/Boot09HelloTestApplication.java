package com.atguigu.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class Boot09HelloTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(Boot09HelloTestApplication.class, args);


    }

    @Scheduled(cron ="*/6 * * * * ?")
    public void sayHello() {
        System.out.println("hello");
    }

}
