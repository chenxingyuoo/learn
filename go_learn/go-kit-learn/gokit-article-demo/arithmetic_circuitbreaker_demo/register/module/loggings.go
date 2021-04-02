package module

import (
	"time"

	"github.com/go-kit/kit/log"
)

type loggingMiddleware struct {
	Service
	logger log.Logger
}

func LoggingMiddleware(logger log.Logger) ServiceMiddleware {
	return func(next Service) Service {
		return loggingMiddleware{next, logger}
	}
}

func (mw loggingMiddleware) Add(a, b int) (ret int) {

	defer func(beign time.Time) {
		mw.logger.Log(
			"function", "Add",
			"a", a,
			"b", b,
			"result", ret,
			"took", time.Since(beign),
		)
	}(time.Now())

	ret = mw.Service.Add(a, b)
	return ret
}

func (mw loggingMiddleware) Subtract(a, b int) (ret int) {

	defer func(beign time.Time) {
		mw.logger.Log(
			"function", "Subtract",
			"a", a,
			"b", b,
			"result", ret,
			"took", time.Since(beign),
		)
	}(time.Now())

	ret = mw.Service.Subtract(a, b)
	return ret
}

func (mw loggingMiddleware) Multiply(a, b int) (ret int) {

	defer func(beign time.Time) {
		mw.logger.Log(
			"function", "Multiply",
			"a", a,
			"b", b,
			"result", ret,
			"took", time.Since(beign),
		)
	}(time.Now())

	ret = mw.Service.Multiply(a, b)
	return ret
}

func (mw loggingMiddleware) Divide(a, b int) (ret int, err error) {

	defer func(beign time.Time) {
		mw.logger.Log(
			"function", "Divide",
			"a", a,
			"b", b,
			"result", ret,
			"took", time.Since(beign),
		)
	}(time.Now())

	ret, err = mw.Service.Divide(a, b)
	return
}

// loggingMiddleware实现HealthCheck
func (mw loggingMiddleware) HealthCheck() (result bool) {
	defer func(begin time.Time) {
		mw.logger.Log(
			"function", "HealthChcek",
			"result", result,
			"took", time.Since(begin),
		)
	}(time.Now())
	result = mw.Service.HealthCheck()
	return
}
