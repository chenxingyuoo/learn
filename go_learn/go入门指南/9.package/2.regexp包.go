package main

import (
	"fmt"
	"regexp"
	"strconv"
)


//在下面的程序里，我们将在字符串中对正则表达式进行匹配。
//
//如果是简单模式，使用 Match 方法便可：
//
//ok, _ := regexp.Match(pat, []byte(searchIn))
//变量 ok 将返回 true 或者 false,我们也可以使用 MatchString：
//
//ok, _ := regexp.MatchString(pat, searchIn)

//更多方法中，必须先将正则通过 Compile 方法返回一个 Regexp 对象。然后我们将掌握一些匹配，查找，替换相关的功能

func main() {
	//目标字符串
	searchIn := "John: 2578.34 William: 4567.23 Steve: 5632.18"
	pat := "[0-9]+.[0-9]+" //正则

	f := func(s string) string {
		v, _ := strconv.ParseFloat(s, 32)
		return strconv.FormatFloat(v*2, 'f', 2, 32)
	}

	if ok, _ := regexp.Match(pat, []byte(searchIn)); ok {
		fmt.Println("Match Found!")
	}

	re, _ := regexp.Compile(pat)
	//将匹配到的部分替换为"##.#"
	str := re.ReplaceAllString(searchIn, "##.#")
	fmt.Println(str)
	//参数为函数时
	str2 := re.ReplaceAllStringFunc(searchIn, f)
	fmt.Println(str2)
}
