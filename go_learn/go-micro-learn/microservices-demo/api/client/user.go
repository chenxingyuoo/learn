package client

import (
	"context"
	"fmt"
	proto "microservices-demo/srv/user/proto"

	"github.com/micro/go-micro/client"
)

// var (
// 	userService proto.UserService // 一个全局变量保存初始化后的实例
// )

type UserServiceClient struct {
	userServiceClient proto.UserService // 一个全局变量保存初始化后的实例
}

func NewUserServiceClient(client client.Client) *UserServiceClient {
	return &UserServiceClient{
		userServiceClient: proto.NewUserService("", client),
	}
}

func (c *UserServiceClient) CreateUser(context context.Context, user *proto.User) (resp *proto.Response, err error) {
	resp, err = c.userServiceClient.Create(context, user)

	fmt.Println("resp", resp)
	fmt.Println("err", err)
	return
}

func (c *UserServiceClient) GetUser(context context.Context, user *proto.User) (resp *proto.User, err error) {
	resp, err = c.userServiceClient.Get(context, user)

	fmt.Println("resp", resp)
	fmt.Println("err", err)
	return
}

func (c *UserServiceClient) Auth(context context.Context, user *proto.User) (resp *proto.Token, err error) {
	resp, err = c.userServiceClient.Auth(context, user)

	fmt.Println("resp", resp)
	fmt.Println("err", err)
	return
}
