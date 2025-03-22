package com.atguigu.aop.annoaop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;


@Aspect
@Component
public class LogAspect {

    @Before(value = "execution(public int com.atguigu.aop.annoaop.CalculatorImpl.*(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        System.out.println("Logger-->前置通知，方法名称："+methodName+"，参数："+ Arrays.toString(args));
    }

    @After(value = "execution(public int com.atguigu.aop.annoaop.CalculatorImpl.*(..))")
    public void afterMethod(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        System.out.println("Logger-->后置通知，方法名称："+methodName+"，参数："+ Arrays.toString(args));
    }

    @AfterReturning(value = "execution(public int com.atguigu.aop.annoaop.CalculatorImpl.*(..))",returning = "result")
    public void afterRunningMethod(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        System.out.println("Logger-->返回通知，方法名称："+methodName+"，参数："+ Arrays.toString(args) + " 返回结果：" + result);
    }

    @AfterThrowing(value = "execution(public int com.atguigu.aop.annoaop.CalculatorImpl.*(..))", throwing = "ex")
    public void afterThrowingMethod(JoinPoint joinPoint, Throwable ex) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        System.out.println("Logger-->异常通知，方法名称："+methodName+"，参数："+ Arrays.toString(args) + " 错误信息：" + ex);
    }

    @Around(value = "execution(public int com.atguigu.aop.annoaop.CalculatorImpl.*(..))")
    public Object aroundMethod(ProceedingJoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String argString = Arrays.toString(args);


        Object result = null;

        try {
            System.out.println("环绕通知==目标方法之前执行");

             result = joinPoint.proceed();

            System.out.println("环绕通知==目标方法返回值之后");
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            System.out.println("环绕通知==目标方法出现异常执行");
        } finally {
            System.out.println("环绕通知==目标方法执行完毕执行");
        }

        return result;
    }

    //重用切入点表达式
    @Pointcut(value = "execution(* com.atguigu.spring6.aop.annoaop.CalculatorImpl.*(..))")
    public void pointCut() {}
}
