package engine

type Request struct {
	Url string
	ParserFun func([]byte) ParseResult
}

type ParseResult struct {
	Requests []Request
	Items []interface{}
}