package org.example;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
@EnableAsync        // 2.开启多线程
public class ScheduledTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScheduledTestApplication.class, args);
    }
}