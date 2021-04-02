
package main
import "fmt"
// import "bytes"

func main()  {
	slice1()
	slice2()
	slice3()
	slice4()
	slice5()
}

func slice1()  {
  var x = []int{2, 3, 5, 7, 11}

  fmt.Println("ptr : %d", x[0])
  fmt.Println("len %d",len(x))
  fmt.Println("cap %d",cap(x))

  y := x[1:3]
  fmt.Println("ptr : %d", y[0])
  fmt.Println("len %d",len(y))
  fmt.Println("cap %d",cap(y))
}

func slice2() {
    var arr1 [6]int
    var slice1 []int = arr1[2:5] // item at index 5 not included!

    // load the array with integers: 0,1,2,3,4,5
    for i := 0; i < len(arr1); i++ {
        arr1[i] = i
    }


    // print the slice
    for i := 0; i < len(slice1); i++ {
        fmt.Printf("Slice at %d is %d\n", i, slice1[i])
    }

    fmt.Printf("The length of arr1 is %d\n", len(arr1))
    fmt.Printf("The length of slice1 is %d\n", len(slice1))
    fmt.Printf("The capacity of slice1 is %d\n", cap(slice1))

    // grow the slice
    slice1 = slice1[0:4]

    for i := 0; i < len(slice1); i++ {
        fmt.Printf("Slice at %d is %d\n", i, slice1[i])
    }
    fmt.Printf("The length of slice1 is %d\n", len(slice1))
    fmt.Printf("The capacity of slice1 is %d\n", cap(slice1))

    // grow the slice beyond capacity
    //slice1 = slice1[0:7 ] // panic: runtime error: slice bound out of range
}

// Slice at 0 is 2  
// Slice at 1 is 3  
// Slice at 2 is 4  
// The length of arr1 is 6  
// The length of slice1 is 3  
// The capacity of slice1 is 4  
// Slice at 0 is 2  
// Slice at 1 is 3  
// Slice at 2 is 4  
// Slice at 3 is 5  
// The length of slice1 is 4  
// The capacity of slice1 is 4  

func slice3()  {
  b:= []byte{'g', 'o', 'l', 'a', 'n', 'g'}
  fmt.Println(b[1:4])
  fmt.Println(b[:2])
  fmt.Println(b[2:])
  fmt.Println(b[:])
}


//将切片传递给函数
func sum(a []int) int {
    s := 0
    for i := 0; i < len(a); i++ {
        s += a[i]
    }
    return s
}

func slice4() {
    var arr = []int{0, 1, 2, 3, 4}
    fmt.Println(sum(arr[:]))
}


//用 make() 创建一个切片
// var slice1 []type = make([]type, len)
// slice1 := make([]type, len)

//两种方法可以生成相同的切片:
// make([]int, 50, 100)
// new([100]int)[0:50]

func slice5() {
    var slice1 []int = make([]int, 10)
    // load the array/slice:
    for i := 0; i < len(slice1); i++ {
        slice1[i] = 5 * i
    }

    // print the slice:
    for i := 0; i < len(slice1); i++ {
        fmt.Printf("Slice at %d is %d\n", i, slice1[i])
    }
    fmt.Printf("\nThe length of slice1 is %d\n", len(slice1))
    fmt.Printf("The capacity of slice1 is %d\n", cap(slice1))
}

