//用 fmt 包提供的 Scan 和 Sscan 开头的函数

// 从控制台读取输入:
// package main
// import "fmt"
// 
// var (
//    firstName, lastName, s string
//    i int
//    f float32
//    input = "56.12 / 5212 / Go"
//    format = "%f / %d / %s"
// )
// 
// func main() {
//    fmt.Println("Please enter your full name: ")
//    fmt.Scanln(&firstName, &lastName)
//    // fmt.Scanf("%s %s", &firstName, &lastName)
//    fmt.Printf("Hi %s %s!\n", firstName, lastName) // Hi Chris Naegels
//    fmt.Sscanf(input, format, &f, &i, &s)
//    fmt.Println("From the string we read: ", f, i, s)
//     // 输出结果: From the string we read: 56.12 5212 Go
// }


//使用 bufio 包提供的缓冲读取（buffered reader）来读取数据

// package main
// import (
//     "fmt"
//     "bufio"
//     "os"
// )
// 
// var inputReader *bufio.Reader
// var input string
// var err error
// 
// func main() {
//     inputReader = bufio.NewReader(os.Stdin)
//     fmt.Println("Please enter some input: ")
//     input, err = inputReader.ReadString('\n')
//     if err == nil {
//         fmt.Printf("The input was: %s\n", input)
//     }
// }


// package main
// import (
//     "fmt"
//     "os"
//     "bufio"
// )
// 
// func main() {
//     inputReader := bufio.NewReader(os.Stdin)
//     fmt.Println("Please enter your name:")
//     input, err := inputReader.ReadString('\n')
// 
//     if err != nil {
//         fmt.Println("There were errors reading, exiting program.")
//         return
//     }
// 
//     fmt.Printf("Your name is %s", input)
//     // For Unix: test with delimiter "\n", for Windows: test with "\r\n"
//     switch input {
//     case "Philip\n":  fmt.Println("Welcome Philip!")
//     case "Chris\n":   fmt.Println("Welcome Chris!")
//     case "Ivo\n":     fmt.Println("Welcome Ivo!")
//     default: fmt.Printf("You are not welcome here! Goodbye!")
//     }
// 
//     // version 2:   
//     switch input {
//     case "Philip\n":  fallthrough
//     case "Ivo\n":     fallthrough
//     case "Chris\n":   fmt.Printf("Welcome %s\n", input)
//     default: fmt.Printf("You are not welcome here! Goodbye!\n")
//     }
// 
//     // version 3:
//     switch input {
//     case "Philip\n", "Ivo\n":   fmt.Printf("Welcome %s\n", input)
//     default: fmt.Printf("You are not welcome here! Goodbye!\n")
//     }
// }


//练习1  输入S结束退出
package main

import (
	"fmt"
	"bufio"
	"os"
	"strings"
)
var nrchars, nrwords, nrlines int

func main() {
	nrchars, nrwords, nrlines = 0, 0, 0 
	inputReader := bufio.NewReader(os.Stdin)
	fmt.Println("Please enter some input, type S to stop: ")
	for {
		input, err := inputReader.ReadString('\n')
		if err != nil {
			fmt.Printf("An error occurred: %s\n", err)
		}
		if input == "S\n" { // Windows, on Linux it is "S\n"
			fmt.Println("Here are the counts:")
			fmt.Printf("Number of characters: %d\n", nrchars)
			fmt.Printf("Number of words: %d\n", nrwords)
			fmt.Printf("Number of lines: %d\n", nrlines)
			os.Exit(0)
		}
		Counters(input)
	}
}

func Counters(input string) {
	nrchars += len(input) - 2 // -2 for \r\n
	// count number of spaces, nr of words is +1
	nrwords += strings.Count(input, " ") + 1
	nrlines++
}

//练习2  逆波兰式计算器
// calculator.go
// 	example: calculate 3 + 4 = 7 as input: 3 ENTER 4 ENTER + ENTER --> result = 7, 

// package main
// 
// import (
// 	"fmt"
// 	"strconv"
// 	"bufio"
// 	"os"
// 	"./stack/stack"
// )
// 
// func main() {
// 	buf := bufio.NewReader(os.Stdin)
// 	calc1 := new(stack.Stack)
// 	fmt.Println("Give a number, an operator (+, -, *, /), or q to stop:")
// 	for {
// 		token, err := buf.ReadString('\n')
// 		if err != nil {
// 			fmt.Println("Input error !")
// 			os.Exit(1)
// 		}
// 		token = token[0:len(token)-2]    // remove "\r\n"
// 		// fmt.Printf("--%s--\n",token)  // debug statement
// 		switch  {
// 			case token == "q":  // stop als invoer = "q"
// 				fmt.Println("Calculator stopped")
// 				return  
// 			case token >= "0" && token <= "999999": 
// 				i, _ := strconv.Atoi(token)
// 				calc1.Push(i)  
// 			case token == "+":
// 				q := calc1.Pop()
// 				p := calc1.Pop()
// 				fmt.Printf("The result of %d %s %d = %d\n", p, token, q, p + q)
// 			case token == "-":
// 				q := calc1.Pop()
// 				p := calc1.Pop()
// 				fmt.Printf("The result of %d %s %d = %d\n", p, token, q, p - q)
// 			case token == "*":
// 				q := calc1.Pop()
// 				p := calc1.Pop()
// 				fmt.Printf("The result of %d %s %d = %d\n", p, token, q, p * q)
// 			case token == "/":
// 				q := calc1.Pop()
// 				p := calc1.Pop()
// 				fmt.Printf("The result of %d %s %d = %d\n", p, token, q, p / q)
// 			default:
// 				fmt.Println("No valid input")
// 		}
// 	}
// }