package subscriber

import (
	"context"

	"github.com/micro/go-micro/util/log"

	proto "microservices-demo/srv/user/proto"
)

type Example struct{}

func (e *Example) Handle(ctx context.Context, msg *proto.Token) error {
	log.Log("Handler Received message: ", msg.Token)
	return nil
}

func (e *Example) Handle1(ctx context.Context, msg *proto.Token) error {
	log.Log("Handler1 Received message: ", msg.Token)
	return nil
}

func Handler(ctx context.Context, msg *proto.Token) error {
	log.Log("Function Received message: ", msg.Token)
	return nil
}
