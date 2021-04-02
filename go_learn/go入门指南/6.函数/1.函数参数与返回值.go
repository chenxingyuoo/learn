package main

import (
	"fmt"
	"math"
	"errors"
)

var num int = 10
var numx2, numx3 int

func main() {
	fmt.Printf("Multiply 2 * 5 * 6 = %d\n", MultiPly3Nums(2, 5, 6))
	// var i1 int = MultiPly3Nums(2, 5, 6)
	// fmt.Printf("MultiPly 2 * 5 * 6 = %d\n", i1)

	s := "good bye"
	Test(s)
	fmt.Println(s)

	numx2, numx3 = getX2AndX3(num)
	PrintValues()
	numx2, numx3 = getX2AndX3_2(num)
	PrintValues()

	sum, difference, product := multReturnval(2, 5)
	fmt.Println("sum、difference、product：", sum, difference, product)


	if ret2, err2 := MySqrt(5); err2 != nil {
		fmt.Println("Error! Return values are: ", ret2, err2)
	} else {
		fmt.Println("It's ok! Return values are: ", ret2, err2)
	}
	// named return variables:
	fmt.Println(MySqrt(5))


	//空白符
	var i1 int
	var f1 float32
	i1, _, f1 = ThreeValues()
	fmt.Printf("The int: %d, the float: %f \n", i1, f1)


	var min, max int
	min, max = MinMax(78, 65)
	fmt.Printf("Minmium is: %d, Maximum is: %d\n", min, max)

	//改变外部变量
	n := 0
	reply := &n
	Multiply(10, 5, reply)
	fmt.Println("Multiply:", n) // Multiply: 50
	fmt.Println("Multiply:", *reply) // Multiply: 50
}

func MultiPly3Nums(a int, b int, c int) int {
	// var product int = a * b * c
	// return product
	return a * b * c
}

func Test(a string) {
	var s *string = &a
	*s = "hello"
	fmt.Println(a)
}

func PrintValues() {
	fmt.Printf("num = %d, 2x num = %d, 3x num = %d\n", num, numx2, numx3)
}

func getX2AndX3(input int) (int, int) {
	return 2 * input, 3 * input
}

func getX2AndX3_2(input int) (x2 int, x3 int) {
	x2 = 2 * input
	x3 = 3 * input
	// return x2, x3
	return
}

func multReturnval(x int, y int) (sum int, difference int, product int) {
	sum, difference, product = x + y, x - y, x * y
	return
}

func MySqrt(n float64) (ret float64,err error) {
	if n < 0 {
		ret =  float64(math.NaN())
		err = errors.New("I won't be able to do a sqrt of negative number!")
	}else {
		ret = math.Sqrt(n)
	}

	return
}


func ThreeValues() (int, int, float32) {
	return 5, 6, 7.5
}

//  比较它们的大小，然后按小-大的顺序返回这两个数
func MinMax(a int, b int) (min int, max int) {
	if a < b {
		min = a
		max = b
	} else {
		min = b
		max = a
	}
	return
}


//改变外部变量
//传递指针给函数不但可以节省内存（因为没有复制变量的值），而且赋予了函数直接修改外部变量的能力
func Multiply(a, b int, reply *int) {
	*reply = a * b
}