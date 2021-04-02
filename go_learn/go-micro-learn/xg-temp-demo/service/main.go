package main

import (
	"fmt"
	"log"
	"os"
	"time"
	"xg-temp-demo/lib/tracer"
	"xg-temp-demo/service/handler"
	proto "xg-temp-demo/service/proto"

	"github.com/micro/go-micro"
	"github.com/micro/go-micro/registry"
	"github.com/micro/go-plugins/registry/consul"

	ocplugin "github.com/micro/go-plugins/wrapper/trace/opentracing"
	opentracing "github.com/opentracing/opentracing-go"
)

func main() {
	serviceName := "xgtmp.srv.app"

	db, err := handler.CreateMySqlConnection()
	defer db.Close()

	if err != nil {
		println("conncet error: &s", err.Error())
		os.Exit(1)
	}

	appDao := &handler.AppDao{DB: db} // 将数据源传给 service 对象
	// 这里是通过 gorm 的 DDL 功能，直接创建表。但是仍需要先手动建库。
	// 假设要么所有表都存在要么都不存在
	if !appDao.DB.HasTable(&proto.MobileApplication{}) {
		if err := appDao.DB.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8"). // gorm 能直接根据 struct 生成对应的表，具体请见 gorm 文档
													CreateTable(&proto.MobileApplication{}).Error; err != nil {
			println("Error: Create table error")
			os.Exit(1)
		}
	}

	t, io, err := tracer.NewTracer(serviceName, "localhost:6831")
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
	// Init & Binding handling
	service.Init()
	_ = proto.RegisterAppHandler(service.Server(), appDao)

	// Run Service
	if err := service.Run(); err != nil {
		println(err)
	}
}
