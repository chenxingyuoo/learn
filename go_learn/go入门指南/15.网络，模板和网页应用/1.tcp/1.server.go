package main

import (
    "fmt"
    "net"
)

func main() {
    fmt.Println("Starting the server ...")
    // 创建 listener
    listener, err := net.Listen("tcp", "localhost:50000")
    
    checkError(err)  
	
	fmt.Println("listening","localhost:50000")

    // 监听并接受来自客户端的连接
    for {
        conn, err := listener.Accept()
        if err != nil {
            fmt.Println("Error accepting", err.Error())
            return // 终止程序
        }
        go doServerStuff(conn)
    }
}

func doServerStuff(conn net.Conn) {
    for {
        buf := make([]byte, 512)
        _, err := conn.Read(buf)
     
        checkError(err)  

        fmt.Println("Received data: %v", string(buf))
    }
}

func checkError(err error) {
    if err != nil {
        panic("Error: " + err.Error())  
    }
}