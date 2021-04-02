package userController

import (
	"first-gin/db"
	"first-gin/model"
	"log"

	"github.com/gin-gonic/gin"
)

var collection = db.Collection{"users"}

func QueryList(context *gin.Context) {
	c := db.ConnecToDB(collection)

	results := make([]user.User, 2)

	err := c.Find(nil).All(&results)

	if err != nil {
		log.Fatal(err)
	}

	context.JSON(200, gin.H{
		"code":    200,
		"success": true,
		"data":    results,
	})
}

func CreateUser(context *gin.Context) {
	c := db.ConnecToDB(collection)

	user1 := user.User{
		Name:  "zhangsan",
		Phone: "13480989765",
		Email: "329832984@qq.com",
	}

	err := c.Insert(user1)

	if err != nil {
		log.Fatal(err)
	}

	context.JSON(200, gin.H{
		"code":    200,
		"success": true,
	})
}
