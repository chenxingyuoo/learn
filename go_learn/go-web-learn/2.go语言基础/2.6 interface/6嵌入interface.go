type Interface interface {
	SortInterface //嵌入字段SortInterface
	Push(x interface{}) //a Push method to push elements into the heap
	Pop() interface{} //a Pop elements that pops elements from the heap
}

type SortInterface interface {
	// Len is the number of elements in the collection.
	Len() int
	// Less returns whether the element with index i should sort
	// before the element with index j.
	Less(i, j int) bool
	// Swap swaps the elements with indexes i and j.
	Swap(i, j int)
}