/**
 * Created by chenxingyu on 2017/1/1.
 */
import java.io.*;
public class EmployeeTest {
    public static void main(String args[]) {
        // 使用构造器创建两个对象
        Employee empOne = new Employee("RUNOOB1");
        Employee empTwo = new Employee("RUNOOB2");

        // 调用这两个对象的成员方法
        empOne.empAge(26);
        empOne.empDesignation("高级程序员");
        empOne.empSalary(1000);
        empOne.printEmployee();

        empTwo.empAge(21);
        empTwo.empDesignation("菜鸟程序员");
        empTwo.empSalary(500);
        empTwo.printEmployee();
    }
}

//输出结果

//名字:RUNOOB1
//年龄:26
//职位:高级程序员
//薪水:1000.0
//名字:RUNOOB2
//年龄:21
//职位:菜鸟程序员
//薪水:500.0
