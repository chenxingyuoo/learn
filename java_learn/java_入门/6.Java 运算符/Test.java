//位运算符
public class Test {
    public static void main(String args[]){
        int a = 60; /* 60 = 0011 1100 */
        int b = 13; /* 13 = 0000 1101 */
        int c = 0;
        c = a & b;       /* 12 = 0000 1100 */
        System.out.println("a & b = " + c );

        c = a | b;       /* 61 = 0011 1101 */
        System.out.println("a | b = " + c );

        c = a ^ b;       /* 49 = 0011 0001 */
        System.out.println("a ^ b = " + c );

        c = ~a;          /*-61 = 1100 0011 */
        System.out.println("~a = " + c );

        c = a << 2;     /* 240 = 1111 0000 */
        System.out.println("a << 2 = " + c );

        c = a >> 2;     /* 15 = 1111 */
        System.out.println("a >> 2  = " + c );

        c = a >>> 2;     /* 15 = 0000 1111 */
        System.out.println("a >>> 2 = " + c );
    }
}

//a & b = 12
//a | b = 61
//a ^ b = 49
//~a = -61
//a << 2 = 240
//a >> 15
//a >>> 15


//赋值运算符

public class Test {
    public static void main(String args[]) {
        int a = 10;
        int b = 20;
        int c = 0;
        c = a + b;
        System.out.println("c = a + b = " + c );
        c += a ;
        System.out.println("c += a  = " + c );
        c -= a ;
        System.out.println("c -= a = " + c );
        c *= a ;
        System.out.println("c *= a = " + c );
        a = 10;
        c = 15;
        c /= a ;
        System.out.println("c /= a = " + c );
        a = 10;
        c = 15;
        c %= a ;
        System.out.println("c %= a  = " + c );
        c <<= 2 ;
        System.out.println("c <<= 2 = " + c );
        c >>= 2 ;
        System.out.println("c >>= 2 = " + c );
        c >>= 2 ;
        System.out.println("c >>= a = " + c );
        c &= a ;
        System.out.println("c &= 2  = " + c );
        c ^= a ;
        System.out.println("c ^= a   = " + c );
        c |= a ;
        System.out.println("c |= a   = " + c );
    }
}

//c = a + b = 30
//c += a  = 40
//c -= a = 30
//c *= a = 300
//c /= a = 1
//c %= a  = 5
//c <<= 2 = 20
//c >>= 2 = 5
//c >>= 2 = 1
//c &= a  = 0
//c ^= a   = 10
//c |= a   = 10


//条件运算符（?:）
public class Test {
    public static void main(String args[]){
        int a , b;
        a = 10;
        b = (a == 1) ? 20 : 30;
        System.out.println( "Value of b is : " +  b );
        b = (a == 10) ? 20 : 30;
        System.out.println( "Value of b is : " + b );
    }
}

//    Value of b is : 30
//        Value of b is : 20


//instanceof 运算符
//该运算符用于操作对象实例，检查该对象是否是一个特定类型（类类型或接口类型）。

( Object reference variable ) instanceof  (class/interface type)

//如果运算符左侧变量所指的对象，是操作符右侧类或接口(class/interface)的一个对象，那么结果为真。
        String name = 'James';
        boolean result = name instanceof String; // 由于 name 是 String 类型，所以返回真


//如果被比较的对象兼容于右侧类型,该运算符仍然返回true。
class Vehicle {}

public class Car extends Vehicle {
    public static void main(String args[]){
        Vehicle a = new Car();
        boolean result =  a instanceof Car;
        System.out.println( result);
    }
}
