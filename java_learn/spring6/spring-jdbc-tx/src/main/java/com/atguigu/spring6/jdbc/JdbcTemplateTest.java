package com.atguigu.spring6.jdbc;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@SpringJUnitConfig(locations = "classpath:beans-xml.xml")
public class JdbcTemplateTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //查询：返回对象
    @Test
    public void testSelectObject() {
        //写法一
        String sql = "select * from t_emp where id=?";
        Emp empResult = jdbcTemplate.queryForObject(sql,(rs, rowNum) -> {
            Emp emp = new Emp();
            emp.setId(rs.getInt("id"));
            emp.setName(rs.getString("name"));
            emp.setAge(rs.getInt("age"));
            emp.setSex(rs.getString("sex"));
            return emp;
        }, 1);
        System.out.println(empResult);


        // 写法二
        Emp emp = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Emp.class), 2);

        System.out.println(emp);
    }

    //查询：返回list集合
    @Test
    public void testSelectList() {
        String sql = "select * from t_emp";

        List<Emp> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Emp.class));
        System.out.println(list);

        HashMap<String, Object> objectHashMap = new HashMap();

        objectHashMap.put("name", "xxx");

        System.out.println(objectHashMap.get("name"));
        System.out.println(objectHashMap.containsKey("name"));
        System.out.println(objectHashMap);


        ArrayList<Object> arrayList = new ArrayList();
        arrayList.add(1);
        arrayList.add("string");
        System.out.println(arrayList);
    }

    //查询：返回单个值
    @Test
    public void testCount() {
        String sql = "select count(*) from t_emp";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        System.out.println(count);
    }

    @Test
    public void testInert() {
        //第一步 编写sql语句
        String sql = "INSERT INTO t_emp VALUES(NULL,?,?,?)";
//        第二步 调用jdbcTemplate的方法，传入相关参数
        Object[] params = {"东方不败", 20, "未知"};
        int rows = jdbcTemplate.update(sql,params);

        System.out.println(rows);
    }

    @Test
    public void testUpdate() {
        String sql = "update t_emp set name=? where id=?";
        int rows = jdbcTemplate.update(sql,"东方不败atguigu",3);
        System.out.println(rows);
    }

    @Test
    public void testDelete() {
        String sql = "delete from t_emp where id=?";
        int rows = jdbcTemplate.update(sql,3);
        System.out.println(rows);
    }
}
