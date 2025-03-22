package com.example.demoJava8.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demoJava8.model.Person;

import com.example.demoJava8.utils.JsonResponse;
import com.example.demoJava8.utils.JsonUtil;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/json")
public class HelloController {
    private final static ObjectMapper objectMapper = new ObjectMapper();
    private final static Logger logger = LoggerFactory.getLogger(HelloController.class);

    static {
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @GetMapping("/hello")
    public String index(@RequestParam(value = "name", defaultValue = "World") String name) {
        logger.debug("debug测试");
        logger.info("info 测试");
        logger.error("error 测试");
        logger.warn("warn测试");
        //占位符
        String s1="hahaha";
        String s2="hehehe";
        logger.info("我{}；你{}", s1, s2);
        return String.format("Hello %s!", name);
    }

//    @RequestMapping("/testJson")
//    public Map testJson() {
//        Map<Integer, UserPO> map=new HashMap<Integer,UserPO>();
//        UserPO userPO = new UserPO();
//        userPO.setName("lisi");
//        userPO.setAge(15);
//        map.put(1,userPO);
//        return map;
//
//    }

    /**
     * 接收页面请求的JSON数据
     */
    @RequestMapping(value = "/testJson",produces = "application/json")
    @ResponseBody
    public JsonResponse testJson() {
        //打印接收的JSON格式数据
//        System.out.println("pname=" + user.getPname() +
//                ", password=" + user.getPassword() + ",page=" + user.getPage());
        //返回Person对象
//        Map<String, Object> map1 = new HashMap<String, Object>();
//        map1.put("code", "陈恒3");
//        map1.put("password", "54321");
//        map1.put("page", 55);

        Map<Integer, Person> map = new HashMap<Integer,Person>();
        Person person = new Person();
        person.setPname("lisi");
        person.setPage(15);
        map.put(1,person);


        return JsonResponse.success(map).setMsg("成功了");
    }
}
