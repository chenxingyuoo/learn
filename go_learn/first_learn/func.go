// package main

// import "fmt"

// func main() {
//    /* 定义局部变量 */
//    var a int = 100
//    var b int = 200
//    var ret int

//    /* 调用函数并返回最大值 */
//    ret = max(a, b)

//    fmt.Printf( "最大值是 : %d\n", ret )
// }

// /* 函数返回两个数的最大值 */
// func max(num1, num2 int) int {
//    /* 定义局部变量 */
//    var result int

//    if (num1 > num2) {
//       result = num1
//    } else {
//       result = num2
//    }
//    return result 
// }


// package main

// import "fmt"

// func swap(x, y string) (string, string) {
//    return y, x
// }

// func main() {
//    a, b := swap("Mahesh", "Kumar")
//    fmt.Println(a, b)
// }


// package main

// import (
//    "fmt"
//    "math"
// )

// func main(){
//    /* 声明函数变量 */
//    getSquareRoot := func(x float64) float64 {
//       return math.Sqrt(x)
//    }

//    /* 使用函数 */
//    fmt.Println(getSquareRoot(9))

// }


//闭包
package main

import "fmt"

func getSequence() func() int {
   i:=0
   return func() int {
      i+=1
     return i  
   }
}

func main(){
   /* nextNumber 为一个函数，函数 i 为 0 */
   nextNumber := getSequence()  

   /* 调用 nextNumber 函数，i 变量自增 1 并返回 */
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   
   /* 创建新的函数 nextNumber1，并查看结果 */
   nextNumber1 := getSequence()  
   fmt.Println(nextNumber1())
   fmt.Println(nextNumber1())
}
