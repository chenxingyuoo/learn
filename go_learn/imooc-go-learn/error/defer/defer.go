package main

import (
	"bufio"
	"fmt"
	"imooc-go-learn/functional/fibonacci"
	"os"
)

func tryDefer()  {

}

func writeFile(filename string)  {
	file, err := os.Create(filename)

	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()


	write := bufio.NewWriter(file)
	defer write.Flush()

	f := fibonacci.Fibonacci()
	for i := 0; i < 20; i++ {
		fmt.Fprintln(write, f())
	}
}

func main()  {
	writeFile("fib.txt")
}
