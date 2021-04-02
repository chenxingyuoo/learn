/**
 * Created by chenxingyu on 2016/12/31.
 */
public class Test {
    public static void main(String[] args) {

        System.out.println(Tools.addGoodMorningBefore("chen"));
    }
}

abstract class Tools {
    public static String addGoodMorningBefore(String name) {
        return String.format("Good Morning ,%s", name);
    }

    abstract void process();
}
