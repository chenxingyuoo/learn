// package main
// 
// import (
// 	"fmt"
// )
// 
// type File struct {
// 	fd   int    // 文件描述符
// 	name string // 文件名
// }
// 
// func NewFile(fd int, name string) *File {
// 	if fd < 0 {
// 		return nil
// 	}
// 
// 	return &File{fd, name}
// }
// 
// func main() {
// 	f := NewFile(10, "./test.txt")
// 	fmt.Println(f)
// }




package main
import "matrix"

func main()  {
  // wrong := new(matrix.matrix)     // 编译失败（matrix 是私有的）
  right := matrix.NewMatrix(...)  // 实例化 matrix 的唯一方式
}




//map 和 struct vs new() 和 make()
// type Foo map[string]string
// type Bar struct {
//     thingOne string
//     thingTwo int
// }
// 
// func main() {
//     // OK
//     y := new(Bar)
//     (*y).thingOne = "hello"
//     (*y).thingTwo = 1
// 
//     // NOT OK
//     z := make(Bar) // 编译错误：cannot make type Bar
//     (*z).thingOne = "hello"
//     (*z).thingTwo = 1
// 
//     // OK
//     x := make(Foo)
//     x["x"] = "goodbye"
//     x["y"] = "world"
// 
//     // NOT OK
//     u := new(Foo)
//     (*u)["x"] = "goodbye" // 运行时错误!! panic: assignment to entry in nil map
//     (*u)["y"] = "world"
// }