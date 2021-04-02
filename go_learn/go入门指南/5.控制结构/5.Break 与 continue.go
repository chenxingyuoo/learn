package main

import "fmt"

func main() {
	break1()
	break2()
	continue1()
}

func break1() {
	var i int = 5

	for {
		i = i - 1
		fmt.Printf("The variable i is now: %d\n", i)
		if i < 0 {
			break
		}
	}
}

func break2() {
	for i := 0; i < 3; i++ {
		for j := 0; j < 10; j++ {
			if j > 5 {
				break
			}
			print(j)
		}
		print("  ")
	}
}

func continue1()  {
	for i := 0; i < 10; i++ {
		if i == 5 {
			continue
		}
		print(i)
		print(" ")
	}
}
