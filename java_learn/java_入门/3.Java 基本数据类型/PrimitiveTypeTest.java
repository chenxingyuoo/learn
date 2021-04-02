//Java的两大数据类型:
  //内置数据类型
  //引用数据类型

//内置数据类型
//Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

//Java常量

final double PI = 3.1415927;

// 虽然常量名也可以用小写，但为了便于识别，通常使用大写字母表示常量。
// 字面量可以赋给任何内置类型的变量。例如：
        byte a = 68;
        char a = 'A'
//        byte、int、long、和short都可以用十进制、16进制以及8进制的方式来表示。
//        当使用常量的时候，前缀0表示8进制，而前缀0x代表16进制。例如：

        int decimal = 100;
        int octal = 0144;
        int hexa =  0x64;
//        和其他语言一样，Java的字符串常量也是包含在两个引号之间的字符序列。下面是字符串型字面量的例子：
        "Hello World"
        "two\nlines"
        "\"This is in quotes\""
//        字符串常量和字符常量都可以包含任何Unicode字符。例如：
        char a = '\u0001';
        String a = "\u0001";


public class PrimitiveTypeTest{
    public static void main(String[] args){
            // byte
            System.out.println("基本类型：byte 二进制位数：" + Byte.SIZE);
            System.out.println("包装类：java.lang.Byte");
            System.out.println("最小值：Byte.MIN_VALUE=" + Byte.MIN_VALUE);
            System.out.println("最大值：Byte.MAX_VALUE=" + Byte.MAX_VALUE);
            System.out.println();

            // short
            System.out.println("基本类型：short 二进制位数：" + Short.SIZE);
            System.out.println("包装类：java.lang.Short");
            System.out.println("最小值：Short.MIN_VALUE=" + Short.MIN_VALUE);
            System.out.println("最大值：Short.MAX_VALUE=" + Short.MAX_VALUE);
            System.out.println();

            // int
            System.out.println("基本类型：int 二进制位数：" + Integer.SIZE);
            System.out.println("包装类：java.lang.Integer");
            System.out.println("最小值：Integer.MIN_VALUE=" + Integer.MIN_VALUE);
            System.out.println("最大值：Integer.MAX_VALUE=" + Integer.MAX_VALUE);
            System.out.println();

            // long
            System.out.println("基本类型：long 二进制位数：" + Long.SIZE);
            System.out.println("包装类：java.lang.Long");
            System.out.println("最小值：Long.MIN_VALUE=" + Long.MIN_VALUE);
            System.out.println("最大值：Long.MAX_VALUE=" + Long.MAX_VALUE);
            System.out.println();

            // float
            System.out.println("基本类型：float 二进制位数：" + Float.SIZE);
            System.out.println("包装类：java.lang.Float");
            System.out.println("最小值：Float.MIN_VALUE=" + Float.MIN_VALUE);
            System.out.println("最大值：Float.MAX_VALUE=" + Float.MAX_VALUE);
            System.out.println();

            // double
            System.out.println("基本类型：double 二进制位数：" + Double.SIZE);
            System.out.println("包装类：java.lang.Double");
            System.out.println("最小值：Double.MIN_VALUE=" + Double.MIN_VALUE);
            System.out.println("最大值：Double.MAX_VALUE=" + Double.MAX_VALUE);
            System.out.println();

            // char
            System.out.println("基本类型：char 二进制位数：" + Character.SIZE);
            System.out.println("包装类：java.lang.Character");
            // 以数值形式而不是字符形式将Character.MIN_VALUE输出到控制台
            System.out.println("最小值：Character.MIN_VALUE="
            + (int) Character.MIN_VALUE);
            // 以数值形式而不是字符形式将Character.MAX_VALUE输出到控制台
            System.out.println("最大值：Character.MAX_VALUE="
            + (int) Character.MAX_VALUE);
    }
}