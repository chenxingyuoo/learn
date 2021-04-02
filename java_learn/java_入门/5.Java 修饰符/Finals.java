public class Finals{

        final int value=10;
        // 下面是声明常量的实例
        public static final int BOXWIDTH=6;
        static final String NAME="Manager";

        public void changeValue(){
                value=12; //将输出一个错误 , 因为常量是不可修改的
                }

        //Final 方法
        public final void changeName(){
                // 方法体
                NAME = "chen";   //将输出一个错误 , 因为常量是不可修改的
                }

}

//Final类
//Final 类不能被继承，没有类能够继承 final 类的任何特性。

//public final class Test {
//    // 类体
//}