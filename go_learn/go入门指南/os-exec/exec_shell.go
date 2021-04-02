/*
 * @Description: 这是***页面（组件）
 * @Date: 2020-08-01 00:35:18
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @LastEditTime: 2020-08-01 00:36:33
 */
package main

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"
	"strings"
)

func exec_shell(s_cmd string) (string, bool) {
	cmd := exec.Command("/bin/bash", "-c", s_cmd)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println("cmd StdoutPipe error:", err)
		return "", false
	}
	cmd.Start()

	var end_line string
	reader := bufio.NewReader(stdout)
	for {
		line, err2 := reader.ReadString('\n')
		if err2 != nil || io.EOF == err2 {
			break
		}
		end_line = line
	}

	fmt.Println(cmd.Process.Pid)
	return end_line, true
}

func ping() string {
	s_cmd := "ping -c 10 127.0.0.1"

	var pline string
	var b bool
	if pline, b = exec_shell(s_cmd); b == false {
		return ""
	}
	arr := strings.Split(pline, " ")
	var a []string
	if len(arr)-2 >= 0 {
		a = strings.Split(arr[len(arr)-2], "/")
	}
	if len(a) >= 2 {
		return a[1]
	}
	return ""
}

func main() {
	for i := 0; i < 10; i++ {
		str := ping()
		fmt.Println(str)
	}
}
