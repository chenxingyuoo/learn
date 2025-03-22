package operation;

import book.Book;
import book.BookList;

import java.util.Scanner;

public class AddOperation implements IOperation{
    @Override
    public void work(BookList bookList) {
        System.out.println("添加图书");

        Scanner scanner = new Scanner(System.in);

        System.out.println("请输入你要添加的图书名称：");

        String name = scanner.nextLine();

        System.out.println("请输入你要添加的图书作者：");

        String author = scanner.nextLine();

        System.out.println("请输入你要添加的图书类型：");

        String type = scanner.nextLine();

        System.out.println("请输入你要添加的图书价格：");

        double price = scanner.nextDouble();

        Book book = new Book(name, author, type, price);

        int useSize = bookList.getUseSize();
        bookList.setBook(useSize, book);
        bookList.setUseSize(useSize + 1);
    }
}
