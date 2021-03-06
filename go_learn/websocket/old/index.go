package socket

import (
	"fmt"
	"log"
	// "net/http"

	// socketio "github.com/googollee/go-socket.io"
	socketio "github.com/googollee/go-socket.io"
	// "github.com/googollee/go-engine.io/transport/polling"
	// "github.com/googollee/go-engine.io/transport/websocket"
	// "github.com/googollee/go-engine.io"
	// "github.com/googollee/go-engine.io/transport"
)

// var s *socketio.Server

func SetupSocket() *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}


	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		fmt.Println("notice:", msg)
		s.Emit("reply", "have "+msg)
	})
	server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
		s.SetContext(msg)
		return "recv " + msg
	})
	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})
	server.OnError("/", func(e error) {
		fmt.Println("meet error:", e)
	})
	server.OnDisconnect("/", func(s socketio.Conn, msg string) {
		fmt.Println("closed", msg)
	})
	return server
}

func GetServer() int {
	return 1
}