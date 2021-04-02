package engine

import (
	"imooc-go-learn/spider/single-task/fetcher"
	"log"
)

func Run(seeds ...Request)  {
	var requests []Request

	for _, r := range seeds {
		requests = append(requests, r)
	}

	for len(requests) > 0 {
		r := requests[0]
		requests = requests[1:]

		log.Printf("fetcher url %s", r.Url)
		body, err := fetcher.Fetch(r.Url)
		if err != nil {
			log.Printf("fetcher error url %s: %v", r.Url, err)
			return
		}

		parseResult := r.ParserFun(body)
		requests = append(requests, parseResult.Requests...)

		for _, item := range parseResult.Items {
			log.Printf("got item %s", item)
		}
	}
}

func NilParser([]byte) ParseResult {
	return ParseResult{}
}