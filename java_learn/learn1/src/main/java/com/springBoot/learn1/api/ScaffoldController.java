package com.springBoot.learn1.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scaffold")
public class ScaffoldController {
    @GetMapping
    public String testScaffold() {
        return "hello scaffold";
    }

    public String tesPmd() {
        return "hello tesPmd";
    }
}
