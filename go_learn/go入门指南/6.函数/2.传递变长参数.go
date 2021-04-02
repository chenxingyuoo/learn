package main

import "fmt"

func main()  {
	Greeting("webkit", "transform", "transition")

	//计算最小值
	x := min(1, 3, 2, 0)
	fmt.Printf("The minimum is: %d\n", x)
	arr := []int{7,9,3,5,1}
	x = min(arr...)
	fmt.Printf("The minimum in the array arr is: %d", x)
	fmt.Println()

	F1("iphone","mi")
}

//如果函数的最后一个参数是采用 ...type 的形式，那么这个函数就可以处理一个变长的参数，这个长度可以为 0，这样的函数称为变参函数。

//func myFunc(a string, b string, arg ...int) {}

func Greeting(prefix string, who ...string){
	fmt.Println("prefix:",prefix)
	for i, v := range who {
		fmt.Printf("i %d , v : %s",i, v)
		fmt.Println()
	}
}

func min(a ...int) int {
	if len(a)==0 {
		return 0
	}
	min := a[0]
	for _, v := range a {
		if v < min {
			min = v
		}
	}
	return min
}

func F1(s ...string) {
	F2(s...)
	F3(s)
}

func F2(s ...string) {
	point(s)
}
func F3(s []string) {
	point(s)
}

func point(s []string)  {
	for i, v := range s {
		fmt.Printf("i %d , v : %s",i, v)
		fmt.Println()
	}
}


//但是如果变长参数的类型并不是都相同的呢？使用 5 个参数来进行传递并不是很明智的选择，有 2 种方案可以解决这个问题：
//1.使用结构
//2.使用空接口

