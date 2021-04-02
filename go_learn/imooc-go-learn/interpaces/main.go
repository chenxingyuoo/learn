package main

import (
	"fmt"
	"imooc-go-learn/interpaces/mock"
	"imooc-go-learn/interpaces/real"
	"time"
)

type Retriever interface {
	Get(url string) string
}

func download(r Retriever) string {
	return r.Get(url)
}

type Poster interface {
	Post(url string,
		form map[string]string) string
}

type RetrieverPoster interface {
	Retriever
	Poster
}

func session(s RetrieverPoster) string {
	s.Post(url, map[string]string{
		"contents": "another faked imooc.com",
	})

	return s.Get(url)
}

const (
	url = "http://www.imooc.com"
)

func add(a ...interface{}) (result int) {
	result = 0
	for i, v := range a {
		fmt.Printf("i %d , v : %s",i, v)
		fmt.Println()
		result += v.(int)
	}
	return
}

func main() {
	fmt.Println(add(1,2,3,4))

	var r Retriever
	mockRetriever := mock.Retriever{
		Contents: "this is mock contents",
	}
	r = &mockRetriever
	inspect(r)

	// Type assertion
	if mockRetriever, ok := r.(*mock.Retriever); ok {
		fmt.Println(mockRetriever.Contents)
	} else {
		fmt.Println("r is not a mock retriever")
	}

	realRetriever := &real.Retriever{
		UserAgent: "Mozilla/5.0",
		TimeOut:   time.Minute,
	}
	r = realRetriever
	inspect(r)

	// Type assertion
	// if realRetriever, ok := r.(*real.Retriever); ok {
	// 	fmt.Println(realRetriever.UserAgent)
	// } else {
	// 	fmt.Println("r is not a real retriever")
	// }

	//fmt.Println(
	//	"Try a session with realRetriever")
	//fmt.Println(session(realRetriever))
}

func inspect(r Retriever) {
	fmt.Printf(" > Type:%T Value:%v\n", r, r)
	switch v := r.(type) {
	case *mock.Retriever:
		fmt.Println("mock Contents:", v.Contents)
	case *real.Retriever:
		fmt.Println("real UserAgent:", v.UserAgent)
	}
}
