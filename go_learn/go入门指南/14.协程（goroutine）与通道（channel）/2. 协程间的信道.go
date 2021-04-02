// package main

// import (
// 	"fmt"
// 	"time"
// )

// func main() {
// 	ch := make(chan string)

// 	go sendData(ch)
// 	go getData(ch)

// 	time.Sleep(1e9)
// }

// func sendData(ch chan string) {
// 	ch <- "Washington"
// 	ch <- "Tripoli"
// 	ch <- "London"
// 	ch <- "Beijing"
// 	ch <- "Tokio"
// }

// func getData(ch chan string) {
// 	var input string
// 	// time.Sleep(1e9)
// 	for {
// 		input = <-ch
// 		fmt.Printf("%s ", input)
// 	}
// }

// package main

// import (
// 	"fmt"
// 	"time"
// )

// func f1(in chan int) {
// 	fmt.Println(<-in)
// }

// func main() {
// 	out := make(chan int)
// 	go f1(out)
// 	out <- 2
// 	time.Sleep(1e9)
// }

// gosum.go
// package main

// import (
// 	"fmt"
// )

// func sum(x, y int, c chan int) {
// 	c <- x + y
// }

// func main() {
// 	c := make(chan int)
// 	go sum(12, 13, c)
// 	fmt.Println(<-c) // 25
// }

// goroutines2.go
package main

import "fmt"

// integer producer:
func numGen(start, count int, out chan<- int) {
	for i := 0; i < count; i++ {
		out <- start
		start = start + count
	}
	close(out)
}

// integer consumer:
func numEchoRange(in <-chan int, done chan<- bool) {
	for num := range in {
		fmt.Printf("%d\n", num)
	}
	done <- true
}

func main() {
	numChan := make(chan int)
	done := make(chan bool)
	go numGen(0, 10, numChan)
	go numEchoRange(numChan, done)

	<-done
}

/* Output:
0
10
20
30
40
50
60
70
80
90
*/
