//在 Go 语言中，文件使用指向 os.File 类型的指针来表示的，也叫做文件句柄。我们在前面章节使用到过标准输入 os.Stdin 和标准输出 os.Stdout，他们的类型都是 *os.File。让我们来看看下面这个程序：
// package main
// import (
//     "bufio"
//     "fmt"
//     "io"
//     "os"
// )
//
// func main() {
//     inputFile, inputError := os.Open("input.dat")
//     if inputError != nil {
//         fmt.Printf("An error occurred on opening the inputfile\n" +
//             "Does the file exist?\n" +
//             "Have you got acces to it?\n")
//         return // exit the function on error
//     }
//     defer inputFile.Close()
//
//     inputReader := bufio.NewReader(inputFile)
//     for {
//         inputString, readerError := inputReader.ReadString('\n')
//         if readerError == io.EOF {
//             return
//         }
//         fmt.Printf("The input was: %s", inputString)
//     }
// }

// 1) 将整个文件的内容读到一个字符串里：

// package main
// import (
//     "fmt"
//     "io/ioutil"
//     "os"
// )
//
// func main() {
//     inputFile := "products.txt"
//     outputFile := "products_copy.txt"
//     buf, err := ioutil.ReadFile(inputFile)
//     if err != nil {
//         fmt.Fprintf(os.Stderr, "File Error: %s\n", err)
//         // panic(err.Error())
//         }
//     fmt.Printf("%s\n", string(buf))
//     err = ioutil.WriteFile(outputFile, buf, 0644) // oct, not hex
//     if err != nil {
//         panic(err. Error())
//     }
// }

// 2) 带缓冲的读取

// 在很多情况下，文件的内容是不按行划分的，或者干脆就是一个二进制文件。
//在这种情况下，ReadString()就无法使用了，我们可以使用 bufio.Reader 的 Read()，它只接收一个参数：

// buf := make([]byte, 1024)
// ...
// n, err := inputReader.Read(buf)
// if (n == 0) { break}

//3) 按列读取文件中的数据

// package main
// import (
//     "fmt"
//     "os"
// )
//
// func main() {
//     file, err := os.Open("products2.txt")
//     if err != nil {
//         panic(err)
//     }
//     defer file.Close()
//
//     var col1, col2, col3 []string
//     for {
//         var v1, v2, v3 string
//         _, err := fmt.Fscanln(file, &v1, &v2, &v3)
//         // scans until newline
//         if err != nil {
//             break
//         }
//         col1 = append(col1, v1)
//         col2 = append(col2, v2)
//         col3 = append(col3, v3)
//     }
//
//     fmt.Println(col1)
//     fmt.Println(col2)
//     fmt.Println(col3)
// }

//compress包：读取压缩文件
// package main
//
// import (
//     "fmt"
//     "bufio"
//     "os"
//     "compress/gzip"
// )
//
// func main() {
//     fName := "products.gz"
//     var r *bufio.Reader
//     fi, err := os.Open(fName)
//     if err != nil {
//         fmt.Fprintf(os.Stderr, "%v, Can't open %s: error: %s\n", os.Args[0], fName,
//             err)
//         os.Exit(1)
//     }
//     fz, err := gzip.NewReader(fi)
//     if err != nil {
//         r = bufio.NewReader(fi)
//     } else {
//         r = bufio.NewReader(fz)
//     }
//
//     for {
//         line, err := r.ReadString('\n')
//         if err != nil {
//             fmt.Println(line)
//             fmt.Println("Done reading file")
//             os.Exit(0)
//         }
//         fmt.Println(line)
//     }
// }

//写文件
// package main
//
// import (
// 	"bufio"
// 	"fmt"
// 	"os"
// )
//
// func main() {
// 	// var outputWriter *bufio.Writer
// 	// var outputFile *os.File
// 	// var outputError os.Error
// 	// var outputString string
// 	outputFile, outputError := os.OpenFile("output.dat", os.O_WRONLY|os.O_CREATE, 0666)
// 	if outputError != nil {
// 		fmt.Printf("An error occurred with file opening or creation\n")
// 		return
// 	}
// 	defer outputFile.Close()
//
// 	outputWriter := bufio.NewWriter(outputFile)
// 	outputString := "hello world!\n"
//
// 	for i := 0; i < 10; i++ {
// 		outputWriter.WriteString(outputString)
// 	}
//
// 	fmt.Printf("Write Done\n")
// 	outputWriter.Flush()
// }

//写文件
package main

import "os"

func main() {
	os.Stdout.WriteString("hello, world\n")
	f, _ := os.OpenFile("test", os.O_CREATE|os.O_WRONLY, 0)
	defer f.Close()
	f.WriteString("hello, world in a file\n")
}
