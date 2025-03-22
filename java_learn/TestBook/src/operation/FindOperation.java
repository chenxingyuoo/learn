package operation;

import book.Book;
import book.BookList;

import java.util.Scanner;

public class FindOperation implements IOperation{
    @Override
    public void work(BookList bookList) {
        System.out.println("请输入你要查找的图书：");
        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();

        for (int i = 0; i < bookList.getUseSize(); i++) {
            Book book = bookList.getBookByIndex(i);
            if (name.equals(book.getName())) {
                System.out.println(book);
                return;
            }
        }
        System.out.println("找不到该书");
    }
}

