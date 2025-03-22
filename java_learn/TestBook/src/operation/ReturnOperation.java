package operation;

import book.Book;
import book.BookList;

import java.util.Scanner;

public class ReturnOperation implements IOperation{
    @Override
    public void work(BookList bookList) {
        System.out.println("请输入你要归还的图书名称：");

        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();

        for (int i = 0; i < bookList.getUseSize(); i++) {
            Book book = bookList.getBookByIndex(i);
            if (name.equals(book.getName())) {
                book.setBorrowed(false);
                System.out.println("归还图书成功!");
                return;
            }
        }

        System.out.println("找不到你要归还的图书!");
    }
}
