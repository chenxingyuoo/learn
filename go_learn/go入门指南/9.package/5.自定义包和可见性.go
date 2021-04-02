package main

import (
	"fmt"

	"./pack"
)

func main() {
	var test1 string
	test1 = pack.ReturnStr()
	fmt.Printf("ReturnStr from package1: %s\n", test1)
	fmt.Printf("Integer from package1: %d\n", pack.Pack1Int)

	user := User{"1", "2", "3"}
	// fmt.Printf("Float from package1: %f\n", pack1.pack1Float)
}

//ReturnStr from package1: Hello main!
// Integer from package1: 42
