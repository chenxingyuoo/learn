package com.gold.tmall.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhang.fuiqng
 * @date 2021-04-18 17:22:00
 */
@RestController
public class HelloController {

    /**
     * Hello SpringBoot
     * @return Hello SpringBoot
     */
    @GetMapping(value = "/hello")
    public String hello() {
        return "Hello SpringBoot";
    }
}
