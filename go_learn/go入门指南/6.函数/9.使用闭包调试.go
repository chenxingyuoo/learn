package main

import (
	"runtime"
	"log"
)

func main()  {
	where := func() {
		_, file, line, _ := runtime.Caller(1)
		log.Printf("%s:%d", file, line)
	}
	where()
	// some code
	where()
	// some more code
	where()

	log.SetFlags(log.Llongfile)
	log.Print("")

	var where1 = log.Print

	where1()

}