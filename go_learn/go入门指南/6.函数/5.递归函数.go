package main

import (
	"fmt"
)

func main() {
	main1()
	main2()

	num := 10
	funa(num)
	fmt.Printf("原始值 %d ", num)


	num1 := 1
	newNum := funb(num1)
	fmt.Println(newNum)
}

func main1() {
	fmt.Printf("%d is even: is %t\n", 16, even(16)) // 16 is even: is true
	fmt.Printf("%d is odd: is %t\n", 17, odd(17))
	// 17 is odd: is true
	fmt.Printf("%d is odd: is %t\n", 18, odd(18))
	// 18 is odd: is false
}

//
func even(nr int) bool {
	if nr == 0 {
		return true
	}
	return odd(RevSign(nr) - 1)
}

func odd(nr int) bool {
	if nr == 0 {
		return false
	}
	return even(RevSign(nr) - 1)
}

func RevSign(nr int) int {
	if nr < 0 {
		return -nr
	}
	return nr
}

func main2() {
	//result := 0
	//n := 0
	//for i := 0; i <= 10; i++ {
	//	result, n = fibonacci(i)
	//	fmt.Printf("fibonacci(%d) is: %d\n", i, result)
	//}

	result := fibonacci(4, "init")
	fmt.Printf("fibonacci(%d) is: %d\n", 4, result)
}

func fibonacci(n int, s string) (res int) {
	fmt.Println("n、s", n, s)
	if n <= 1 {
		res = 1
	} else {
		f1 := fibonacci(n-1, "left")
		f2 := fibonacci(n-2, "right")

		fmt.Println("f1", f1)
		fmt.Println("f2", f2)

		res = f1 + f2
		fmt.Println("res", res)
	}
	return
}


func funa(num int) {
	if num > 0 {
		fmt.Printf("数字 %d ", num)
		num = num - 1
		funa(num)
	}
}

func funb(num int) (newNums [10]int) {
	for i := 1; i < 10; i++ {
		num *= i
		newNums[i] = num
	}
	return
}
