package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	hello "github.com/micro/examples/greeter/srv/proto/hello"
	"github.com/micro/go-micro/client"
	"github.com/micro/go-micro/registry"
	"github.com/micro/go-micro/web"
	"github.com/micro/go-plugins/registry/consul"
)

type Say struct{}

var (
	cl hello.SayService
)

func (s *Say) Anything(c *gin.Context) {
	log.Print("Received Say.Anything API request")
	c.JSON(200, map[string]string{
		"message": "Hi, this is the Greeter API",
	})
}

func (s *Say) Hello(c *gin.Context) {
	log.Print("Received Say.Hello API request")

	name := c.Param("name")

	response, err := cl.Hello(context.TODO(), &hello.Request{
		Name: name,
	})

	if err != nil {
		c.JSON(500, err)
	}

	c.JSON(200, response)
}

var (
	listenPort = "localhost:8000" // Restful 接口的 IP 和端口
)

func main() {
	// 连接本地 consul client
	// registry.Option 是一个函数，这个函数接受 Options 为入参; Options 是一个 stuct，里面有 Addr, Timeout 等字段，
	// 其中 Addr 为 host:port 格式，是 consul 服务的监听地址，默认的情况下是本地的 8500 端口，这个可以在前面启动 consul 服务的时候设置、看见
	// 这个设计在 Java/Android 的回调方法设计中很常见
	opts := registry.Option(
		func(opts *registry.Options) {
			opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
		})

	// Create service
	service := web.NewService(
		web.Name("go.micro.api.greeter"),
		web.Address(listenPort), // web 服务的地址
		web.RegisterTTL(time.Second*10),
		web.RegisterInterval(time.Second*5),
		web.Registry(consul.NewRegistry(opts)), // consul 的 Options，包括 consul 的地址
	)

	service.Init()

	// setup Greeter Server Client
	cl = hello.NewSayService("go.micro.srv.greeter", client.DefaultClient)

	// Create RESTful handler (using Gin)
	say := new(Say)
	router := gin.Default()
	router.GET("/greeter", say.Anything)
	router.GET("/greeter/:name", say.Hello)

	// Register Handler
	service.Handle("/", router)

	// Run server
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}
