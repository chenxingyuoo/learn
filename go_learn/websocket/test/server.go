package main

import (
	"net/http"
	"github.com/gorilla/websocket"
	"fmt"
	"log"
	"github.com/my/test/ws"
)

// http升级websocket协议的配置
var wsUpgrader = websocket.Upgrader{
	// 允许所有CORS跨域请求
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}


func wsHandler(resp http.ResponseWriter, req *http.Request) {
	var(
		wsSocket *websocket.Conn
		err error
		wsConn *ws.WSConnection
	)

	// 应答客户端告知升级连接为websocket
	wsSocket, err = wsUpgrader.Upgrade(resp, req, nil)
	if err != nil {
		return
	}

	wsConn, err = ws.InitConnection(wsSocket)
	if err != nil {
		goto ERR
	}

	fmt.Print(wsConn)

	for {
		msg, err := wsConn.WsRead()
		if err != nil {
			fmt.Println("read fail")
			break
		}
		fmt.Println(msg)
		// err = wsConn.WsWrite(msg.MessageType, msg.Data)
		// if err != nil {
		// 	fmt.Println("write fail")
		// 	break
		// }
	}

	ERR:
	  wsConn.WsClose()
}



func main() {
	http.Handle("/", http.FileServer(http.Dir("publich")))
	http.HandleFunc("/ws", wsHandler)
	log.Println("Serving at localhost:7777...")
	log.Fatal(http.ListenAndServe(":7777", nil))
}