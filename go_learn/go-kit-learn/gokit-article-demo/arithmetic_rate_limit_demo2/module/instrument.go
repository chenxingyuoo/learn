package module

import (
	"context"
	"errors"

	"gigolang.org/x/time/rate"
	"github.com/go-kit/kit/endpoint"
)

var ErrLimitExceed = errors.New("Rate limit exceed!")

// NewTokenBucketLimitterWithJuju 使用juju/ratelimit创建限流中间件
// func NewTokenBucketLimitterWithJuju(bkt *ratelimit.Bucket) endpoint.Middleware {
// 	return func(next endpoint.Endpoint) endpoint.Endpoint {
// 		return func(ctx context.Context, request interface{}) (response interface{}, err error) {
// 			if bkt.TakeAvailable(1) == 0 {
// 				return nil, ErrLimitExceed
// 			}
// 			return next(ctx, request)
// 		}
// 	}
// }

// NewTokenBucketLimitterWithBuildIn 使用x/time/rate创建限流中间件
func NewTokenBucketLimitterWithBuildIn(bkt *rate.Limiter) endpoint.Middleware {
	return func(next endpoint.Endpoint) endpoint.Endpoint {
		return func(ctx context.Context, request interface{}) (response interface{}, err error) {
			if !bkt.Allow() {
				return nil, ErrLimitExceed
			}
			return next(ctx, request)
		}
	}
}
