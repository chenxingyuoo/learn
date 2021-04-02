package main

import (
	"fmt"
	"math"
)

type Square struct {
	side float32
}

type Circle struct {
	radius float32
}

type Shaper interface {
	Area() float32
}

func main() {
	var areaIntf Shaper
	sq1 := new(Square)
	sq1.side = 5

	areaIntf = sq1
  
  switch t := areaIntf.(*Square) {
  case *Square:
      fmt.Printf("Type Square %T with value %v\n", t, t)
  case *Circle:
      fmt.Printf("Type Circle %T with value %v\n", t, t)
  case nil:
      fmt.Printf("nil value: nothing to check?\n")
  default:
      fmt.Printf("Unexpected type %T\n", t)
  }
  
}


func (sq *Square) Area() float32 {
	return sq.side * sq.side
}

func (ci *Circle) Area() float32 {
	return ci.radius * ci.radius * math.Pi
}



// func classifier(items ...interface{}) {
//     for i, x := range items {
//         switch x.(type) {
//         case bool:
//             fmt.Printf("Param #%d is a bool\n", i)
//         case float64:
//             fmt.Printf("Param #%d is a float64\n", i)
//         case int, int64:
//             fmt.Printf("Param #%d is a int\n", i)
//         case nil:
//             fmt.Printf("Param #%d is a nil\n", i)
//         case string:
//             fmt.Printf("Param #%d is a string\n", i)
//         default:
//             fmt.Printf("Param #%d is unknown\n", i)
//         }
//     }
// }
