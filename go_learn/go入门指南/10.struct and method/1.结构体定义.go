// package main
//
// import "fmt"
//
// type struct1 struct {
// 	i1  int
// 	f1  float32
// 	str string
// }
//
// func main() {
// 	ms := new(struct1)
// 	ms.i1 = 10
// 	ms.f1 = 15.5
// 	ms.str = "Chris"
//
// 	fmt.Printf("The int is: %d\n", ms.i1)
// 	fmt.Printf("The float is: %f\n", ms.f1)
// 	fmt.Printf("The string is: %s\n", ms.str)
// 	fmt.Println(ms)
// }

// The int is: 10
// The float is: 15.500000
// The string is: Chris
// &{10 15.5 Chris}

package main

import (
	"fmt"
	"strings"
)

type Person struct {
	firstName string
	lastName  string
}

func upPerson(p *Person) {
	p.firstName = strings.ToUpper(p.firstName)
	p.lastName = strings.ToUpper(p.lastName)
}

func main() {
	// 1-struct as a value type:
	var pers1 Person
	pers1.firstName = "Chris"
	pers1.lastName = "Woodward"
	upPerson(&pers1)
	fmt.Printf("The name of the person is %s %s\n", pers1.firstName, pers1.lastName)

	// 2—struct as a pointer:
	pers2 := new(Person)
	pers2.firstName = "Chris"
	pers2.lastName = "Woodward"
	(*pers2).lastName = "Woodward" // 这是合法的
	upPerson(pers2)
	fmt.Printf("The name of the person is %s %s\n", pers2.firstName, pers2.lastName)

	// 3—struct as a literal:
	pers3 := &Person{"Chris", "Woodward"}
	upPerson(pers3)
	fmt.Printf("The name of the person is %s %s\n", pers3.firstName, pers3.lastName)
}

// The name of the person is CHRIS WOODWARD
// The name of the person is CHRIS WOODWARD
// The name of the person is CHRIS WOODWARD
