package main
import "fmt"

func main() {
    arr1()
    arr2()
    arr3()
    arr4()
    arr5()
    arr6()
}

func arr1()  {
    var arr1 [5]int

    for i:=0; i < len(arr1); i++ {
        arr1[i] = i * 2
    }

    for i:=0; i < len(arr1); i++ {
        fmt.Printf("Array at index %d is %d\n", i, arr1[i])
    }

    a := [...]string{"a", "b", "c", "d"}
    for i := range a {
        fmt.Println("Array item", i, "is", a[i])
    }
}

func arr2()  {
    //new 关键字会指向指针
    var arr1 = new([5]int)
    arr2 := arr1
    arr2[2] = 100

    //字面量不会指向指针
    var arr3 [5]int
    arr4 := arr3
    arr4[1] = 10

    fmt.Println(arr1)
    fmt.Println(arr3)
}


func f(a [3]int) { fmt.Println(a) }
func fp(a *[3]int) { fmt.Println(a) }

func arr3() {
    var ar [3]int
    f(ar)     // passes a copy of ar
    fp(&ar) // passes a pointer to ar
}

// [0 0 0]
// &[0 0 0]

//一
//var arrAge = [5]int{18, 20, 15, 22, 16}
//二
//var arrLazy = [...]int{5, 6, 7, 8, 22}
//三
//var arrKeyValue = [5]string{3: "Chris", 4: "Ron"}


//
func arr4() {
    for i := 0; i < 3; i++ {
        fp(&[3]int{i, i * i, i * i * i})
    }
}

//&[0 0 0]
// &[1 1 1]
// &[2 4 8]


//多维数据
const (
    WIDTH  = 10
    HEIGHT = 10
)

type pixel int
var screen [WIDTH][HEIGHT]pixel

func arr5() {
    for y := 0; y < HEIGHT; y++ {
        for x := 0; x < WIDTH; x++ {
            screen[x][y] = 0
        }
    }
    
    fmt.Println(screen)
}

// 将数组传递给函数
// 把第一个大数组传递给函数会消耗很多内存。有两种方法可以避免这种现象：
// 传递数组的指针
// 使用数组的切片

func arr6() {
    array := [3]float64{7.0, 8.5, 9.1}
    x := Sum(&array) // Note the explicit address-of operator
    // to pass a pointer to the array
    fmt.Printf("The sum of the array is: %f", x)
}

//接受数组指针
func Sum(a *[3]float64) (sum float64) {
    for _, v := range a { // derefencing *a to get back to the array is not necessary!
        sum += v
    }
    return
}

//The sum of the array is: 24.600000