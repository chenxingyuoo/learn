package main

import (
	module "arithmetic_circuitbreaker_demo/register/module"
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	kitzipkin "github.com/go-kit/kit/tracing/zipkin"
	zipkinhttp "github.com/openzipkin/zipkin-go/reporter/http"
	stdprometheus "github.com/prometheus/client_golang/prometheus"

	"github.com/go-kit/kit/log"
	"github.com/juju/ratelimit"
	"github.com/openzipkin/zipkin-go"
)

func main() {

	var (
		consulHost  = flag.String("consul.host", "", "consul ip address")
		consulPort  = flag.String("consul.port", "", "consul port")
		serviceHost = flag.String("service.host", "", "service ip address")
		servicePort = flag.String("service.port", "", "service port")
		zipkinURL   = flag.String("zipkin.url", "http://172.20.10.8:9411/api/v2/spans", "Zipkin server url")
	)

	flag.Parse()

	ctx := context.Background()
	errChan := make(chan error)

	var logger log.Logger
	{
		logger = log.NewLogfmtLogger(os.Stderr)
		logger = log.With(logger, "ts", log.DefaultTimestampUTC)
		logger = log.With(logger, "caller", log.DefaultCaller)
	}

	fieldKeys := []string{"method"}
	requestCount := kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
		Namespace: "raysonxin",
		Subsystem: "arithmetic_service",
		Name:      "request_count",
		Help:      "Number of requests received.",
	}, fieldKeys)

	requestLatency := kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
		Namespace: "raysonxin",
		Subsystem: "arithemetic_service",
		Name:      "request_latency",
		Help:      "Total duration of requests in microseconds.",
	}, fieldKeys)

	var zipkinTracer *zipkin.Tracer
	{
		var (
			err           error
			hostPort      = *serviceHost + ":" + *servicePort
			serviceName   = "arithmetic-service"
			useNoopTracer = (*zipkinURL == "")
			reporter      = zipkinhttp.NewReporter(*zipkinURL)
		)
		defer reporter.Close()
		zEP, _ := zipkin.NewEndpoint(serviceName, hostPort)
		zipkinTracer, err = zipkin.NewTracer(
			reporter, zipkin.WithLocalEndpoint(zEP), zipkin.WithNoopTracer(useNoopTracer),
		)
		if err != nil {
			logger.Log("err", err)
			os.Exit(1)
		}
		if !useNoopTracer {
			logger.Log("tracer", "Zipkin", "type", "Native", "URL", *zipkinURL)
		}
	}

	var svc module.Service
	svc = module.ArithmeticService{}
	svc = module.Metrics(requestCount, requestLatency)(svc)

	// add logging middleware
	svc = module.LoggingMiddleware(logger)(svc)

	endpoint := module.MakeArithmeticEndpoint(svc)

	// add ratelimit,refill every second,set capacity 100
	ratebucket := ratelimit.NewBucket(time.Second*1, 100)
	endpoint = module.NewTokenBucketLimitterWithJuju(ratebucket)(endpoint)
	//添加追踪，设置span的名称为calculate-endpoint
	endpoint = kitzipkin.TraceEndpoint(zipkinTracer, "calculate-endpoint")(endpoint)

	//创建健康检查的Endpoint，未增加限流
	healthEndpoint := module.MakeHealthCheckEndpoint(svc)
	//添加追踪，设置span的名称为health-endpoint
	healthEndpoint = kitzipkin.TraceEndpoint(zipkinTracer, "health-endpoint")(healthEndpoint)

	//把算术运算Endpoint和健康检查Endpoint封装至ArithmeticEndpoints
	endpts := module.ArithmeticEndpoints{
		ArithmeticEndpoint:  endpoint,
		HealthCheckEndpoint: healthEndpoint,
	}

	//创建http.Handler
	r := module.MakeHttpHandler(ctx, endpts, zipkinTracer, logger)

	//创建注册对象
	registar := module.Register(*consulHost, *consulPort, *serviceHost, *servicePort, logger)

	go func() {
		fmt.Println("Http Server start at port:" + *servicePort)

		//启动前执行注册
		registar.Register()
		handler := r
		errChan <- http.ListenAndServe(":"+*servicePort, handler)
	}()

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errChan <- fmt.Errorf("%s", <-c)
	}()

	error := <-errChan
	//服务退出，取消注册
	registar.Deregister()
	fmt.Println(error)
}
