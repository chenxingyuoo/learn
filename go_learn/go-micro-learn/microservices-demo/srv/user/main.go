package main

import (
	"fmt"
	"log"
	"time"

	db "microservices-demo/srv/user/db"
	"microservices-demo/srv/user/handler"
	proto "microservices-demo/srv/user/proto"
	"microservices-demo/srv/user/subscriber"

	"microservices-demo/lib/tracer"

	"github.com/micro/go-micro"
	"github.com/micro/go-micro/registry"
	"github.com/micro/go-plugins/registry/consul"

	ocplugin "github.com/micro/go-plugins/wrapper/trace/opentracing"
	opentracing "github.com/opentracing/opentracing-go"
)

func main() {
	serviceName := "go.micro.srv.user"

	t, io, err := tracer.NewTracer(serviceName, "")
	if err != nil {
		log.Fatal(err)
	}
	defer io.Close()
	opentracing.SetGlobalTracer(t)

	// 连接本地 consul
	opts := registry.Option(func(opts *registry.Options) {
		opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
	})
	// New Service
	service := micro.NewService(
		micro.Name(serviceName),
		micro.Version("latest"),
		micro.RegisterTTL(time.Second*10),
		micro.RegisterInterval(time.Second*5),
		micro.WrapHandler(ocplugin.NewHandlerWrapper(opentracing.GlobalTracer())),
		micro.Registry(consul.NewRegistry(opts)),
	)
	// Init
	service.Init()

	db.Init()

	// Binding handling
	proto.RegisterUserServiceHandler(service.Server(), handler.New())

	// Register Struct as Subscriber
	micro.RegisterSubscriber("user.pubsub.1", service.Server(), new(subscriber.Example))

	// Register Function as Subscriber
	micro.RegisterSubscriber("user.pubsub.2", service.Server(), subscriber.Handler)

	// Run Service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}
