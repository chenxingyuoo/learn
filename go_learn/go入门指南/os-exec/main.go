/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-08-01 00:04:48
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @LastEditTime: 2020-08-01 00:32:11
 */
package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

func checkExeExists(exe string) bool {
	path, err := exec.LookPath(exe)
	if err != nil {
		fmt.Printf("didn't find '%s' executable\n", exe)
		return false
	}
	fmt.Printf("'%s' executable is '%s'\n", exe, path)
	return true
}

func cmdFfmpeg(arg []string) {
	if (checkExeExists("ffmpeg") == false) {
		return
	}

	var stdoutBuf, stderrBuf bytes.Buffer
	cmd := exec.Command("ffmpeg", arg...)

	stdoutIn, _ := cmd.StdoutPipe()
	stderrIn, _ := cmd.StderrPipe()

	var errStdout, errStderr error
	stdout := io.MultiWriter(os.Stdout, &stdoutBuf)
	stderr := io.MultiWriter(os.Stderr, &stderrBuf)

	err := cmd.Start()
	if err != nil {
		fmt.Println(err)
		return
	}

	go func() {
		// 将 stdoutIn 的内容写入到 os.Stdout 和 &stdoutBuf
		_, errStdout = io.Copy(stdout, stdoutIn)
	}()

	go func() {
		_, errStderr = io.Copy(stderr, stderrIn)
	}()

	err = cmd.Wait()
	if err != nil {
		log.Fatalf("cmd.Run() failed with %s\n", err)
	}
	if errStdout != nil || errStderr != nil {
		log.Fatal("failed to capture stdout or stderr\n")
	}

	outStr, errStr := string(stdoutBuf.Bytes()), string(stderrBuf.Bytes())
	fmt.Printf("\nout:\n%s\nerr:\n%s\n", outStr, errStr)
}

//func Wait 实例
//执行结果：
//Start Test: start run cmd!(立即打印)
//Start Test: finish run cmd!（10s后打印）
func wait() {
	cmd := exec.Command("sleep", "10")
	err := cmd.Start()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Start Test: start run cmd!")
	err = cmd.Wait()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Start Test: finish run cmd!")
}

//func Run 实例
//执行结果：
//Run Test: run cmd successfully!
func run() {
	arg := []string{"hello", "world"}
	cmd := exec.Command("echo", arg...)
	err := cmd.Run()
	if err != nil {
		fmt.Println("run cmd error: ", err)
		return
	}
	fmt.Println("Run Test: run cmd successfully!")
}


type Plugin interface {
	// Name identifies the plugin.
	GetName() string
	SetName(string)
}

type UpperWriter struct {
	io.Writer
}

func (p *UpperWriter) Write(data []byte) (n int, err error) {
	return p.Writer.Write(bytes.ToUpper(data))
}

type People struct {
	name string
	Plugin
}

func (p *People) GetName () string {
	return p.name
}

func (p *People) SetName (name string) {
	p.name = name
}

type UpperString string

func (s UpperString) String() string {
	return strings.ToUpper(string(s))
}


type Chenxingyu struct {
	age int
	People
}

func (c *Chenxingyu) GetAge() int {
	return c.age
}


type User struct {
	Name string
	Age  int32
	mess string
}

func NewUser(name string, age int32, mess string) *User {
	return &User{Name:name,Age:age,mess:mess}
}

func (this *User) GetName () string {
	return this.Name
}

func (this *User) SetName (name string) {
	this.Name = name
}

func (this *User) GetAge() int32 {
	return this.Age
}



func main() {
	//cmdFfmpeg([]string{"-i", "meinv.mp4", "-vframes", "30", "-y", "-f", "gif", "output.gif"})
	//cmdFfmpeg([]string{"-i", "huaxue.mp4", "-ss", "00:01:45", "-t", "10", "huaxue10s.mp4"})
	//cmdFfmpeg([]string{"-i", "huaxue.mp4", "-f", "mp3", "output.mp3"})
	//wait()
	//run()

	cxy := NewUser("cxy", 25, "xx")

	fmt.Println("cxy.GetName()", cxy.GetName(), cxy.GetAge())
	time.Sleep(time.Duration(10) * time.Second)
}
