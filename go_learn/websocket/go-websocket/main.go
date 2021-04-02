package main
 
import (
	"net/http"
	"github.com/gorilla/websocket"
	"time"
	impl "go-websocket/modules"
)

// http升级websocket协议的配置
var wsUpgrader = websocket.Upgrader{
	// 允许所有CORS跨域请求
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

 
func wsHandler(w http.ResponseWriter , r *http.Request){
	//	w.Write([]byte("hello"))
	var(
		wsConn *websocket.Conn
		err error
		conn *impl.WSConnection
		data []byte
	)
	// 完成ws协议的握手操作
	// Upgrade:websocket
	if wsConn , err = wsUpgrader.Upgrade(w,r,nil); err != nil{
		return 
	}
 
	if conn , err = impl.InitConnection(wsConn); err != nil{
		goto ERR
	}
 
	// 启动线程，不断发消息
	go func(){
		var (err error)
		for{
			if err = conn.WriteMessage([]byte("heartbeat"));err != nil{
				return 
			}
			time.Sleep(1*time.Second)
		}
	}()
 
	for {
		if data , err = conn.ReadMessage();err != nil{
			goto ERR
		}
		if err = conn.WriteMessage(data);err !=nil{
			goto ERR
		}
	}
 
	ERR:
		conn.Close()
 
}

func main(){
	http.Handle("/", http.FileServer(http.Dir("./publich")))
	http.HandleFunc("/ws",wsHandler)
	http.ListenAndServe(":8089",nil)
}