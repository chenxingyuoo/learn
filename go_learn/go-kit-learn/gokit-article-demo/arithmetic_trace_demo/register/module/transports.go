package module

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	kithttp "github.com/go-kit/kit/transport/http"
	gozipkin "github.com/openzipkin/zipkin-go"

	"github.com/go-kit/kit/log"
	"github.com/go-kit/kit/tracing/zipkin"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	ErrorBadRequest = errors.New("invalid request parameter")
)

// MakeHttpHandler make http handler use mux
func MakeHttpHandler(ctx context.Context, endpoints ArithmeticEndpoints, zipkinTracer *gozipkin.Tracer, logger log.Logger) http.Handler {
	r := mux.NewRouter()

	zipkinServer := zipkin.HTTPServerTrace(zipkinTracer, zipkin.Name("http-transport"))

	options := []kithttp.ServerOption{
		kithttp.ServerErrorLogger(logger),
		kithttp.ServerErrorEncoder(kithttp.DefaultErrorEncoder),
		zipkinServer,
	}

	r.Methods("POST").Path("/calculate/{type}/{a}/{b}").Handler(kithttp.NewServer(
		endpoints.ArithmeticEndpoint,
		decodeArithmeticRequest,
		encodeArithmeticResponse,
		options...,
	))

	r.Path("/metrics").Handler(promhttp.Handler())

	// create health check handler
	r.Methods("GET").Path("/health").Handler(kithttp.NewServer(
		endpoints.HealthCheckEndpoint,
		decodeHealthCheckRequest,
		encodeArithmeticResponse,
		options...,
	))

	return r
}

// decodeArithmeticRequest decode request params to struct
func decodeArithmeticRequest(_ context.Context, r *http.Request) (interface{}, error) {
	vars := mux.Vars(r)
	requestType, ok := vars["type"]
	if !ok {
		return nil, ErrorBadRequest
	}

	pa, ok := vars["a"]
	if !ok {
		return nil, ErrorBadRequest
	}

	pb, ok := vars["b"]
	if !ok {
		return nil, ErrorBadRequest
	}

	a, _ := strconv.Atoi(pa)
	b, _ := strconv.Atoi(pb)

	return ArithmeticRequest{
		RequestType: requestType,
		A:           a,
		B:           b,
	}, nil
}

// encodeArithmeticResponse encode response to return
func encodeArithmeticResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

// decodeHealthCheckRequest decode request
func decodeHealthCheckRequest(ctx context.Context, r *http.Request) (interface{}, error) {
	return HealthRequest{}, nil
}
