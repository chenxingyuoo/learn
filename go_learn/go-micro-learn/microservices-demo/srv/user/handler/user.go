package handler

import (
	"context"
	"errors"
	"fmt"

	"microservices-demo/config"
	"microservices-demo/lib/token"

	"microservices-demo/srv/user/db"
	proto "microservices-demo/srv/user/proto"

	"github.com/micro/go-micro/util/log"
	uuid "github.com/satori/go.uuid"
)

const issuer = "go.micro.srv.auth"

// UserService 服务handler
type UserService struct {
	// token *token.Token
}

// New UserService
func New() *UserService {
	return &UserService{}
}

// Create 创建新User
func (ser *UserService) Create(ctx context.Context, req *proto.User, resp *proto.Response) error {
	if (req.Tel == "" && req.Email == "") || req.Name == "" || req.Password == "" {
		return errors.New("incomplete information")
	}

	uuid := uuid.NewV4()
	// if err != nil {
	// 	log.Log("new uuid error!")
	// 	return err
	// }
	var err error

	req.Id = uuid.String()

	fmt.Println("req", req)

	err = db.CreateUser(req)

	if err != nil {
		resp.ErrMsg = err.Error()
		resp.RetCode = 500
		log.Log(err.Error())
	} else {
		resp.ErrMsg = "请求成功了"
		resp.RetCode = 200
		resp.Data = req
	}

	return nil
}

// Delete 删除用户
func (ser *UserService) Delete(ctx context.Context, req *proto.User, resp *proto.Response) error {
	return db.DelUser(req)
}

// Get 获取用户信息
func (ser *UserService) Get(ctx context.Context, req *proto.User, resp *proto.User) (err error) {
	if req.Id != "" {
		*resp, err = db.GetByID(req.Id)
		if err != nil {
			return err
		}
	} else if req.Tel != "" {
		*resp, err = db.GetByTel(req.Tel)
		if err != nil {
			return err
		}
	} else if req.Email != "" {
		*resp, err = db.GetByEmail(req.Email)
		if err != nil {
			return err
		}
	}

	resp.Password = ""
	return nil
}

// GetAll 获取所有用户信息
func (ser *UserService) GetAll(ctx context.Context, req *proto.Request, resp *proto.Users) (err error) {
	resp.Users, err = db.GetAllUsers()
	return err
}

// UpdateInfo 更新用户信息
func (ser *UserService) UpdateInfo(ctx context.Context, req *proto.User, resp *proto.Response) error {
	if req.Id == "" {
		return errors.New("Illegal user ID")
	}
	return db.UpdateUserInfo(req)
}

// Auth 验证用户账号密码
func (ser *UserService) Auth(ctx context.Context, req *proto.User, resp *proto.Token) error {
	// time.Sleep(time.Second * 2)
	var user proto.User
	var err error
	if req.Tel != "" {
		user, err = db.GetByTel(req.Tel)
		if err != nil {
			return err
		}
	} else if req.Email != "" {
		user, err = db.GetByEmail(req.Email)
		if err != nil {
			return err
		}
	} else {
		return errors.New("tel/email cannot be empty")
	}

	if req.Password == user.Password {
		tokenStr := token.CreateToken(config.TokenSecret, user.Id, user.Name)
		// var tokenStr string = "xxxtoken"
		// expireTime := time.Now().Add(time.Hour * 24).Unix() // 1天后过期
		// tokenStr, err = ser.token.Encode(issuer, user.Name, expireTime)
		// if err != nil {
		// 	return err
		// }
		resp.Token = tokenStr
		return nil
	}
	return errors.New("Incorrect account or password")
}

// Ping test
func (ser *UserService) Ping(ctx context.Context, req *proto.Request, resp *proto.Response) error {
	log.Log("Received User.Ping request")
	return nil
}
