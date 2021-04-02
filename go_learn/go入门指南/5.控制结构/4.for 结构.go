package main

import (
	"fmt"
	"io"
)

func main() {
	for1()
	for2()
	for3()
	for4()
	for5()
	for6()
	for7()
	for8()
	forRange()
	for9()
	//for10()
	//for11()
	for12()
	for13()
}

func for1() {
	for i := 0; i < 5; i++ {
		fmt.Printf("This is the %d iteration\n", i)
	}
}

func for2() {
	str := "Go is a beautiful language!"
	fmt.Printf("The length of str is: %d\n", len(str))
	for ix := 0; ix < len(str); ix++ {
		fmt.Printf("Character on position %d is: %c \n", ix, str[ix])
	}
	str2 := "日本語"
	fmt.Printf("The length of str2 is: %d\n", len(str2))
	for ix := 0; ix < len(str2); ix++ {
		fmt.Printf("Character on position %d is: %c \n", ix, str2[ix])
	}
}

func for3() {
	// 1:
	for i := 0; i < 15; i++ {
		fmt.Printf("The counter is at %d\n", i)
	}
	// 2:
	i := 0
START:
	fmt.Printf("The counter is at %d\n", i)
	i++
	if i < 15 {
		goto START
	}
}

func for4() {
	// 1 - use 2 nested for loops
	for i := 1; i <= 25; i++ {
		for j := 1; j <= i; j++ {
			print("G")
		}
		println()
	}
	// 2 -  use only one for loop and string concatenation
	str := "G"
	for i := 1; i <= 25; i++ {
		println(str)
		str += "G"
	}
}

const (
	FIZZ     = 3
	BUZZ     = 5
	FIZZBUZZ = 15
)

func for5() {
	for i := 0; i <= 100; i++ {
		switch {
		case i % FIZZBUZZ == 0:
			fmt.Println("FizzBuzz")
		case i % FIZZ == 0:
			fmt.Println("Fizz")
		case i % BUZZ == 0:
			fmt.Println("Buzz")
		default:
			fmt.Println(i)
		}
	}
}

func for6()  {
	w, h := 20, 10
	for i := 1; i <= h; i++ {
		var s string
		for j := 1; j <= w; j++ {
			s += "*"
		}
		fmt.Println(s)
	}
}


//基于条件判断的迭代
//for 结构的第二种形式是没有头部的条件判断迭代（类似其它语言中的 while 循环），基本形式为：for 条件语句 {}。

func for7() {
	var i int = 5

	for i >= 0 {
		i = i - 1
		fmt.Printf("The variable i is now: %d\n", i)
	}
}

//无限循环
//条件语句是可以被省略的，如 i:=0; ; i++ 或 for { } 或 for ;; { }（;; 会在使用 gofmt 时被移除）：这些循环的本质就是无限循环。
//最后一个形式也可以被改写为 for true { }，但一般情况下都会直接写 for { }。


func for8()  {
	for t, err := Token(); err == nil; t, err = Token() {
		fmt.Println(t)
	}
}

var num int = 0
func Token() (s string, err error) {
	num++
	if num < 10 {
		return "i am token", nil
	}else {
		return "i am token", io.EOF
	}
}


//for-range 结构

func forRange() {
	str := "Go is a beautiful language!"
	fmt.Printf("The length of str is: %d\n", len(str))
	for pos, char := range str {
		fmt.Printf("Character on position %d is: %c \n", pos, char)
	}
	fmt.Println()

	str2 := "Chinese: 日本語"
	fmt.Printf("The length of str2 is: %d\n", len(str2))
	for pos, char := range str2 {
		fmt.Printf("character %c starts at byte position %d\n", char, pos)
	}
	fmt.Println()

	fmt.Println("index int(rune) rune    char bytes")
	for index, rune := range str2 {
		fmt.Printf("%-2d      %d      %U '%c' % X\n", index, rune, rune, rune, []byte(string(rune)))
	}
}

//练习

//变量声明问题
func for9()  {
	for i := 0; i < 5; i++ {
		var v int
		fmt.Printf("%d ", v)
		v = 5
	}
}

//无限循环
func for10()  {
	for i := 0; ; i++ {
		fmt.Println("Value of i is now:", i)
	}
}

func for11()  {
	for i := 0; i < 3; {
		fmt.Println("Value of i:", i)
	}
}


func for12()  {
	s := ""
	for ; s != "aaaaa"; {
		fmt.Println("Value of s:", s)
		s = s + "a"
	}
}

func for13()  {

	for i, j, s := 0, 5, "a"; i < 3 && j < 100 && s != "aaaaa"; i, j, s = i+1, j+1, s + "a" {
		fmt.Println("Value of i, j, s:", i, j, s)
	}

}