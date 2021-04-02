// package main

// import "fmt"

// func main() {
//    var a int = 10   

//    fmt.Printf("变量的地址: %x\n", &a  )
// }

//使用指针

// package main

// import "fmt"

// func main() {
//    var a int= 20   /* 声明实际变量 */
//    var ip *int        /* 声明指针变量 */

//    ip = &a  /* 指针变量的存储地址 */

//    fmt.Printf("a 变量的地址是: %x\n", &a  )

//    /* 指针变量的存储地址 */
//    fmt.Printf("ip 变量储存的指针地址: %x\n", ip )

//    /* 使用指针访问值 */
//    fmt.Printf("*ip 变量的值: %d\n", *ip )
// }

//结果
//a 变量的地址是: c420018158
// ip 变量储存的指针地址: c420018158
// *ip 变量的值: 20


//空指针
// 当一个指针被定义后没有分配到任何变量时，它的值为 nil。
// nil 指针也称为空指针。
// nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值。
// 一个指针变量通常缩写为 ptr。

// package main

// import "fmt"

// func main() {
//    var ptr *int

//    /* ptr 不是空指针 */  
//    if(ptr != nil){
//    	fmt.Printf("ptr 不是空指针")
//    }    
//    /* ptr 是空指针 */
//    if(ptr == nil){   
//    	fmt.Printf("ptr 是空指针")
//    }    

//    fmt.Printf("ptr 的值为 : %x\n", ptr  )
// }

//ptr 的值为 : 0


//指针数组

// package main

// import "fmt"

// const MAX int = 3

// func main() {
//    a := []int{10,100,200}
//    var i int
//    var ptr [MAX]*int;

//    for  i = 0; i < MAX; i++ {
//       ptr[i] = &a[i] /* 整数地址赋值给指针数组 */
//    }

//    for  i = 0; i < MAX; i++ {
//       fmt.Printf("a[%d] = %d\n", i,a[i] )
//       fmt.Printf("a[%d] = %d\n", i,*ptr[i] )
//    }
// }


//指向指针的指针
// package main

// import "fmt"

// func main() {

//    var a int
//    var ptr *int
//    var pptr **int

//    a = 3000

//    /* 指针 ptr 地址 */
//    ptr = &a

//    /* 指向指针 ptr 地址 */
//    pptr = &ptr

//    /* 获取 pptr 的值 */
//    fmt.Printf("变量 a = %d\n", a )
//    fmt.Printf("指针变量 *ptr = %d\n", *ptr )
//    fmt.Printf("指向指针的指针变量 **pptr = %d\n", **pptr)
// }

//变量 a = 3000
// 指针变量 *ptr = 3000
// 指向指针的指针变量 **pptr = 3000


//指针作为函数参数
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int= 200

   fmt.Printf("交换前 a 的值 : %d\n", a )
   fmt.Printf("交换前 b 的值 : %d\n", b )

   /* 调用函数用于交换值
   * &a 指向 a 变量的地址
   * &b 指向 b 变量的地址
   */
   swap(&a, &b);

   fmt.Printf("交换后 a 的值 : %d\n", a )
   fmt.Printf("交换后 b 的值 : %d\n", b )
}

func swap(x *int, y *int) {
   var temp int
   temp = *x    /* 保存 x 地址的值 */
   *x = *y      /* 将 y 赋值给 x */
   *y = temp    /* 将 temp 赋值给 y */
}

//交换前 a 的值 : 100
// 交换前 b 的值 : 200
// 交换后 a 的值 : 200
// 交换后 b 的值 : 100
