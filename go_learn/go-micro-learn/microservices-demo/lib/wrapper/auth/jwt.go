package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	// "github.com/Allenxuxu/microservices/lib/token"

	"microservices-demo/config"
	"microservices-demo/lib/token"

	"github.com/dgrijalva/jwt-go"
	"github.com/micro/micro/plugin"
)

type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type ErrorResponse struct {
	Error interface{} `json:"error"`
}

// JWTAuthWrapper JWT鉴权Wrapper
func JWTAuthWrapper() plugin.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			log.Println("auth plugin received: " + r.URL.Path)
			// TODO 从配置中心动态获取白名单URL
			if r.URL.Path == "/user/login" || r.URL.Path == "/user/register" || r.URL.Path == "/user/test" || r.URL.Path == "/metrics" {
				h.ServeHTTP(w, r)
				return
			}

			tokenstr := r.Header.Get("token")
			log.Println("tokenstr", tokenstr)

			// userFromToken, e := token.Decode(tokenstr)
			if tokenstr == "" {
				response := Response{
					Code:    500,
					Data:    nil,
					Message: "token为空",
				}

				data, err := json.Marshal(response)

				if err == nil {
					fmt.Println("================struct 到json str==")
					fmt.Println(string(data))
				}

				w.WriteHeader(http.StatusUnauthorized)
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Content-Length", strconv.Itoa(len(data)))

				w.Write(data)
				return
			}

			err := token.ParseToken(config.TokenSecret, tokenstr)
			if err != nil {
				log.Println(err.Error())

				switch err.(*jwt.ValidationError).Errors {
				case jwt.ValidationErrorExpired:
					// respondWithError(c, "Token超时")
					w.WriteHeader(http.StatusUnauthorized)
				default:
					// respondWithError(c, "Token鉴权失败")
					w.WriteHeader(http.StatusUnauthorized)
				}
				return
			}

			// if e != nil {
			// 	w.WriteHeader(http.StatusUnauthorized)
			// 	return
			// }

			// log.Println("User Name : ", userFromToken.UserName)
			// r.Header.Set("X-Example-Username", userFromToken.UserName)
			h.ServeHTTP(w, r)
		})
	}
}
