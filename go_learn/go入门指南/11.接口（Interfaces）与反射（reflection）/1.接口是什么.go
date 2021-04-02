// 通过如下格式定义接口：
// type Namer interface {
//     Method1(param_list) return_type
//     Method2(param_list) return_type
//     // ...
// }


// package main

// import "fmt"

// type Shaper interface {
//     Area() float32
// }

// type Square struct {
//     side float32
// }

// func (sq *Square) Area() float32 {
//     return sq.side * sq.side
// }

// func main() {
//     sq1 := new(Square)
//     sq1.side = 5

//     // var areaIntf Shaper
//     // areaIntf = sq1
//     // shorter,without separate declaration:
//     // areaIntf := Shaper(sq1)
//     // or even:
//     areaIntf := sq1
//     fmt.Printf("The square has area: %f\n", areaIntf.Area())
// }

//The square has area: 25.000000



// package main

// import "fmt"

// type Shaper interface {
//     Area() float32
// }

// type Square struct {
//     side float32
// }

// func (sq *Square) Area() float32 {
//     return sq.side * sq.side
// }

// type Rectangle struct {
//     length, width float32
// }

// func (r Rectangle) Area() float32 {
//     return r.length * r.width
// }

// func main() {
//     r := Rectangle{5, 3} // Area() of Rectangle needs a value
//     q := &Square{5}      // Area() of Square needs a pointer
//     // shapes := []Shaper{Shaper(r), Shaper(q)}
//     // or shorter
//     shapes := []Shaper{r, q}
//     fmt.Println("Looping through shapes for area ...")
//     for n, _ := range shapes {
//         fmt.Println("Shape details: ", shapes[n])
//         fmt.Println("Area of this shape is: ", shapes[n].Area())
//     }
// }

// Looping through shapes for area ...
// Shape details:  {5 3}
// Area of this shape is:  15
// Shape details:  &{5}
// Area of this shape is:  25


package main

import "fmt"

type stockPosition struct {
    ticker     string
    sharePrice float32
    count      float32
}

/* method to determine the value of a stock position */
func (s stockPosition) getValue() float32 {
    return s.sharePrice * s.count
}

type car struct {
    make  string
    model string
    price float32
}

/* method to determine the value of a car */
func (c car) getValue() float32 {
    return c.price
}

/* contract that defines different things that have value */
type valuable interface {
    getValue() float32
}

func showValue(asset valuable) {
    fmt.Printf("Value of the asset is %f\n", asset.getValue())
}

func main() {
    var o valuable = stockPosition{"GOOG", 577.20, 4}
    showValue(o)
    o = car{"BMW", "M3", 66500}
    showValue(o)
}

// Value of the asset is 2308.800049
// Value of the asset is 66500.000000
