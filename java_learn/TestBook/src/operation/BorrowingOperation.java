package operation;

import book.Book;
import book.BookList;

import java.util.Scanner;

public class BorrowingOperation implements IOperation{
    @Override
    public void work(BookList bookList) {
        System.out.println("请输入你要借阅的图书名称：");

        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();

        for (int i = 0; i < bookList.getUseSize(); i++) {
            Book book = bookList.getBookByIndex(i);
            if (name.equals(book.getName())) {
                book.setBorrowed(true);
                System.out.println("借阅图书成功!");
                return;
            }
        }

        System.out.println("找不到你要借阅的图书!");
    }
}
