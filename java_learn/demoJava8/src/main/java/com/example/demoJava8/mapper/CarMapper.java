package com.example.demoJava8.mapper;

import com.example.demoJava8.pojo.Car;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper // 让容器加载到这个bean
public interface CarMapper {
    /**
     * 获取所有汽车
     */
    List<Car> getList();
}
