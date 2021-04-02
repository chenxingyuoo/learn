package main

import "fmt"

type Car interface {
	NameGet() string
	Run(n int)
	Stop()
}

type BMW struct {
	Name string
}
func (this *BMW) NameGet() string {
	return this.Name
}
func (this *BMW) Run(n int) {
	fmt.Printf("BMW is running of num is %d \n", n)
}
func (this *BMW) Stop() {
	fmt.Printf("BMW is stop \n")
}

type Benz struct {
	Name string
}
func (this *Benz) NameGet() string {
	return this.Name
}
func (this *Benz) Run(n int) {
	fmt.Printf("Benz is running of num is %d \n", n)
}
func (this *Benz) Stop() {
	fmt.Printf("Benz is stop \n")
}
func (this *Benz) ChatUp() {
	fmt.Printf("ChatUp \n")
}



func main() {
	var car Car
	fmt.Println(car) // <nil>

	var bmw BMW = BMW{Name: "宝马"}
	car = &bmw
	fmt.Println(car.NameGet()) //宝马
	car.Run(1)                 //BMW is running of num is 1
	car.Stop()                 //BMW is stop

	benz := &Benz{Name: "大奔"}
	car = benz
	fmt.Println(car.NameGet()) //大奔
	car.Run(2)                 //Benz is running of num is 2
	car.Stop()                 //Benz is stop
	//car.ChatUp()    //ERROR: car.ChatUp undefined (type Car has no field or method ChatUp)

	bmw2 := BMW{Name: "宝马"}
	bmw3 := bmw2

	bmw3.Name = "xx"

	fmt.Println("bmw2.NameGet()", bmw2.NameGet())
	fmt.Println("bmw3.NameGet()", bmw3.NameGet())
}