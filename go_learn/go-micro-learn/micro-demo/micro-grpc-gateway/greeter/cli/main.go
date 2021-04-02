package main

import (
	"context"
	"fmt"

	hello "micro-grpc-gateway/greeter/srv/proto/hello"

	"github.com/micro/go-micro/metadata"
	"github.com/micro/go-micro/service/grpc"
)

func main() {
	service := grpc.NewService()
	service.Init()

	// 创建hello客户端，这需要传入服务名与服务的客户端方法构建的客户端对象
	cl := hello.NewSayService("go.micro.srv.greeter", service.Client())

	// Set arbitrary headers in context
	ctx := metadata.NewContext(context.Background(), map[string]string{
		"X-User-Id": "john",
		"X-From-Id": "script",
	})

	rsp, err := cl.Hello(ctx, &hello.Request{
		Name: "John",
	})
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(rsp.Msg)
}
