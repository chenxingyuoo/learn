
//定义结构体

// type Books struct {
//    title string
//    author string
//    subject string
//    book_id int
// }

//一旦定义了结构体类型，它就能用于变量的声明，语法格式如下：
// book1 := Books {value1, value2...valuen}


//访问结构体成员
// package main

// import "fmt"

// type Books struct {
//    title string
//    author string
//    subject string
//    book_id int
// }

// func main() {
//    var Book1 Books        /* 声明 Book1 为 Books 类型 */
//    var Book2 Books        /* 声明 Book2 为 Books 类型 */

//    /* book 1 描述 */
//    Book1.title = "Go 语言"
//    Book1.author = "www.runoob.com"
//    Book1.subject = "Go 语言教程"
//    Book1.book_id = 6495407

//    /* book 2 描述 */
//    Book2.title = "Python 教程"
//    Book2.author = "www.runoob.com"
//    Book2.subject = "Python 语言教程"
//    Book2.book_id = 6495700

//    /* 打印 Book1 信息 */
//    fmt.Printf( "Book 1 title : %s\n", Book1.title)
//    fmt.Printf( "Book 1 author : %s\n", Book1.author)
//    fmt.Printf( "Book 1 subject : %s\n", Book1.subject)
//    fmt.Printf( "Book 1 book_id : %d\n", Book1.book_id)

//    /* 打印 Book2 信息 */
//    fmt.Printf( "Book 2 title : %s\n", Book2.title)
//    fmt.Printf( "Book 2 author : %s\n", Book2.author)
//    fmt.Printf( "Book 2 subject : %s\n", Book2.subject)
//    fmt.Printf( "Book 2 book_id : %d\n", Book2.book_id)
// }

//Book 1 title : Go 语言
// Book 1 author : www.runoob.com
// Book 1 subject : Go 语言教程
// Book 1 book_id : 6495407
// Book 2 title : Python 教程
// Book 2 author : www.runoob.com
// Book 2 subject : Python 语言教程
// Book 2 book_id : 6495700


//结构体作为函数参数
// package main

// import "fmt"

// type Books struct {
//    title string
//    author string
//    subject string
//    book_id int
// }

// func main() {
//    var Book1 Books        /* 声明 Book1 为 Books 类型 */
//    var Book2 Books        /* 声明 Book2 为 Books 类型 */

//    /* book 1 描述 */
//    Book1.title = "Go 语言"
//    Book1.author = "www.runoob.com"
//    Book1.subject = "Go 语言教程"
//    Book1.book_id = 6495407

//    /* book 2 描述 */
//    Book2.title = "Python 教程"
//    Book2.author = "www.runoob.com"
//    Book2.subject = "Python 语言教程"
//    Book2.book_id = 6495700

//    /* 打印 Book1 信息 */
//    printBook(Book1)

//    /* 打印 Book2 信息 */
//    printBook(Book2)
// }

// func printBook( book Books ) {
//    fmt.Printf( "Book title : %s\n", book.title);
//    fmt.Printf( "Book author : %s\n", book.author);
//    fmt.Printf( "Book subject : %s\n", book.subject);
//    fmt.Printf( "Book book_id : %d\n", book.book_id);
// }

// Book title : Go 语言
// Book author : www.runoob.com
// Book subject : Go 语言教程
// Book book_id : 6495407
// Book title : Python 教程
// Book author : www.runoob.com
// Book subject : Python 语言教程
// Book book_id : 6495700



//结构体指针
// package main

// import "fmt"

// type Books struct {
//    title string
//    author string
//    subject string
//    book_id int
// }

// func main() {
//    var Book1 Books 
//    var book *Books;
//    /* book 1 描述 */
//    Book1.title = "Go 语言"
//    Book1.author = "www.runoob.com"
//    Book1.subject = "Go 语言教程"
//    Book1.book_id = 6495407

//    book = &Book1

//    fmt.Printf( "Book title : %s\n", book.title);
//    fmt.Printf( "Book author : %s\n", book.author);
//    fmt.Printf( "Book subject : %s\n", book.subject);
//    fmt.Printf( "Book book_id : %d\n", book.book_id);
// }

package main

import "fmt"

type Books struct {
   title string
   author string
   subject string
   book_id int
}

func main() {
   var Book1 Books        /* Declare Book1 of type Book */
   var Book2 Books        /* Declare Book2 of type Book */

   /* book 1 描述 */
   Book1.title = "Go 语言"
   Book1.author = "www.runoob.com"
   Book1.subject = "Go 语言教程"
   Book1.book_id = 6495407

   /* book 2 描述 */
   Book2.title = "Python 教程"
   Book2.author = "www.runoob.com"
   Book2.subject = "Python 语言教程"
   Book2.book_id = 6495700

   /* 打印 Book1 信息 */
   printBook(&Book1)

   /* 打印 Book2 信息 */
   printBook(&Book2)
}
func printBook( book *Books ) {
   fmt.Printf( "Book title : %s\n", book.title);
   fmt.Printf( "Book author : %s\n", book.author);
   fmt.Printf( "Book subject : %s\n", book.subject);
   fmt.Printf( "Book book_id : %d\n", book.book_id);
}


// Book title : Go 语言
// Book author : www.runoob.com
// Book subject : Go 语言教程
// Book book_id : 6495407
// Book title : Python 教程
// Book author : www.runoob.com
// Book subject : Python 语言教程
// Book book_id : 6495700
