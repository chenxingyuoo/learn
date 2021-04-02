package main

import (
	"fmt"
	"log"
	"time"

	hello "micro-demo/micro-greeter/srv/proto/hello"

	"github.com/micro/go-micro"
	"github.com/micro/go-micro/registry"
	"github.com/micro/go-plugins/registry/consul"

	"context"
)

type Say struct{}

func (s *Say) Hello(ctx context.Context, req *hello.Request, rsp *hello.Response) error {
	log.Print("Received Say.Hello request")
	rsp.Msg = "Hello " + req.Name
	return nil
}

func main() {
	// 连接本地 consul
	opts := registry.Option(func(opts *registry.Options) {
		opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
	})

	service := micro.NewService(
		micro.Name("go.micro.srv.greeter"),
		micro.RegisterTTL(time.Second*30),
		micro.RegisterInterval(time.Second*10),
		micro.Registry(consul.NewRegistry(opts)),
	)

	// optionally setup command line usage
	service.Init()

	// Register Handlers
	hello.RegisterSayHandler(service.Server(), new(Say))

	// Run server
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}
