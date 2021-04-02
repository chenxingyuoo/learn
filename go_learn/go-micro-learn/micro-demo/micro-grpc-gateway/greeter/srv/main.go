package main

import (
	"context"
	"log"
	"time"

	hello "micro-grpc-gateway/greeter/srv/proto/hello"

	micro "github.com/micro/go-micro"
	grpc "github.com/micro/go-micro/service/grpc"
)

type Say struct{}

func (s *Say) Hello(ctx context.Context, req *hello.Request, rsp *hello.Response) error {
	log.Print("Received Say.Hello request")
	rsp.Msg = "Hello " + req.Name
	return nil
}

func main() {
	service := grpc.NewService(
		micro.Name("go.micro.srv.greeter"),
		micro.RegisterTTL(time.Second*30),
		micro.RegisterInterval(time.Second*10),
		// micro.Action(func(c *cli.Context) {
		// 	env := c.StringFlag("environment")
		// 	if len(env) > 0 {
		// 		fmt.Println("Environment set to", env)
		// 	}
		// }),
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
