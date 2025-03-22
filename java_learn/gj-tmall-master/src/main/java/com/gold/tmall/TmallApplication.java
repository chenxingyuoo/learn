package com.gold.tmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author zhang.fuqing
 * @date 2021-04-18 22:04:16
 */
@SpringBootApplication(scanBasePackages={"com.gold.tmall"})
public class TmallApplication {

    public static void main(String[] args) {
        SpringApplication.run(TmallApplication.class, args);
    }

}
