package com.atguigu.bean;


import com.atguigu.anno.Bean;
import com.atguigu.anno.Di;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class AnnotationApplicationContext implements ApplicationContext{

    //创建map集合，放bean对象
    private Map<Class,Object> beanFactory = new HashMap<>();
    private static String rootPath;

    //返回对象
    @Override
    public Object getBean(Class clazz) {
        return beanFactory.get(clazz);
    }

    public AnnotationApplicationContext(String basePackage) {
        try {
            String packagePath = basePackage.replaceAll("\\.", "\\/");
            Enumeration<URL> urls = Thread.currentThread().getContextClassLoader().getResources(packagePath);


            while (urls.hasMoreElements()) {
                URL url = urls.nextElement();
                String filePath = URLDecoder.decode(url.getFile(), "utf-8");

                rootPath = filePath.substring(0, filePath.length() - packagePath.length());

                loadBean(new File(filePath));
                System.out.println(filePath);
                System.out.println(rootPath);

            }
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }

        loadDi();
    }



    private void loadBean(File file) throws Exception {

        //1 判断当前是否文件夹
        if(file.isDirectory()) {
            //2 获取文件夹里面所有内容
            File[] childrenFiles = file.listFiles();

            //3 判断文件夹里面为空，直接返回
            if(childrenFiles == null || childrenFiles.length == 0) {
                return;
            }

            //4 如果文件夹里面不为空，遍历文件夹所有内容
            for(File child : childrenFiles) {
                //4.1 遍历得到每个File对象，继续判断，如果还是文件夹，递归
                if(child.isDirectory()) {
                    //递归
                    loadBean(child);
                } else {
                    //4.2 遍历得到File对象不是文件夹，是文件，
                    //4.3 得到包路径+类名称部分-字符串截取
                    String pathWithClass =
                            child.getAbsolutePath().substring(rootPath.length());

                    //4.4 判断当前文件类型是否.class
                    if(pathWithClass.contains(".class")) {

                        //4.5 如果是.class类型，把路径\替换成.  把.class去掉
                        // com.atguigu.service.UserServiceImpl
                        String allName = pathWithClass.replaceAll("\\/", ".")
                                .replace(".class", "");

                        //4.6 判断类上面是否有注解 @Bean，如果有实例化过程
                        //4.6.1 获取类的Class
                        Class<?> clazz = Class.forName(allName);
                        //4.6.2 判断不是接口
                        if(!clazz.isInterface()) {
                            //4.6.3 判断类上面是否有注解 @Bean
                            Bean annotation = clazz.getAnnotation(Bean.class);
                            if(annotation != null) {
                                //4.6.4 实例化
                                Object instance = clazz.getConstructor().newInstance();
                                //4.7 把对象实例化之后，放到map集合beanFactory
                                //4.7.1 判断当前类如果有接口，让接口class作为map的key
                                if(clazz.getInterfaces().length>0) {
                                    beanFactory.put(clazz.getInterfaces()[0],instance);
                                } else {
                                    beanFactory.put(clazz,instance);
                                }
                            }
                        }
                    }
                }
            }
        }

    }


    private void loadDi()  {

        Set<Map.Entry<Class, Object>> entries = beanFactory.entrySet();

        for (Map.Entry<Class, Object> entry:entries) {
            Object obj = entry.getValue();

            Class<?> clazz = obj.getClass();

            Field[] declaredFields = clazz.getDeclaredFields();

            for (Field field : declaredFields) {
                Di annotation = field.getAnnotation(Di.class);
                if (annotation != null) {
                    field.setAccessible(true);
                    try {
                        field.set(obj, beanFactory.get(field.getType()));
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
    }

}
