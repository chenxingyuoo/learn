//Character 类用于对单个字符进行操作。
//        Character 类在对象中包装一个基本类型 char 的值

//char ch = 'a';

// Unicode 字符表示形式
//        char uniChar = '\u039A';

// 字符数组
//        char[] charArray ={ 'a', 'b', 'c', 'd', 'e' };

//然而，在实际开发过程中，我们经常会遇到需要使用对象，而不是内置数据类型的情况。为了解决这个问题，Java语言为内置数据类型char提供了包装类Character类。
//        Character类提供了一系列方法来操纵字符。你可以使用Character的构造方法创建一个Character类对象，例如：

Character ch = new Character('a');

//        在某些情况下，Java编译器会自动创建一个Character对象。
//        例如，将一个char类型的参数传递给需要一个Character类型参数的方法时，那么编译器会自动地将char类型参数转换为Character对象。 这种特征称为装箱，反过来称为拆箱。

// 原始字符 'a' 装箱到 Character 对象 ch 中
        Character ch = 'a';

        // 原始字符 'x' 用 test 方法装箱
// 返回拆箱的值到 'c'
        char c = test('x');


public class Test {
    public static void main(String args[]) {
        System.out.println("访问\"菜鸟教程!\"");
    }
}



//Character类的方法

//1	isLetter()
//是否是一个字母

//语法
//        boolean isLetter(char ch)

//参数
//        ch -- 要测试的字符。
//        返回值
//        如果字符为字母，则返回 true；否则返回 false。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.isLetter('c'));
        System.out.println(Character.isLetter('5'));
    }
}

//true
//        false


//2	isDigit()
//是否是一个数字字符

//语法
//        boolean isDigit(char ch)

//参数
//        ch -- 要测试的字符。
//        返回值
//        如果字符为数字，则返回 true；否则返回 false。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.isDigit('c'));
        System.out.println(Character.isDigit('5'));
    }
}

//false
//        true

//3	isWhitespace()
//是否是一个空格

//语法
//        boolean isWhitespace(char ch)

//参数
//        ch -- 要测试的字符。
//        返回值
//        如果字符为空白字符，则返回 true；否则返回 false。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.isWhitespace('c'));
        System.out.println(Character.isWhitespace(' '));
        System.out.println(Character.isWhitespace('\n'));
        System.out.println(Character.isWhitespace('\t'));
    }
}

//false
//true
//true
//true


//4	isUpperCase()
//是否是大写字母

//语法
//        boolean isUpperCase(char ch)

//参数
//        ch -- 要测试的字符。
//        返回值
//        如果字符为大写，则返回 true；否则返回 false。

public class Test {
    public static void main(String args[]) {
        System.out.println( Character.isUpperCase('c'));
        System.out.println( Character.isUpperCase('C'));
    }
}

//false
//        true


//5	isLowerCase()
//是否是小写字母

//语法
//        boolean isLowerCase(char ch)

//        参数
//        ch -- 要测试的字符。
//        返回值
//        如果字符为小写，则返回 true；否则返回 false。

public class Test {
    public static void main(String args[]) {
        System.out.println( Character.isLowerCase('c'));
        System.out.println( Character.isLowerCase('C'));
    }
}

//true
//        false


//6	toUpperCase()
//指定字母的大写形式

//语法
//        char toUpperCase(char ch)

//        参数
//        ch -- 要转换的字符。
//        返回值
//        返回转换后字符的大写形式，如果有的话；否则返回字符本身。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.toUpperCase('a'));
        System.out.println(Character.toUpperCase('A'));
    }
}

//    A
//            A



//7	toLowerCase()
//指定字母的小写形式

//语法
//        char toLowerCase(char ch)

//        参数
//        ch -- 要转换的字符。
//        返回值
//        返回转换后字符的小写形式，如果有的话；否则返回字符本身。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.toLowerCase('a'));
        System.out.println(Character.toLowerCase('A'));
    }
}

//    a
//            a


//8	toString()
//返回字符的字符串形式，字符串的长度仅为1

//语法
//        String toString(char ch)

//        参数
//        ch -- 要转换的字符。
//        返回值
//        返回指定 char 值的字符串表示形式。

public class Test {
    public static void main(String args[]) {
        System.out.println(Character.toString('a'));
        System.out.println(Character.toString('A'));
    }
}

//    a
//            A