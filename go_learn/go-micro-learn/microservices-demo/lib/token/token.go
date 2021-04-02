package token

import (
	"errors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// 产生json web token
func CreateToken(secret string, userId string, userName string) string {
	//自定义claims
	claims := jwt.MapClaims{
		"id":       userId,
		"username": userName,
		// "nbf":      time.Now().Unix(),
		"exp": time.Now().Add(time.Hour * time.Duration(1)).Unix(),
		"iat": time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return tokenStr
}

// 校验token是否有效
func ParseToken(secret string, tokenStr string) (err error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return
	}

	// _, ok := token.Claims.(jwt.MapClaims)
	// if !ok {
	// 	err = errors.New("cannot convert claim to mapclaim")
	// 	return
	// }

	//验证token，如果token被修改过则为false
	if !token.Valid {
		err = errors.New("token is invalid")
		return
	}
	return
}
