package main

import (
	"fmt"
)

// 定义a为空接口
var a interface{}


func main()  {
	var i int = 5
	s := "Hello world"
	// a可以存储任意类型的数值
	a = i

	fmt.Println("a", a)

	a = s

	fmt.Println("a", a)
}