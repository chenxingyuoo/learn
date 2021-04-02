package main

import (
	module "arithmetic_rate_limit_demo/module"
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-kit/kit/log"
	"github.com/juju/ratelimit"
)

func main() {

	ctx := context.Background()
	errChan := make(chan error)

	var logger log.Logger
	{
		logger = log.NewLogfmtLogger(os.Stderr)
		logger = log.With(logger, "ts", log.DefaultTimestampUTC)
		logger = log.With(logger, "caller", log.DefaultCaller)
	}

	var svc module.Service
	svc = module.ArithmeticService{}

	// add logging middleware
	svc = module.LoggingMiddleware(logger)(svc)

	endpoint := module.MakeArithmeticEndpoint(svc)

	// add ratelimit,refill every second,set capacity 3
	ratebucket := ratelimit.NewBucket(time.Second*1, 3)
	endpoint = module.NewTokenBucketLimitterWithJuju(ratebucket)(endpoint)

	r := module.MakeHttpHandler(ctx, endpoint, logger)

	go func() {
		fmt.Println("Http Server start at port:9000")
		handler := r
		errChan <- http.ListenAndServe(":9000", handler)
	}()

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("%s", <-c)
	}()

	fmt.Println(<-errChan)
}
