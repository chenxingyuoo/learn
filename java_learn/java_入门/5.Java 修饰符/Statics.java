public class Statics {
    private static int numInstances = 0;

    protected static int getCount() {
        return numInstances;
    }

    private static void addInstance() {
        numInstances = numInstances + 1;
    }

    //构造器
    Statics() {
        Statics.addInstance();
    }

    public static void main(String[] arguments) {
        System.out.println("Starting with " +
                Statics.getCount() + " instances");

        for (int i = 0; i < 500; ++i) {
            new Statics();
        }

        System.out.println("Created " +
                Statics.getCount() + " instances");

    }
}

//结果
//    Starting with 0 instances
//        Created 500 instances