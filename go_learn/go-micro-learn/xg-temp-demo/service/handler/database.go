package handler

import (
	"xg-temp-demo/service/common"

	_ "github.com/go-sql-driver/mysql" // 这个意思是要执行 mysql 该包下的文件里所有init()函数，但不会打包这个包，所以无法通过包名来调用包中的其他函数
	"github.com/jinzhu/gorm"
)

func CreateMySqlConnection() (*gorm.DB, error) {
	host := common.CfgInstance().MySql.Host
	port := common.CfgInstance().MySql.Port
	if host == "" || host == "localhost" || host == "127.0.0.1" {
		host = ""
	} else {
		// 远程 ip
		host = "tcp(" + host + ":" + port + ")"
	}

	user := common.CfgInstance().MySql.User
	password := common.CfgInstance().MySql.Password
	dbName := common.CfgInstance().MySql.DBName

	return gorm.Open("mysql",
		user+":"+password+"@"+host+"/"+dbName+"?charset=utf8&parseTime=true&loc=Local")
}
