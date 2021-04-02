//map 是引用类型，可以使用如下声明：

//var map1 map[keytype]valuetype
//var map1 map[string]int

package main

import "fmt"

//
func main() {
	map1()
	map2()
	map3()
	map4()
}

func map1()  {
	mapLit := map[string]int{"one": 1, "two": 2}
	mapCreated := make(map[string]float32)
	mapAssigned := mapLit

	mapCreated["key1"] = 4.5
	mapCreated["key2"] = 3.14159
	mapAssigned["two"] = 3

	fmt.Printf("Map literal at \"one\" is: %d\n", mapLit["one"])
	fmt.Printf("Map created at \"key2\" is: %f\n", mapCreated["key2"])
	fmt.Printf("Map assigned at \"two\" is: %d\n", mapLit["two"])
	fmt.Printf("Map literal at \"ten\" is: %d\n", mapLit["ten"])
}

//Map literal at "one" is: 1
// Map created at "key2" is: 3.141590
// Map assigned at "two" is: 3
// Map literal at "ten" is: 0


// int 作为key, fun 作为 value
func map2() {
	mf := map[int]func() int{
		1: func() int { return 10 },
		2: func() int { return 20 },
		5: func() int { return 50 },
	}
	fmt.Println(mf)
}

// map[1:0x21c0 2:0x21d0 5:0x21e0]


//map 容量
//map2 := make(map[string]float, 100)

func map3()  {
	noteFrequency := map[string]float32 {
		"C0": 16.35, "D0": 18.35, "E0": 20.60, "F0": 21.83,
		"G0": 24.50, "A0": 27.50, "B0": 30.87, "A4": 440,
	}
	fmt.Println(noteFrequency)
}


//用切片作为 map 的值
// mp1 := make(map[int][]int)
// mp2 := make(map[int]*[]int)
func map4()  {
	slice := []int{1,2}
	mp1 := make(map[string] []int)    //切片不指向指针
	mp2 := make(map[string] *[]int)   //切片指向指针

	mp1["test"] = slice
	mp2["test"] = &slice

	fmt.Println("mp1",mp1)
	fmt.Println("mp2",mp2)
}