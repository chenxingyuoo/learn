package main

import (
	"fmt"
	"log"
	"net/http"
)

func HelloServer(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello "+req.URL.Path[1:])
}

func HelloServer2(w http.ResponseWriter, req *http.Request) {
	w.Write([]byte("hello world!"))
}

func main() {
	http.HandleFunc("/", HelloServer)
	http.HandleFunc("/hello", HelloServer2)

	err := http.ListenAndServe("127.0.0.1:8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err.Error())
	}
}
