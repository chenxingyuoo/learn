package main

import (
	"fmt"
	"strings"
)

func main() {
	// make an Add2 function, give it a name p2, and call it:
	p2 := Add2()
	fmt.Printf("Call Add2 for 3 gives: %v\n", p2(3))
	// make a special Adder function, a gets value 3:
	TwoAdder := Adder(2)
	fmt.Printf("The result is: %v\n", TwoAdder(3))

	f := Adder2()
	fmt.Print(f(1), " - ")
	fmt.Print(f(20), " - ")
	fmt.Print(f(300))

	fmt.Println()

	addBmp := MakeAddSuffix(".bmp")
	addJpeg := MakeAddSuffix(".jpeg")
	addBmpFile := addBmp("bmpFile")   // returns: file.bmp
	addJpegFile := addJpeg("jpegFile") // returns: file.jpeg
	fmt.Printf("addBmpFile:%s", addBmpFile)
	fmt.Println()
	fmt.Printf("addJpegFile:%s", addJpegFile)
}

func Add2() func(b int) int {
	return func(b int) int {
		return b + 2
	}
}

func Adder(a int) func(b int) int {
	return func(b int) int {
		return a + b
	}
}

func Adder2() func(int) int {
	var x int
	return func(delta int) int {
		x += delta
		return x
	}
}



func MakeAddSuffix(suffix string) func(string) string {
	return func(name string) string {
		if !strings.HasSuffix(name, suffix) {
			return name + suffix
		}
		return name
	}
}
