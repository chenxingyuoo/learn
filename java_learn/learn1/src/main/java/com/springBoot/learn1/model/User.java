package com.springBoot.learn1.model;

import java.io.Serializable;



public class User implements Serializable {
    private Long id;
    private String name;
    private String password;
    private String phoneNumber;
    private Long money;

    public User(String name, String password, String phoneNumber) {
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.money = 0L;
    }

    @Override
    public String toString() {
        return id + "::" + name + "::" + password + "::" + phoneNumber + "::" + money;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }
}
