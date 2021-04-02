package main

import (
	"fmt"
	"github.com/garyburd/redigo/redis"
	"github.com/gin-gonic/gin"
	"gopkg.in/redsync.v1"
	"order-server/lib/redislock"
	"order-server/lib/redlock"
	"time"
)


func TestLock(c *gin.Context)  {
	fmt.Println("start")
	DefaultTimeout := 3
	conn, err := redis.Dial("tcp", "localhost:6379")

	lock, ok, err := redislock.TryLock(conn, "xiaoru.cc")
	if err != nil {
		fmt.Println("Error while attempting lock")
		return
	}
	if !ok {
		fmt.Println("Locking")
		return
	}

	defer lock.Unlock()

	time.Sleep(time.Duration(DefaultTimeout) * time.Second)
	fmt.Println("end")

	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func TestRedLock(c *gin.Context)  {
	pools := redlock.NewPools([]string{"127.0.0.1:6379"})
	rs := redsync.New(pools)
	m := rs.NewMutex("/lock")

	fmt.Println("m", m)
	err := m.Lock()
	if err != nil {
		panic(err)
	}
	fmt.Println("lock success")
	unlockRes := m.Unlock()
	fmt.Println("unlock result: ", unlockRes)

	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func main() {
	r := gin.Default()

	r.GET("/test", TestLock)
	r.GET("/testredlock", TestRedLock)
	r.Run()
}