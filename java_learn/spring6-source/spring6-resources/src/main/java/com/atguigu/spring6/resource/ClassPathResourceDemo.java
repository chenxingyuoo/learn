package com.atguigu.spring6.resource;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

//访问类路径下资源
public class ClassPathResourceDemo {

    public static void loadClasspathResource(String path) {
        //创建对象ClassPathResource
        ClassPathResource resource = new ClassPathResource(path);

        System.out.println(resource.getFilename());
        System.out.println(resource.getDescription());
        //获取文件内容
        try {
            InputStream in = resource.getInputStream();
            byte[] b = new byte[1024];
            while(in.read(b)!=-1) {
                System.out.println(new String(b));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        loadClasspathResource("atguigu.txt");
    }
}
