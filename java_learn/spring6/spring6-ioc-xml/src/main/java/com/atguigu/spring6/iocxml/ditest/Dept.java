package com.atguigu.spring6.iocxml.ditest;

public class Dept {
    private String bname;

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public void info() {
        System.out.println("部门: " +bname);
    }

}
