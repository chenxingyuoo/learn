package main

import (
	module "arithmetic_rest_demo/module"
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-kit/kit/log"
)

func main() {

	ctx := context.Background()
	errChan := make(chan error)

	var svc module.Service
	svc = module.ArithmeticService{}
	endpoint := module.MakeArithmeticEndpoint(svc)

	var logger log.Logger
	{
		logger = log.NewLogfmtLogger(os.Stderr)
		logger = log.With(logger, "ts", log.DefaultTimestampUTC)
		logger = log.With(logger, "caller", log.DefaultCaller)
	}

	r := module.MakeHttpHandler(ctx, endpoint, logger)

	go func() {
		fmt.Println("Http Server start at port:9002")
		handler := r
		errChan <- http.ListenAndServe(":9002", handler)
	}()

	fmt.Println("进程启动...")
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("get signal %s", <-c)
		// ExitFunc()
	}()

	fmt.Println(<-errChan)
}

func ExitFunc() {
	fmt.Println("开始退出...")
	fmt.Println("执行清理...")
	fmt.Println("结束退出...")
	os.Exit(0)
}
