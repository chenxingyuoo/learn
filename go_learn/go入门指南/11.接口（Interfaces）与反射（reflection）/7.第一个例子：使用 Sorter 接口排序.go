// type Sorter interface {
// 	Len() int
// 	Less(i, j int) bool
// 	Swap(i, j int)
// }
//
// func Sort(data Sorter) {
// 	for pass := 1; pass < data.Len(); pass++ {
// 		for i := 0; i < data.Len()-pass; i++ {
// 			if data.Less(i+1, i) {
// 				data.Swap(i, i+1)
// 			}
// 		}
// 	}
// }
//
// type IntArray []int
//
// func (p IntArray) Len() int {
// 	return len(p)
// }
// func (p IntArray) Less(i, j int) bool {
// 	return p[i] < p[j]
// }
// func (p IntArray) Swap(i, j int) {
// 	p[i], p[j] = p[j], p[i]
// }
//
//
// data := []int{74, 59, 238, -784, 9845, 959, 905, 0, 0, 42, 7586, -5467984, 7586}
// a := sort.IntArray(data) //conversion to type IntArray from package sort
// sort.Sort(a)

//完整代码2
package main

import (
	"fmt"

	"./sort"
)

func ints() {
	data := []int{74, 59, 238, -784, 9845, 959, 905, 0, 0, 42, 7586, -5467984, 7586}
	a := sort.IntArray(data) //conversion to type IntArray
	sort.Sort(a)
	if !sort.IsSorted(a) {
		panic("fails")
	}
	fmt.Printf("The sorted array is: %v\n", a)
}

func strings() {
	data := []string{"monday", "friday", "tuesday", "wednesday", "sunday", "thursday", "", "saturday"}
	a := sort.StringArray(data)
	sort.Sort(a)
	if !sort.IsSorted(a) {
		panic("fail")
	}
	fmt.Printf("The sorted array is: %v\n", a)
}

type day struct {
	num       int
	shortName string
	longName  string
}

type dayArray struct {
	data []*day
}

func (p *dayArray) Len() int           { return len(p.data) }
func (p *dayArray) Less(i, j int) bool { return p.data[i].num < p.data[j].num }
func (p *dayArray) Swap(i, j int)      { p.data[i], p.data[j] = p.data[j], p.data[i] }

func days() {
	Sunday := day{0, "SUN", "Sunday"}
	Monday := day{1, "MON", "Monday"}
	Tuesday := day{2, "TUE", "Tuesday"}
	Wednesday := day{3, "WED", "Wednesday"}
	Thursday := day{4, "THU", "Thursday"}
	Friday := day{5, "FRI", "Friday"}
	Saturday := day{6, "SAT", "Saturday"}
	data := []*day{&Tuesday, &Thursday, &Wednesday, &Sunday, &Monday, &Friday, &Saturday}
	a := dayArray{data}
	sort.Sort(&a)
	if !sort.IsSorted(&a) {
		panic("fail")
	}
	for _, d := range data {
		fmt.Printf("%s ", d.longName)
	}
	fmt.Printf("\n")
}

func main() {
	ints()
	strings()
	days()
}
