import book.BookList;
import operation.AddOperation;
import operation.IOperation;
import user.AdminUser;
import user.NormalUser;
import user.User;

import java.util.Scanner;

public class Main {

    public static User login () {
        System.out.println("请输入你的姓名");
        Scanner scanner = new Scanner(System.in);
        String userName = scanner.nextLine();
        System.out.println("请输入你的身份：1-管理员，0-普通用户");
        int choice = scanner.nextInt();

        User user;
        if (choice == 1) {
            user = new AdminUser(userName);
        } else {
            user = new NormalUser(userName);
        }
        return user;
    }

    public static void main(String[] args) {

        BookList bookList = new BookList();

        User user = login();

        while (true) {
            int choice = user.getMenus();
            user.doOperation(choice, bookList);
        }

    }
}