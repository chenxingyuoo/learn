package com.atguigu.spring6.iocxml.di;

public class Book {
    private String name;
    private String author;

    private String others;

    public Book() {
    }

    public Book(String name, String author) {
        System.out.println("有参数构造创建");
        this.name = name;
        this.author = author;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getOthers() {
        return others;
    }

    public void setOthers(String others) {
        this.others = others;
    }

    public static void main(String[] args) {
        Book book = new Book();
        book.setName("Java");
        book.setAuthor("尚硅谷");

        Book book1 = new Book("Java", "尚硅谷");
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", others='" + others + '\'' +
                '}';
    }
}
