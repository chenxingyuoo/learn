//顺序结构的程序语句只能被执行一次。如果您想要同样的操作执行多次,，就需要使用循环结构。
//Java中有三种主要的循环结构：
//        while 循环
//        do…while 循环
//        for 循环


//while
//while( 布尔表达式 ) {
//        //循环内容
//        }
public class Test {
    public static void main(String args[]) {
        int x = 10;
        while (x < 20) {
            System.out.print("value of x : " + x);
            x = x + 1;
            System.out.print("\n");
        }
    }
}

//    value of x : 10
//    value of x : 11
//    value of x : 12
//    value of x : 13
//    value of x : 14
//    value of x : 15
//    value of x : 16
//    value of x : 17
//    value of x : 18
//    value of x : 19


//do…while 循环

// 对于 while 语句而言，如果不满足条件，则不能进入循环。但有时候我们需要即使不满足条件，也至少执行一次。
// do…while 循环和 while 循环相似，不同的是，do…while 循环至少会执行一次。

//do {
//        //代码语句
//        }while(布尔表达式);

//注意：布尔表达式在循环体的后面，所以语句块在检测布尔表达式之前已经执行了。 如果布尔表达式的值为 true，则语句块一直执行，直到布尔表达式的值为 false。
public class Test {
    public static void main(String args[]) {
        int x = 10;

        do {
            System.out.print("value of x : " + x);
            x++;
            System.out.print("\n");
        } while (x < 20);
    }
}

//    value of x : 10
//    value of x : 11
//    value of x : 12
//    value of x : 13
//    value of x : 14
//    value of x : 15
//    value of x : 16
//    value of x : 17
//    value of x : 18
//    value of x : 19


//for循环
//虽然所有循环结构都可以用 while 或者 do...while表示，但 Java 提供了另一种语句 —— for 循环，使一些循环结构变得更加简单。

//for(初始化; 布尔表达式; 更新) {
//        //代码语句
//        }


public class Test {
    public static void main(String args[]) {

        for (int x = 10; x < 20; x = x + 1) {
            System.out.print("value of x : " + x);
            System.out.print("\n");
        }
    }
}

//    value of x : 10
//    value of x : 11
//    value of x : 12
//    value of x : 13
//    value of x : 14
//    value of x : 15
//    value of x : 16
//    value of x : 17
//    value of x : 18
//    value of x : 19


//Java 增强 for 循环

//    Java5 引入了一种主要用于数组的增强型 for 循环。
//        Java 增强 for 循环语法格式如下:

//for(声明语句 : 表达式)
//        {
//        //代码句子
//        }

//声明语句：声明新的局部变量，该变量的类型必须和数组元素的类型匹配。其作用域限定在循环语句块，其值与此时数组元素的值相等。
//        表达式：表达式是要访问的数组名，或者是返回值为数组的方法。

public class Test {
    public static void main(String args[]) {
        int[] numbers = {10, 20, 30, 40, 50};

        for (int x : numbers) {
            System.out.print(x);
            System.out.print(",");
        }
        System.out.print("\n");
        String[] names = {"James", "Larry", "Tom", "Lacy"};
        for (String name : names) {
            System.out.print(name);
            System.out.print(",");
        }
    }
}

//10,20,30,40,50,
//        James,Larry,Tom,Lacy,


//for 嵌套循环实例：

public class Test {
    public static void main(String args[]) {
        for (int i = 1; i < = 3; i++) {
            for (int n = 1; n <= 3; n++) {
                //输出结果。。。。
                System.out.println("i = " + i + ", n = " + n);
            }
        }
    }
}