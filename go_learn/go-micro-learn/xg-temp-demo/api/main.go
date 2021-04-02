package main // main 是 go 中间一个特殊的 package，表示是程序入口，不然的话就算有 main 方法还是不能执行

import (
	"fmt"
	"log"
	"time"
	"xg-temp-demo/api/client"
	"xg-temp-demo/api/handler"

	"xg-temp-demo/lib/tracer"

	"github.com/micro/go-micro/registry"
	"github.com/micro/go-micro/web"
	"github.com/micro/go-plugins/registry/consul"

	opentracing "github.com/opentracing/opentracing-go"
)

var (
	listenPort = "localhost:8000" // Restful 接口的 IP 和端口
)

var (
	serviceName    = client.API_SERVICE_NAME
	serviceVersion = "latest"
)

func main() {
	fmt.Printf("start service:%s version:%s", serviceName, serviceVersion)

	t, io, err := tracer.NewTracer(serviceName, "")
	if err != nil {
		log.Fatal(err)
	}
	defer io.Close()
	opentracing.SetGlobalTracer(t)

	// 连接本地 consul client
	// registry.Option 是一个函数，这个函数接受 Options 为入参; Options 是一个 stuct，里面有 Addr, Timeout 等字段，
	// 其中 Addr 为 host:port 格式，是 consul 服务的监听地址，默认的情况下是本地的 8500 端口，这个可以在前面启动 consul 服务的时候设置、看见
	// 这个设计在 Java/Android 的回调方法设计中很常见
	opts := registry.Option(
		func(opts *registry.Options) {
			opts.Addrs = []string{fmt.Sprintf("%s:%d", "127.0.0.1", 8500)}
		})

	// 注册 webservice 到 consul
	// consul 一般是 service.NewService，web 是一种特别的 service
	service := web.NewService(
		web.Name(serviceName),
		web.Address(listenPort), // web 服务的地址
		web.RegisterTTL(time.Second*10),
		web.RegisterInterval(time.Second*5),
		web.Registry(consul.NewRegistry(opts))) // consul 的 Options，包括 consul 的地址
	service.Init()

	// 初始化控制层
	gin := handler.NewWebService() // 拿到一个 gin Engine

	// 初始化 micro service
	client.InitApiService()

	// 绑定 gin 到 "/" 路径上处理所有请求
	service.Handle("/", gin)

	// 启动 service
	if err := service.Run(); err != nil {
		println(err) // 出错了
	}
}
