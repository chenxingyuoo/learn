package user;

import book.BookList;
import operation.*;

import java.util.Scanner;

/**
 * 管理员用户
 */
public class AdminUser extends User{

    public AdminUser(String name) {
        super(name);
        this.operations = new IOperation[]{new ExitOperation(), new FindOperation(), new AddOperation(), new DelOperation(), new DisplayOperation()};
    }

    public int getMenus() {
        System.out.println("*********");
        System.out.println("1.查找图书");
        System.out.println("2.新增图书");
        System.out.println("3.删除图书");
        System.out.println("4.显示图书");
        System.out.println("0.退出系统");
        System.out.println("*********");
        System.out.println("请输入你的操作：");
        Scanner scanner = new Scanner(System.in);
        int choice = scanner.nextInt();
        return choice;
    }
}
