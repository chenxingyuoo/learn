package handler

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	apiClient "microservices-demo/api/client"
	helloS "microservices-demo/srv/hello/proto/example"
	userProto "microservices-demo/srv/user/proto"

	"microservices-demo/lib/wrapper/tracer/opentracing/gin2micro"

	"github.com/gin-gonic/gin"
	"github.com/micro/go-micro"

	"github.com/micro/go-micro/client"
	"github.com/micro/go-micro/util/log"
)

// UserAPIService 服务
type UserAPIService struct {
	userClient *apiClient.UserServiceClient
	helloC     helloS.ExampleService
	pub        micro.Publisher
}

// New UserAPIService
func New(client client.Client, pub micro.Publisher) *UserAPIService {
	return &UserAPIService{
		userClient: apiClient.NewUserServiceClient(client), // 注册服务
		helloC:     helloS.NewExampleService("", client),
		pub:        pub,
	}
}

func (s *UserAPIService) Test(c *gin.Context) {
	_, ok := gin2micro.ContextWithSpan(c)
	if ok == false {
		log.Log("get context err")
	}

	c.JSON(200, gin.H{
		"data": "success",
	})
}

func (s *UserAPIService) Login(c *gin.Context) {
	var user *userProto.User

	ctx, ok := gin2micro.ContextWithSpan(c)
	if ok == false {
		log.Log("get context err")
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithError(http.StatusBadRequest, errors.New(err.Error()))
		return
	}

	res, err := s.helloC.Call(ctx, &helloS.Request{Name: "go"})
	log.Log(res)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, errors.New(err.Error()))
		return
	}

	resp, err := s.userClient.Auth(ctx, user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, errors.New(err.Error()))
		return
	}

	// 发布消息
	if err := s.pub.Publish(context.TODO(), &userProto.Token{Token: "i am token"}); err != nil {
		log.Logf("error publishing: %v", err)
	}

	// tokenStr := token.CreateToken(config.TokenSecret, resp.Id, resp.Name)
	c.JSON(http.StatusCreated, gin.H{
		"data": resp,
	})
}

func (s *UserAPIService) GetUserInfo(c *gin.Context) {
	var user *userProto.User

	ctx, ok := gin2micro.ContextWithSpan(c)
	if ok == false {
		log.Log("get context err")
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.AbortWithError(http.StatusBadRequest, errors.New(err.Error()))
		return
	}

	resp, err := s.userClient.GetUser(ctx, user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, errors.New(err.Error()))
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": resp,
	})
}

// Create 新建一个用户
// {
// 	"name":"xx",
// 	"email": "123.@qq.com",
// 	"tel":"tel1",
// 	"password":"d"
// }
func (s *UserAPIService) Create(c *gin.Context) {
	fmt.Println("Create")

	// ctx, ok := gin2micro.ContextWithSpan(c)
	// if ok == false {
	// 	log.Log("get context err")
	// }
	var user *userProto.User

	ctx, ok := gin2micro.ContextWithSpan(c)
	if ok == false {
		log.Log("get context err")
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.AbortWithError(http.StatusBadRequest, errors.New("JWT decode failed"))
		return
	}

	fmt.Println("user", user)

	resp, err := s.userClient.CreateUser(ctx, user)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusCreated, resp)
}
