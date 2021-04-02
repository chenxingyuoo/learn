package middleware

import (
	"os"
	"github.com/gin-gonic/gin"
)

func respondWithError(code int, message string,c *gin.Context) {
	resp := map[string]string{"error": message}

	c.JSON(code, resp)
	c.Abort()
}

func Authorized() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.FormValue("api_token")

		if token == "" {
			respondWithError(401, "API token required", c)
			return

		}

		if token != os.Getenv("API_TOKEN") {
			respondWithError(401, "Invalid API token", c)
			return

		}

		c.Next()
	}
}