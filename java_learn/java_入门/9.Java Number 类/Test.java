//一般地，当需要使用数字的时候，我们通常使用内置数据类型，如：byte、int、long、double 等。
//int a = 5000;
//        float b = 13.65;
//        byte c = 0x4a;

//然而，在实际开发过程中，我们经常会遇到需要使用对象，而不是内置数据类型的情形。为了解决这个问题，Java 语言为每一个内置数据类型提供了对应的包装类。
//        所有的包装类（Integer、Long、Byte、Double、Float、Short）都是抽象类 Number 的子类。


//这种由编译器特别支持的包装称为装箱，所以当内置数据类型被当作对象使用的时候，编译器会把内置类型装箱为包装类。
// 相似的，编译器也可以把一个对象拆箱为内置类型。Number 类属于 java.lang 包。
//        下面是一个使用 Integer 对象的实例：

//public class Test{
//    public static void main(String args[]){
//        Integer x = 5;
//        x =  x + 10;
//        System.out.println(x);
//    }
//}


//    Number 方法

//1.	xxxValue() 将number对象转换为xxx数据类型的值并返回。

public class Test{
    public static void main(String args[]){
        Integer x = 5;
        // 返回 byte 原生数据类型
        System.out.println( x.byteValue() );

        // 返回 double 原生数据类型
        System.out.println(x.doubleValue());

        // 返回 long 原生数据类型
        System.out.println( x.longValue() );

        // 返回 float 原生数据类型
        System.out.println(x.floatValue());

        // 返回 int 原生数据类型
        System.out.println(x.intValue());

        // 返回 short 原生数据类型
        System.out.println(x.shortValue());

    }
}



//结果
//5
//5.0
//5
//5.0
//5
//5


//2.compareTo() 将number对象与参数比较。
//ompareTo() 方法用于将 Number 对象与方法的参数进行比较。可用于比较 Byte, Long, Integer等。
//该方法用于两个相同数据类型的比较，两个不同类型的数据不能用此方法来比较。

//语法
//public int compareTo( NumberSubClass referenceName )

//referenceName -- 可以是一个 Byte, Double, Integer, Float, Long 或 Short 类型的参数。

//返回值
//        如果指定的数与参数相等返回0。
//        如果指定的数小于参数返回 -1。
//        如果指定的数大于参数返回 1。

public class Test1{
    public static void main(String args[]){
        Integer x = 5;
        System.out.println(x.compareTo(3));
        System.out.println(x.compareTo(5));
        System.out.println(x.compareTo(8));
    }
}

//结果
//1
//0
//-1


//3.equals()  判断number对象是否与参数相等。

//语法

//    public boolean equals(Object o)

//        o -- 任何对象。
//返回值
//        如 Number 对象不为 Null，且与方法的参数类型与数值都相等返回 True，否则返回 False。
//        Double 和 Float 对象还有一些额外的条件，可以参阅 API 手册：JDK 1.6。

public class Test2{
    public static void main(String args[]){
        Integer x = 5;
        Integer y = 10;
        Integer z =5;
        Short a = 5;

        System.out.println(x.equals(y));
        System.out.println(x.equals(z));
        System.out.println(x.equals(a));
    }
}

//false
//true
//false


//4.valueOf()  返回一个 Number 对象指定的内置数据类型
//valueOf() 方法用于返回给定参数的原生 Number 对象值，参数可以是原生数据类型, String等。
//        该方法是静态方法。该方法可以接收两个参数一个是字符串，一个是基数。

//语法
//static Integer valueOf(int i)
//    static Integer valueOf(String s)
//    static Integer valueOf(String s, int radix)

//i -- Integer 对象的整数。
//        s -- Integer 对象的字符串。
//        radix --在解析字符串 s 时使用的基数，用于指定使用的进制数。

//返回值
//        Integer valueOf(int i)：返回一个表示指定的 int 值的 Integer 实例。
//        Integer valueOf(String s):返回保存指定的 String 的值的 Integer 对象。
//        Integer valueOf(String s, int radix): 返回一个 Integer 对象，该对象中保存了用第二个参数提供的基数进行解析时从指定的 String 中提取的值。

public class Test3{
    public static void main(String args[]) {
        Integer x =Integer.valueOf(9);
        Double c = Double.valueOf(5);
        Float a = Float.valueOf("80");

        Integer b = Integer.valueOf("444",16);   // 使用 16 进制

        System.out.println(x);
        System.out.println(c);
        System.out.println(a);
        System.out.println(b);
    }
}

//9
//5.0
//80.0
//1092


//5.toString() 以字符串形式返回值。
//valueOf() 方法用于返回以一个字符串表示的 Number 对象值。
//        如果方法使用了原生的数据类型作为参数，返回原生数据类型的 String 对象值。
//        如果方法有两个参数， 返回用第二个参数指定基数表示的第一个参数的字符串表示形式。

// 以 String 类为例，该方法有以下几种语法格式：
// String toString()
// static String toString(int i)

//参数
//i -- 要转换的整数。

//参数
// toString(): 返回表示 Integer 值的 String 对象。
// toString(int i): 返回表示指定 int 的 String 对象。

public class Test4{
    public static void main(String args[]){
        Integer x = 5;

        System.out.println(x.toString());
        System.out.println(Integer.toString(12));
    }
}

//5
//12


//6	parseInt()
//将字符串解析为int类型。

public class Test5{
    public static void main(String args[]){
        int x =Integer.parseInt("9");
        double c = Double.parseDouble("5");
        int b = Integer.parseInt("444",16);

        System.out.println(x);
        System.out.println(c);
        System.out.println(b);
    }
}

//9
//5.0
//1092

//7	abs()
//返回参数的绝对值。

public class Test6{
    public static void main(String args[]){
        Integer a = -8;
        double d = -100;
        float f = -90;

        System.out.println(Math.abs(a));
        System.out.println(Math.abs(d));
        System.out.println(Math.abs(f));
    }
}

//8
//100.0
//90.0


//8	ceil()
//对整形变量向左取整，返回类型为double型。

//语法格式：
//double ceil(double d)

//    double ceil(float f)

//参数 double 或 float 的原生数据类型。

//返回值
//        返回 double 类型，返回值大于或等于给定的参数。
public class Test7{
    public static void main(String args[]){
        double d = 100.675;
        float f = -90;

        System.out.println(Math.ceil(d));
        System.out.println(Math.ceil(f));

        System.out.println(Math.floor(d));
        System.out.println(Math.floor(f));
    }
}

//101.0
//-90.0
//100.0
//-90.0



//9	floor()
//对整型变量向右取整。返回类型为double类型。

//语法格式：
//double floor(double d)

//    double floor(float f)

//参数
//        double 或 float 的原生数据类型。
//        返回值
//        返回 double 类型数组，小于或等于给定的参数。

public class Test8{
    public static void main(String args[]){
        double d = 100.675;
        float f = -90;

        System.out.println(Math.floor(d));
        System.out.println(Math.floor(f));

        System.out.println(Math.ceil(d));
        System.out.println(Math.ceil(f));
    }
}

//100.0
//-90.0
//101.0
//-90.0

//10	rint()
//返回与参数最接近的整数。返回类型为double。

//语法
//double rint(double d)
//参数
//        double 原始数据类型。
//        返回值
//        返回 double 类型数组，是最接近参数的整数值。

public class Test{
    public static void main(String args[]){
        double d = 100.675;
        double e = 100.500;
        double f = 100.200;

        System.out.println(Math.rint(d));
        System.out.println(Math.rint(e));
        System.out.println(Math.rint(f));
    }
}

//101.0
//100.0
//100.0


//11	round()
//返回一个最接近的int、long型值。

//该方法有以下几种语法格式：
//        long round(double d)
//
//        int round(float f)

//参数
//        d -- double 或 float 的原生数据类型
//        f -- float 原生数据类型
//        返回值
//        返回一个最接近的int、long型值，方法会指定返回的数据类型。

public class Test{
    public static void main(String args[]){
        double d = 100.675;
        double e = 100.500;
        float f = 100;
        float g = 90f;

        System.out.println(Math.round(d));
        System.out.println(Math.round(e));
        System.out.println(Math.round(f));
        System.out.println(Math.round(g));
    }
}

//101
//101
//100
//90



//12	min()
//返回两个参数中的最小值。

//语法格式：
//double min(double arg1, double arg2)
//float min(float arg1, float arg2)
//int min(int arg1, int arg2)
//long min(long arg1, long arg2)

//参数
//        该方法接受两个原生数据类型作为参数。
//        返回值
//        返回两个参数中的最小值。

public class Test{
    public static void main(String args[]){
        System.out.println(Math.min(12.123, 12.456));
        System.out.println(Math.min(23.12, 23.0));
    }
}

//12.123
//23.0



//13	max()
//返回两个参数中的最大值。

//语法格式：
//        double max(double arg1, double arg2)
//        float max(float arg1, float arg2)
//        int max(int arg1, int arg2)
//        long max(long arg1, long arg2)

//参数
//        该方法接受两个原生数据类型作为参数。
//        返回值
//        返回两个参数中的最大值。

public class Test{
    public static void main(String args[]){
        System.out.println(Math.max(12.123, 18.456));
        System.out.println(Math.max(23.12, 23.0));
    }
}

//18.456
//23.12

//14	exp()
//返回自然数底数e的参数次方。

//语法格式：
//        double exp(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回自然数底数e的参数次方。

public class Test{
    public static void main(String args[]){
        double x = 11.635;
        double y = 2.76;

        System.out.printf("e 的值为 %.4f%n", Math.E);
        System.out.printf("exp(%.3f) 为 %.3f%n", x, Math.exp(x));
    }
}

//    e 的值为 2.7183
//        exp(11.635) 为 112983.831

//15	log()
//返回参数的自然数底数的对数值。

//语法
//        double log(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回参数的自然数底数的对数值。

public class Test{
    public static void main(String args[]){
        double x = 11.635;
        double y = 2.76;

        System.out.printf("e 的值为 %.4f%n", Math.E);
        System.out.printf("log(%.3f) 为 %.3f%n", x, Math.log(x));
    }
}

//    e 的值为 2.7183
//        log(11.635) 为 2.454


//16	pow()
//返回第一个参数的第二个参数次方。

//语法
//        double pow(double base, double exponent)

//参数
//        base -- 任何原生数据类型。
//        exponent -- 任何原生数据类型。
//        返回值
//        返回第一个参数的第二个参数次方。

public class Test{
    public static void main(String args[]){
        double x = 11.635;
        double y = 2.76;

        System.out.printf("e 的值为 %.4f%n", Math.E);
        System.out.printf("pow(%.3f, %.3f) 为 %.3f%n", x, y, Math.pow(x, y));
    }
}

//    e 的值为 2.7183
//        pow(11.635, 2.760) 为 874.008


//17	sqrt()
//求参数的算术平方根。

//语法
//        double sqrt(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回参数的算术平方根。


public class Test{
    public static void main(String args[]){
        double x = 11.635;
        double y = 2.76;

        System.out.printf("e 的值为 %.4f%n", Math.E);
        System.out.printf("sqrt(%.3f) 为 %.3f%n", x, Math.sqrt(x));
    }
}

//    e 的值为 2.7183
//        sqrt(11.635) 为 3.411


//18	sin()
//求指定double类型参数的正弦值。

//语法
//        double sin(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的正弦值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.1f 度的正弦值为 %.4f%n", degrees, Math.sin(radians));

    }
}

//    pi 的值为 3.1416
//        45.0 度的正弦值为 0.7071


//19	cos()
//求指定double类型参数的余弦值。

//语法
//        double cos(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的余弦值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.1f 度的余弦值为 %.4f%n", degrees, Math.cos(radians));

    }
}

//    pi 的值为 3.1416
//        45.0 度的余弦值为 0.7071


//20	tan()
//求指定double类型参数的正切值。

//语法
//        double tan(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的正切值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.1f 度的正切值是 %.4f%n", degrees, Math.tan(radians));

    }
}

//    pi 的值为 3.1416
//        45.0 度的正切值是 1.0000


//21	asin()
//求指定double类型参数的反正弦值。

//语法
//        double asin(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的反正弦值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.4f 的反正弦值为 %.4f 度 %n", Math.sin(radians), Math.toDegrees(Math.asin(Math.sin(radians))));

    }
}

//    pi 的值为 3.1416
//        0.7071 的反正弦值为 45.0000 度


//22	acos()
//求指定double类型参数的反余弦值。

//语法
//        double acos(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的反余弦值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.4f 的反余弦值为 %.4f 度 %n", Math.cos(radians), Math.toDegrees(Math.acos(Math.sin(radians))));

    }
}

//    pi 的值为 3.1416
//        0.7071 的反余弦值为 45.0000 度

//23	atan()
//求指定double类型参数的反正切值。

//语法
//        double atan(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        返回指定double类型参数的反正切值。

public class Test{
    public static void main(String args[]){

        double degrees = 45.0;
        double radians = Math.toRadians(degrees);

        System.out.format("pi 的值为 %.4f%n", Math.PI);
        System.out.format("%.4f 的反正切值 %.4f 度 %n", Math.cos(radians), Math.toDegrees(Math.atan(Math.sin(radians))));

    }
}

//    pi 的值为 3.1416
//        0.7071 的反正切值 35.2644 度

//24	atan2()
//将笛卡尔坐标转换为极坐标，并返回极坐标的角度值。

// atan2() 方法用于将矩形坐标 (x, y) 转换成极坐标 (r, theta)，返回所得角 theta。该方法通过计算 y/x 的反正切值来计算相角 theta，范围为从 -pi 到 pi。

//语法
//        double atan2(double y, double x)

//参数
//        y -- 纵坐标。
//        x -- 横坐标。
//        返回值
//        与笛卡儿坐标中点 (x, y) 对应的极坐标中点 (r, theta) 的 theta 组件。

public class Test{
    public static void main(String args[]){
        double x = 45.0;
        double y = 30.0;

        System.out.println( Math.atan2(x, y) );
    }
}

//0.982793723247329


//25	toDegrees()
//将参数转化为角度。

//语法
//        double toDegrees(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        该方法返回 double 值。

public class Test{
    public static void main(String args[]){
        double x = 45.0;
        double y = 30.0;

        System.out.println( Math.toDegrees(x) );
        System.out.println( Math.toDegrees(y) );
    }
}

// 2578.3100780887044
// 1718.8733853924698

//26	toRadians()
//将角度转换为弧度。

//语法
//        double toRadians(double d)

//参数
//        d -- 任何原生数据类型。
//        返回值
//        该方法返回 double 值。

public class Test{
    public static void main(String args[]){
        double x = 45.0;
        double y = 30.0;

        System.out.println( Math.toRadians(x) );
        System.out.println( Math.toRadians(y) );
    }
}

//0.7853981633974483
//        0.5235987755982988

//27	random()
//返回一个随机数。

//语法
//static double random()

//参数
//        这是一个默认方法，不接受任何参数。

public class Test{
    public static void main(String args[]){
        System.out.println( Math.random() );
        System.out.println( Math.random() );
    }
}

//0.5444085967267008
//        0.7960235983184115