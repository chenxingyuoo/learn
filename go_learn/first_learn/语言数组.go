// package main

// import "fmt"
// // var balance [10] float32
// var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
//  // var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}

// func main() {
//     // balance[4] = 50.0
	
// 	fmt.Println(balance)
// }


// package main

// import "fmt"

// func main() {
//    var n [10]int /* n 是一个长度为 10 的数组 */
//    var i,j int

//    /* 为数组 n 初始化元素 */         
//    for i = 0; i < 10; i++ {
//       n[i] = i + 100 /* 设置元素为 i + 100 */
//    }

//    /* 输出每个数组元素的值 */
//    for j = 0; j < 10; j++ {
//       fmt.Printf("Element[%d] = %d\n", j, n[j] )
//    }
// }


//多维数组

// package main

// import "fmt"

// var threedim [5][10][4]int

// func main() {

//       fmt.Println(threedim)
// }

//二维数组

// package main

// import "fmt"

// var ta = [3][4]int{  
//  {0, 1, 2, 3} ,   /*  第一行索引为 0 */
//  {4, 5, 6, 7} ,   /*  第二行索引为 1 */
//  {8, 9, 10, 11},   /*  第三行索引为 2 */
// }

// func main() {

//     fmt.Println(ta)
// }

// package main

// import "fmt"

// func main() {
//    /* 数组 - 5 行 2 列*/
//    var a = [5][2]int{ {0,0}, {1,2}, {2,4}, {3,6},{4,8}}
//    var i, j int

//     输出数组元素 
//    for  i = 0; i < 5; i++ {
//       for j = 0; j < 2; j++ {
//          fmt.Printf("a[%d][%d] = %d\n", i,j, a[i][j] )
//       }
//    }
// }

//向函数传递数组

package main

import "fmt"

func main() {
   /* 数组长度为 5 */
   var  balance = []int {1000, 2, 3, 17, 50}
   var avg float32

   /* 数组作为参数传递给函数 */
   avg = getAverage( balance, 5 ) ;

   /* 输出返回的平均值 */
   fmt.Printf( "平均值为: %f ", avg );
}
func getAverage(arr []int, size int) float32 {
   var i,sum int
   var avg float32  

   for i = 0; i < size;i++ {
      sum += arr[i]
   }

   avg = float32(sum / size)

   return avg;
}



















