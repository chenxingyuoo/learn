package impl
 
import (
	"github.com/gorilla/websocket"
	"sync"
	"errors"
)
 
// ws
type WSConnection struct{
	wsConnect *websocket.Conn
	inChan chan []byte	// 读队列
	outChan chan []byte // 写队列

	closeChan chan byte
 
	mutex sync.Mutex  // 对closeChan关闭上锁
	isClosed bool  // 防止closeChan被关闭多次
}
 
func InitConnection(wsConnect *websocket.Conn)(conn *WSConnection ,err error){
	conn = &WSConnection{
		wsConnect: wsConnect,
		inChan: make(chan []byte,1000),
		outChan: make(chan []byte,1000),
		closeChan: make(chan byte,1),
 
	}
	// 启动读协程
	go conn.readLoop();
	// 启动写协程
	go conn.writeLoop();
	return
}
 
func (conn *WSConnection)ReadMessage()(data []byte , err error){
	select{
	case data = <- conn.inChan:
	case <- conn.closeChan:
		err = errors.New("connection is closeed")
	}
	return 
}
 
func (conn *WSConnection)WriteMessage(data []byte)(err error){
	select{
	case conn.outChan <- data:
	case <- conn.closeChan:
		err = errors.New("connection is closeed")
	}
	return 
}
 
func (conn *WSConnection)Close(){
	// 线程安全，可多次调用
	conn.wsConnect.Close()
	// 利用标记，让closeChan只关闭一次
	conn.mutex.Lock()
	if !conn.isClosed {
		close(conn.closeChan)
		conn.isClosed = true 
	}
	conn.mutex.Unlock()
}
 
// 内部实现
func (conn *WSConnection)readLoop(){
	var(
		data []byte
		err error
	)
	for{
		if _, data , err = conn.wsConnect.ReadMessage(); err != nil{
			goto ERR
		}
    //阻塞在这里，等待inChan有空闲位置
		select{
			case conn.inChan <- data:
			case <- conn.closeChan:		// closeChan 感知 conn断开
				goto ERR
		}
		
	}
 
	ERR:
		conn.Close()
}
 
func (conn *WSConnection)writeLoop(){
	var(
		data []byte
		err error
	)
 
	for{
		select{
			case data= <- conn.outChan:
			case <- conn.closeChan:
				goto ERR
		}
		if err = conn.wsConnect.WriteMessage(websocket.TextMessage , data); err != nil{
			goto ERR
		}
	}
 
	ERR:
		conn.Close()
}
 
