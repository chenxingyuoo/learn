package main

import (
	"errors"
	"fmt"
	"log"
	"net"
	"net/rpc"
	"os"
	"proto-rpc-demo/pb/arith"
)

// 算术运算结构体
type Arith struct {
}

// 乘法运算方法
func (this *Arith) Multiply(req *arith.ArithRequest, res *arith.ArithResponse) error {
	res.Pro = req.GetA() * req.GetB()
	return nil
}

// 除法运算方法
func (this *Arith) Divide(req *arith.ArithRequest, res *arith.ArithResponse) error {
	if req.GetB() == 0 {
		return errors.New("divide by zero")
	}
	res.Quo = req.GetA() / req.GetB()
	res.Rem = req.GetA() % req.GetB()
	return nil
}

func main() {
	rpc.RegisterName("ArithService", new(Arith))
	listener, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("ListenTCP error:", err)
	}

	for {
		// 接收客户端连接请求
		conn, err := listener.Accept()

		if err != nil {
			log.Fatal("Accept error:", err)
			continue
		}

		go func(conn net.Conn) { // 并发处理客户端请求
			fmt.Fprintf(os.Stdout, "%s", "new client in coming\n")
			rpc.ServeConn(conn)
		}(conn)
	}
}
