package main

import "fmt"

func tryRecover()  {
	defer func() {
		r := recover()

		if r == nil {
			fmt.Println("Nothing to recover. " +
				"Please try uncomment errors " +
				"below.")
			return
		}

		if err, ok := r.(error); ok {
			fmt.Println("Error occurred:", err)
		} else {
			panic(fmt.Sprintf("I dont's konw what to do: %v", r))
		}
	}()

	//b := 0
	//a := 5 / b
	//fmt.Println(a)

	panic(123)
}

func main() {
	tryRecover()
}
