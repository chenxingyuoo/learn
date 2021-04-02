// package main
//
// import "fmt"
//
// var i = 5
// var str = "ABC"
//
// type Person struct {
// 	name string
// 	age  int
// }
//
// type Any interface{}
//
// func main() {
// 	var val Any
// 	val = 5
// 	fmt.Printf("val has the value: %v\n", val)
// 	val = str
// 	fmt.Printf("val has the value: %v\n", val)
// 	pers1 := new(Person)
// 	pers1.name = "Rob Pike"
// 	pers1.age = 55
// 	val = pers1
// 	fmt.Printf("val has the value: %v\n", val)
// 	switch t := val.(type) {
// 	case int:
// 		fmt.Printf("Type int %T\n", t)
// 	case string:
// 		fmt.Printf("Type string %T\n", t)
// 	case bool:
// 		fmt.Printf("Type boolean %T\n", t)
// 	case *Person:
// 		fmt.Printf("Type pointer to Person %T\n", t)
// 	default:
// 		fmt.Printf("Unexpected type %T", t)
// 	}
// }

// val has the value: 5
// val has the value: ABC
// val has the value: &{Rob Pike 55}
// Type pointer to Person *main.Person

package main

import "fmt"

type specialString string

var whatIsThis specialString = "hello"

func TypeSwitch() {
	testFunc := func(any interface{}) {
		switch v := any.(type) {
		case bool:
			fmt.Printf("any %v is a bool type", v)
		case int:
			fmt.Printf("any %v is an int type", v)
		case float32:
			fmt.Printf("any %v is a float32 type", v)
		case string:
			fmt.Printf("any %v is a string type", v)
		case specialString:
			fmt.Printf("any %v is a special String!", v)
		default:
			fmt.Println("unknown type!")
		}
	}
	testFunc(whatIsThis)
}

func main() {
	TypeSwitch()
}
