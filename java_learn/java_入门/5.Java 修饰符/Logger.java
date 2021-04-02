//Java语言提供了很多修饰符，主要分为以下两类：
//        访问修饰符
//        非访问修饰符
//修饰符用来定义类、方法或者变量，通常放在语句的最前端。我们通过下面的例子来说明：

//public class className {
//    // ...
//}
////私有的，以 private 修饰符指定，在同一类内可见。
//    private boolean myFlag;
//
////共有的，以 public 修饰符指定，对所有类可见。
//public void test(String name){
//    System.out.println("名字 : " + name );
//        }
//
//    static final double weeks = 9.5;
//
//
////受保护的，以 protected 修饰符指定，对同一包内的类和所有子类可见。
//    protected static final int BOXWIDTH = 42;
//
//    public static void main(String[] arguments) {
//        // 方法体
//    }


//私有访问修饰符-private
public class Logger {
    private String format;
    public String getFormat() {
        return this.format;
    }
    public void setFormat(String format) {
        this.format = format;
    }
}

//实例中，Logger 类中的 format 变量为私有变量，所以其他类不能直接得到和设置该变量的值。
// 为了使其他类能够操作该变量，定义了两个 public 方法：getFormat() （返回 format的值）和 setFormat(String)（设置 format 的值）


//公有访问修饰符-public

//被声明为 public 的类、方法、构造方法和接口能够被任何其他类访问。
//        如果几个相互访问的 public 类分布在不同的包中，则需要导入相应 public 类所在的包。由于类的继承性，类所有的公有方法和变量都能被其子类继承。
//        以下函数使用了公有访问控制：

//    public static void main(String[] arguments) {
//        // ...
//    }

//    Java 程序的 main() 方法必须设置成公有的，否则，Java 解释器将不能运行该类。


//受保护的访问修饰符-protected
//被声明为 protected 的变量、方法和构造器能被同一个包中的任何其他类访问，也能够被不同包中的子类访问。
//        Protected 访问修饰符不能修饰类和接口，方法和成员变量能够声明为 protected，但是接口的成员变量和成员方法不能声明为 protected。
//        子类能访问 Protected 修饰符声明的方法和变量，这样就能保护不相关的类使用这些方法和变量。
//        下面的父类使用了 protected 访问修饰符，子类重载了父类的 openSpeaker() 方法。

class AudioPlayer {
    protected boolean openSpeaker(Speaker sp) {
        // 实现细节
    }
}

class StreamingAudioPlayer {
    boolean openSpeaker(Speaker sp) {
        // implementation details
    }
}