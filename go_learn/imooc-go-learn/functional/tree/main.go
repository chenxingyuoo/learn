package tree

import "fmt"

type Node struct {
	Value int
	Left, Right *Node
}

func CreateNode(value int) *Node {
	return &Node{Value: value}
}

func (node *Node) Print()  {
	fmt.Println(node.Value)
}

func (node *Node) SetValue(value int)  {
	if node == nil {
		fmt.Println("Setting Value to nil " +
			"node. Ignored.")
		return
	}

	node.Value = value
}

func (node *Node) Traverse()  {
	node.TraverseFunc(func(n *Node) {
		n.Print()
	})
}

func (node *Node) TraverseFunc(f func(*Node)) {
	if node == nil {
		return
	}

	node.Left.TraverseFunc(f)
	f(node)
	node.Right.TraverseFunc(f)
}