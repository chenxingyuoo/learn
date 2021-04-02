package main

import (
	"imooc-go-learn/spider/single-task/engine"
	"imooc-go-learn/spider/single-task/zhenai/parser/citylist"
)

const url = "http://www.zhenai.com/zhenghun"

func main() {
	engine.Run(engine.Request{
		Url: url,
		ParserFun: citylist.ParserCityList,
	})
}



