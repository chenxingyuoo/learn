package main

import (
	"fmt"
	"unicode/utf8"
	"regexp"
	"io/ioutil"
)

func main() {
	s := "\u00ff\u754c"
	for i, c := range s {
		fmt.Printf("%d:%c ", i, c)
	}

	strLen()
	strbyte()
	str()
	substr()
	str2()
	compareStr()

	fmt.Println(sliceStr("abcdefg", 3))

	learn2()

	fmt.Println(ReversalStr("Google"))
	fmt.Println(ReversalStr1("Google"))

	arrLearn()

	fmt.Println(BubbleSort([]int{3, 2, 4, 9, 1, 5, 7, 6, 8}))
	fmt.Println(BubbleSort1([]int{3, 2, 4, 9, 1, 5, 7, 6, 8}))

	list := []int{0, 1, 2, 3, 4, 5, 6, 7}
	println()
	fmt.Printf("%v", mapFunction(Multiply10, list))
}

func strLen() {
	// count number of characters:
	str1 := "asSASA ddd dsjkdsjs dk"
	fmt.Printf("The number of bytes in string str1 is %d\n", len(str1))
	fmt.Printf("The number of characters in string str1 is %d\n", utf8.RuneCountInString(str1))
	str2 := "asSASA ddd dsjkdsjsこん dk"
	fmt.Printf("The number of bytes in string str2 is %d\n", len(str2))
	fmt.Printf("The number of characters in string str2 is %d", utf8.RuneCountInString(str2))
}

/* Output:
The number of bytes in string str1 is 22
The number of characters in string str1 is 22
The number of bytes in string str2 is 28
The number of characters in string str2 is 24
*/

func strbyte()  {
	var b []byte
	var s string = "abc"
	b = append(b, s...)
	fmt.Println(b)
}

func str()  {
	var b []string
	var s string = "abc"
	b = append(b, s)
	b = append(b, "nnn")
	fmt.Println(b)
}

func substr()  {
	var str string = "abcdefg"
	substr := str[1:3]
	fmt.Println(substr)
}

func str2()  {
	s := "hello"
	c := []byte(s)
	c[0] = 'c'
	s2 := string(c)
	fmt.Println(s2)
}

func compareStr()  {
	fmt.Println(Compare([]byte("a"),[]byte("b")))
}

//字节数组对比函数
func Compare(a, b[]byte) int {
	for i:=0; i < len(a) && i < len(b); i++ {
		switch {
		case a[i] > b[i]:
			return 1
		case a[i] < b[i]:
			return -1
		}
	}
	// 数组的长度可能不同
	switch {
	case len(a) < len(b):
		return -1
	case len(a) > len(b):
		return 1
	}
	return 0 // 数组相等
}

//搜索及排序切片和数组

//标准库提供了 sort 包来实现常见的搜索和排序操作。您可以使用 sort 包中的函数 func Ints(a []int) 来实现对 int 类型的切片排序。例如 sort.Ints(arri)，其中变量 arri 就是需要被升序排序的数组或切片。为了检查某个数组是否已经被排序，可以通过函数 IntsAreSorted(a []int) bool 来检查，如果返回 true 则表示已经被排序。
//类似的，可以使用函数 func Float64s(a []float64) 来排序 float64 的元素，或使用函数 func Strings(a []string)排序字符串元素。
//想要在数组或切片中搜索一个元素，该数组或切片必须先被排序（因为标准库的搜索算法使用的是二分法）。然后，您就可以使用函数 func SearchInts(a []int, n int) int 进行搜索，并返回对应结果的索引值。

//当然，还可以搜索 float64 和字符串：

//func SearchFloat64s(a []float64, x float64) int
//func SearchStrings(a []string, x string) int



//append 函数常见操作

//我们在第 7.5 节提到的 append 非常有用，它能够用于各种方面的操作：
//
//将切片 b 的元素追加到切片 a 之后：a = append(a, b...)
//
//复制切片 a 的元素到新的切片 b 上：
//
//b = make([]T, len(a))
//copy(b, a)
//删除位于索引 i 的元素：a = append(a[:i], a[i+1:]...)
//
//切除切片 a 中从索引 i 至 j 位置的元素：a = append(a[:i], a[j:]...)
//
//为切片 a 扩展 j 个元素长度：a = append(a, make([]T, j)...)
//
//在索引 i 的位置插入元素 x：a = append(a[:i], append([]T{x}, a[i:]...)...)
//
//在索引 i 的位置插入长度为 j 的新切片：a = append(a[:i], append(make([]T, j), a[i:]...)...)
//
//在索引 i 的位置插入切片 b 的所有元素：a = append(a[:i], append(b, a[i:]...)...)
//
//取出位于切片 a 最末尾的元素 x：x, a = a[len(a)-1], a[:len(a)-1]
//
//将元素 x 追加到切片 a：a = append(a, x)
//
//因此，您可以使用切片和 append 操作来表示任意可变长度的序列。
//
//从数学的角度来看，切片相当于向量，如果需要的话可以定义一个向量作为切片的别名来进行操作。
//
//如果您需要更加完整的方案，可以学习一下 Eleanor McHugh 编写的几个包：slices、chain 和 lists。


//切片和垃圾回收

//切片的底层指向一个数组，该数组的实际体积可能要大于切片所定义的体积。只有在没有任何切片指向的时候，底层的数组内层才会被释放，这种特性有时会导致程序占用多余的内存。

//示例 函数 FindDigits 将一个文件加载到内存，然后搜索其中所有的数字并返回一个切片。

var digitRegexp = regexp.MustCompile("[0-9]+")

func FindDigits(filename string) []byte {
	b, _ := ioutil.ReadFile(filename)
	return digitRegexp.Find(b)
}
//这段代码可以顺利运行，但返回的 []byte 指向的底层是整个文件的数据。只要该返回的切片不被释放，垃圾回收器就不能释放整个文件所占用的内存。换句话说，一点点有用的数据却占用了整个文件的内存。

//想要避免这个问题，可以通过拷贝我们需要的部分到一个新的切片中：

func FindDigits1(filename string) []byte {
	b, _ := ioutil.ReadFile(filename)
	b = digitRegexp.Find(b)
	c := make([]byte, len(b))
	copy(c, b)
	return c
}


//练习
func sliceStr(str string, i int) string {
	newStr := str[i:]
	return newStr
}

func learn2()  {
	var str = "abcdefgh"
	fmt.Println(str[len(str)/2:] + str[:len(str)/2])
}

//反转字符串

func ReversalStr(s string) (res string) {
	runes := []rune(s)
	l, h := len(runes), len(runes) / 2
	for i := 0; i < h; i++ {
		runes[i], runes[l-1-i] = runes[l-1-i], runes[i]
	}
	return string(runes)
}

func ReversalStr1(str string) (strRev string) {
	sl := []byte(str)
	var rev [100]byte
	j := 0
	for i := len(sl) - 1; i >= 0; i-- {
		rev[j] = sl[i]
		j++
	}
	strRev = string(rev[:])
	return
}



var arr []byte = []byte{'a', 'b', 'a', 'a', 'a', 'c', 'd', 'e', 'f', 'g'}

func arrLearn() {
	arru := make([]byte, len(arr)) // this will contain the unique items
	ixu := 0                       // index in arru
	tmp := byte(0)
	for _, val := range arr {
		if val != tmp {
			arru[ixu] = val
			fmt.Printf("%c ", arru[ixu])
			ixu++
		}
		tmp = val
	}
	// fmt.Println(arru)
}

//冒泡排序

func BubbleSort(arr []int) ([]int) {
	l := len(arr)
	for l > 0  {
		for i := 0; i < l - 1; i++ {
			if arr[i] > arr[i + 1] {
				arr[i], arr[i + 1] = arr[i + 1], arr[i]
			}
		}
		l--
	}
	return arr
}

func BubbleSort1(arr []int) []int {
	for pass := 1; pass < len(arr); pass++ {
		for i := 0; i < len(arr) - pass; i++ {
			if arr[i] > arr[i + 1] {
				arr[i], arr[i + 1] = arr[i + 1], arr[i]
			}
		}
	}
	return arr
}

//高阶函数

func mapFunction(mf func(int) int,list []int) ([]int) {
	result := make([]int, len(list))
	for ix, v := range list {
		result[ix] = mf(v)
	}
	return result
}

func Multiply10(n int) int {
	return n * 10
}