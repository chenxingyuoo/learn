package operation;

import book.Book;
import book.BookList;

public class DisplayOperation implements IOperation{
    @Override
    public void work(BookList bookList) {
        System.out.println("显示图书");

        int useSize = bookList.getUseSize();

        for (int i = 0; i < useSize; i++) {
            Book book = bookList.getBookByIndex(i);
            System.out.println(book);
        }
    }
}
