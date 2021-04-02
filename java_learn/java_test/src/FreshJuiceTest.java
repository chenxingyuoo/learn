/**
 * Created by chenxingyu on 2017/1/1.
 */
public class FreshJuiceTest {
    public static void main(String []args) {
        FreshJuice juice = new FreshJuice();
        juice.size = FreshJuice.FreshJuiceSize.MEDIUM  ;
        System.out.println(juice.size);
    }
}