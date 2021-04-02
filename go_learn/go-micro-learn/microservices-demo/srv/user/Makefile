
.PHONY: proto
proto:
	protoc --micro_out=. --go_out=. ./proto/user.proto

.PHONY: build
build:
	go build -o ../../build/userSRV main.go

.PHONY: run
run:build
	../../build/userSRV  --registry=consul 

.PHONY: test
test:
	go test -v ./... -cover

.PHONY: docker
docker:
	docker build . -t user-srv:latest
