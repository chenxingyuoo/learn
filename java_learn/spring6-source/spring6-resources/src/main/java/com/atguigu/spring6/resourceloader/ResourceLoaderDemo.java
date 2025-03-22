package com.atguigu.spring6.resourceloader;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;

public class ResourceLoaderDemo {

    @Test
    public void demo1() {
        ApplicationContext context = new ClassPathXmlApplicationContext();
        Resource resource = context.getResource("atguigu.txt");
        System.out.println(resource.getFilename());

        try {
            InputStream in = resource.getInputStream();
            byte[] b = new byte[1024];
            while(in.read(b)!=-1) {
                System.out.println("context:" + new String(b));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void demo2() {
        ApplicationContext context = new FileSystemXmlApplicationContext();
        Resource resource = context.getResource("atguigu.txt");
        System.out.println(resource.getFilename());


    }
}
