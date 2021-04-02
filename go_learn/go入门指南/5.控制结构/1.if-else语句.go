package main

import "fmt"

func main()  {
	fmt.Println(Abs(-1))

	if value := IsGreater(10,5); value {
		fmt.Println("true")
	}
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func IsGreater(x, y int) bool {
	if x > y {
		return true
	}
	return false
}
