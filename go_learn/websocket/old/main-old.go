package main1

import (
	"fmt"
	"log"
	"net/http"
	// "github.com/rs/cors"
	"go-socket-demo/socket"
)


func main() {
	fmt.Println("main")

	// mux := http.NewServeMux()
	// mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.Write([]byte("{\"hello\": \"world\"}"))
	// })

	server := socket.SetupSocket()
	go server.Serve()
	defer server.Close()

	// Handle all requests using net/http
	
	// http.Handle("/socket.io/", server)
	// mux.Handle("/socket.io/", server)
	http.HandleFunc("/socket.io/", func (w http.ResponseWriter, r *http.Request) {
		// SocketIOService hold a variable called Server that is a *socketio.Server
		// Remove or add everything for CORS 
		// This take care of the client
		allowHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"

		origin := r.Header.Get("Origin")
		// w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", allowHeaders)

		if r.Method == "OPTIONS" {
		  return
		}

				// this takes care of the server side, No Orign no CORS baby
		r.Header.Del("Origin")

				// Return to Socket io
		server.ServeHTTP(w,r) 
})

  // r := router.SetupRouter()

  // http.Handle("/", r)

	// r.Run(":8080")


	// c := cors.New(cors.Options{
	// 	AllowedOrigins:   []string{"http://localhost:8081"},
	// 	AllowedMethods:  []string{"GET", "PUT", "OPTIONS", "POST", "DELETE"},
	// 	AllowCredentials: true,
	// })

	// // decorate existing handler with cors functionality set in c
	// handler := c.Handler(mux)

	http.Handle("/", http.FileServer(http.Dir("./publich")))
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}