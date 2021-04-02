package handler

import (
	"fmt"
	"xg-temp-demo/api/client"
	"xg-temp-demo/lib/wrapper/tracer/opentracing/gin2micro"

	appProto "xg-temp-demo/service/proto"

	"github.com/gin-gonic/gin"
	"github.com/micro/go-micro/util/log"
)

// var apiService goMicro.Service

type AppManager struct{}

func (a *AppManager) CreateApp(c *gin.Context) {
	var mobileAppCreateRequest *appProto.MobileApplication // 声明一个反序列化后的接收对象

	_, ok := gin2micro.ContextWithSpan(c)
	if ok == false {
		log.Log("get context err")
	}

	// bind 可以很方便地从 URL query params 里或者 requestBody 里反序列化出对象，具体用法请查看相关文档
	err := c.ShouldBindJSON(&mobileAppCreateRequest)

	fmt.Println("mobileAppCreateRequest", mobileAppCreateRequest)

	if err != nil {
		fmt.Println("err", err.Error())
		resp := new(appProto.AppResponse)
		resp.ErrMsg = "请求错误"
		resp.RetCode = 400
		c.JSON(400, resp) // 出错了，可能是请求参数不对，返回状态码 400，body 部分是 JSON 格式的 resp
		c.Abort()         // 执行完当前 handler 后就不再执行后续的 handler 了。
		// 这个有点类似于 Java Struts 中的拦截器/Filter，框架允许类似 pipe 一样注册多个 handler 来处理请求，比如日志、鉴权
		return
	}

	// 通过 rpc 调用下游服务的 CreateAppInfo 并获取返回值
	// resp := client.CreateAppInfo(appProto.MobileApplication{
	// 	AppName: "王者荣耀 ios",
	// })

	appName := c.Param("appName")
	fmt.Println("appName", appName)

	// appService := appProto.NewAppService(client.APP_SERVICE_NAME, client.ApiService.Client())
	// fmt.Printf("Create RPC client for : %v", mobileAppCreateRequest)
	// 实际调用 rpc
	resp := client.CreateAppInfo(mobileAppCreateRequest)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }

	c.JSON(200, resp)
}

func (a *AppManager) DeleteApp(c *gin.Context) {
	c.JSON(200, gin.H{ // gin.H 是个很方便的生成 JSON 的方法
		"error": false,
		"data":  "你好啊 朋友",
	})
}

func (a *AppManager) UpdateApp(c *gin.Context) {
	c.JSON(200, gin.H{
		"error": false,
		"data":  "你好啊 朋友",
	})
}

func (a *AppManager) QueryApp(c *gin.Context) {
	c.JSON(200, gin.H{
		"error": false,
		"data":  "你好啊 朋友",
	})
}
