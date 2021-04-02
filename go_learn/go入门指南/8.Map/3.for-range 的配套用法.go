// for key, value := range map1 {
// ...
// }

package main

import "fmt"

func main()  {
	range1()
	range2()
	range3()
}

func range1() {
	map1 := make(map[int]float32)
	map1[1] = 1.0
	map1[2] = 2.0
	map1[3] = 3.0
	map1[4] = 4.0
	for key, value := range map1 {
		fmt.Printf("key is: %d - value is: %f\n", key, value)
	}
}

// key is: 3 - value is: 3.000000
// key is: 1 - value is: 1.000000
// key is: 4 - value is: 4.000000
// key is: 2 - value is: 2.000000

//注意 map 不是按照 key 的顺序排列的，也不是按照 value 的序排列的。


func range2() {
	capitals := map[string]string{"France": "Paris", "Italy": "Rome", "Japan": "Tokyo"}
	for key := range capitals {
		fmt.Println("Map item: Capital of", key, "is", capitals[key])
	}

	a := make(map[int]float32)
	a[1] = 11.0
	a[2] = 22.0
	a[3] = 33.0
	a[4] = 44.0
	for key := range a {
		fmt.Println("Map item:", key, "is", a[key])
	}
}

func range3()  {
	var Days = map[int]string{
		1: "monday",
		2: "tuesday",
		3: "wednesday",
		4: "thursday",
		5: "friday",
		6: "saturday",
		7: "sunday",
	}

	flagHolliday := false

	for k,v := range Days {
		if v == "thursday" || v == "holliday" {
			fmt.Println(v, " is the ", k, "th day in the week")
			if v == "holliday" {
				flagHolliday = true
			}
		}
	}

	if !flagHolliday {
		fmt.Println("holliday is not a day!")
	}
}
