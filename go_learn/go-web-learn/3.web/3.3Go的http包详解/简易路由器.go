package main

import (
	"fmt"
	"net/http"
)

// Go其实支持外部实现的路由器 ListenAndServe的第二个参数就是用以配置外部路由器的，
// 它是一个Handler接口，即外部路由器只要实现了Handler接口就可以,
// 我们可以在自己实现的路由器的ServeHTTP里面实现自定义路由功能。

type MyMux struct {
}

func (p *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		sayhelloName(w, r)
		return
	}
	http.NotFound(w, r)
	return
}

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello myroute!")
}

func main() {
	mux := &MyMux{}
	http.ListenAndServe(":9090", mux)
}