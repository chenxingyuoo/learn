package com.atguigu.spring6.iocxml.ditest;

public class Emp {
    private Dept dept;
    private String ename;
    private Integer age;

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void work() {
        System.out.println(ename + " emp work..." + age);
        dept.info();
    }
}
