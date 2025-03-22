package book;

public class BookList {
     protected Book[] books = new Book[10];
     protected int useSize;

     public BookList() {
          this.books[0] = new Book("三国演义", "罗贯中", "小说", 88);
          this.books[1] = new Book("西游记", "吴承恩", "小说", 66);
          this.books[2] = new Book("红楼梦", "曹雪芹", "小说", 55);
          this.useSize = 3;
     }

     public Book getBookByIndex(int index) {
          return books[index];
     }

     public void setBook(int index, Book book) {
          this.books[index] = book;
     }

     public Book[] getBooks() {
          return books;
     }

     public void setBooks(Book[] books) {
          this.books = books;
     }

     public int getUseSize() {
          return useSize;
     }

     public void setUseSize(int useSize) {
          this.useSize = useSize;
     }
}
