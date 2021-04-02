package main

import (
	"context"
	"fmt"
	"time"

	"microservices-demo/lib/tracer"
	"microservices-demo/srv/hello/handler"
	example "microservices-demo/srv/hello/proto/example"
	"microservices-demo/srv/hello/subscriber"

	"github.com/micro/go-micro"
	"github.com/micro/go-micro/service/grpc"
	"github.com/micro/go-micro/util/log"
	ocplugin "github.com/micro/go-plugins/wrapper/trace/opentracing"
	opentracing "github.com/opentracing/opentracing-go"

	"github.com/micro/go-micro/registry"
	"github.com/micro/go-plugins/registry/consul"
)

func Handler(ctx context.Context, msg *example.Message) error {
	log.Log("Function Received message: ", msg.Say)
	return nil
}

func main() {
	// New Service
	t, io, err := tracer.NewTracer("go.micro.srv.hello", "")
	if err != nil {
		log.Fatal(err)
	}
	defer io.Close()
	opentracing.SetGlobalTracer(t)

	// 连接本地 consul
	opts := registry.Option(func(opts *registry.Options) {
		opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
	})

	service := grpc.NewService(
		micro.Name("go.micro.srv.hello"),
		// micro.Version("latest"),
		micro.RegisterTTL(time.Second*15),
		micro.RegisterInterval(time.Second*10),
		micro.WrapHandler(ocplugin.NewHandlerWrapper(t)),
		micro.Registry(consul.NewRegistry(opts)),
	)

	// Initialise service
	service.Init()

	// Register Handler
	example.RegisterExampleHandler(service.Server(), new(handler.Example))

	// // Register Struct as Subscriber
	// micro.RegisterSubscriber("go.micro.srv.hello", service.Server(), new(subscriber.Example))

	// Register Function as Subscriber
	micro.RegisterSubscriber("/test", service.Server(), subscriber.Handler)

	// Run service
	if err := service.Run(); err != nil {
		log.Fatal(err)
	}
}
