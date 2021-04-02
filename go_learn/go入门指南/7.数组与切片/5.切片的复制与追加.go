//如果想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来。下面的代码描述了从拷贝切片的 copy 函数和向切片追加新元素的 append 函数。

package main
import "fmt"

func main() {
    slFrom := []int{1, 2, 3}
    slTo := make([]int, 10)

    n := copy(slTo, slFrom)
    fmt.Println(slTo)
    fmt.Printf("Copied %d elements\n", n) // n == 3

    sl3 := []int{1, 2, 3}
    sl3 = append(sl3, 4, 5, 6)
    fmt.Println(sl3)


    slice := []byte{'g','o'}
    data1 := []byte("l")
    var data2 byte = 'a'
    fmt.Println(AppendByte(slice, data1[0] ,data2))
}

func AppendByte(slice []byte, data ...byte) []byte {
    m := len(slice)
    n := m + len(data)
    if n > cap(slice) { // if necessary, reallocate
        // allocate double what's needed, for future growth.
        newSlice := make([]byte, (n+1)*2)
        copy(newSlice, slice)
        slice = newSlice
    }
    slice = slice[0:n]
    copy(slice[m:n], data)
    return slice
}