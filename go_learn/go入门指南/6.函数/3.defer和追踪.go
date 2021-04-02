package main

import (
	"log"
	"io"
	"fmt"
)

//关键字 defer 允许我们推迟到函数返回之前（或任意位置执行 return 语句之后）一刻才执行某个语句或函数

func main() {
	function1()
	a()
	f()
	doDBOperations()
	b1()
	func1("haha")
}

func function1() {
    fmt.Printf("In function1 at the top\n")
	defer function2()
	fmt.Printf("In function1 at the bottom!\n")
}

func function2() {
    fmt.Println("function2: Deferred until the end of the calling function!")
}

//In Function1 at the top
// In Function1 at the bottom!
// Function2: Deferred until the end of the calling function!

func a() {
    i := 0
    defer fmt.Println(i)
    i++
	fmt.Println("newi",i)
    return
}

//1

func f() {
    for i := 0; i < 5; i++ {
        defer fmt.Printf("%d ", i)
    }
}

//关键字 defer 允许我们进行一些函数执行完成后的收尾工作，例如：

func connectToDB() {
    fmt.Println("ok, connected to db")
}

func disconnectFromDB() {
    fmt.Println("ok, disconnected from db")
}

func doDBOperations() {
	fmt.Println()
    connectToDB()
    fmt.Println("Defering the database disconnect.")
    defer disconnectFromDB() //function called here with defer
    fmt.Println("Doing some DB operations ...")
    fmt.Println("Oops! some crash or network error ...")
    fmt.Println("Returning from function here!")
    return //terminate the program
    // deferred function executed here just before actually returning, even if
    // there is a return or abnormal termination before
}

//使用 defer 语句实现代码追踪
func trace(s string) string {
    fmt.Println("entering:", s)
    return s
}

func un(s string) {
    fmt.Println("leaving:", s)
}

func a1() {
    defer un(trace("a"))
    fmt.Println("in a")
}

func b1() {
    defer un(trace("b"))
    fmt.Println("in b")
    a1()
}


//使用 defer 语句来记录函数的参数与返回值

func func1(s string) (n int, err error) {
	defer func() {
		log.Printf("func1(%q) = %d, %v", s, n, err)
	}()
	return 7, io.EOF
}

