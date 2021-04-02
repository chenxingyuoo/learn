//非缓存 channels

package main

import "fmt"

func sum(a []int, c chan int) {
	total := 0
	for _, v := range a {
		total += v
	}
	c <- total  // send total to c
}


var complete chan int = make(chan int)

func loop() {
    for i := 0; i < 10; i++ {
        fmt.Printf("%d ", i)
    }

    complete <- 0 // 执行完毕了，发个消息
}


func main() {
	a := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(a[:len(a)/2], c)
	go sum(a[len(a)/2:], c)
	x := <-c
	y := <-c   // receive from c , 直到线程跑完, 取到消息. main在此阻塞住

	fmt.Println(x, y, x + y)  //-5 17 12

	go loop()
	v := <- complete // 直到线程跑完, 取到消息. main在此阻塞住
	fmt.Println(v)
}

//死锁
//fatal error: all goroutines are asleep - deadlock!
// func main() {
//     ch := make(chan int)
//     <- ch // 阻塞main goroutine, 信道c被锁
// }