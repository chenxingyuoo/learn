package main

import (
	"archive/zip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func main() {
	CompressZip()   //压缩
	DeCompressZip() //解压缩
}

func CompressZip() {
	const target = "files.zip"

	const readDir = "./files/"
	//获取源文件列表
	f, err := ioutil.ReadDir(readDir)
	if err != nil {
		fmt.Println(err)
	}

	fzip, _ := os.Create(target)

	w := zip.NewWriter(fzip)

	defer w.Close()

	for _, file := range f {
		fmt.Println("file.Name()", file.Name())
		fw, _ := w.Create("xxx" + file.Name())
		filecontent, err := ioutil.ReadFile(readDir + file.Name())
		if err != nil {
			fmt.Println(err)
		}
		n, err := fw.Write(filecontent)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println("n", n)
	}
}

func DeCompressZip() {
	const File = "files.zip"
	const dir = "new-files/"
	os.Mkdir(dir, 0777) //创建一个目录

	cf, err := zip.OpenReader(File) //读取zip文件
	if err != nil {
		fmt.Println(err)
	}
	defer cf.Close()
	for _, file := range cf.File {
		rc, err := file.Open()
		if err != nil {
			fmt.Println(err)
		}

		f, err := os.Create(dir + file.Name)
		if err != nil {
			fmt.Println(err)
		}
		defer f.Close()
		n, err := io.Copy(f, rc)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(n)
	}

}
