package adder

func Adder() func(v int) int {
	num := 0
	return func(v int) int {
		return num + v
	}
}

type iAdder func(int) (int, iAdder)

func Adder2(base int) iAdder {
	return func(v int) (int, iAdder) {
		return base + v, Adder2(base + v)
	}
}