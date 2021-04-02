package main

import (
	"bufio"
	"fmt"
	"imooc-go-learn/functional/fibonacci"
	"imooc-go-learn/functional/tree"
	"io"
	"strings"
)

type intGen func() int

func (g intGen) Read(
	p []byte) (n int, err error) {
	next := g()
	if next > 10000 {
		return 0, io.EOF
	}
	s := fmt.Sprintf("%d\n", next)

	// TODO: incorrect if p is too small!
	return strings.NewReader(s).Read(p)
}

func printFileContents(reader io.Reader) {
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}

func main() {
	//a := adder.Adder2(0)
	//
	//for i := 0; i < 10; i++ {
	//	var s int
	//	s, a = a(i)
	//	fmt.Printf("0 + 1 + 2 + ... %d = %d\n", i, s)
	//}

	fmt.Println("fibonacci")
	f := fibonacci.Fibonacci()
	fmt.Println("release1")
	for i:=0;i<10;i++{
		fmt.Println(f())
	}
	fmt.Println("release2")
	printFileContents(intGen(f))
	fmt.Println()

	//var f intGen = fibonacci()
	//printFileContents(f)

	root := tree.Node{
		Value:3,
	}

	root.Left = &tree.Node{}
	root.Right = &tree.Node{5, nil, nil}
	root.Right.Left = new(tree.Node)
	root.Left.Right = tree.CreateNode(2)
	root.Left.SetValue(4)
	root.Traverse()

	// 计数
	nodeCount := 0
	root.TraverseFunc(func(node *tree.Node) {
		nodeCount++
	})
	fmt.Println("Node count:", nodeCount) //Node count: 5
}
