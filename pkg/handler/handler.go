package handler

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"online_chat/pkg/handler/socketHandler"
	"online_chat/pkg/service"
	"time"
)

type Handler struct {
	Service       *service.Service
	SocketHandler *socketHandler.SocketHandler
}

func NewHandler(service *service.Service) *Handler {
	handler := &Handler{Service: service}
	handler.SocketHandler = &socketHandler.SocketHandler{Clients: map[*websocket.Conn]bool{}, Service: handler.Service}
	return handler
}

func (h *Handler) InitRoutes() *gin.Engine {
	//gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	h.initCORS(router)

	router.GET("/", h.handleConnections)
	router.POST("/sign-up", h.SignUp)
	router.POST("/sign-in", h.SignIn)
	router.POST("/logout", h.LogOut)
	router.POST("/api", h.create)

	//h.Service.UserService.ParseRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjIxMTgxNzYsImlhdCI6MTcyMTUxMzM3NiwidXNlcl9JRCI6Mn0.2NkNKvjenLgmR5XWXAvyOmKObAPxgDBzw9pyD6mNza8")
	return router
}

func (h *Handler) initCORS(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
