// package main

// import "fmt"

// func main() {

//    var a int = 21
//    var b int = 10
//    var c int

//    c = a + b
//    fmt.Printf("第一行 - c 的值为 %d\n", c )
//    c = a - b
//    fmt.Printf("第二行 - c 的值为 %d\n", c )
//    c = a * b
//    fmt.Printf("第三行 - c 的值为 %d\n", c )
//    c = a / b
//    fmt.Printf("第四行 - c 的值为 %d\n", c )
//    c = a % b
//    fmt.Printf("第五行 - c 的值为 %d\n", c )
//    a++
//    fmt.Printf("第六行 - c 的值为 %d\n", a )
//    a--
//    fmt.Printf("第七行 - c 的值为 %d\n", a )
// }


// package main

// import "fmt"

// func main() {
//    var a int = 21
//    var b int = 10

//    if( a == b ) {
//       fmt.Printf("第一行 - a 等于 b\n" )
//    } else {
//       fmt.Printf("第一行 - a 不等于 b\n" )
//    }
//    if ( a < b ) {
//       fmt.Printf("第二行 - a 小于 b\n" )
//    } else {
//       fmt.Printf("第二行 - a 不小于 b\n" )
//    } 
   
//    if ( a > b ) {
//       fmt.Printf("第三行 - a 大于 b\n" )
//    } else {
//       fmt.Printf("第三行 - a 不大于 b\n" )
//    }
//    /* Lets change value of a and b */
//    a = 5
//    b = 20
//    if ( a <= b ) {
//       fmt.Printf("第四行 - a 小于等于 b\n" )
//    }
//    if ( b >= a ) {
//       fmt.Printf("第五行 - b 大于等于 a\n" )
//    }
// }


// package main

// import "fmt"

// func main() {
//    var a bool = true
//    var b bool = false
//    if ( a && b ) {
//       fmt.Printf("第一行 - 条件为 true\n" )
//    }
//    if ( a || b ) {
//       fmt.Printf("第二行 - 条件为 true\n" )
//    }
//     修改 a 和 b 的值 
//    a = false
//    b = true
//    if ( a && b ) {
//       fmt.Printf("第三行 - 条件为 true\n" )
//    } else {
//       fmt.Printf("第三行 - 条件为 false\n" )
//    }
//    if ( !(a && b) ) {
//       fmt.Printf("第四行 - 条件为 true\n" )
//    }
// }

// package main

// import "fmt"

// func main() {
//    var a int = 4
//    var b int32
//    var c float32
//    var ptr *int

//    /* 运算符实例 */
//    fmt.Printf("第 1 行 - a 变量类型为 = %T\n", a );
//    fmt.Printf("第 2 行 - b 变量类型为 = %T\n", b );
//    fmt.Printf("第 3 行 - c 变量类型为 = %T\n", c );

//    /*  & 和 * 运算符实例 */
//    ptr = &a /* 'ptr' 包含了 'a' 变量的地址 */
//    fmt.Printf("a 的值为  %d\n", a);
//    fmt.Printf("*ptr 为 %d\n", *ptr);
// }


package main

import "fmt"

func main() {
   var a int = 20
   var b int = 10
   var c int = 15
   var d int = 5
   var e int;

   e = (a + b) * c / d;      // ( 30 * 15 ) / 5
   fmt.Printf("(a + b) * c / d 的值为 : %d\n",  e );

   e = ((a + b) * c) / d;    // (30 * 15 ) / 5
   fmt.Printf("((a + b) * c) / d 的值为  : %d\n" ,  e );

   e = (a + b) * (c / d);   // (30) * (15/5)
   fmt.Printf("(a + b) * (c / d) 的值为  : %d\n",  e );

   e = a + (b * c) / d;     //  20 + (150/5)
   fmt.Printf("a + (b * c) / d 的值为  : %d\n" ,  e );  
}




