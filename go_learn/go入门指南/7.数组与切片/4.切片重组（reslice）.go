//将切片扩展 1 位可以这么做：

// sl = sl[0:len(sl)+1]

package main

import "fmt"

func main() {
	reslice1()
	reslice2()
}

func reslice1()  {
	slice1 := make([]int, 0, 10)
	// load the slice, cap(slice1) is 10:
	for i := 0; i < cap(slice1); i++ {
		slice1 = slice1[0 : i+1]
		slice1[i] = i
		fmt.Printf("The length of slice is %d\n", len(slice1))
	}

	// print the slice:
	for i := 0; i < len(slice1); i++ {
		fmt.Printf("Slice at %d is %d\n", i, slice1[i])
	}
}

func reslice2()  {
	var ar = [10]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	var a = ar[5:7]
	fmt.Println(a)
	a = a[0:4]
	fmt.Println(a)
}

// var ar = [10]int{0,1,2,3,4,5,6,7,8,9}
// var a = ar[5:7] // reference to subarray {5,6} - len(a) is 2 and cap(a) is 5
// a = a[0:4] // ref of subarray {5,6,7,8} - len(a) is now 4 but cap(a) is still 5


