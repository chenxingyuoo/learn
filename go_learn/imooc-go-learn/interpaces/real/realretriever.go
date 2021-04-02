package real

import (
	"net/http"
	"net/http/httputil"
	"time"
)

type Retriever struct {
	Contents  string
	UserAgent string
	TimeOut   time.Duration
}

func (r *Retriever) Get(url string) string {
	resp, err := http.Get(url)
	if err != nil { //错误返回报告
		panic(err)
	}
	defer resp.Body.Close() //预先处理resp关闭

	result, err := httputil.DumpResponse(resp, true) //分析结构体指针是否正确 如果正确 返回utf8格式
	if err != nil {
		panic(err)
	}
	return string(result)
}

func (r *Retriever) Post(url string,
	form map[string]string) string {
	r.Contents = form["contents"]
	return "ok"
}
