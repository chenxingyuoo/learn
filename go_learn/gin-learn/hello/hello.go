package main

import (
	"fmt"

	user "github.com/you/hello/module"

	"rsc.io/quote"
)

func main() {
	fmt.Print(user.User{"a","b"})
	fmt.Println(quote.Hello())
}
