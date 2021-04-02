package redlock

import (
	"time"

	"github.com/garyburd/redigo/redis"
	"gopkg.in/redsync.v1"
)

func newPool(server string) *redis.Pool {
	return &redis.Pool{
		MaxIdle:     3,
		IdleTimeout: 240 * time.Second,

		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", server)
			if err != nil {
				return nil, err
			}
			return c, err
		},

		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
}

func NewPools(servers []string) []redsync.Pool {
	pools := []redsync.Pool{}
	for _, server := range servers {
		pool := newPool(server)
		pools = append(pools, pool)
	}

	return pools
}