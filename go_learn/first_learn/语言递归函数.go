
// package main

// import "fmt"

// func Factorial(x int) (result int) {
//   if x == 0 {
//     result = 1;	
//   } else {
//     result = x * Factorial(x - 1);
//   }
//   return;
// }

// func main() {  
//     var i int = 15
//     fmt.Printf("%d 的阶乘是 %d\n", i, Factorial(i))
// }

//15 的阶乘是 1307674368000

//斐波那契数列

package main

import "fmt"

func fibonacci(n int) int {
  if n < 2 {
   return n
  }
  return fibonacci(n-2) + fibonacci(n-1)
}

func main() {
    var i int
    for i = 0; i < 10; i++ {
    	fmt.Println("i",i)
       fmt.Printf("%d\t", fibonacci(i))
    }
}