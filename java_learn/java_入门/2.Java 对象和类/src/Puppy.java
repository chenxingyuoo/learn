/**
 * Created by chenxingyu on 2017/1/1.
 */
public class Puppy {
    int puppyAge;

    public Puppy(String name) {
        // 这个构造器仅有一个参数：name
        System.out.println("小狗的名字是 : " + name);
    }

    /**
     * @param age
     */
    public void setAge(int age) {
        puppyAge = age;
    }

    /**
     * @return puppyAge
     */
    public int getAge() {
        System.out.println("小狗的年龄为 : " + puppyAge);
        return puppyAge;
    }

    public static void main(String[] args) {
        /* 创建对象 */
        Puppy myPuppy = new Puppy("tommy");
          /* 通过方法来设定age */
        myPuppy.setAge(2);
          /* 调用另一个方法获取age */
        myPuppy.getAge();
         /*你也可以像下面这样访问成员变量 */
        System.out.println("变量值 : " + myPuppy.puppyAge);

    }
}
