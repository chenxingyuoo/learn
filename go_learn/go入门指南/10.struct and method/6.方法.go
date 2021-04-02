// package main
//
// import "fmt"
//
// type TwoInts struct {
// 	a int
// 	b int
// }
//
// func main() {
// 	two1 := new(TwoInts)
// 	two1.a = 12
// 	two1.b = 10
//
// 	fmt.Printf("The sum is: %d\n", two1.AddThem())
// 	fmt.Printf("Add them to the param: %d\n", two1.AddToParam(20))
//
// 	two2 := TwoInts{3, 4}
// 	fmt.Printf("The sum is: %d\n", two2.AddThem())
// }
//
// //结构体上的简单方法
// func (tn *TwoInts) AddThem() int {
// 	return tn.a + tn.b
// }
//
// //结构体上的简单方法
// func (tn *TwoInts) AddToParam(param int) int {
// 	return tn.a + tn.b + param
// }

// The sum is: 22
// Add them to the param: 42
// The sum is: 7

// 下面是非结构体类型上方法的例子

// package main
//
// import "fmt"
//
// type IntVector []int
//
// func (v IntVector) Sum() (s int) {
//     for _, x := range v {
//         s += x
//     }
//     return
// }
//
// func main() {
//     fmt.Println(IntVector{1, 2, 3}.Sum()) // 输出是6
// }

package main

import "fmt"

type Base struct {
	id int
}

func (b *Base) Id() int {
	return b.id
}

func (b *Base) SetId(id int) {
	b.id = id
}

type Person struct {
	Base
	FirstName string
	LastName  string
}

type Employee struct {
	Person
	salary string
}

func main() {
	employee := new(Employee)
	employee.SetId(10)
	fmt.Println(employee.Id())
}
