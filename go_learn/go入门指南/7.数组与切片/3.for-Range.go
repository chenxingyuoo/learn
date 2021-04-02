package main

import "fmt"

func main() {
	range1()
	range2()
	range3()
	range4()
	range5()
	range6()
}

func range1() {
	var slice1 []int = make([]int, 4)

	slice1[0] = 1
	slice1[1] = 2
	slice1[2] = 3
	slice1[3] = 4

	for ix, value := range slice1 {
		fmt.Printf("Slice at %d is: %d\n", ix, value)
	}
}

func range2() {
	seasons := []string{"Spring", "Summer", "Autumn", "Winter"}
	for ix, season := range seasons {
		fmt.Printf("Season %d is: %s\n", ix, season)
	}

	for _, season := range seasons {
		fmt.Printf("%s\n", season)
	}
}


//多维切片下的 for-range：
const (
	WIDTH  = 10
	HEIGHT = 10
)
func range3()  {
	var screen [WIDTH][HEIGHT] int
	for y := 0; y < HEIGHT; y++ {
		for x := 0; x < WIDTH; x++ {
			screen[x][y] = 0
		}
	}

	for row := range screen {
		for column := range screen[row] {
			screen[row][column] = 1
		}
	}

	fmt.Println(screen)
}


func range4()  {
  items := [...]int{10, 20, 30, 40, 50}
  for ix, item := range items {
    items[ix] = item * 2
  }
  fmt.Println(items)
}

//传入参数为一个 4 位 float 数组成的数组 arrF，返回该数组的所有数字和
func range5()  {
  items := []float64{10.10, 20.20, 30.30, 40.40}
  fmt.Println(Sum(items))
}

func Sum(arrF []float64) (float64) {
  var result float64
  for _, item := range arrF {
    result += float64(item)
  }
  return result
}

//传入int数组 ，返回两个 int 和 float32 类型的未命名变量的和与平均值
func range6()  {
 items := []int{10, 20, 30, 40}
 sum , avg1 := SumAndAverage(items)
 fmt.Printf( "总数为: %d ", sum , "\n")
 fmt.Println( "平均值为: ", avg1 ,"\n")


 min := minSlice(items)
 max := maxSlice(items)

 fmt.Println( "最小值为: ", min , "\n")
 fmt.Println( "最大值为: ", max , "\n")
}

func SumAndAverage(arr []int) (sum int, avg float32) {
	sum = 0
	avg = 0
	var size = len(arr)

	for _, item := range arr {
		sum += item
	}

	avg = float32(sum / size)

	return
}

//获取最小值
func minSlice(arr []int) int {
	var min = arr[0]
	for _, item := range arr {
		if item < min {
			min = item
		}
	}
	return min
}

//获取最大值
func maxSlice(arr []int) int {
	var max = arr[0]
	for _, item := range arr {
		if item > max {
			max = item
		}
	}
	return max
}
