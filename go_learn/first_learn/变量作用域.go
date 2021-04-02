//局部变量
// package main

// import "fmt"

// func main() {
//    /* 声明局部变量 */
//    var a, b, c int 

//    /* 初始化参数 */
//    a = 10
//    b = 20
//    c = a + b

//    fmt.Printf ("结果： a = %d, b = %d and c = %d\n", a, b, c)
// }

//全局变量
// package main

// import "fmt"

// /* 声明全局变量 */
// var g int

// func main() {

//    /* 声明局部变量 */
//    var a, b int

//     初始化参数 
//    a = 10
//    b = 20
//    g = a + b

//    fmt.Printf("结果： a = %d, b = %d and g = %d\n", a, b, g)
// }

//Go 语言程序中全局变量与局部变量名称可以相同，但是函数内的局部变量会被优先考虑。实例如下：
// package main

// import "fmt"

// /* 声明全局变量 */
// var g int = 20

// func main() {
//    /* 声明局部变量 */
//    var g int = 10

//    fmt.Printf ("结果： g = %d\n",  g)
// }

//形式参数
package main

import "fmt"

/* 声明全局变量 */
var a int = 20;

func main() {
   /* main 函数中声明局部变量 */
   var a int = 10
   var b int = 20
   var c int = 0

   fmt.Printf("main()函数中 a = %d\n",  a);
   c = sum( a, b);
   fmt.Printf("main()函数中 c = %d\n",  c);
}

/* 函数定义-两数相加 */
func sum(a, b int) int {
   fmt.Printf("sum() 函数中 a = %d\n",  a);
   fmt.Printf("sum() 函数中 b = %d\n",  b);

   return a + b;
}

