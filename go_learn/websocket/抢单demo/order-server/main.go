package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"order-server/lib/redislock"
	"order-server/socket"

	"github.com/garyburd/redigo/redis"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
)

type OrderParam struct {
	Name  string `form:"name" json:"name"`
	Money int    `form:"money" json:"money"`
}

type Order struct {
	Uuid string `json:"uuid"`
	Name  string `json:"name"`
	Money int `json:"money"`
	Status int `json:"status"`
}

type SendOrder struct {
	Data Order `json:"data"`
	Type string `json:"type"`
}



func createOrder(c *gin.Context) {
	var param OrderParam
	if err := c.ShouldBindJSON(&param); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	rds, err := redis.Dial("tcp", "127.0.0.1:6379")
	if err != nil {
		fmt.Println("Connect to redis error", err)
		return
	}
	defer rds.Close()

	u1 := uuid.Must(uuid.NewV4())
	u1Str := u1.String()
	println("u1Str", u1Str)

	order := Order{Uuid: u1Str, Name: param.Name, Money: param.Money, Status: 0}

	b, err := json.Marshal(order)
	println("order json str", string(b))

	_, err = rds.Do("SET", u1Str, string(b))
	if err != nil {
		fmt.Println("redis set failed:", err)
	}

	sendOrder := SendOrder{Data: order, Type: "add-order"}


	sendOrderJson, err := json.Marshal(sendOrder)
	if err != nil {
		fmt.Println("redis set failed:", err)
	}

	fmt.Println("sendOrder:", sendOrder)

	for _, client := range socket.Clients {
		err := client.SendText(string(sendOrderJson))
		fmt.Println("client.SendText err", err)
	}

	c.JSON(200, gin.H{
		"message": "创建订单成功",
	})
}

// 抢单
func grabOrder(c *gin.Context) {
	fmt.Println("start", c.Query("index"))
	//DefaultTimeout := 10
	conn, err := redis.Dial("tcp", "localhost:6379")

	lock, ok, err := redislock.TryLock(conn, "xiaoru.cc")
	if err != nil {
		fmt.Println("Error while attempting lock")
		return
	}
	if !ok {
		fmt.Println("Locking")
		c.JSON(200, gin.H{
			"message": "Locking 手慢了一步，订单被别人抢了",
		})
		return
	}

	defer lock.Unlock()

	uuidStr := c.DefaultQuery("uuid", "")

	orderJsonStr, err := redis.String(conn.Do("GET", uuidStr))
	if err != nil {
		fmt.Println("redis get failed:", err)
		return
	}

	var order Order
	if err := json.Unmarshal([]byte(orderJsonStr), &order); err != nil {
		fmt.Println("orderJsonStr to struct failed:", err)
		return
	}

	if order.Status == 1 {
		c.JSON(200, gin.H{
			"message": "手慢了一步，单被别人抢了",
		})
		return
	}

	order.Status = 1

	b, err := json.Marshal(order)

	_, err = conn.Do("SET", uuidStr, string(b))
	if err != nil {
		fmt.Println("redis set failed:", err)
		return
	}

	//time.Sleep(time.Duration(1) * time.Second)

	fmt.Println("end")

	c.JSON(200, gin.H{
		"message": "恭喜抢到单了",
	})
}

func main() {
	r := gin.Default()

	r.Static("/assets", "./assets")

	r.GET("/ws/:token", func(c *gin.Context) {
		token := c.Param("token")

		socket.InitConnection(token, c.Writer, c.Request)
	})

	r.POST("/order/create", createOrder)
	r.GET("/order/grab", grabOrder)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
