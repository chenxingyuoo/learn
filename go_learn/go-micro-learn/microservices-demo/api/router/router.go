package router

import (
	handler "microservices-demo/api/handler/user"
	"microservices-demo/api/middleware/authorized"
	"microservices-demo/lib/wrapper/tracer/opentracing/gin2micro"

	"github.com/gin-gonic/gin"
	"github.com/micro/go-micro"
	"github.com/micro/go-micro/client"
)

func NewWebService(client client.Client) *gin.Engine {
	router := gin.Default() // 相当于一个 http-server

	app := router.Group("/user")

	// 实例化发布类
	pub := micro.NewPublisher("user.pubsub.1", client)

	// 定义了一个类，这样做完全是出于工程考虑，对 app 的请求都在这个接收者的方法上进行处理，避免混乱
	userHandler := handler.New(client, pub)

	app.Use(gin2micro.TracerWrapper)

	app.POST("/login", userHandler.Login)

	app.GET("/test", userHandler.Test)

	app.Use(authorized.Authorized())
	{
		app.GET("/info", userHandler.GetUserInfo)
		app.POST("/create", userHandler.Create)
	}

	return router
}
