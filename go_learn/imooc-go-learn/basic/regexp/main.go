package main

import (
	"fmt"
	"regexp"
)

const text = `
my text is 123@qq.com
my text is 1234@qq.com
my text is 12345@qq.com.cn
`

func main() {
	re := regexp.MustCompile(`([a-zA-Z0-9]+)@([a-zA-Z0-9]+)(\.[a-zA-Z0-9.]+)`)
	s := re.FindAllString(text, -1)
	match := re.FindAllStringSubmatch(text, -1)
	fmt.Println("s", s)

	for _, m := range match {
		fmt.Println(m)
	}
}
