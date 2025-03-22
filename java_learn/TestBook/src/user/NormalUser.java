package user;

import operation.*;

import java.util.Scanner;

/**
 * 普通用户
 */
public class NormalUser extends User {

    public NormalUser(String name) {
        super(name);

        this.operations = new IOperation[]{new ExitOperation(), new FindOperation(), new BorrowingOperation(), new ReturnOperation()};
    }

    public int getMenus() {
        System.out.println("1.查找图书");
        System.out.println("2.借阅图书");
        System.out.println("3.归还图书");
        System.out.println("0.退出系统");
        System.out.println("请输入你的操作：");
        Scanner scanner = new Scanner(System.in);
        int choice = scanner.nextInt();
        return choice;
    }
}
