package db

import (
	"fmt"
	"log"
	pb "microservices-demo/srv/user/proto"
	"os"

	// "github.com/micro/go-micro/config/source/consul"
	_ "github.com/go-sql-driver/mysql" // 这个意思是要执行 mysql 该包下的文件里所有init()函数，但不会打包这个包，所以无法通过包名来调用包中的其他函数

	"github.com/jinzhu/gorm"
	//初始化数据库驱动
	// _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type dbInfo struct {
	Address      string `json:"address"`
	Port         int    `json:"port"`
	UserName     string `json:"user_name"`
	UserPassword string `json:"user_password"`
	DbName       string `json:"db_name"`
}

func Init() {
	// consulSource := consul.NewSource(consul.WithAddress(address))
	// conf := config.NewConfig()

	// // Load file source
	// err := conf.Load(consulSource)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// var v dbInfo
	// err = conf.Get("micro", "config", "database", "user").Scan(&v)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// log.Log(v)
	user := "root"
	password := ""
	host := ""
	dbName := "microservices_demo"

	db, err = gorm.Open("mysql", user+":"+password+"@"+host+"/"+dbName+"?charset=utf8&parseTime=true&loc=Local")
	if err != nil {
		log.Fatal("failed to connect database：", err)
	}

	// 创建表
	if !db.HasTable(&pb.User{}) {
		if err := db.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8"). // gorm 能直接根据 struct 生成对应的表，具体请见 gorm 文档
												CreateTable(&pb.User{}).Error; err != nil {
			fmt.Println("Error: Create table error")
			os.Exit(1)
		}
	}

	db.AutoMigrate(&pb.User{})
	db.Model(&pb.User{}).AddUniqueIndex("uIndex_email", "email")
	db.Model(&pb.User{}).AddUniqueIndex("uIndex_tel", "tel")
}

// CreateUser 在数据库中创建一个用户
func CreateUser(user *pb.User) error {
	return db.Create(user).Error
}

// DelUser 删除用户
func DelUser(user *pb.User) error {
	return db.Delete(user).Error
}

// UpdateUserInfo 更新用户信息
func UpdateUserInfo(user *pb.User) error {
	return db.Model(user).Updates(*user).Error
}

// GetByID 通过id取用户信息
func GetByID(id string) (pb.User, error) {
	var user pb.User
	err := db.Where("id = ?", id).Find(&user).Error
	return user, err
}

// GetByTel 通过电话获取用户信息
func GetByTel(tel string) (pb.User, error) {
	var user pb.User
	err := db.Where("tel = ?", tel).Find(&user).Error
	return user, err
}

// GetByEmail 通过邮箱获取用户信息
func GetByEmail(email string) (pb.User, error) {
	var user pb.User
	err := db.Where("email = ?", email).Find(&user).Error
	return user, err
}

// GetAllUsers 获取所有用户信息
func GetAllUsers() ([]*pb.User, error) {
	var users []*pb.User
	err := db.Find(&users).Error
	return users, err
}
