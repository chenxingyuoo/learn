
//var identifier []type

//或使用make()函数来创建切片:

//var slice1 []type = make([]type, len)

//也可以简写为

//slice1 := make([]type, len,capacity)


// package main

// import "fmt"

// func main() {
//    var numbers = make([]int,3,5)

//    printSlice(numbers)
// }

// func printSlice(x []int){
//    fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
// }

//len=3 cap=5 slice=[0 0 0]


//空(nil)切片

// package main

// import "fmt"

// func main() {
//    var numbers []int

//    printSlice(numbers)

//    if(numbers == nil){
//       fmt.Printf("切片是空的")
//    }
// }

// func printSlice(x []int){
//    fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
// }

// len=0 cap=0 slice=[]
// 切片是空的


//切片截取
// package main

// import "fmt"

// func main() {
//    /* 创建切片 */
//    numbers := []int{0,1,2,3,4,5,6,7,8}   
//    printSlice(numbers)

//    /* 打印原始切片 */
//    fmt.Println("numbers ==", numbers)

//    /* 打印子切片从索引1(包含) 到索引4(不包含)*/
//    fmt.Println("numbers[1:4] ==", numbers[1:4])

//    /* 默认下限为 0*/
//    fmt.Println("numbers[:3] ==", numbers[:3])

//    /* 默认上限为 len(s)*/
//    fmt.Println("numbers[4:] ==", numbers[4:])

//    numbers1 := make([]int,0,5)
//    printSlice(numbers1)

//    /* 打印子切片从索引  0(包含) 到索引 2(不包含) */
//    number2 := numbers[:2]
//    printSlice(number2)

//    /* 打印子切片从索引 2(包含) 到索引 5(不包含) */
//    number3 := numbers[2:5]
//    printSlice(number3)

// }

// func printSlice(x []int){
//    fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
// }



//append() 和 copy() 函数
//如果想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来。
// 下面的代码描述了从拷贝切片的 copy 方法和向切片追加新元素的 append 方法。
package main

import "fmt"

func main() {
   var numbers []int
   printSlice(numbers)

   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)

   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)

   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)

   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)

   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)   
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}

// len=0 cap=0 slice=[]
// len=1 cap=1 slice=[0]
// len=2 cap=2 slice=[0 1]
// len=5 cap=6 slice=[0 1 2 3 4]
// len=5 cap=12 slice=[0 1 2 3 4]




