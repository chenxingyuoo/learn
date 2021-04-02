package handler

import (
	"xg-temp-demo/lib/wrapper/tracer/opentracing/gin2micro"

	"github.com/gin-gonic/gin"
)

func NewWebService() *gin.Engine {
	router := gin.Default() // 相当于一个 http-server

	router.Use(gin2micro.TracerWrapper)

	v1 := router.Group("/v1")
	// 路径分组，也就是所有访问 /v1/* 都会被这个 group 拦截

	app := v1.Group("/app")
	// 同上。v1 表示 api 的版本是 1，app 上的操作都被拦截到这个 group 上进行处理
	appManager := new(AppManager)
	// 定义了一个类，这样做完全是出于工程考虑，对 app 的请求都在这个接收者的方法上进行处理，避免混乱
	app.POST("/create", appManager.CreateApp)
	// 对 create 路径的 POST 请求由 appManager 上的 CreateApp 方法处理，CreateApp 接收 gin.Context 参数，这个参数中可以获取当前请求的信息和一些其它信息
	app.POST("/delete", appManager.DeleteApp)
	app.POST("/update", appManager.UpdateApp)
	app.POST("/query", appManager.QueryApp)

	// product := v1.Group("/product")
	// pdtManager := new(ProductManager)
	// product.POST("/create", pdtManager.CreateProduct)
	// product.POST("/delete", pdtManager.DeleteProduct)
	// product.POST("/update", pdtManager.UpdateProduct)
	// product.POST("/query", pdtManager.QueryProduct)

	return router
}
