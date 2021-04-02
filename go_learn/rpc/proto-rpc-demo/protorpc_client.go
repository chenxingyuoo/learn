package main

import (
	"fmt"
	"log"
	"net/rpc"
	"proto-rpc-demo/pb/arith"
)

func main() {
	client, err := rpc.Dial("tcp", "localhost:1234")
	if err != nil {
		log.Fatal("dialing:", err)
	}

	req := arith.ArithRequest{
		A: 2,
		B: 2,
	}
	var res = &arith.ArithResponse{}

	err = client.Call("ArithService.Multiply", req, &res)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(res)
}
