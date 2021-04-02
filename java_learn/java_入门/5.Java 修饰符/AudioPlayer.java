//受保护的访问修饰符-protected
//    被声明为 protected 的变量、方法和构造器能被同一个包中的任何其他类访问，也能够被不同包中的子类访问。
//    Protected 访问修饰符不能修饰类和接口，方法和成员变量能够声明为 protected，但是接口的成员变量和成员方法不能声明为 protected。
//    子类能访问 Protected 修饰符声明的方法和变量，这样就能保护不相关的类使用这些方法和变量。
//    下面的父类使用了 protected 访问修饰符，子类重载了父类的 openSpeaker() 方法。

class AudioPlayer {
    protected boolean openSpeaker(Speaker sp) {
        // 实现细节
    }
}

class StreamingAudioPlayer {
    boolean openSpeaker(Speaker sp) {
        // 实现细节
    }
}