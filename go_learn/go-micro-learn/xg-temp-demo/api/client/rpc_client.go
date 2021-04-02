package client

import (
	"context"
	"fmt"
	appProto "xg-temp-demo/service/proto"

	"github.com/micro/go-micro/client"
)

var (
	AppService appProto.AppService // 一个全局变量保存初始化后的实例
)

var API_SERVICE_NAME = "xgtmp.api.app"
var APP_SERVICE_NAME = "xgtmp.srv.app"

// 类似于静态函数，返回一个实例值。这里的单例与否需要上层来保证
// 这里是创建 api 服务，也就是 api web service。
func InitApiService() {
	// ApiService = goMicro.NewService(
	// 	goMicro.Name(API_SERVICE_NAME),
	// 	goMicro.Version("latest"))
	// ApiService.Init()
	AppService = appProto.NewAppService(APP_SERVICE_NAME, client.DefaultClient)
}

// 将本地调用，转换成 rpc 调用。如果数据结构不一致，这里会需要做数据结构的转换，包括传给 rpc 调用的参数，以及收到的返回结果。
func CreateAppInfo(mobileAppCreateRequest *appProto.MobileApplication) *appProto.AppResponse {
	// 声明要找哪个 RPC 服务，以及绑定到哪个 client 数据结构上
	// apiService 做发起 rpc 请求的一方，所以是 client
	fmt.Printf("Create RPC client for : %v", mobileAppCreateRequest)
	// 实际调用 rpc
	resp, err := AppService.CreateAppInfo(context.TODO(), mobileAppCreateRequest)
	if err != nil {
		println(err.Error())
	}
	return resp
}
