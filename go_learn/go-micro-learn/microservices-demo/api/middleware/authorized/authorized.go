package authorized

import (
	"fmt"

	"microservices-demo/api/config"
	"microservices-demo/api/util"
	"microservices-demo/lib/token"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func respondWithError(c *gin.Context, message string) {
	ginResponse := util.Gin{c}
	ginResponse.Error(401, message)
	c.Abort()
}

func Authorized() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := c.GetHeader("token")
		// token := c.Query("token")
		fmt.Println("tokenStr", tokenStr)

		if tokenStr == "" {
			respondWithError(c, "token required")
			return
		}

		err := token.ParseToken(config.TokenSecret, tokenStr)
		if err != nil {
			fmt.Println(err.Error())

			switch err.(*jwt.ValidationError).Errors {
			case jwt.ValidationErrorExpired:
				respondWithError(c, "Token超时")
			default:
				respondWithError(c, "Token鉴权失败")
			}
			return
		}

		c.Next()
	}
}
