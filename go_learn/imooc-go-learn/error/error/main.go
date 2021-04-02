package main

import (
	"bufio"
	"fmt"
	"imooc-go-learn/functional/fibonacci"
	"os"
)

func writeFile(filename string)  {
	file, err := os.OpenFile(filename, os.O_EXCL|os.O_CREATE|os.O_TRUNC, 0666)

	if err != nil {
		if pathError, ok := err.(*os.PathError); ok {
			fmt.Printf("Error: %s, %s, %s\n",
				pathError.Op,
				pathError.Path,
				pathError.Err)
		} else {
			fmt.Println("Error:", err)
		}
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
