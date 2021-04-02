// Go 语言通过内置的错误接口提供了非常简单的错误处理机制。
// error类型是一个接口类型，这是它的定义：
// type error interface {
//     Error() string
// }

// package main
//
// import (
// 	"fmt"
// )
//
// // 定义一个 DivideError 结构
// type DivideError struct {
// 	dividee int
// 	divider int
// }
//
// // 实现 	`error` 接口
// func (de *DivideError) Error() string {
// 	strFormat := `
// 	Cannot proceed, the divider is zero.
// 	dividee: %d
// 	divider: 0
// `
// 	return fmt.Sprintf(strFormat, de.dividee)
// }
//
// // 定义 `int` 类型除法运算的函数
// func Divide(varDividee int, varDivider int) (result int, errorMsg string) {
// 	if varDivider == 0 {
// 		dData := DivideError{
// 			dividee: varDividee,
// 			divider: varDivider,
// 		}
// 		errorMsg = dData.Error()
// 		return
// 	} else {
// 		return varDividee / varDivider, ""
// 	}
//
// }
//
// func main() {
// 	// 正常情况
// 	if result, errorMsg := Divide(100, 10); errorMsg == "" {
// 		fmt.Println("100/10 = ", result)
// 	}
// 	// 当被除数为零的时候会返回错误信息
// 	if _, errorMsg := Divide(100, 0); errorMsg != "" {
// 		fmt.Println("errorMsg is: ", errorMsg)
// 	}
// }

// 100/10 =  10
// errorMsg is:
	// Cannot proceed, the divider is zero.
	// dividee: 100
	// divider: 0


	// In Go it's idiomatic to communicate errors via an
	// explicit, separate return value. This contrasts with
	// the exceptions used in languages like Java and Ruby and
	// the overloaded single result / error value sometimes
	// used in C. Go's approach makes it easy to see which
	// functions return errors and to handle them using the
	// same language constructs employed for any other,
	// non-error tasks.

	package main

	import "errors"
	import "fmt"

	// By convention, errors are the last return value and
	// have type `error`, a built-in interface.
	func f1(arg int) (int, error) {
	    if arg == 42 {

	        // `errors.New` constructs a basic `error` value
	        // with the given error message.
	        return -1, errors.New("can't work with 42")

	    }

	    // A nil value in the error position indicates that
	    // there was no error.
	    return arg + 3, nil
	}

	// It's possible to use custom types as `error`s by
	// implementing the `Error()` method on them. Here's a
	// variant on the example above that uses a custom type
	// to explicitly represent an argument error.
	type argError struct {
	    arg  int
	    prob string
	}

	func (e *argError) Error() string {
	    return fmt.Sprintf("%d - %s", e.arg, e.prob)
	}

	func f2(arg int) (int, error) {
	    if arg == 42 {

	        // In this case we use `&argError` syntax to build
	        // a new struct, supplying values for the two
	        // fields `arg` and `prob`.
	        return -1, &argError{arg, "can't work with it"}
	    }
	    return arg + 3, nil
	}

	func main() {

      for _, i := range []int{7, 42} {
				fmt.Println("i:", i)
			}

	    // The two loops below test out each of our
	    // error-returning functions. Note that the use of an
	    // inline error check on the `if` line is a common
	    // idiom in Go code.
	    for _, i := range []int{7, 42} {
	        if r, e := f1(i); e != nil {
	            fmt.Println("f1 failed:", e)
	        } else {
	            fmt.Println("f1 worked:", r)
	        }
	    }
	    for _, i := range []int{7, 42} {
	        if r, e := f2(i); e != nil {
	            fmt.Println("f2 failed:", e)
	        } else {
	            fmt.Println("f2 worked:", r)
	        }
	    }

	    // If you want to programmatically use the data in
	    // a custom error, you'll need to get the error  as an
	    // instance of the custom error type via type
	    // assertion.
	    _, e := f2(42)
	    if ae, ok := e.(*argError); ok {
	        fmt.Println(ae.arg)
	        fmt.Println(ae.prob)
	    }
	}
