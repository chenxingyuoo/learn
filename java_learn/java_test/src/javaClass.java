/**
 * Created by chenxingyu on 2017/1/1.
 */
public class javaClass {
    public javaClass(String name){
        //这个构造器仅有一个参数：name
        System.out.println("javaClass的名字是 : " + name );
    }
    public static void main(String []args) {
        // 下面的语句将创建一个javaClass对象
        javaClass myJavaClass = new javaClass( "chen" );

    }
}
