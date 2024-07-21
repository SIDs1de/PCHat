package main

import (
	"github.com/sirupsen/logrus"
	"online_chat/pkg/app"
)

func main() {
	a, err := app.NewApp()
	if err != nil {
		logrus.Fatal(err)
	}

	if err = a.Run(); err != nil {
		logrus.Fatal(err)
	}
}

//import (
//	"github.com/gin-contrib/cors"
//	"github.com/gin-gonic/gin"
//	"github.com/gorilla/websocket"
//	"log"
//	"net/http"
//	"time"
//)
//
//var upgrader = websocket.Upgrader{
//	ReadBufferSize:  1024,
//	WriteBufferSize: 1024,
//	CheckOrigin:     func(r *http.Request) bool { return true },
//}
//
//var clients = make(map[*websocket.Conn]bool)
//var broadcast = make(chan Message)
//
//type Message struct {
//	Username string `json:"username"`
//	Message  string `json:"message"`
//	Event    string `json:"event"`
//	ID       int64  `json:"id"`
//}
//
//func main() {
//	router := gin.Default()
//
//	router.Use(cors.New(cors.Config{
//		AllowOrigins:     []string{"*"},
//		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
//		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
//		ExposeHeaders:    []string{"Content-Length"},
//		AllowCredentials: true,
//		MaxAge:           12 * time.Hour,
//	}))
//
//	router.GET("/", func(c *gin.Context) {
//		c.JSON(200, gin.H{"msg": "Hello, WebSocket server!"})
//	})
//
//	router.GET("/ws", handleConnections)
//
//	go handleMessages()
//
//	router.Run("192.168.191.53:8080")
//}
//
//func handleConnections(c *gin.Context) {
//	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
//	if err != nil {
//		log.Println(err)
//		return
//	}
//	defer conn.Close()
//	clients[conn] = true
//
//	for {
//		var msg Message
//		err := conn.ReadJSON(&msg)
//		if err != nil {
//			log.Printf("error: %v", err)
//			delete(clients, conn)
//			break
//		}
//
//		broadcast <- msg
//	}
//}
//
//func handleMessages() {
//	for {
//		msg := <-broadcast
//		for client := range clients {
//			err := client.WriteJSON(msg)
//			if err != nil {
//				log.Printf("error: %v", err)
//				client.Close()
//				delete(clients, client)
//			}
//		}
//	}
//}
