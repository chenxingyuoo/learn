import java.io.*;

//实例变量
//实例变量声明在一个类中，但在方法、构造方法和语句块之外；
//实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null。变量的值可以在声明时指定，也可以在构造方法中指定；

public class Employee {
    // 这个实例变量对子类可见
    public String name;

    // 私有变量，仅在该类可见
    private double salary;

    //在构造器中对name赋值
    public Employee (String empName) {
        name = empName;
    }

    //设定salary的值
    public void setSalary(double empSal) {
        salary = empSal;
    }

    // 打印信息
    public void printEmp() {
        System.out.println("名字 : " + name );
        System.out.println("薪水 : " + salary);
    }

    public static void main(String args[]) {
        Employee empOne = new Employee("RUNOOB");
        empOne.setSalary(1000);
        empOne.printEmp();
    }
}

//结果
//名字 : RUNOOB
//薪水 : 1000.0