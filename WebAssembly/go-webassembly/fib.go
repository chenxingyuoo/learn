package main

import "syscall/js"
import (
	"github.com/ethereum/go-ethereum/log"
)

// 计算斐波那契数
func fib(n int) int {
	if n <= 0 {
		return 0
	}
	var result = make([]int, n+1)
	result[0] = 0
	result[1] = 1
	if n <= 1 {
		return result[n]
	}
	for i := 2; i <= n; i++ {
		result[i] = result[i-2] + result[i-1]
	}
	return result[n]
}

func fFib(value js.Value, params []js.Value) interface{} {
	log.Info("page accessed")
	var n = params[0].Int()  // 输入参数
	var callback = params[1] // 回调参数
	var result = fib(n)
	// 调用回调函数，传入计算结果
	callback.Invoke(result)
	return nil
}

// 注册全局函数
func registerCallbacks() {
	js.Global().Set("fibFun", js.FuncOf(fFib))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
}
