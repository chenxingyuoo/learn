package main

import "fmt"

func main() {
	label1()
	goto1()
	goto2()
	for1()
	for2()
}

func label1() {
LABEL1:
	for i := 0; i <= 5; i++ {
		for j := 0; j <= 5; j++ {
			if j == 4 {
				continue LABEL1
			}
			fmt.Printf("i is: %d, and j is: %d\n", i, j)
		}
	}
}

func goto1() {
	i := 0
HERE:
	print(i)
	i++
	if i == 5 {
		return
	}
	goto HERE

}

func goto2() {
	fmt.Println()

	a := 1
	b := 9
	goto TARGET // compile error
TARGET:
	b += a
	fmt.Printf("a is %v *** b is %v", a, b)

}

func for1() {
	fmt.Println()
	i := 0
	for { //since there are no checks, this is an infinite loop
		if i >= 3 {
			break
		}
		//break out of this for loop when this condition is met
		fmt.Println("Value of i is:", i)
		i++;
	}
	fmt.Println("A statement just after for loop.")
}

func for2() {
	for i := 0; i < 7; i++ {
		if i % 2 == 0 {
			continue
		}
		fmt.Println("Odd:", i)
	}
}
