//递归实现斐波那契数列
package main

import (
	"fmt"
	"log"
	"runtime"
	"strings"
)

const LIM = 40

func main() {
	f := fibonacci() //返回一个闭包函数
	var array [LIM]int
	for i := 0; i < LIM; i++ {
		array[i] = f()
	}
	fmt.Println(array)
	where()


}

//打印执行的位置
func where() {
	_, file, line, _ := runtime.Caller(1)
	log.Printf("%s:%d", file, line)
}

func fibonacci() func() int {
	back1, back2 := 0, 1
	return func() int {
		// 重新赋值
		back1, back2 = back2, (back1 + back2)
		return back1
	}
}


