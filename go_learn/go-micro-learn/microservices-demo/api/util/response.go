package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Gin struct {
	Ctx *gin.Context
}

type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type ErrorResponse struct {
	Error interface{} `json:"error"`
}

// Success response
// swagger:response ok
func (g *Gin) Success(data interface{}) {
	// in:body
	g.Ctx.JSON(http.StatusOK, Response{
		// HTTP status code 200 - OK
		Code:    200,
		Data:    data,
		Message: "success",
	})
}

func (g *Gin) Fail(message string, data interface{}) {
	if message == "" {
		message = "fail"
	}

	g.Ctx.JSON(http.StatusOK, Response{
		Code:    500,
		Data:    data,
		Message: message,
	})
}

func (g *Gin) Error(status int, err string) {
	g.Ctx.JSON(status, ErrorResponse{
		Error: err,
	})
}
