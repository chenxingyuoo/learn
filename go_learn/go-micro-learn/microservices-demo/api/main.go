package main

import (
	"context"
	"fmt"
	"time"

	"microservices-demo/api/router"
	"microservices-demo/lib/tracer"

	// "microservices-demo/lib/wrapper/tracer/opentracing/gin2micro"

	"github.com/afex/hystrix-go/hystrix"

	"github.com/micro/go-micro/client"
	"github.com/micro/go-micro/registry"
	"github.com/micro/go-micro/service/grpc"
	"github.com/micro/go-micro/util/log"
	"github.com/micro/go-micro/web"
	"github.com/micro/go-plugins/registry/consul"
	hystrixplugin "github.com/micro/go-plugins/wrapper/breaker/hystrix"
	opentracing "github.com/opentracing/opentracing-go"
)

var (
	serviceName    = "go.micro.api.user"
	serviceVersion = "latest"
)

func main() {
	// gin2micro.SetSamplingFrequency(50)

	t, io, err := tracer.NewTracer(serviceName, "")
	if err != nil {
		log.Fatal(err)
	}
	defer io.Close()
	opentracing.SetGlobalTracer(t)

	opts := registry.Option(
		func(opts *registry.Options) {
			opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
		})

	// 注册 webservice 到 consul
	// consul 一般是 service.NewService，web 是一种特别的 service
	service := web.NewService(
		web.Name(serviceName),
		web.RegisterTTL(time.Second*10),
		web.RegisterInterval(time.Second*5),
		web.MicroService(grpc.NewService()),
		web.Registry(consul.NewRegistry(opts))) // consul 的 Options，包括 consul 的地址
	service.Init()

	hystrix.DefaultTimeout = 5000

	// hystrix.ConfigureCommand("go.micro.srv.user.UserService.Auth", hystrix.CommandConfig{
	// 	Timeout:               1000,
	// 	MaxConcurrentRequests: 50,
	// 	ErrorPercentThreshold: 25,
	// })

	sClient := hystrixplugin.NewClientWrapper()(service.Options().Service.Client())

	sClient.Init(
		// client.WrapCall(ocplugin.NewCallWrapper(t)),
		client.Retries(3),
		client.Retry(func(ctx context.Context, req client.Request, retryCount int, err error) (bool, error) {
			log.Log(req.Method(), retryCount, " client retry")
			return true, nil
		}),
	)

	fmt.Println("sClient", sClient)

	gin := router.NewWebService(sClient)

	// 绑定 gin 到 "/" 路径上处理所有请求
	service.Handle("/", gin)

	// 启动 service
	if err := service.Run(); err != nil {
		println(err) // 出错了
	}
}
