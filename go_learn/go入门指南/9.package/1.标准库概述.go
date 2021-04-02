package main

import (
	"container/list"
	"fmt"
	"unsafe"
)

func main() {
	listLearn()
	size()
}

func listLearn()  {
	lst := list.New()
	lst.PushBack(100)
	lst.PushBack(101)
	lst.PushBack(102)
	// fmt.Println("Here is the double linked list:\n", lst)
	for e := lst.Front(); e != nil; e = e.Next() {
		fmt.Println(e)
		fmt.Println(e.Value)
	}
}

/* Example output:
&{0x12542bc0 <nil> 0x12547590 1}
&{0x12542ba0 0x12542be0 0x12547590 2}
&{<nil> 0x12542bc0 0x12547590 4}
100
101
102
*/

func size()  {
	var i int = 10
	size := unsafe.Sizeof(i)
	fmt.Println("The size of an int is: ", size)
}