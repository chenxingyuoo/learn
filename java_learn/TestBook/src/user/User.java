package user;

import book.BookList;
import operation.IOperation;

abstract public class User {
    protected String name;
    public IOperation[] operations;


    public User(String name) {
        this.name = name;
    }


    abstract public int getMenus() throws IllegalAccessError;

    public void doOperation(int choice, BookList bookList) {
        this.operations[choice].work(bookList);
    };
}
