package main

import (
	"fmt"
	"io/ioutil"
)

type Page struct {
	Title string
	Body  []byte
}

func (p *Page) save() (err error) {
	return ioutil.WriteFile(p.Title, p.Body, 0666)
}

func (p *Page) load(title string) (err error) {
	p.Title = title
	p.Body, err = ioutil.ReadFile(p.Title)
	return err
}

func main() {
	// var page Page
	// page.Title = "i am title"
	// page.Body = []byte{1, 2, 3}
	page := Page{
		"Page.md",
		[]byte("# Page\n## Section1\nThis is section1."),
	}
	page.save()

	fmt.Printf("Write Done\n")
	outputWriter.Flush()

	fmt.Println("The name of the person is %s %s\n", page.title, page.body)
}
