package main

import (
	"fmt"
	"os"
)

func main() {
	switch1()
	switch2()
	switch3()
	switch4()

	fmt.Println(Season(8))
}

func switch1()  {
	var num1 int = 100

	switch num1 {
	case 98, 99:
		fmt.Println("It's equal to 98")
	case 100:
		fmt.Println("It's equal to 100")
	default:
		fmt.Println("It's not equal to 98 or 100")
	}
}

func switch2() {
	var num1 int = 7

	switch {
	case num1 < 0:
		fmt.Println("Number is negative")
	case num1 > 0 && num1 < 10:
		fmt.Println("Number is between 0 and 10")
	default:
		fmt.Println("Number is 10 or greater")
	}
}

func switch3()  {
	switch result := getNum(); {
	case result < 0:
		fmt.Println("result < 1")
	case result > 0:
		fmt.Println("result > 1")
	default:
		// 0
	}
}

func switch4()  {
	k := 6
	switch k {
	case 4: fmt.Println("was <= 4"); fallthrough;
	case 5: fmt.Println("was <= 5"); fallthrough;
	case 6: fmt.Println("was <= 6"); fallthrough;
	case 7: fmt.Println("was <= 7"); fallthrough;
	case 8: fmt.Println("was <= 8"); fallthrough;
	default: fmt.Println("default case")
	}
}


func getNum() int {
	return 1
}

func Season(month int) (string) {
	if month < 1 {
		fmt.Println("n 不能小于 1")
		os.Exit(1)
	}

	switch month {
	case 12, 1, 2:
		return "Winter"
	case 3, 4, 5:
		return "Spring"
	case 6, 7, 8:
		return "Summer"
	case 9, 10, 11:
		return "Autumn"
	}
	return "Season unknown"
}