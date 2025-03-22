/**
 * 动态代理
 */
package com.atguigu.aop.example;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

public class ProxyFactory {
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    public Object getProxy() {
        /**
         * Proxy.newProxyInstance()方法
         * 有三个参数
         * 第一个参数：ClassLoader: 加载动态生成代理类的来加载器
         * 第二个参数： Class[] interfaces：目录对象实现的所有接口的class类型数组
         * 第三个参数：InvocationHandler：设置代理对象实现目标对象方法的过程
         */
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        InvocationHandler invocationHandler = new InvocationHandler() {

            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

                //方法调用之前输出
                System.out.println("[动态代理][日志] "+method.getName()+"，参数："+ Arrays.toString(args));

                Object result = method.invoke(target, args);

                //方法调用之后输出
                System.out.println("[动态代理][日志] "+method.getName()+"，结果："+ result);
                return result;
            }
        };

        return Proxy.newProxyInstance(classLoader,interfaces,invocationHandler);
    }
}
