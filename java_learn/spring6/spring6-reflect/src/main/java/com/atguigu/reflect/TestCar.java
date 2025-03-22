package com.atguigu.reflect;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;


public class TestCar {
    // 获取构造函数
    @Test
    public void test01() throws Exception {
        Class clazz1 = Car.class;

//      Class clazz2 = new Car().getClass();

        Class clazz3 = Class.forName("com.atguigu.reflect.Car");

        //实例化
        Car car = (Car) clazz1.getConstructor().newInstance();
        System.out.println(car);

//       Car car1 = (Car) clazz2.getConstructor().newInstance();
//       System.out.println(car1);

        Car car2 = (Car) clazz3.getConstructor().newInstance();
        System.out.println(car2);
    }



    // 获取构造方法
    @Test
    public void test02() throws Exception {
        Class clazz = Car.class;
        //获取所有构造
        // getConstructors()获取所有public的构造方法
//        Constructor[] constructors = clazz.getConstructors();
        // getDeclaredConstructors()获取所有的构造方法public  private
        Constructor[] constructors = clazz.getDeclaredConstructors();
        for (Constructor c:constructors) {
            System.out.println("方法名称："+c.getName()+" 参数个数："+c.getParameterCount());
        }

        Constructor[] constructors1 = clazz.getConstructors();

        Constructor[] constructors2 = clazz.getDeclaredConstructors();

        for (Constructor c:constructors2) {
            c.setAccessible(true);
            Car car2;
            if (c.getParameterCount() == 0) {
                car2 = (Car) c.newInstance();
            } else {
                car2 = (Car) c.newInstance("马自达", 15, "白色");
            }
            System.out.println(car2);
        }

        //指定有参数构造创建对象
        //1 构造public
//        Constructor c1 = clazz.getConstructor(String.class, int.class, String.class);
//        Car car1 = (Car)c1.newInstance("夏利", 10, "红色");
//        System.out.println(car1);

        //2 构造private
        Constructor c2 = clazz.getDeclaredConstructor(String.class, int.class, String.class);
        c2.setAccessible(true);
        Car car2 = (Car)c2.newInstance("捷达", 15, "白色");
        System.out.println(car2);
    }

    //3、获取属性
    @Test
    public void test03() throws Exception {
        Class clazz = Car.class;
        Car car = (Car)clazz.getDeclaredConstructor().newInstance();

        Field[] fields = clazz.getDeclaredFields();

        for (Field field: fields) {
            if(field.getName().equals("name")) {
                field.setAccessible(true);
                field.set(car, "五菱宏光");
                System.out.println(car);
            }
            System.out.println(field.getName());
        }
    }

    //4、获取方法
    @Test
    public void test04() throws Exception {
        Car car = new Car("奔驰", 15, "白色");
        Class clazz = car.getClass();

        //1 public方法
        Method[] methods = clazz.getMethods();
        for (Method m1: methods) {
            if(m1.getName().equals("toString")) {
                String value = (String)m1.invoke(car);
                System.out.println(value);
            }
        }

        //2 private方法
        Method[] methodsAll = clazz.getDeclaredMethods();
        for (Method m2: methodsAll) {
            if(m2.getName().equals("run")) {
                m2.setAccessible(true);
                m2.invoke(car);
            }
        }
    }
}
