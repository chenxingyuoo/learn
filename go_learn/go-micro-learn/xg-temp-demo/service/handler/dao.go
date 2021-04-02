package handler

import (
	"context"
	"fmt"
	proto "xg-temp-demo/service/proto"

	gorm "github.com/jinzhu/gorm"
)

type AppDao struct {
	DB *gorm.DB // 数据库镜像实例，类似于 SessionFactory
}

func (d *AppDao) CreateAppInfo(ctx context.Context, in *proto.MobileApplication, out *proto.AppResponse) error {
	fmt.Println("This is Cachhe and we are notified")
	// 模拟业务处理
	in.OtherInfo = "设置其它属性"
	err := d.DB.Create(in).Error // 插入一条数据
	if err != nil {
		out.ErrMsg = err.Error()
		out.RetCode = 500
		println(err)
	} else {
		out.ErrMsg = "没有错误啦"
		out.RetCode = 200
		out.App = in
	}
	// additional methods
	return nil
}

func (AppDao) UpdateAppInfo(context.Context, *proto.MobileApplication, *proto.AppResponse) error {
	panic("implement me")
}

func (AppDao) DeleteAppInfo(context.Context, *proto.MobileApplication, *proto.AppResponse) error {
	panic("implement me")
}

func (AppDao) QueryAppInfo(context.Context, *proto.AccessId, *proto.AppResponse) error {
	panic("implement me")
}
