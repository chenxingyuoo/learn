

package main

import (
	"fmt"
	"strconv"
	"strings"
)

//前缀和后缀
// HasPrefix 判断字符串 s 是否以 prefix 开头：
// strings.HasPrefix(s, prefix string) bool
// HasSuffix 判断字符串 s 是否以 suffix 结尾：
// strings.HasSuffix(s, suffix string) bool

func hasPrefix() {
	var str string = "This is an example of a string"
	fmt.Printf("-----hasPrefix-----\n")
	fmt.Printf("T/F? Does the string \"%s\" have prefix %s? ", str, "Th")
	fmt.Printf("%t\n", strings.HasPrefix(str, "Th"))
}

//字符串包含关系

// Contains 判断字符串 s 是否包含 substr：

func contains() {
	var str string = "This is an example of a string"
	fmt.Printf("-----contains-----\n")
	fmt.Println(strings.Contains(str, "Thiss"))
}

//判断子字符串或字符在父字符串中出现的位置（索引）

//Index 返回字符串 str 在字符串 s 中的索引（str 的第一个字符的索引），-1 表示字符串 s 不包含字符串 str：

//strings.Index(s, str string) int

// LastIndex 返回字符串 str 在字符串 s 中最后出现位置的索引（str 的第一个字符的索引），-1 表示字符串 s 不包含字符串 str：

// LastIndex 返回字符串 str 在字符串 s 中最后出现位置的索引（str 的第一个字符的索引），-1 表示字符串 s 不包含字符串 str：

// 如果 ch 是非 ASCII 编码的字符，建议使用以下函数来对字符进行定位：
// strings.IndexRune(s string, r rune) int

func index() {
	var str string = "Hi, I'm Marc, Hi."
	fmt.Printf("-----index-----\n")

	fmt.Printf("The position of \"Marc\" is: ")
	fmt.Printf("%d\n", strings.Index(str, "Marc"))

	fmt.Printf("The position of the first instance of \"Hi\" is: ")
	fmt.Printf("%d\n", strings.Index(str, "Hi"))
	fmt.Printf("The position of the last instance of \"Hi\" is: ")
	fmt.Printf("%d\n", strings.LastIndex(str, "Hi"))

	fmt.Printf("The position of \"Burger\" is: ")
	fmt.Printf("%d\n", strings.Index(str, "Burger"))
}

// The position of "Marc" is: 8
// The position of the first instance of "Hi" is: 0
// The position of the last instance of "Hi" is: 14
// The position of "Burger" is: -1

//字符串替换

// Replace 用于将字符串 str 中的前 n 个字符串 old 替换为字符串 new，并返回一个新的字符串，如果 n = -1 则替换所有字符串 old 为字符串 new：
//strings.Replace(str, old, new, n) string

func replace() {
	var str string = "Hello, World"
	fmt.Printf("-----replace-----\n")
	fmt.Printf(strings.Replace(str, "World", "世界",-1),"\n")
}

//统计字符串出现次数
//Count 用于计算字符串 str 在字符串 s 中出现的非重叠次数：
//strings.Count(s, str string) int

func count() {
	var str string = "Hello, how is it going, Hugo?"
	var manyG = "gggggggggg"

	fmt.Printf("-----count-----\n")

	fmt.Printf("Number of H's in %s is: ", str)
	fmt.Printf("%d\n", strings.Count(str, "H"))

	fmt.Printf("Number of double g's in %s is: ", manyG)
	fmt.Printf("%d\n", strings.Count(manyG, "gg"))
}

//Number of H's in Hello, how is it going, Hugo? is: 2
// Number of double g’s in gggggggggg is: 5

//重复字符串
//Repeat 用于重复 count 次字符串 s 并返回一个新的字符串：
func repeat() {
	var origS string = "Hi there! "
	var newS string

	newS = strings.Repeat(origS, 3)
	fmt.Printf("-----repeat-----\n")
	fmt.Printf("The new repeated string is: %s\n", newS)
}

//The new repeated string is: Hi there! Hi there! Hi there!

//修改字符串大小写
// ToLower 将字符串中的 Unicode 字符全部转换为相应的小写字符：
// strings.ToLower(s) string
// ToUpper 将字符串中的 Unicode 字符全部转换为相应的大写字符：
// strings.ToUpper(s) string

func lowerAndUpper() {
	var orig string = "Hey, how are you George?"
	var lower string
	var upper string

	fmt.Printf("-----lowerAndUpper-----\n")
	fmt.Printf("The original string is: %s\n", orig)
	lower = strings.ToLower(orig)
	fmt.Printf("The lowercase string is: %s\n", lower)
	upper = strings.ToUpper(orig)
	fmt.Printf("The uppercase string is: %s\n", upper)
}

// The original string is: Hey, how are you George?
// The lowercase string is: hey, how are you george?
// The uppercase string is: HEY, HOW ARE YOU GEORGE?

//修剪字符串

//你可以使用 strings.TrimSpace(s) 来剔除字符串开头和结尾的空白符号；
//如果你想要剔除指定字符，则可以使用 strings.Trim(s, "cut") 来将开头和结尾的 cut 去除掉。
//该函数的第二个参数可以包含任何字符，如果你只想剔除开头或者结尾的字符串，则可以使用 TrimLeft 或者 TrimRight 来实现。

func trimSpace()  {
	var str string = " Hello, World  "
	fmt.Printf("-----trimSpace-----\n")
	fmt.Printf(strings.TrimSpace(str),"\n")
}

func trim()  {
	var str string = "bb Hello, World  bb"
	fmt.Printf("-----trim-----\n")
	fmt.Printf(strings.Trim(str,"bb"),"\n")
}



//分割字符串
// strings.Fields(s) 将会利用 1 个或多个空白符号来作为动态长度的分隔符将字符串分割成若干小块，并返回一个 slice，如果字符串只包含空白符号，则返回一个长度为 0 的 slice。
// strings.Split(s, sep) 用于自定义分割符号来对指定字符串进行分割，同样返回 slice。
// 因为这 2 个函数都会返回 slice，所以习惯使用 for-range 循环来对其进行处理（第 7.3 节）。


func split() {
	var orig string = "Hey, how are you George?"
	fmt.Printf("-----split-----\n")
	fmt.Println(strings.Fields(orig))
	fmt.Println(strings.Split(orig, ","))
}

//拼接 slice 到字符串

func join() {
	str := "The quick brown fox jumps over the lazy dog"
	sl := strings.Fields(str)

	fmt.Printf("-----join-----\n")

	fmt.Printf("Splitted in slice: %v\n", sl)
	for _, val := range sl {
		fmt.Printf("%s - ", val)
	}
	fmt.Println()

	str2 := "GO1|The ABC of Go|25"
	sl2 := strings.Split(str2, "|")
	fmt.Printf("Splitted in slice: %v\n", sl2)
	for _, val := range sl2 {
		fmt.Printf("%s - ", val)
	}
	fmt.Println()
	str3 := strings.Join(sl2, ";")
	fmt.Printf("sl2 joined by : %s\n", str3)
}

//Splitted in slice: [The quick brown fox jumps over the lazy dog]
// The - quick - brown - fox - jumps - over - the - lazy - dog -
// Splitted in slice: [GO1 The ABC of Go 25]
// GO1 - The ABC of Go - 25 -
// sl2 joined by ;: GO1;The ABC of Go;25

//从字符串中读取内容
// 函数 strings.NewReader(str) 用于生成一个 Reader 并读取字符串中的内容，然后返回指向该 Reader 的指针，从其它类型读取内容的函数还有：
// Read() 从 []byte 中读取内容。
// ReadByte() 和 ReadRune() 从字符串中读取下一个 byte 或者 rune。



//-----  strconv ----

//字符串与其它类型的转换
func atoiAndItoa() {
	var orig string = "666"
	var an int
	var newS string

	fmt.Printf("The size of ints is: %d\n", strconv.IntSize)

	an, _ = strconv.Atoi(orig)
	fmt.Printf("The integer is: %d\n", an)
	an = an + 5
	newS = strconv.Itoa(an)
	fmt.Printf("The new string is: %s\n", newS)
}

//64 位系统：
//The size of ints is: 64
// The integer is: 666
// The new string is: 671

//32 位系统：
//The size of ints is: 32
// The integer is: 666
// The new string is: 671

func main()  {
	//string
	hasPrefix()
	contains()
	index()
	replace()
	count()
	repeat()
	lowerAndUpper()
	trimSpace()
	trim()
	split()
	join()

	//strconv
	atoiAndItoa()
}
