package main

import "C"
import "fmt"

func main() {

	// C.av_register_all()

	// var pFormatCtx *C.AVFormatContext

	// pFormatCtx = C.avformat_alloc_context()

	// fmt.Println("pFormatCtx")
	// fmt.Println(pFormatCtx)
	// fmt.Println(C.avformat_version())
	age := C.int(18)
	fmt.Println("age", age)
}
