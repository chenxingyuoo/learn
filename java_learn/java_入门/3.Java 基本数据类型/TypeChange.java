//自动类型转换
//public class TypeChange {
//    public static void main(String[] args) {
//        char c1 = 'a';//定义一个char类型
//        int i1 = c1;//char自动类型转换为int
//        System.out.println("char自动类型转换为int后的值等于" + i1);
//
//        char c2 = 'A';//定义一个char类型
//        int i2 = c2 + 1;//char 类型和 int 类型计算
//        System.out.println("char类型和int计算后的值等于" + i2);
//
//    }
//}

//c1的值为字符'a',查ascii码表可知对应的int类型值为97，'A'对应值为65，所以i2= 65 + 1=66。

// 结果
// char自动类型转换为int后的值等于 97
// char类型和int计算后的值等于 66


//强制类型转换
public class TypeChange {
    public static void main(String[] args) {
        int i1 = 123;
        byte b = (byte) i1;//强制类型转换为byte
        System.out.println("int强制类型转换为byte后的值等于" + b);
    }
}

// 结果
//int强制类型转换为byte后的值等于123
