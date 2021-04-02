package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"first-gin/controller"
	"first-gin/middleware"
)

func hello(ctx *gin.Context) {
	println(">>>> hello function start <<<<")

	ctx.HTML(http.StatusOK, "index.html", gin.H{
		"message": "hello world!",
	})
}

// This function's name is a must. App Engine uses it to drive the requests properly.
func main() {
	// Starts a new Gin instance with no middle-ware
	router := gin.New()

	router.Static("/dist", "./dist")
	router.LoadHTMLGlob("templates/*")

	// Define your handlers
	router.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello World!")
	})

	router.GET("/ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "pong")
	})

	router.GET("/hello", middleware.Authorized(), hello)

	user := router.Group("/user")
	{
		// 请求参数在请求路径上
		user.GET("/query", userController.QueryList)
		user.GET("/create", userController.CreateUser)
	}

	// Handle all requests using net/http
	http.Handle("/", router)

	router.Run(":8082")
}
