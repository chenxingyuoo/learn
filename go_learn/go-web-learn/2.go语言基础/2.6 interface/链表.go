// type Interface interface {
// 	// Len is the number of elements in the collection.
// 	Len() int
// 	// Less returns whether the element with index i should sort
// 	// before the element with index j.
// 	Less(i, j int) bool
// 	// Swap swaps the elements with indexes i and j.
// 	Swap(i, j int)
// }

package main

import (
	"fmt"
)

// type Interface interface {
// 	// sort.Interface //嵌入字段sort.Interface
// 	Push(x interface{}) //a Push method to push elements into the heap
// 	Pop() interface{} //a Pop elements that pops elements from the heap
// }


// Element is an element of a linked list.
type Element struct {
	// Next and previous pointers in the doubly-linked list of elements.
	// To simplify the implementation, internally a list l is implemented
	// as a ring, such that &l.root is both the next element of the last
	// list element (l.Back()) and the previous element of the first list
	// element (l.Front()).
	next, prev *Element

	// The list to which this element belongs.
	list *List

	// The value stored with this element.
	Value interface{}
}


// Next returns the next list element or nil.
func (e *Element) Next() *Element {
	if p := e.next; e.list != nil && p != &e.list.root {
		return p
	}
	return nil
}


type List struct {
	root Element // sentinel list element, only &root, root.prev, and root.next are used
	len  int     // current list length excluding (this) sentinel element
}


// Init initializes or clears list l.
func (l *List) Init() *List {
	l.root.next = &l.root
	l.root.prev = &l.root
	l.len = 0
	return l
}

// New returns an initialized list.
func New() *List { return new(List).Init() }

func (l *List) Len() int { return l.len }

// Front returns the first element of list l or nil.
func (l *List) Front() *Element {
	if l.len == 0 {
		return nil
	}
	return l.root.next
}

// insert inserts e after at, increments l.len, and returns e.
func (l *List) insert(e, at *Element) *Element {
	n := at.next
	at.next = e
	e.prev = at
	e.next = n
	n.prev = e
	e.list = l
	l.len++
	return e
}

// insertValue is a convenience wrapper for insert(&Element{Value: v}, at).
func (l *List) insertValue(v interface{}, at *Element) *Element {
	return l.insert(&Element{Value: v}, at)
}

// PushBack inserts a new element e with value v at the back of list l and returns e.
func (l *List) PushBack(v interface{}) *Element {
	return l.insertValue(v, l.root.prev)
}


func main() {
	list := New()

	list.PushBack("test")
	list.PushBack("CHENXINGYU")
	list.PushBack("test22222")

	fmt.Println("len",list.Len())

	for e := list.Front(); e != nil;e = e.Next(){
		fmt.Println(e.Value)
	}
}